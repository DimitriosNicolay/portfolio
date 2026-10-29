import Content from "@/content/pages/privacy-policy";
import { pageMetadata } from "@/content/routes";
export const metadata = pageMetadata("/privacy-policy", "en");
export default function Page() { return <Content locale="en" />; }
