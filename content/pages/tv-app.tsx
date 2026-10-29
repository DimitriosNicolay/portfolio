import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Link from "next/link";

export default function TVAppProject({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <main className="project-main">
      <div className="project-container">
        <div className="project-header">
          <Link href={localizedPath("/#projects", locale)}
            className="project-back-link"
          >{t("← Back to Projects")}</Link>

          <h1 className="project-title">{t("Cross-Platform TV App")}</h1>

          <div className="project-tags">
            {['React Native', 'TypeScript', 'Mobile'].map((tag) => (
              <span
                key={tag}
                className="project-tag"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="project-divider" />
        </div>

        <article className="project-article">
          <div className="project-card">
            <div className="project-image-container">
                <div className="project-image-placeholder" />
              </div>
            <div className="project-card-caption">
              <p className="project-card-caption-text">{t("Cross-Platform TV Application")}</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">{t("Overview")}</h2>
            <p className="project-text">{t("Developing a React Native application targeting Android TV, Fire TV, and Apple TV platforms. Focus on creating a unified codebase that handles platform-specific requirements efficiently.")}</p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Technical Details")}</h2>
            <p className="project-text mb-4">{t("Built with React Native for TV using TypeScript. Implementation includes custom TV-optimized navigation, remote control handling, and adaptive UI components. Focus on performance and memory optimization for TV hardware constraints.")}</p>
          </section>

          <section>
            <h2 className="project-heading">{t("Challenges & Learnings")}</h2>
            <p className="project-text">{t("Managing platform differences while maintaining code reusability. Optimizing for TV user experience with remote control navigation. Handling limited resources on TV hardware compared to mobile devices.")}</p>
          </section>
        </article>
      </div>
    </main>
  );
}
