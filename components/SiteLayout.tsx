/* eslint-disable @next/next/no-head-element -- Shared App Router root document, rendered by both locale layouts. */
import type { Metadata } from "next";
import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";
import "@/app/globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";
import type { Locale } from "@/lib/i18n/routing";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SmoothScroll from "@/components/SmoothScroll";
import WebGLBackground from "@/components/WebGLBackground";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://dnicolay.de"),
  title: "Dimitrios Nicolay",
  description: "Portfolio of Dimitrios Nicolay - IT specialist for system integration specializing in infrastructure automation, containerization, and cloud-native solutions",
};

export default function SiteLayout({
  children, locale,
}: Readonly<{
  children: React.ReactNode; locale: Locale;
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
                document.documentElement.classList.add(theme);
              } catch { document.documentElement.classList.add('dark'); }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="plausible-analytics"
            strategy="afterInteractive"
            data-domain="dnicolay.de"
            src="https://analytics.dnicolay.de/js/script.js"
          />
        )}
        <LocaleProvider locale={locale}>
          <ThemeProvider>
            <WebGLBackground />
            <ThemeToggle />
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
