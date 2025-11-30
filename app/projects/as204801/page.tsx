export default function AS204801Project() {
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
            AS204801 Network
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {['BGP', 'Networking', 'AS'].map((tag) => (
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
              <p className="text-sm text-gray-500 dark:text-gray-500 font-light m-0">AS204801 Network Topology</p>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Operating autonomous system AS204801 for BGP peering experiments and learning network operations at scale. Hands-on experience with internet routing, peering relationships, and network policy management.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4">Technical Details</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Managing BGP sessions with multiple peers. Implementing routing policies and prefix filtering. Working with RPKI and IRR for route validation. Setting up monitoring and alerting for routing anomalies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">Challenges & Learnings</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Understanding the complexities of internet routing protocols. Managing peering relationships and troubleshooting routing issues. Learning about network security and best practices for operating an autonomous system.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
