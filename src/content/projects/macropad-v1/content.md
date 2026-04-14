# Wireless Mechanical Macropad (v1)

## The Goal
I wanted to build a custom wireless macro keypad that connects over Bluetooth. The goal was to have mechanical keys that respond quickly and can be remapped easily without having to write new code.

## The Parts
I used an ESP32-S3 for its built-in Bluetooth and connected the mechanical switches directly to its pins for the fastest response. It runs on a small LiPo battery so I can use it anywhere.

## Software & Remapping
The macropad acts like a standard Bluetooth keyboard, but it also hosts a small web server. You can connect to this website to change what each key does. The new settings are saved directly to the device so it remembers them even after being turned off.

## What I Learned
This macropad was really useful for CAD work and other apps with a lot of shortcuts. Being able to change the keys through a browser worked well. I used this as my daily driver for a few days before I started working on Version 2.
