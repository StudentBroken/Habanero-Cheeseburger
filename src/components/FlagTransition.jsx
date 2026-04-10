"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useLang } from './LangProvider';

export default function FlagTransition() {
  const { lang } = useLang();
  const [flags, setFlags] = useState([]);
  const prevLang = useRef(lang);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevLang.current = lang;
      return;
    }

    if (lang !== prevLang.current) {
      const targetFlag = lang === 'fr' ? '/flags/quebec.png' : '/flags/canada.png';
      
      const newFlags = [];
      const FLAG_COUNT = 65;
      
      for (let i = 0; i < FLAG_COUNT; i++) {
        newFlags.push({
          id: `${lang}-${i}`,
          src: targetFlag,
          left: Math.random() * 100,
          depth: Math.random(), // 0 to 1 for parallax simulation
          delay: Math.random() * 0.4, 
          duration: 1.2 + Math.random() * 0.9, 
          rotationStart: (Math.random() - 0.5) * 60, 
          rotationEnd: (Math.random() - 0.5) * 360 
        });
      }
      
      setFlags(newFlags);
      prevLang.current = lang;

      // Unmount after 2.6s (buffer for the last flag drop)
      const timer = setTimeout(() => {
        setFlags([]);
      }, 2600);

      return () => clearTimeout(timer);
    }
  }, [lang]);

  if (flags.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: 99999,
      overflow: 'hidden'
    }}>
      {flags.map(f => {
        // Pseudo-3D sizing via depth
        const size = 30 + f.depth * 80; // 30px to 110px
        const opacity = 0.6 + (f.depth * 0.4); // items further back are slightly translucent 
        const blur = f.depth < 0.4 ? 'blur(2px)' : 'none'; // blur smaller items

        return (
          <img
            key={f.id}
            src={f.src}
            className="flag-falling"
            style={{
              position: 'absolute',
              left: `${f.left}vw`,
              width: `${size}px`,
              height: 'auto',
              top: '-150px',
              animation: `flag-fall ${f.duration}s cubic-bezier(0.35, 0.1, 0.25, 1) ${f.delay}s forwards`,
              '--rot-start': `${f.rotationStart}deg`,
              '--rot-end': `${f.rotationEnd}deg`,
              opacity: opacity,
              filter: `drop-shadow(0 12px 24px rgba(0,0,0,0.3)) ${blur}`
            }}
            alt=""
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
