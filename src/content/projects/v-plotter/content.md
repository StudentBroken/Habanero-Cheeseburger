# Kinematic Drawing Platform: V-Bot (V-Plotter)

## Technical Objective
The objective was the engineering of a portable, self-contained V-plotter robot for automated, large-scale drawing. The platform utilizes a dual-stepper suspended architecture to translate Cartesian coordinates into variable-length bipolar string movements.

## Hardware Architecture
The system is powered via a 12V USB-C Power Delivery (PD) interface (2A peak draw), with integrated buck regulation for logic-level power distribution.
- **Compute Node**: ESP32-S3, hosting a localized web-server for wireless command telemetry and status monitoring.
- **Propulsion**: Dual NEMA 17 stepper motors, providing the high-torque displacement required for vertical surface suspension.
- **Actuation**: Integrated 9g servo for Z-axis pen lift and engagement.
- **Thermal Management**: Forced-air cooling array (micro-fan) integrated directly over the stepper drivers to prevent thermal shutdown during high-duty cycles.

## Kinematic Logic & Processing
The platform's firmware executes real-time inverse kinematic calculations, translating standard 2D G-code into the precise step counts required for the V-plotter's hanging geometry. The physical 3D chassis—centered around a high-density "gondola" housing—was modeled and fabricated to maximize component density while maintaining a stable center of gravity during high-dynamic movement.

## Operational Assessment
The platform successfully validated the "portable event-drawing" concept, demonstrating reliable operation over multiple 48-hour testing intervals. The integration of an ESP32-based web interface eliminated the need for secondary host computers, streamlining field deployment. While the kinematic speed is physically limited by the suspension dynamics, the system provides high positional accuracy for large-format vector output.
