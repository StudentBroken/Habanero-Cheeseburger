# Heated FPV Battery Case

## The Goal
I wanted to keep my FPV batteries warm so I could fly in freezing cold weather (down to -30°C). When LiPo batteries get too cold, they lose capacity and sag under load, so I built a case with a built-in heater to maintain temperature.

## The Electronics
I used two 5V regulators: one for the ESP32-C3 and another to power a nichrome heating wire that outputs 5 watts. I used a thermistor to monitor battery temperature.

## How it Performed
The system performed well. Even at -30°C, the temperature dropped only 0.1°C per minute when not in use. While flying, the heater and battery's own heat kept everything at about 30°C, which is ideal for discharge performance.

## Why it Broke & How to Fix It
I accidentally plugged the battery in backwards while in the field and fried the electronics.
- **Mistake**: I didn't use a polarized connector.
- **Result**: The regulators failed immediately.
- **Next time**: I need to use proper polarized connectors (like XT30 or XT60) and add reverse-polarity protection.
