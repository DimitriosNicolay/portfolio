import ProjectArticle, { ProjectSection, ProjectDiagram } from "@/components/ProjectArticle";
import { getContentTranslator } from "@/content/translate";
import { type Locale } from "@/lib/i18n/routing";

export default function Project({ locale = "en" }: { locale?: Locale }) {
  const t = getContentTranslator(locale);
  return (
    <ProjectArticle locale={locale} title={t("Portfolio: the site behind these projects")} intro={t("This is where I collect the things I build. The site itself has a few moving parts too, from the animated background to the path a change takes before it reaches the server.")} eyebrow={t("Web · Personal project")}
      tags={["Next.js", "TypeScript", "Three.js", "Docker", "GitHub Actions"]}>
      <ProjectSection id="starting-point" title={t("The project is the portfolio itself")}>
        <p className="project-text">{t("You are already looking at the result of this project. The pages bring together my infrastructure work, experiments and learning projects. That gives the site two jobs: make the projects easy to read, and give me a concrete application to build and operate.")}</p>
        <p className="project-text">{t("The current version uses Next.js 16, React and TypeScript. The layout is deliberately restrained, with a light and dark theme and a moving WebGL background. The articles carry the detail; the surrounding interface stays fairly quiet.")}</p>
      </ProjectSection>
      <ProjectSection id="pages" title={t("Readable pages first, interaction around them")}>
        <p className="project-text">{t("Next.js generates the project pages as static HTML during the build. The articles are server components. Interactive parts such as the project pagination, contact menu and theme control run in the browser. The page content is there before those controls become interactive.")}</p>
        <p className="project-text">{t("For the two languages, English keeps the original URLs and German lives under /de. Both versions use the same page components with translated copy. Separate root layouts set the document language, and each page links to its equivalent in the other language. Switching language also keeps the query string and section anchor.")}</p>
        <ProjectDiagram
          src="/images/projects/portfolio/architecture.svg"
          alt={t("Next.js generates article HTML. React makes browser controls interactive. Three.js renders the background, while the content remains normal HTML.")}
          caption={t("The article and the visual layer have different jobs. The background is a canvas behind the HTML content.")}
          width={640} height={940}
        />
      </ProjectSection>
      <ProjectSection id="background" title={t("A little movement, without rebuilding the scene")}>
        <p className="project-text">{t("The background uses Three.js through React Three Fiber. A fragment shader combines several layers of noise into a smoke-like texture. Time moves those layers, and the mouse position distorts them. It is a generated effect, so there is no background video to download.")}</p>
        <p className="project-text">{t("The theme and mouse position are shader uniforms. Their values move gradually towards the new state in the render loop. The uniform objects remain stable when the theme changes, so the same scene can transition between light and dark. The theme preference is stored in localStorage; the control still works if storage is unavailable.")}</p>
      </ProjectSection>
      <ProjectSection id="release" title={t("From a commit to a container")}>
        <p className="project-text">{t("The release workflow starts on pushes to main. It runs the repository checks, builds the Docker image and pushes it to GHCR with a tag tied to the commit. The final container runs the Next.js standalone server as an unprivileged user. The deployment script selects that commit tag rather than relying on latest.")}</p>
        <p className="project-text">{t("The SSH deployment stages and validates the new configuration before replacing the live files. It recreates the website service and checks for an HTTP 200 response. If startup or that check fails, the script attempts to restore the previous image and environment. That is a recovery path in the code, not a claim of uninterrupted deployment. The backend services are not recreated by this website release step.")}</p>
        <ProjectDiagram
          src="/images/projects/portfolio/release.svg"
          alt={t("GitHub Actions runs checks and builds the image. GHCR holds the commit-tagged image. An SSH script updates the website container and checks HTTP health, with restoration of the previous image and environment on failure.")}
          caption={t("The release path implemented in the workflow and deployment scripts. An HTTP check confirms that the site answers, not that every feature works.")}
          width={640} height={1260}
        />
      </ProjectSection>
      <ProjectSection id="checks" title={t("Checking more than whether it builds")}>
        <p className="project-text">{t("The repository has TypeScript, lint and production-build checks. Four language tests check route conversion, alternate-language metadata and translation completeness. Seven Python tests exercise the deployment scripts with simulated commands, including failed pulls and restoration after a failed start. Those tests do not contact the production server.")}</p>
        <p className="project-text">{t("The recent local browser review covered both languages, light and dark themes, navigation and layouts down to 320 pixels. Production analytics requests were blocked during that review. It checks the local build; the state of a live deployment is a separate thing to verify.")}</p>
      </ProjectSection>
      <ProjectSection id="next" title={t("The next improvements are small and practical")}>
        <p className="project-text">{t("There are still useful edges to work on. The smooth-scrolling layer respects reduced-motion preferences, but the WebGL animation does not yet turn itself off for that setting. A static background fallback would also help if WebGL is unavailable. Performance on lower-powered devices deserves its own measurement rather than a broad claim that the animation is cheap.")}</p>
        <p className="project-text">{t("For the content, the next step is the one happening here: turning short project summaries into articles that explain what I actually built, how the pieces fit together and what still needs work.")}</p>
      </ProjectSection>
      <ProjectSection id="sources" title={t("Code and implementation")}>
        <ul className="project-list">
          <li><a href="https://github.com/DimitriosNicolay/portfolio" target="_blank" rel="noopener noreferrer">{t("Portfolio repository")}</a></li>
        </ul>
      </ProjectSection>
    </ProjectArticle>
  );
}
