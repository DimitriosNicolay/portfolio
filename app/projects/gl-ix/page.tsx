export default function GLIXProject() {
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
            GL-IX Internet Exchange
          </h1>

          <div className="project-tags">
            {['BGP', 'Networking', 'Infrastructure'].map((tag) => (
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
              <p className="project-card-caption-text">GL-IX Infrastructure Overview</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">Overview</h2>
            <p className="project-text">
              Contributing to the Gentlent Internet Exchange infrastructure project. GL-IX focuses on improving regional connectivity and offering low-cost peering opportunities in central Europe.
            </p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">Technical Details</h2>
            <p className="project-text mb-4">
              Working with BGP routing protocols, network automation, and infrastructure management. The project involves configuring and maintaining peering relationships between multiple autonomous systems.
            </p>
          </section>

          <section>
            <h2 className="project-heading">Challenges & Learnings</h2>
            <p className="project-text">
              Deep dive into internet exchange point operations, BGP policy management, and the technical aspects of running network infrastructure at scale.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
