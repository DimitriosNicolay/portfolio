import ProjectArticle, { ProjectSection } from "@/components/ProjectArticle";
import { getContentTranslator } from "@/content/translate";
import { localizedPath, type Locale } from "@/lib/i18n/routing";
import Link from "next/link";

export default function Project({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <ProjectArticle locale={locale} title={t("Monitoring: next on the homelab list")} intro={t("Monitoring is a planned extension of my NixOS homelab. The implementation has not started yet, so this page records the direction rather than a completed system.")} eyebrow={t("Planned · Homelab extension")}
      tags={["NixOS", "Monitoring"]}>
      <ProjectSection id="context" title={t("The homelab comes first")}>
        <p className="project-text">{t("My homelab started as a Proxmox learning project and now serves as a family cloud, NAS and a place for self-hosted services. I also use it to build a lab environment. Monitoring is the next part I want to add to that setup.")}</p>
      </ProjectSection>
      <ProjectSection id="status" title={t("The implementation is still ahead")}>
        <p className="project-text">{t("There is no implemented monitoring stack to present here yet. The tools, integration and checks will be documented as the project takes shape. For now, the existing homelab and its NixOS configuration are the concrete starting point.")}</p>
      </ProjectSection>
      <ProjectSection id="related" title={t("The setup this will build on")}>
        <ul className="project-list">
          <li><Link href={localizedPath("/projects/homelab", locale)}>{t("The homelab")}</Link></li>
          <li><Link href={localizedPath("/projects/nixos-config", locale)}>{t("My NixOS configuration")}</Link></li>
        </ul>
      </ProjectSection>
    </ProjectArticle>
  );
}
