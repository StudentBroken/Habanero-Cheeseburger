# Macropad v2: BLE Keyboard with Display and Knob

## Design Evolution
The second iteration adds a display and analog knob to the v1 design. The goal was to expand the input surface while keeping the wireless architecture unchanged.

## Hardware Specification
I kept the same ESP32-S3 but added an I2C OLED display and a potentiometer.
- **Display**: 0.96" OLED (I2C) showing the current layer and key bindings.
- **Analog Control**: Potentiometer knob for volume, scrolling, or other variable parameters. The firmware debounces the input in software.
- **Main processor**: ESP32-S3 with BLE HID stack.

## System Integration
I redesigned the case to fit the potentiometer and display. The web configuration tool from v1 was reused without changes, so existing keymaps load automatically on startup.

## Operational Assessment
The knob makes it much easier to control volume or scroll through timelines without reaching for another device. The display gives instant feedback about which layer is active and what the keys do. The macropad is now my daily driver for text editing and media controls.
