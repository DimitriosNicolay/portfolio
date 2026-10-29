import Link from 'next/link';
import Image from 'next/image';
import { localizedPath, type Locale } from '@/lib/i18n/routing';

export default function ProjectArticle({ locale, title, intro, eyebrow, tags, children }: {
  locale: Locale;
  title: string;
  intro: string;
  eyebrow: string;
  tags: string[];
  children: React.ReactNode;
}) {
  return (
    <main lang={locale} className="project-main">
      <div className="project-container">
        <header className="project-header max-w-3xl mx-auto">
          <Link href={localizedPath('/#projects', locale)} className="project-back-link">
            {locale === 'de' ? '← Zurück zu den Projekten' : '← Back to projects'}
          </Link>
          <p className="text-sm tracking-wide text-gray-600 dark:text-gray-400 mb-4">{eyebrow}</p>
          <h1 className="project-title">{title}</h1>
          <p className="project-text max-w-3xl text-lg mb-8">{intro}</p>
          <div className="project-tags">
            {tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
          </div>
          <div className="project-divider" />
        </header>
        <article className="project-article max-w-3xl mx-auto">{children}</article>
      </div>
    </main>
  );
}

export function ProjectSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="project-section" aria-labelledby={id}>
      <h2 id={id} className="project-heading">{title}</h2>
      {children}
    </section>
  );
}

export function ProjectDiagram({ src, alt, caption, width, height }: {
  src: string; alt: string; caption: string; width: number; height: number;
}) {
  return (
    <figure className="project-card max-w-xl mx-auto">
      <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      <figcaption className="project-card-caption project-card-caption-text text-gray-600 dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
}
