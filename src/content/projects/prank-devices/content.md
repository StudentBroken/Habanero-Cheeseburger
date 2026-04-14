# Remote-Controlled Prank Devices

## The Goal
I wanted to build a set of small, hidden devices that could make sounds on command. The main goal was to test how long I could keep an ESP32 running on a tiny battery using "deep sleep" mode.

## How They Communicate
I used several ESP32 boards talking to each other through "ESP-NOW." This lets them coordinate without needing a WiFi router, making them easier to hide. I 3D-printed custom cases that look like normal electronics so they wouldn't be noticed.

## Saving Battery
This was my first time really getting deep-sleep to work well. I set the devices to wake up only when needed, which let them run for a full 24 hours on a very small battery. I chose ESP-NOW because it's much faster and more efficient than regular WiFi.
- **Deep Sleep**: Nodes wake up only at certain times to save power.
- **Efficiency**: The timer was set to last 24 hours on a tiny battery.
- **Protocol**: ESP-NOW was chosen because it connects almost instantly.

## What I Learned
The project worked perfectly. It proved that I could make reliable, battery-powered devices that stay connected for a long time. The code I wrote for saving power here became the foundation for my later projects, like the ESP Erasers.
