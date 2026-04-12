# Electro-Optical Interface: Solos HUD Redesign

## Project Overview
The objective was the comprehensive reverse-engineering and structural redesign of a consumer-grade head-up display (HUD) platform. The project progressed from low-level protocol analysis to the aggressive physical teardown and fabrication of a custom, high-density optical enclosure.

## Phase 1: Protocol Reverse Engineering
The initial research phase focused on the extraction and analysis of the proprietary communication layer between the Solos HUD and its companion application.

- **Methodology**: Static analysis of the extracted APK and real-time Bluetooth GATT sniffing.
- **Result**: Successful mapping of the peripheral's HID services and the discovery of non-standard characteristic UUIDs for raw display data transmission.
- **Application Logic**: Developed a custom software suite facilitating real-time notification parsing, GPS telemetry visualization, and VESC (Variable Electronic Speed Controller) data harvesting for electric propulsion systems.

## Phase 2: Hardware Overhaul & Flex Cable Surgery
The secondary objective was the radical reduction of the platform's volumetric footprint. The OEM injection-molded housing was decommissioned, and the internal components—including the main logic PCB, flex assemblies, and the optical waveguide prism—were extracted.

To achieve the desired form factor, drastic modifications to the internal routing were required. The main flex cable bridging the left and right temples was manually severed to halve its length. This was executed under microscopic magnification using precision clippers to ensure the internal traces of the multi-layer flex PCB were not short-circuited during the cut. The raw edge of the severed flex was subsequently sealed with UV resin to prevent delamination or environmental ingress.

Severing this cable inevitably disconnected the OEM battery's NTC thermistor and charging path, necessitating a completely custom power architecture.

## Engineering Tradeoffs & System Optimization
To achieve the targets for mass reduction and system longevity, several intentional hardware modifications were executed. The overall system weight was successfully reduced from the original 65g down to 53g (an 18.5% decrease).

- **Energy Storage & Management**: The original 160mAh battery—which was slightly puffed due to overdischarge after sitting in an 8-year-old donor unit from an older tech store—was replaced with a salvaged 380mAh lithium-polymer cell, delivering a massive 137.5% increase in capacity. Because the OEM charge circuitry and NTC were disabled during the flex cable surgery, a standalone micro USB-C module was wired in to bypass the original power path. The new cell utilizes its own onboard BMS for safety.
- **Acoustic Subsystem Deletion**: To hit aggressive thickness targets, the integrated speakers were entirely removed, transitioning the primary platform to a visual-only node. Audio functionality was maintained via an external, plug-and-play auxiliary setup.
- **Optical Enclosure**: A custom, single-sided enclosure was modeled in PETG using 2D scan-to-CAD techniques for precise component alignment. The redesign prioritized "fold-flat" capability and universal mounting interfaces for cheap, off-the-shelf eyewear frames.

## Bill of Materials (BOM) & Cost Analysis
The redesign prioritized extreme cost-efficiency, heavily relying on salvaged hardware and micro-components.

- **Solos HUD (Donor Unit)**: $25 CAD
- **Custom PETG Housing (incl. electricity)**: ~$3 CAD
- **Base Eyewear Frames (AliExpress)**: $5 CAD
- **Charge Controller (Micro USB-C Module)**: $1 CAD
- **Power Supply (380mAh Li-Po w/ BMS)**: Free (salvaged scrap)

**Total System Cost**: ~$34 CAD

## Operational Assessment
The redesigned Solos HUD successfully validated the feasibility of repurposing consumer-grade electro-optics for modular, high-portability applications. The custom software backbone demonstrated the efficacy of direct VESC-to-HUD telemetry, creating a highly capable real-time propulsion monitor at a fraction of the cost of commercial alternatives.
