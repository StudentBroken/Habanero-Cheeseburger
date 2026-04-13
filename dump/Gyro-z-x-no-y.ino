#include <esp_now.h>
#include <WiFi.h>
#include <MPU6050_6Axis_MotionApps20.h>
#include <Wire.h>

// REPLACE with your gimbal's MAC address
uint8_t broadcastAddress[] = {0x48, 0xca, 0x43, 0xda, 0xd9, 0x24};

typedef struct secure_message {
    float yaw;
    float pitch;
    float roll;
    uint32_t sequence_num;
    uint16_t checksum;
} secure_message;

secure_message gimbalData;
uint32_t sequence_counter = 0;

MPU6050 mpu;

bool dmpReady = false;
uint8_t devStatus;
uint16_t packetSize;
uint8_t fifoBuffer[64];

Quaternion q;
VectorFloat gravity;
float ypr[3];

float yaw_offset = 0.0;
float pitch_offset = 0.0;

uint16_t calculateChecksum(const secure_message* msg) {
    return (uint16_t)(msg->yaw * 100) + (uint16_t)(msg->pitch * 100) + (uint16_t)(msg->roll * 100) + msg->sequence_num;
}

void autoCalibrate() {
    Serial.println("Auto-calibration starting... Keep gyro stationary.");
    delay(2000);

    const int num_samples = 200;
    float yaw_sum = 0.0, pitch_sum = 0.0;
    mpu.resetFIFO(); // Clear any old data

    for (int i = 0; i < num_samples; i++) {
        while (mpu.dmpGetCurrentFIFOPacket(fifoBuffer) < 1) { /* wait for data */ }
        mpu.dmpGetQuaternion(&q, fifoBuffer);
        mpu.dmpGetGravity(&gravity, &q);
        mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);
        yaw_sum += ypr[0] * 180 / M_PI;
        pitch_sum += ypr[1] * 180 / M_PI;
        delay(2);
    }
    yaw_offset = yaw_sum / num_samples;
    pitch_offset = pitch_sum / num_samples;

    Serial.println("Calibration complete!");
    Serial.print("Yaw Offset: "); Serial.println(yaw_offset, 2);
    Serial.print("Pitch Offset: "); Serial.println(pitch_offset, 2);
}

void setup() {
    Wire.begin();
    Wire.setClock(400000);
    Serial.begin(115200);

    mpu.initialize();
    devStatus = mpu.dmpInitialize();

    mpu.setXGyroOffset(220);
    mpu.setYGyroOffset(76);
    mpu.setZGyroOffset(-85);
    mpu.setZAccelOffset(1788);

    if (devStatus == 0) {
        mpu.CalibrateAccel(6);
        mpu.CalibrateGyro(6);
        mpu.setDMPEnabled(true);
        dmpReady = true;
        packetSize = mpu.dmpGetFIFOPacketSize();
        autoCalibrate();
    } else {
        Serial.printf("DMP Initialization failed (code %d)\n", devStatus);
    }

    WiFi.mode(WIFI_STA);
    if (esp_now_init() != ESP_OK) {
        Serial.println("Error initializing ESP-NOW");
        return;
    }

    esp_now_peer_info_t peerInfo;
    memcpy(peerInfo.peer_addr, broadcastAddress, 6);
    peerInfo.channel = 0;
    peerInfo.encrypt = false;
    if (esp_now_add_peer(&peerInfo) != ESP_OK) {
        Serial.println("Failed to add peer");
    }
}

void loop() {
    if (!dmpReady || mpu.dmpGetCurrentFIFOPacket(fifoBuffer) < 1) return;

    mpu.dmpGetQuaternion(&q, fifoBuffer);
    mpu.dmpGetGravity(&gravity, &q);
    mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);

    // Apply the offset to get a 0-centered value
    gimbalData.yaw = (ypr[0] * 180 / M_PI) - yaw_offset;
    gimbalData.pitch = (ypr[1] * 180 / M_PI) - pitch_offset;
    gimbalData.roll = 0; // Roll is not used

    gimbalData.sequence_num = ++sequence_counter;
    gimbalData.checksum = calculateChecksum(&gimbalData);
    
    esp_now_send(broadcastAddress, (uint8_t *) &gimbalData, sizeof(gimbalData));

    // --- DIAGNOSTICS ---
    Serial.print("Raw Yaw: "); Serial.print(ypr[0] * 180 / M_PI, 1);
    Serial.print(" | Sent Yaw: "); Serial.println(gimbalData.yaw, 1);
}