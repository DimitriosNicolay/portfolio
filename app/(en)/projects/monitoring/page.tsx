import Content from "@/content/pages/monitoring";
import { pageMetadata } from "@/content/routes";
export const metadata = pageMetadata("/projects/monitoring", "en");
export default function Page() { return <Content locale="en" />; }
