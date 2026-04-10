"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GAP = 32;

export default function MediaCarousel({ media }) {
  const scrollRef = useRef(null);
  const itemRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedIndexRef = useRef(0);
  const lenRef = useRef(0);
  const isJumping = useRef(false);

  if (!media || media.length === 0) return null;

  let baseMedia = [...media];
  while (baseMedia.length < 5) {
    baseMedia = [...baseMedia, ...media];
  }
  const len = baseMedia.length;
  lenRef.current = len;
  const displayMedia = [...baseMedia, ...baseMedia, ...baseMedia];

  const getMetrics = useCallback(() => {
    const itemEl = itemRef.current;
    if (!itemEl) return { itemFull: 0, section: 0 };
    const itemFull = itemEl.offsetWidth + GAP;
    return { itemFull, section: itemFull * lenRef.current };
  }, []);

  const updateFocus = useCallback((idx) => {
    focusedIndexRef.current = idx;
    setFocusedIndex(idx);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const initPosition = () => {
      const { itemFull, section } = getMetrics();
      if (!itemFull) return;
      el.style.scrollSnapType = 'none';
      el.scrollLeft = section;
      updateFocus(lenRef.current);
      requestAnimationFrame(() => {
        el.style.scrollSnapType = 'x mandatory';
      });
    };

    const to = setTimeout(initPosition, 50);

    const handleScroll = () => {
      if (isJumping.current) return;
      const { itemFull, section } = getMetrics();
      if (!itemFull) return;

      const rawIndex = Math.round(el.scrollLeft / itemFull);

      if (el.scrollLeft < section * 0.5) {
        isJumping.current = true;
        el.style.scrollSnapType = 'none';
        el.scrollLeft += section;
        updateFocus(Math.round(el.scrollLeft / itemFull));
        setTimeout(() => {
          el.style.scrollSnapType = 'x mandatory';
          isJumping.current = false;
        }, 80);
      } else if (el.scrollLeft > section * 2.5) {
        isJumping.current = true;
        el.style.scrollSnapType = 'none';
        el.scrollLeft -= section;
        updateFocus(Math.round(el.scrollLeft / itemFull));
        setTimeout(() => {
          el.style.scrollSnapType = 'x mandatory';
          isJumping.current = false;
        }, 80);
      } else {
        updateFocus(rawIndex);
      }
    };

    const handleResize = () => {
      const { itemFull, section } = getMetrics();
      if (!itemFull) return;
      const normalizedSlot = focusedIndexRef.current % lenRef.current;
      const targetScroll = section + normalizedSlot * itemFull;
      isJumping.current = true;
      el.style.scrollSnapType = 'none';
      el.scrollLeft = targetScroll;
      updateFocus(Math.round(targetScroll / itemFull));
      requestAnimationFrame(() => {
        el.style.scrollSnapType = 'x mandatory';
        isJumping.current = false;
      });
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY });
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    el.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(to);
      el.removeEventListener('scroll', handleScroll);
      el.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, [getMetrics, updateFocus]);

  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const { itemFull } = getMetrics();
    el.scrollBy({ left: dir === 'left' ? -itemFull : itemFull, behavior: 'smooth' });
  }, [getMetrics]);

  const scrollToIndex = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;
    const { itemFull } = getMetrics();
    el.scrollTo({ left: index * itemFull, behavior: 'smooth' });
  }, [getMetrics]);

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '14px',
    zIndex: 20,
    borderRadius: '50%',
    backdropFilter: 'blur(12px)',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
  };

  return (
    <div style={{
      '--item-width': 'clamp(260px, 60vw, 580px)',
      position: 'relative',
      width: '100vw',
      margin: '0 0 3rem calc(50% - 50vw)',
      overflow: 'hidden',
      padding: '2.5rem 0',
    }}>
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          gap: `${GAP}px`,
          alignItems: 'center',
          padding: `1rem calc(50vw - (var(--item-width) / 2))`,
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
        }}
      >
        {displayMedia.map((item, index) => {
          const isFocused = index === focusedIndex;
          return (
            <div
              key={index}
              ref={index === 0 ? itemRef : null}
              style={{
                flex: '0 0 var(--item-width)',
                scrollSnapAlign: 'center',
                aspectRatio: '1 / 1',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease, box-shadow 0.35s ease',
                transform: isFocused ? 'scale(1.08)' : 'scale(0.86)',
                opacity: isFocused ? 1 : 0.4,
                boxShadow: isFocused ? '0 24px 56px rgba(0,0,0,0.55)' : 'none',
                zIndex: isFocused ? 10 : 1,
                cursor: isFocused ? 'default' : 'pointer',
                backgroundColor: 'var(--bg-glass)',
              }}
              onClick={() => { if (!isFocused) scrollToIndex(index); }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  controls={isFocused}
                  autoPlay={isFocused}
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.alt || `Media ${(index % len) + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  draggable={false}
                />
              )}
              {item.caption && isFocused && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '0.6rem 1rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
                  color: 'rgba(255,255,255,0.92)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  letterSpacing: '0.03em',
                  lineHeight: 1.4,
                  pointerEvents: 'none',
                  zIndex: 5,
                }}>
                  {item.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll('left')}
        className="tech-button carousel-nav-btn"
        style={{ ...buttonStyle, left: '1.5rem' }}
        aria-label="Previous"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="tech-button carousel-nav-btn"
        style={{ ...buttonStyle, right: '1.5rem' }}
        aria-label="Next"
      >
        <ChevronRight size={26} />
      </button>
    </div>
  );
}
