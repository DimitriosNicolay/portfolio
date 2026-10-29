import Content from "@/content/pages/nixos-config";
import { pageMetadata } from "@/content/routes";
export const metadata = pageMetadata("/projects/nixos-config", "en");
export default function Page() { return <Content locale="en" />; }
