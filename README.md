# Is It Ben's Birthday?

A single-page birthday website that detects your local date and shows one of 8 completely different experiences — one per day of the week, plus a special page on July 5th.

## The 8 Experiences

| Trigger | Name | Vibe |
|---------|------|------|
| **July 5th** | IT IS BEN'S BIRTHDAY | Maximum chaos. Confetti. Achievements. Escalating celebrate button. |
| **Sunday** | The Institute of Pre-Birthday Contemporary Art | Stuffy fine-art museum. Every exhibit is an object that is not Ben's birthday. |
| **Monday** | BirthdayCorp™ Enterprise Suite | Corporate dashboard. Login never works. KPIs are bad. Progress bar stuck at 47%. |
| **Tuesday** | URGENT: Form BDY-404 Required | Government portal. 47 fields. Always rejected. |
| **Wednesday** | BirthdAI™ v0.0.1-alpha | A broken AI birthday detection system by MERIDIAN™ (formerly Synapse Dynamics LLC). Submit a support ticket. Dispute the findings. The AI has never detected a birthday. |
| **Thursday** | The Hot Dog Appreciation Society | An extremely earnest professional website about hot dogs. The JOIN NOW button runs away from your cursor. |
| **Friday** | Anuran Behavioral Research Institute (ABRI) | A completely sincere academic institute conducting continuous frog-based field observation to determine whether it is Ben's birthday. Every study concludes it is not. Founded in 1987 / Est. 2003 / Since 1991. |
| **Saturday** | Chrono-Celebration Nexus (Offline) | Sci-fi portal, currently offline. The CAPTCHA only shows hot dogs. It always fails. |

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) + [Docker Compose](https://docs.docker.com/compose/install/) (v2) — local dev only
- `git`
- For self-hosting: any web server or platform capable of serving static files (Nginx, Apache, Netlify, Cloudflare Pages, etc.)

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
| `http://localhost:8080/?day=5` | Friday (ABRI) |
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

## Deployment

The project ships as a Docker image (nginx:alpine + static files). Pick whichever option fits your setup:

### 1. Docker (simplest)

```bash
docker compose up -d
```

Serves on port 8080 by default. Override via `HOST_PORT` in `.env` (copy `.env.example` to get started).

### 2. Any static host

Copy the `site/` directory to any web server, CDN, or platform — Netlify, Cloudflare Pages, S3 + CloudFront, GitHub Pages, etc. No build step required; it's plain HTML/CSS/JS.

### 3. Self-hosted Nginx or Apache

Point your `root` / `DocumentRoot` at `site/` and enable the SPA fallback so all unmatched routes serve `index.html`. The included `nginx/nginx.conf` can be used as a reference.

### Remote deploys via deploy.sh

`scripts/deploy.sh` SSHs into a remote server, runs `git pull`, and exits. Configure it via `.env`:

```
DEPLOY_HOST=your.server.ip
DEPLOY_USER=root
DEPLOY_PATH=/opt/isitbensbirthday
DEPLOY_BRANCH=main
```

---

## Customizing for Another Person

This site is about Ben. To fork it for someone else:

1. **Name**: search `site/js/` for `"Ben"` and update to your subject's name
2. **Birthday date**: in `site/js/main.js`, change the check near line 50 — `date.getMonth() === 6 && date.getDate() === 5` — to your target date (months are 0-indexed, so July = 6)
3. Update `site/js/birthday.js` content to match (the celebration page references July 5th explicitly)

---

## Architecture Notes

- **No backend.** All date logic runs in the browser using `new Date()` in the user's local timezone. The server just serves static files.
- **Single entry point.** `index.html` loads `js/main.js`, which detects the date and dynamically injects the correct `<link>` and `<script>` tags for that day's experience. Unused day files are never downloaded.
- **Modular.** Each experience is isolated in `css/{day}.css` + `js/{day}.js`. Changing one day can't break another.
- **Hot reload in dev.** `docker-compose.yml` mounts `./site` as a read-only volume, so you can edit files locally and refresh without rebuilding.
