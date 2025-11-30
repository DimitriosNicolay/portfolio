# Portfolio Deployment Guide - Hetzner VPS

Complete guide to deploy your Next.js portfolio and self-hosted Plausible Analytics on a Hetzner VPS with Let's Encrypt SSL.

## 📋 Prerequisites

- Hetzner Cloud account
- Domain `dnicolay.de` with DNS access
- SSH key for server access

---

## 1️⃣ Create Hetzner VPS

### Create Server:
1. Go to [Hetzner Cloud Console](https://console.hetzner.cloud/)
2. Create new project: "Portfolio"
3. Add Server:
   - **Location:** Nuremberg (or nearest)
   - **Image:** Ubuntu 24.04
   - **Type:** CX22 (2 vCPU, 4GB RAM) - €4.15/month
   - **Networking:** IPv4 + IPv6
   - **SSH Key:** Add your public SSH key
   - **Name:** portfolio-server

4. Note the server IP address (e.g., `95.217.xxx.xxx`)

---

## 2️⃣ Configure DNS

Add these DNS records in your domain registrar:

```
A     dnicolay.de              95.217.xxx.xxx
A     analytics.dnicolay.de    95.217.xxx.xxx
AAAA  dnicolay.de              [IPv6 from Hetzner]
AAAA  analytics.dnicolay.de    [IPv6 from Hetzner]
```

Wait 5-10 minutes for DNS propagation. Test with:
```bash
dig dnicolay.de
dig analytics.dnicolay.de
```

---

## 3️⃣ Initial Server Setup

### Connect to server:
```bash
ssh root@95.217.xxx.xxx
```

### Update system:
```bash
apt update && apt upgrade -y
```

### Create non-root user:
```bash
adduser deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
cp /root/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

### Logout and reconnect as deploy user:
```bash
exit
ssh deploy@95.217.xxx.xxx
```

---

## 4️⃣ Install Dependencies

### Install Docker:
```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker deploy
```

### Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git
```

### Install Nginx:
```bash
sudo apt install -y nginx
```

### Install Certbot for Let's Encrypt:
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Logout and login again (for Docker group):
```bash
exit
ssh deploy@95.217.xxx.xxx
```

---

## 5️⃣ Setup Project Directory

### Create application directory:
```bash
mkdir -p ~/apps
cd ~/apps
```

### Clone your portfolio repository:
```bash
git clone https://github.com/DimitriosNicolay/portfolio.git
cd portfolio
```

---

## 6️⃣ Configure Docker Compose

### Copy production config:
```bash
cp docker-compose.production.yml.example docker-compose.production.yml
```

### Create ClickHouse config directory:
```bash
mkdir -p clickhouse
cat > clickhouse/clickhouse-config.xml << 'EOF'
<clickhouse>
    <logger>
        <level>warning</level>
        <console>true</console>
    </logger>
</clickhouse>
EOF

cat > clickhouse/clickhouse-user-config.xml << 'EOF'
<clickhouse>
    <profiles>
        <default>
            <log_queries>0</log_queries>
            <log_query_threads>0</log_query_threads>
        </default>
    </profiles>
</clickhouse>
EOF
```

### Generate secrets:
```bash
# Generate SECRET_KEY_BASE (64 chars)
echo "SECRET_KEY_BASE=$(openssl rand -base64 48)"

# Generate TOTP_VAULT_KEY (32 chars)
echo "TOTP_VAULT_KEY=$(openssl rand -base64 24)"
```

### Edit docker-compose.production.yml:
```bash
nano docker-compose.production.yml
```

Replace these values in the `plausible` service:
- `CHANGEME_GENERATE_A_RANDOM_64_CHAR_STRING` → Your SECRET_KEY_BASE
- `CHANGEME_GENERATE_A_RANDOM_32_CHAR_STRING` → Your TOTP_VAULT_KEY

Save and exit (Ctrl+X, Y, Enter)

---

## 7️⃣ Build and Start Services

### Build the portfolio Docker image:
```bash
docker build -t portfolio:latest .
```

### Start all services:
```bash
docker compose -f docker-compose.production.yml up -d
```

### Check that services are running:
```bash
docker compose -f docker-compose.production.yml ps
```

You should see:
- `plausible_db` (running)
- `plausible_events_db` (running)  
- `plausible` (running)
- `portfolio` (running)

### Check logs:
```bash
# All services
docker compose -f docker-compose.production.yml logs -f

# Just portfolio
docker compose -f docker-compose.production.yml logs -f portfolio

# Just Plausible
docker compose -f docker-compose.production.yml logs -f plausible
```

Wait for Plausible to show: "Application started successfully" (1-2 minutes)

---

## 8️⃣ Configure Nginx with Let's Encrypt SSL

### Create Nginx config for portfolio:
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Paste this:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name dnicolay.de www.dnicolay.de;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Create Nginx config for Plausible:
```bash
sudo nano /etc/nginx/sites-available/analytics
```

Paste this:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name analytics.dnicolay.de;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Enable sites:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/analytics /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

### Test Nginx config:
```bash
sudo nginx -t
```

### Reload Nginx:
```bash
sudo systemctl reload nginx
```

---

## 9️⃣ Setup Let's Encrypt SSL

### Obtain SSL certificates:
```bash
sudo certbot --nginx -d dnicolay.de -d www.dnicolay.de -d analytics.dnicolay.de
```

Follow prompts:
- Enter email: `mail@dnicolay.de`
- Agree to ToS: Yes
- Share email: No
- Redirect HTTP to HTTPS: Yes (recommended)

### Verify auto-renewal:
```bash
sudo certbot renew --dry-run
```

---

## 🔟 Setup Plausible Admin Account

### Visit Plausible:
```
https://analytics.dnicolay.de/register
```

1. Create admin account (use strong password!)
2. Add website: `dnicolay.de`
3. Note the tracking script (already in your site)

---

## 1️⃣1️⃣ Setup Firewall

### Configure UFW:
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Check status:
```bash
sudo ufw status
```

---

## 1️⃣2️⃣ Verify Deployment

### Test portfolio:
```
https://dnicolay.de
```

### Test Plausible:
```
https://analytics.dnicolay.de
```

### Check SSL:
```
https://www.ssllabs.com/ssltest/analyze.html?d=dnicolay.de
```

---

## 🔄 Update Portfolio (Future Deployments)

```bash
cd ~/apps/portfolio
git pull
docker build -t portfolio:latest .
docker compose -f docker-compose.production.yml up -d portfolio
```

Or rebuild everything:
```bash
docker compose -f docker-compose.production.yml down
docker compose -f docker-compose.production.yml up -d --build
```

---

## 🛠️ Useful Commands

### Check all container logs:
```bash
cd ~/apps/portfolio
docker compose -f docker-compose.production.yml logs -f
```

### Check specific service:
```bash
docker compose -f docker-compose.production.yml logs -f portfolio
docker compose -f docker-compose.production.yml logs -f plausible
```

### Restart services:
```bash
docker compose -f docker-compose.production.yml restart portfolio
docker compose -f docker-compose.production.yml restart plausible
```

### Stop all services:
```bash
docker compose -f docker-compose.production.yml down
```

### Start all services:
```bash
docker compose -f docker-compose.production.yml up -d
### Check running processes:
```bash
docker compose -f docker-compose.production.yml ps
docker stats
```o systemctl restart nginx
```

### Renew SSL manually:
```bash
sudo certbot renew
```

### Check disk space:
```bash
df -h
```

### Check running processes:
```bash
pm2 status
docker ps
```

---

## 🔒 Security Recommendations

1. **Change SSH port** (optional but recommended):
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Change Port 22 to something like 2222
   sudo systemctl restart ssh
   sudo ufw allow 2222
   sudo ufw delete allow 22
   ```

2. **Setup automatic security updates**:
   ```bash
   sudo apt install unattended-upgrades
   sudo dpkg-reconfigure -plow unattended-upgrades
   ```

3. **Regular backups** of Plausible data:
   ```bash
   cd ~/apps/portfolio
   docker compose -f docker-compose.production.yml exec plausible_db pg_dump -U postgres plausible_db > backup_$(date +%Y%m%d).sql
   ```

---

## 📊 Monitoring

### Setup monitoring alerts:
- Hetzner Cloud Console has built-in monitoring
- Consider: Uptime Robot (free, external monitoring)
- Log into Plausible analytics regularly to check stats

---

## 🆘 Troubleshooting

### Portfolio not loading:
```bash
cd ~/apps/portfolio
docker compose -f docker-compose.production.yml logs portfolio
docker compose -f docker-compose.production.yml restart portfolio
sudo nginx -t
sudo systemctl status nginx
```

### Plausible not loading:
```bash
cd ~/apps/portfolio
docker compose -f docker-compose.production.yml logs plausible
docker compose -f docker-compose.production.yml ps
docker compose -f docker-compose.production.yml restart plausible
```

### SSL certificate issues:
```bash
sudo certbot certificates
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

### Out of disk space:
```bash
# Clean Docker
docker system prune -a

# Clean logs
pm2 flush
sudo journalctl --vacuum-time=7d
```

---

## 💰 Monthly Costs

- Hetzner CX22 VPS: **€4.15/month**
- Domain (already owned): **€0**
- SSL Certificate (Let's Encrypt): **€0**

**Total: €4.15/month**

---

## 🎉 You're Done!

Your portfolio is now live with:
- ✅ HTTPS with Let's Encrypt SSL
- ✅ Self-hosted Plausible Analytics
- ✅ Automatic SSL renewal
- ✅ Professional deployment setup
- ✅ Full data ownership

Visit: **https://dnicolay.de**
