export default function AS204801Project() {
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
            AS204801 Network
          </h1>

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
                aria-label="Diagram of ASN network topology"
              />
            </div>
            <div className="project-card-caption">
              <p className="project-card-caption-text">AS204801 Network Topology</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">Overview</h2>
            <p className="project-text">
              Operating autonomous system AS204801 for BGP peering experiments and learning network operations at scale. Hands-on experience with internet routing, peering relationships, and network policy management.
            </p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">Technical Details</h2>
            <p className="project-text mb-4">
              Managing BGP sessions with multiple peers. Implementing routing policies and prefix filtering. Working with RPKI and IRR for route validation. Setting up monitoring and alerting for routing anomalies.
            </p>
          </section>

          <section>
            <h2 className="project-heading">Challenges & Learnings</h2>
            <p className="project-text">
              Understanding the complexities of internet routing protocols. Managing peering relationships and troubleshooting routing issues. Learning about network security and best practices for operating an autonomous system.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
