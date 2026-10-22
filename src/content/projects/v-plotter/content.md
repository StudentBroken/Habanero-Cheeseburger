# V-Plotter: Drawing Robot with Suspended Carriage

## System Architecture
Built a V-plotter that draws by hanging a pen carriage from two stepper motors on strings. The motors adjust string lengths to move the pen across a surface based on inverse kinematics calculations.

## Mechanical Design & Fabrication
I built this over a few days using borrowed time between school and other projects.
- **Design**: I modeled the frame and carriage during classes.
- **Kinematics**: I worked out the math for the inverse kinematics by hand.
- **Build**: I assembled everything and integrated the code in a single 9-hour session after school.

## Electrical & Firmware Implementation
The system runs on 12V from a USB-C Power Delivery supply (2A maximum).
- **Power Rails**: The 12V powers the stepper drivers directly. A 5V buck converter steps it down for the logic board and servo. The ESP32 uses its internal 3.3V regulator.
- **Main Controller**: ESP32-C3 running a web server for wireless drawing commands and status monitoring.
- **Motors**: Two NEMA 17 steppers suspended from the frame using high-tensile string.
- **Pen Control**: A small servo motor raises and lowers the pen (Z-axis).
- **Cooling**: A small fan blows over the stepper drivers to prevent overheating.

### Motion Control & Inverse Kinematics

The math for this robot was the hardest part. I had to write a custom engine that calculates exactly how long each string needs to be to reach a specific point on the whiteboard.

![Powered on via USB-C PD](/projects/v-plotter/on-whiteboard-front.webp)
*The robot hanging on a whiteboard. It uses two strings to move the pen.*

Instead of simple X and Y coordinates, the robot thinks in string lengths. I programmed it to "home" itself by pulling both strings all the way in, giving it a known starting point before it begins to draw.

## Bill of Materials
I tried to make this as cheap as possible by using common parts.

- **Motion Kit**: $20.00 CAD
- **Brain (ESP32-C3)**: $1.00 CAD
- **Power Parts**: $2.50 CAD
- **Servo Motor**: $2.00 CAD
- **3D Printed Frame**: $5.00 CAD

**Total Cost**: ~$30.50 CAD

## Validation & Failure Analysis (Post-Mortem)

One A4988 driver failed during testing while moving the pen carriage. This happened before I added the cooling fan described above. I did not record the VREF/current-limit setting, driver temperature, or whether the motor was ever disconnected while energized, so I cannot establish the electrical root cause after the fact. An incorrect current limit, inadequate thermal management, or a transient can each damage a stepper driver; the failure alone does not tell me which occurred. The useful lesson is to verify the driver's current limit against the motor, provide suitable cooling, and avoid connecting or disconnecting a motor while the driver is powered, then validate those conditions during testing.

![Blown stepper driver](/projects/v-plotter/blown-a4988-driver.webp)
*An A4988 driver that failed during testing, before the cooling fan was added.*

