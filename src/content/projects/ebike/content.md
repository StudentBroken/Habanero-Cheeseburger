# Ebike USB-C Charger (48V)

Ebike batteries are large but don’t typically provide phone charging. I built a charger that taps directly into the 48V battery to provide USB-C output for my phone or laptop while riding.

## Design

I used a buck converter rated for 48V-54V input, with a USB Power Delivery controller. The controller negotiates 5V to 20V output depending on what’s plugged in.

The converter efficiency is high enough that it doesn’t noticeably affect range.

## Result

It works as intended. I can charge my phone at full speed from the bike’s battery.
