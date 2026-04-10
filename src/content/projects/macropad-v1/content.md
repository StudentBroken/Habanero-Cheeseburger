# BLE Peripheral Architecture: Macropad v1

## Technical Objective
The objective was the engineering of a custom Human Interface Device (HID) peripheral utilizing Bluetooth Low Energy (BLE). The project focused on the integration of mechanical tactile inputs with a low-latency wireless protocol stack and real-time remapping capabilities.

## Hardware Specification
The system is built on an ESP32-S3 microprocessor, leveraging its integrated BLE radio. The HID matrix is interfaced directly with GPIO pins, allowing for un-buffered, low-latency input capture. The platform is fully self-contained with an integrated LiPo power cell for mobile deployment.

## Control Logic & Interface
The firmware manages twin protocol stacks: a primary BLE HID stack for standard keyboard emulation and an auxiliary 802.11 web server for asynchronous configuration. Users can access a localized web interface to remap the keymap matrix; these configurations are committed to non-volatile storage (NVS), ensuring persistence across power cycles without necessitating firmware recompilation.

## Operational Assessment
The prototype demonstrated significant utility in multi-application workflows (CAD/DCC software). The web-based reconfiguration layer successfully validated the "hardware-as-a-service" model for HID peripherals. The system remained in active "daily driver" status until its architectural evolution into the v2 platform approximately 96 hours post-deployment.
