# Ebike USB-C Charger (48V)

## The Idea
Ebikes have massive batteries, but most don't have a way to charge a phone. I wanted to build a charger that taps directly into the bike's 48V battery to provide fast USB-C charging for my phone or laptop while riding.

## How it works
I used a high-voltage buck converter that can handle the 48V-54V input from the main battery. 
- **Power Delivery**: It includes a USB-C PD controller so it can talk to devices and provide anything from 5V to 20V depending on what's plugged in.
- **Efficiency**: The converter is very efficient, so it barely affects the bike's range.

## Build Result
It works perfectly. I can now charge my phone at full speed using the bike's main battery. It’s basically a 700Wh power bank on wheels.
