export type Locale = 'en' | 'de';

export function localizedPath(path: string, locale: Locale): string {
  const base = path.replace(/^\/de(?=\/|#|\?|$)/, '') || '/';
  return locale === 'de' ? `/de${base === '/' ? '' : base}` : base;
}

export function languageAlternates(path: string) {
  return {
    canonical: path,
    languages: { en: localizedPath(path, 'en'), de: localizedPath(path, 'de'), 'x-default': localizedPath(path, 'en') },
  };
}
