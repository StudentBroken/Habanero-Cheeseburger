"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const BIRTH_YEAR = 2009; // born 03/03/2003

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
  const [showKonami, setShowKonami] = useState(false);
  const [macgyverMode, setMacgyverMode] = useState(false);
  const [titleGlitch, setTitleGlitch] = useState(false);
  const [navQuipIdx, setNavQuipIdx] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  const konamiIdx = useRef(0);
  const typedBuf = useRef('');
  const titleClicks = useRef(0);
  const timelineRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scroll: 0 });

  // Sort projects chronologically (oldest to newest)
  const sortedProjects = [...projects].sort((a, b) => new Date(a.date) - new Date(b.date));

  const formatMonthYear = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // ── Global key listeners (easter eggs) ──────────────────────────
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

  // ── Timeline drag-to-scroll ─────────────────────────────────────
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

  // Initial scroll to the end of the timeline
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const scrollToEnd = () => el.scrollLeft = el.scrollWidth;
    scrollToEnd();
    // Re-check after a frame to ensure layout is complete
    requestAnimationFrame(scrollToEnd);
    setTimeout(scrollToEnd, 100);
  }, []);

  // ── Easter egg: click title 7× ──────────────────────────────────
  const onTitleClick = () => {
    titleClicks.current++;
    if (titleClicks.current >= 7) {
      titleClicks.current = 0;
      setTitleGlitch(true);
      setTimeout(() => setTitleGlitch(false), 2200);
    }
  };

  // ── Smooth scroll helper ────────────────────────────────────────
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // ── Nav quip ────────────────────────────────────────────────────
  const cycleNavQuip = () =>
    setNavQuipIdx(i => (i + 1) % NAV_QUIPS.length);

  return (
    <>
      {/* ── MacGyver mode banner ──────────────────────────────────── */}
      {macgyverMode && (
        <div className="macgyver-banner">
          ⚙ MACGYVER MODE ACTIVE — improvising with what we&apos;ve got ⚙
        </div>
      )}

      {/* ── Konami modal ──────────────────────────────────────────── */}
      {showKonami && (
        <div className="konami-overlay" onClick={() => setShowKonami(false)}>
          <div className="konami-terminal" onClick={e => e.stopPropagation()}>
            <div className="konami-header">// CLASSIFIED ACCESS //</div>
            <div className="konami-lines">
              <p className="konami-line kl-blink">
                <span className="kp">&gt;_</span> UNAUTHORIZED ENTRY DETECTED
              </p>
              <p className="konami-line">
                <span className="kp">&gt;_</span> DECRYPTING VAULT...
              </p>
              <p className="konami-line">
                <span className="kp">&gt;_</span> ████████████░ 92%
              </p>
              <p className="konami-line kl-success">
                <span className="kp">&gt;_</span> ACCESS GRANTED
              </p>
              <p className="konami-line">
                <span className="kp">&gt;_</span> WELCOME, MACGYVER.
              </p>
              <p className="konami-line kl-dim">
                <span className="kp">&gt;_</span> &quot;Give me a paperclip and 20 minutes.&quot;
              </p>
              <p className="konami-line kl-dim">
                <span className="kp">&gt;_</span> — M. MacGyver, probably
              </p>
            </div>
            <button className="mg-btn mg-btn--accent" style={{ marginTop: '1.5rem' }} onClick={() => setShowKonami(false)}>
              CLOSE CONNECTION
            </button>
          </div>
        </div>
      )}

      {/* ── Floating navigation sidebar ────────────────────────────── */}
      <nav className="float-nav" aria-label="Quick navigation">
        <button className="float-nav-label" onClick={cycleNavQuip} title="click me">
          {NAV_QUIPS[navQuipIdx]}
        </button>
        <button className="float-nav-btn" onClick={() => scrollTo('anchor-top')}>TOP</button>
        <button className="float-nav-btn" onClick={() => scrollTo('section-timeline')}>TML</button>
        <button className="float-nav-btn" onClick={() => scrollTo('section-projects')}>PRJ</button>
      </nav>

      {/* ── Main content ──────────────────────────────────────────── */}
      <main className="container" style={{ padding: '3rem 2rem 4rem' }}>
        <div id="anchor-top" />

        {/* ── Header ──────────────────────────────────────────────── */}
        <header style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '2.5rem',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <h1
              className={titleGlitch ? 'glitch-text' : ''}
              style={{ color: 'var(--accent-orange)', cursor: 'pointer', userSelect: 'none' }}
              onClick={onTitleClick}
              title="try clicking me a lot"
            >
              Habanero Cheeseburger
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginTop: '0.4rem' }}>
              A digital archive of projects I&apos;ve built.
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* ── Horizontal Timeline ─────────────────────────────────── */}
        <section id="section-timeline" style={{ marginBottom: '4rem' }}>
          <div className="section-header">
            <h2>Timeline</h2>
            <span className="section-header__comment">// CHRONOLOGICAL BUILD LOG</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span className="htimeline-display-date">
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
              {sortedProjects.map(project => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="htimeline__item"
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="htimeline__node" />
                </Link>
              ))}
              {/* Spacer so the last item doesn't get cut off */}
              <div style={{ minWidth: '4rem', flexShrink: 0 }} />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <span className={`htimeline-display-title ${!hoveredProject ? 'htimeline-display-title--placeholder' : ''}`}>
              {hoveredProject ? hoveredProject.title : "Hover on a dot to see"}
            </span>
          </div>
        </section>

        {/* ── Projects Grid ───────────────────────────────────────── */}
        <section id="section-projects">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <span className="section-header__comment">// WHAT I&apos;VE BEEN BUILDING</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
          }}>
            {projects.map(project => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="project-card"
              >
                {/* Thumbnail */}
                {project.thumbnail ? (
                  <div className="project-card__thumb">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="project-card__thumb-overlay" />
                  </div>
                ) : project.media && project.media.length > 0 && project.media.find(m => m.type === 'image') ? (
                  <div className="project-card__thumb">
                    <img
                      src={project.media.find(m => m.type === 'image').url}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="project-card__thumb-overlay" />
                  </div>
                ) : (
                  <div className="project-card__thumb-placeholder">🔧</div>
                )}

                {/* Body */}
                <div className="project-card__body">
                  <span className="project-card__category">{project.category}</span>
                  <h3 className="project-card__title">{project.title}</h3>
                  <span className="project-card__date">{project.date}</span>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__action">
                    <span className="mg-btn mg-btn--accent mg-btn--wide">
                      Explore Project →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
