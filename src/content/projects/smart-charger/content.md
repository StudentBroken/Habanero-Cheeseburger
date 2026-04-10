# Intelligent Power Delivery System: 24V LEV

## Design Philosophy
The objective was to engineer a smart charging solution for a 24V light electric vehicle (LEV) battery architecture with a primary focus on cyclic longevity. The system adopts a conservative 4.15V/cell termination strategy, trading a nominal 3% of peak energy capacity for a projected substantial increase in the battery pack's total service life.

## Hardware Control Logic
Power management and charge cycle execution are handled by an ESP32 microcontroller. The system monitors cumulative pack voltage via a high-precision potential divider and actuates a high-amperage relay to physically decouple the charger upon reaching the target threshold. Thermal management for the logic-stage LDO regulator is achieved via an integrated aluminum heatsink to dissipate waste heat during prolonged operation.

- **MCU**: ESP32
- **Termination Threshold**: 4.15V per cell
- **Active Telemetry**: WiFi-integrated OLED charge progression matrix
- **Thermal Design**: Passive heatsink on LDO regulation stage

## Operational Status
The system has been in continuous nightly operation. Longitudinal data suggests improved capacity retention in the lithium-ion matrix compared to standard 4.2V/cell charging protocols.
