# Electric Bike (v4)

Built at 16, early in the year. The mid-drive experiment of v3 was abandoned — the chain skip, L-bracket deformation, and constant re-tensioning made it impractical. v4 switched to a 2000W hub motor, the biggest single-component investment of the series at $300, and stepped the voltage up to 12S to push top speed toward 50 km/h.

## Wheel Lacing

Hub motors ship as motor-only — you lace them into a rim yourself. I had never done this before. I learned wheel lacing from scratch in under a day using a 26-inch rim, worked through a couple of failed attempts before the spoke tension was even, and trued it by hand. The process is entirely manual: pattern the spokes, thread them through the flange, tension, check dish, repeat.

## Battery: The Series/Parallel Hack

I only owned a 6S LiPo charger. The motor needed 12S. The solution was to build two identical triangular 6S packs and switch between topologies depending on the operating mode:

- **Riding**: The two packs wired in series — 12S, 44.4V nominal, 50.4V peak.
- **Charging**: The same two packs wired in parallel — effectively one 6S pack that my existing charger could handle.

This required a manual switching step between modes. Each pack had its own $6 BMS for charge protection. For discharge I used the bypass trick from v2: a second output connector that goes around the BMS entirely so the full current hits the VESC without restriction.

I used a Sharpie on green painter's tape to diagram the cell connections before spot welding — a system that worked well for keeping track of the series/parallel topology during the weld sequence.

![Spot welding with sharpie diagram on painter's tape](/projects/ebike-v4/spot-welded-the-first-series-i-used-a-sharpie-to-draw-the-connections-i-was-supposed-to-make-on-green-painters-tape.webp)
*Sharpie on painter's tape — wiring diagram drawn directly on the pack before welding.*

## The Short Circuit

I plugged in the parallel charge connector while the series key was still connected. This created a dead short across both BMS units simultaneously — enough current to destroy them both instantly. Two $6 BMS units, both gone in one mistake.

The root cause is a logic problem: the series and parallel states are mutually exclusive, but there was no physical enforcement of that constraint. Both connectors were accessible at the same time. For v5 this would need an interlock — either mechanical keying or a relay that physically disconnects series before parallel charging is possible.

After replacing the BMS units, I conformal coated both boards for water resistance and added a "remove before flight" tag on the series key connector so I could not miss it before plugging in the charger.

## 3D Printed Battery Mounts

I printed tolerance-test iterations of the battery mount before committing to the final part. The mount held mechanically but PLA is brittle — it cracked under vibration and impact over time. This was the build that confirmed for me that PLA is the wrong material for any structural frame component on a vehicle. PETG or ASA for anything that takes load or vibration; PLA only for static brackets.

## VESC Enclosure

The VESC started in a soft bag strapped to the frame. I later designed and printed a cover with airflow passages to keep it cooler under sustained load.

## Post-Mortem

Top speed was around 50 km/h on 12S. The hub motor was a massive improvement over the friction and mid-drive setups — silent, direct, no chain to maintain, no slip under load. The wheel lacing was a real skill acquired and used immediately.

The series/parallel hack worked but required cognitive load to operate safely. The short circuit that destroyed both BMS units proved that any system requiring the operator to manually maintain a safety invariant will eventually fail. The remove-before-flight tag was a workaround, not a solution.

Voltage sag under hard acceleration was noticeable. The cells were not high-discharge-rated and the pack's internal resistance limited peak current delivery. At 12S the voltage drop per cell was smaller in relative terms, but the weaker cells still dragged the pack down under load.

PLA for structural mounts is a closed question. It fails under vibration and impact. Never again.

## Bill of Materials

| Component | Cost |
|---|---|
| 2000W Hub Motor | ~$300.00 CAD |
| 26-inch rim (for lacing) | ~$30.00 CAD |
| 18650 cells | ~$50.00 CAD |
| 2× BMS (destroyed + replaced) | ~$24.00 CAD |
| VESC (carried from v3) | — |
| 3D print filament + misc | ~$15.00 CAD |
| **Total new spend** | **~$419.00 CAD** |
