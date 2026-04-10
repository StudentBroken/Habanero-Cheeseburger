"use client";
import { useState, useEffect, useRef } from 'react';

export default function ProjectTitle({ title }) {
  const [glitch, setGlitch] = useState(false);
  const clicksRef = useRef(0);

  // Occasional random glitch — every 3 to 8 seconds
  useEffect(() => {
    let timeoutId;
    const scheduleGlitch = () => {
      const nextGlitchIn = 3000 + Math.random() * 5000;
      timeoutId = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 600 + Math.random() * 800);
        scheduleGlitch();
      }, nextGlitchIn);
    };
    scheduleGlitch();
    return () => clearTimeout(timeoutId);
  }, []);

  const onTitleClick = () => {
    clicksRef.current++;
    if (clicksRef.current >= 7) {
      clicksRef.current = 0;
      setGlitch(true);
      setTimeout(() => setGlitch(false), 2200);
    }
  };

  return (
    <div className="title-container title-container--project">
      {/* Floating decals */}
      <span className="decal decal-1" aria-hidden="true">🌶️</span>
      <span className="decal decal-2" aria-hidden="true">🍔</span>
      <span className="decal decal-3" aria-hidden="true">⚙️</span>
      <span className="decal decal-4" aria-hidden="true">📎</span>

      <h1
        className={`title-righteous title-righteous--project ${glitch ? 'glitch-text' : ''}`}
        onClick={onTitleClick}
        title="try clicking me a lot"
      >
        {title}
      </h1>
    </div>
  );
}
