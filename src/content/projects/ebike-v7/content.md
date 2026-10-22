# Electric Bike (v7)

V7 is the most balanced version of my electric bike: a modest 350W drive that still asks me to pedal, with more control, a quieter-looking setup, practical range, and a motor assembly that can be removed in about three minutes. With the battery mounted on the bike it weighs 16kg; carrying the battery in a backpack leaves the bike at 12.3kg. The estimated range is around 60km.

![Road bike with the removable motor assembly detached](/projects/ebike-v7/complete-bike.webp)
*A regular-looking road bike with the motor assembly removed.*

## System Architecture

V6 prioritized speed. It pushed about 2200W continuous, reached roughly 76km/h max, and cruised at 55–65km/h. At 28kg it was heavy, difficult to pedal, and conspicuous enough to attract attention. V7 trades that extreme output for a 350W setup that works alongside my legs. It is slower, lighter, easier to control, and more useful as a bicycle. Its estimated 60km range is less than V6's roughly 80km, but the bike is much more practical to ride and live with.

The drive unit detaches in about three minutes. Four screws and two wing nuts secure the mount, so I can remove the powered assembly without leaving the bike looking like a full-time e-bike. The battery can sit in the frame or travel in a backpack. Frame mounting is more convenient, but I prefer the cleaner-looking bike with the battery carried separately.

![Bike with its battery carried separately](/projects/ebike-v7/backpack-battery.webp)
*With the battery in a backpack, the bicycle itself weighs 12.3kg.*

![Bike with the battery mounted in the frame bag](/projects/ebike-v7/frame-battery.webp)
*The battery can also be carried on the frame.*

## Electrical & Firmware Implementation

After V6 was stolen, I repurposed the battery pack from V5. I reduced its configuration from 72V to 48V, reshaped the pack for this build, and fitted a 15A BMS. The resulting battery weighs 3.7kg. Reusing the pack kept its cost at zero and avoided building another battery from scratch.

I also replaced the stock bulky charger enclosure with a compact, portable case. The battery's two mounting options make the system easier to adapt to a commute: carry the pack when I want the lightest-looking bike, or mount it on the frame when I want it attached to the bicycle.

### Throttle & Ride Logging

The throttle is a custom sliding Hall-effect design. Commercial throttles and thumb sliders I tried did not fit a road-bike handlebar comfortably; they forced my wrist or thumb into an awkward position. A metal rod slides through the printed body, with machine grease to make its movement smooth. The slider lets me choose an output up to the bike's 350W setup and reposition my hand while riding. It stays at the selected position rather than automatically returning to zero, so the motor can keep driving if I take my hand off it.

That behavior creates a crash risk. When carrying the battery in a backpack, I use a tether looped around a waist belt so that an ejection is intended to pull the battery connector apart and cut power. I repeatedly tested the disconnect by jumping clear of the bike and pulling the tether hard from different angles; it disconnected during those tests. Those tests do not prove it will disconnect reliably in every real crash, and the tether itself can snag, so I treat it as a secondary mitigation rather than a guarantee of safety. The slider STL is available below.

An ESP32-C3 SuperMini BLE bridge records ride data from the VESC. The logger is based on [VescBLEBridge](https://github.com/StudentBroken/VescBLEBridge), and the controller and electronics were tested together before installation.

![Controller and electronics during testing](/projects/ebike-v7/ride-logging-test.webp)
*Controller, battery, and logging electronics during a bench test.*

## Mechanical Design & Fabrication

I designed the motor mount to be replaceable with a screwdriver: four screws and two wing nuts are enough to remove and replace the assembly. That made a mount failure an upgrade opportunity rather than a reason to redesign the whole drive system.

The [full motor and bike mount assembly is available in Onshape](https://cad.onshape.com/documents/43a36b803df7f960ccbf3225/w/f83945b127c58a7edd1f96e2/e/9a1b8c6414a9327d8c2855df?renderMode=0&uiState=6ad95942a941be13c57fe6f1).

![Onshape assembly view of the removable motor and bike mount](/projects/ebike-v7/motor-mount-assembly.webp)
*CAD assembly of the removable motor mount.*

![The first motor mount after its failure](/projects/ebike-v7/failed-motor-mount.webp)
*The failed section of the original mount.*

![Fitting the removable motor assembly to the bike](/projects/ebike-v7/motor-mount-install.webp)
*The motor assembly can be detached from the bicycle.*

## Validation & Failure Analysis

The first motor mount failed after a pothole impact. I revised it with thicker walls and a more gradual transition into the honeycomb structure. The updated mount lasted a full month of hard use without failing.

## Bill of Materials

| Component | Cost |
|---|---:|
| VESC 75100 | $60.00 CAD |
| Repurposed battery | $0.00 CAD |
| Hall-effect throttle | $5.00 CAD |
| Screws, wiring, and connectors | $20.00 CAD |
| Charger | $15.00 CAD |
| 3D printing | $6.70 CAD |
| **Total** | **$106.70 CAD** |

![Sliding Hall-effect throttle](/projects/ebike-v7/throttle.webp)
*The sliding Hall-effect throttle mounted on the handlebar.*
