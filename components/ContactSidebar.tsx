'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ContactSidebar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sidebarWidth = 'clamp(14rem, 20vw, 16rem)';

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / (docHeight * 0.3), 1);
      setScrollProgress(progress);
      document.documentElement.style.setProperty(
        '--content-offset',
        `calc(${progress} * ${sidebarWidth})`
      );
    };

    document.documentElement.style.setProperty('--content-offset', '0rem');
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.removeProperty('--content-offset');
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <aside
        className="hidden lg:block fixed left-0 top-0 h-screen z-40 transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(${scrollProgress * 100 - 100}%)`,
        }}
      >
        <div className="h-full w-[clamp(14rem,20vw,16rem)] bg-white/90 dark:bg-black/80 backdrop-blur-xl border-r border-gray-300 dark:border-white/10 p-8 flex flex-col items-center justify-center gap-12">
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
                IT Specialist for System Integration
              </p>
            </div>

            <div className="w-12 h-px bg-gray-300 dark:bg-white/20 mx-auto" />

            {/* Contact Details */}
            <div className="space-y-4 text-sm">
              <ContactItem 
                label="Email" 
                value="hey@dnicolay.de"
                link="mailto:hey@dnicolay.de"
              />
              <ContactItem 
                label="Network" 
                value="AS204801"
                link="https://bgp.tools/as/204801"
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
                href="https://www.linkedin.com/in/dimitrios-nicolay-29a58530a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-300 dark:border-white/20 flex items-center justify-center hover:border-gray-500 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 dark:text-gray-400" />
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

      {/* Mobile Contact Button - Fixed bottom */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="Open Contact Menu"
      >
        <span className="text-lg font-light tracking-widest">DN</span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-300 dark:border-white/10 p-8 rounded-t-3xl transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>

            {/* Mobile Contact Content */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-light text-gray-900 dark:text-white tracking-wide">
                  Dimitrios Nicolay
                </h3>
                <p className="text-sm text-gray-500 tracking-wider uppercase">
                  IT Specialist for System Integration
                </p>
              </div>

              <div className="w-16 h-px bg-gray-300 dark:bg-white/20 mx-auto" />

              {/* Contact Details */}
              <div className="space-y-4 text-center">
                <ContactItem 
                  label="Email" 
                  value="hey@dnicolay.de"
                  link="mailto:hey@dnicolay.de"
                />
                <ContactItem 
                  label="Network" 
                  value="AS204801"
                  link="https://bgp.tools/as/204801"
                />
              </div>

              <div className="w-16 h-px bg-gray-300 dark:bg-white/20 mx-auto" />

              {/* Social Links */}
              <div className="flex gap-4 justify-center">
                <a
                  href="https://github.com/DimitriosNicolay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gray-300 dark:border-white/20 flex items-center justify-center hover:border-gray-500 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
                  aria-label="GitHub"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faGithub} className="text-gray-600 dark:text-gray-400 text-xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/dimitrios-nicolay-29a58530a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gray-300 dark:border-white/20 flex items-center justify-center hover:border-gray-500 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
                  aria-label="LinkedIn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 dark:text-gray-400 text-xl" />
                </a>
                <a
                  href="mailto:hey@dnicolay.de"
                  className="w-12 h-12 border border-gray-300 dark:border-white/20 flex items-center justify-center hover:border-gray-500 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
                  aria-label="Email"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 dark:text-gray-400 text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ContactItem({ label, value, link }: { label: string; value: string; link?: string }) {
  const content = (
    <>
      <p className="text-xs text-gray-500 dark:text-gray-600 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-400 font-light">
        {value}
      </p>
    </>
  );

  if (link) {
    return (
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block space-y-1 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="space-y-1">
      {content}
    </div>
  );
}
