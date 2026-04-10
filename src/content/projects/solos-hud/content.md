# Electro-Optical Interface: Solos HUD Redesign

## Project Overview
The objective was the comprehensive reverse-engineering and structural redesign of a consumer-grade head-up display (HUD) platform. The project progressed from low-level protocol analysis to the fabrication of a custom, high-density optical enclosure.

## Phase 1: Protocol Reverse Engineering
The initial research phase focused on the extraction and analysis of the proprietary communication layer between the Solos HUD and its companion application. 
- **Methodology**: Static analysis of the extracted APK and real-time Bluetooth GATT sniffng.
- **Result**: Successful mapping of the peripheral's HID services and the discovery of non-standard characteristic UUIDs for raw display data transmission.
- **Application Logic**: Developed a custom software suite facilitating real-time notification parsing, GPS telemetry visualization, and VESC (Variable Electronic Speed Controller) data harvesting for electric propulsion systems.

## Phase 2: Structural & Hardware Overhaul
The secondary objective was the radical reduction of the platform's volumetric footprint. The OEM injection-molded housing was decommissioned, and the internal components—including the logic PCB, flex assemblies, and the optical wave-guide prism—were extracted.

### CAD & Fabrication
A custom single-sided enclosure was modeled in PETG, utilizing 2D scan-to-CAD techniques for precise component alignment. The redesign prioritized "fold-flat" capability and universal mounting interfaces for existing corrective eyewear.

### Engineering Tradeoffs & System Optimization
To achieve the targets for mass reduction and battery longevity, several intentional hardware modifications were executed:
- **Energy Storage**: Integrated a higher-capacity lithium-polymer cell, significantly extending the system's operational window.
- **Proprietary Interface Decommissioning**: The OEM micro-USB charging assembly and thermal monitors (NTC thermistors) were removed to accommodate the denser layout.
- **Power Delivery**: Integrated a standardized USB-C charging module.
- **Acoustic Subsystem Deletion**: To hit the desired thickness targets, the integrated speakers were removed, transitioning the platform to a purely visual information-delivery node.

## Operational Assessment
The redesigned Solos HUD successfully validated the feasibility of repurposing consumer-grade electro-optics for modular, high-portability applications. The custom software backbone demonstrated the efficacy of direct VESC-to-HUD telemetry for real-time propulsion monitoring.
