"use client";
import React from 'react';
import { useLang } from './LangProvider';

export default function LangToggle() {
  const { lang, toggleLang } = useLang();
  const isFr = lang === 'fr';

  return (
    <div className="theme-switch">
      <span className="theme-switch__label">{isFr ? 'FR' : 'EN'}</span>
      <button
        onClick={toggleLang}
        className={`theme-switch__track ${isFr ? 'theme-switch__track--active' : ''}`}
        aria-label="Toggle language"
      >
        <div className={`theme-switch__knob ${isFr ? 'theme-switch__knob--right' : ''}`} style={{ fontSize: '13px', lineHeight: 1 }}>
          <span style={{ transform: isFr ? 'translateY(1px)' : 'none', display: 'inline-block' }}>{isFr ? '⚜️' : '🇨🇦'}</span>
        </div>
      </button>
    </div>
  );
}
