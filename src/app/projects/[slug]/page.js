import { getProjectData, getSortedProjectsData } from '@/lib/projects';
import ReactMarkdown from 'react-markdown';
import STLViewer from '@/components/STLViewer';
import MediaCarousel from '@/components/MediaCarousel';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { ArrowLeft, Code, Download } from 'lucide-react';

export async function generateStaticParams() {
  const projects = getSortedProjectsData();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const projectData = getProjectData(slug);

  const hasBottomSection = projectData.stlFile || projectData.githubLink || (projectData.assets && projectData.assets.length > 0);

  return (
    <main>
      <div className="container" style={{ padding: '3rem 2rem 0', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Link
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}
          >
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          <ThemeToggle />
        </div>

        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--accent-orange)', fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
            {projectData.title}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', color: 'var(--text-secondary)', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="glass-panel" style={{ padding: '3px 12px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', borderRadius: '4px' }}>
              {projectData.category}
            </span>
            <span style={{ fontSize: '0.9rem' }}>{projectData.date}</span>
          </div>
        </header>
      </div>

      {projectData.media && projectData.media.length > 0 && (
        <MediaCarousel media={projectData.media} />
      )}

      <div className="container" style={{ padding: '0 2rem 4rem', maxWidth: '800px' }}>
        <div className="markdown-content" style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: '1.85' }}>
          <ReactMarkdown>{projectData.content}</ReactMarkdown>
        </div>

        {hasBottomSection && (
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--accent-border)' }}>
            {projectData.stlFile && (
              <>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>3D Model</h2>
                <STLViewer url={projectData.stlFile} />
              </>
            )}

            {(projectData.githubLink || (projectData.assets && projectData.assets.length > 0)) && (
              <>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Files & Links</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {projectData.githubLink && (
                    <a href={projectData.githubLink} target="_blank" rel="noreferrer" className="tech-button">
                      <Code size={17} /> View on GitHub
                    </a>
                  )}
                  {projectData.assets && projectData.assets.map((asset, index) => (
                    <a key={index} href={asset.url} download target="_blank" rel="noreferrer" className="tech-button">
                      <Download size={17} /> {asset.name}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
