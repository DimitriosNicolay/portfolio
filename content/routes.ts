import type { ComponentType } from 'react';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/routing';
import { languageAlternates, localizedPath } from '@/lib/i18n/routing';
import Home from './pages/home';
import ArtifactGateway from './pages/artifact-gateway';
import AS204801 from './pages/as204801';
import EdgeIac from './pages/edge-iac';
import GlIx from './pages/gl-ix';
import Homelab from './pages/homelab';
import Monitoring from './pages/monitoring';
import Nixos from './pages/nixos-config';
import Portfolio from './pages/portfolio';
import TvApp from './pages/tv-app';
import LegalNotice from './pages/legal-notice';
import PrivacyPolicy from './pages/privacy-policy';

type Route = {
  component: ComponentType<{ locale?: Locale }>;
  title: Record<Locale, string>;
  description?: Record<Locale, string>;
};

export const routes: Record<string, Route> = {
  '/': { component: Home, title: { en: 'Dimitrios Nicolay', de: 'Dimitrios Nicolay' } },
  '/projects/artifact-gateway': {
    component: ArtifactGateway,
    title: { en: 'Artifact Gateway: What happens after the upload', de: 'Artifact Gateway: Was nach dem Upload passiert' },
    description: {
      en: 'A small, hands-on AWS project: connecting S3, Lambda and DynamoDB, checking uploaded files, and looking at what happens when validation fails.',
      de: 'Mein AWS-Lernprojekt mit CDK und TypeScript. Uploads prüfen, Ergebnisse speichern und nachvollziehen, was bei Fehlern passiert.',
    },
  },
  '/projects/as204801': { component: AS204801, title: { en: 'AS204801 Network', de: 'AS204801 Netzwerk' } },
  '/projects/edge-iac': { component: EdgeIac, title: { en: 'Edge IaC Automation Platform', de: 'Edge-IaC-Automatisierungsplattform' } },
  '/projects/gl-ix': { component: GlIx, title: { en: 'GL-IX Internet Exchange', de: 'GL-IX Internet Exchange' } },
  '/projects/homelab': { component: Homelab, title: { en: 'Homelab Infrastructure', de: 'Homelab-Infrastruktur' } },
  '/projects/monitoring': { component: Monitoring, title: { en: 'Monitoring Stack', de: 'Monitoring-Stack' } },
  '/projects/nixos-config': { component: Nixos, title: { en: 'NixOS Unified Config', de: 'Einheitliche NixOS-Konfiguration' } },
  '/projects/portfolio': { component: Portfolio, title: { en: 'Portfolio Website', de: 'Portfolio-Website' } },
  '/projects/tv-app': { component: TvApp, title: { en: 'Cross-Platform TV App', de: 'Plattformübergreifende TV-App' } },
  '/legal-notice': { component: LegalNotice, title: { en: 'Legal Notice', de: 'Impressum' } },
  '/privacy-policy': { component: PrivacyPolicy, title: { en: 'Privacy Policy', de: 'Datenschutzerklärung' } },
};

export function pageMetadata(path: string, locale: Locale): Metadata {
  const route = routes[path];
  if (!route) return {};
  const title = path === '/' ? route.title[locale] : `${route.title[locale]} | Dimitrios Nicolay`;
  return {
    title,
    description: route.description?.[locale],
    alternates: languageAlternates(localizedPath(path, locale)),
    openGraph: {
      title,
      description: route.description?.[locale],
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? 'en_US' : 'de_DE',
      type: path.startsWith('/projects/') ? 'article' : 'website',
      url: localizedPath(path, locale),
    },
  };
}
