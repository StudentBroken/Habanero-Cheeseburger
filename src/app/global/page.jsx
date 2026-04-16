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

  let globalHeader = `# HABANERO CHEESEBURGER PORTFOLIO\n`;
  globalHeader += `Generated: ${new Date().toISOString()}\n`;
  globalHeader += `Total Projects: ${fullProjects.length}\n\n`;

  let ongoingText = "";
  if (ongoing.length > 0) {
    ongoingText += `## ONGOING & ACTIVE BUILDS\n`;
    ongoingText += `Current engineering focus and active development.\n\n`;
    ongoing.forEach(p => { ongoingText += formatProject(p); });
  }

  let tier1Text = `## TIER 1: THE SPOTLIGHT\n`;
  tier1Text += `Production-grade engineering and flagship systems.\n\n`;
  tier1.forEach(p => { tier1Text += formatProject(p); });

  let tier2Text = `## TIER 2: SIMPLE PROJECTS\n`;
  tier2Text += `Rapid prototyping, R&D, and proof-of-concept builds.\n\n`;
  tier2.forEach(p => { tier2Text += formatProject(p); });

  let tier3Text = `## TIER 3: WEEKEND HACKS\n`;
  tier3Text += `Single-digit hour hacks, small experiments, and scrapbook projects.\n\n`;
  tier3.forEach(p => { tier3Text += formatProject(p); });

  const globalText = globalHeader + ongoingText + tier1Text + tier2Text + tier3Text;

  // Tier copy texts include ongoing projects of the same tier
  const buildTierCopyText = (tierNum, heading, subtitle) => {
    const all = fullProjects.filter(p => p.tier === tierNum).sort(sortByDate);
    let text = `## ${heading}\n${subtitle}\n\n`;
    all.forEach(p => { text += formatProject(p); });
    return globalHeader + text;
  };
  const copyTier1 = buildTierCopyText(1, 'TIER 1: THE SPOTLIGHT', 'Production-grade engineering and flagship systems.');
  const copyTier2 = buildTierCopyText(2, 'TIER 2: SIMPLE PROJECTS', 'Rapid prototyping, R&D, and proof-of-concept builds.');
  const copyTier3 = buildTierCopyText(3, 'TIER 3: WEEKEND HACKS', 'Single-digit hour hacks, small experiments, and scrapbook projects.');

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

      <div 
        style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          right: '2rem', 
          zIndex: 100, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.75rem', 
          alignItems: 'flex-end',
          boxShadow: 'var(--shadow-floating)',
          borderRadius: '8px'
        }}
      >
        <GlobalCopyButton text={copyTier1} label="Copy only Tier 1" className="" />
        <GlobalCopyButton text={copyTier2} label="Copy only Tier 2" className="" />
        <GlobalCopyButton text={copyTier3} label="Copy only Tier 3" className="" />
        <GlobalCopyButton text={globalText} label="Copy all to clipboard" className="mg-btn--accent" />
      </div>
    </main>
  );
}
