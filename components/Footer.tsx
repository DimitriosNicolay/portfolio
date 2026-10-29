'use client';

import { useLocale } from '@/contexts/LocaleContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-10 py-16 px-8 border-t border-gray-300 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-gray-900 dark:text-white tracking-wide">
              Dimitrios Nicolay
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed">{t("IT Specialist for System Integration")}</p>
            <p className="text-sm text-gray-500 font-light leading-relaxed">{t("Reliable infrastructure | Automated deployments")}</p>
            <p className="text-sm text-gray-500 font-light leading-relaxed">{t("Operator of AS204801 | GL-IX Internet Exchange.")}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-gray-900 dark:text-white tracking-wide">
              Links
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <FooterLink href="/#about">{t("About")}</FooterLink>
              <FooterLink href="/legal-notice">{t("Legal Notice")}</FooterLink>
              <FooterLink href="/#tech">{t("Tech Stack")}</FooterLink>
              <FooterLink href="/privacy-policy">{t("Privacy Policy")}</FooterLink>
              <FooterLink href="/#projects">{t("Projects")}</FooterLink>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-gray-900 dark:text-white tracking-wide">{t("Connect")}</h3>
            <div className="flex gap-4">
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
                aria-label={t("Email")}
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 dark:text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-300 dark:border-white/10">
          <p className="text-sm text-gray-500 font-light">©{' '}{currentYear}{' '}{t("Dimitrios Nicolay. All rights reserved.")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href: path, children }: { href: string; children: React.ReactNode }) {
  const { href } = useLocale();
  return (
    <Link
      href={href(path)}
      className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-light block"
    >
      {children}
    </Link>
  );
}
