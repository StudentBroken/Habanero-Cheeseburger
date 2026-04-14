"use client";
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function GlobalCopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      className="mg-btn mg-btn--accent"
      onClick={handleCopy}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100,
        boxShadow: 'var(--shadow-floating)',
      }}
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {copied ? 'Copied!' : 'Copy all to clipboard'}
    </button>
  );
}
