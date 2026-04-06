import { getProjectData, getSortedProjectsData } from '@/lib/projects';
import ReactMarkdown from 'react-markdown';
import STLViewer from '@/components/STLViewer';
import MediaCarousel from '@/components/MediaCarousel';
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

  return (
    <main className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '2rem', fontWeight: 'bold' }}>
        <ArrowLeft size={16} /> Back to Hub
      </Link>
      
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--accent-orange)' }}>{projectData.title}</h1>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
          <span className="glass-panel" style={{ padding: '4px 12px', fontSize: '0.85rem', fontWeight: 'bold', borderRadius: '4px' }}>
            {projectData.category}
          </span>
          <span style={{ alignSelf: 'center' }}>{projectData.date}</span>
        </div>
      </header>

      {projectData.media && (
        <MediaCarousel media={projectData.media} />
      )}

      {projectData.stlFile && (
        <STLViewer url={projectData.stlFile} />
      )}

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {projectData.githubLink && (
          <a href={projectData.githubLink} target="_blank" rel="noreferrer" className="tech-button">
            <Code size={18} /> View on GitHub
          </a>
        )}

        {projectData.assets && projectData.assets.map((asset, index) => (
          <a key={index} href={asset.url} download target="_blank" rel="noreferrer" className="tech-button">
            <Download size={18} /> {asset.name}
          </a>
        ))}
      </div>

      <div className="markdown-content" style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
        <ReactMarkdown>{projectData.content}</ReactMarkdown>
      </div>
    </main>
  );
}
