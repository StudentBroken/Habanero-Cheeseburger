# Air Quality Sensor

## Scope
Built an air quality monitor to track PM2.5 particles, volatile organic compounds (VOCs), and temperature and humidity.

## Hardware Integration
The core is an ESP32-C3 microcontroller. I paired it with a gas sensor for VOC and CO2 readings, and a laser-based particle sensor for PM2.5. The sensors are mounted in a hybrid enclosure—a commercial frame with a custom 3D-printed cover.

## Data Logging
The firmware polls sensors on a schedule and pushes the data to an Adafruit MQTT broker. Telemetry is viewable locally on a small OLED screen or remotely on a cloud dashboard.

## Results
I can clearly track patterns: PM2.5 heavily spikes during 3D printing, cooking, and when using spray products. The sensor is sensitive enough to catch these changes reliably.
