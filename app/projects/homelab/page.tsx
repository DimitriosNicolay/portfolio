export default function HomelabProject() {
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
            Homelab Infrastructure
          </h1>

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
              <p className="project-card-caption-text">Homelab Infrastructure Stack</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">Overview</h2>
            <p className="project-text">
              Comprehensive homelab setup running containerized services with optimized Docker configurations. Automated infrastructure provisioning using Ansible and Terraform for virtual machine management.
            </p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">Technical Details</h2>
            <p className="project-text mb-4">
              Running multiple services including media servers, development environments, and network utilities. Infrastructure managed through code with automated deployment pipelines. Docker Compose orchestration for service dependencies.
            </p>
          </section>

          <section>
            <h2 className="project-heading">Challenges & Learnings</h2>
            <p className="project-text">
              Optimizing resource usage and container performance. Implementing proper backup strategies and disaster recovery procedures. Managing secrets and sensitive configuration across multiple services.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
