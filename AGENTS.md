<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project structure you must know before touching anything

## Content & routing

- Projects live in `src/content/projects/<slug>/metadata.json` + `content.md`. The site auto-detects folders that don't start with `_`. Setting `"hidden": true` in metadata removes a project from all listings.
- Individual project pages: `/projects/[slug]` (SSG, `src/app/projects/[slug]/page.js`).
- Series pages: `/series/[slug]` (SSG, `src/app/series/[slug]/page.js`). A series groups multiple project builds under one subcategory name.

## Series / subcategory system

The `subcategory` field in `metadata.json` links a project to a named series (e.g. `"ESP Eraser"`, `"FPV Drone"`). Rules:

- Projects sharing the same `subcategory` string are **collapsed into a single series card** on the home page grid. The card shows the newest build's thumbnail, the total build count across **all tiers**, and links to `/series/<slug>`.
- The series card appears exactly **once**, in the lowest-numbered (highest-quality) tier that contains any build of that series.
- Individual project cards for subcategory members are **not shown** on the home page — only the series card represents them.
- The series page (`/series/<slug>`) lists all builds newest-first, each linking to its own `/projects/<slug>` page.
- Helper functions in `src/lib/projects.js`: `subcategoryToSlug()`, `getAllSeriesSlugs()`, `getSeriesData(slug)`.
- To add a new build to an existing series, set `"subcategory": "Exact Series Name"` in its `metadata.json`. The slug is auto-derived (lowercase, spaces → hyphens).

## metadata.json fields

Every field an agent may need to set:

| Field | Notes |
|---|---|
| `title` | Title case |
| `date` | `YYYY-MM-DD` |
| `category` | All-caps string shown as a badge (e.g. `HARDWARE`, `HARDWARE & SOFTWARE`) |
| `subcategory` | Series name or `null` |
| `description` | Plain text, 1–2 sentences, no markdown |
| `thumbnail` | 720p WebP path under `public/` — fallback to first media image if absent |
| `thumbnailSmall` | 480p WebP duplicate of `thumbnail`. Name: `photo.webp` → `photo-480.webp`. Generate alongside `thumbnail` for every new project. Omit only if `thumbnail` is a video. |
| `githubLink` | URL or `null` |
| `modelFile` | `.stl` / `.obj` path for the 3D viewer, or `null` |
| `media` | Array of `{type, url, alt?, caption?}` for the carousel |
| `links` | Array of `{label, url}` — renders as external-link buttons (Onshape, Tinkercad, Adafruit, etc.) |
| `assets` | Array of `{name, url, description}` — renders as download buttons |
| `tier` | `1` Flagship · `2` R&D · `3` Weekend hack |
| `hidden` | `true` to exclude from all listings without deleting the folder |

## Writing content.md

Sections split on `## ` headings — each becomes a separate glass-panel card on the project page. Images can be inserted inline between paragraphs:

```markdown
![Alt text](/projects/slug/photo.webp)
*Caption shown below the image*
```

See `src/content/projects/_template/FORMATTING_GUIDE.md` for the full writing guide.
