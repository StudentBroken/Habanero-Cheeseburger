"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MediaCarousel({ media }) {
  const scrollRef = useRef(null);

  if (!media || media.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '2rem' }} className="glass-panel">
      <div 
        ref={scrollRef}
        className="hide-scrollbar"
        style={{ 
          display: 'flex', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory', 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          borderRadius: '16px'
        }}
      >
        {media.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              flex: '0 0 100%', 
              scrollSnapAlign: 'center', 
              position: 'relative',
              aspectRatio: '16/9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)'
            }}
          >
            {item.type === 'video' ? (
              <video 
                src={item.url} 
                controls 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={item.url} 
                alt={`Media ${index}`} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </div>
        ))}
      </div>

      {media.length > 1 && (
        <>
          <button 
            onClick={() => scroll('left')}
            className="tech-button"
            style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', padding: '8px', zIndex: 10, background: 'var(--bg-glass)', borderRadius: '50%' }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="tech-button"
            style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', padding: '8px', zIndex: 10, background: 'var(--bg-glass)', borderRadius: '50%' }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}
