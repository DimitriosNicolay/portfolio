import ProjectArticle, { ProjectSection, ProjectDiagram } from "@/components/ProjectArticle";
import { getContentTranslator } from "@/content/translate";
import { localizedPath, type Locale } from "@/lib/i18n/routing";
import Link from "next/link";

export default function Project({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <ProjectArticle locale={locale} title={t("Homelab: a home for photos, documents and files")} intro={t("What began as a way to learn Proxmox has become a family cloud, a NAS and a home for self-hosted services. It is also the place where I build a lab and keep learning, now using my NixOS configuration.")} eyebrow={t("Self-hosting · Personal project")}
      tags={["NixOS", "Caddy", "Immich", "Paperless-ngx", "Syncthing"]}>
      <ProjectSection id="starting-point" title={t("Learning, TrueNAS and a growing homelab")}>
        <p className="project-text">{t("My homelab began as a learning project for Proxmox. Early on, I set up the machine with TrueNAS. Later, Wolfgang’s homelab became an inspiration, through his YouTube channel and repositories. Over time, my own setup grew into something my family uses as a cloud, for example with Immich, and as a NAS.")}</p>
        <p className="project-text">{t("I now also use it to run different services myself and to build a lab environment for learning. Today, my NixOS configuration ties the system and services together. The NixOS article covers that configuration; this one follows the homelab’s development and the applications it supports.")}</p>
      </ProjectSection>
      <ProjectSection id="hardware" title={t("The machine behind the homelab")}>
        <p className="project-text">{t("The server sits in a Fractal Node case. The NAS hard drives were added after the initial build, alongside the Kingston NVMe SSD. This is the hardware behind the family services and lab environment.")}</p>
        <table className="w-full text-sm text-left">
          <thead><tr><th scope="col">{t("Component")}</th><th scope="col">{t("Hardware")}</th></tr></thead>
          <tbody>
            <tr><th scope="row" className="font-normal pr-4">{t("Processor")}</th><td>{t("AMD Ryzen 5 7600 · 6 cores")}</td></tr>
            <tr><th scope="row" className="font-normal pr-4">{t("Memory")}</th><td>{t("Kingston 32 GB (2 × 16 GB) · DDR5-6000 · CL30")}</td></tr>
            <tr><th scope="row" className="font-normal pr-4">{t("NVMe SSD")}</th><td>{t("Kingston NV2 · 2 TB · M.2 2280")}</td></tr>
            <tr><th scope="row" className="font-normal pr-4">{t("NAS storage")}</th><td>{t("Additional NAS hard drives, added later")}</td></tr>
            <tr><th scope="row" className="font-normal pr-4">{t("Motherboard")}</th><td>{t("ASRock B650M Pro RS · AM5 · micro-ATX")}</td></tr>
            <tr><th scope="row" className="font-normal pr-4">{t("Case")}</th><td>{t("Fractal Node")}</td></tr>
            <tr><th scope="row" className="font-normal pr-4">{t("Power supply")}</th><td>{t("Corsair RM650 · 650 W")}</td></tr>
          </tbody>
        </table>
      </ProjectSection>
      <ProjectSection id="services" title={t("From family files to self-hosted applications")}>
        <p className="project-text">{t("The configuration brings together tools for different kinds of files. Immich handles photos and videos, Paperless-ngx provides document processing, and Syncthing adds synchronisation. Homepage gathers links and widgets, ConvertX adds conversion tools, and Samba provides file shares.")}</p>
      </ProjectSection>
      <ProjectSection id="web" title={t("A web entry point for each service")}>
        <p className="project-text">{t("Caddy provides the web routes. The application modules add virtual hosts that proxy to local service ports. Immich and the Syncthing interface are explicitly bound to loopback addresses in their definitions. The Caddy build includes the Cloudflare DNS plugin for certificate validation, with the API token referenced through an environment file supplied by sops-nix.")}</p>
        <p className="project-text">{t("Tailscale is enabled as a separate access layer, and the firewall configuration trusts its interface. That does not mean every service in the repository is reachable only through Tailscale. Samba, the dashboard and container port mappings have their own exposure settings. Reading those together is part of understanding the setup.")}</p>
        <ProjectDiagram
          src="/images/projects/homelab/architecture.svg"
          alt={t("Caddy web routes forward to locally configured application endpoints. Applications use persistent data directories. Samba and Tailscale are separate parts of the configuration, not an implied mandatory gateway for every service.")}
          caption={t("The web path described by the modules. Samba sharing and Tailscale access are configured separately.")}
          width={640} height={940}
        />
      </ProjectSection>
      <ProjectSection id="documents" title={t("Following a document into Paperless")}>
        <p className="project-text">{t("Paperless has separate data, media and consumption directories. The module configures OCR for German and English and supplies the initial admin password through a secret file. A Samba share points at the consumption directory, with its own ownership and permission settings.")}</p>
        <p className="project-text">{t("That connection makes permissions a practical part of the design. A file arriving through a share must be readable by the application that will consume it. The declared user, group and directory modes describe the intended hand-off; a real end-to-end check would place a document in the share and follow it into the application.")}</p>
      </ProjectSection>
      <ProjectSection id="data" title={t("Configuration is only one part of the machine")}>
        <p className="project-text">{t("The modules give application data explicit locations. Immich has a media directory, Paperless has several document-related directories, Syncthing has its data and configuration directories, and ConvertX mounts a persistent host directory. A rebuild of the system configuration is a different operation from restoring those files and application databases.")}</p>
        <p className="project-text">{t("The reviewed repository does not contain an automated backup and restore procedure for the applications. I would treat that as a separate next step, with application-aware backups and an actual restore check. File synchronisation alone would not demonstrate that such a recovery works.")}</p>
      </ProjectSection>
      <ProjectSection id="checks" title={t("What is checked, and what still needs a running host")}>
        <p className="project-text">{t("All eleven Nix files passed the syntax check for this article. The described service connections come from their module definitions. A functional test on the running host, including document processing and synchronisation, is still a separate step.")}</p>
        <p className="project-text">{t("The next useful checks are concrete: open each web route, process a document, check file ownership, synchronise a test folder and restore a small backup. Those checks would tell me more about day-to-day operation than the fact that a service has enable = true in its module.")}</p>
      </ProjectSection>
      <ProjectSection id="next" title={t("The next addition is monitoring")}>
        <p className="project-text">{t("Monitoring is the next planned addition to the homelab. It is not implemented yet. I want the project page to grow with the actual setup, so the monitoring work will get its own implementation details and results when it exists.")}</p>
      </ProjectSection>
      <ProjectSection id="sources" title={t("Configuration and inspiration")}>
        <ul className="project-list">
          <li><a href="https://github.com/DimitriosNicolay/nix-config" target="_blank" rel="noopener noreferrer">{t("Homelab service modules in nix-config")}</a></li>
          <li><Link href={localizedPath("/projects/nixos-config", locale)}>{t("How the NixOS configuration fits together")}</Link></li>
          <li><a href="https://www.youtube.com/@WolfgangsChannel" target="_blank" rel="noopener noreferrer">{t("Wolfgang’s Channel — homelab inspiration")}</a></li>
          <li><a href="https://git.notthebe.ee/notthebee" target="_blank" rel="noopener noreferrer">{t("Wolfgang’s repositories")}</a></li>
        </ul>
      </ProjectSection>
    </ProjectArticle>
  );
}
