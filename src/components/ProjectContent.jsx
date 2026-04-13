"use client";
import React from 'react';
import Link from 'next/link';
import { useLang } from './LangProvider';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { getAge } from '@/lib/age';
import MarkdownSections from './MarkdownSections';
import STLViewer from './STLViewer';
import MediaCarousel from './MediaCarousel';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';
import ProjectTitle from './ProjectTitle';

export default function ProjectContent({ projectData }) {
  const { lang } = useLang();
  const isFr = lang === 'fr';

  const modelFilePath = projectData.modelFile || projectData.stlFile;
  const hasBottomSection = modelFilePath || projectData.githubLink || (projectData.assets && projectData.assets.length > 0) || (projectData.links && projectData.links.length > 0);

  return (
    <main>
      <div className="container" style={{ padding: 'clamp(1.5rem, 4vw, 3rem) 0 0', maxWidth: '800px' }}>
        <div className="project-top-bar">
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}
          >
            <ArrowLeft size={16} /> {isFr ? "Retour à l'accueil" : "Back to Hub"}
          </Link>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>

        <header style={{ marginBottom: '2rem' }}>
          <ProjectTitle title={isFr ? (projectData.titleFr || projectData.title) : projectData.title} />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', color: 'var(--text-secondary)', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="glass-panel" style={{ padding: '3px 12px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', borderRadius: '4px' }}>
              {isFr ? (projectData.categoryFr || projectData.category) : projectData.category}
            </span>
            {projectData.subcategory && (
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-orange)', textTransform: 'uppercase' }}>
                {isFr ? (projectData.subcategoryFr || projectData.subcategory) : projectData.subcategory}
              </span>
            )}
            <span style={{ fontSize: '0.9rem' }}>{projectData.date}</span>
          </div>
        </header>
      </div>

      {projectData.media && projectData.media.length > 0 && (
        <MediaCarousel media={projectData.media} />
      )}

      <div className="container" style={{ padding: '0 0 4rem', maxWidth: '800px' }}>
        <MarkdownSections content={projectData.content} contentFr={projectData.contentFr} />

        {hasBottomSection && (
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--accent-border)' }}>
            {modelFilePath && (
              <>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  {isFr ? "Modèle 3D" : "3D Model"}
                </h2>
                <STLViewer url={modelFilePath} />
              </>
            )}

            {(projectData.githubLink || (projectData.links && projectData.links.length > 0) || (projectData.assets && projectData.assets.length > 0)) && (
              <>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  {isFr ? "Fichiers & Liens" : "Files & Links"}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {projectData.githubLink && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <a href={projectData.githubLink} target="_blank" rel="noreferrer" className="tech-button" style={{ alignSelf: 'flex-start' }}>
                        <ExternalLink size={17} /> {isFr ? "Voir sur GitHub" : "View on GitHub"}
                      </a>
                    </div>
                  )}
                  {projectData.links && projectData.links.map((link, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <a href={link.url} target="_blank" rel="noreferrer" className="tech-button" style={{ alignSelf: 'flex-start' }}>
                        <ExternalLink size={17} /> {isFr ? (link.labelFr || link.label) : link.label || (link.type === 'github' ? (isFr ? 'Voir sur GitHub' : 'View on GitHub') : (isFr ? 'Ouvrir le lien' : 'Open Link'))}
                      </a>
                    </div>
                  ))}
                  {projectData.assets && projectData.assets.map((asset, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <a href={asset.url} download target="_blank" rel="noreferrer" className="tech-button" style={{ alignSelf: 'flex-start' }}>
                        <Download size={17} /> {isFr ? (asset.nameFr || asset.name) : asset.name}
                      </a>
                      {(isFr ? (asset.descriptionFr || asset.description) : asset.description) && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                          {isFr ? (asset.descriptionFr || asset.description) : asset.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <p style={{
          marginTop: '3rem',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          color: 'var(--text-secondary)',
          opacity: 0.55,
          textAlign: 'right',
        }}>
          {isFr
            ? `Construit à ${getAge(projectData.date, isFr)}`
            : `Built at ${getAge(projectData.date, isFr)}`}
        </p>
      </div>
    </main>
  );
}
