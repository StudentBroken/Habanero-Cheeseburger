# Smart Ebike Charger

The ebike runs on a custom 12S pack built from two 6S LiPo packs in series. The only charger available was the 6S LiHV unit that originally shipped with a Leafboard Gen 1 electric skateboard — the same board whose motor was later salvaged for the ebike v1 and the underwater scooter v1. That charger is designed to push cells to 4.35V each (26.1V for a 6S pack) rather than the standard LiPo maximum of 4.2V per cell (25.2V). Running a LiHV charger on standard LiPo cells risks overcharge, puffing, and eventual cell failure.

The solution was a relay-based cutoff controller that intercepts the charger output and disconnects it at the right moment.

## The Cutoff Problem

Cutting at exactly 25.2V (4.2V/cell) on the measured voltage is not accurate enough. While the charger is active, current flowing through the battery's internal resistance inflates the measured terminal voltage above the true cell voltage. If you cut at 25.2V under load, the cells will have only reached ~4.0–4.1V — undercharged. If you wait for the terminal voltage to drop to 25.2V, the charger has already pushed past it.

The approach here is a **voltage threshold plus a hold timer**. The relay stays on until the pack reaches 24.6V, then holds for 60 seconds. During the hold, the charger continues the final absorption phase, topping the cells off. When the timer expires, the relay opens. After the charger disconnects and current drops to zero, the cells settle to approximately 4.2V — right at the safe limit. The hold time and cutoff voltage are both tunable via the web interface to account for different cell internal resistances and charger current.

## Hardware

The voltage divider uses R1 = 467 kΩ and R2 = 47.25 kΩ to scale the pack voltage down to the ESP32-C3's ADC range. Voltage is computed from 50 averaged ADC samples with linear calibration coefficients (slope and offset) to correct for ADC nonlinearity. A relay on pin 7 connects and disconnects the charger output.

The OLED (128×64, SSD1306 over I2C) shows a charge progress bar, pack voltage, charge percentage, current status, the hold timer countdown when active, and the device's IP address on the bottom line.

## Web Interface

On boot the device connects to WiFi and starts an HTTP server. The OLED shows the IP so you can navigate to it from any device on the network. The dashboard updates every 2 seconds with live voltage, percentage, relay state, and hold timer progress. Manual relay ON/OFF buttons let you override the automatic logic. All parameters — cutoff voltage, minimum voltage, no-load threshold, hold time, calibration coefficients, R1/R2 values, number of samples, and cell count — are configurable from the settings form and persisted to NVS so they survive reboots.

## Bill of Materials

Prices are AliExpress estimates; the ESP32-C3 was bought for $1.

| Component | Unit Cost |
|---|---|
| ESP32-C3 Super Mini | $1.00 |
| SSD1306 0.96" OLED module (I2C) | $1.10 |
| L7805CV 5V LDO regulator | $0.45 |
| 5V single-channel relay module | $1.00 |
| NPN transistor (2N5551) | $0.05 |
| Resistors — 3× (2× voltage divider, 1× transistor base) | $0.02 |
| Electrolytic capacitors — 2× | $1.00 |
| 22AWG wire (short lengths) | $0.50 |
| XT60 connector pair | $0.75 |
| **Total** | **~$5.00** |

## State Machine

The logic runs four checks in order each measurement cycle:

1. **No-load detection** — if voltage is above 26.0V the battery is not connected (open circuit). Relay off, no charging.
2. **Under-voltage protection** — below 18.0V the pack is too discharged to charge safely. Relay off.
3. **Charge complete** — if the hold timer already elapsed this session, relay stays off.
4. **Normal charging** — relay on. Once voltage reaches the 24.6V cutoff, the hold timer starts. When it expires, charging is marked complete and the relay opens.

If the voltage drops back below the cutoff during the hold period the timer resets, preventing premature cutoff during charger output ripple.
