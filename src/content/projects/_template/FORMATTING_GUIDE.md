# Project Page Formatting Guide

This guide is for anyone (human or AI) adding a new project to this site. Follow it exactly — the site auto-detects projects by folder name, so a single mistake in `metadata.json` will break the page silently.

---

## Quick-start checklist (for AI agents)

1. Create `src/content/projects/<slug>/metadata.json` — use the schema below.
2. Create `src/content/projects/<slug>/content.md` — follow the writing rules below.
3. Source all raw project assets (pictures, videos, apks, stls) from the `dump/` folder in the project root. Move or copy them into `public/projects/<slug>/` and reference them with that path in `metadata.json`.
4. The folder name **must not** start with `_`. Folders starting with `_` are ignored by the site.
5. Do not modify any file outside `src/content/projects/<slug>/` and `public/projects/<slug>/`.
6. Verify: `metadata.json` must be valid JSON. Run it through a linter before finishing.

---

## File structure

Each project lives in its own folder under `src/content/projects/`. The folder name becomes the URL slug (e.g., `solos-hud` → `/projects/solos-hud`).

```
src/content/projects/
  my-project/
    metadata.json   -- structured data, media, asset links
    content.md      -- the written walkthrough

public/projects/
  my-project/
    photo.jpg
    demo.mp4
    model.stl
    app.apk
```

---

## metadata.json

Full schema with every supported field:

```json
{
  "title": "Short, descriptive title",
  "date": "YYYY-MM-DD",
  "category": "HARDWARE",
  "description": "One or two sentences shown on the project card. No markdown.",
  "githubLink": "",
  "thumbnail": "/projects/my-project/photo.jpg",
  "modelFile": "/projects/my-project/model.obj",
  "media": [
    {
      "type": "image",
      "url": "/projects/my-project/photo.jpg",
      "alt": "Brief description of what is shown",
      "caption": "Optional label overlaid on this image when it is focused in the carousel"
    },
    {
      "type": "video",
      "url": "/projects/my-project/demo.mp4",
      "caption": "Optional label overlaid on this video when it is focused in the carousel"
    }
  ],
  "links": [
    { "type": "github", "url": "https://github.com/you/repo", "label": "View Source" },
    { "type": "website", "url": "https://example.com", "label": "Live Demo" }
  ],
  "assets": [
    { 
      "name": "Download Firmware", 
      "url": "/projects/my-project/firmware.bin",
      "description": "Pre-compiled binary for direct flashing"
    },
    { 
      "name": "Download APK", 
      "url": "/projects/my-project/app.apk",
      "description": "Android companion app"
    }
  ]
}
```

### Field rules

| Field | Required | Rules |
|---|---|---|
| `title` | yes | Title case, no trailing punctuation. Colons OK for subtitles. |
| `date` | yes | ISO `YYYY-MM-DD`. Use completion date or last meaningful update. |
| `category` | yes | All caps, short. Examples: `HARDWARE`, `SOFTWARE`, `HARDWARE & SOFTWARE`, `3D PRINT`, `EMBEDDED`. |
| `description` | yes | Plain prose, no markdown, no bullets, no emojis. End with a period. |
| `githubLink` | yes | Empty string `""` if no public repo. |
| `thumbnail` | no | Path to the image used as the cover on the project card in the grid. If omitted, falls back to the first image in `media`. |
| `modelFile` | no | Path to the 3D model for the viewer. Supports `.stl` and `.obj`. (Legacy `stlFile` key is also supported). |
| `media` | yes | At least one item. Each item requires `type` and `url`. See media rules below. |
| `links` | no | External link buttons shown at page bottom. Use for GitHub repos, live demos, docs, etc. Each item requires `type` and `url`. `type: "github"` renders a GitHub icon; anything else renders a generic external-link icon. `label` is optional (defaults to `"View on GitHub"` or `"Open Link"`). |
| `assets` | no | Download links shown at page bottom. Used for `.bin`, `.hex`, `.pdf`, `.zip`, etc. Each item requires `name`, `url`, and preferably a small `description`. |

### Media item fields

| Field | Required | Rules |
|---|---|---|
| `type` | yes | `"image"` or `"video"` |
| `url` | yes | Path relative to `public/`, e.g. `/projects/my-project/photo.jpg` |
| `alt` | no (encouraged) | Short description read by screen readers. Images only. |
| `caption` | no | Short label shown as a text overlay at the bottom of the card when that item is the focused/centered slide. Use it to identify what is shown (e.g., `"v1 prototype — April 2025"`, `"Final assembly"`, `"Demo clip"`). Keep it under ~60 characters. No markdown. |

Caption ordering recommendation: put the most useful caption on the first item so it is immediately visible.

All file paths are relative to the Next.js `public/` directory. Find your pictures, videos, apks, and stls in the root `dump/` folder, and place them in `public/projects/<slug>/`.

---

## content.md

The content file is a Markdown walkthrough of the project. It is rendered below the image carousel and above the 3D model and downloads.

### Structure

```
# Title (matches metadata.json title exactly)

One-paragraph summary of what this project is and why it exists.

## Phase or section heading

Paragraphs explaining what was done, how, and why.

### Sub-section (optional)

More detail if a section is large enough to warrant it.

#### Sub-sub-section (use sparingly)
```

### Writing rules

- **No emojis.** None, anywhere.
- **No trailing exclamation marks** on factual statements.
- **Be direct.** "I removed the PCB and modeled a new housing" is better than "I embarked on an exciting journey to redesign the housing."
- **Use plain prose** for most content. Use bullets only for genuine lists (parts, steps, tradeoffs) — not as a substitute for paragraphs.
- **Bold** key terms or tradeoff labels on first use within a list item. Do not bold random phrases in prose.
- **Dates and context:** include them where they help tell the story, but do not pad the content. The reader does not need a diary entry.
- Keep headings to three levels deep at most (`##`, `###`, `####`). If you need more levels, the section is probably too long and should be split.
- The content file does not need a "summary" or "conclusion" section. End when the material is covered.

### Length

There is no minimum or maximum, but aim to cover what is interesting and skip what is routine. A project with one novel technique can be covered in 300 words. A multi-phase project may need 700. Do not pad.

---

## Media

- **Images:** JPG or PNG, any resolution. The carousel crops them to a square, so center the subject.
- **Video:** MP4, H.264. Keep files under 50 MB if possible. The carousel plays videos muted and looped; include a normal-speed demo clip rather than a time-lapse if the motion matters.
- **3D Models:** The `modelFile` viewer handles binary/ASCII `.stl` or `.obj` files.
- **Other assets:** `.bin`, `.hex`, APKs, PDFs, etc. — any file that doesn't need a dedicated viewer should go in `assets` as a download button with a short description.

Find all raw source media and assets in the root `dump/` folder. Place copies of them in `public/projects/<slug>/` and reference them with that path in metadata.json.
