# Covert Network Node: Iteration 3 (MQTT & Power Management)

## Design Evolution
For the third version, I rebuilt the internals and switched from BLE to WiFi MQTT. This lets me monitor from multiple devices—phone or computer—instead of just one phone at a time.

## Power Optimization
I added deep sleep so the device wakes up, captures data, sends it, and goes back to sleep. This stretches the battery life on the same cell.

## Structural Engineering
I added separators inside to keep components from shifting around and making noise. The sensors and buttons line up properly with the external shell now, with tighter tolerances.

- **Microcontroller**: ESP32-S3 Xiao Sense Cam.
- **Communication**: WiFi with MQTT protocol.
- **Power**: Deep-sleep cycles between data sends.
- **Charging**: USB-C.

## Final Result
This version is much more usable than the earlier prototypes. The switch to MQTT means I can check readings from anywhere, and the internal fixes stopped the rattling and mechanical issues from before.
