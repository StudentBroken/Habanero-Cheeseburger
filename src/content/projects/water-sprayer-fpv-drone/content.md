# Hydraulic Delivery System: FPV Multirotor

## Technical Objective
The objective was the engineering of a sub-micro hydraulic pump and delivery system integrated into an FPV multirotor platform. The system was designed for precision aqueous delivery during high-dynamic operations (Senior Assassin deployment).

## Hydraulic Engineering
The pump architecture utilizes a high-RPM brushed motor driving a custom impeller housed within a modified medical-grade syringe. Initial FDM-printed impellers failed to meet dimensional accuracy requirements at this scale, necessitating a transition to a hand-fabricated high-modulus plastic impeller. The chamber was hermetically sealed with waterproof compounds and fed via gravity-assisted intake to ensure consistent priming.

## Electronics & Command Logic
Propulsion for the hydraulic pump is managed via a dedicated 1S brushed ESC. The ESC is interfaced with the flight controller's LED-strip pin, which was remapped through Betaflight's CLI to function as a servo-controlled logic node. The physical transmitter (LiteRadio 2 SE) was modified with a secondary tactile switch to trigger the pump sequence independently of the primary flight controls.

## Failure Analysis & Operational Lessons
- **Structural Integrity**: FDM-printed components and standard adhesives (hot glue) proved inadequate for the dynamic stresses of multirotor flight. A mechanical separation occurred during a single-crash event, highlighting the need for higher-bond-strength epoxy or mechanical fasteners.
- **Atmospheric & Thermal Mitigation**: The replacement flight controller was fully encapsulated in a silicone-based conformal coating to ensure environmental hardening against localized aqueous exposure.
- **Fluid Dynamics**: The chosen pneumatic tubing exhibited excessive stiffness, leading to intake kinking. Future revisions require high-flexibility silicone tubing and an active priming mechanism to eliminate gravity dependency.
