# FPV Drone with Gel Blaster

## The Goal

I wanted to mount a gel blaster onto a 6-inch FPV drone and fire it remotely. The goal was to use the drone's camera to aim and shoot while flying.

## How I Built It

I mounted a gel blaster to the drone frame and used a MOSFET circuit to trigger the blaster from the remote control. I used analog video for its low latency, which is critical for aiming while moving.

- **Drone**: 6-inch freestyle configuration.
- **Camera**: Analog FPV system.
- **Blaster**: Gel projectile gun integrated into the frame, remote-triggered.

## How it Flies

Adding the blaster increased the weight and shifted the center of gravity. I retuned the flight controller PID values to compensate for the extra mass and vibration from the firing mechanism. The drone flies well and the system works reliably.
