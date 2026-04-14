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

The goggles-side ESP32 uses the MPU6050's onboard motion processor to compute yaw and pitch, avoiding drift from integrating raw gyro data. On boot it collects 200 motion samples at rest and computes offsets, so the gimbal centers itself regardless of how the goggles are sitting when powered on.

Only yaw and pitch are transmitted — roll is discarded since the gimbal has no roll axis. Each packet carries the two angles, a sequence number, and a checksum. The receiver uses both to reject duplicate, out-of-order, and corrupted packets.

## Receiver Firmware

The drone-side ESP32 receives packets, validates the checksum and sequence number, then maps the angles to servo pulse widths. Yaw maps to ±90° pan, pitch maps to ±45° tilt. A 0.5° input deadzone prevents the servos from drifting around center when the head is still.

Servo movement is smoothed with an exponential filter to eliminate jerkiness from discrete angle steps. If no valid packet arrives for 1.5 seconds, the servos return to center automatically, so a lost link doesn't leave the camera pointing at the ground.

The receiver drives the servos directly without going through the flight controller, keeping latency low.

## Gyro Drift & Calibration

The first approach used raw gyro data, integrating angular velocity over time to estimate orientation. The problem is that gyros accumulate error with every reading, and over a few minutes the gimbal drifted off center even with the head still.

The fix is the motion processor, which fuses gyro and accelerometer data. The accelerometer provides an absolute gravity reference that corrects gyro drift, so the angle estimate stays stable without drifting.

Calibration is separate. Every MPU6050 unit has its own factory bias on each axis. The firmware corrects this in two layers: hardware offsets coded for the specific chip, and a software calibration on every boot that measures the resting angle and subtracts it. This means the gimbal centers correctly regardless of power-on position.
