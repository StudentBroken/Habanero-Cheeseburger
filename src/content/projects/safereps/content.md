## Overview
SafeReps is a dual-stream coaching ecosystem that bridges the gap between following a workout video and having a personal trainer standing in the room. By fusing phone-based computer vision with a high-fidelity wearable sensor, SafeReps ensures every repetition is safe, effective, and counted with precision.

When you work out alone at home, you're "training blind." Workout videos can't see you, and static apps can't correct your form. SafeReps solves this by building a **Digital Twin** of your performance.

It detects the "invisible" physics of a rep—muscle tremors and momentum cheating—that no camera can catch alone. The moment your form degrades, the AI voice coach fires immediately to correct you mid-set.

## Key Features
- **Dual-Stream Sensor Fusion**: Merges 30 FPS vision landmarks with 100Hz high-fidelity IMU data.
- **Invisible Fatigue Detection**: Catch neuromuscular tremors before you feel them to prevent injury.
- **Cheat Detection**: Distinguishes between clean muscle contraction and momentum-based swinging.
- **AI Voice Coach**: Priority-gated audio feedback that provides corrections exactly when they happen.
- **T-Pose Auto-Calibration**: 1-second routine that aligns the wearable to your specific limb geometry.

## Hardware Architecture
SafeReps is designed for extreme accessibility. The prototype costs under $5 in components, proving that coaching-grade hardware doesn't have to be a luxury product.

- **ESP32-C3**: Logic & Bluetooth connectivity.
- **MPU6050**: 6-axis inertial measurement unit.
- **400mAh LiPo**: Portable power for 12+ hours of active training.
- **USB-C Module**: Integrated charging.

## Core Intelligence
### 1. The Rep State Machine
SafeReps manages a Finite State Machine (FSM) for every set to ensure movement is anatomically complete. Transitions are triggered by joint angles crossing calibrated thresholds, ensuring reps are only counted when they reach full range.

### 2. High-Speed DSP
The ESP32-C3 wearable performs real-time Digital Signal Processing (DSP) before data hit the app:
- **Tremor Analysis**: A 100Hz high-pass filter isolates neuromuscular jitter from intentional movement.
- **Cheat Detection**: Calculates the ratio of Angular Velocity to Linear Acceleration to catch momentum-based swings.

### 3. T-Pose Calibration
Accuracy starts with alignment. SafeReps requires a 1-second T-Pose before every set. This enables **Sensor Zeroing** and **Scaption Alignment** (correcting for mounting tilt).
