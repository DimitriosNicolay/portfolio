export default function EdgeIacProject() {
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
            Edge IaC Automation Platform
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {['CDKTF', 'Terraform', 'Ansible', 'BGP', 'Vultr', 'Cloudflare'].map((tag) => (
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
          <div className="mb-16 border border-gray-300 dark:border-white/10 p-0 overflow-hidden">
            <img
              src="/images/projects/edge-iac/anycastNetwork.jpg"
              alt="Edge IaC reference architecture diagram"
              className="block w-full h-auto max-h-[60vh] object-contain bg-gray-100 dark:bg-black"
            />
            <div className="p-6 border-t border-gray-300 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-500 font-light m-0">
                Visualisation of an anycast network
              </p>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This project is a full Infrastructure-as-Code workflow for rolling out edge virtual machines with networking preconfigured from day one.
              New nodes are declared once, provisioned through CDK for Terraform, and then configured automatically through Ansible roles so they join the routing fabric quickly and consistently.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light mb-4">Architecture & Workflow</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              VM definitions are maintained in a typed configuration layer and translated into provider-specific resources through integration modules.
              After provisioning, a synthesis step generates dynamic inventory and host variables for Ansible, including per-host addressing data and iBGP fragments.
              A post-provisioning stack then creates DNS records, so newly deployed nodes become operational with minimal manual steps.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              On configuration, the playbook applies baseline operating system hardening, Docker setup, SSH policy, and BGP service provisioning.
              Bird2 templates enforce route filtering, RPKI validation, and policy-driven import/export behavior, while a follow-up iBGP role distributes edge peering updates across core systems.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
              The destroy workflow is symmetrical: deprovisioning tears down compute resources and post-provisioning artifacts, including DNS records, so environments can be removed cleanly without stale entries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">Highlights & Learnings</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The biggest value is repeatability: adding capacity in another region is mostly a configuration change, not a manual server build.
              This reduced drift between nodes and made rollouts more predictable, especially when combining infrastructure provisioning with routing policy deployment.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Building this stack strengthened automation patterns around provider abstraction, idempotent configuration management, and safe routing operations.
              It also created a solid foundation for future enhancements such as broader provider support, stricter policy validation, and more advanced deployment gates.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
