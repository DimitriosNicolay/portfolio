# Portfolio Website

Personal portfolio for dnicolay.de, built with Next.js 16, React 19, TypeScript and Tailwind CSS. Project pages live in `app/projects/<slug>/page.tsx` and use the shared `project-*` classes in `app/globals.css`.

## Local development

Use Node.js 24 LTS and npm (`.nvmrc` selects the supported major version).

```bash
git clone https://github.com/DimitriosNicolay/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open http://localhost:3000. The development server does not load analytics.

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

The UI uses Arial/system fonts. No Google Fonts download is needed during the build or in the visitor's browser. Three.js supplies the WebGL background, and Lenis supplies smooth scrolling. Tailwind CSS 4 uses the imports, source paths, typography plugin and dark variant in `app/globals.css`; PostCSS loads `@tailwindcss/postcss`.

Tailwind 4 requires modern browsers: Safari 16.4+, Chrome 111+ or Firefox 128+.

TypeScript stays on the supported 6.0 compiler API and ESLint on the 9.x line
because the current React lint plugin does not yet declare ESLint 10 support.
The Typography plugin pins an old CSS selector parser; a scoped override selects
the compatible `postcss-selector-parser` 6.1.5 security fix. Revisit these limits
when their upstream integrations support newer versions.

## Analytics

The root layout loads the self-hosted Plausible CE tracker through `next/script` after hydration in production builds. The existing installation uses `https://analytics.dnicolay.de/js/script.js` with `data-domain="dnicolay.de"`. Its event endpoint is `/api/event` on the same analytics origin. The deployed tracker handles history navigation itself; adding a second route listener would risk duplicate pageviews.

There is no consent banner or consent state in the existing implementation. This change preserves the existing cookieless tracker and its `plausible_ignore` opt-out. It adds no visitor identifier, custom event, cookie or first-party proxy. The privacy policy lives at `/privacy-policy`; technical checks do not establish legal compliance.

The tracker ignores localhost. For local production-browser QA, intercept **both** the script and event endpoint and use an isolated test hostname; never redirect synthetic events to the production collector.

### Diagnose a failed production collector

The production stack runs on a VPS behind Cloudflare, with Caddy routing to the website and analytics containers. `docker-compose.production.yml.example` is a template; the actual Compose file, `.env`, certificates and Caddy configuration are managed on the server.

Start with read-only checks on the VPS, using the actual service names:

```bash
docker compose -f docker-compose.production.yml config --quiet
docker compose -f docker-compose.production.yml ps
docker compose -f docker-compose.production.yml logs --tail=100 plausible plausible_db plausible_events_db
```

Review logs locally for secrets before sharing. Check Caddy separately in its actual stack. The proxy and `plausible` must share a Docker network if the proxy uses `reverse_proxy plausible:8000`. A proxy running on the host instead needs the published loopback port. Verify the actual arrangement before changing it.

Check the script returns JavaScript and health returns success, then check the browser's script and event requests. To verify ingestion, use a separate Plausible test site/domain and confirm an event in that site's dashboard. An HTTP success from the event endpoint alone does not prove ingestion or reporting.

## Deployment configuration

The repository defines a stack with Docker Compose, Caddy, PostgreSQL and ClickHouse. The workflow in `.github/workflows/deploy.yml` first calls the shared checks, builds a container, publishes `latest` and a commit tag to GHCR and updates the VPS stack over SSH. Deployment uses the commit tag `sha-<commit>` rather than `latest`. Pull requests run `.github/workflows/checks.yml`. Docker and CI install from the tracked lockfile with `npm ci`. A push to `main` triggers deployment. Local editing does not authorize a push, merge or deployment.

The SSH workflow uses production files in `/opt/stacks/portfolio`. Keep secrets and certificates out of the repository. For a new deployment, copy `.env.example` to the host and replace all placeholders, including matching PostgreSQL credentials in `POSTGRES_PASSWORD` and `DATABASE_URL`. Changing an environment file does not change credentials already stored in an existing database. The ClickHouse XML files referenced by the template must also exist on the host; they are ignored by Git.

Example Caddy routing, assuming Caddy shares the application's Docker network:

```caddyfile
yourdomain.com {
    tls /etc/caddy/certs/cert.pem /etc/caddy/certs/key.pem
    reverse_proxy portfolio:3000
}
analytics.yourdomain.com {
    tls /etc/caddy/certs/cert.pem /etc/caddy/certs/key.pem
    reverse_proxy plausible:8000
}
```

Set `BASE_URL=https://analytics.yourdomain.com` as a plain URL, without Markdown link syntax. Do not rotate existing keys as part of routine troubleshooting. The single-container Compose recreation in this workflow can interrupt service; it does not establish zero-downtime deployment.

Configure these GitHub Actions repository secrets before deploying:

| Secret | Value |
| --- | --- |
| `VPS_HOST` | Server IP or hostname, without a URL scheme |
| `VPS_USER` | Deployment account with access to the stack directory and Docker |
| `VPS_SSH_KEY` | Dedicated, unencrypted OpenSSH private deployment key |
| `VPS_KNOWN_HOSTS` | Trusted OpenSSH known-hosts line for that exact host |
| `PORTFOLIO_RUNTIME_ENV` | Complete current server `.env`, preserving existing database credentials and signing keys |

GitHub supplies `GITHUB_TOKEN` automatically for GHCR; do not create a separate
secret with that name. Obtain the host key through an existing trusted server
session, rather than trusting a fresh network scan without verification.

The deployment scripts transfer configuration through encrypted SSH standard
input, validate it before installation and replace `.env` atomically with mode
0600. The previous environment is retained privately as `.env.previous`.
Registry credentials are temporary. A failed website start or health check
triggers restoration of the previous environment and exact previous image.
The workflow requires all five secrets; its first real deployment has not yet
been run as part of the local preparation.

Website releases recreate only the `portfolio` service. Backend maintenance is
handled separately. Transferring `.env` does not update already running backend
containers or rotate credentials stored inside a database. Apply backend
configuration changes through a coordinated maintenance operation.

## Languages

English keeps the existing URLs. German pages use `/de`, such as `/de/projects/artifact-gateway`. The DE/EN control beside the theme button opens the equivalent page and keeps query parameters and section anchors. Language is determined by the URL; theme preference continues to use localStorage.

The two root layouts in `app/(en)/layout.tsx` and `app/de/layout.tsx` share `components/SiteLayout.tsx` and set the document language before rendering. Both versions are statically generated. `content/routes.ts` registers page components, titles and canonical/alternate language links. Unknown German paths return 404.

Shared server page components live in `content/pages/`. Their German text is in `content/translations/de.json`; the English source text is the translation key. UI components use `useLocale()` with `lib/i18n/ui.de.json`. Internal links use `localizedPath()` or the context's `href()` helper. Translate new copy in the corresponding dictionary; keep service names, code and diagram labels in English. Run `node --test tests/i18n.test.mjs` to check translation completeness and route conversion.

## Project articles

Use shared TSX content in `content/pages/`, with thin English route pages under `app/(en)/projects/`. Keep the shared styling and image directory convention. The Artifact Gateway example is at `/projects/artifact-gateway`. New article files are local drafts until reviewed; publishing requires explicit approval.

## License

MIT
