import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Link from "next/link";

export default function NixOSConfigProject({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <main className="project-main">
      <div className="project-container">
        <div className="project-header">
          <Link href={localizedPath("/#projects", locale)}
            className="project-back-link"
          >{t("← Back to Projects")}</Link>

          <h1 className="project-title">{t("NixOS Unified Config")}</h1>

          <div className="project-tags">
            {['NixOS', 'IaC', 'Automation'].map((tag) => (
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
                style={{ backgroundImage: "url('/images/projects/nixos-config/nixos-linux-waves-catpuccin-purple.jpg')" }}
                role="img"
                aria-label={t("NixOS logo")}
              />
              </div>
            <div className="project-card-caption">
              <p className="project-card-caption-text">{t("NixOS Configuration Architecture")}</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">{t("Overview")}</h2>
            <p className="project-text">{t("Building a unified NixOS configuration system that manages multiple machines with reproducible and declarative deployments. The configuration covers laptop, homelab server, and future infrastructure.")}</p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Technical Details")}</h2>
            <p className="project-text mb-4">{t("Leveraging Nix flakes for modular configuration management. Using home-manager for user environment consistency across all systems. Implementation includes automated system updates and rollback capabilities.")}</p>
          </section>

          <section>
            <h2 className="project-heading">{t("Challenges & Learnings")}</h2>
            <p className="project-text">{t("Understanding the Nix language and its functional approach to system configuration. Managing secrets securely across multiple machines. Building a sustainable and maintainable infrastructure-as-code workflow.")}</p>
          </section>
        </article>
      </div>
    </main>
  );
}
