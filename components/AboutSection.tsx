'use client';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-8 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900 dark:text-white">
              About
            </h2>
            <div className="w-16 h-px bg-gray-900 dark:bg-white" />
          </div>

          {/* Content */}
          <div className="space-y-8 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
            <p>
              DevOps engineer passionate about infrastructure automation and building reliable, scalable systems.
              I focus on containerization, Infrastructure as Code, and streamlining deployment pipelines.
            </p>
            <p>
              Currently working with NixOS for unified system configurations, building homelab infrastructure,
              and contributing to GL-IX (Gentlent Internet Exchange) to improve regional connectivity in central Europe.
            </p>
            <p>
              When not automating infrastructure, I'm exploring Kubernetes, monitoring solutions,
              and developing with TypeScript and Next.js. Always learning and experimenting with new technologies.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="space-y-2">
              <p className="text-3xl font-light text-gray-900 dark:text-white">AS204801</p>
              <p className="text-sm text-gray-500 tracking-wide">Own Network</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-light text-gray-900 dark:text-white">NixOS</p>
              <p className="text-sm text-gray-500 tracking-wide">Enthusiast</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
