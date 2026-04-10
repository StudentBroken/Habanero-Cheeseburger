# Autonomous Avionics Suite: RC Flying Wing

## Design Objective
The objective was the development of a centralized avionics and signal-translation subsystem for a high-performance fixed-wing platform. The project focused on the integration of disparate telemetry protocols (CRSF to SBUS) into a single, custom-fabricated PCB.

## Avionics Architecture
The system utilizes an ESP32 microprocessor as the primary signal-translation node, successfully bridging the high-speed CRSF stream from an ELRS receiver to the legacy SBUS protocol required by the flight controller. The dual-axis elevon configuration is driven by 2g micro-servos, with all telemetry, video transmission (VTX), and optics integrated directly into the custom-routed control board to minimize volumetric displacement and improve center-of-gravity management.

- **RF Protocol**: ELRS (ExpressLRS) via CRSF.
- **Logic Node**: ESP32 (proprietary CRSF to SBUS translation).
- **Actuation**: Dual high-torque 2g micro-servos.

## Status & Conclusion
The bench testing phase successfully validated the signal integrity of the custom-fabricated board and the reliability of the command-link translation logic. While the airframe construction was completed, the platform remains in a pre-flight "archived" state due to the prioritization of subsequent high-dynamic multirotor deployments. The project serves as a validated engineering model for custom fixed-wing avionics integration.
