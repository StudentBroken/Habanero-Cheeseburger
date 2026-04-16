At age 17, I built this bike to be the perfect version of all my previous builds. Instead of using old, recycled cells, I bought 100 brand-new **EVE 33V** cells. I tested every single one to make sure they were all identical in health and power.

![Brand new battery cells](/projects/ebike-v6/the-box-the-brand-new-cells-came-in-100-to-be-exact.webp)
*I bought 100 Grade-A cells to ensure the battery would last for years.*

This is the fastest and most reliable bike I've ever built. It can reach 65km/h and doesn't lose power even when climbing steep hills.

## Professional Grade Construction

I stopped using glue and tape to hold the battery together. Instead, I designed a "unibody" holder that was 3D printed in **PETG** plastic. PETG is much stronger than the PLA I used before and can handle the vibrations of the road without cracking.

![New PETG battery holder](/projects/ebike-v6/the-test-fit-on-the-bike-with-new-petg-holder.webp)
*The battery fits perfectly into the frame. The PETG holder keeps all 100 cells safe and secure.*


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

## Conclusion

The biggest lesson from five years of building ebikes is that you can't build a professional machine with bad materials. Using brand-new cells and proper engineering math made this bike faster, safer, and much more fun to ride.


## Bill of Materials

| Component | Cost |
|---|---|
| 100x EVE 33V Grade-A cells | ~$450.00 CAD |
| BMS Daly 72V 40A (same as v5) | ~$45.00 CAD |
| PETG Filament (unibody holder) | ~$10.00 CAD |
| Kapton + Fiberglass + Nickel | ~$10.00 CAD |
| **Total** | **~$515.00 CAD** |
