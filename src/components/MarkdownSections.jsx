"use client";
import ReactMarkdown from 'react-markdown';
import { useLang } from './LangProvider';

export default function MarkdownSections({ content, contentFr }) {
  const { lang } = useLang();
  
  // Choose the right content based on language and availability
  const activeContent = (lang === 'fr' && contentFr) ? contentFr : content;

  // Split on ## headings (lookahead keeps the ## at the start of each chunk)
  const parts = activeContent.split(/(?=^## )/m).filter(s => s.trim());

  const processed = parts.map((part, i) => {
    if (i === 0) {
      // Strip the # Title line — it's already shown in the page header
      return part.replace(/^#\s+.+\n?/, '').trim();
    }
    return part.trim();
  }).filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {processed.map((section, i) => (
        <div
          key={i}
          className="glass-panel markdown-content markdown-section"
          style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem) clamp(1.25rem, 3vw, 2rem)' }}
        >
          <ReactMarkdown>{section}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
