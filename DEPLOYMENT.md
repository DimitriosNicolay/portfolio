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
sudo apt install -y nodejs
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

## 5️⃣ Deploy Plausible Analytics

### Create directory structure:
```bash
mkdir -p ~/plausible
cd ~/plausible
```

### Create docker-compose.yml:
```bash
cat > docker-compose.yml << 'EOF'
version: "3.8"

services:
  plausible_db:
    image: postgres:16-alpine
    restart: always
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=postgres

  plausible_events_db:
    image: clickhouse/clickhouse-server:24.3.3.102-alpine
    restart: always
    volumes:
      - event-data:/var/lib/clickhouse
      - event-logs:/var/log/clickhouse-server
      - ./clickhouse/clickhouse-config.xml:/etc/clickhouse-server/config.d/logging.xml:ro
      - ./clickhouse/clickhouse-user-config.xml:/etc/clickhouse-server/users.d/logging.xml:ro
    ulimits:
      nofile:
        soft: 262144
        hard: 262144

  plausible:
    image: ghcr.io/plausible/community-edition:v2.1.1
    restart: always
    command: sh -c "sleep 10 && /entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh run"
    depends_on:
      - plausible_db
      - plausible_events_db
    ports:
      - "127.0.0.1:8000:8000"
    environment:
      - BASE_URL=https://analytics.dnicolay.de
      - SECRET_KEY_BASE=CHANGEME_GENERATE_A_RANDOM_64_CHAR_STRING
      - TOTP_VAULT_KEY=CHANGEME_GENERATE_A_RANDOM_32_CHAR_STRING
      - DATABASE_URL=postgres://postgres:postgres@plausible_db:5432/plausible_db
      - CLICKHOUSE_DATABASE_URL=http://plausible_events_db:8123/plausible_events_db

volumes:
  db-data:
    driver: local
  event-data:
    driver: local
  event-logs:
    driver: local
EOF
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

### Generate SECRET_KEY_BASE (64 chars):
```bash
openssl rand -base64 48
```

### Generate TOTP_VAULT_KEY (32 chars):
```bash
openssl rand -base64 24
```

### Edit docker-compose.yml and replace:
```bash
nano docker-compose.yml
# Replace CHANGEME_GENERATE_A_RANDOM_64_CHAR_STRING with SECRET_KEY_BASE
# Replace CHANGEME_GENERATE_A_RANDOM_32_CHAR_STRING with TOTP_VAULT_KEY
```

### Start Plausible:
```bash
docker compose up -d
```

### Check logs:
```bash
docker compose logs -f plausible
```

Wait for: "Application started successfully" (takes 1-2 minutes)

---

## 6️⃣ Deploy Portfolio Website

### Clone repository:
```bash
cd ~
git clone https://github.com/DimitriosNicolay/portfolio.git
cd portfolio
```

### Install dependencies:
```bash
npm install
```

### Build production bundle:
```bash
npm run build
```

### Install PM2 for process management:
```bash
sudo npm install -g pm2
```

### Start Next.js with PM2:
```bash
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
# Copy and run the command PM2 outputs
```

### Verify it's running:
```bash
pm2 status
curl localhost:3000
```

---

## 7️⃣ Configure Nginx with Let's Encrypt SSL

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

## 8️⃣ Setup Let's Encrypt SSL

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

## 9️⃣ Setup Plausible Admin Account

### Visit Plausible:
```
https://analytics.dnicolay.de/register
```

1. Create admin account (use strong password!)
2. Add website: `dnicolay.de`
3. Note the tracking script (already in your site)

---

## 🔟 Setup Firewall

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

## ✅ Verify Deployment

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
cd ~/portfolio
git pull
npm install
npm run build
pm2 restart portfolio
```

---

## 🛠️ Useful Commands

### Check portfolio logs:
```bash
pm2 logs portfolio
```

### Check Plausible logs:
```bash
cd ~/plausible
docker compose logs -f plausible
```

### Restart Nginx:
```bash
sudo systemctl restart nginx
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
   cd ~/plausible
   docker compose exec plausible_db pg_dump -U postgres plausible_db > backup.sql
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
pm2 logs portfolio
sudo nginx -t
sudo systemctl status nginx
```

### Plausible not loading:
```bash
cd ~/plausible
docker compose logs plausible
docker compose ps
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
