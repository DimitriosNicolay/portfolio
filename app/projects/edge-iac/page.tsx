export default function EdgeIacProject() {
return (
    <main className="project-main">
      <div className="project-container">
        <div className="project-header">
          <a
            href="/#projects"
            className="project-back-link"
          >
            ← Back to Projects
          </a>

          <h1 className="project-title">
            Edge IaC Automation Platform
          </h1>

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
                aria-label="Anycast network"
              />
            </div>
            <div className="project-card-caption">
              <p className="project-card-caption-text">Visualisation of an anycast network</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">Overview</h2>
            <p className="project-text">
              This project is a full Infrastructure-as-Code workflow for rolling out edge virtual machines with networking preconfigured from day one.
              New nodes are declared once, provisioned through CDK for Terraform, and then configured automatically through Ansible roles so they join the routing fabric quickly and consistently.
            </p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">Architecture & Workflow</h2>
            <p className="project-text mb-4">
              VM definitions are maintained in a typed configuration layer and translated into provider-specific resources through integration modules.
              After provisioning, a synthesis step generates dynamic inventory and host variables for Ansible, including per-host addressing data and iBGP fragments.
              A post-provisioning stack then creates DNS records, so newly deployed nodes become operational with minimal manual steps.
            </p>
            <p className="project-text">
              On configuration, the playbook applies baseline operating system hardening, Docker setup, SSH policy, and BGP service provisioning.
              Bird2 templates enforce route filtering, RPKI validation, and policy-driven import/export behavior, while a follow-up iBGP role distributes edge peering updates across core systems.
            </p>
            <p className="project-text mt-4">
              The destroy workflow is symmetrical: deprovisioning tears down compute resources and post-provisioning artifacts, including DNS records, so environments can be removed cleanly without stale entries.
            </p>
          </section>

          <section>
            <h2 className="project-heading">Highlights & Learnings</h2>
            <p className="project-text mb-4">
              The biggest value is repeatability: adding capacity in another region is mostly a configuration change, not a manual server build.
              This reduced drift between nodes and made rollouts more predictable, especially when combining infrastructure provisioning with routing policy deployment.
            </p>
            <p className="project-text">
              Building this stack strengthened automation patterns around provider abstraction, idempotent configuration management, and safe routing operations.
              It also created a solid foundation for future enhancements such as broader provider support, stricter policy validation, and more advanced deployment gates.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
