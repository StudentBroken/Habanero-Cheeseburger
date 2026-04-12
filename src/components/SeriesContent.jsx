"use client";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLang } from './LangProvider';
import { getAge } from '@/lib/age';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';

export default function SeriesContent({ seriesData }) {
  const { lang } = useLang();
  const isFr = lang === 'fr';

  const { name, nameFr, projects } = seriesData;
  const displayName = isFr ? (nameFr || name) : name;

  return (
    <main>
      <div className="container" style={{ padding: 'clamp(1.5rem, 4vw, 3rem) 0 4rem', maxWidth: '1100px' }}>

        {/* Top bar */}
        <div className="project-top-bar">
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}
          >
            <ArrowLeft size={16} /> {isFr ? "Retour à l'accueil" : 'Back to Hub'}
          </Link>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <header style={{ margin: '2.5rem 0 2.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--accent-orange)',
            textTransform: 'uppercase',
            marginBottom: '0.6rem',
          }}>
            // {isFr ? 'Série' : 'Series'}
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            textShadow: 'var(--text-shadow-heading)',
            marginBottom: '0.75rem',
          }}>
            {displayName}
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
          }}>
            {projects.length} {isFr ? 'itérations' : 'builds'} &middot; {isFr ? 'du plus récent au plus ancien' : 'newest to oldest'}
          </p>
        </header>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1rem, 3vw, 2rem)',
        }}>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="project-card"
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
                <span className="project-card__category">
                  {isFr ? (project.categoryFr || project.category) : project.category}
                </span>
                <h3 className="project-card__title">
                  {isFr ? (project.titleFr || project.title) : project.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <span className="project-card__date" style={{ marginBottom: 0 }}>{project.date}</span>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: 'var(--accent-orange)', letterSpacing: '0.04em', opacity: 0.9 }}>
                    {getAge(project.date, isFr)}
                  </span>
                </div>
                <p className="project-card__desc">
                  {isFr ? (project.descriptionFr || project.description) : project.description}
                </p>
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
    </main>
  );
}
