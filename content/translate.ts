import 'server-only';
import de from './translations/de.json';
import type { Locale } from '@/lib/i18n/routing';

export function getContentTranslator(locale: Locale) {
  return (text: string): string => {
    if (locale === 'en') return text;
    const translation = (de as Record<string, string>)[text];
    if (translation === undefined) throw new Error(`Missing German content translation: ${text}`);
    return translation;
  };
}
