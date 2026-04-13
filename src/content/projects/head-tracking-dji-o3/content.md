# Head Tracking DJI O3 Air Unit

A 2-axis head-tracking gimbal system built for the DJI Goggles 3 and O3 Air Unit. Two ESP32-C3s communicate over ESP-NOW — one on the goggles reading head orientation, one on the drone driving the servos.

The mechanical design was sketched out during a math exam. The teacher was not pleased.

## Hardware

The gimbal assembly is custom-designed and FDM-printed, housing two micro-servos for pan and tilt. A buck regulator accepts 2S–6S battery input so it runs off whatever is powering the aircraft.

- **Goggles-side** — ESP32-C3 + MPU6050 IMU
- **Drone-side** — ESP32-C3 + two micro-servos (pan on pin 7, tilt on pin 6)

## Bill of Materials

The DJI O3 Air Unit is not included — it's shared with the FPV drone builds.

| Component | Cost |
|---|---|
| ESP32-C3 Super Mini × 2 | $2.00 |
| MPU6050 gyro/accelerometer module | $3.00 |
| Micro-servos × 2 (pan + tilt) | $5.00 |
| Switching buck converter | $1.00 |
| Cooling fan (small) | $2.00 |
| 3D printed parts (PLA) | $3.00 |
| Misc (wire, connectors, hardware) | $1.00 |
| **Total** | **$17.00** |

## Transmitter Firmware

The goggles-side ESP32 uses the MPU6050's onboard DMP (Digital Motion Processor) to compute quaternion-based yaw/pitch/roll, avoiding the drift that comes from integrating raw gyro data. On boot it runs an auto-calibration routine: it collects 200 DMP packets at rest and averages yaw and pitch to compute offsets, so the gimbal centers itself regardless of how the goggles are sitting when powered on.

Only yaw and pitch are transmitted — roll is discarded since the gimbal has no roll axis. Each packet is a `secure_message` struct carrying the two angles, an incrementing sequence number, and a checksum. The receiver uses both to reject duplicate, out-of-order, and corrupted packets.

## Receiver Firmware

The drone-side ESP32 receives ESP-NOW packets, validates the checksum and sequence number, then maps the angles to servo pulse widths. Yaw maps to ±90° pan, pitch maps to ±45° tilt. A 0.5° input deadzone prevents the servos from hunting around center when the head is still.

Servo movement is smoothed with an exponential filter (α = 0.07), which eliminates the jerkiness that comes from discrete angle steps and makes the gimbal motion feel proportional to head movement speed. If no valid packet arrives for 1.5 seconds, the servos automatically return to center — so a lost link doesn't leave the camera pointing at the ground.

The receiver drives the servos directly without going through the flight controller or MSP, keeping the control path short and the latency low.

## Gyro Drift & Calibration

The first approach used raw gyro data — integrating angular velocity over time to estimate orientation. The problem is that gyros accumulate small errors with every reading, and those errors add up. Over a few minutes of use the gimbal would slowly drift off center even with the head perfectly still, which makes the system unusable for any sustained flight.

The fix is the MPU6050's onboard DMP, which fuses gyro and accelerometer data into a quaternion representation of orientation. The accelerometer provides an absolute gravity reference that constantly corrects the gyro drift, so the angle estimate stays stable over time without wandering.

Calibration is a separate problem. Every MPU6050 unit has its own factory bias on each axis — the "zero" reading at rest is never actually zero. The firmware handles this in two layers: hardware offsets baked into the code for the specific chip, and a software auto-calibration on every boot that measures the resting angle and subtracts it. This means the gimbal doesn't need to be in any particular position at power-on to center correctly.
