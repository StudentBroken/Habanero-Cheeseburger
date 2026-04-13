"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Printer } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';
import { useLang } from './LangProvider';
import { getAge, BIRTH_DATE } from '@/lib/age';
import { generatePrintHTML, compressProjectImages } from '@/lib/printTemplate';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export default function HomeContent({ projects }) {
  const { lang } = useLang();
  const isFr = lang === 'fr';

  const NAV_QUIPS = isFr ? [
    'NAV',
    '// PAS UN NAV',
    '// UN TROMBONE',
    '// IMPROVISATION',
    'NAV',
  ] : [
    'NAV',
    '// NOT A NAV',
    '// A PAPERCLIP',
    '// IMPROVISING',
    'NAV',
  ];


  const [showKonami, setShowKonami] = useState(false);
  const [macgyverMode, setMacgyverMode] = useState(false);
  const [titleGlitch, setTitleGlitch] = useState(false);
  const [navQuipIdx, setNavQuipIdx] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const konamiIdx = useRef(0);
  const typedBuf = useRef('');
  const titleClicks = useRef(0);
  const timelineRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scroll: 0 });
  const nodeRefs  = useRef([]);
  const itemRefs  = useRef([]);
  const wgtCur    = useRef([]);
  const wgtTgt    = useRef([]);
  const rafRef    = useRef(null);
  const tlMouseX  = useRef(-9999);
  const tlHover   = useRef(false);
  const titleRef  = useRef(null);

  const sortedProjects = [...projects].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Age-group helpers
  function getAgeAtDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    let age = d.getFullYear() - BIRTH_DATE.getFullYear();
    const m = d.getMonth() - BIRTH_DATE.getMonth();
    if (m < 0 || (m === 0 && d.getDate() < BIRTH_DATE.getDate())) age--;
    return age;
  }

  const GROUP_INFO = {
    14: { en: 'Early builds',        fr: 'Premiers projets'    },
    15: { en: 'Systems & firmware',  fr: 'Systèmes & firmware'  },
    16: { en: 'Integrated hardware', fr: 'Hardware intégré'     },
    17: { en: 'Current',             fr: 'En cours'             },
  };

  // Group sortedProjects by age (preserving chronological order within each group)
  const groupMap = new Map();
  for (const p of sortedProjects) {
    const age = getAgeAtDate(p.date);
    if (!groupMap.has(age)) groupMap.set(age, []);
    groupMap.get(age).push(p);
  }
  const timelineGroups = [...groupMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([age, projs]) => ({
      age,
      label: isFr ? `${age} ans` : `${age} y/o`,
      description: GROUP_INFO[age]?.[isFr ? 'fr' : 'en'] ?? '',
      projects: projs,
    }));

  // Flat index map so nodeRefs / itemRefs can be addressed by sortedProjects index
  const projectFlatIndex = new Map(sortedProjects.map((p, i) => [p.id, i]));

  // Pre-compute series: collect ALL builds across every tier per subcategory.
  // Each series card is shown exactly once, in the lowest-numbered (highest-quality) tier.
  const seriesMap = new Map(); // subcategory name → { allProjects, displayTier }
  for (const p of projects) { // projects is already newest-first
    if (!p.subcategory) continue;
    if (!seriesMap.has(p.subcategory)) {
      seriesMap.set(p.subcategory, { allProjects: [], displayTier: p.tier });
    }
    const s = seriesMap.get(p.subcategory);
    s.allProjects.push(p);
    if (p.tier < s.displayTier) s.displayTier = p.tier;
  }

  const subcategoryToSlug = (name) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const formatMonthYear = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString(isFr ? 'fr-CA' : 'en-US', { month: 'long', year: 'numeric' });
  };

  const todayFormatted = new Date().toLocaleDateString(isFr ? 'fr-CA' : 'en-US', { month: 'long', year: 'numeric' });

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === KONAMI[konamiIdx.current]) {
        konamiIdx.current++;
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0;
          setShowKonami(true);
        }
      } else {
        konamiIdx.current = e.key === KONAMI[0] ? 1 : 0;
      }
      if (e.key.length === 1) {
        typedBuf.current = (typedBuf.current + e.key.toLowerCase()).slice(-7);
        if (typedBuf.current === 'macgyver') {
          setMacgyverMode(true);
          setTimeout(() => setMacgyverMode(false), 6000);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onMouseDown = useCallback((e) => {
    const el = timelineRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStart.current = { x: e.pageX, scroll: el.scrollLeft };
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const el = timelineRef.current;
    if (!el) return;
    const dx = e.pageX - dragStart.current.x;
    el.scrollLeft = dragStart.current.scroll - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    const el = timelineRef.current;
    if (el) {
      el.style.cursor = 'grab';
      el.style.userSelect = '';
    }
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const DOCK_SCALE = 2.2;
  const DOCK_SIGMA = 160;
  const DOCK_LERP  = 0.12;

  useEffect(() => {
    const N = sortedProjects.length;
    wgtCur.current = Array(N).fill(0);
    wgtTgt.current = Array(N).fill(0);

    const onMove = (e) => {
      tlMouseX.current = e.clientX;
      tlHover.current  = true;

      const titleEl = titleRef.current;
      if (titleEl) {
        const r  = titleEl.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = Math.max(-10, Math.min(10, (e.clientX - cx) * 0.07));
        const dy = Math.max(-5,  Math.min(5,  (e.clientY - cy) * 0.07));
        titleEl.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);

    function loop() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      for (let i = 0; i < N; i++) {
        const node = nodeRefs.current[i];
        if (node && tlHover.current) {
          const rect = node.getBoundingClientRect();
          const cx   = rect.left + rect.width  / 2;
          const cy   = rect.top  + rect.height / 2;
          const dx   = tlMouseX.current - cx;
          const dist = Math.abs(dx);
          wgtTgt.current[i] = Math.exp(-(dist * dist) / (2 * DOCK_SIGMA * DOCK_SIGMA));
        } else {
          wgtTgt.current[i] = 0;
        }

        wgtCur.current[i] += (wgtTgt.current[i] - wgtCur.current[i]) * DOCK_LERP;

        const node2 = nodeRefs.current[i];
        const item2 = itemRefs.current[i];
        if (node2) {
          const t = wgtCur.current[i];
          // Scale the parent Link element so the pointer hit area matches the visual dot size
          if (item2) {
            item2.style.transform = `scale(${1 + (DOCK_SCALE - 1) * t})`;
            item2.style.zIndex    = t > 0.05 ? String(Math.round(1 + t * 20)) : '1';
          }
          const [r, g, b] = isDark
            ? [Math.round(83  + (56  - 83)  * t), Math.round(88  + (189 - 88)  * t), Math.round(96  + (248 - 96)  * t)]
            : [Math.round(185 + (14  - 185) * t), Math.round(194 + (165 - 194) * t), Math.round(207 + (233 - 207) * t)];
          node2.style.backgroundColor = `rgb(${r},${g},${b})`;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sortedProjects.length]);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const scrollToEnd = () => el.scrollLeft = el.scrollWidth;
    scrollToEnd();
    requestAnimationFrame(scrollToEnd);
    setTimeout(scrollToEnd, 100);
  }, []);

  // Show sticky timeline once the main timeline scrolls out of view
  useEffect(() => {
    const section = document.getElementById('section-timeline');
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-40px 0px 0px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timeoutId;
    const scheduleGlitch = () => {
      const nextGlitchIn = 3000 + Math.random() * 5000;
      timeoutId = setTimeout(() => {
        setTitleGlitch(true);
        setTimeout(() => setTitleGlitch(false), 600 + Math.random() * 800);
        scheduleGlitch();
      }, nextGlitchIn);
    };
    scheduleGlitch();
    return () => clearTimeout(timeoutId);
  }, []);

  const onTitleClick = () => {
    titleClicks.current++;
    if (titleClicks.current >= 7) {
      titleClicks.current = 0;
      setTitleGlitch(true);
      setTimeout(() => setTitleGlitch(false), 2200);
    }
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const cycleNavQuip = () =>
    setNavQuipIdx(i => (i + 1) % NAV_QUIPS.length);

  // Stop the rAF dock-animation before the browser renders the print preview
  useEffect(() => {
    const onBeforePrint = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    window.addEventListener('beforeprint', onBeforePrint);
    return () => window.removeEventListener('beforeprint', onBeforePrint);
  }, []);

  const handlePrint = useCallback(async () => {
    setIsPrinting(true);

    // Compress every thumbnail to ~480 px WebP 60% — runs in parallel
    const imageCache = await compressProjectImages(projects);
    const html = generatePrintHTML({ projects, isFr, imageCache });

    setIsPrinting(false);

    // Use a hidden, full-viewport iframe instead of window.open().
    // window.open is blocked by iOS Safari and most mobile browsers;
    // an iframe created from the current page is always allowed.
    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    // Full viewport but off-screen: content renders at correct width, user sees nothing
    iframe.style.cssText =
      'position:fixed;top:-9999px;left:-9999px;width:100%;height:100%;border:none;';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    // Give the browser a tick to process the written document, then print
    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch {
        window.print(); // last-resort fallback
      }

      // afterprint fires when the user dismisses the dialog
      const cleanup = () => iframe.remove();
      iframe.contentWindow.addEventListener('afterprint', cleanup, { once: true });
      setTimeout(cleanup, 120_000); // safety: remove after 2 min max
    }, 300);
  }, [projects, isFr]);

  return (
    <>
      {macgyverMode && (
        <div className="macgyver-banner">
          {isFr ? "⚙ MODE MACGYVER ACTIF — on improvise avec ce qu'on a ⚙" : "⚙ MACGYVER MODE ACTIVE — improvising with what we've got ⚙"}
        </div>
      )}

      {showKonami && (
        <div className="konami-overlay" onClick={() => setShowKonami(false)}>
          <div className="konami-terminal" onClick={e => e.stopPropagation()}>
            <div className="konami-header">{isFr ? "// ACCÈS CLASSIFIÉ //" : "// CLASSIFIED ACCESS //"}</div>
            <div className="konami-lines">
              <p className="konami-line kl-blink">
                <span className="kp">&gt;_</span> {isFr ? "ENTRÉE NON AUTORISÉE DÉTECTÉE" : "UNAUTHORIZED ENTRY DETECTED"}
              </p>
              <p className="konami-line">
                <span className="kp">&gt;_</span> {isFr ? "DÉCRYPTAGE DE LA VOUTE..." : "DECRYPTING VAULT..."}
              </p>
              <p className="konami-line">
                <span className="kp">&gt;_</span> ████████████░ 92%
              </p>
              <p className="konami-line kl-success">
                <span className="kp">&gt;_</span> {isFr ? "ACCÈS AUTORISÉ" : "ACCESS GRANTED"}
              </p>
              <p className="konami-line">
                <span className="kp">&gt;_</span> {isFr ? "BIENVENUE, MACGYVER." : "WELCOME, MACGYVER."}
              </p>
              <p className="konami-line kl-dim">
                <span className="kp">&gt;_</span> {isFr ? "\"Donnez-moi un trombone et 20 minutes.\"" : "\"Give me a paperclip and 20 minutes.\""}
              </p>
              <p className="konami-line kl-dim">
                <span className="kp">&gt;_</span> — M. MacGyver, probably
              </p>
            </div>
            <button className="mg-btn mg-btn--accent" style={{ marginTop: '1.5rem' }} onClick={() => setShowKonami(false)}>
              {isFr ? "FERMER LA CONNEXION" : "CLOSE CONNECTION"}
            </button>
          </div>
        </div>
      )}

      {/* ── Sticky mini-timeline ──────────────────────────────────── */}
      <div className={`sticky-timeline${stickyVisible ? ' sticky-timeline--visible' : ''} mobile-hide`}>
        <div className="sticky-timeline__track">
          <div className="sticky-timeline__rail-line" />
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className={`sticky-timeline__item${hoveredProject?.id === project.id ? ' sticky-timeline__item--active' : ''}`}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              title={project.title}
            >
              <div className="sticky-timeline__node" />
            </div>
          ))}
        </div>
        <div className="sticky-timeline__info">
          <strong>{hoveredProject ? getAge(hoveredProject.date, isFr) : getAge(null, isFr)}</strong>
          {' · '}
          {hoveredProject
            ? `${formatMonthYear(hoveredProject.date)} · ${isFr ? (hoveredProject.titleFr || hoveredProject.title) : hoveredProject.title}`
            : todayFormatted}
        </div>
      </div>

      <nav className="float-nav" aria-label="Quick navigation">
        <button className="float-nav-label" onClick={cycleNavQuip} title="click me">
          {NAV_QUIPS[navQuipIdx]}
        </button>
        <button className="float-nav-btn" onClick={() => scrollTo('anchor-top')}>TOP</button>
        <button className="float-nav-btn float-nav-btn--tml" onClick={() => scrollTo('section-timeline')}>TML</button>
        <button className="float-nav-btn" onClick={() => scrollTo('section-projects')}>PRJ</button>
        <button className="float-nav-btn" onClick={() => scrollTo('section-pdf')}>PDF</button>
      </nav>

      <main className="container" style={{ padding: 'clamp(1.5rem, 4vw, 3rem) 0 clamp(2rem, 5vw, 4rem)' }}>
        <div id="anchor-top" />

        <header className="header-centered">
          <div className="header-controls">
            <LangToggle />
            <ThemeToggle />
          </div>

          <div className="title-container">
            <span className="decal decal-1" aria-hidden="true">🌶️</span>
            <span className="decal decal-2" aria-hidden="true">🍔</span>
            <span className="decal decal-3" aria-hidden="true">⚙️</span>
            <span className="decal decal-4" aria-hidden="true">📎</span>

            <h1
              className={`title-righteous ${titleGlitch ? 'glitch-text' : ''}`}
              onClick={onTitleClick}
              title="try clicking me a lot"
            >
              Habanero Cheeseburger
            </h1>
          </div>
          <p className="hero-subtitle">
            {isFr ? "Une archive numérique des projets que j'ai bâtis." : "A digital archive of projects I've built."}
          </p>
        </header>

        <section id="section-timeline" style={{ marginBottom: '4rem' }} className="mobile-hide">
          <div className="section-header">
            <h2>{isFr ? 'Chronologie' : 'Timeline'}</h2>
            <span className="section-header__comment">{isFr ? '// LOG DE FABRICATION CHRONOLOGIQUE' : '// CHRONOLOGICAL BUILD LOG'}</span>
          </div>

          {/* Interactive timeline — visible on screen, hidden in print */}
          <div className="no-print mobile-hide">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span className="htimeline-display-date">
                <strong>{hoveredProject ? getAge(hoveredProject.date, isFr) : getAge(null, isFr)}</strong>
                {' · '}
                {hoveredProject ? formatMonthYear(hoveredProject.date) : todayFormatted}
              </span>
            </div>

            <div className="htimeline">
              <div className="htimeline__rail" />
              <div
                ref={timelineRef}
                className="htimeline__scroll hide-scrollbar"
                onMouseDown={onMouseDown}
              >
                {timelineGroups.map(group => (
                  <div
                    key={group.age}
                    className="htimeline__group"
                    style={{ flex: Math.max(group.projects.length, 3) }}
                  >
                    <div className="htimeline__group-header">
                      <span className="htimeline__group-age">{group.label}</span>
                      <span className="htimeline__group-desc">{group.description}</span>
                    </div>
                    <div className="htimeline__group-dots">
                      {group.projects.map(project => {
                        const idx = projectFlatIndex.get(project.id);
                        return (
                          <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="htimeline__item"
                            ref={el => { itemRefs.current[idx] = el; }}
                            onMouseEnter={() => setHoveredProject(project)}
                            onMouseLeave={() => setHoveredProject(null)}
                            onTouchStart={() => setHoveredProject(project)}
                          >
                            <div
                              className="htimeline__node"
                              ref={el => { nodeRefs.current[idx] = el; }}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
              <span
                ref={titleRef}
                className={`htimeline-display-title ${!hoveredProject ? 'htimeline-display-title--placeholder' : ''}`}
                style={{ display: 'inline-block', willChange: 'transform' }}
              >
                {hoveredProject ? hoveredProject.title : (isFr ? (isTouch ? "Touchez un point" : "Survolez un point pour voir") : (isTouch ? "Tap a dot to explore" : "Hover on a dot to see"))}
              </span>
            </div>
          </div>

          {/* Static timeline list — hidden on screen, visible in print */}
          <div className="print-only print-timeline">
            <div className="print-timeline__list">
              {sortedProjects.map(project => (
                <div key={project.id} className="print-timeline__item">
                  <span className="print-timeline__date">
                    {new Date(project.date + 'T12:00:00').toLocaleDateString(
                      isFr ? 'fr-CA' : 'en-US',
                      { month: 'short', year: 'numeric' }
                    )}
                  </span>
                  <span className="print-timeline__title">
                    {isFr ? (project.titleFr || project.title) : project.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="section-projects">
          {[
            {
              tier: 1,
              label:    isFr ? 'Systèmes Phares'              : 'Flagship Systems',
              comment:  isFr ? '// INGÉNIERIE NIVEAU PRODUCTION' : '// PRODUCTION-GRADE ENGINEERING',
            },
            {
              tier: 2,
              label:    isFr ? 'Prototypage Rapide & R&D'     : 'Rapid Prototyping & R&D',
              comment:  isFr ? '// PREUVES DE CONCEPT'         : '// PROOF-OF-CONCEPT BUILDS',
            },
            {
              tier: 3,
              label:    isFr ? 'Hacks de Week-end'            : 'Weekend Hacks',
              comment:  isFr ? '// LE CAHIER DE BROUILLON'     : '// THE SCRAPBOOK',
            },
          ].map(({ tier, label, comment }) => {
            const tierProjects = projects.filter(p => p.tier === tier);
            if (!tierProjects.length) return null;

            // Build card list for this tier.
            // Series: show once, in the displayTier; skip their individual cards entirely.
            // Singletons: show normally in date order.
            const seenSubcats = new Set();
            const cards = [];
            for (const p of tierProjects) {
              if (p.subcategory) {
                const s = seriesMap.get(p.subcategory);
                if (s.displayTier === tier && !seenSubcats.has(p.subcategory)) {
                  seenSubcats.add(p.subcategory);
                  const name = isFr ? (p.subcategoryFr || p.subcategory) : p.subcategory;
                  // latest = newest project across all tiers (allProjects is newest-first)
                  const latest = s.allProjects[0];
                  cards.push({ type: 'series', latest, allProjects: s.allProjects, name });
                }
                // else: skip — either wrong tier or already added
              } else {
                cards.push({ type: 'single', project: p });
              }
            }

            const gridStyle = {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
            };

            return (
              <div key={tier} className="print-tier-section" style={{ marginBottom: tier < 3 ? '4rem' : 0 }}>
                <div className="section-header">
                  <h2>{label}</h2>
                  <span className="section-header__comment">{comment}</span>
                </div>
                <div className="project-grid" style={gridStyle}>
                  {cards.map((card) => {
                    if (card.type === 'series') {
                      const { latest, allProjects, name } = card;
                      const thumb = latest.thumbnail || latest.media?.find(m => m.type === 'image')?.url;
                      const slug = subcategoryToSlug(latest.subcategory);
                      const oldest = allProjects[allProjects.length - 1];
                      return (
                        <Link
                          key={`series-${name}`}
                          href={`/series/${slug}`}
                          className="project-card series-card"
                          onMouseEnter={() => setHoveredProject(latest)}
                          onMouseLeave={() => setHoveredProject(null)}
                        >
                          <div className="project-card__thumb">
                            {thumb ? (
                              <>
                                <img src={thumb} alt={name} loading="lazy" />
                              </>
                            ) : (
                              <div className="project-card__thumb-placeholder">🔧</div>
                            )}
                            <div className="series-badge">
                              {isFr ? 'Série' : 'Series'} · {allProjects.length}
                            </div>
                          </div>
                          <div className="project-card__body">
                            <span className="project-card__category" style={{ color: 'var(--accent-orange)' }}>
                              {isFr ? (latest.categoryFr || latest.category) : latest.category}
                            </span>
                            <h3 className="project-card__title">{name}</h3>
                            <p className="project-card__desc" style={{ marginBottom: '0.75rem' }}>
                              {allProjects.length} {isFr ? 'itérations' : 'builds'} &mdash;{' '}
                              {isFr
                                ? `de ${oldest.date} à ${latest.date}`
                                : `${oldest.date} → ${latest.date}`}
                            </p>
                            <div className="project-card__action">
                              <span className="mg-btn mg-btn--accent mg-btn--wide" style={{ borderColor: 'var(--accent-orange)', color: 'var(--accent-orange)' }}>
                                {isFr ? `Explorer les ${allProjects.length} versions →` : `Explore all ${allProjects.length} builds →`}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    }

                    const { project } = card;
                    return (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="project-card"
                        onMouseEnter={() => setHoveredProject(project)}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        {project.thumbnail ? (
                          <div className="project-card__thumb">
                            <img src={project.thumbnail} alt={project.title} loading="lazy" />
                          </div>
                        ) : project.media?.find(m => m.type === 'image') ? (
                          <div className="project-card__thumb">
                            <img src={project.media.find(m => m.type === 'image').url} alt={project.title} loading="lazy" />
                          </div>
                        ) : (
                          <div className="project-card__thumb-placeholder">🔧</div>
                        )}
                        <div className="project-card__body">
                          <span className="project-card__category">{isFr ? (project.categoryFr || project.category) : project.category}</span>
                          <h3 className="project-card__title">{isFr ? (project.titleFr || project.title) : project.title}</h3>
                          <div style={{ marginBottom: '0.75rem' }}>
                            <span className="project-card__date" style={{ marginBottom: 0 }}>{project.date}</span>
                          </div>
                          <p className="project-card__desc">{isFr ? (project.descriptionFr || project.description) : project.description}</p>
                          <div className="project-card__action">
                            <span className="mg-btn mg-btn--accent mg-btn--wide">
                              {isFr ? 'Explorer le Projet →' : 'Explore Project →'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── PDF / Print export button ── */}
        <div id="section-pdf" className="no-print pdf-export-bar">
          <button
            className="mg-btn mg-btn--accent pdf-export-btn"
            onClick={handlePrint}
            disabled={isPrinting}
            aria-label={isFr ? 'Télécharger en PDF' : 'Download as PDF'}
          >
            <Printer size={18} />
            {isPrinting
              ? (isFr ? 'Chargement des images…' : 'Loading images…')
              : (isFr ? 'Télécharger en PDF' : 'Download as PDF')}
          </button>
          <p className="pdf-export-hint">
            {isFr
              ? "Dans la boîte d'impression, sélectionne « Enregistrer en PDF »"
              : 'In the print dialog, choose "Save as PDF"'}
          </p>
        </div>

        {/* ── Print-only footer ── */}
        <div className="print-only print-footer-bar">
          <span>Habanero Cheeseburger — {isFr ? 'Archive de Projets' : 'Project Archive'}</span>
          <span>
            {projects.length}{isFr ? ' projets' : ' projects'} · {new Date().toLocaleDateString(
              isFr ? 'fr-CA' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </span>
        </div>
      </main>
    </>
  );
}
