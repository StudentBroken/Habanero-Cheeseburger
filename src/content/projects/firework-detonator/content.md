# Remote Firework Igniter

## The Goal
I needed a safe way to ignite a rocket from a distance. I had about 30 minutes to build a wireless system that could trigger the fuse remotely so I wouldn't have to be standing right next to it with a lighter.

## How it works
The system uses an ESP32-C3 and a remote receiver to trigger a high-current discharge from a 3S LiPo battery.
- **The "Match"**: I wrapped a match head in thin copper wire. When the battery sends power through the wire, it heats up instantly and lights the match.
- **Wireless Link**: Dedicated RF remote for long-range reliability.

## Field Failure
It worked perfectly on my desk, but failed completely once I took it outside in the rain.
- **What happened**: The match head absorbed too much moisture from the humid air. Even though the wire got red-hot, the damp match wouldn't catch fire.
- **Result**: No ignition, and a very wet rocket.

## Lessons Learned
Matches are terrible igniters for outdoor use because they soak up water like a sponge. For the next version, I’ll use professional "e-matches" that are waterproof and designed for this. It was a good lesson in how environmental conditions can ruin a perfectly good indoor prototype.
