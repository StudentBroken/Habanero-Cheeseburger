# Solos HUD Redesign

## Project Overview
I reverse-engineered and physically redesigned the Solos HUD to make it smaller and lighter while keeping it functional. The work involved analyzing how it communicates, taking it apart, modifying the circuit boards, and redesigning the housing from scratch.

## Phase 1: Protocol Reverse Engineering
I started by figuring out how the Solos HUD talks to its app and sends data to the display.

- **Method**: I extracted the Android APK and used a Bluetooth sniffer to capture the protocol. I mapped out which services and UUIDs handle display data.
- **Result**: I found the exact message format for display commands and battery telemetry.
- **Custom App**: I wrote software to parse GPS data and read real-time speed and power information from the skateboard's ESC, sending it to the HUD display.

## Phase 2: Hardware Redesign and Cable Surgery
I wanted to shrink the HUD enough to fit on normal glasses. The first step was disassembling it. I extracted the main PCB, flex cables, and the optical prism from the plastic housing.

To shrink it, I had to cut the flex cable that runs between the left and right temples—in half. I used a microscope and precision clippers to cut through the plastic without shorting the internal traces. Then I sealed the cut edges with UV resin to keep moisture out.

Cutting the cable disconnected the original battery, thermistor, and charging circuit, so I had to build a completely new power system.

## Engineering Tradeoffs
I made several changes to hit my weight and size targets. The final weight dropped from 65g to 53g.

- **Battery Swap**: The original 160mAh cell was old and swollen. I replaced it with a salvaged 380mAh lithium cell from scrap hardware, almost tripling the battery life. Since I cut the charging circuit, I added a standalone USB-C charge module with its own protection circuitry.
- **No Speakers**: I removed the speaker to save space and weight. Audio now comes through external earbuds or a speaker.
- **New Housing**: I designed a flat PETG case that folds up and mounts on any standard glasses frame from AliExpress.

## Bill of Materials
- **Solos HUD (Donor Unit)**: $25 CAD
- **Custom PETG Housing**: ~$3 CAD
- **Eyewear Frames (AliExpress)**: $5 CAD
- **USB-C Charge Module**: $1 CAD
- **Battery (380mAh, salvaged)**: Free

**Total**: ~$34 CAD

## Operational Assessment
The redesigned HUD proves you can take apart consumer electronics and rebuild them into something much smaller. The custom software successfully reads skateboard telemetry and displays it on the HUD in real time, giving a high-resolution speed monitor at a fraction of what commercial systems cost.
