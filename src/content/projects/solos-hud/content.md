# Solos HUD: Reverse Engineering & Redesign

This project started as an exploration into consumer smart glasses and grew into a complete hardware redesign — covering Bluetooth reverse engineering, custom app development, and a new 3D-printed housing built from scratch.

## Phase 1: Software & Reverse Engineering

The journey began on March 6th by testing the original Solos glasses out of the box. Curiosity won out the next day and I disassembled them to understand the internal layout.

On March 8th I pulled the companion app from APKPure and used a combination of online resources, Claude, and AntiGravity to reverse-engineer the device's Bluetooth protocols. This gave me low-level access to both the display interface and the physical buttons.

With that foundation, I built several custom applications running on the original hardware:

- **Workout and VESC integration** — real-time metrics from an electric skateboard displayed on the HUD
- **Weather** — current conditions pulled on demand
- **Turn-by-turn navigation** — route instructions overlaid in the glasses

All of this ran on the stock Solos housing without any hardware modifications.

## Phase 2: Hardware Redesign

After a break for exams and other projects, I returned on March 20 with a new goal: strip the electronics out of the bulky original housing and build something more compact and wearable.

### Design & Fabrication

I removed all the PCBs, electronics, and battery from the stock enclosure. Using a 2D scan of the original frame as a reference, I modeled a new custom housing in PETG — designed to fold flat and fit precisely around the existing components.

The result is a lighter, more portable smart glasses system that fits cleanly on standard frames.

### Tradeoffs

The redesign involved deliberate compromises to hit the compact form factor.

**Improvements:**
- Substantially increased battery life due to a larger capacity cell
- Significantly lighter and more portable
- Modern USB-C charging
- Swappable lenses — held with a dab of hot glue or carefully peeled off by detaching the mic and ribbon cable

**Limitations:**
- Fixed display angle relative to the eye, with only minor adjustment possible
- More fragile than the original injection-molded frame
- Original micro-USB charging no longer works — the NTC on the ribbon cable had to be cut to fit the single-sided housing
- Speakers removed entirely to achieve the target thickness, making this a display-only device
