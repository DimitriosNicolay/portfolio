import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SmoothScroll from "@/components/SmoothScroll";
import WebGLBackground from "@/components/WebGLBackground";

export const metadata: Metadata = {
  title: "Dimitrios Nicolay",
  description: "Portfolio of Dimitrios Nicolay - IT specialist for system integration specializing in infrastructure automation, containerization, and cloud-native solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <ThemeProvider>
          <WebGLBackground />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
