'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 relative">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-light tracking-wider text-gray-900 dark:text-white">
            Dimitrios Nicolay
          </h1>
          <div className="w-24 h-px bg-gray-900 dark:bg-white mx-auto" />
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light tracking-wide">
            DevOps Engineer | Infrastructure Automation
          </p>
        </div>

        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
          Building reliable infrastructure and automating deployments. 
          Specializing in containerization, IaC, and cloud-native solutions.
        </p>

        <div className="flex gap-6 justify-center pt-8">
          <a href="#projects" className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-light tracking-wide hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-300">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-3 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-light tracking-wide hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-300">
            Get in Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <FontAwesomeIcon icon={faArrowDown} className="text-gray-400 dark:text-gray-600 text-xl" />
      </div>
    </section>
  );
}
