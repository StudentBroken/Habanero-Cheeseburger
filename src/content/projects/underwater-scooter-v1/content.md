# Electric Underwater Scooter (v1)

A operational electric underwater scooter built in just two days on a tight budget. The primary goal was to create a functional, motorized propulsion device for under $50. Using a custom 3D-printed housing, it achieves speeds up to 3 km/h underwater and prioritizes absolute simplicity over complex electronics.

## Design & Inspiration

I wanted a quick propulsion device for the water without dropping hundreds of dollars on a commercial unit. The design phase focused entirely on rapid prototyping. I drafted the 3D models from scratch to hold the necessary batteries and fit the motors. The entire process proved that a functional underwater vehicle could be engineered over a single weekend.

## Hardware & Electronics

To keep the costs strictly between $25 and $50, I eliminated the need for a dedicated Electronic Speed Controller (ESC). 

- **Power Source** — Two 3S 21700 lithium battery packs provide the current required for the thrusters.
- **Housing** — Custom designed and 3D printed to enclose the components.
- **Direct Control** — Uses a heavy-duty physical switch to close the circuit, making it extremely straightforward to operate.
- **Voltage Monitoring** — An ESP32-C3 is wired into the system to read the battery pack voltage. It outputs the status to an external LED, acting as a visual indicator to prevent over-discharging the cells.

## Software & Logic

Because the thruster is driven directly via a hardware switch, there is virtually no complex logic required for propulsion. The software is limited entirely to the ESP32-C3 firmware. It acts as a rudimentary voltage monitor, polling the battery levels and mapping the reading to the external LED display. 

## Challenges & Lessons Learned

Building a functional submersible in 48 hours came with expected compromises.

- **Direct Drive Operation** — Running without an ESC makes the system rugged and simple, but lacks proportional speed control. It's an all-or-nothing power curve.
- **Version 1 Constraints** — This first iteration proved the concept and power delivery, paving the way for future improvements in controls and sealing.
