import ThemeToggle from "@/components/ThemeToggle";
import Link from 'next/link';
import { getSortedProjectsData } from '@/lib/projects';

export default async function Home() {
  const projects = getSortedProjectsData();

  return (
    <main className="container" style={{ padding: '4rem 2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'var(--accent-orange)' }}>Habanero Cheeseburger</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '0.5rem' }}>
            A digital archive of projects I&apos;ve built.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <section>
        <h2 style={{ marginBottom: '2rem' }}>Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map(project => (
            <div key={project.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                 <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{project.category}</span>
                 <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{project.date}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1 }}>
                {project.description}
              </p>
              <div style={{ marginTop: 'auto' }}>
                 <Link href={`/projects/${project.id}`} className="tech-button" style={{ width: '100%' }}>
                   Explore Project
                 </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
