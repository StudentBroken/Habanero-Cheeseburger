"use client";
import React, { createContext, useContext, useLayoutEffect, useState } from 'react';
import FlagTransition from './FlagTransition';

const LangContext = createContext({
  lang: 'en',
  toggleLang: () => {},
});

export const useLang = () => useContext(LangContext);

export default function LangProvider({ children }) {
  const [lang, setLang] = useState('en');

  useLayoutEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'fr') {
      setLang(stored);
      document.documentElement.setAttribute('lang', stored);
    } else {
      const browserLang = (navigator.language || '').toLowerCase();
      const detected = browserLang.startsWith('fr') ? 'fr' : 'en';
      setLang(detected);
      document.documentElement.setAttribute('lang', detected);
    }

    const observer = new MutationObserver(() => {
      setLang(document.documentElement.getAttribute('lang') || 'en');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    document.documentElement.setAttribute('lang', next);
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
      <FlagTransition />
    </LangContext.Provider>
  );
}
