import CodeBlock from '@/components/CodeBlock';
import ProjectArticle, { ProjectSection, ProjectDiagram } from "@/components/ProjectArticle";
import { getContentTranslator } from "@/content/translate";
import { localizedPath, type Locale } from "@/lib/i18n/routing";
import Link from "next/link";

export default function Project({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <ProjectArticle locale={locale} title={t("NixOS: the distro that finally clicked")} intro={t("I started with Arch and found NixOS through distro-hopping. Somewhere along the way, trying another distribution turned into finding the one I wanted to keep. Today, its configuration is also the foundation of my homelab.")} eyebrow={t("Linux · Personal project")}
      tags={["NixOS", "Nix Flakes", "sops-nix", "Caddy"]}>
      <ProjectSection id="starting-point" title={t("From fixing Arch to finding NixOS")}>
        <p className="project-text">{t("My route to NixOS was fairly ordinary at first: distro-hopping. I started with Arch, but eventually grew tired of things breaking and needing attention again. When I came across NixOS, it clicked. This was the distribution I wanted to stay with.")}</p>
        <p className="project-text">{t("That is now more than a desktop preference. I use my NixOS configuration for the homelab as well. The public repository currently describes one host, sun, with its system settings and application modules. It gives this article a concrete system to follow.")}</p>
      </ProjectSection>
      <ProjectSection id="composition" title={t("A short flake, a longer chain of imports")}>
        <p className="project-text">{t("The flake follows nixos-unstable and adds sops-nix. Its output defines nixosConfigurations.sun and includes the host configuration alongside the sops-nix module. The lock file records the input revisions for that configuration.")}</p>
        <p className="project-text">{t("The host file then imports the hardware configuration and the service modules. Caddy, Tailscale, Samba, Homepage, Immich, Paperless, Syncthing and ConvertX each have their own file. That keeps a change to one application close to the settings it belongs to.")}</p>
        <CodeBlock language="nix">{"nixosConfigurations.sun = nixpkgs.lib.nixosSystem {\n  specialArgs = { inherit inputs; };\n  modules = [\n    ./machines/sun/configuration.nix\n    sops-nix.nixosModules.sops\n  ];\n};"}</CodeBlock>
        <ProjectDiagram
          src="/images/projects/nixos-config/architecture.svg"
          alt={t("The flake inputs and lock file feed the sun system definition, which combines host settings, hardware configuration, sops-nix and application modules.")}
          caption={t("How the files compose the system definition. This is a view of the configuration, not evidence of a successful rebuild.")}
          width={640} height={940}
        />
      </ProjectSection>
      <ProjectSection id="services" title={t("Native services and a container in the same configuration")}>
        <p className="project-text">{t("Most applications use NixOS service options. For example, the Paperless module declares its data, media and consumption directories, enables the service and configures German and English OCR. It also adds the matching Caddy route. Those parts live together in the application module.")}</p>
        <p className="project-text">{t("ConvertX uses virtualisation.oci-containers. Its module describes the image, port mapping, persistent data mount and an environment setting. It also adds its own Caddy route, keeping the application definition and the web entry point in one place.")}</p>
      </ProjectSection>
      <ProjectSection id="secrets" title={t("Keep the secret references near the services")}>
        <p className="project-text">{t("sops-nix connects encrypted secret declarations to the system. The configuration references an encrypted YAML file and the host SSH key for age-based decryption. The user password comes from a hashed-password file supplied through a declared secret. Caddy and the dashboard refer to their own environment files.")}</p>
        <p className="project-text">{t("This makes the dependencies visible in code. It does not make the repository a backup of the live machine. Application data, the keys needed to decrypt secrets and the current service state still need their own handling.")}</p>
      </ProjectSection>
      <ProjectSection id="checks" title={t("What I could check without touching the host")}>
        <p className="project-text">{t("For this article, all eleven Nix files in the reviewed public revision passed nix-instantiate --parse. That checks syntax. It does not resolve every NixOS option, build the system closure or start a service. No host rebuild or secret decryption was performed for this review.")}</p>
        <p className="project-text">{t("A full flake evaluation and service-level tests would be the next useful checks. I would start by checking the combined module options, then follow an update and a restart through the affected services.")}</p>
      </ProjectSection>
      <ProjectSection id="next" title={t("Make the existing setup easier to rebuild")}>
        <p className="project-text">{t("The next practical improvements are a short README, a documented rebuild and recovery procedure, and explicit choices where the configuration currently relies on defaults. The ConvertX image uses latest, so pinning it would also make that part of the setup easier to reproduce.")}</p>
        <p className="project-text">{t("For me, the configuration connects the two sides of the project: the Linux distribution I settled on and the home server my family uses. More machines and better checks can build on that, while the current setup gives me something practical to keep learning with.")}</p>
      </ProjectSection>
      <ProjectSection id="sources" title={t("Code and the service side")}>
        <ul className="project-list">
          <li><a href="https://github.com/DimitriosNicolay/nix-config" target="_blank" rel="noopener noreferrer">{t("nix-config repository")}</a></li>
          <li><Link href={localizedPath("/projects/homelab", locale)}>{t("The homelab services")}</Link></li>
        </ul>
      </ProjectSection>
    </ProjectArticle>
  );
}
