'use client';

import { createContext, useContext } from 'react';
import type { Locale } from '@/lib/i18n/routing';
import { localizedPath } from '@/lib/i18n/routing';
import de from '@/lib/i18n/ui.de.json';

const LocaleContext = createContext<Locale>('en');

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: (text: string) => locale === 'de' ? (de as Record<string, string>)[text] ?? text : text,
    href: (path: string) => localizedPath(path, locale),
  };
}
