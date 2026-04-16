# V-Plotter: Drawing Robot with Suspended Carriage

## Technical Objective
Built a V-plotter that draws by hanging a pen carriage from two stepper motors on strings. The motors adjust string lengths to move the pen across a surface based on inverse kinematics calculations.

## Development Timeline
I built this over a few days using borrowed time between school and other projects.
- **Design**: I modeled the frame and carriage during classes.
- **Kinematics**: I worked out the math for the inverse kinematics by hand.
- **Build**: I assembled everything and integrated the code in a single 9-hour session after school.

## Hardware Integration
The system runs on 12V from a USB-C Power Delivery supply (2A maximum).
- **Power Rails**: The 12V powers the stepper drivers directly. A 5V buck converter steps it down for the logic board and servo. The ESP32 uses its internal 3.3V regulator.
- **Main Controller**: ESP32-C3 running a web server for wireless drawing commands and status monitoring.
- **Motors**: Two NEMA 17 steppers suspended from the frame using high-tensile string.
- **Pen Control**: A small servo motor raises and lowers the pen (Z-axis).
- **Cooling**: A small fan blows over the stepper drivers to prevent overheating.

## Inverse Kinematics
Wrote a custom ESP32 firmware engine to calculate real-time Inverse Kinematics for a suspended cable system. The math translates standard (X,Y) cartesian coordinates into required line lengths for the left and right steppers. I used forward kinematics for Known-State Initialization — by fully retracting the cables to zero, then defined releasing a known length (e.g., 2000mm), the algorithm infers the bot's physical (X,Y) starting position. These linear measurements are converted into motor steps and run at high frequency to ensure smooth vectorized movements.

## Bill of Materials
The project prioritized aggressive cost-reduction through bulk sourcing and component harvesting.

- **Motion Kit (4x Steppers, 4x A4988, RAMPS-style hat, Arduino Uno)**: $20.00
- **Logic Node (ESP32-C3)**: $1.00
- **Power Logic (USB-C PD Board, 5V BEC)**: $2.50
- **Actuator (9g Servo)**: $2.00
- **Frame (3D Printed PLA + electricity overhead)**: $5.00

**Total System Cost**: ~$30.50

## Post-Mortem
The stepper drivers from the cheap kit failed during testing. They overheated and burned out under the high torque needed for vertical string movements. The drivers in that kit just aren't made to handle sustained current draws. Future versions will use better quality drivers like Trinamic units that can handle the load reliably.

