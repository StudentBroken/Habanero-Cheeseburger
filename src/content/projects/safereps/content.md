# SafeReps — Movement Intelligence

SafeReps is a dual-stream coaching system built for home strength training. A Flutter app tracks 33 skeletal landmarks via Google ML Kit at 30 FPS, while a custom wrist wearable samples a 6-axis IMU at 100 Hz and streams the data over BLE. The two feeds are timestamp-aligned on-device, feeding a rep state machine that classifies every repetition for range of motion, momentum cheating, and neuromuscular fatigue. When a violation is detected, a priority-gated voice coach fires the relevant correction in real time.

Built at MariHacks IX in approximately 15 hours — hardware assembly, firmware, app, and pitch deck included. The team was two people; my partner was relatively new to both hardware and software, so a significant portion of the build time also involved teaching and pair programming rather than just heads-down development.

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile app | Flutter + Google ML Kit (pose landmarks at 30 FPS) |
| Wearable MCU | ESP32-C3 with BLE |
| Motion sensor | MPU6050 6-axis IMU at 100 Hz |
| DSP | On-chip high-pass filter + angular/linear velocity ratio |
| State machine | 5-stage FSM: Idle → Top → Descending → Bottom → Ascending |
| Voice coach | Priority-gated audio engine with Fisher-Yates shuffled cue pools |
| Calibration | 1-second T-Pose routine for automatic sensor-to-limb alignment |

## Hardware

The prototype BOM comes in under \$5, with a custom PCB at volume projected to drop it to ~\$3.

- **ESP32-C3** — logic and low-latency BLE connectivity
- **MPU6050** — 6-axis IMU, sampled at 100 Hz
- **400 mAh LiPo** — runtime of 12+ hours of active use
- **USB-C charge module** — integrated charging
- **Protection circuit** — 100 kΩ voltage divider for battery monitoring; diode and capacitor for transient protection

## Core Intelligence

### Rep State Machine

A 5-stage FSM governs every set: Idle → Top → Descending → Bottom → Ascending. State transitions are gated on joint angles crossing calibrated thresholds derived from the T-Pose calibration, so a rep is only counted when it reaches anatomically complete range of motion.

### On-Chip DSP

The ESP32-C3 runs two signal processing routines before sending data to the phone:

- **Tremor analysis** — a 100 Hz high-pass filter isolates neuromuscular jitter from intentional movement. Persistent jitter above threshold is flagged as a fatigue indicator before the user consciously feels it.
- **Cheat detection** — the ratio of angular velocity to linear acceleration distinguishes clean muscle contraction from momentum-driven swinging.

### T-Pose Calibration

A 1-second T-Pose at the start of each set performs two alignment steps: sensor zeroing (synchronizing wearable orientation to the skeletal model) and scaption alignment (correcting for mounting tilt against the user's specific limb geometry). This eliminates the need for any manual setup.

### Voice Coach

The audio engine uses priority gating so corrections always interrupt encouragement, never the other way around. Cue pools are shuffled with Fisher-Yates so the same phrase does not repeat until the entire pool has played through.

## Latency

The most significant engineering constraint was coaching latency. A cue that arrives 500 ms after a form violation is too late to be useful. The sensor-to-coach pipeline — BLE transfer, timestamp alignment, FSM evaluation, and audio dispatch — was optimized to fire corrections within milliseconds of detection.
