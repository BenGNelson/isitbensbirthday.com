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

Local dev runs **Apache + PHP (`php:8.3-apache`)** — the same stack as the production droplet
(see [`DROPLET.md`](DROPLET.md)). The `docker-compose.yml` mounts `./site` as a volume, so
**edits to HTML/CSS/JS/PHP are reflected immediately** — just refresh the browser. No rebuild
needed during development.

Because it's real Apache + PHP, the Monday login logger (`site/api/log.php`) actually runs
locally and writes to `logs/debug.log` — view it with `make log` or `make log-table`.

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

**Dev console:** open **`http://localhost:8080/dev.html`** for a preview harness — a sidebar of
all experiences with a live iframe preview, `?date` override, responsive-width toggles
(phone/tablet/full), and keyboard shortcuts (`0`–`6`, `b`, `r`, `[` `]`). It's unlisted (nothing
links to it) and pure static.

---

## Automated checks

```bash
make test          # static checks + smoke tests + secret scan (needs `make dev` running)
make test-static   # offline only: JS syntax, PHP lint, day-module & router invariants
make test-smoke    # HTTP checks against the running container
make check-secrets # fail if any personal info would be committed
```

`scripts/test.sh` verifies every day module exposes `window.<Day>.init` with a matching CSS
file, the router maps all weekdays, each route serves, `log.php` behaves (204 / 400 / 405) and
writes its log, gzip is applied, and missing paths 404. JS syntax is checked with `node` (falls
back to a throwaway `node:20-alpine` container); PHP is linted inside the running web container.

---

## Project Structure

```
isitbensbirthday/
├── docker-compose.yml        # Local dev (php:8.3-apache — mirrors prod)
├── Dockerfile                # php:8.3-apache + site files
├── apache/
│   ├── 000-default.conf      # Local dev vhost (mirrors prod behavior)
│   └── prod-*.conf           # Verbatim copies of the live droplet vhosts (reference)
├── nginx/
│   └── nginx.conf            # UNUSED — kept only as an alt static-serving reference
├── site/
│   ├── index.html            # Single entry point
│   ├── css/                  # main.css (reset) + one file per day
│   ├── js/
│   │   ├── main.js           # Date detection + experience router
│   │   └── <day>.js          # birthday, sunday … saturday
│   └── api/
│       └── log.php           # Monday login logger (the only server-side code)
├── scripts/
│   ├── deploy.sh             # SSH → git pull on the droplet
│   ├── test.sh               # Static + smoke test suite
│   ├── check-secrets.sh      # PII/secret scanner
│   ├── open-all.sh           # Open all 8 experiences locally
│   ├── read-log.sh           # Print debug.log (local or --remote)
│   └── format-log.py         # Render login attempts as a table
├── logs/                     # debug.log lands here (gitignored)
├── Makefile                  # open / dev / down / test / deploy / log* targets
├── .env.example              # Config template
├── DROPLET.md                # Hosting & deployment runbook (genericized)
├── MOBILE_NOTES.md           # Mobile-responsiveness audit notes
└── README.md
```

**Adding or editing an experience:** each day is fully self-contained — one CSS file and one JS file. The JS module exposes a single `window.DayName = { init(appEl) {} }` function. Touch nothing else.

---

## Deployment

**Production is not Docker.** The live site runs directly on a DigitalOcean droplet:
**Apache2 + mod_php** serving the `site/` directory of a `git` checkout at
`/opt/isitbensbirthday`. Deploying is just `git pull` — no build, no restart. The Docker
setup above exists only to reproduce that Apache+PHP stack locally.

👉 **Full details — architecture, TLS, "how to change X", re-provisioning — are in
[`DROPLET.md`](DROPLET.md).**

### The deploy loop

```bash
# 1. Edit + verify locally (docker compose up → localhost:8080)
# 2. Commit and push — the droplet pulls from GitHub, so pushing is required:
git add -A && git commit -m "…" && git push origin main
# 3. Deploy:
make deploy      # scripts/deploy.sh: SSH → git pull on the droplet
```

Configure the target in `.env` (copy from `.env.example`). Deploy as the user that **owns
the deploy path** (not `root`):

```
DEPLOY_HOST=your-droplet-ip-or-hostname
DEPLOY_USER=your-deploy-user
DEPLOY_PATH=/opt/isitbensbirthday
DEPLOY_BRANCH=main
```

### Hosting it elsewhere

The 7 day pages are pure static HTML/CSS/JS and will run on any static host (Netlify,
Cloudflare Pages, GitHub Pages, S3, plain nginx). **Caveat:** the Monday login logger
(`site/api/log.php`) needs a PHP runtime — on a static-only host that endpoint simply no-ops
(the page still works; nothing gets logged).

---

## Customizing for Another Person

This site is about Ben. To fork it for someone else:

1. **Name**: search `site/js/` for `Ben` and update to your subject's name
2. **Birthday date**: in `site/js/main.js`, change the `isBirthday()` check — `date.getMonth() === 6 && date.getDate() === 5` — to your target date (months are 0-indexed, so July = 6)
3. **Date references in copy**: search `site/js/` for `July 5` and update every match — **all eight** day files reference the date in their jokes, not just the birthday page

---

## Architecture Notes

- **Almost no backend.** All date logic runs in the browser using `new Date()` in the user's
  local timezone. The server just serves static files — with one exception: `site/api/log.php`,
  a tiny PHP endpoint the Monday page POSTs login attempts to (see below).
- **Single entry point.** `index.html` loads `js/main.js`, which detects the date and dynamically injects the correct `<link>` and `<script>` tags for that day's experience. Unused day files are never downloaded.
- **Modular.** Each experience is isolated in `css/{day}.css` + `js/{day}.js`. Changing one day can't break another.
- **Dev mirrors prod.** Both local dev and the droplet run **Apache + mod_php (PHP 8.3)**, so
  what you test locally is what runs in production. `docker-compose.yml` mounts `./site` for
  hot reload. Full production anatomy: [`DROPLET.md`](DROPLET.md).
- **The Monday logger.** `js/monday.js` POSTs each fake-login attempt to `api/log.php`, which
  appends a JSON line to `logs/debug.log` (self-trimming to 500 lines, stored outside the web
  root). Read it with `make log` / `make log-table` (add `-remote` for the droplet).
