'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from '@/contexts/LocaleContext';
import { localizedPath } from '@/lib/i18n/routing';

export default function LanguageToggle() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const targetLocale = locale === 'en' ? 'de' : 'en';

  return (
    <a
      href={localizedPath(pathname, targetLocale)}
      hrefLang={targetLocale}
      lang={targetLocale}
      aria-label={locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
      title={locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
      onClick={event => {
        // Keep section anchors and query parameters when moving to the equivalent page.
        event.currentTarget.href = `${localizedPath(pathname, targetLocale)}${window.location.search}${window.location.hash}`;
      }}
      className="h-12 px-3 flex items-center gap-2 border border-gray-300 dark:border-white/10 backdrop-blur-xl text-xs tracking-wide text-gray-600 dark:text-gray-400 hover:border-gray-500 dark:hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
    >
      <span aria-hidden="true" className={locale === 'de' ? 'text-gray-900 dark:text-white font-medium' : ''}>DE</span>
      <span aria-hidden="true" className="opacity-40">/</span>
      <span aria-hidden="true" className={locale === 'en' ? 'text-gray-900 dark:text-white font-medium' : ''}>EN</span>
    </a>
  );
}
