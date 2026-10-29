import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as icons from 'simple-icons';

const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function diagram({ slug, file = 'architecture.svg', title, description, nodes, links, footer, height }) {
  const width = 640;
  const brand = (name, x, y) => {
    if (!name) return '';
    const icon = icons[name];
    if (!icon) throw new Error(`Missing icon: ${name}`);
    return `<g transform="translate(${x} ${y})"><rect width="56" height="56" rx="8" fill="#f3f4f6"/><path transform="translate(10 10) scale(1.5)" fill="#${icon.hex}" d="${icon.path}"/></g>`;
  };
  const boxes = nodes.map((node, index) => {
    const y = 120 + index * 260;
    const textX = node.icons ? 425 : node.icon ? 356 : 320;
    return `<rect x="50" y="${y}" width="540" height="148" rx="8" class="node"/>
${node.icons ? node.icons.map((icon, i) => brand(icon, 72 + i * 64, y + 30)).join('') : brand(node.icon, 72, y + 32)}
<text x="${textX}" y="${y + 62}" class="title">${escapeXml(node.title)}</text>
<text x="320" y="${y + 111}" class="label">${escapeXml(node.subtitle)}</text>`;
  }).join('\n');
  const arrows = links.map((label, index) => {
    const y = 120 + index * 260 + 148;
    return `<path d="M320 ${y}v25 M320 ${y + 73}v26" class="line"/>
<text x="320" y="${y + 58}" class="label">${escapeXml(label)}</text>`;
  }).join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">${escapeXml(title)}</title>
<desc id="desc">${escapeXml(description)}</desc>
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M1 1 9 5 1 9" fill="none" stroke="#555" stroke-width="1.5"/></marker></defs>
<style>text{font-family:Arial,sans-serif;fill:#171717;text-anchor:middle}.heading{font-size:28px}.title{font-size:28px}.label{font-size:25px;fill:#454545}.small{font-size:22px;fill:#555}.node{fill:white;stroke:#888;stroke-width:1.5}.line{fill:none;stroke:#555;stroke-width:2.5;marker-end:url(#arrow)}</style>
<rect width="640" height="${height}" fill="#fafafa"/>
<text x="320" y="62" class="heading">${escapeXml(title)}</text>
${boxes}
${arrows}
${footer.map((line, index) => `<text x="320" y="${height - 65 + index * 30}" class="small">${escapeXml(line)}</text>`).join('\n')}
</svg>\n`;
  const directory = join('public/images/projects', slug);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, file), svg);
}

diagram({
  slug: 'portfolio', height: 940,
  title: 'Pages and the visual layer',
  description: 'Next.js generates static article HTML. React hydrates the interactive controls in the browser and mounts the Three.js background canvas. The article remains ordinary HTML.',
  nodes: [
    { icon: 'siNextdotjs', title: 'Next.js', subtitle: 'Static article HTML at build time' },
    { icon: 'siReact', title: 'React', subtitle: 'Interactive controls in the browser' },
    { icon: 'siThreedotjs', title: 'Three.js', subtitle: 'Shader background behind the HTML' },
  ],
  links: ['HTML reaches the browser', 'Mount the background canvas'],
  footer: ['The article remains normal HTML', 'Based on application code'],
});

diagram({
  slug: 'portfolio', file: 'release.svg', height: 1260,
  title: 'A website release',
  description: 'GitHub Actions checks and builds the application, then publishes a commit-tagged image to GHCR. The SSH deployment updates the website container and checks HTTP health. Failure triggers an attempt to restore the previous image and environment.',
  nodes: [
    { icon: 'siGithubactions', title: 'GitHub Actions', subtitle: 'Repository checks + Docker build' },
    { icon: 'siGithub', title: 'GHCR', subtitle: 'Image tagged with the commit SHA' },
    { icon: 'siDocker', title: 'Website container', subtitle: 'Next.js standalone server on a VPS' },
    { icon: 'siNextdotjs', title: 'HTTP health check', subtitle: 'Expect HTTP 200 from the website' },
  ],
  links: ['Push the image', 'Deploy over SSH', 'Check the recreated service'],
  footer: ['On failure: restore previous image + environment', 'Recovery path in code; not a live deployment test'],
});

diagram({
  slug: 'nixos-config', height: 940,
  title: 'Composing the NixOS configuration',
  description: 'The flake and lock file define inputs. nixosConfigurations.sun composes the host and hardware configuration, service modules and sops-nix. This diagram shows declarations, not a completed rebuild.',
  nodes: [
    { icon: 'siNixos', title: 'flake.nix + flake.lock', subtitle: 'nixpkgs + sops-nix inputs' },
    { icon: 'siNixos', title: 'nixosConfigurations.sun', subtitle: 'One declared host' },
    { icon: 'siLinux', title: 'Host + service modules', subtitle: 'System settings, applications, secrets' },
  ],
  links: ['Define the system output', 'Compose the configuration'],
  footer: ['Configuration view · one host in this revision', 'No host rebuild performed for this article'],
});

diagram({
  slug: 'homelab', height: 940,
  title: 'The web-facing application path',
  description: 'Caddy virtual hosts proxy to application endpoints. Immich, Paperless and Syncthing declare persistent data locations. Samba shares and Tailscale access are configured separately; this is not a live reachability test.',
  nodes: [
    { icon: 'siCaddy', title: 'Caddy', subtitle: 'Virtual hosts + local reverse proxy' },
    { icons: ['siImmich', 'siPaperlessngx', 'siSyncthing'], title: 'Services', subtitle: 'Immich · Paperless · Syncthing' },
    { title: 'Persistent application data', subtitle: 'Media, documents, sync + application state' },
  ],
  links: ['Forward web requests', 'Read and write application data'],
  footer: ['Samba and Tailscale are configured separately', 'Based on the public NixOS modules'],
});

diagram({
  slug: 'edge-iac', height: 1260,
  title: 'Provision, configure, then review',
  description: 'CDKTF definitions generate the Terraform configuration. The VM stack provisions the instance and outputs addresses. The post-deploy stack configures DNS and calls Ansible. The core-router configuration is generated for manual review and application.',
  nodes: [
    { icon: 'siTypescript', title: 'CDKTF definitions', subtitle: 'Typed VM and integration settings' },
    { icon: 'siTerraform', title: 'VM stack', subtitle: 'Provider resources + address outputs' },
    { icons: ['siCloudflare', 'siAnsible'], title: 'Post-deploy', subtitle: 'DNS + inventory + Ansible roles' },
    { title: 'Core-router review', subtitle: 'Manual check and application of config' },
  ],
  links: ['Provision infrastructure', 'Pass outputs to configuration', 'Generate configuration for approval'],
  footer: ['From the IHK project documentation', 'Core-router activation is a manual boundary'],
});

