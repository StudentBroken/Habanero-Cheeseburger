# V-Plotter: Drawing Robot with Suspended Carriage

## Technical Objective
I built a V-plotter that draws by hanging a pen carriage from two stepper motors on strings. The motors adjust string lengths to move the pen across a surface based on inverse kinematics calculations.

## Development Timeline
I built this over a few days using borrowed time between school and other projects.
- **Design**: I modeled the frame and carriage during classes.
- **Kinematics**: I worked out the math for the inverse kinematics by hand.
- **Build**: I assembled everything and integrated the code in a single 9-hour session after school.

## Hardware Architecture and Power
The system runs on 12V from a USB-C Power Delivery supply (2A maximum).
- **Power Rails**: The 12V powers the stepper drivers directly. A 5V buck converter steps it down for the logic board and servo. The ESP32 uses its internal 3.3V regulator.
- **Main Controller**: ESP32-C3 running a web server for wireless drawing commands and status monitoring.
- **Motors**: Two NEMA 17 steppers suspended from the frame using high-tensile string.
- **Pen Control**: A small servo motor raises and lowers the pen (Z-axis).
- **Cooling**: A small fan blows over the stepper drivers to prevent overheating.

## Kinematic Theory & Mathematical Model
The V-Bot's movement is governed by Inverse Kinematics, which maps standard $(x, y)$ Cartesian coordinates to the specific cable lengths required for the two propulsion motors.

### 1. Geometry Breakdown
The robot operates in a 2D Cartesian plane with the left motor anchor typically serving as the origin $(0,0)$.
- **Anchor Width ($W$)**: Horizontal distance between motors.
- **Nacelle (Gondola) Width ($w$)**: Distance between cable attachment points on the carriage.

```text
(0,0)  Left Anchor                 Right Anchor (W,0)
    ●──────────────────────────────────────●
     \                                    /
      \  L_left                  L_right /
       \                                /
        ●──────────────────────────────●
        (x - w/2, y)      |       (x + w/2, y)
                    [ Gondola ]
```

### 2. Inverse Kinematics (IK)
To move the pen to a specific $(x, y)$ coordinate, the firmware calculates the required cable lengths $L_l$ and $L_r$ by offsetting the target by half the nacelle width:

- **Left Cable Length ($L_l$):** $L_l = \sqrt{(x - w/2)^2 + y^2}$
- **Right Cable Length ($L_r$):** $L_r = \sqrt{(W - (x + w/2))^2 + y^2}$

### 3. Forward Kinematics (FK)
Inverse to the positioning logic, Forward Kinematics determines the pen's actual $(x, y)$ location based on current cable lengths—essential for calibration and state validation.
- **X Component:** $x = \frac{L_l^2 - L_r^2 - (w/2)^2 + (W - w/2)^2}{2(W - w)}$
- **Y Component:** $y = \sqrt{L_l^2 - (x - w/2)^2}$

### 4. Calibration & Homing Logic
The system uses "Sensorless Homing" by utilizing the FK model:
1. **Zeroing:** Cables are fully retracted ($L_l=0, L_r=0$).
2. **Defined Release:** Motors release a precise, known length of string (e.g., $2000mm$).
3. **State Initialization:** The robot applies the Forward Kinematics formula to its current known $W$ and $L$ values to derive its physical starting $(x, y)$ coordinate.

### 5. Resolution & Step Conversion
Linear lengths ($mm$) are converted to discrete motor steps:

$$\text{Steps} = \text{Length (mm)} \times \text{Steps Per mm}$$

Because the suspended geometry is non-linear, the controller executes these calculations at high frequency during flight to ensure vectorized straight-line movements.

## Bill of Materials (BOM) & Economic Optimization
The project prioritized aggressive cost-reduction through bulk sourcing and component harvesting.

- **Motion Kit (4x Steppers, 4x A4988, RAMPS-style hat, Arduino Uno)**: $20.00
- **Logic Node (ESP32-C3)**: $1.00
- **Power Logic (USB-C PD Board, 5V BEC)**: $2.50
- **Actuator (9g Servo)**: $2.00
- **Frame (3D Printed PLA + electricity overhead)**: $5.00

**Total System Cost**: ~$30.50

## Failure Analysis
The stepper drivers from the cheap kit failed during testing. They overheated and burned out under the high torque needed for vertical string movements. The drivers in that kit just aren't made to handle sustained current draws. Future versions will use better quality drivers like Trinamic units that can handle the load reliably.

