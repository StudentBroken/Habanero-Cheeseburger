# Electric Bike (v6)

Built at 17, this is the current state of the series. After five iterations of dealing with recycled cells, physical deformation in mounts, and the series/parallel charging hack, v6 is a transition to a professional-grade execution. All 100 cells are brand new, the holder is a continuous unibody design, and every component was validated through 4-wire testing before assembly.

## Cell Selection & Validation

The pack uses 100x EVE 33V Grade-A cells (3200mAh nominal) in a 20S5P configuration. Unlike previous builds where "cell health" was estimated through use, v6 used a rigorous intake process:

1.  **Capacity Testing**: Every group was sampled and tested for capacity at 21°C. A 1A discharge from 4.15V down to 2.95V measured an average of 3165mAh.
2.  **IR Matching**: I used a dedicated 4-wire AC internal resistance tester. Every cell was measured at 3.495V. The pack spread was 29mΩ ±1mΩ with a voltage deviation of ±0.006V. This level of matching is effectively a rounding error, ensuring the pack remains perfectly balanced under high load.

## Mechanical Engineering & PETG Unibody

The battery holder is a single-piece unibody design printed in PETG on a modified Ender 5 Plus running Klipper. The move to PETG was mandatory; v4 and v5 proved that PLA is too brittle for structural vehicle components. PETG offers the necessary impact resistance and heat tolerance for a 100-cell mass discharging at high rates.

![3D printed PETG battery holder with cells aligned](/projects/ebike-v6/the-battery-pack-all-sorted-and-aligned-in-the-petg-holder-with-painter-tape-covering-both-sides-temporarily.webp)
*Unibody PETG holder — 20S5P alignment. PETG was selected for its superior impact resistance over PLA.*

## Electrical Architecture & Load Calculation

The system is designed for a peak output of 2500W. Even when over-currenting the ESC to 100A during hard acceleration, the cells only hit 60–85% of their maximum continuous discharge rating. Designing with this overhead ensures longevity and prevents the thermal runaway risks seen in v1-v3.

For the nickel strips, I moved away from "estimated" sizes to explicit math. I used 8mm x 0.2mm pure nickel strips, which have a cross-sectional area of 1.6mm² and a rated capacity of 14A continuous. Each series bridge (cathode of group A to anode of group B) uses at least three of these bridges, providing a total cross-sectional area of 4.8mm² and 40–45A of continuous capacity. With a realistic peak draw of ~35A, the interconnects operate well within their thermal limits.

I also accounted for path length and mechanical stress:
- **IR Compensation**: Long-reach connections used double nickel strips to minimize voltage drop and internal resistance.
- **Stress Relief**: Added a minor amount of slack in the nickel bridges to compensate for thermal expansion and frame vibrations, preventing spot-weld failure over time.

For the lacing and cutting, I used a custom stencil to ensure every piece was identical, maintaining uniform current density across the entire pack.

## Insulation & Safety

The insulation strategy is multi-layered:
-   **Primary**: Kapton tape for high-heat electrical insulation.
-   **Secondary**: Multiaxial Fiberglass tape for structural reinforcement and additional puncture resistance.
-   **Final**: The pack is housed in a rigid PETG outer shell.

## Post-Mortem (Current Status)

v6 is the first build where I am not waiting for a specific part to fail. The drivetrain is silent, the battery doesn't sag under full 2500W load, and the bike hits a top speed of 65 km/h. The internal resistance matching means the BMS has almost zero work to do during balancing.

The lesson from the previous 5 years is simple: you can't engineer your way out of bad materials. Recycling cells and using L-brackets is good for learning how things fail, but professional-grade reliability requires brand-new cells, 4-wire validation, and materials like PETG that are actually rated for the application.

## Bill of Materials

| Component | Cost |
|---|---|
| 100x EVE 33V Grade-A cells | ~$450.00 CAD |
| BMS Daly 72V 40A (same as v5) | ~$45.00 CAD |
| PETG Filament (unibody holder) | ~$10.00 CAD |
| Kapton + Fiberglass + Nickel | ~$10.00 CAD |
| **Total** | **~$515.00 CAD** |
