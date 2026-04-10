# Covert Network Node: Iteration 3 (MQTT & Power Management)

## Design Evolution
The third iteration focused on structural internal refinement and the implementation of advanced power-management protocols. The architecture abandoned the direct BLE link in favor of a centralized MQTT broker, allowing for multi-client telemetry and asynchronous processing.

## Power Optimization
This iteration marked the first implementation of deep-sleep duty cycles between data transmissions. The processing logic was re-engineered to execute a "wake-capture-transmit-sleep" sequence, significantly extending the operational lifespan for a fixed battery capacity. 

## Structural Engineering
The internal chassis was redesigned with rigid component separators to eliminate mechanical shifting and rattling during handling. The optical port and physical switches were precisely aligned with the external shell using higher-tolerance machining/printing.

- **Centralized Logic**: ESP32-S3 Xiao Sense Cam.
- **Protocol**: WiFi-based MQTT (Standardized telemetric publishing).
- **Power Management**: Duty-cycled deep-sleep implementation.
- **Charging Interface**: Upgraded to standardized USB-C.

## Engineering Conclusion
Iteration 3 successfully transitioned the platform from a prototyping prototype to a reliable operational tool. The move to MQTT provided superior flexibility in terminal selection (mobile vs. desktop monitoring), and the structural internal fixes eliminated the mechanical failures prevalent in previous builds.
