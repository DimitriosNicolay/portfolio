export default function HomelabProject() {
  return (
    <main className="min-h-screen text-gray-900 dark:text-white px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <a 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            ← Back to Projects
          </a>
          
          <h1 className="text-5xl font-light tracking-wide mb-6">
            Homelab Infrastructure
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {['Docker', 'Ansible', 'Terraform'].map((tag) => (
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
          <div className="mb-16 border border-gray-300 dark:border-white/10 p-0 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-600 text-sm font-light tracking-wide">Project Image</span>
            </div>
            <div className="p-6 border-t border-gray-300 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-500 font-light m-0">Homelab Infrastructure Stack</p>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Comprehensive homelab setup running containerized services with optimized Docker configurations. Automated infrastructure provisioning using Ansible and Terraform for virtual machine management.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4">Technical Details</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Running multiple services including media servers, development environments, and network utilities. Infrastructure managed through code with automated deployment pipelines. Docker Compose orchestration for service dependencies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">Challenges & Learnings</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Optimizing resource usage and container performance. Implementing proper backup strategies and disaster recovery procedures. Managing secrets and sensitive configuration across multiple services.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
