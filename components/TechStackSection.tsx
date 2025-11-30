'use client';

const techStack = [
  {
    category: 'Infrastructure',
    technologies: ['NixOS', 'Proxmox', 'Docker', 'Ansible', 'Terraform'],
  },
  {
    category: 'Development',
    technologies: ['TypeScript', 'Next.js', 'TailwindCSS', 'Postgres', 'Express.js'],
  },
  {
    category: 'Learning',
    technologies: ['Kubernetes', 'Prometheus', 'Grafana', 'AWS', 'Rust'],
  },
];

export default function TechStackSection() {
  return (
    <section id="tech" className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <div className="space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 dark:text-white">
            Tech Stack
          </h2>
          <div className="w-16 h-px bg-gray-900 dark:bg-white" />
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {techStack.map((stack) => (
            <div key={stack.category} className="space-y-8">
              <h3 className="text-xl font-light text-gray-600 dark:text-gray-400 tracking-wider uppercase">
                {stack.category}
              </h3>
              <div className="space-y-4">
                {stack.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="py-3 px-4 border-l border-gray-300 dark:border-white/10 hover:border-gray-500 dark:hover:border-white/40 transition-colors duration-300"
                  >
                    <span className="text-base font-light text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
