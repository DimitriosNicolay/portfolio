import { getContentTranslator } from '@/content/translate';
import { localizedPath, type Locale } from '@/lib/i18n/routing';
import Link from "next/link";

export default function EdgeIacProject({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
return (
    <main className="project-main">
      <div className="project-container">
        <div className="project-header">
          <Link href={localizedPath("/#projects", locale)}
            className="project-back-link"
          >{t("← Back to Projects")}</Link>

          <h1 className="project-title">{t("Edge IaC Automation Platform")}</h1>

          <div className="project-tags">
            {['CDKTF', 'Terraform', 'Ansible', 'BGP', 'Vultr', 'Cloudflare'].map((tag) => (
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
                style={{ backgroundImage: "url('/images/projects/edge-iac/anycastNetwork.jpg')" }}
                role="img"
                aria-label={t("Anycast network")}
              />
            </div>
            <div className="project-card-caption">
              <p className="project-card-caption-text">{t("Visualisation of an anycast network")}</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">{t("Overview")}</h2>
            <p className="project-text">{t("This project is a full Infrastructure-as-Code workflow for rolling out edge virtual machines with networking preconfigured from day one. New nodes are declared once, provisioned through CDK for Terraform, and then configured automatically through Ansible roles so they join the routing fabric quickly and consistently.")}</p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">{t("Architecture & Workflow")}</h2>
            <p className="project-text mb-4">{t("VM definitions are maintained in a typed configuration layer and translated into provider-specific resources through integration modules. After provisioning, a synthesis step generates dynamic inventory and host variables for Ansible, including per-host addressing data and iBGP fragments. A post-provisioning stack then creates DNS records, so newly deployed nodes become operational with minimal manual steps.")}</p>
            <p className="project-text">{t("On configuration, the playbook applies baseline operating system hardening, Docker setup, SSH policy, and BGP service provisioning. Bird2 templates enforce route filtering, RPKI validation, and policy-driven import/export behavior, while a follow-up iBGP role distributes edge peering updates across core systems.")}</p>
            <p className="project-text mt-4">{t("The destroy workflow is symmetrical: deprovisioning tears down compute resources and post-provisioning artifacts, including DNS records, so environments can be removed cleanly without stale entries.")}</p>
          </section>

          <section>
            <h2 className="project-heading">{t("Highlights & Learnings")}</h2>
            <p className="project-text mb-4">{t("The biggest value is repeatability: adding capacity in another region is mostly a configuration change, not a manual server build. This reduced drift between nodes and made rollouts more predictable, especially when combining infrastructure provisioning with routing policy deployment.")}</p>
            <p className="project-text">{t("Building this stack strengthened automation patterns around provider abstraction, idempotent configuration management, and safe routing operations. It also created a solid foundation for future enhancements such as broader provider support, stricter policy validation, and more advanced deployment gates.")}</p>
          </section>
        </article>
      </div>
    </main>
  );
}
