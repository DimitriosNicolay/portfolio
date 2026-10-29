import Content from "@/content/pages/portfolio";
import { pageMetadata } from "@/content/routes";
export const metadata = pageMetadata("/projects/portfolio", "en");
export default function Page() { return <Content locale="en" />; }
