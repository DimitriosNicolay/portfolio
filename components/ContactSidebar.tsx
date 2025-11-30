'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function ContactSidebar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / (docHeight * 0.3), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className="fixed left-0 top-0 h-screen z-40 transition-transform duration-700 ease-out"
      style={{
        transform: `translateX(${scrollProgress * 100 - 100}%)`,
      }}
    >
      <div className="h-full bg-white/90 dark:bg-black/80 backdrop-blur-xl border-r border-gray-300 dark:border-white/10 p-8 flex flex-col items-center justify-center gap-12 w-64">
        {/* Initials */}
        <div className="w-20 h-20 border border-gray-300 dark:border-white/20 flex items-center justify-center">
          <span className="text-2xl font-light text-gray-900 dark:text-white tracking-widest">DN</span>
        </div>

        {/* Contact Info */}
        <div className="text-center space-y-6 w-full">
          <div className="space-y-2">
            <h3 className="text-lg font-light text-gray-900 dark:text-white tracking-wide">
              Dimitrios Nicolay
            </h3>
            <p className="text-xs text-gray-500 tracking-wider uppercase">
              DevOps Engineer
            </p>
          </div>

          <div className="w-12 h-px bg-gray-300 dark:bg-white/20 mx-auto" />

          {/* Contact Details */}
          <div className="space-y-4 text-sm">
            <ContactItem 
              label="Email" 
              value="hey@dnicolay.de" 
            />
            <ContactItem 
              label="Network" 
              value="AS204801" 
            />
          </div>

          <div className="w-12 h-px bg-gray-300 dark:bg-white/20 mx-auto" />

          {/* Social Links */}
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/DimitriosNicolay"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-gray-300 dark:border-white/20 flex items-center justify-center hover:border-gray-500 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="text-gray-600 dark:text-gray-400" />
            </a>
            <a
              href="mailto:hey@dnicolay.de"
              className="w-10 h-10 border border-gray-300 dark:border-white/20 flex items-center justify-center hover:border-gray-500 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
              aria-label="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 dark:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 dark:text-gray-600 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-400 font-light">
        {value}
      </p>
    </div>
  );
}
