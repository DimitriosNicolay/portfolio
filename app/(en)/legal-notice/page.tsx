import Content from "@/content/pages/legal-notice";
import { pageMetadata } from "@/content/routes";
export const metadata = pageMetadata("/legal-notice", "en");
export default function Page() { return <Content locale="en" />; }
