export default function NixOSConfigProject() {
  return (
    <main className="min-h-screen text-gray-900 dark:text-white px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <a 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            ← Back to Projects
          </a>
          
          <h1 className="text-5xl font-light tracking-wide mb-6">
            NixOS Unified Config
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {['NixOS', 'IaC', 'Automation'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1 border border-gray-300 dark:border-white/20 text-sm font-light tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="w-24 h-px bg-gray-900 dark:bg-white mb-12" />
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* Project Image Card */}
          <div className="mb-16 border border-gray-300 dark:border-white/10 p-0 overflow-hidden aspect-video">
            <img
              src="/images/projects/nixos-config/screenshot.jpg"
              alt="NixOS configuration architecture"
              className="w-full h-full object-cover bg-gray-100 dark:bg-black"
            />
            <div className="p-6 border-t border-gray-300 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-500 font-light m-0">NixOS Configuration Architecture</p>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Building a unified NixOS configuration system that manages multiple machines with reproducible and declarative deployments. The configuration covers laptop, homelab server, and future infrastructure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4">Technical Details</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Leveraging Nix flakes for modular configuration management. Using home-manager for user environment consistency across all systems. Implementation includes automated system updates and rollback capabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">Challenges & Learnings</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Understanding the Nix language and its functional approach to system configuration. Managing secrets securely across multiple machines. Building a sustainable and maintainable infrastructure-as-code workflow.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
