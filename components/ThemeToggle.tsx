'use client';

import LanguageToggle from '@/components/LanguageToggle';
import { useLocale } from '@/contexts/LocaleContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { locale } = useLocale();

  return (
    <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50 flex items-center gap-2">
      <LanguageToggle />
      <button
        onClick={toggleTheme}
        className="w-12 h-12 border border-gray-300 dark:border-white/10 backdrop-blur-xl flex items-center justify-center hover:border-white/40 hover:bg-white/5 dark:hover:bg-black/30 transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        aria-label={locale === "de" ? "Farbschema wechseln" : "Toggle theme"}
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
    </div>
  );
}
