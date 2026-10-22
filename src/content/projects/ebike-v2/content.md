# Electric Bike (v2)

After the first motor controller failed, I bought a **VESC 6.7 Pro**. This was the first time I spent real money on a single part ($120.00 CAD). It made the motor run much smoother and even allowed the bike to charge itself slightly when braking (regenerative braking).

## System Architecture & Battery Safety

In the first version, the battery safety board (BMS) kept burning out because I was pulling too much power. To fix this, I rebuilt the battery with two plugs. One plug went through the BMS for safe charging, but the other plug went straight to the motor, bypassing all safety.

![Dual output battery setup](/projects/ebike-v2/battery-dual-output.webp)
*One plug is for charging, the other provides raw power directly to the motor.*

This was a serious safety failure, not a safe way to increase current. The motor was connected directly to a salvaged 18650 pack, bypassing the BMS's discharge protection. I had no per-cell-group low-voltage cutoff or overcurrent protection on that path. A pack-level voltage reading can hide a weak parallel group: if salvage cells have mismatched capacity or internal resistance, one group can sag much faster under load. Continued discharge can drive that group below its safe voltage and, in a series string, potentially into cell reversal while the total pack voltage still appears usable. That creates a severe cell-failure and fire risk.

![Burn marks on the original BMS](/projects/ebike-v2/battery-burned-bms.webp)
*The first BMS couldn't handle the current and started to melt.*


## Electrical & Firmware Implementation

First time using a VESC. I set battery max current to 40A, motor current to 40A, and left most other settings at their defaults after reading what each parameter actually did. The VESC handled the motor cleanly and gave regenerative braking — a huge step up from the RC ESC, which just cut power and coasted.

I spent a day on this. By end of day I understood current limits, duty cycle control, ADC input modes, and why RC ESCs fail in this application (they are tuned for propeller loads, not motors that stall, reverse, and experience high inertia).

### Throttle

I also redesigned the throttle. I used a small joystick module and hot-glued magnets to the bottom. I then glued magnets to the handlebars so the joystick could snap on and off instantly.

![Magnetic joystick throttle](/projects/ebike-v2/joystick.webp)
*The magnetic mount made it easy to take the throttle off when I parked the bike.*

## Mechanical Design & Fabrication

The friction drive was the mechanical weak point. I was constantly re-tensioning the motor against the tire. This was worsened by **PLA creep**: the main motor holder was 3D printed in PLA and held under constant tension to keep the motor pressed against the wheel. PLA deforms under sustained load over time. I realized this too late, and it served as a permanent lesson to never use plastic for structural, high-tension motor mounts. I upgraded to metal and never went back.

## Validation & Failure Analysis (Post-Mortem)

Top speed was around 40 km/h. I had no display or watt meter, so I carried a multimeter in my bag on the rear rack and checked resting cell voltage by hand when I stopped.

I rode to the McGill Engineering Expo that summer — 20 km from the South Shore, crossing the bridge. Got there with the pack sitting at roughly 3.5V per cell — close enough to the 3.0V low-voltage cutoff that I stopped and did not push further. At the expo, I tried asking the engineering department if I could borrow a DC bench supply to charge my pack to exactly 25.2V (4.2V/cell × 6S). Nobody took me seriously. I was 13. I finalized the build right after turning 14.

Around the same time, the VESC failed—specifically the internal BEC (Battery Eliminator Circuit). I never found out why it broke. As a 13-year-old with a $10.00 CAD soldering iron, I tried to fix it myself after being ignored by a micro-soldering guy on Facebook Marketplace. Predictably, trying to do micro-soldering on a high-density PCB with a cheap iron just ruined the traces. The VESC was eventually scrapped.

The battery remained the biggest risk. I wrongly carried over assumptions from balanced LiPo packs to a pack assembled from salvaged, potentially mismatched 18650 cells. A balanced starting voltage does not establish matched capacity or internal resistance, and checking total pack voltage cannot show whether one series group is approaching its lower limit. Without per-cell-group monitoring and a discharge cutoff, the weakest group could be over-discharged or reversed under load. Avoiding a short circuit was nowhere near enough protection.

The wiring compounded the risk. I used 18 AWG PVC-insulated wire bought by appearance from a local hobby electronics store, without understanding wire gauge or checking its rating. 18 AWG has a copper cross-section of about 0.82 mm². Typical low-voltage reference tables put 18 AWG around 10–16 A depending on the application, but there is no universal ampacity: the wire's construction, insulation rating, bundling, ambient temperature, and installation all matter, and the manufacturer's datasheet is authoritative. I configured the VESC for up to 40 A, but did not measure the actual wire current; that setting was far beyond what I should have assumed the wire could safely carry. Common PVC hookup-wire ratings are around 60 °C, while silicone-insulated wire is commonly rated around 105–200 °C and PTFE/Teflon wire can be rated around 200 °C; the actual product datasheet governs. The PVC insulation visibly deformed on longer rides. I now understand that wire must be sized from its documented current and temperature ratings, not selected by appearance.

In v4 I repeated the core BMS-bypass mistake while also making a more complex series/parallel charging setup. I left the pack on the charger much longer and used a high charge cutoff, without adequately considering cell drift or the consequences. That was another failure, not a safe architecture. The learning carried into v5, where I removed the bypass and used a BMS rated to protect both charge and discharge, and v6, which retained a BMS-based design.

## Bill of Materials

The only new cost on this build was the VESC — everything else carried over from v1.

| Component | Cost |
|---|---|
| VESC 6.7 Pro | ~$120.00 CAD |
| Joystick throttle module | ~$10.00 CAD (salvaged) |
| Magnets + epoxy | ~$5.00 CAD |
| **Total new spend** | **~$135.00 CAD** |
