import React from 'react';
import Link from 'next/link';
import { getSortedProjectsData, getProjectData } from '@/lib/projects';
import { BIRTH_DATE } from '@/lib/age';
import GlobalCopyButton from '@/components/GlobalCopyButton';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Global Export | Habanero Cheeseburger',
  description: 'Full portfolio data in plain text format for LLM ingestion.',
};

function getAgeAtDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  let age = d.getFullYear() - BIRTH_DATE.getFullYear();
  const m = d.getMonth() - BIRTH_DATE.getMonth();
  if (m < 0 || (m === 0 && d.getDate() < BIRTH_DATE.getDate())) age--;
  return age;
}

export default function GlobalPage() {
  const projects = getSortedProjectsData();
  const fullProjects = projects.map(p => getProjectData(p.id));

  // Determine current age to identify "Ongoing" projects
  const ages = fullProjects.map(p => getAgeAtDate(p.date));
  const maxAge = Math.max(...ages);

  // Grouping
  const ongoing = [];
  const tier1 = [];
  const tier2 = [];
  const tier3 = [];

  fullProjects.forEach(p => {
    const age = getAgeAtDate(p.date);
    if (age === maxAge) {
      ongoing.push(p);
    } else if (p.tier === 1) {
      tier1.push(p);
    } else if (p.tier === 2) {
      tier2.push(p);
    } else if (p.tier === 3) {
      tier3.push(p);
    }
  });

  // Sort within groups by date desc
  const sortByDate = (a, b) => new Date(b.date) - new Date(a.date);
  ongoing.sort(sortByDate);
  tier1.sort(sortByDate);
  tier2.sort(sortByDate);
  tier3.sort(sortByDate);

  // Formatting the big text
  let globalText = `# HABANERO CHEESEBURGER PORTFOLIO\n`;
  globalText += `Generated: ${new Date().toISOString()}\n`;
  globalText += `Total Projects: ${fullProjects.length}\n\n`;

  const formatProject = (p) => {
    const age = getAgeAtDate(p.date);
    let block = `### ${p.title}\n`;
    block += `Date: ${p.date} (Age: ${age})\n`;
    block += `Tier: ${p.tier}\n`;
    block += `Category: ${p.category}${p.subcategory ? ` | Series: ${p.subcategory}` : ''}\n`;
    block += `Description: ${p.description}\n`;
    if (p.githubLink) block += `GitHub: ${p.githubLink}\n`;
    if (p.links && p.links.length > 0) {
      block += `External Links: ${p.links.map(l => `${l.label} (${l.url})`).join(', ')}\n`;
    }
    block += `\n[CONTENT]\n${p.content || 'N/A'}\n`;
    block += `\n---\n\n`;
    return block;
  };

  if (ongoing.length > 0) {
    globalText += `## ONGOING & ACTIVE BUILDS\n`;
    globalText += `Current engineering focus and active development.\n\n`;
    ongoing.forEach(p => { globalText += formatProject(p); });
  }

  globalText += `## TIER 1: THE SPOTLIGHT\n`;
  globalText += `Production-grade engineering and flagship systems.\n\n`;
  tier1.forEach(p => { globalText += formatProject(p); });

  globalText += `## TIER 2: SIMPLE PROJECTS\n`;
  globalText += `Rapid prototyping, R&D, and proof-of-concept builds.\n\n`;
  tier2.forEach(p => { globalText += formatProject(p); });

  globalText += `## TIER 3: WEEKEND HACKS\n`;
  globalText += `Single-digit hour hacks, small experiments, and scrapbook projects.\n\n`;
  tier3.forEach(p => { globalText += formatProject(p); });

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/" className="mg-btn mg-btn--sm">
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Global Project Export (LLM Friendly)</h1>
      </header>

      <section className="glass-panel" style={{ padding: '1.5rem', overflow: 'hidden' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Formatted specifically for LLMs. Hierarchical grouping by tiers with ongoing projects prioritized at the top.
        </p>
        
        <div 
          className="hide-scrollbar"
          style={{ 
            background: 'var(--bg-secondary)', 
            padding: '1.5rem', 
            borderRadius: '8px',
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.82rem',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            maxHeight: '75vh',
            overflowY: 'auto',
            border: '1px solid var(--panel-border)',
            color: 'var(--text-primary)'
          }}
        >
          {globalText}
        </div>
      </section>

      <GlobalCopyButton text={globalText} />
    </main>
  );
}
