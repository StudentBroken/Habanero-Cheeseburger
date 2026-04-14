# Wireless Mechanical Macropad (v1)

## The Goal
I wanted to build a custom wireless macro keypad that connects over Bluetooth. The goal was to have mechanical keys that respond quickly and can be remapped easily without having to recompile code.

## The Parts
I used an ESP32-S3 for its built-in Bluetooth and connected the mechanical switches directly to its pins for fast response. It runs on a small LiPo battery so I can use it anywhere.

## Software & Remapping
The macropad acts like a standard Bluetooth keyboard, but it also hosts a small web server. You can connect to this web interface to change what each key does. The settings are saved to the device so it remembers them even after being turned off.

## What I Learned
This macropad was useful for CAD work and other applications with many shortcuts. Being able to change the keys through a browser worked well. I used this for several days before starting work on Version 2.
