// HTML-escape helper
function e(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Image compression ─────────────────────────────────────────────────────────

/**
 * Load one image URL into a canvas, downscale it, and export as WebP (JPEG
 * fallback). Returns a data-URL string, or null on failure.
 *
 * @param {string}  url
 * @param {number}  maxWidth  px – print cards are ~480px wide on A4
 * @param {number}  quality   0–1 WebP/JPEG quality
 */
function compressImage(url, maxWidth = 480, quality = 0.60) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      try {
        const scale  = Math.min(maxWidth / img.naturalWidth, 1);
        const w      = Math.max(1, Math.round(img.naturalWidth  * scale));
        const h      = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width  = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);

        // Prefer WebP; some older browsers return 'data:,' — fall back to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 50) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Compress every unique thumbnail image referenced by the project list.
 * Runs all compressions in parallel.
 *
 * @param {object[]} projects
 * @returns {Promise<Record<string, string>>}  map of originalUrl → dataUrl
 */
export async function compressProjectImages(projects) {
  // Collect one URL per project (thumbnail preferred, first image fallback)
  const urls = new Map(); // url → true (Set-like, preserves order)
  for (const p of projects) {
    const url = p.thumbnail || p.media?.find(m => m.type === 'image')?.url;
    if (url) urls.set(url, true);
  }

  const cache = {};
  await Promise.all(
    [...urls.keys()].map(async (url) => {
      const dataUrl = await compressImage(url);
      if (dataUrl) cache[url] = dataUrl;
    })
  );
  return cache;
}

// ── HTML generation ───────────────────────────────────────────────────────────

/**
 * Generate a self-contained, print-ready HTML document.
 * Pass `imageCache` (from compressProjectImages) to embed compressed images
 * as data-URLs so the PDF file stays small.
 *
 * @param {{ projects: object[], isFr: boolean, imageCache?: Record<string,string> }} opts
 * @returns {string}
 */
export function generatePrintHTML({ projects, isFr, imageCache = {} }) {
  const sorted = [...projects].sort((a, b) => new Date(a.date) - new Date(b.date));

  const today = new Date().toLocaleDateString(isFr ? 'fr-CA' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // ── Timeline ──────────────────────────────────────────────────────
  const timelineHTML = sorted.map(p => {
    const dateStr = new Date(p.date + 'T12:00:00').toLocaleDateString(
      isFr ? 'fr-CA' : 'en-US', { month: 'short', year: 'numeric' }
    );
    const title = e(isFr ? (p.titleFr || p.title) : p.title);
    return `<div class="tl"><span class="tl-d">${dateStr}</span><span class="tl-t">${title}</span></div>`;
  }).join('');

  // ── Project tiers ─────────────────────────────────────────────────
  const tiers = [
    { tier: 1, label: isFr ? 'Intégrations Complexes'    : 'Complex Integrations'    },
    { tier: 2, label: isFr ? 'Prototypage Rapide & R&D' : 'Rapid Prototyping & R&D' },
    { tier: 3, label: isFr ? 'Hacks de Week-end'        : 'Weekend Hacks'           },
  ];

  const tiersHTML = tiers.map(({ tier, label }) => {
    const list = projects.filter(p => p.tier === tier);
    if (!list.length) return '';

    const cardsHTML = list.map(p => {
      const rawUrl  = p.thumbnail || p.media?.find(m => m.type === 'image')?.url;
      // Use the compressed data-URL if available; otherwise fall back to the
      // original path (browser will still fetch it, but at least it's a ref)
      const imgSrc  = rawUrl ? (imageCache[rawUrl] || rawUrl) : null;
      const title   = e(isFr ? (p.titleFr        || p.title)       : p.title);
      const desc    = e(isFr ? (p.descriptionFr  || p.description) : p.description);
      const cat     = e(isFr ? (p.categoryFr     || p.category)    : p.category);

      // data-URLs are already safe for src attributes (no <, >, & chars)
      const imgHTML = imgSrc
        ? `<img src="${imgSrc.startsWith('data:') ? imgSrc : e(imgSrc)}" alt="${title}" />`
        : `<div class="no-img">🔧</div>`;

      return `<div class="card">
  <div class="card-img">${imgHTML}</div>
  <div class="card-body">
    <div class="cat">${cat}</div>
    <div class="ctitle">${title}</div>
    <div class="date">${e(p.date)}</div>
    <div class="desc">${desc}</div>
  </div>
</div>`;
    }).join('');

    return `<section class="tier">
  <h2>${e(label)}</h2>
  <div class="grid">${cardsHTML}</div>
</section>`;
  }).join('');

  // ── Inline CSS (system fonts = zero network latency) ──────────────
  const css = `
@page { size: A4 portrait; margin: 1.8cm 1.6cm; }
*    { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
       font-size: 10pt; color: #1a2233; background: #fff;
       -webkit-print-color-adjust: exact; print-color-adjust: exact; }

.hdr       { margin-bottom: 1.1rem; padding-bottom: .55rem; border-bottom: 3px solid #f97316; }
.hdr-title { font-size: 20pt; font-weight: 800; color: #f97316; letter-spacing: .02em; }
.hdr-sub   { font-size: 8.5pt; color: #5a6a7f; margin-top: .25rem; }
.hdr-meta  { font-size: 6.5pt; color: #9aa5b4; font-family: 'Courier New', monospace;
             letter-spacing: .05em; margin-top: .15rem; }

.sec-title { font-size: 10pt; font-weight: 800; border-bottom: 2px solid #f97316;
             padding-bottom: .25rem; margin-bottom: .55rem; }

.tl-grid   { display: grid; grid-template-columns: repeat(3, 1fr);
             gap: .22rem .8rem; margin-bottom: 1rem; }
.tl        { display: flex; flex-direction: column; padding: .18rem .4rem;
             border-left: 2px solid #0ea5e9; gap: 1px; }
.tl-d      { font-family: 'Courier New', monospace; font-size: 5.5pt; color: #f97316;
             text-transform: uppercase; letter-spacing: .05em; }
.tl-t      { font-size: 6.5pt; font-weight: 700; color: #1a2233; line-height: 1.3; }

.tier      { margin-top: 0; }
.tier + .tier { page-break-before: always; break-before: page; }
.tier h2   { font-size: 11pt; font-weight: 800; border-bottom: 2px solid #f97316;
             padding-bottom: .25rem; margin-bottom: .6rem; }

.grid      { display: grid; grid-template-columns: 1fr 1fr; gap: .6rem; }
.card      { border: 1px solid rgba(0,0,0,.11); border-radius: 7px; overflow: hidden;
             break-inside: avoid; page-break-inside: avoid; }
.card-img  { width: 100%; aspect-ratio: 16/9; overflow: hidden;
             background: #f3f5f8; display: flex; align-items: center; justify-content: center; }
.card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.no-img    { font-size: 1.8rem; opacity: .2; }
.card-body { padding: .5rem .65rem .6rem; }
.cat       { font-family: 'Courier New', monospace; font-size: 5pt; color: #0ea5e9;
             font-weight: 700; text-transform: uppercase; letter-spacing: .07em;
             margin-bottom: .15rem; }
.ctitle    { font-size: 8.5pt; font-weight: 800; line-height: 1.25; margin-bottom: .15rem; }
.date      { font-family: 'Courier New', monospace; font-size: 5.5pt; color: #9aa5b4;
             margin-bottom: .3rem; }
.desc      { font-size: 7pt; color: #5a6a7f; line-height: 1.5; }

.ftr       { margin-top: 1.2rem; padding-top: .4rem; border-top: 1px solid rgba(0,0,0,.1);
             display: flex; justify-content: space-between;
             font-family: 'Courier New', monospace; font-size: 5.5pt; color: #9aa5b4;
             break-inside: avoid; page-break-inside: avoid; }
`;

  return `<!DOCTYPE html>
<html lang="${isFr ? 'fr' : 'en'}">
<head>
<meta charset="UTF-8">
<title>Habanero Cheeseburger — ${isFr ? 'Archive de Projets' : 'Project Archive'}</title>
<style>${css}</style>
</head>
<body>
<div class="hdr">
  <div class="hdr-title">Habanero Cheeseburger</div>
  <div class="hdr-sub">${isFr
    ? "Une archive numérique des projets que j'ai bâtis."
    : "A digital archive of projects I've built."}</div>
  <div class="hdr-meta">${projects.length} ${isFr ? 'projets' : 'projects'} · ${today}</div>
</div>
<div class="sec-title">${isFr ? 'Chronologie' : 'Timeline'}</div>
<div class="tl-grid">${timelineHTML}</div>
${tiersHTML}
<div class="ftr">
  <span>Habanero Cheeseburger — ${isFr ? 'Archive de Projets' : 'Project Archive'}</span>
  <span>${today}</span>
</div>
</body>
</html>`;
}
