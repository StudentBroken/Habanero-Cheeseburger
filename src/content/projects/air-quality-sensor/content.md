# Atmospheric Monitoring Array

## Design Objective
The objective was to engineer a localized environmental monitoring station for real-time telemetry of PM2.5 particulate matter, VOC concentrations, and atmospheric metrics (temperature/humidity). 

## Hardware Architecture
The system is built on an ESP32-C3 microcontroller, selected for its integrated WiFi stack and minimal volumetric footprint. The sensor suite utilizes a multi-modal atmospheric module for VOC/eCO2 and a dedicated laser-based sensor for PM2.5 particulate detection. The assembly is housed in a cost-optimized hybrid enclosure—a commercial frame modified with a custom FDM-printed structural cover.

## Telemetry & Data Management
The firmware executes a periodic sensor polling sequence, transmitting telemetry packets to a centralized Adafruit MQTT broker. This architecture facilitates both local real-time visualization via an integrated OLED interface and long-term time-series analysis through a cloud-based dashboard.

## Operational Findings
Continuous deployment has yielded conclusive data regarding indoor air quality volatility. Visible spikes in PM2.5 particulate concentrations were directly correlated with thermal manufacturing (3D printing), aerosol activity, and culinary operations, validating the system's sensitivity and longitudinal monitoring capabilities.
