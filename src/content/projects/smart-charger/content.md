# LiHV Cutoff Controller

The ebike runs on a custom 12S pack built from two 6S LiPo packs in series. The only charger available was the 6S LiHV unit that originally shipped with a Leafboard Gen 1 electric skateboard — the same board whose motor was later salvaged for the ebike v1 and the underwater scooter v1. That charger is designed to push cells to 4.35V each (26.1V for a 6S pack) rather than the standard LiPo maximum of 4.2V per cell (25.2V). Running a LiHV charger on standard LiPo cells risks overcharge, puffing, and eventual cell failure.

The solution was a relay-based cutoff controller that intercepts the charger output and disconnects it at the right moment.

## The Cutoff Design
Built an emergency relay-cutoff for a LiHV charger using an ESP32. I used a timer to account for voltage sag, though for a V2, I would design a proper CC/CV (Constant Current / Constant Voltage) charging circuit, as mechanical relays are unsafe for breaking high DC loads.

## Hardware

The voltage divider uses R1 = 467 kΩ and R2 = 47.25 kΩ to scale the pack voltage down to the ESP32-C3's ADC range. Voltage is computed from 50 averaged ADC samples with linear calibration coefficients (slope and offset) to correct for ADC nonlinearity. A relay on pin 7 connects and disconnects the charger output.

The OLED (128×64, SSD1306 over I2C) shows a charge progress bar, pack voltage, charge percentage, current status, the hold timer countdown when active, and the device's IP address on the bottom line.

## Web Interface

On boot the device connects to WiFi and starts an HTTP server. The OLED shows the IP so you can navigate to it from any device on the network. The dashboard updates every 2 seconds with live voltage, percentage, relay state, and hold timer progress. Manual relay ON/OFF buttons let you override the automatic logic. All parameters — cutoff voltage, minimum voltage, no-load threshold, hold time, calibration coefficients, R1/R2 values, number of samples, and cell count — are configurable from the settings form and persisted to NVS so they survive reboots.

## Bill of Materials

AliExpress pricing; ESP32-C3 was $1.

| Component | Unit Cost |
|---|---|
| ESP32-C3 Super Mini | $1.00 |
| SSD1306 OLED display | $1.10 |
| L7805CV 5V LDO regulator | $0.45 |
| 5V relay module | $1.00 |
| NPN transistor | $0.05 |
| Resistors (3 total) | $0.02 |
| Electrolytic capacitors (2 total) | $1.00 |
| Wire (22AWG) | $0.50 |
| XT60 connectors | $0.75 |
| **Total** | **~$5.00** |

## Control Logic
The firmware runs four safety checks:
1. **No-load detection**: open circuit detection.
2. **Under-voltage protection**: prevents over-discharged cells from charging.
3. **Charge complete**: prevents relay oscillation.
4. **Normal charging**: cuts off the relay when voltage and time thresholds are met.
