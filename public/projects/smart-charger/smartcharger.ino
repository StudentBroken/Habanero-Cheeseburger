#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h> // For saving settings

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ───── WiFi Credentials ─────
const char* ssid = "W04";         // <<<<< CHANGE THIS
const char* password = "wellsXu9955."; // <<<<< CHANGE THIS

// ───── Hardware Pins ─────
const int RELAY_PIN = 7;
const int VOLTAGE_PIN = 0; // ADC1_CH0 on ESP32-C3

// ───── OLED DISPLAY ─────
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET    -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// ───── Settings Structure ─────
struct Settings {
  float r1;
  float r2;
  float cal_a;
  float cal_b;
  float voltage_cutoff;
  float min_voltage;
  unsigned long hold_time_ms;
  int num_samples;
  int sample_delay_ms;
  int num_cells;
  float no_load_voltage_threshold;

  Settings() :
    r1(467000.0), r2(47250.0),
    cal_a(0.936), cal_b(-0.191),
    voltage_cutoff(24.6), min_voltage(18.0),
    hold_time_ms(60000UL), num_samples(50),
    sample_delay_ms(10),
    num_cells(6),
    no_load_voltage_threshold(26.0) {}
};
Settings currentSettings;

Preferences preferences;
WebServer server(80);
String webServerMessage = "";
String webServerMessageType = "";

unsigned long aboveStartTimestamp = 0;
bool chargeComplete = false;
bool lowVoltage = false;
float currentMeasuredVoltage = 0.0;
int currentChargePercent = 0;
String currentStatusString = "Initializing...";

enum class AdcState { IDLE, SAMPLING };
AdcState adcCurrentState = AdcState::IDLE;
unsigned long adcLastSampleTime = 0;
int adcSampleCount = 0;
long adcSum = 0;
unsigned long lastMainLogicTime = 0;


void loadSettings();
void saveSettings();
void handleRoot();
void handleSettings();
void handleData();
void handleRelayOn();
void handleRelayOff();
void processBatteryLogic(float voltage);
void updateOledDisplay(float voltage, int percent, const String &status_msg, unsigned long holdProgressMs = 0);
float calculateVoltageFromAdc(long adcSumValue, int samples);


void setup() {
  Serial.begin(115200);
  Serial.println("\nBooting Battery Monitor...");
  loadSettings();
  pinMode(RELAY_PIN, OUTPUT);
  analogSetPinAttenuation(VOLTAGE_PIN, ADC_11db);

  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 init failed"));
  } else {
    display.clearDisplay();
    display.setTextColor(SSD1306_WHITE);
    display.setTextSize(1);
    display.setCursor(0,0);
    display.print("Initializing...");
    display.display();
  }

  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  int wifi_retries = 0;
  while (WiFi.status() != WL_CONNECTED && wifi_retries < 30) {
    delay(500);
    Serial.print(".");
    wifi_retries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    server.on("/", HTTP_GET, handleRoot);
    server.on("/settings", HTTP_POST, handleSettings);
    server.on("/data", HTTP_GET, handleData);
    server.on("/relay/on", HTTP_POST, handleRelayOn);
    server.on("/relay/off", HTTP_POST, handleRelayOff);
    server.begin();
    Serial.println("Web server started");
  } else {
    Serial.println("\nWiFi connection FAILED. Web interface unavailable.");
  }
  currentStatusString = "Waiting for Data";
  processBatteryLogic(0.0f); // Initial state based on zero volts
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    server.handleClient();
  }

  unsigned long currentTime = millis();

  switch (adcCurrentState) {
    case AdcState::IDLE:
      if (currentTime - lastMainLogicTime >= ( (currentStatusString == "Done" || currentStatusString == "Low Voltage" || currentStatusString == "No Load / OCV") ? 1000 : 500)) {
        adcSampleCount = 0;
        adcSum = 0;
        adcSum += analogRead(VOLTAGE_PIN);
        adcSampleCount++;
        adcLastSampleTime = currentTime;
        adcCurrentState = AdcState::SAMPLING;
      }
      break;

    case AdcState::SAMPLING:
      if (adcSampleCount < currentSettings.num_samples) {
        if (currentTime - adcLastSampleTime >= (unsigned long)currentSettings.sample_delay_ms) {
          adcSum += analogRead(VOLTAGE_PIN);
          adcSampleCount++;
          adcLastSampleTime = currentTime;
        }
      } else {
        currentMeasuredVoltage = calculateVoltageFromAdc(adcSum, adcSampleCount);
        processBatteryLogic(currentMeasuredVoltage); // Auto-logic runs here
        currentChargePercent = estimateChargePercent(currentMeasuredVoltage);
        updateOledDisplay(currentMeasuredVoltage, currentChargePercent, currentStatusString,
                         (currentStatusString == "Charging" && aboveStartTimestamp > 0) ? (millis() - aboveStartTimestamp) : 0);
        lastMainLogicTime = currentTime;
        adcCurrentState = AdcState::IDLE;
      }
      break;
  }
}

float calculateVoltageFromAdc(long adcSumValue, int samples) {
    if (samples == 0) return 0.0;
    float avgADC = (float)adcSumValue / samples;
    float vDiv = avgADC / 4095.0 * 3.3; 
    float rawVoltage = vDiv * ((currentSettings.r1 + currentSettings.r2) / currentSettings.r2);
    return currentSettings.cal_a * rawVoltage + currentSettings.cal_b;
}

int estimateChargePercent(float voltage) {
  if (currentSettings.num_cells <= 0) return 0;
  float perCell = voltage / currentSettings.num_cells;
  if (perCell >= 4.20f) return 100; else if (perCell >= 4.15f) return 95;
  else if (perCell >= 4.10f) return 90; else if (perCell >= 4.05f) return 85;
  else if (perCell >= 4.00f) return 80; else if (perCell >= 3.95f) return 75;
  else if (perCell >= 3.90f) return 70; else if (perCell >= 3.85f) return 65;
  else if (perCell >= 3.80f) return 60; else if (perCell >= 3.75f) return 55;
  else if (perCell >= 3.70f) return 50; else if (perCell >= 3.65f) return 45;
  else if (perCell >= 3.60f) return 40; else if (perCell >= 3.55f) return 35;
  else if (perCell >= 3.50f) return 30; else if (perCell >= 3.45f) return 25;
  else if (perCell >= 3.40f) return 20; else if (perCell >= 3.35f) return 15;
  else if (perCell >= 3.30f) return 10; else if (perCell >= 3.25f) return 5;
  else return 0;
}

void processBatteryLogic(float voltage) {
    // 1. No-Load Detection
    if (voltage >= currentSettings.no_load_voltage_threshold) {
        digitalWrite(RELAY_PIN, LOW);
        currentStatusString = "No Load / OCV";
        chargeComplete = false;      
        lowVoltage = false;          
        aboveStartTimestamp = 0;     
        // Serial.println("Status: No Load / OCV. Relay OFF."); // Uncomment for debug
        return;
    }

    // 2. Under-Voltage Detection
    // This check will happen even if lowVoltage flag was recently cleared by manual ON.
    // If voltage is still too low, it will re-assert lowVoltage state.
    if (voltage < currentSettings.min_voltage) {
        if (!lowVoltage) {
             // Serial.println("Low Voltage Detected! Relay OFF."); // Uncomment for debug
        }
        digitalWrite(RELAY_PIN, LOW);
        currentStatusString = "Low Voltage";
        lowVoltage = true;           
        chargeComplete = false;      
        aboveStartTimestamp = 0;     
        return;
    } else { // Voltage is >= min_voltage
        if (lowVoltage) { // Was previously in low voltage state
            // Serial.println("Voltage recovered from low state."); // Uncomment for debug
            lowVoltage = false; // Clear the flag, normal charging logic can proceed
        }
    }

    // 3. Charge Complete Handling (if flag is already set)
    if (chargeComplete) {
        digitalWrite(RELAY_PIN, LOW);
        currentStatusString = "Done";
        // Serial.println("Status: Done. Relay OFF."); // Uncomment for debug
        return;
    }

    // 4. Charging Logic (if not no-load, not low-voltage, not already complete)
    if (voltage >= currentSettings.voltage_cutoff) {
        if (aboveStartTimestamp == 0) {
            aboveStartTimestamp = millis();
            // Serial.println("Above cutoff - hold timer started. Relay ON (Charging)."); // Uncomment for debug
        } else if (millis() - aboveStartTimestamp >= currentSettings.hold_time_ms) {
            // Serial.println("Held above cutoff - Charging complete. Relay OFF."); // Uncomment for debug
            digitalWrite(RELAY_PIN, LOW);
            chargeComplete = true;       
            currentStatusString = "Done";
            aboveStartTimestamp = 0;     
            return;
        }
    } else { // Voltage is below cutoff
        if (aboveStartTimestamp != 0) {
            // Serial.println("Voltage dropped below cutoff - resetting hold timer. Relay ON (Charging)."); // Uncomment for debug
        }
        aboveStartTimestamp = 0;
    }

    // 5. Default to Charging
    digitalWrite(RELAY_PIN, HIGH);
    currentStatusString = "Charging";
    // Serial.println("Status: Charging. Relay ON."); // Can be chatty, enable if needed
}


void updateOledDisplay(float voltage, int percent, const String &status_msg, unsigned long holdProgressMs) {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) return;
  display.clearDisplay();
  int barWidth = map(percent, 0, 100, 0, SCREEN_WIDTH - 4);
  display.drawRect(2, 2, SCREEN_WIDTH - 4, 10, SSD1306_WHITE);
  display.fillRect(2, 2, barWidth, 10, SSD1306_WHITE);
  display.setCursor(0, 15);
  display.print("V:"); display.print(voltage, 2);
  display.print(" P:"); display.print(percent); display.print("%");
  display.setCursor(0, 28);
  display.print("Sts:"); display.print(status_msg.substring(0,12));
  if (status_msg == "Charging" && aboveStartTimestamp > 0 && holdProgressMs > 0) {
    display.setCursor(0, 41);
    display.print("Hold:");
    display.print(holdProgressMs / 1000);
    display.print("/");
    display.print(currentSettings.hold_time_ms / 1000);
    display.print("s");
  }
  display.setCursor(0, 54);
  String ipAddr = WiFi.status() == WL_CONNECTED ? WiFi.localIP().toString() : "No WiFi";
  display.print(ipAddr.substring(0,18));
  display.display();
}

void handleRoot() {
  String html = "<!DOCTYPE html><html><head><title>ESP32 Battery Monitor</title>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
  html += "<style>";
  html += "body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }";
  html += ".container { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }";
  html += "h1, h2 { color: #333; }";
  html += ".status-card { background-color: #e7f3fe; border-left: 5px solid #2196F3; margin-bottom: 20px; padding: 15px; }";
  html += ".status-card p { margin: 5px 0; }";
  html += "label { display: block; margin-top: 10px; font-weight: bold; }";
  html += "input[type='text'], input[type='number'] { width: calc(100% - 22px); padding: 10px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }";
  html += "input[type='submit'], button { background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 10px; margin-right: 10px; }";
  html += "button.disconnect { background-color: #f44336; }";
  html += "input[type='submit']:hover, button:hover { opacity: 0.9; }";
  html += ".msg { padding: 10px; margin-bottom:15px; border-radius:4px; }";
  html += ".info { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }";
  html += ".error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }";
  html += ".relay-buttons { margin-bottom: 20px; }";
  html += "</style></head><body><div class='container'>";
  html += "<h1>ESP32 Battery Monitor</h1>";

  if (!webServerMessage.isEmpty()) {
    html += "<div class='msg " + webServerMessageType + "'>" + webServerMessage + "</div>";
    webServerMessage = ""; webServerMessageType = "";
  }

  html += "<div class='status-card'><h2>Current Status</h2>";
  html += "<p>Voltage: <span id='voltage'>--</span> V</p>";
  html += "<p>Charge: <span id='percent'>--</span> %</p>";
  html += "<p>Status: <span id='status_str'>--</span></p>";
  html += "<p id='holdInfo' style='display:none;'>Hold: <span id='holdProgress'>--</span> / <span id='holdTimeTotal'>--</span> s</p>";
  html += "<p>Relay: <span id='relayState'>--</span></p>";
  html += "</div>";
  html += "<div class='relay-buttons'><h2>Manual Relay Control</h2>";
  html += "<form style='display:inline;' method='POST' action='/relay/on'><button type='submit'>Connect Relay (ON)</button></form>";
  html += "<form style='display:inline;' method='POST' action='/relay/off'><button type='submit' class='disconnect'>Disconnect Relay (OFF)</button></form>";
  html += "</div>";
  html += "<h2>Settings</h2>";
  html += "<form method='POST' action='/settings'>";
  auto add_input = [&](const String& label, const String& type, const String& id, const String& value, const String& step = "") {
    String input_html = "<label for='" + id + "'>" + label + ":</label>";
    input_html += "<input type='" + type + "' id='" + id + "' name='" + id + "' value='" + value + "'";
    if (!step.isEmpty()) input_html += " step='" + step + "'";
    input_html += " required>"; return input_html;
  };
  html += add_input("End Voltage Cutoff (V)", "number", "v_cutoff", String(currentSettings.voltage_cutoff, 2), "0.01");
  html += add_input("Min Voltage (V)", "number", "min_v", String(currentSettings.min_voltage, 2), "0.01");
  html += add_input("No-Load Threshold (V)", "number", "no_load_v", String(currentSettings.no_load_voltage_threshold, 2), "0.01");
  html += add_input("Hold Time (seconds)", "number", "hold_s", String(currentSettings.hold_time_ms / 1000UL), "1");
  html += add_input("Calibration A (Slope)", "number", "cal_a", String(currentSettings.cal_a, 4), "0.0001");
  html += add_input("Calibration B (Offset)", "number", "cal_b", String(currentSettings.cal_b, 4), "0.0001");
  html += add_input("Resistor R1 (Ohms)", "number", "r1", String(currentSettings.r1, 1), "1");
  html += add_input("Resistor R2 (Ohms)", "number", "r2", String(currentSettings.r2, 1), "1");
  html += add_input("Number of Samples", "number", "n_samples", String(currentSettings.num_samples), "1");
  html += add_input("Sample Delay (ms)", "number", "s_delay", String(currentSettings.sample_delay_ms), "1");
  html += add_input("Number of Cells", "number", "n_cells", String(currentSettings.num_cells), "1");
  html += "<input type='submit' value='Save Settings'></form></div>";
  html += "<script>";
  html += "function fetchData() { fetch('/data').then(r => r.json()).then(d => { ";
  html += "document.getElementById('voltage').innerText = d.voltage.toFixed(2);";
  html += "document.getElementById('percent').innerText = d.percent;";
  html += "document.getElementById('status_str').innerText = d.status_str;";
  html += "document.getElementById('relayState').innerText = d.relay_state_str;";
  html += "if (d.status_str === 'Charging' && d.hold_progress_ms > 0) {";
  html += " document.getElementById('holdProgress').innerText = Math.floor(d.hold_progress_ms / 1000);";
  html += " document.getElementById('holdTimeTotal').innerText = Math.floor(d.hold_time_total_ms / 1000);";
  html += " document.getElementById('holdInfo').style.display = 'block'; } else { document.getElementById('holdInfo').style.display = 'none'; }";
  html += "}).catch(e => console.error('Error fetching data:', e)); }";
  html += "setInterval(fetchData, 2000); window.onload = fetchData;";
  html += "</script></body></html>";
  server.send(200, "text/html", html);
}

void handleSettings() {
  bool settingsChanged = false;
  auto getFloatArg = [&](const char* name, float &target) { 
    if (server.hasArg(name)) {
      float val = server.arg(name).toFloat();
      if (abs(val - target) > 0.00001f || (target == 0 && val != 0)) {
          target = val; settingsChanged = true;
      }
    }
  };
  auto getIntArg = [&](const char* name, int &target) { 
    if (server.hasArg(name)) {
      int val = server.arg(name).toInt();
      if (val != target) { target = val; settingsChanged = true; }
    }
  };
  auto getULongArg = [&](const char* name, unsigned long &target, unsigned long multiplier = 1) {
    if (server.hasArg(name)) {
      unsigned long val = server.arg(name).toInt() * multiplier; 
      if (val != target) { target = val; settingsChanged = true; }
    }
  };

  getFloatArg("v_cutoff", currentSettings.voltage_cutoff);
  getFloatArg("min_v", currentSettings.min_voltage);
  getFloatArg("no_load_v", currentSettings.no_load_voltage_threshold);
  getULongArg("hold_s", currentSettings.hold_time_ms, 1000UL);
  getFloatArg("cal_a", currentSettings.cal_a);
  getFloatArg("cal_b", currentSettings.cal_b);
  getFloatArg("r1", currentSettings.r1);
  getFloatArg("r2", currentSettings.r2);
  getIntArg("n_samples", currentSettings.num_samples);
  getIntArg("s_delay", currentSettings.sample_delay_ms);
  getIntArg("n_cells", currentSettings.num_cells);
  
  if (currentSettings.num_samples < 1) currentSettings.num_samples = 1;
  if (currentSettings.sample_delay_ms < 0) currentSettings.sample_delay_ms = 0;
  if (currentSettings.num_cells < 1) currentSettings.num_cells = 1;

  if (currentSettings.no_load_voltage_threshold <= currentSettings.voltage_cutoff) {
      webServerMessage = "Error: No-Load Threshold must be > End Voltage Cutoff.";
      webServerMessageType = "error";
  } else if (settingsChanged) {
      saveSettings();
      webServerMessage = "Settings saved successfully!";
      webServerMessageType = "info";
      Serial.println("Settings updated. Re-evaluating logic.");
      aboveStartTimestamp = 0; chargeComplete = false; lowVoltage = false; 
      processBatteryLogic(currentMeasuredVoltage); // Re-evaluate with new settings
  } else {
      webServerMessage = "No changes detected in settings.";
      webServerMessageType = "info";
  }
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleData() {
  String json = "{";
  json += "\"voltage\":" + String(currentMeasuredVoltage, 2) + ",";
  json += "\"percent\":" + String(currentChargePercent) + ",";
  json += "\"status_str\":\"" + currentStatusString + "\",";
  json += "\"relay_state_str\":\"" + String(digitalRead(RELAY_PIN) == HIGH ? "ON" : "OFF") + "\",";
  unsigned long currentHoldProgress = 0;
  if (currentStatusString == "Charging" && aboveStartTimestamp > 0) {
     currentHoldProgress = millis() - aboveStartTimestamp;
  }
  json += "\"hold_progress_ms\":" + String(currentHoldProgress) + ",";
  json += "\"hold_time_total_ms\":" + String(currentSettings.hold_time_ms);
  json += "}";
  server.send(200, "application/json", json);
}

void handleRelayOn() {
  Serial.println("Manual Relay ON command received.");
  digitalWrite(RELAY_PIN, HIGH); // Direct action: Turn relay ON

  // Set flags to guide the next run of processBatteryLogic in the main loop
  chargeComplete = false; 
  lowVoltage = false;     // Explicitly clear low voltage state to allow an attempt to charge
  aboveStartTimestamp = 0;// Reset any hold timers
  
  webServerMessage = "Relay ON action sent. Auto-logic will evaluate current conditions shortly. Relay may turn OFF if voltage is too low/high.";
  webServerMessageType = "info";
  
  // The main loop's call to processBatteryLogic will now use these updated flags
  // and current voltage to determine the next stable state.
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleRelayOff() {
  Serial.println("Manual Relay OFF command received.");
  digitalWrite(RELAY_PIN, LOW); // Direct action: Turn relay OFF

  // Set flags to guide the next run of processBatteryLogic
  chargeComplete = true; // Tell auto-logic we are 'done' or manually stopped
  aboveStartTimestamp = 0; // Reset any hold timers
  lowVoltage = false;      // If we turn it off, it's not in a low voltage charging attempt

  webServerMessage = "Relay OFF action sent. System will consider charging complete and keep relay OFF.";
  webServerMessageType = "info";

  server.sendHeader("Location", "/");
  server.send(303);
}

void loadSettings() {
  preferences.begin("batMonConf", true); 
  currentSettings.r1 = preferences.getFloat("r1", currentSettings.r1);
  currentSettings.r2 = preferences.getFloat("r2", currentSettings.r2);
  currentSettings.cal_a = preferences.getFloat("cal_a", currentSettings.cal_a);
  currentSettings.cal_b = preferences.getFloat("cal_b", currentSettings.cal_b);
  currentSettings.voltage_cutoff = preferences.getFloat("v_cutoff", currentSettings.voltage_cutoff);
  currentSettings.min_voltage = preferences.getFloat("min_v", currentSettings.min_voltage);
  currentSettings.no_load_voltage_threshold = preferences.getFloat("no_load_v", currentSettings.no_load_voltage_threshold);
  currentSettings.hold_time_ms = preferences.getULong("hold_ms", currentSettings.hold_time_ms);
  currentSettings.num_samples = preferences.getInt("n_samples", currentSettings.num_samples);
  currentSettings.sample_delay_ms = preferences.getInt("s_delay", currentSettings.sample_delay_ms);
  currentSettings.num_cells = preferences.getInt("n_cells", currentSettings.num_cells);
  preferences.end();
  Serial.println("Settings loaded.");
}

void saveSettings() {
  preferences.begin("batMonConf", false); 
  preferences.putFloat("r1", currentSettings.r1);
  preferences.putFloat("r2", currentSettings.r2);
  preferences.putFloat("cal_a", currentSettings.cal_a);
  preferences.putFloat("cal_b", currentSettings.cal_b);
  preferences.putFloat("v_cutoff", currentSettings.voltage_cutoff);
  preferences.putFloat("min_v", currentSettings.min_voltage);
  preferences.putFloat("no_load_v", currentSettings.no_load_voltage_threshold);
  preferences.putULong("hold_ms", currentSettings.hold_time_ms);
  preferences.putInt("n_samples", currentSettings.num_samples);
  preferences.putInt("s_delay", currentSettings.sample_delay_ms);
  preferences.putInt("n_cells", currentSettings.num_cells);
  preferences.end();
  Serial.println("Settings saved.");
}