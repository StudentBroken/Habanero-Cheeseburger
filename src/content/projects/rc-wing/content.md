# RC Flying Wing: Custom Electronics

## The Goal
I wanted to build a custom control board for a small flying wing. The main goal was to make a single circuit board that could translate different radio signals (CRSF to SBUS) and handle all the electronics at once.

## How it Works
I used an ESP32 to bridge the high-speed CRSF signal from my receiver to the older SBUS protocol that the flight controller uses. I also integrated the servos, video transmitter, and camera into one custom PCB to keep the plane light and balanced.

- **Radio**: ELRS (ExpressLRS) via CRSF.
- **Brain**: ESP32 (custom CRSF to SBUS translation).
- **Servos**: Dual high-torque 2g micro-servos.

## Summary & Status
Everything worked on the bench—signal translation was clean and the custom board performed as expected. The plane is ready to fly, but I've put it on hold to focus on faster drone projects. It proved I could build custom flight electronics from scratch.
