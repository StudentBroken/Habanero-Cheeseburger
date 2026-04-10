"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Printer } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';
import { useLang } from './LangProvider';
import { getAge } from '@/lib/age';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const NAV_QUIPS = [
  'NAV',
  '// NOT A NAV',
  '// A PAPERCLIP',
  '// IMPROVISING',
  'NAV',
];

export default function HomeContent({ projects }) {
  const { lang } = useLang();
  const isFr = lang === 'fr';

  const [showKonami, setShowKonami] = useState(false);
  const [macgyverMode, setMacgyverMode] = useState(false);
  const [titleGlitch, setTitleGlitch] = useState(false);
  const [navQuipIdx, setNavQuipIdx] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const konamiIdx = useRef(0);
  const typedBuf = useRef('');
  const titleClicks = useRef(0);
  const timelineRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scroll: 0 });
  const nodeRefs  = useRef([]);
  const wgtCur    = useRef([]);
  const wgtTgt    = useRef([]);
  const rafRef    = useRef(null);
  const tlMouseX  = useRef(-9999);
  const tlHover   = useRef(false);
  const titleRef  = useRef(null);

  const sortedProjects = [...projects].sort((a, b) => new Date(a.date) - new Date(b.date));

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
        if (node2) {
          const t = wgtCur.current[i];
          node2.style.transform = `scale(${1 + (DOCK_SCALE - 1) * t})`;
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
      <div className={`sticky-timeline${stickyVisible ? ' sticky-timeline--visible' : ''}`}>
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
        <button className="float-nav-btn" onClick={() => scrollTo('section-timeline')}>TML</button>
        <button className="float-nav-btn" onClick={() => scrollTo('section-projects')}>PRJ</button>
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
          <p style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.78rem',
            letterSpacing: '0.1em',
            color: 'var(--accent-cyan)',
            opacity: 0.65,
            marginTop: '0.5rem',
            textShadow: 'var(--text-shadow-raised)',
          }}>
            {getAge(null, isFr)}
          </p>
        </header>

        <section id="section-timeline" style={{ marginBottom: '4rem' }}>
          <div className="section-header">
            <h2>{isFr ? 'Chronologie' : 'Timeline'}</h2>
            <span className="section-header__comment">{isFr ? '// LOG DE FABRICATION CHRONOLOGIQUE' : '// CHRONOLOGICAL BUILD LOG'}</span>
          </div>

          {/* Interactive timeline — visible on screen, hidden in print */}
          <div className="no-print">
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
                {sortedProjects.map((project, i) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="htimeline__item"
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onTouchStart={() => setHoveredProject(project)}
                  >
                    <div
                      className="htimeline__node"
                      ref={el => { nodeRefs.current[i] = el; }}
                    />
                  </Link>
                ))}
                <div style={{ minWidth: '4rem', flexShrink: 0 }} />
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
            return (
              <div key={tier} className="print-tier-section" style={{ marginBottom: tier < 3 ? '4rem' : 0 }}>
                <div className="section-header">
                  <h2>{label}</h2>
                  <span className="section-header__comment">{comment}</span>
                </div>
                <div className="project-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                  gap: 'clamp(1rem, 3vw, 2rem)',
                }}>
                  {tierProjects.map(project => (
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
                          <div className="project-card__thumb-overlay" />
                        </div>
                      ) : project.media?.find(m => m.type === 'image') ? (
                        <div className="project-card__thumb">
                          <img src={project.media.find(m => m.type === 'image').url} alt={project.title} loading="lazy" />
                          <div className="project-card__thumb-overlay" />
                        </div>
                      ) : (
                        <div className="project-card__thumb-placeholder">🔧</div>
                      )}

                      <div className="project-card__body">
                        <span className="project-card__category">{isFr ? (project.categoryFr || project.category) : project.category}</span>
                        <h3 className="project-card__title">{isFr ? (project.titleFr || project.title) : project.title}</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                          <span className="project-card__date" style={{ marginBottom: 0 }}>{project.date}</span>
                          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: 'var(--accent-orange)', letterSpacing: '0.04em', opacity: 0.9 }}>
                            {getAge(project.date, isFr)}
                          </span>
                        </div>
                        <p className="project-card__desc">{isFr ? (project.descriptionFr || project.description) : project.description}</p>
                        <div className="project-card__action">
                          <span className="mg-btn mg-btn--accent mg-btn--wide">
                            {isFr ? 'Explorer le Projet →' : 'Explore Project →'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── PDF / Print export button ── */}
        <div className="no-print pdf-export-bar">
          <button
            className="mg-btn mg-btn--accent pdf-export-btn"
            onClick={() => window.print()}
            aria-label={isFr ? 'Télécharger en PDF' : 'Download as PDF'}
          >
            <Printer size={18} />
            {isFr ? 'Télécharger en PDF' : 'Download as PDF'}
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
