'use client';

import { useLocale } from '@/contexts/LocaleContext';

import { useState } from 'react';
import Link from 'next/link';

const projects = [
  {
    id: 9,
    title: 'Artifact Gateway',
    description: 'A hands-on AWS project with CDK: checking S3 uploads, recording results in DynamoDB, and exploring what happens when validation fails.',
    tags: ['AWS CDK', 'Lambda', 'TypeScript'],
    link: '/projects/artifact-gateway',
  },
  {
    id: 8,
    title: 'Edge IaC Automation Platform',
    description: 'My IHK project at Gentlent: provisioning edge VMs with CDKTF and Ansible, with an explicit review step for the core router.',
    tags: ['Terraform', 'Ansible', 'BGP'],
    link: '/projects/edge-iac',
  },
  {
    id: 7,
    title: 'Portfolio Website',
    description: 'Personal portfolio built with Next.js, featuring WebGL smoke effects, dark/light theme switching, and minimal noir design aesthetic.',
    tags: ['Next.js', 'Three.js', 'WebGL'],
    link: '/projects/portfolio',
  },
  {
    id: 2,
    title: 'NixOS Homelab Config',
    description: 'A modular NixOS configuration for my homelab, connecting system settings, service modules and encrypted secret references.',
    tags: ['NixOS', 'Nix Flakes', 'sops-nix'],
    link: '/projects/nixos-config',
  },
  {
    id: 3,
    title: 'Homelab Infrastructure',
    description: 'Photos, documents and files in a NixOS homelab, with Caddy web routes and persistent application data.',
    tags: ['NixOS', 'Caddy', 'Self-hosting'],
    link: '/projects/homelab',
  },
  {
    id: 6,
    title: 'Monitoring Stack',
    description: 'Monitoring for my NixOS homelab is planned next. The implementation has not started yet.',
    tags: ['NixOS', 'Monitoring'],
    planned: true,
    link: '/projects/monitoring',
  },
];

export default function ProjectsSection() {
  const { t } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 dark:text-white">{t("Projects")}</h2>
          <div className="w-16 h-px bg-gray-900 dark:bg-white" />
        </div>

        <div 
          className={`grid md:grid-cols-2 gap-8 transition-all duration-400 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-16">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1 || isTransitioning}
              className="w-10 h-10 border border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:border-gray-500 dark:hover:border-white/40 hover:text-gray-900 dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
              aria-label={t("Previous page")}
            >
              ←
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-600 font-light tracking-wider">
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages || isTransitioning}
              className="w-10 h-10 border border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:border-gray-500 dark:hover:border-white/40 hover:text-gray-900 dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
              aria-label={t("Next page")}
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const { t, href } = useLocale();
  return (
    <div className="group min-w-0 [overflow-wrap:anywhere] h-full p-8 border border-gray-300 dark:border-white/10 hover:border-gray-500 dark:hover:border-white/30 transition-all duration-300">
      <div className="space-y-6">
        <h3 className="text-2xl font-light text-gray-900 dark:text-white">
          {t(project.title)}
        </h3>
        {project.planned && <p className="text-xs tracking-wide text-gray-500">{t("Planned")}</p>}
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-light">
          {t(project.description)}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-light text-gray-500 tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4">
          <Link
            href={href(project.link)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-light hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >{t(project.planned ? "View plans" : "View Project")}<span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
