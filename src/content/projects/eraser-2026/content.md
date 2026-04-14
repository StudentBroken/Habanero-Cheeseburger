# ESP Eraser: 2026 Edition (Final version)

## The Goal
By 2026, I wanted to make the eraser system as small as possible. The goal was to make it much thinner and change how it sends data so it doesn’t have to wait for a response.

## Software & Battery
I switched from MQTT to Firebase to handle the data. This means the eraser can send a picture and immediately go to sleep, which saves power. This allowed me to use a battery that’s 70% smaller while still lasting just as long.

- **Smallest size yet**: Thin enough to be hidden in plain sight.
- **Data model**: Firebase cloud offloading (send and sleep).
- **Power management**: Short active time for extended battery life.
- **Status monitoring**: Small LED for discrete status checks.

## Better Design
I redesigned the internal layout to fit everything more tightly. I also made the USB-C charging port accessible without disassembling the unit. The only way to tell it’s not a real eraser is if you look closely at the 3D-printed texture.

## Summary
The 2026 version shows that you can build something this small and still have it work reliably with the cloud.
