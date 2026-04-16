"use client";
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function GlobalCopyButton({ text, label = "Copy all to clipboard", className = "mg-btn--accent" }) {
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
      className={`mg-btn ${className}`}
      onClick={handleCopy}
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {copied ? 'Copied!' : label}
    </button>
  );
}
