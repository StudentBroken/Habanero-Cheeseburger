# Cartesian Fabrication Node: Custom Ender 3

## Technical Overview
I rebuilt a standard Ender 3 for reliability and precision. It's been my main printer for all the structural and electrical enclosures in this portfolio since early 2023.

## Kinematics & Propulsion
I replaced the Bowden extrusion system with direct drive to eliminate filament drag and improve flow control, especially for flexible materials like TPU. The motion controller runs Klipper firmware with input shaping and pressure advance to reduce vibration and improve surface quality.

## Computing Architecture
I started with a Raspberry Pi Zero 2W, but it crashed during complex prints—the CPU couldn't handle high-speed movement and real-time pressure advance at the same time. I switched to a Raspberry Pi 4 with 4GB of RAM, which solved the instability.

## Performance Metrics
- **Travel Speed**: Up to 500 mm/s.
- **Acceleration**: 600% of the stock baseline.
- **Bed Surface**: PEI spring-steel flex plate for consistent first-layer adhesion.
- **Uptime**: Running multi-day print cycles reliably since 2023.
