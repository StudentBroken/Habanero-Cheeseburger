# Electric Bike (v1)

Built in late February 2023, a few weeks before turning 14, with no mentor and no prior experience with electric systems. Everything — voltage, current, mAh, cell chemistry — was learned from scratch off the internet as I went.

## Battery Pack

The cells came from a Facebook Marketplace seller for $1.50 each. They were 1500 mAh 18650s. At the time I did not understand what mAh meant in practice, and did not grasp how cell capacity, discharge rate, and series/parallel configuration translated to real-world range or current draw.

The pack is a 6S8P configuration — six cells in series for roughly 22.2 V nominal, eight cells in parallel per group for capacity. I soldered it by hand using copper wire salvaged from a 110 V extension cord: I cut off the plug ends, slit the insulation, and pulled out the stranded copper cores, then twisted them into bus bars.

The iron was a $10 soldering iron. It worked, barely.

![Hand-soldered copper wire bus connecting the 18650 cells](/projects/ebike-v1/battery-wiring.webp)
*Copper wire bus — salvaged from a residential extension cord*

The finished pack was wrapped in a layer of soft foam, then covered in blue duct tape. The BMS was the cheapest 12 A unit I could find. I blew it more than once before understanding why — 12 A is far below what this system demanded under load.

## Motor and Drive System

The motor came from a leafboard — the same model used in the [underwater scooter v2](/projects/underwater-scooter-v2). It is a hub motor originally designed for a small electric skateboard. I mounted it as a friction drive: the motor pressed directly against the tire, with sandpaper-grip tape wrapped around the motor can to improve traction.

![Motor friction drive contact point](/projects/ebike-v1/motor-friction.webp)
*The motor rides against the tire — sandpaper tape provides the grip*

## ESC

The ESC was a 40 A RC plane ESC from Amazon, around $30. I picked it because the listing said 40 A and I assumed that was enough. What I did not understand then was that RC plane ESCs are not designed for the stall currents and back-EMF patterns of a hub motor under load, especially with a battery that could briefly dump far more than 40 A.

It survived about a week of use before it failed.

## Throttle

Standard potentiometers output an analog voltage. The ESC expected a PWM signal in the hobby RC range (1000–2000 µs pulse width). I did not find a ready-made solution, so I wired a cheap pot into an Arduino Nano and wrote a short sketch to read the ADC value and output a mapped PWM signal on a servo pin. The Nano was powered from the ESC's BEC output.

![Arduino Nano converting potentiometer signal to PWM](/projects/ebike-v1/arduino-translator.webp)
*Arduino Nano acting as a pot-to-PWM translator, powered from the ESC BEC*

The 3D printed throttle body held the potentiometer with a small lever sized for an index finger trigger.

## What Failed and What Came Next

The ESC was the first thing to go. After that failure I understood that RC plane ESCs are not suited for direct-drive hub motors, and that I needed a proper motor controller. My dad got me a VESC 6.7 Pro, which became the basis for v2 — a build that ran reliably for a full year and handled several longer-range trips.

The 3D CAD files for the throttle and any printed parts were lost. The machine I was printing on at the time had no networked backup and no Klipper, so nothing was saved remotely. They may still exist somewhere, but I have not found them.
