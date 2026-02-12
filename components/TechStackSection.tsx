'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  siNixos,
  siProxmox,
  siDocker,
  siAnsible,
  siTerraform,
  siTypescript,
  siNextdotjs,
  siTailwindcss,
  siPostgresql,
  siGo,
  siKubernetes,
  siPrometheus,
  siGrafana,
  siRust,
} from 'simple-icons';

interface Technology {
  name: string;
  icon: {
    slug?: string;
    hex?: string;
    path?: string;
  } | IconDefinition;
  url: string;
}

const techStack = [
  {
    category: 'Infrastructure',
    technologies: [
      { name: 'NixOS', icon: siNixos, url: 'https://nixos.org' },
      { name: 'Proxmox', icon: siProxmox, url: 'https://www.proxmox.com' },
      { name: 'Docker', icon: siDocker, url: 'https://www.docker.com' },
      { name: 'Ansible', icon: siAnsible, url: 'https://www.ansible.com' },
      { name: 'Terraform', icon: siTerraform, url: 'https://www.terraform.io' },
    ] as Technology[],
  },
  {
    category: 'Development',
    technologies: [
      { name: 'TypeScript', icon: siTypescript, url: 'https://www.typescriptlang.org' },
      { name: 'Next.js', icon: siNextdotjs, url: 'https://nextjs.org' },
      { name: 'TailwindCSS', icon: siTailwindcss, url: 'https://tailwindcss.com' },
      { name: 'Postgres', icon: siPostgresql, url: 'https://www.postgresql.org' },
      { name: 'Go', icon: siGo, url: 'https://go.dev' },
    ] as Technology[],
  },
  {
    category: 'Learning',
    technologies: [
      { name: 'Kubernetes', icon: siKubernetes, url: 'https://kubernetes.io' },
      { name: 'Prometheus', icon: siPrometheus, url: 'https://prometheus.io' },
      { name: 'Grafana', icon: siGrafana, url: 'https://grafana.com' },
      { name: 'AWS', icon: faAws, url: 'https://aws.amazon.com' },
      { name: 'Rust', icon: siRust, url: 'https://www.rust-lang.org' },
    ] as Technology[],
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
                  <a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 border-l border-gray-300 dark:border-white/10 hover:border-gray-500 dark:hover:border-white/40 transition-colors duration-300 flex items-center gap-3 group"
                  >
                    {'path' in tech.icon ? (
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={tech.icon.path} />
                      </svg>
                    ) : (
                      <FontAwesomeIcon 
                        icon={tech.icon as IconDefinition} 
                        className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" 
                      />
                    )}
                    <span className="text-base font-light text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
