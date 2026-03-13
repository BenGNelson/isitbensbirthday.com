# Is It Ben's Birthday?

A single-page birthday website that detects your local date and shows one of 8 completely different experiences — one per day of the week, plus a special page on July 5th.

## The 8 Experiences

| Trigger | Name | Vibe |
|---------|------|------|
| **July 5th** | IT IS BEN'S BIRTHDAY | Maximum chaos. Confetti. Achievements. Escalating celebrate button. |
| **Sunday** | The Institute of Pre-Birthday Contemporary Art | Stuffy fine-art museum. Every exhibit is an object that is not Ben's birthday. |
| **Monday** | BirthdayCorp™ Enterprise Suite | Corporate dashboard. Login never works. KPIs are bad. Progress bar stuck at 47%. |
| **Tuesday** | URGENT: Form BDY-404 Required | Government portal. 47 fields. Always rejected. |
| **Wednesday** | BirthdAI™ v0.0.1-alpha | A broken AI birthday detection system by Synapse Dynamics LLC. Trained on opossum sleep schedules and hagfish slime viscosity. Operational: 847 days. Detected: 0 birthdays. Buttons multiply over time. |
| **Thursday** | The Hot Dog Appreciation Society | An extremely earnest professional website about hot dogs. The JOIN NOW button runs away from your cursor. |
| **Friday** | Opossum Behavioral Research Institute | A completely sincere academic institute conducting continuous field observation to determine whether it is Ben's birthday. Every study concludes it is not. Founded in 1987 / Est. 2003 / Since 1991. |
| **Saturday** | Chrono-Celebration Nexus (Offline) | Sci-fi portal, currently offline. The CAPTCHA only shows hot dogs. It always fails. |

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) + [Docker Compose](https://docs.docker.com/compose/install/) (v2) — local dev only
- `git`
- For deployment: SSH access to a DigitalOcean (or any Ubuntu) droplet running Apache2

---

## Local Development

```bash
# 1. Clone the repo
git clone <your-repo-url> isitbensbirthday
cd isitbensbirthday

# 2. Start the site
docker compose up

# 3. Open http://localhost:8080
```

The `docker-compose.yml` mounts `./site` as a volume, so **edits to HTML/CSS/JS are reflected immediately** — just refresh the browser. No rebuild needed during development.

To stop: `docker compose down`

---

## Testing Each Experience

Add a URL parameter to force a specific day without waiting for the right date:

| URL | What you see |
|-----|-------------|
| `http://localhost:8080/?day=birthday` | July 5th birthday page |
| `http://localhost:8080/?day=0` | Sunday (Museum) |
| `http://localhost:8080/?day=1` | Monday (Corporate) |
| `http://localhost:8080/?day=2` | Tuesday (Government) |
| `http://localhost:8080/?day=3` | Wednesday (BirthdAI™) |
| `http://localhost:8080/?day=4` | Thursday (Hot Dogs) |
| `http://localhost:8080/?day=5` | Friday (OBRI) |
| `http://localhost:8080/?day=6` | Saturday (Space Portal) |
| `http://localhost:8080/?date=2025-07-05` | Treat today as July 5th |

The date override uses your **local timezone** (all date detection is in the browser — no server involvement).

---

## Project Structure

```
isitbensbirthday/
├── docker-compose.yml        # Local dev only
├── Dockerfile                # nginx:alpine + site files
├── nginx/
│   └── nginx.conf            # Nginx config
├── site/
│   ├── index.html            # Single entry point
│   ├── css/
│   │   ├── main.css          # Global reset
│   │   ├── birthday.css
│   │   ├── sunday.css
│   │   ├── monday.css
│   │   ├── tuesday.css
│   │   ├── wednesday.css
│   │   ├── thursday.css
│   │   ├── friday.css
│   │   └── saturday.css
│   ├── js/
│   │   ├── main.js           # Date detection + experience router
│   │   ├── birthday.js
│   │   ├── sunday.js
│   │   ├── monday.js
│   │   ├── tuesday.js
│   │   ├── wednesday.js
│   │   ├── thursday.js
│   │   ├── friday.js
│   │   └── saturday.js
│   └── assets/               # Reserved for images/fonts if needed
├── scripts/
│   └── deploy.sh             # SSH deploy script
├── .env.example              # Config template
└── README.md
```

**Adding or editing an experience:** each day is fully self-contained — one CSS file and one JS file. The JS module exposes a single `window.DayName = { init(appEl) {} }` function. Touch nothing else.

---

## Deployment to DigitalOcean

Production uses Apache2 to serve the static files directly from the cloned repo. No Docker needed on the server.

### 1. One-time droplet setup

SSH in and run:

```bash
apt update && apt upgrade -y
apt install -y git apache2
mkdir -p /opt/isitbensbirthday
```

Ensure ports 80 and 443 are open in your droplet's firewall (DigitalOcean control panel → Networking → Firewalls, or `ufw allow 80 && ufw allow 443`).

### 2. Clone the repo on the droplet

```bash
cd /opt/isitbensbirthday
git clone <your-repo-url> .
```

### 3. Configure Apache2

Create `/etc/apache2/sites-available/isitbensbirthday.conf`:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com

    DocumentRoot /opt/isitbensbirthday/site

    <Directory /opt/isitbensbirthday/site>
        Options -Indexes
        AllowOverride None
        Require all granted
    </Directory>

    ErrorLog  ${APACHE_LOG_DIR}/isitbensbirthday-error.log
    CustomLog ${APACHE_LOG_DIR}/isitbensbirthday-access.log combined
</VirtualHost>
```

Enable it and reload:

```bash
a2ensite isitbensbirthday.conf
systemctl reload apache2
```

The site is now live at `http://yourdomain.com`.

### 4. Add SSL with Certbot (recommended)

```bash
apt install -y certbot python3-certbot-apache
certbot --apache -d yourdomain.com
```

Certbot updates the VirtualHost automatically to redirect HTTP → HTTPS and handles certificate renewal.

Verify auto-renewal:

```bash
certbot renew --dry-run
```

### 5. Configure deploy.sh

On your local machine:

```bash
cp .env.example .env
```

Edit `.env`:

```
DEPLOY_HOST=your.droplet.ip.here
DEPLOY_USER=root
DEPLOY_PATH=/opt/isitbensbirthday
DEPLOY_BRANCH=main
```

### 6. Subsequent deploys

From your local machine:

```bash
./scripts/deploy.sh
```

The script SSHs in and runs `git pull`. Apache2 is already pointing at the repo, so the new files are live immediately — no restart needed.

---

## Architecture Notes

- **No backend.** All date logic runs in the browser using `new Date()` in the user's local timezone. The server just serves static files.
- **Single entry point.** `index.html` loads `js/main.js`, which detects the date and dynamically injects the correct `<link>` and `<script>` tags for that day's experience. Unused day files are never downloaded.
- **Modular.** Each experience is isolated in `css/{day}.css` + `js/{day}.js`. Changing one day can't break another.
- **Hot reload in dev.** `docker-compose.yml` mounts `./site` as a read-only volume, so you can edit files locally and refresh without rebuilding.
