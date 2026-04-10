# Distributed Acoustic Network: Operational Testing

## Tactical Objective
The objective was the deployment of a distributed network of low-power nodes to execute synchronized acoustic disruptions. The operation served as the primary validation for ultra-low-power deep-sleep implementations on the ESP32 platform.

## Network Architecture
The operation utilized multiple ESP32 nodes communicating via the ESP-NOW peer-to-peer protocol. This architecture allowed for complex, low-latency coordination without the need for infrastructure-based WiFi, ensuring high operational discretion. To maintain visual non-attribution, the electronics were concealed within custom-engineered 3D printed deceptive enclosures (imitating consumer electronics).

## Power Management System
This project marked the first successful implementation of advanced duty-cycling on the ESP32 platform.
- **Micro-Sleep Integration**: Nodes utilized deep-sleep wake timers to minimize quiescent current draw.
- **Wake Interval Optimization**: The duty cycle was tuned to maintain acoustic efficacy while extending operational life to cover a full 24-hour deployment cycle on minimal LiPo capacity.
- **Protocol Selection**: ESP-NOW was selected for its minimal handshake overhead compared to standard 802.11 stacks.

## Operational Results
The deployment was a comprehensive success, validating both the ESP-NOW communication reliability and the viability of long-term battery-powered ESP32 nodes. The core duty-cycling logic developed for this operation became the telemetric foundation for subsequent iterations of the covert network node series (Eraser v3+).
