# Your Project Title

One paragraph: what is this, why was it built, what does it do. Keep it factual and direct.

## Project Overview

Describe the objective. What problem does this solve? What were the constraints (time, budget, size)?

![First photo of the project](/projects/your-project/photo1.jpg)
*Caption: what is shown in this image*

## Hardware Architecture

Describe the physical build — enclosure, PCB, motors, sensors, power rail, wiring. Include key component choices and why.

- **Microcontroller / SBC**: e.g. ESP32-S3 — reason for choosing it
- **Power**: e.g. 3S LiPo, USB-C PD, BEC — voltage rails and distribution
- **Actuators / Sensors**: list key components

![Internal layout or electronics photo](/projects/your-project/electronics.jpg)
*Caption: internal layout / component placement*

## Software & Firmware

Explain the code. What language/framework? What does the firmware do? Any notable algorithms, protocols, or web interfaces?

```
Key logic or pseudocode if useful
```

## 3D Design & Fabrication

If applicable: how was the enclosure or frame designed? What CAD tool was used (Onshape, Tinkercad, Fusion)? How long did it take to print?

![CAD screenshot or print photo](/projects/your-project/cad.jpg)
*Caption: CAD model / print in progress*

## Bill of Materials (BOM)

List parts and costs.

- **Part name**: $X.XX — source / notes
- **Part name**: $X.XX — source / notes

**Total System Cost**: ~$XX.XX

## Challenges & Lessons Learned

What went wrong? What would you change in the next version?

- **Challenge** — what happened, how it was resolved.
- **Next steps** — what a v2 would improve.

<!--
INSTRUCTIONS FOR CREATING A NEW PROJECT:
1. Duplicate this `_template` folder and rename it to your project slug (e.g., `my-project`).
   Folders starting with `_` are ignored — rename it to activate it.
2. Place all media (photos, videos, STLs, APKs) in `public/projects/<slug>/`.
   Source them from the root `dump/` folder.
3. Fill out `metadata.json` — see comments in that file for every field.
4. Fill out this `content.md`. Delete sections you don't need. Add sections if needed.
5. To insert an image inline between paragraphs:
   ![Alt text](/projects/your-project/photo.jpg)
   *Caption shown below the image*
   The line below the image (wrapped in *asterisks*) renders as a caption.
-->
