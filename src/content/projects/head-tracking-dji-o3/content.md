# Precision Kinematic Telemetry: DJI O3 Head-Tracking Gimbal

## Design Objective
The objective was the development of a low-latency, 2-axis head-tracking gimbal system for the DJI O3 Air Unit and Goggles 3. The platform leverages high-frequency inertial measurement (IMU) data to provide real-time optical orientation control for FPV operations.

## System Architecture
The hardware utilizes a distributed logic topology consisting of two ESP32-C3 microprocessors communicating via the ESP-NOW peer-to-peer protocol to ensure minimal command latency.
- **Inertial Node**: MPU-6050 (IMU) mounted to the eyewear, executing high-speed orientation polling.
- **Processing & Transmission**: Primary ESP32-C3 (Goggle-side) executes signal filtering and coordinate packetization.
- **Actuation & Reception**: Secondary ESP32-C3 (Vehicle-side) decodes the ESP-NOW stream into precise PWM signals for the gimbal servos.
- **Power Delivery**: Integrated buck regulation stage, rated for 2S-6S (8.4V-25.2V) input transients.

## Structural Engineering
The gimbal assembly is a custom-fabricated FDM-printed system, engineered for high rigidity and minimal volumetric displacement of the O3 Air Unit optics. The axes are driven by high-torque micro-servos, providing 180-degree spherical coverage.

## Operational Conclusion
Validation testing confirmed near-zero perceived latency in the control loop. The ESP-NOW implementation successfully decoupled the head-tracking telemetry from the primary 2.4GHz/5.8GHz video and control links, ensuring a robust, interference-resistant experience. The platform demonstrates the feasibility of high-fidelity DIY gimbal integration within the DJI digital ecosystem.
