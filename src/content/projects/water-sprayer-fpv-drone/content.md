# Water Sprayer FPV Drone

## The Goal
I wanted to build a small water pump and sprayer system for my FPV drone. The goal was to be able to spray water accurately while flying fast (for a game of Senior Assassin).

## Building the Pump
The pump architecture uses a high-RPM brushed motor driving a custom impeller housed inside a modified medical syringe. Initial 3D-printed impellers weren't precise enough at this scale, so I had to hand-fabricate one from hard plastic. The chamber was sealed up with waterproof compounds and fed via gravity to keep it primed.

## Electronics & Control
The pump is powered by a small 1S brushed ESC. I connected it to the flight controller's LED pin and remapped it in Betaflight to work like a servo. I also added a button to my transmitter (LiteRadio 2 SE) to trigger the pump without affecting the flight controls.

## What I Learned
- **Construction**: FDM-printed parts and hot glue weren't appropriate for the stresses, vibrations, and environmental factors (water, humidity, and temperature) of flying a drone. A part came off during a crash, showing that I need stronger epoxy or screws next time.
- **Waterproofing**: I coated the replacement flight controller in silicone (conformal coating) to make sure it wouldn't short out if it got wet.
- **Tubing**: The first tubes were too stiff and kept kinking. I need to use flexible silicone tubing next time and maybe an active priming system so it doesn't depend on gravity.
