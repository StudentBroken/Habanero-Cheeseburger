# ESP Eraser: 2026 Edition (Final version)

## The Goal
By 2026, I wanted to make the eraser system as small as possible. The goal was to make it much thinner and change how it sends data so it doesn't have to wait for a response.

## Software & Battery
I switched from MQTT to Firebase to handle the data. This means the eraser can send a picture and immediately go to sleep, which saves a lot of power. This allowed me to use a battery that's 70% smaller while still lasting just as long.

- **Smallest size yet**: Thin enough to be hidden in plain sight.
- **Data Model**: Firebase cloud offloading (fire-and-forget).
- **Power Management**: Short active time for maximum battery life.
- **Status Monitoring**: Small LED for discrete status checks.

## Better Design
I redesigned the inside to fit everything tighter. I also made the USB-C charging port accessible without having to take the whole thing apart. The only way you can tell it’s not a real eraser is if you look closely at the 3D-printed texture.

## Summary
The 2026 version proves that you can make something this small and still have it work reliably with the cloud. It’s my best version yet.
