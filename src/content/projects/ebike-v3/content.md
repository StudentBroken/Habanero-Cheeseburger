# Electric Bike (v3)

Built at 15, a few months after a trip to China — the first build where I actually did metalwork instead of just 3D printing brackets and hoping they'd hold. The core goal was moving from the tire-friction drive of v1/v2 to a mid-drive system with real mechanical advantage through a chain and sprocket reduction.

## Drivetrain & Gearing

I removed the pedal chain entirely and mounted a 10-tooth sprocket on the 6384 outrunner motor, driving the stock 33-tooth rear wheel sprocket. That gives a 3.3:1 reduction. At 120KV and 6S (roughly 22V), the motor spins at around 2640 RPM at no load, which drops to a usable wheel speed around 45 km/h once the reduction is applied.

The gears were cheap Chinese chainrings sourced online. They worked, but the chain tension was never stable because of the mount.

![Chinese-sourced motor sprocket and rear chainring](/projects/ebike-v3/the-gears-i-bought-chineese.webp)
*10T motor sprocket to 33T rear — 3.3:1 reduction.*

## Motor Mount

The motor was attached to the frame using the water bottle cage mounts as anchor points, plus hardware store L-brackets. To clamp the L-brackets securely to the frame tubes, I cut a groove in each bracket and threaded a metal screw tie through it, then cinched it around the tube. It held, but it was not rigid under dynamic torque — the brackets still deformed over time.

For the first time I also used rivnuts. I had no proper rivnut tool, so I fabricated a contraption from whatever hardware I had at hand to pull the mandrel and set them. It worked well enough to be a permanent fixture. The rivnuts gave me threaded inserts in the frame without welding, which was the right call given the tools available.

I also modeled up a 3D-printed PLA bracket for the battery tray from the frame fitment reference photo, and mounted the VESC at the front of the frame.

![Improvised motor mount with L-brackets and PLA battery tray](/projects/ebike-v3/the-motor-mount-improvised-and-a-pla-bracket-for-the-battery-and-the-vesc-mounted-in-the-front.webp)
*Motor mount, PLA battery tray, and VESC visible. Functional, barely.*

![Frame fitment reference for the CAD model](/projects/ebike-v3/the-fitment-in-the-frame-referance-for-the-3d-model.webp)
*Photo used as reference geometry for the 3D printed bracket.*

## Battery

Same general construction as v1/v2 — salvage 18650 cells, foam and duct tape wrap. The difference was I now had a spot welder. These were my first spot welds ever. The cells were sourced for about $1 each and I skipped proper capacity testing, only checking voltage. I did not know at the time that voltage tells you nothing about actual capacity — these cells ranged from 2500 to 2900 mAh, which is weak for 18650s, and I had no idea.

![Raw 18650 cells before building the pack](/projects/ebike-v3/the-batteries-after-i-brought-them-home.webp)
*Cells fresh from the source — voltage checked, capacity unknown.*

![First ever spot welds on 18650 cells](/projects/ebike-v3/the-batteries-spot-welding-them-the-first-spotwelds-of-my-life.webp)
*First spot welds of my life. The technique improved across the pack.*

![Battery pack interior with foam and duct tape](/projects/ebike-v3/the-battery-pack-with-the-foam-and-ducktape-this-is-the-inside-view.webp)
*Pack interior — foam padding and duct tape, consistent with the v1/v2 build standard.*

## Dashboard

Before adding the BLE bridge, I built a local dashboard: a 0.91-inch OLED wired to an ESP32, displaying speed, battery voltage, and SOC in real time. I knew voltage alone tells you the state of charge on a lithium cell when the pack is at rest — voltage under load is a different story, but for a rough fuel gauge it was sufficient.

The OLED was the reason the first VESC died. While wiring the ESP32 to the VESC UART connector, I accidentally shorted a data pin to ground. That was enough to kill the BEC. Not a component quality failure — a wiring mistake. It was only after I replaced the VESC and looked more carefully at what happened that I understood the root cause.

## BLE Telemetry

For the first time, I added real-time telemetry. I flashed an open-source project — [VescBLEBridge](https://github.com/A-Emile/VescBLEBridge) — to an ESP32, which bridges the VESC UART output to Bluetooth Low Energy. This let me read voltage, speed, and current from my phone while riding. First time using PlatformIO and VSCode for an ESP32 project (I had used PlatformIO before at 13 for flashing Klipper to an Ender 3, but this was different — compiling and uploading actual firmware logic, not just a config).

## VESC Failures

This build killed two VESCs:

**VESC #1** — same 75100 model, bought cheap. The internal BEC failed. The actual cause was my own fault: while wiring the OLED ESP32 to the VESC UART, I shorted a data pin to ground and killed the BEC. I did not realize this at the time and assumed it was a component failure.

**VESC #2** — same result. Different unit, same failure. At this point two identical controllers failed in identical ways on identical hardware, which means the budget 75100 BEC is the weak link, not my wiring or setup.

**VESC #3** (current) — sourced from a more reputable seller at $75. Still has a known defect: the ADC reads voltage approximately 1V higher than actual. Liveable at $75. In all other functions it works correctly. You get what you pay for.

## Bill of Materials

| Component | Cost |
|---|---|
| 6384 Outrunner 120KV | ~$40.00 CAD |
| VESC 75100 ×2 (both failed) | ~$120.00 CAD |
| VESC 75100 (reputable seller) | ~$75.00 CAD |
| Chainring + 10T motor sprocket | ~$20.00 CAD |
| L-brackets + hardware | ~$10.00 CAD |
| 18650 cells (~$1 each) | ~$50.00 CAD |
| ESP32 + misc | ~$10.00 CAD |
| **Total** | **~$325.00 CAD** |

## Post-Mortem

The build worked but it was not good. The L-bracket mount was always borderline, the chain tension was never consistent, and the overall aesthetic was half-professional, half-improvised — because it was. The pedals were effectively useless dead weight since the chain was removed; pushing them felt like pedaling through air.

The two VESC failures were expensive. Cheap ESCs for high-current mid-drive applications are not a good deal when you factor in replacement cost. The lesson — buy from a reputable source once, not a cheap source twice — cost me $120 to learn.

The capacity issue with the cells was a knowledge gap. I only tested voltage, not capacity. A proper pull test under load would have revealed the weak cells before the pack was built. I learned to always pull-test cells after this build.

The BLE telemetry was the one genuine upgrade. Riding with actual data — voltage, current, speed — on my phone changed my understanding of the system significantly. Watching the voltage sag under load in real time gave me a much better intuition for what the pack was and wasn't capable of.
