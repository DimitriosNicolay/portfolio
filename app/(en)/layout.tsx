import SiteLayout, { baseMetadata } from "@/components/SiteLayout";
export const metadata = baseMetadata;
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
