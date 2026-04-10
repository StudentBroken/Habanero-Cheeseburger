# BLE Peripheral Architecture: Macropad v2 (Visual & Analog Integration)

## Design Evolution
The objective of the second iteration was the integration of a multi-modal interface, adding high-fidelity visual feedback and analog input control. The project focused on expanding the HID surface area while maintaining the core wireless architecture established in v1.

## Hardware Specification
The system utilizes the same ESP32-S3 microprocessor but extends the I/O interface to support an I2C-based OLED display and an analog-to-digital (ADC) potentiometer.
- **Visual Node**: 0.96" OLED (I2C), providing real-time layer status and dynamic key mapping telemetry.
- **Analog Input**: Potentiometer knob with firmware-level debounce routines, mapped to variable HID parameters (system audio, scroll-indexing).
- **Control Node**: ESP32-S3 with BLE HID stack.

## System Integration
The structural enclosure was радикальное re-engineered to accommodate the increased volumetric displacement of the potentiometer and display module. The firmware's web-based configuration engine was migrated successfully from v1, ensuring backward compatibility for non-volatile keymap storage.

## Operational Assessment
The addition of analog control significantly improved the workflow efficiency for multi-media and timeline-based applications. The integrated OLED reduced cognitive load by providing immediate visual confirmation of the active HID profile. Macropad v2 successfully transitioned from a prototype to a primary operational daily driver.
