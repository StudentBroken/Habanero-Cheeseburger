#include <Arduino.h>
#include <ESP32Servo.h> // For reliable PWM control
#include <WiFi.h>       // For connecting to Wi-Fi
#include <ESPmDNS.h>    // For finding the ESP32 on the network
#include <WiFiUdp.h>    // A dependency for OTA
#include <ArduinoOTA.h> // The core OTA library

// =================================================================
// --- USER CONFIGURATION ---
// =================================================================
// --- Wi-Fi Credentials for OTA Updates ---
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

struct Pins {
    constexpr static int ESC = 9;
    constexpr static int BUTTON = 8;
    constexpr static int RED_LED = 5;
    constexpr static int GREEN_LED = 6;
    constexpr static int BLUE_LED = 7;
    constexpr static int BATT_ADC = 0;
};
struct Pwm {
    constexpr static int CENTER_PULSE = 1500;
    constexpr static int FORWARD_MAX_PULSE = 2000;
    constexpr static int MIN_PULSE_SUPPORTED = 1000;
    constexpr static int MAX_PULSE_SUPPORTED = 2000;
};
struct Timing {
    constexpr static int DEBOUNCE_DELAY_MS = 50;
    constexpr static int DOUBLE_PRESS_TIMEOUT_MS = 300;
};
struct BatteryMonitor {
    constexpr static float SCALE_FACTOR = 8.78;
};

// =================================================================
// --- OBJECTS & STATE ---
// =================================================================
Servo esc;
enum class SystemState { IDLE, MOTOR_RUNNING, MODE_SELECT, OTA_MODE };
SystemState currentState = SystemState::IDLE;
enum class PowerMode { POWER_HIGH, POWER_MEDIUM, POWER_LOW };
PowerMode currentPowerMode = PowerMode::POWER_HIGH;

// Robust Button Debouncing Class
class Button {
  private:
    uint8_t _pin; bool _lastStableState=HIGH; bool _lastRawState=HIGH;
    unsigned long _lastDebounceTime=0; unsigned long _lastPressTime=0;
    int _pressCount=0; bool _onPress=false; bool _onRelease=false; bool _onDoublePress=false;
  public:
    Button(uint8_t pin) : _pin(pin) {}
    void begin() { pinMode(_pin, INPUT_PULLUP); }
    void update() {
      _onPress=false; _onRelease=false; _onDoublePress=false;
      bool currentRawState = digitalRead(_pin);
      if(currentRawState!=_lastRawState)_lastDebounceTime=millis();
      _lastRawState=currentRawState;
      if((millis()-_lastDebounceTime)>Timing::DEBOUNCE_DELAY_MS){
        if(currentRawState!=_lastStableState){
          if(currentRawState==LOW){
            _onPress=true;
            if(millis()-_lastPressTime<Timing::DOUBLE_PRESS_TIMEOUT_MS){
              _pressCount++; if(_pressCount==2)_onDoublePress=true;
            }else _pressCount=1;
            _lastPressTime=millis();
          }else _onRelease=true;
          _lastStableState=currentRawState;
        }}}
    bool onPress(){return _onPress;} bool onRelease(){return _onRelease;} 
    bool onDoublePress(){return _onDoublePress;} bool isHeld(){return(_lastStableState==LOW);}
};
Button button(Pins::BUTTON);

// --- Function Prototypes ---
void updateLedDisplay();
void setLedColor(int r,int g,int b);
void updateBatteryLed();
int estimateBatteryPercent(float v);
void setLEDBatteryColor(int p);
void applyPowerMode(PowerMode mode);

// =================================================================
// --- SETUP ---
// =================================================================
void setup() {
  Serial.begin(115200);
  Serial.println("\n\n--- ESP32 ESC Controller | Final OTA ---");
  
  button.begin();
  pinMode(Pins::RED_LED, OUTPUT); pinMode(Pins::GREEN_LED, OUTPUT); pinMode(Pins::BLUE_LED, OUTPUT);

  delay(500); 

  if (button.isHeld()) {
    // --- BOOT INTO OTA MODE ---
    currentState = SystemState::OTA_MODE;
    Serial.println("******************************************");
    Serial.println("Button held on startup: Entering OTA Update Mode.");
    
    // NOTE: We DO NOT attach the ESC servo in this mode.
    
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    Serial.print("Connecting to Wi-Fi...");

    while (WiFi.status() != WL_CONNECTED) {
      delay(500); Serial.print(".");
    }
    Serial.println("\nWi-Fi Connected!");
    Serial.print("IP address: "); Serial.println(WiFi.localIP());

    ArduinoOTA.setHostname("esp32-esc-controller");
    ArduinoOTA.onStart([]() { Serial.println("Start updating sketch"); });
    ArduinoOTA.begin();
    
    Serial.println("OTA Ready. Select network port in Arduino IDE to upload.");

  } else {
    // --- BOOT INTO NORMAL OPERATION MODE ---
    Serial.println("Normal startup. Attaching and Arming ESC...");
    
    // Only attach the servo if we are in normal mode
    esc.attach(Pins::ESC, Pwm::MIN_PULSE_SUPPORTED, Pwm::MAX_PULSE_SUPPORTED);
    
    setLedColor(255, 165, 0);
    esc.writeMicroseconds(Pwm::CENTER_PULSE);
    delay(2000);
    
    currentState = SystemState::IDLE;
    setLedColor(0, 0, 0);
    Serial.println("System Ready.");
  }
}

// =================================================================
// --- MAIN LOOP ---
// =================================================================
void loop() {
  // THE "HARD GATE": If in OTA mode, do nothing else.
  if (currentState == SystemState::OTA_MODE) {
    ArduinoOTA.handle(); // Handle any incoming OTA requests

    // Pulse the blue LED to show OTA is active
    static unsigned long lastBlink = 0;
    if (millis() - lastBlink > 500) {
      digitalWrite(Pins::BLUE_LED, !digitalRead(Pins::BLUE_LED));
      lastBlink = millis();
    }
    return; // This is crucial. It stops the rest of the loop from running.
  }

  // --- Normal Operation Loop ---
  button.update();
  processEvents();
  updateLedDisplay();
}

// =================================================================
// --- CORE LOGIC ---
// =================================================================
void processEvents() {
  if (button.onDoublePress()) {
    Serial.print("Mode Change -> ");
    esc.writeMicroseconds(Pwm::CENTER_PULSE);
    currentState = SystemState::MODE_SELECT;
    switch (currentPowerMode) {
        case PowerMode::POWER_HIGH:   currentPowerMode = PowerMode::POWER_MEDIUM; Serial.println("MEDIUM"); break;
        case PowerMode::POWER_MEDIUM: currentPowerMode = PowerMode::POWER_LOW;    Serial.println("LOW"); break;
        case PowerMode::POWER_LOW:    currentPowerMode = PowerMode::POWER_HIGH;   Serial.println("HIGH"); break;
    }
    return;
  }

  if (currentState != SystemState::MODE_SELECT) {
    if (button.onPress()) {
      applyPowerMode(currentPowerMode);
      currentState = SystemState::MOTOR_RUNNING;
    }
    if (button.onRelease()) {
      Serial.println("Motor OFF (Center)");
      esc.writeMicroseconds(Pwm::CENTER_PULSE);
      currentState = SystemState::IDLE;
    }
  } else {
    if (button.onPress()) {
      Serial.println("Exiting Mode Select");
      esc.writeMicroseconds(Pwm::CENTER_PULSE);
      currentState = SystemState::IDLE;
    }
  }
}

void applyPowerMode(PowerMode mode) {
    Serial.print("Motor ON - Power: ");
    int target_pulse = Pwm::CENTER_PULSE;
    int throttle_range = Pwm::FORWARD_MAX_PULSE - Pwm::CENTER_PULSE;
    switch (mode) {
        case PowerMode::POWER_HIGH:   Serial.println("HIGH");   target_pulse=Pwm::FORWARD_MAX_PULSE; break;
        case PowerMode::POWER_MEDIUM: Serial.println("MEDIUM"); target_pulse=Pwm::CENTER_PULSE+(throttle_range*0.66); break;
        case PowerMode::POWER_LOW:    Serial.println("LOW");    target_pulse=Pwm::CENTER_PULSE+(throttle_range*0.33); break;
    }
    esc.writeMicroseconds(target_pulse);
}

// --- LED AND BATTERY FUNCTIONS ---
void updateLedDisplay(){static unsigned long t=0;switch(currentState){case SystemState::IDLE:case SystemState::MOTOR_RUNNING:if(millis()-t>1000){updateBatteryLed();t=millis();}break;case SystemState::MODE_SELECT:switch(currentPowerMode){case PowerMode::POWER_HIGH:setLedColor(255,0,0);break;case PowerMode::POWER_MEDIUM:setLedColor(0,0,255);break;case PowerMode::POWER_LOW:setLedColor(0,255,0);break;}break;case SystemState::OTA_MODE:break;}}
void setLedColor(int r,int g,int b){digitalWrite(Pins::RED_LED,r>0?HIGH:LOW);digitalWrite(Pins::GREEN_LED,g>0?HIGH:LOW);digitalWrite(Pins::BLUE_LED,b>0?HIGH:LOW);}
void updateBatteryLed(){const float R=3.3;const int A=4095;int w=analogRead(Pins::BATT_ADC);float v=(w*R/A)*BatteryMonitor::SCALE_FACTOR;setLEDBatteryColor(estimateBatteryPercent(v));}
int estimateBatteryPercent(float v){if(v>=12.6)return 100;if(v>=12.4)return 90;if(v>=12.2)return 80;if(v>=12.0)return 70;if(v>=11.8)return 60;if(v>=11.6)return 50;if(v>=11.4)return 40;if(v>=11.2)return 30;if(v>=11.0)return 20;if(v>=10.8)return 10;return 5;}
void setLEDBatteryColor(int p){bool r=false,g=false,b=false;if(p>=80)g=true;else if(p>=60){g=true;b=true;}else if(p>=40){g=true;r=true;}else if(p>=20){r=true;g=true;}else r=true;setLedColor(r?255:0,g?255:0,b?255:0);}