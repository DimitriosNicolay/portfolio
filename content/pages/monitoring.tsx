import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Link from "next/link";

export default function MonitoringProject({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <main className="project-main">
      <div className="project-container">
        <div className="project-header">
          <Link href={localizedPath("/#projects", locale)}
            className="project-back-link"
          >{t("← Back to Projects")}</Link>

          <h1 className="project-title">{t("Monitoring Stack")}</h1>

          <div className="project-tags">
            {['Prometheus', 'Grafana', 'Kubernetes'].map((tag) => (
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
              <p className="project-card-caption-text">{t("Monitoring Dashboard Overview")}</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">{t("Overview")}</h2>
            <p className="project-text">{t("Building comprehensive monitoring and alerting infrastructure for self-hosted services. Implementation uses modern observability tools to track system health, performance metrics, and application behavior.")}</p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Technical Details")}</h2>
            <p className="project-text mb-4">{t("Prometheus for metrics collection and storage. Grafana for visualization and dashboards. Alertmanager for notification routing. Custom exporters for application-specific metrics. Integration with Kubernetes for container monitoring.")}</p>
          </section>

          <section>
            <h2 className="project-heading">{t("Challenges & Learnings")}</h2>
            <p className="project-text">{t("Designing effective alert rules that minimize false positives. Creating meaningful dashboards for different stakeholder needs. Managing data retention and storage requirements for time-series data.")}</p>
          </section>
        </article>
      </div>
    </main>
  );
}
