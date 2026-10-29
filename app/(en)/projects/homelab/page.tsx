import Content from "@/content/pages/homelab";
import { pageMetadata } from "@/content/routes";
export const metadata = pageMetadata("/projects/homelab", "en");
export default function Page() { return <Content locale="en" />; }
