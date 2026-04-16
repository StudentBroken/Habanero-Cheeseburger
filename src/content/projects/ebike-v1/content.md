# Electric Bike (v1)

Built in late February 2023, a few weeks before turning 14. No mentor, no prior experience with anything electrical. Everything I needed to know about voltage, current, mAh, and cell chemistry came from YouTube and forum posts as I went.

## Battery Pack

The cells came off Facebook Marketplace at $1.50 each — 1500 mAh 18650s. I built a 6S8P pack, and for the interconnects, I stripped a 110V extension cord, pulled out the copper strands, and twisted them into bus bars.

I built this ebike battery at 13 with a $10 iron and salvaged copper. Looking back, this was a massive thermal runaway risk because I didn't understand spot-welding, proper nickel strips, or sizing a BMS for actual discharge current.

The pack was wrapped in a layer of foam and then blue duct tape.

![Front view of the battery pack](/projects/ebike-v1/battery-front.webp)
*The finished pack — foam layer underneath, duct tape over everything*

## Motor and Drive

The motor came from a leafboard — the same one I later reused in the [underwater scooter v2](/projects/underwater-scooter-v2). I mounted it as a friction drive, pressing it directly against the tire with sandpaper grip tape wrapped around the motor can.

![Motor friction drive contact point](/projects/ebike-v1/motor-friction.webp)
*Motor pressed against the tire — the sandpaper tape was the only thing providing grip*

## ESC

I bought a 40 A RC plane ESC from Amazon for about $30. I picked it because 40 A sounded like a lot. What I did not know then is that RC plane ESCs are designed for propellers, not hub motors, and handle back-EMF and stall conditions completely differently. It lasted about a week before it failed.

That failure is what pushed me toward a VESC for v2.

## Throttle

The ESC needed a PWM signal in the standard RC range. A potentiometer outputs analog voltage. I could not find a ready-made adapter, so I wired a cheap pot into an Arduino Nano and wrote a short sketch to read the ADC and output a mapped PWM signal on a servo pin. The Nano ran off the ESC's BEC.

![Arduino Nano wired as a pot-to-PWM translator](/projects/ebike-v1/arduino-translator.webp)
*Arduino Nano reading the pot and outputting PWM — powered from the ESC's built-in 5V BEC*

The throttle body itself was 3D printed, with a small lever sized for one finger.

## What Came Next

After the ESC died, my dad got me a VESC 6.7 Pro. That became v2 — a much more reliable build that I actually rode for a full year and took on longer trips.

The CAD files for the printed parts are probably gone. The machine I was printing on at the time had no remote backup and no Klipper, so nothing was saved. I have not been able to find them.
