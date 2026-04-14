# Remote Firework Igniter

## The Goal
I needed a safe way to ignite a rocket from a distance. I had about 30 minutes to build a wireless system that could trigger the fuse remotely so I wouldn’t have to be standing right next to it with a lighter.

## How it works
The system uses an ESP32-C3 and a remote receiver to trigger a high-current discharge from a 3S LiPo battery.
- **Igniter**: I wrapped a match head in thin copper wire. When the battery sends power through the wire, it heats up and lights the match.
- **Wireless Link**: Dedicated RF remote for long-range reliability.

## Field Failure
It worked on my desk, but failed completely once I took it outside in the rain.
- **What happened**: The match head absorbed moisture from the humid air. Even though the wire got hot, the damp match wouldn’t ignite.
- **Result**: No ignition, and a wet rocket.

## Lessons Learned
Matches are poor igniters for outdoor use because they absorb water readily. For the next version, I’ll use professional e-matches that are waterproof and designed for this application. It was a good lesson in how environmental conditions can render an indoor prototype impractical in the field.
