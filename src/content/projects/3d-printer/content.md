# Cartesian Fabrication Node: Custom Ender 3

## Technical Overview
The system is a comprehensive overhaul of a standard Cartesian 3D printer, optimized for high-uptime manufacturing and precise kinematic execution. It has served as the primary fabrication node for all structural and electrical enclosures documented in this portfolio since Q1 2023.

## Kinematics & Propulsion
The original Bowden extrusion system was decommissioned in favor of a direct-drive conversion, eliminating filament hysteresis and significantly improving volumetric flow control, particularly for elastomers (TPU). The motion controller was upgraded to Klipper firmware, allowing for advanced resonance compensation (input shaping) and pressure advance calculations.

## Computing Architecture
Initial operational testing with a Raspberry Pi Zero 2W resulted in intermittent system crashes during high-density G-code execution. Analysis indicated that the Zero 2W's CPU lacked the necessary computational headroom for simultaneous high-speed movement and real-time pressure advance processing. The system was subsequently migrated to a Raspberry Pi 4 (4GB), resolving all overhead-related instability.

## Performance Metrics
- **Kinematic Speed**: Travel velocities up to 500 mm/s.
- **Acceleration**: Configured at 600% of the OEM baseline.
- **Surface Interfacing**: PEI spring-steel flex plate, optimized for consistent first-layer adhesion without secondary adhesives.
- **Reliability**: Validated through continuous multi-day print cycles since 2023.
