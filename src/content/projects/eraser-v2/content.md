# Covert Network Node: Iteration 2 (BLE Optimization)

## Architectural Revision
For the second version, I simplified the design by removing the ESP-NOW relay chain and connecting directly to my phone with Bluetooth Low Energy (BLE).

## System Enhancements
Dropping the relay nodes meant lower latency and fewer places for things to break. I also switched to a wider, thinner eraser—easier to hold and less obvious in a bag or pocket.

- **Microcontroller**: ESP32-S3 Xiao Sense.
- **Communication**: Direct BLE with HID and GATT profiles for mobile.
- **Internal Structure**: Custom-machined cavity to hold components in place.

## Conclusion
This single-node architecture cut down complexity significantly. The new eraser shape fixed the ergonomic problems from the first version. BLE proved to be a reliable way to send data.
