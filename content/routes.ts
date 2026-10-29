import type { ComponentType } from 'react';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/routing';
import { languageAlternates, localizedPath } from '@/lib/i18n/routing';
import Home from './pages/home';
import ArtifactGateway from './pages/artifact-gateway';
import EdgeIac from './pages/edge-iac';
import Homelab from './pages/homelab';
import Monitoring from './pages/monitoring';
import Nixos from './pages/nixos-config';
import Portfolio from './pages/portfolio';
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
  '/projects/edge-iac': { component: EdgeIac, title: { en: "Edge IaC: from a VM definition to a routing node", de: "Edge IaC: Von der VM-Definition zum Routing-Knoten" }, description: { en: "My IHK final project at Gentlent brought VM provisioning, DNS and system configuration into one workflow. The tricky part was deciding which steps should run together, and which needed their own boundary.", de: "In meinem IHK-Abschlussprojekt bei Gentlent habe ich VM-Bereitstellung, DNS und Systemkonfiguration in einem Ablauf zusammengeführt. Knifflig war dabei vor allem, welche Schritte zusammengehören und welche eine eigene Grenze brauchen." } },
  '/projects/homelab': { component: Homelab, title: { en: "Homelab: a home for photos, documents and files", de: "Homelab: Ein Zuhause für Fotos, Dokumente und Dateien" }, description: { en: "What began as a way to learn Proxmox has become a family cloud, a NAS and a home for self-hosted services. It is also the place where I build a lab and keep learning, now using my NixOS configuration.", de: "Was als Lernprojekt für Proxmox begann, ist inzwischen Familien-Cloud, NAS und ein Zuhause für selbst betriebene Dienste. Gleichzeitig ist es der Ort, an dem ich eine Labumgebung aufbaue und weiterlerne, mittlerweile mit meiner NixOS-Konfiguration." } },
  '/projects/monitoring': { component: Monitoring, title: { en: "Monitoring: next on the homelab list", de: "Monitoring: Als Nächstes auf der Homelab-Liste" }, description: { en: "Monitoring is a planned extension of my NixOS homelab. The implementation has not started yet, so this page records the direction rather than a completed system.", de: "Monitoring ist ein geplanter Ausbau meines NixOS-Homelabs. Mit der Umsetzung habe ich noch nicht begonnen. Diese Seite hält deshalb die Richtung fest und beschreibt noch kein fertiges System." } },
  '/projects/nixos-config': { component: Nixos, title: { en: "NixOS: the distro that finally clicked", de: "NixOS: Die Distro, bei der es Klick gemacht hat" }, description: { en: "I started with Arch and found NixOS through distro-hopping. Somewhere along the way, trying another distribution turned into finding the one I wanted to keep. Today, its configuration is also the foundation of my homelab.", de: "Ich habe mit Arch angefangen und bin durch Distro-Hopping bei NixOS gelandet. Irgendwann wurde aus dem Ausprobieren dieser Aha-Moment, dass ich meine Distro gefunden hatte. Heute bildet ihre Konfiguration auch die Grundlage meines Homelabs." } },
  '/projects/portfolio': { component: Portfolio, title: { en: "Portfolio: the site behind these projects", de: "Portfolio: Die Website hinter meinen Projekten" }, description: { en: "This is where I collect the things I build. The site itself has a few moving parts too, from the animated background to the path a change takes before it reaches the server.", de: "Hier sammle ich die Dinge, an denen ich arbeite. Auch die Website selbst hat ein paar interessante Bausteine, vom animierten Hintergrund bis zu dem Weg, den eine Änderung zum Server nimmt." } },
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
