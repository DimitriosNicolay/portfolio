'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(theme: Theme) {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === 'theme' || event.key === null) {
      applyTheme(event.newValue === 'light' ? 'light' : 'dark');
      onChange();
    }
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener('theme-change', onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('theme-change', onChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function getServerSnapshot(): Theme { return 'dark'; }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const newTheme = getSnapshot() === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    try { localStorage.setItem('theme', newTheme); } catch { /* Theme still works without storage. */ }
    window.dispatchEvent(new Event('theme-change'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
