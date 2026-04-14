# FPV Drone with Gel Blaster

## The Goal
I wanted to mount a gel blaster onto a 6-inch FPV drone that I could fire remotely. The goal was to see if I could use the drone's camera to aim and shoot while flying.

## How I Built It
I added a gel blaster to the drone frame and used a small switch circuit (MOSFET) to let me trigger the firing from my remote control. I used analog video because it has zero delay, which is critical for aiming while moving.

- **Drone**: 6-inch freestyle configuration.
- **Camera**: Analog FPV system (zero delay).
- **Blaster**: Integrated gel projectile gun, triggered remotely.

## How it Flies
Adding the blaster made the drone heavier and changed its balance. I had to retune the flight controller (PID tuning) to make it fly smooth again and handle the vibration from the gun firing. In the end, it worked great and was really fun to fly.
