# Heated FPV Battery Case

## The Goal
I wanted to keep my FPV batteries warm so I could fly in freezing cold weather (down to -30°C). When LiPo batteries get too cold, they lose power and "sag" under load, so I built a case with a built-in heater to keep them at a good temperature.

## The Electronics
I used two 5V regulators: one for the ESP32-C3 brain and another to power a nichrome heating wire that puts out 5 watts of heat. I used an old thermistor (temperature sensor) to monitor the battery temperature.

## How it Performed
It worked great. Even at -30°C, the temperature only dropped by 0.1°C per minute when not in use. While flying, the heater and the battery's own heat kept everything at a steady 30°C, which is perfect for performance.

## Why it Broke & How to Fix It
I accidentally plugged the battery in backwards while out in the field and fried the electronics.
- **Mistake**: I didn't use a connector that only plugs in one way.
- **Result**: The regulators blew immediately.
- **Next Time**: I need to use proper polarized connectors (like XT30 or XT60) and add a circuit to protect against reverse polarity.
