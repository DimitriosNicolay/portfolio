import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Link from "next/link";

export default function HomelabProject({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <main className="project-main">
      <div className="project-container">
        <div className="project-header">
          <Link href={localizedPath("/#projects", locale)}
            className="project-back-link"
          >{t("← Back to Projects")}</Link>

          <h1 className="project-title">{t("Homelab Infrastructure")}</h1>

          <div className="project-tags">
            {['Docker', 'Ansible', 'Terraform'].map((tag) => (
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
              <p className="project-card-caption-text">{t("Homelab Infrastructure Stack")}</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">{t("Overview")}</h2>
            <p className="project-text">{t("Comprehensive homelab setup running containerized services with optimized Docker configurations. Automated infrastructure provisioning using Ansible and Terraform for virtual machine management.")}</p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Technical Details")}</h2>
            <p className="project-text mb-4">{t("Running multiple services including media servers, development environments, and network utilities. Infrastructure managed through code with automated deployment pipelines. Docker Compose orchestration for service dependencies.")}</p>
          </section>

          <section>
            <h2 className="project-heading">{t("Challenges & Learnings")}</h2>
            <p className="project-text">{t("Optimizing resource usage and container performance. Implementing proper backup strategies and disaster recovery procedures. Managing secrets and sensitive configuration across multiple services.")}</p>
          </section>
        </article>
      </div>
    </main>
  );
}
