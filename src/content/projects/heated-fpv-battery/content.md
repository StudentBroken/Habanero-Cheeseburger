# Active Thermal Management System: FPV Battery

## Technical Objective
To engineer an active, regulated thermal management solution for Lithium-Polymer (LiPo) batteries operating in sub-zero environments (-30°C). The system aims to mitigate the increase in internal resistance and subsequent voltage sag associated with low-temperature chemical kinetics.

## System Architecture
The hardware utilizes dual 5V buck regulators for power management. A primary regulator supplies the ESP32-C3 microcontroller, while a secondary, switched regulator drives a discrete nichrome resistive heating element capable of a 5-watt thermal output. Thermal feedback is provided by a salvaged NTC thermistor mounted in direct contact with the cells.

## Operational Results
Initial deployment validated the "bang-bang" regulation algorithm. Under static conditions at -30°C and 0% load, the system demonstrated a thermal decay of only 0.1°C/min (from a 21°C baseline). During flight operations, the combination of resistive heating and internal IR-induced heat stabilized the battery temperature at a precise 30°C operational setpoint.

## Failure Analysis & Engineering Controls
The system experienced a catastrophic logic failure due to a reverse-polarity event during field servicing.
- **Root Cause**: Human error during battery connection, facilitated by the absence of keyed, polarized physical connectors.
- **Outcome**: Instantaneous overvoltage failure of the buck regulation stage.
- **Future Controls**: Implementation of industry-standard polarized connectors (XT30/XT60) and integrated reverse-polarity protection circuits are mandatory for subsequent revisions to ensure operational reliability in high-stress field envionments.
