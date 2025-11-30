export default function PortfolioProject() {
  return (
    <div className="min-h-screen px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <a
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </a>
        </div>

        <article className="space-y-12">
          <header className="space-y-6">
            <h1 className="text-5xl font-light text-gray-900 dark:text-white">
              Portfolio Website
            </h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 text-xs border border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-400">
                Next.js
              </span>
              <span className="px-3 py-1 text-xs border border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-400">
                Three.js
              </span>
              <span className="px-3 py-1 text-xs border border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-400">
                WebGL
              </span>
            </div>
          </header>

          <div className="aspect-video bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center justify-center">
            <span className="text-sm text-gray-400 dark:text-gray-600">
              Screenshot placeholder
            </span>
          </div>

          <section className="prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-light text-gray-900 dark:text-white mt-12 mb-4">
              Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A personal portfolio website built from scratch using modern web technologies. Features an interactive WebGL smoke background, smooth theme transitions, and a minimal noir design aesthetic. The site showcases projects, technical skills, and professional experience while maintaining excellent performance and privacy standards.
            </p>

            <h2 className="text-2xl font-light text-gray-900 dark:text-white mt-12 mb-4">
              Technical Implementation
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Built with Next.js 16 and React, utilizing server-side rendering for optimal SEO and performance. The WebGL background uses Three.js with custom GLSL shaders implementing Fractional Brownian Motion (FBM) for realistic smoke effects. Mouse interactions create dynamic distortions through smooth interpolation. Theme switching persists via localStorage and smoothly transitions between dark and light modes without recreating the WebGL context.
            </p>

            <h2 className="text-2xl font-light text-gray-900 dark:text-white mt-12 mb-4">
              Key Features
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              <li>Interactive WebGL smoke background with mouse tracking</li>
              <li>Smooth dark/light theme switching with localStorage persistence</li>
              <li>Responsive design optimized for all screen sizes</li>
              <li>Privacy-first analytics with Plausible (no cookies)</li>
              <li>GDPR-compliant with proper Datenschutzerklärung and Impressum</li>
              <li>Self-hosted fonts (Google Fonts via Next.js)</li>
              <li>Minimal, elegant noir aesthetic with careful typography</li>
              <li>Project pagination system for scalable portfolio growth</li>
            </ul>

            <h2 className="text-2xl font-light text-gray-900 dark:text-white mt-12 mb-4">
              Technologies Used
            </h2>
            <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              <li><strong>Frontend:</strong> Next.js 16, React, TypeScript</li>
              <li><strong>Styling:</strong> Tailwind CSS v3 with custom dark mode configuration</li>
              <li><strong>Graphics:</strong> Three.js (@react-three/fiber), GLSL shaders</li>
              <li><strong>Icons:</strong> Simple Icons (tech stack), Font Awesome (social links)</li>
              <li><strong>Analytics:</strong> Plausible Analytics (privacy-friendly)</li>
              <li><strong>Hosting:</strong> Configured for Hetzner deployment</li>
            </ul>

            <h2 className="text-2xl font-light text-gray-900 dark:text-white mt-12 mb-4">
              Development Highlights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The project emphasized performance optimization and user experience. WebGL uniforms use React useRef to prevent shader recreation on theme changes, ensuring smooth transitions. The smoke effect underwent multiple iterations to achieve the desired "noir" aesthetic with fine, flowing lines rather than dense clouds. All external resources are self-hosted to maintain privacy and reduce external dependencies.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Special attention was paid to GDPR compliance, implementing a comprehensive privacy policy and ensuring no tracking occurs without user awareness. The site uses localStorage only for theme preferences and Plausible Analytics for aggregated, anonymous statistics without cookies.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
