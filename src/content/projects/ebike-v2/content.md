# Electric Bike (v2)

Built two weeks after v1, still 13. The RC plane ESC had just died, and my dad got me a VESC 6.7 Pro — the first time I ever spent real money on a single component, around $120 CAD. I spent a full day reading the VESC Tool documentation and forum posts to understand how to configure it. I set motor current to 40A on the same 6S8P 18650 pack — 48 cells total, roughly 5A per cell. Manageable, but the battery was still the hand-soldered fire hazard from v1.

## The BMS Problem

The v1 BMS was rated for 12A continuous. I was obviously pulling far more than that, and it burned. I rebuilt the pack with a second output connector that bypasses the BMS entirely for discharge. One connector goes through the BMS for charging; the other goes straight to the VESC.

This is not the right solution. Bypassing the BMS removes the only over-current and short-circuit protection on a pack built with copper wire bus bars and a $10 soldering iron. But it was either that or stay slow. I knew the risk and rode it anyway.

![Battery pack with two output connectors — BMS port and direct bypass](/projects/ebike-v2/battery-dual-output.webp)
*Left connector: through BMS, 12A limit. Right connector: direct to cells, no protection.*

![Top view of the battery showing burn marks on the v1 BMS](/projects/ebike-v2/battery-burned-bms.webp)
*The burned v1 BMS — visible scorch marks where it failed under load.*

## VESC Configuration

First time using a VESC. I set battery max current to 40A, motor current to 40A, and left most other settings at their defaults after reading what each parameter actually did. The VESC handled the motor cleanly and gave regenerative braking — a huge step up from the RC ESC, which just cut power and coasted.

I spent a day on this. By end of day I understood current limits, duty cycle control, ADC input modes, and why RC ESCs fail in this application (they are tuned for propeller loads, not motors that stall, reverse, and experience high inertia).

## Throttle

The old potentiometer-plus-Arduino setup was gone. The VESC has a native ADC input for analog throttle signals. I wired the joystick module's analog output directly into the VESC ADC connector.

The joystick itself was a bare wired skateboard remote module, no casing. I hot-glued magnets under it and epoxied corresponding magnets onto the handlebar. It detaches and reattaches by touch. Pushing the stick forward drove the motor; pulling it back engaged regen braking. I could let go of the handlebar and steer with body weight while keeping a thumb on the joystick — genuinely useful for posture on long rides.

![VESC ADC input connector wired to the joystick throttle module](/projects/ebike-v2/vesc-throttle.webp)
*VESC ADC input connector — direct analog wiring, no microcontroller in the loop.*

![Joystick module with hot-glued magnets](/projects/ebike-v2/joystick.webp)
*Joystick bare module — magnets hot-glued underneath, sticks to epoxy mounts on the handlebar.*

## Performance and the McGill Expo Ride

Top speed was around 40 km/h. I had no display or watt meter, so I carried a multimeter in my bag on the rear rack and checked resting cell voltage by hand when I stopped.

I rode to the McGill Engineering Expo that summer — 20 km from the South Shore, crossing the bridge. Got there with the pack sitting at roughly 3.5V per cell — close enough to the 3.0V low-voltage cutoff that I stopped and did not push further. At the expo, I tried asking the engineering department if I could borrow a DC bench supply to charge my pack to exactly 25.2V (4.2V/cell × 6S). Nobody took me seriously. I was 13.

## Bill of Materials

The only new cost on this build was the VESC — everything else carried over from v1.

| Component | Cost |
|---|---|
| VESC 6.7 Pro | ~$120.00 CAD |
| Joystick throttle module | ~$10.00 CAD (salvaged) |
| Magnets + epoxy | ~$5.00 CAD |
| **Total new spend** | **~$135.00 CAD** |

## Post-Mortem

The friction drive was the mechanical weak point. I was constantly re-tensioning the motor against the tire. This was worsened by **PLA Creep**: the main motor holder was 3D printed in PLA and held under constant tension to keep the motor pressed against the wheel. PLA deforms under sustained load over time. I realized this too late, and it served as a permanent lesson to never use plastic for structural, high-tension motor mounts. I upgraded to metal and never went back.

Around the same time, the VESC failed—specifically the internal BEC (Battery Eliminator Circuit). I never found out why it broke. As a 13-year-old with a $10 soldering iron, I tried to fix it myself after being ignored by a micro-soldering guy on Facebook Marketplace. Predictably, trying to do micro-soldering on a high-density PCB with a cheap iron just ruined the traces. The VESC was eventually scrapped.

The battery remained the biggest risk — and looking back, the BMS bypass was a genuinely bad idea that I would not repeat. At the time, my only experience with batteries was LiPo packs with balance leads. With a balanced, fully charged LiPo pack, you can discharge to around 10% without meaningful cell drift — the cells track each other closely when they start in balance. That was my mental model here: if the pack was charged and balanced, I just needed to avoid a dead short and not over-discharge. I did not yet understand that a purpose-built battery pack from salvage cells with hand-soldered copper bus bars and no individual cell monitoring was a fundamentally different risk category. I did not fully internalize why that distinction mattered until around v4-v5.

The wiring made it worse. I bought cheap PVC-insulated wire from a local hardware store. PVC insulation starts to soften and melt around 60–70°C, and at 40A it was clearly running warm. The insulation was visibly deforming on longer rides. Silicone wire handles heat properly; PVC does not. That was a fire risk I did not even know I was carrying.
