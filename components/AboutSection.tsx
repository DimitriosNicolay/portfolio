'use client';

import { useLocale } from '@/contexts/LocaleContext';

export default function AboutSection() {
  const { t } = useLocale();
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 dark:text-white">{t("About")}</h2>
            <div className="w-16 h-px bg-gray-900 dark:bg-white" />
          </div>

          {/* Content */}
          <div className="space-y-8 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
            <p>{t("I'm a trained IT specialist for system integration, starting my career with a focus on Linux, infrastructure, and DevOps. In my projects, I work with containers, Infrastructure as Code, and deployment pipelines.")}</p>
            <p>{t("Right now I'm using NixOS to keep configurations reproducible across machines, running and refining a homelab, and contributing to GL-IX to help improve regional connectivity in central Europe.")}</p>
            <p>{t("When I'm not automating infrastructure, I'm digging deeper into Kubernetes, monitoring and observability, and modern web stacks with TypeScript and Next.js. I like understanding how all the layers—from the hardware up to the frontend—fit together and how to make them easier to operate.")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            <div className="space-y-2">
              <p className="text-3xl font-light text-gray-900 dark:text-white">AS204801</p>
              <p className="text-sm text-gray-500 tracking-wide">{t("Network Operator")}</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-light text-gray-900 dark:text-white">GL-IX</p>
              <p className="text-sm text-gray-500 tracking-wide">{t("Internet Exchange")}</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-light text-gray-900 dark:text-white">NixOS</p>
              <p className="text-sm text-gray-500 tracking-wide">{t("Declarative Systems")}</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-light text-gray-900 dark:text-white">Homelab</p>
              <p className="text-sm text-gray-500 tracking-wide">{t("Self-Hosted Infra")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
