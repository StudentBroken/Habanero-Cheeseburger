"use client";
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="theme-switch">
      <span className="theme-switch__label">{isDark ? 'DARK' : 'LIGHT'}</span>
      <button
        onClick={toggleTheme}
        className={`theme-switch__track ${isDark ? 'theme-switch__track--active' : ''}`}
        aria-label="Toggle theme"
      >
        <div className={`theme-switch__knob ${isDark ? 'theme-switch__knob--right' : ''}`}>
          {isDark ? <Moon size={12} /> : <Sun size={12} />}
        </div>
      </button>
    </div>
  );
}
