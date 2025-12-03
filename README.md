# Portfolio Website

A modern, performant portfolio website built with Next.js, featuring custom WebGL backgrounds and self-hosted analytics.

## Features

- **Modern Tech Stack**: Next.js 16, React 19, TypeScript
- **3D Graphics**: Custom WebGL shaders with Three.js and React Three Fiber
- **Smooth Animations**: Lenis smooth scrolling and Framer Motion
- **Dark Mode**: System-aware theme with manual toggle
- **Privacy-First Analytics**: Self-hosted Plausible Analytics (optional)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **GDPR Compliant**: Includes privacy policy and legal notice pages for German compliance

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Icons**: Simple Icons, Font Awesome
- **Animations**: Lenis smooth scroll
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DimitriosNicolay/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Home page
│   ├── privacy-policy/      # Privacy policy page (GDPR)
│   ├── legal-notice/        # Legal notice page (Impressum)
│   └── projects/            # Individual project pages
├── components/              # React components
│   ├── HeroSection.tsx      # Landing section
│   ├── AboutSection.tsx     # About information
│   ├── TechStackSection.tsx # Technology showcase
│   ├── ProjectsSection.tsx  # Project cards with pagination
│   ├── ContactSidebar.tsx   # Fixed contact sidebar
│   ├── Footer.tsx           # Site footer
│   ├── WebGLBackground.tsx  # Custom shader background
│   └── ThemeToggle.tsx      # Dark mode toggle
├── contexts/                # React contexts
│   └── ThemeContext.tsx     # Theme management
└── public/                  # Static assets
```

## Customization

### Personal Information

Update your information in:
- `components/HeroSection.tsx` - Name, title, description
- `components/AboutSection.tsx` - Bio and stats
- `components/Footer.tsx` - Social links and subtitle
- `app/legal-notice/page.tsx` - Legal information (if needed)
- `app/privacy-policy/page.tsx` - Privacy policy (if needed)

### Projects

Add or modify projects in `components/ProjectsSection.tsx`. Each project can have a dedicated page in `app/projects/[slug]/page.tsx`.

### Tech Stack

Update technologies in `components/TechStackSection.tsx`. Icons are from Simple Icons library.

### Theme

Customize colors in `app/globals.css` and Tailwind configuration.

## Deployment

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t portfolio:latest .
```

2. Run the container:
```bash
docker run -p 3000:3000 portfolio:latest
```

### Docker Compose with Plausible Analytics

For a complete setup with self-hosted analytics:

1. Copy the example configuration:
```bash
cp docker-compose.production.yml.example docker-compose.production.yml
```

2. Generate secrets:
```bash
# SECRET_KEY_BASE (64 chars)
openssl rand -base64 48

# TOTP_VAULT_KEY (32 bytes = 64 hex chars)
openssl rand -hex 32
```

3. Edit `docker-compose.production.yml` and update:
   - `SECRET_KEY_BASE` with your generated secret
   - `TOTP_VAULT_KEY` with your generated key
   - `BASE_URL` with your analytics domain

4. Start all services:
```bash
docker compose -f docker-compose.production.yml up -d
```

The portfolio will be available on port 3000 and Plausible on port 8000.

## Analytics Integration

To enable Plausible Analytics, update `app/layout.tsx` with your analytics script:

```tsx
<script defer data-domain="yourdomain.com" src="https://analytics.yourdomain.com/js/script.js"></script>
```

## Legal Compliance

This template includes directories for German legal requirements:
- `app/privacy-policy/` - For Datenschutzerklärung (Privacy Policy)
- `app/legal-notice/` - For Impressum (Legal Notice)

See the README files in each directory for implementation guidance.

## Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

This project is open source and available under the MIT License.

## Contact

For questions or feedback, feel free to reach out through the contact information on the website.
