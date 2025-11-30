'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-8 right-8 z-50 w-12 h-12 border border-white/20 dark:border-white/10 backdrop-blur-xl flex items-center justify-center hover:border-white/40 hover:bg-white/5 dark:hover:bg-black/30 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <FontAwesomeIcon 
          icon={faMoon}
          className={`absolute inset-0 text-gray-400 transition-all duration-300 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0'
              : 'opacity-0 rotate-90'
          }`}
        />
        <FontAwesomeIcon 
          icon={faSun}
          className={`absolute inset-0 text-gray-600 transition-all duration-300 ${
            theme === 'light'
              ? 'opacity-100 rotate-0'
              : 'opacity-0 -rotate-90'
          }`}
        />
      </div>
    </button>
  );
}
