# Wireless Pyrotechnic Ignition System

## Design Objective
The objective was the rapid assembly and deployment of a wireless, high-energy pyrotechnic detonation system. The system was engineered within a 30-minute window to facilitate remote ignition of a propellant-based rocket from a safety-critical distance.

## Architecture
The system utilizes a 3S LiPo battery for high-current discharge. Command logic is handled by an ESP32-C3 microcontroller interfacing with a dedicated RF receiver module. The ignition node consists of a custom-fabricated resistive element created by tightly wrapping a match-head with high-gauge enamel copper wire. Upon relay activation, the resistive bridge experiences rapid Joule heating, inducing localized combustion.

## Operational Failure Analysis
Despite successful bench validation of the ignition sequence, the system failed to initiate the propellant charge during field deployment in high-humidity (precipitation) conditions.
- **Root Cause**: The custom "match-bridge" igniter assembly exhibited extreme hygroscopy. Rapid atmospheric moisture absorption in the field degraded the chemical reactive properties of the match-head faster than the thermal input from the resistive wire could compensate.
- **Outcome**: Insufficient thermal energy to sustain combustion; ignition sequence aborted.
- **Corrective Actions**: Future designs require industrialized bridgewire igniters or e-matches with hydrophobic coatings and specialized ruggedized connectors to maintain electrical integrity in adverse environmental conditions.
