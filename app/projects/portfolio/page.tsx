export default function PortfolioProject() {
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
            Portfolio Website
          </h1>

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
                  aria-label="Portfolio website screenshot"
                />
              </div>
            <div className="project-card-caption">
              <p className="project-card-caption-text">Screenshot of the portfolio website</p>
            </div>
          </div>

          <section className="project-section">
            <h2 className="project-heading">Overview</h2>
            <p className="project-text">
              A personal portfolio website built from scratch using modern web technologies. Features an interactive WebGL smoke background, smooth theme transitions, and a minimal noir design aesthetic. The site showcases projects, technical skills, and professional experience while maintaining excellent performance and privacy standards.
            </p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">Technical Implementation</h2>
            <p className="project-text">
              Built with Next.js 16 and React, utilizing server-side rendering for optimal SEO and performance. The WebGL background uses Three.js with custom GLSL shaders implementing Fractional Brownian Motion (FBM) for realistic smoke effects. Mouse interactions create dynamic distortions through smooth interpolation. Theme switching persists via localStorage and smoothly transitions between dark and light modes without recreating the WebGL context.
            </p>
          </section>

          <section className="project-section">
            <h2 className="project-heading">Key Features</h2>
            <ul className="project-list">
              <li>Interactive WebGL smoke background with mouse tracking</li>
              <li>Smooth dark/light theme switching with localStorage persistence</li>
              <li>Responsive design optimized for all screen sizes</li>
              <li>Privacy-first analytics with Plausible (no cookies)</li>
              <li>GDPR-compliant with proper Datenschutzerklärung and Impressum</li>
              <li>Self-hosted fonts (Google Fonts via Next.js)</li>
              <li>Minimal, elegant noir aesthetic with careful typography</li>
              <li>Project pagination system for scalable portfolio growth</li>
            </ul>
          </section>

          <section className="project-section">
            <h2 className="project-heading">Technologies Used</h2>
            <ul className="project-list">
              <li><strong>Frontend:</strong> Next.js 16, React, TypeScript</li>
              <li><strong>Styling:</strong> Tailwind CSS v3 with custom dark mode configuration</li>
              <li><strong>Graphics:</strong> Three.js (@react-three/fiber), GLSL shaders</li>
              <li><strong>Icons:</strong> Simple Icons (tech stack), Font Awesome (social links)</li>
              <li><strong>Analytics:</strong> Plausible Analytics (privacy-friendly)</li>
              <li><strong>Hosting:</strong> Configured for Hetzner deployment</li>
            </ul>
          </section>

          <section>
            <h2 className="project-heading">Development Highlights</h2>
            <p className="project-text">
              The project emphasized performance optimization and user experience. WebGL uniforms use React useRef to prevent shader recreation on theme changes, ensuring smooth transitions. The smoke effect underwent multiple iterations to achieve the desired "noir" aesthetic with fine, flowing lines rather than dense clouds. All external resources are self-hosted to maintain privacy and reduce external dependencies.
            </p>
            <p className="project-text mt-4">
              Special attention was paid to GDPR compliance, implementing a comprehensive privacy policy and ensuring no tracking occurs without user awareness. The site uses localStorage only for theme preferences and Plausible Analytics for aggregated, anonymous statistics without cookies.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
