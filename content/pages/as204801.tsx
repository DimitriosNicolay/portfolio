import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Link from "next/link";

export default function AS204801Project({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <main className="project-main">
      <div className="project-container">
        <div className="project-header">
          <Link href={localizedPath("/#projects", locale)}
            className="project-back-link"
          >{t("← Back to Projects")}</Link>

          <h1 className="project-title">{t("AS204801 Network")}</h1>

          <div className="project-tags">
            {['BGP', 'Networking', 'AS'].map((tag) => (
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
                style={{ backgroundImage: "url('/images/projects/as204801/autonomous-system-diagram.svg')" }}
                role="img"
                aria-label={t("Diagram of ASN network topology")}
              />
            </div>
            <div className="project-card-caption">
              <p className="project-card-caption-text">{t("AS204801 Network Topology")}</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">{t("Overview")}</h2>
            <p className="project-text">{t("Operating autonomous system AS204801 for BGP peering experiments and learning network operations at scale. Hands-on experience with internet routing, peering relationships, and network policy management.")}</p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Technical Details")}</h2>
            <p className="project-text mb-4">{t("Managing BGP sessions with multiple peers. Implementing routing policies and prefix filtering. Working with RPKI and IRR for route validation. Setting up monitoring and alerting for routing anomalies.")}</p>
          </section>

          <section>
            <h2 className="project-heading">{t("Challenges & Learnings")}</h2>
            <p className="project-text">{t("Understanding the complexities of internet routing protocols. Managing peering relationships and troubleshooting routing issues. Learning about network security and best practices for operating an autonomous system.")}</p>
          </section>
        </article>
      </div>
    </main>
  );
}
