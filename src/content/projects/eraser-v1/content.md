# ESP Eraser: Iteration 1

## The Goal
I wanted to hide a camera system inside a whiteboard eraser. The idea was to take a picture of a board, have GPT-4o process it, and send the result back to my ear using a tiny, nearly invisible wire.

## Electronics
I used an ESP32-S3 Xiao Sense Cam with integrated PSRAM. When triggered, the system captures a high-resolution snapshot and sends a POST request to the OpenAI vision API. The resulting text is transmitted via ESP-NOW protocol to a secondary receiver unit, which bridges to a custom Android TTS (Text-to-Speech) application.

## Audio Feedback
To keep it secret, the audio is sent to a tiny earbud through a 0.1mm wire. Because the wire is so thin, it's nearly invisible unless you're looking for it.

- **Computation**: ESP32-S3 Xiao Sense (integrated camera + PSRAM).
- **Signal path**: WiFi (outbound) -> ESP-NOW (relay) -> USB Serial (mobile bridge).
- **Audio link**: 0.1mm enamel wire to 8mm micro-driver.

## What I Learned
The whole system worked from start to finish. However, having so many steps (eraser to relay, relay to phone, phone to audio) made it unreliable. The 0.1mm wire was also too fragile, which led me to switch to wireless audio for the next version.
