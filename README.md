# Portfolio Website

A performant, production-ready portfolio built with Next.js, featuring custom WebGL backgrounds, automated CI/CD, and self-hosted privacy-first analytics.

## Architecture & Tech Stack

**Frontend & UI**
- Framework: Next.js 16 (App Router), React 19, TypeScript
- Styling: Tailwind CSS
- 3D Graphics: Three.js, React Three Fiber, custom WebGL shaders
- Animation: Lenis smooth scroll, Framer Motion

**Infrastructure & Deployment**
- **Proxy/SSL:** Caddy + Cloudflare Origin Certificates (Full Strict Mode)
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Registry:** GitHub Container Registry (GHCR)
- **Analytics:** Self-hosted Plausible Analytics (PostgreSQL + ClickHouse)

## Local Development

### Prerequisites
- Node.js 20+
- npm or pnpm

### Setup

1. Clone and install:

```bash
git clone [https://github.com/DimitriosNicolay/portfolio.git](https://github.com/DimitriosNicolay/portfolio.git)
cd portfolio
npm install
```

2. Run the development server:

```Bash
npm run dev

Access the site at http://localhost:3000.
```

## Production Deployment

This project uses a fully automated GitOps pipeline. Merging or pushing to the `main` branch automatically triggers a build and deploys the updated Docker image to the production VPS via SSH.

### 1. Server Provisioning
The production environment expects a standard Linux VPS with Docker installed. The stack is deployed to `/opt/stacks/portfolio`.

You must manually create the directory structure and configuration files on the host before the first deployment. **Do not commit these files to Git.**

```bash
mkdir -p /opt/stacks/portfolio/certs
```

**`certs/cert.pem` & `certs/key.pem`**
Generate an Origin Certificate in your Cloudflare dashboard and save the public and private keys in these files.

**`Caddyfile`** (Reverse Proxy & SSL)
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

**`.env`** (Secrets Management)
```env
# Plausible Analytics Configuration
BASE_URL=[https://analytics.yourdomain.com](https://analytics.yourdomain.com)
SECRET_KEY_BASE=<generate_with_openssl_rand_base64_48>
TOTP_VAULT_KEY=<generate_with_openssl_rand_hex_32>
POSTGRES_PASSWORD=<secure_db_password>
```

### 2. CI/CD Pipeline (GitHub Actions)
The workflow located in `.github/workflows/deploy.yml` handles the automated rollout:
1. Builds the Next.js application into an optimized Docker image.
2. Pushes the image to GHCR (`ghcr.io/dimitriosnicolay/portfolio`).
3. Authenticates with the production VPS via SSH.
4. Pulls the latest image and executes a zero-downtime container recreation using `docker compose`.
5. Prunes dangling images to manage host disk space.

Required GitHub Repository Secrets:
- `VPS_HOST`: Server IP address
- `VPS_USER`: Deployment user (e.g., `deploy`)
- `VPS_SSH_KEY`: ED25519 private key authorized on the VPS

## License
MIT