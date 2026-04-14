# Electric Underwater Scooter (v1)

A working electric underwater scooter built in just two days on a tight budget. The primary goal was to create a simple motorized scooter for under $50. Using a custom 3D-printed housing, it achieves speeds up to 3 km/h underwater and prioritizes simple parts over complex electronics.

## Design & Inspiration

I wanted a quick way to move through the water without spending hundreds of dollars on a commercial unit. The design phase focused entirely on rapid prototyping. I drafted the 3D models from scratch to hold the batteries and fit the motors. The project proved that a working underwater vehicle could be built in a single weekend.

## Hardware & Electronics

To keep the costs strictly between $25 and $50, I eliminated the need for a dedicated Electronic Speed Controller (ESC). 

- **Power Source** — Two 3S 21700 lithium battery packs provide the current required for the thrusters.
- **Housing** — Custom designed and 3D printed to enclose the components.
- **Direct Control** — Uses a heavy-duty physical switch to close the circuit, making it extremely straightforward to operate.
- **Voltage Monitoring** — An ESP32-C3 is wired into the system to read the battery pack voltage. It outputs the status to an external LED, acting as a visual indicator to prevent over-discharging the cells.

## Software & Logic

Because the thruster is driven directly by a switch, there is no complex logic needed for it to move. The software is just for the ESP32-C3 firmware, which acts as a simple voltage monitor, checking the battery levels and showing them on the external LED. 

## Challenges & Lessons Learned

- **Direct Drive** — Operating without an ESC makes the system rugged and simple, but it lacks speed control—it's either full speed or off.
- **Version 1 Constraints** — This first version proved it could work and deliver power, paving the way for better controls and sealing in the next one.
