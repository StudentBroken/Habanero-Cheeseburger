# Electric Underwater Scooter (v1)

A working electric underwater scooter built in two days on a tight budget under $50. Using a custom 3D-printed housing, it achieves speeds up to 3 km/h underwater with a simple design focused on cost over complexity.

## Design & Inspiration

I wanted a way to move through water without spending hundreds on a commercial unit. The design phase focused on rapid prototyping. I drafted 3D models from scratch to hold the batteries and fit the motors. The project proved that a working underwater vehicle could be built in a weekend.

## Hardware & Electronics

To keep costs under $50, I skipped an Electronic Speed Controller (ESC) and drove the motor directly.

- **Power Source** — Two 3S 21700 lithium battery packs power the thrusters.
- **Housing** — Custom 3D-printed to enclose the components.
- **Direct Control** — A heavy-duty physical switch closes the circuit. No ESC means no speed control, but the design stays simple.
- **Voltage Monitoring** — An ESP32-C3 reads battery voltage and displays the status on an external LED to prevent over-discharge.

## Software & Logic

With direct motor control via switch, no complex logic is needed for propulsion. The ESP32-C3 firmware monitors battery voltage and displays status on the LED. 

## Challenges & Lessons Learned

- **Direct Drive** — Operating without an ESC keeps the system simple and durable, but eliminates speed control. The motor runs at full power or off.
- **Version 1 Constraints** — This version proved the concept and identified the need for speed control and better sealing in future builds.
