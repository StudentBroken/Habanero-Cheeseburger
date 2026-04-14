# ESP Eraser: Iteration 1

## The Goal
I wanted to hide a camera system inside a whiteboard eraser. The idea was to take a picture of a board, have GPT-4o process it, and send the result back to my ear using a tiny, almost invisible wire.

## Electronics
The node utilizes an ESP32-S3 Xiao Sense Cam with integrated PSRAM. Upon external trigger, the system captures a high-resolution snapshot and executes a RESTful POST request to the OpenAI vision API. The resulting text payload is transmitted via the ESP-NOW protocol to a secondary receiver unit, which serves as a serial bridge to a custom-developed Android TTS (Text-to-Speech) application.

## Audio Feedback
To keep it secret, the audio is sent to a tiny earbud through a 0.1mm wire. Because the wire is so thin, it's almost impossible to see unless you're looking for it.

- **Computation**: ESP32-S3 Xiao Sense (integrated camera + PSRAM).
- **Communication Topology**: WiFi (Outbound) -> ESP-NOW (Relay) -> USB Serial (Mobile Bridge).
- **Acoustic Downlink**: 0.1mm enamel wire to 8mm micro-driver.

## What I Learned
The whole system worked from start to finish. However, having so many steps (Eraser to relay, relay to phone, phone to audio) made it unreliable. The tiny wire was also way too fragile, which led me to switch to wireless audio for the next version.
