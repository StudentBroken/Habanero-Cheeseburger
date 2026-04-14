# Electric Underwater Scooter (v2)

A brushless redesign of the v1 scooter. The goal was straightforward: more speed, more thrust, and a cleaner electrical system — without spending much more than the original build. The result is roughly double the speed and more than double the power, using mostly salvaged parts.

## Why Brushless

The v1 used brushed motors driven directly by a switch. It worked, but the torque curve was flat and the top speed was limited. Switching to a brushless outrunner unlocks substantially more power from the same battery chemistry, at the cost of needing an ESC and firmware.

The motor is a 5065 outrunner salvaged from a Leafboard Gen 1 electric skateboard. Generic equivalents run around 40\$ new. The ESC is a waterproof unit rated for the current draw, sourced for 25\$.

One hard lesson from this build: drone ESCs are not suitable for underwater propulsion. They are tuned for high-RPM, low-torque loads. Underwater thrusters need the opposite — high torque at low RPM. The KV rating on available motors is also often unlisted or inconsistent, which makes selecting the right motor more of an experiment than a calculation.

## Electronics & Potting

The central unit is an ESP32-C3 Super Mini. A resistor voltage divider scales the 11.1 V (3S) pack down to ADC range; the firmware reads this on pin 0 with a scale factor of 8.78 and maps the voltage to a battery percentage. An RGB LED (three separate GPIOs) displays the result as a color gradient — green above 80%, cyan at 60–80%, yellow-green at 40–60%, yellow at 20–40%, and red below that.

The button wiring uses the internal pull-up. A hold triggers the motor at the current power level; releasing stops it. A double-press (within 300 ms) cycles through three power modes: HIGH (full forward pulse), MEDIUM (66% of throttle range), and LOW (33%). During mode selection the RGB LED shows the selected mode — red for high, blue for medium, green for low — before returning to battery display.

Holding the button at boot skips ESC arming and enters OTA (Over-The-Air) mode, indicated by a pulsing blue LED. This was a mandatory engineering requirement, not a convenience feature: because the ESP32 is permanently potted in liquid electrical tape, there is zero physical access to the debug or serial ports. Architecting a wireless fail-safe was the only way to ensure the hardware wouldn't become a "brick" the moment a software edge case was discovered.

Potting with liquid electrical tape seals the board against water without the weight of a plastic case, bringing the cost down to about $5 for materials.

## Firmware and Control Logic

I used AI to generate boilerplate code, which let me focus on the actual control logic. The core work was building a state machine that switches between power modes and handles safety interlocks correctly.

I wrote a custom debounce routine to filter the underwater switch noise and designed the OTA boot sequence carefully so the firmware can be updated wirelessly—essential since the board is permanently sealed in potting and has no debug port. I also audited the generated code by hand to catch logic errors that could cause runaway motor or thermal issues.

## Mechanical Design

The chassis is PLA, designed in CAD and printed on an Ender 3. Getting everything to fit took many revisions — the brushless motor is physically larger than the brushed units in v1, and the waterproof ESC adds volume that had to be routed carefully. The final design is compact and holds together well.

Plastic cost for the chassis was around $10 in filament across all iterations.

## Bill of Materials

- **Motor (Leafboard 5065 Brushless Outrunner)**: Free (salvaged)
- **Speed Controller (60A Waterproof ESC)**: $25.00
- **Controller Board (ESP32-C3 Super Mini + RGB LED)**: $4.00
- **Chassis (3D Printed PLA)**: $10.00
- **Battery (2x 3S 21700 Li-Ion)**: $15.00
- **Potting (Liquid Electrical Tape)**: $5.00

**Total Out-of-Pocket Cost**: ~$59.00

## Lessons Learned

- **Drone ESCs fail underwater.** The torque characteristics are wrong for propeller loads at low RPM. Use an ESC rated for the application, not repurposed quadcopter hardware.
- **KV is poorly documented on cheap motors.** If the KV is unlisted, expect to test empirically rather than calculate gear ratios or prop pitch in advance.
- **Potting works.** Liquid electrical tape is inexpensive, easy to apply, and effective at sealing low-profile boards. It is now the default approach for any electronics near water.
