import SiteLayout, { baseMetadata } from "@/components/SiteLayout";
export const metadata = { ...baseMetadata, description: "Portfolio von Dimitrios Nicolay – Fachinformatiker für Systemintegration. Projekte rund um Linux, Infrastrukturautomatisierung und Cloud." };
export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="de">{children}</SiteLayout>;
}
