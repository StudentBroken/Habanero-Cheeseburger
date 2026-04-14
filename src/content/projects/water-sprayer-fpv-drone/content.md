# Water Sprayer FPV Drone

## The Goal
I wanted to build a small water pump and sprayer system for my FPV drone. The goal was to be able to spray water accurately while flying fast (for a game of Senior Assassin).

## Building the Pump
The pump uses a high-RPM brushed motor driving a custom impeller inside a modified medical syringe. 3D-printed impellers weren't precise enough at this scale, so I machined one from hard plastic instead. I sealed the chamber with waterproof compounds and set up a gravity feed system to keep it primed.

## Electronics & Control
The pump is powered by a small 1S brushed ESC. I connected it to the flight controller's LED pin and remapped it in Betaflight to work like a servo. I also added a button to my transmitter (LiteRadio 2 SE) to trigger the pump without affecting the flight controls.

## What I Learned
- **Construction**: 3D-printed parts with hot glue aren't durable enough for the stress, vibration, and environmental exposure (water, humidity, temperature) of flight. A part detached during a crash, so I need to use epoxy or screws for assembly next time.
- **Waterproofing**: I applied silicone conformal coating to the replacement flight controller to prevent shorts if water gets inside.
- **Tubing**: The first tubes were too stiff and kinked easily. I need to use flexible silicone tubing next time and probably switch to an active priming pump so it doesn't rely on gravity.
