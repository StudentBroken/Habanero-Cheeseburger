# Ultrasonic Smart Glasses

## The Goal
I wanted to build a pair of glasses that helps you "see" obstacles using sound. The goal was to use an ultrasonic sensor to detect how far away things are and give real-time feedback.

## The Parts
I used an HC-SR04 ultrasonic sensor mounted on regular glasses frames. A small computer reads the sensor data and calculates the distance to the nearest object.
- **Sensor**: Ultrasonic distance sensor.
- **Speaker**: Small built-in audio driver.
- **How it works**: The glasses beep faster as you get closer to something, making it easy to tell where obstacles are.

## Design
I kept the electronics small so the glasses stay comfortable to wear. I also routed the wiring along the arms of the frame to avoid snagging or breaking during use.

## What I Learned
The beeping system worked well for navigating around things. The main issue was that it only looks straight ahead — it doesn't see what's to the sides. To fix this in a future version, I'd need to add more sensors for a wider field of view.
