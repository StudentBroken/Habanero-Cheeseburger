# Kinetic Projectile Platform: 6-Inch Multirotor

## System Objective
The project objective was the tactical modification of a 6-inch analog FPV multirotor to support a remotely actuated kinetic projectile system (gel blaster). The platform serves as a study in payload integration and real-time kinetic target acquisition via analog FPV optics.

## Hardware Integration
The baseline 6-inch chassis was retrofitted with a pneumatic gel-blaster assembly. Actuation is handled via a dedicated MOSFET switch-circuit interfaced with a spare auxiliary (AUX) channel on the flight controller. Analog video was selected for the targeting downlink due to its characteristic zero-latency transmission, ensuring immediate visual feedback during high-dynamic deployment.

- **Multirotor Architecture**: 6-inch high-torque freestyle configuration.
- **Optics**: Analog FPV downlink (zero-latency acquisition).
- **Payload Architecture**: Integrated kinetic projectile assembly, remotely triggered via digital logic.

## Operational Dynamics
The addition of the projectile payload induced a significant shift in the platform's center of gravity and increased total takeoff mass. Operational success required a dedicated PID tuning session to compensate for the shifted aerodynamics and recoil-induced gyroscopic noise. The platform successfully validated the efficacy of remote-actuated payloads in low-latency FPV environments.
