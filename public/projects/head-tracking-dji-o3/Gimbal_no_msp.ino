
#include <esp_now.h>
#include <WiFi.h>
#include <ESP32Servo.h>

Servo servoPan;
Servo servoTilt;
const int panPin = 7;
const int tiltPin = 6;

// --- STEP 2: ENTER YOUR TESTED VALUES HERE ---
const int SERVO_MIN_US = 600;                     // REPLACE with the MIN value you found in the sweeper test
const int SERVO_MAX_US = 2400; // REPLACE with the MAX value you found in the sweeper test
// ---

const int SERVO_CENTER_US = (SERVO_MIN_US + SERVO_MAX_US) / 2; // Center is calculated automatically

const float PAN_INPUT_MIN_DEGREES = -90.0;
const float PAN_INPUT_MAX_DEGREES = 90.0;
const float TILT_INPUT_MIN_DEGREES = -45.0;
const float TILT_INPUT_MAX_DEGREES = 45.0;

const float SMOOTHING_FACTOR = 0.07;
const float INPUT_DEADZONE = 0.5;

typedef struct secure_message { /* ... structure is unchanged ... */
    float yaw; float pitch; float roll; uint32_t sequence_num; uint16_t checksum;
} secure_message;

secure_message incomingReadings;
uint32_t last_sequence_received = 0;
unsigned long lastRecvTime = 0;
const int timeout_ms = 1500;
float currentPan_us = SERVO_CENTER_US;
float currentTilt_us = SERVO_CENTER_US;
volatile bool newDataAvailable = false;

// Helper function to map a float from one range to another
float map_float(float x, float in_min, float in_max, float out_min, float out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

uint16_t calculateChecksum(const secure_message* msg) { /* ... function is unchanged ... */
    return (uint16_t)(msg->yaw*100)+(uint16_t)(msg->pitch*100)+(uint16_t)(msg->roll*100)+msg->sequence_num;
}

void OnDataRecv(const esp_now_recv_info * info, const uint8_t *data, int len) { /* ... function is unchanged ... */
    if (len != sizeof(secure_message)) return;
    secure_message temp; memcpy(&temp, data, sizeof(temp));
    if (calculateChecksum(&temp) != temp.checksum) return;
    bool isReconnect = (millis() - lastRecvTime) > timeout_ms;
    if (!isReconnect && temp.sequence_num <= last_sequence_received) return;
    memcpy(&incomingReadings, &temp, sizeof(incomingReadings));
    last_sequence_received = incomingReadings.sequence_num;
    lastRecvTime = millis(); newDataAvailable = true;
}

void setup() {
    Serial.begin(115200);
    ESP32PWM::allocateTimer(0);
    ESP32PWM::allocateTimer(1);
    
    // Attach servos with their TRUE pulse width range
    servoPan.attach(panPin, SERVO_MIN_US, SERVO_MAX_US);
    servoTilt.attach(tiltPin, SERVO_MIN_US, SERVO_MAX_US);
    servoPan.writeMicroseconds(SERVO_CENTER_US);
    servoTilt.writeMicroseconds(SERVO_CENTER_US);

    WiFi.mode(WIFI_STA);
    if (esp_now_init() != ESP_OK) return;
    esp_now_register_recv_cb(OnDataRecv);
}

void loop() {
    float targetPan_us = currentPan_us;
    float targetTilt_us = currentTilt_us;

    if (millis() - lastRecvTime > timeout_ms) {
        targetPan_us = SERVO_CENTER_US;
        targetTilt_us = SERVO_CENTER_US;
    } else if (newDataAvailable) {
        float yaw_input = constrain(incomingReadings.yaw, PAN_INPUT_MIN_DEGREES, PAN_INPUT_MAX_DEGREES);
        float pitch_input = constrain(incomingReadings.pitch, TILT_INPUT_MIN_DEGREES, TILT_INPUT_MAX_DEGREES);

        if (abs(yaw_input) < INPUT_DEADZONE) yaw_input = 0.0;
        
        targetPan_us = map_float(yaw_input, PAN_INPUT_MIN_DEGREES, PAN_INPUT_MAX_DEGREES, SERVO_MAX_US, SERVO_MIN_US);
        targetTilt_us = map_float(pitch_input, TILT_INPUT_MIN_DEGREES, TILT_INPUT_MAX_DEGREES, SERVO_MAX_US, SERVO_MIN_US);
        
        newDataAvailable = false;
    }
    
    currentPan_us = (targetPan_us * SMOOTHING_FACTOR) + (currentPan_us * (1.0 - SMOOTHING_FACTOR));
    currentTilt_us = (targetTilt_us * SMOOTHING_FACTOR) + (currentTilt_us * (1.0 - SMOOTHING_FACTOR));
    
    servoPan.writeMicroseconds((int)currentPan_us);
    servoTilt.writeMicroseconds((int)currentTilt_us);
    
    delay(5);
}