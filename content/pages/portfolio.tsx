import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Link from "next/link";

export default function PortfolioProject({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <main className="project-main">
      <div className="project-container">
        <div className="project-header">
          <Link href={localizedPath("/#projects", locale)}
            className="project-back-link"
          >{t("← Back to Projects")}</Link>

          <h1 className="project-title">{t("Portfolio Website")}</h1>

          <div className="project-tags">
            {['Next.js', 'Three.js', 'WebGL'].map((tag) => (
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
                <div
                  className="project-image-bg"
                  style={{ backgroundImage: "url('/images/projects/portfolio/website.jpg')" }}
                  role="img"
                  aria-label={t("Portfolio website screenshot")}
                />
              </div>
            <div className="project-card-caption">
              <p className="project-card-caption-text">{t("Screenshot of the portfolio website")}</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">{t("Overview")}</h2>
            <p className="project-text">{t("A personal portfolio website built from scratch using modern web technologies. Features an interactive WebGL smoke background, smooth theme transitions, and a minimal noir design aesthetic. The site showcases projects, technical skills, and professional experience while maintaining excellent performance and privacy standards.")}</p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Technical Implementation")}</h2>
            <p className="project-text">{t("Built with Next.js 16 and React, utilizing server-side rendering for optimal SEO and performance. The WebGL background uses Three.js with custom GLSL shaders implementing Fractional Brownian Motion (FBM) for realistic smoke effects. Mouse interactions create dynamic distortions through smooth interpolation. Theme switching persists via localStorage and smoothly transitions between dark and light modes without recreating the WebGL context.")}</p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Key Features")}</h2>
            <ul className="project-list">
              <li>{t("Interactive WebGL smoke background with mouse tracking")}</li>
              <li>{t("Smooth dark/light theme switching with localStorage persistence")}</li>
              <li>{t("Responsive design optimized for all screen sizes")}</li>
              <li>{t("Privacy-first analytics with Plausible (no cookies)")}</li>
              <li>{t("Dedicated privacy policy and legal notice pages")}</li>
              <li>{t("Self-hosted fonts (Google Fonts via Next.js)")}</li>
              <li>{t("Minimal, elegant noir aesthetic with careful typography")}</li>
              <li>{t("Project pagination system for scalable portfolio growth")}</li>
            </ul>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Technologies Used")}</h2>
            <ul className="project-list">
              <li><strong>{t("Frontend:")}</strong>{' '}{t("Next.js 16, React, TypeScript")}</li>
              <li><strong>{t("Styling:")}</strong>{' '}{t("Tailwind CSS v3 with custom dark mode configuration")}</li>
              <li><strong>{t("Graphics:")}</strong>{' '}{t("Three.js (@react-three/fiber), GLSL shaders")}</li>
              <li><strong>{t("Icons:")}</strong>{' '}{t("Simple Icons (tech stack), Font Awesome (social links)")}</li>
              <li><strong>{t("Analytics:")}</strong>{' '}{t("Plausible Analytics (privacy-friendly)")}</li>
              <li><strong>{t("Hosting:")}</strong>{' '}{t("Docker deployment on a VPS")}</li>
            </ul>
          </section>

          <section>
            <h2 className="project-heading">{t("Development Highlights")}</h2>
            <p className="project-text">{t("The project emphasized performance optimization and user experience. WebGL uniforms use React useRef to prevent shader recreation on theme changes, ensuring smooth transitions. The smoke effect underwent multiple iterations to achieve the desired \"noir\" aesthetic with fine, flowing lines rather than dense clouds. All external resources are self-hosted to maintain privacy and reduce external dependencies.")}</p>
            <p className="project-text mt-4">{t("Special attention was paid to GDPR compliance, documenting the analytics integration in a dedicated privacy policy. The site uses localStorage only for theme preferences and Plausible Analytics for aggregated, anonymous statistics without cookies.")}</p>
          </section>
        </article>
      </div>
    </main>
  );
}
