import ProjectArticle, { ProjectSection, ProjectDiagram } from "@/components/ProjectArticle";
import { getContentTranslator } from "@/content/translate";
import { type Locale } from "@/lib/i18n/routing";

export default function Project({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <ProjectArticle locale={locale} title={t("Edge IaC: from a VM definition to a routing node")} intro={t("My IHK final project at Gentlent brought VM provisioning, DNS and system configuration into one workflow. The tricky part was deciding which steps should run together, and which needed their own boundary.")} eyebrow={t("Infrastructure · IHK final project at Gentlent")}
      tags={["CDKTF", "TypeScript", "Terraform", "Ansible", "BGP"]}>
      <ProjectSection id="starting-point" title={t("A server was only the first step")}>
        <p className="project-text">{t("The starting point was a manual process for adding edge capacity. Creating the VM was followed by operating-system configuration, SSH and firewall changes, DNS, routing setup and integration into the surrounding infrastructure. The work crossed several tools and systems before a node could be useful.")}</p>
        <p className="project-text">{t("I worked on this as my final project for the IT specialist qualification during my internship at Gentlent. The goal was a repeatable provisioning and configuration workflow. The project documentation also keeps an important boundary explicit: the generated core-router configuration is reviewed and applied manually before final routing activation.")}</p>
      </ProjectSection>
      <ProjectSection id="stacks" title={t("Why I split the workflow into two stacks")}>
        <p className="project-text">{t("The documented design separates a VM stack from a post-deploy stack. The VM stack creates the provider resources and exposes their addresses. The post-deploy stack handles DNS and invokes Ansible using generated inventory. A wrapper coordinates the order, waits for the VM and checks SSH reachability before continuing.")}</p>
        <p className="project-text">{t("This split came out of a concrete difficulty in the first design. Ansible was called through a local-exec provisioner, and a timestamp trigger changed whenever CDKTF synthesised the configuration. A later deployment could therefore invoke configuration again, including connection attempts against a machine whose SSH settings had already changed. Waiting for that attempt could also keep the Terraform state locked.")}</p>
        <p className="project-text">{t("The documentation describes a separate configure command for later Ansible changes. It does not run those updates through Terraform. That gives initial provisioning and ongoing configuration different entry points, which is the main design decision I would take away from this project.")}</p>
        <ProjectDiagram
          src="/images/projects/edge-iac/architecture.svg"
          alt={t("Typed CDKTF definitions feed the VM stack. Its outputs reach the post-deploy stack for DNS and Ansible configuration. A generated core-router configuration remains subject to manual review and application.")}
          caption={t("The workflow described in the IHK documentation. The final core-router change is an explicit manual step.")}
          width={640} height={1260}
        />
      </ProjectSection>
      <ProjectSection id="configuration" title={t("Give each Ansible role one part of the job")}>
        <p className="project-text">{t("The playbook is divided into operating-system setup, network settings, SSH, Docker and BGP roles. That makes the sequence visible. Basic packages and settings come first, then access and firewall changes, followed by the services the node needs. Bird2 templates describe the routing side, including filters and RPKI-related configuration.")}</p>
        <p className="project-text">{t("The DNS step uses the addresses produced by provisioning to create A and AAAA records. The core-router configuration is generated as a file for review. These are different outputs of the same workflow: one is applied through the provider API, the other deliberately waits for a person to check it.")}</p>
      </ProjectSection>
      <ProjectSection id="failure" title={t("Automation still needs a clear stopping point")}>
        <p className="project-text">{t("The documentation describes a failed Ansible call stopping the deployment with an error. Already created resources can remain for investigation. Provisioning and configuration are not one atomic operation, so an error needs to be read alongside the state left behind.")}</p>
        <p className="project-text">{t("For the routing side, the manual core-router review matters as much as the automated part. The generated file can be checked before it reaches the router. Provisioning the VM and approving its final connection to the network remain separate steps.")}</p>
      </ProjectSection>
      <ProjectSection id="checks" title={t("The pilot checks in the project record")}>
        <p className="project-text">{t("The project documentation records five pilot checks: VM outputs, DNS resolution, the changed SSH listener, an established BGP session and an established RPKI-RTR session. It marks them as passed in that project context. These are documented past results, not a fresh test against the company network for this article.")}</p>
        <p className="project-text">{t("An established RPKI session shows that the validator connection is up. It does not by itself prove that every route filter works correctly. For a fuller validation, I would want explicit positive and negative route-policy tests alongside checks of repeat deployments and failed configuration runs.")}</p>
      </ProjectSection>
      <ProjectSection id="next" title={t("What I would build on next")}>
        <p className="project-text">{t("My project reflection names the separation of provisioning and configuration as the most demanding decision. It also identifies secret management as an area for improvement. The next steps in the documentation include a dedicated secret-management system, automated checks for Ansible changes and integration into monitoring.")}</p>
        <p className="project-text">{t("The useful part of the project is the connection between tools. A VM definition only becomes an operational workflow when addresses, inventory, access changes and routing approval fit together. The two-stack design made those hand-offs much easier to describe.")}</p>
      </ProjectSection>
      <ProjectSection id="sources" title={t("Project context and sources")}>
        <p className="project-text">{t("This article is based on my IHK project documentation, especially the design, test record and reflection sections. The implementation belongs to the internal Gentlent project repository. Internal addresses, credentials and router-specific configuration are omitted here.")}</p>
      </ProjectSection>
    </ProjectArticle>
  );
}
