# LiHV Cutoff Controller

The ebike runs on a custom 12S pack built from two 6S LiPo packs in series. The only charger available was the 6S LiHV unit that originally shipped with a Leafboard Gen 1 electric skateboard — the same board whose motor was later salvaged for the ebike v1 and the underwater scooter v1. That charger is designed to push cells to 4.35V each (26.1V for a 6S pack) rather than the standard LiPo maximum of 4.2V per cell (25.2V). Running a LiHV charger on standard LiPo cells risks overcharge, puffing, and eventual cell failure.

The solution was a relay-based cutoff controller that intercepts the charger output and disconnects it at the right moment.

## System Architecture

I built a simple relay-cutoff for a LiHV charger using an ESP32. I added a timer to make sure it doesn't shut off too early when the voltage drops under load. For a version 2, I would build a proper charging circuit, as mechanical relays aren't the best for cutting high power.

## Electrical & Firmware Implementation

The system uses a small ESP32-C3 computer and a relay to handle the power. I added an OLED screen so I can see the charging progress and the device's IP address at a glance.

![OLED screen showing progress](/projects/smart-charger/oled.webp)
*The OLED screen shows the battery voltage and a progress bar.*

### Monitoring Interface

When you plug it in, the charger connects to your WiFi. You can open a dashboard on your phone or laptop to see exactly what's happening. I added buttons to manually turn the charger on or off, and a settings page to change things like the cutoff voltage without needing to rewrite the code.

![Web dashboard](/projects/smart-charger/webapp-top.webp)
*The web interface lets you monitor and control the charger from any device.*


## Bill of Materials

AliExpress prices; all amounts are in CAD. The ESP32-C3 cost $1.00 CAD.

| Component | Unit Cost |
|---|---|
| ESP32-C3 Super Mini | $1.00 CAD |
| SSD1306 OLED display | $1.10 CAD |
| L7805CV 5V LDO regulator | $0.45 CAD |
| 5V relay module | $1.00 CAD |
| NPN transistor | $0.05 CAD |
| Resistors (3 total) | $0.02 CAD |
| Electrolytic capacitors (2 total) | $1.00 CAD |
| Wire (22AWG) | $0.50 CAD |
| XT60 connectors | $0.75 CAD |
| **Total** | **~$5.00 CAD** |

## Validation & Safety Control Logic
The firmware runs four safety checks:
1. **No-load detection**: open circuit detection.
2. **Under-voltage protection**: prevents over-discharged cells from charging.
3. **Charge complete**: prevents relay oscillation.
4. **Normal charging**: cuts off the relay when voltage and time thresholds are met.
