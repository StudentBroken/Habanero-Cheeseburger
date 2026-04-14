# Atmospheric Monitoring Array

## Design Objective
I built an air quality monitor to track PM2.5 particles, volatile organic compounds (VOCs), and temperature and humidity in real time.

## Hardware Architecture
The core is an ESP32-C3 microcontroller with built-in WiFi and a small footprint. I paired it with a gas sensor for VOC and CO2 readings, and a laser-based particle sensor for PM2.5. The sensors are mounted in a hybrid enclosure—a commercial frame with a custom 3D-printed cover.

## Telemetry & Data Management
The firmware polls sensors on a schedule and sends the data to an Adafruit MQTT broker. This lets me watch the readings in real time on a small OLED screen or review longer trends on a cloud dashboard.

## Operational Findings
I've been running this for a while and can see clear patterns. PM2.5 spikes during 3D printing, cooking, and when using spray products. The sensor is sensitive enough to catch these changes reliably.
