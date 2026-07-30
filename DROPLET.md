# Hosting & Deployment Runbook

How this site is hosted and deployed, and how to reproduce it. This is the
**public, genericized** runbook — replace the `<PLACEHOLDERS>` with your own
values. (The maintainer keeps the filled-in version in a gitignored
`DROPLET.local.md`; machine-readable values live in `.env`.)

> **TL;DR:** A small Linux VPS runs **Apache2** and serves the `site/` directory of
> a plain `git` checkout. The site is **fully static** — no server-side code.
> Deploying is literally **`git pull`** — no build, no restart, no Docker in
> production. TLS is handled by certbot and auto-renews.

---

## 1. At a glance

| Thing | Value |
|---|---|
| Host | a Linux VPS (e.g. DigitalOcean droplet), `<DROPLET_IP>` |
| OS | Ubuntu 24.04 LTS |
| Web server | Apache 2.4 (Ubuntu), running as `www-data`, serving static files |
| Domain | `<your-domain>` + `www.` → `<DROPLET_IP>` (both A records) |
| TLS | Let's Encrypt via certbot; auto-renew (`certbot.timer`) |
| Deploy path | `<DEPLOY_PATH>` (a git checkout, owned by the deploy user) |
| DocumentRoot | `<DEPLOY_PATH>/site` |
| Deploy user | the non-root user that **owns** `<DEPLOY_PATH>` (so `git pull` needs no sudo) |
| Deploy method | `scripts/deploy.sh` → SSH → `git pull` |

Set your real values in `.env` (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_BRANCH`).

SSH in:
```bash
ssh <DEPLOY_USER>@<DROPLET_IP>     # normal / deploys (owns the checkout)
ssh root@<DROPLET_IP>              # admin (apt, apache restart, certbot)
```

---

## 2. Request flow (what happens when someone visits)

```
Browser → https://<your-domain>
  │
  │  DNS: <your-domain>  A → <DROPLET_IP>
  ▼
Apache on the VPS
  ├─ :80  vhost   → 301 redirect to https://
  └─ :443 vhost   → serves <DEPLOY_PATH>/site
        │
        ├─ /                → site/index.html  → loads js/main.js
        │                      main.js reads the LOCAL date (browser), picks the day,
        │                      injects css/<day>.css + js/<day>.js, calls <Day>.init().
        └─ /css/*, /js/*    → served static (gzipped via mod_deflate)
```

Key point: **everything is client-side.** The server only serves static files — there is no
server-side code, database, app server, or framework.

---

## 3. Where every piece lives on the server

| Purpose | Path |
|---|---|
| Git checkout (repo root) | `<DEPLOY_PATH>` (owned by the deploy user) |
| Served files (DocumentRoot) | `<DEPLOY_PATH>/site` |
| Apache vhosts (enabled) | `/etc/apache2/sites-enabled/<your-domain>{,-le-ssl}.conf` |
| Apache logs | `/var/log/apache2/{access,error}.log` |
| TLS certs | `/etc/letsencrypt/live/<your-domain>/` |

The repo's `apache/prod-*.conf` files are **reference copies** of the two live vhosts (with
the maintainer's email/domain genericized). Editing them in the repo does **not** change the
server — they aren't symlinked into `/etc/apache2`. To change the real vhost, edit the file
under `/etc/apache2/sites-available/` on the server and `sudo systemctl reload apache2`.

**Nothing outside `site/` is web-accessible** — `.git/`, `.env`, and `scripts/` sit in the repo
root, one level above DocumentRoot, so they can't be fetched over HTTP.

---

## 4. Deploying a change

```bash
# 1. Edit + verify locally (docker compose up → http://localhost:8080)
# 2. Commit and push — the server pulls from GitHub, so pushing is required:
git add -A && git commit -m "…" && git push origin main
# 3. Deploy:
make deploy            # scripts/deploy.sh, reads .env, SSH → git pull on the server
```

`scripts/deploy.sh` SSHes in as `DEPLOY_USER@DEPLOY_HOST` and, in `<DEPLOY_PATH>`, runs
`git fetch/checkout/pull --ff-only origin <branch>`. **No Apache restart is needed** — new
file contents are served on the next request. Manual equivalent:
```bash
ssh <DEPLOY_USER>@<DROPLET_IP> 'cd <DEPLOY_PATH> && git pull origin main'
```

### Deploy as the owner, not root
Make `<DEPLOY_PATH>` owned by a normal user and deploy as that user. Then `git pull` just
works. Deploying as `root` forces a `git config safe.directory` override on every run
(because the repo is owned by another user) — avoid it.

---

## 5. "How do I change X?" recipes

**Add / edit a day experience** — purely a repo change; deploy as usual.
Each day is `site/css/<day>.css` + `site/js/<day>.js` exposing `window.<Day> = { init(app){} }`,
routed by `site/js/main.js`. See README "Customizing".

**Change the birthday date** — `site/js/main.js` (`getMonth() === 6 && getDate() === 5`,
month is 0-indexed) plus the July-5th references in `site/js/birthday.js` and `monday.js`.

**Edit the Apache vhost**
```bash
ssh root@<DROPLET_IP>
sudo nano /etc/apache2/sites-available/<your-domain>-le-ssl.conf   # the :443 vhost
sudo apache2ctl configtest && sudo systemctl reload apache2
```

**Renew / inspect TLS** — automatic, but to check or force:
```bash
ssh root@<DROPLET_IP>
sudo certbot certificates                 # expiry + domains
sudo certbot renew --dry-run              # test renewal
sudo systemctl list-timers | grep certbot # confirm the timer is scheduled
```

**Restart / check Apache**
```bash
ssh root@<DROPLET_IP>
sudo systemctl reload apache2     # graceful, no dropped connections
sudo systemctl status apache2
sudo tail -f /var/log/apache2/error.log
```

---

## 6. First-time provision (build the server from scratch)

```bash
# On a fresh Ubuntu 24.04 VPS, as root:
apt update && apt install -y apache2 git certbot python3-certbot-apache
a2enmod deflate rewrite ssl

# Create the deploy user (or reuse one) and the checkout:
adduser <DEPLOY_USER> && usermod -aG sudo <DEPLOY_USER>
install -d -o <DEPLOY_USER> -g <DEPLOY_USER> <DEPLOY_PATH>
sudo -u <DEPLOY_USER> git clone <your-repo-url> <DEPLOY_PATH>

# Vhost: copy apache/prod-<your-domain>.conf to
#   /etc/apache2/sites-available/<your-domain>.conf (edit paths/domain), then:
a2dissite 000-default
a2ensite <your-domain>
systemctl reload apache2

# Point DNS A records (<your-domain> + www) at the server, then:
certbot --apache -d <your-domain> -d www.<your-domain>
# certbot writes the -le-ssl.conf :443 vhost and the :80→:443 redirect automatically.
```

Add your SSH public key to the deploy user's `~/.ssh/authorized_keys` so `make deploy` works.

---

## 7. Operational notes

- **Deploy as the checkout owner** (not root) — see §4.
- **Firewall:** `ufw` is **enabled**, default-deny inbound, allowing only OpenSSH (22) and
  `Apache Full` (80/443).
- **Brute-force protection:** `fail2ban` is installed with the default `sshd` jail active.
- **`mod_php` is disabled** — the site is fully static, so PHP is unused. Re-enable with
  `a2enmod php8.3 && systemctl reload apache2` only if server-side code is ever reintroduced.
- **Auto-updates:** `unattended-upgrades` is enabled (security patches apply automatically).
  Still reboot periodically for kernel updates (`apt upgrade && reboot`) — the site is down
  only for the ~30–60s reboot.
- **Dev console is gated in prod:** `dev.html` sits behind Apache Basic Auth (the `<Files>`
  block in the :443 vhost + `/etc/apache2/.htpasswd`); the day pages are unaffected. Local
  dev (`localhost:8080/dev.html`) is open.
- **Config drift:** the live vhosts can be edited on the server independently of the repo.
  After any on-server change, update `apache/prod-*.conf` here so this runbook stays true.

---

## 8. Re-inspect the server

```bash
ssh root@<DROPLET_IP> '
  apache2ctl -v; apache2ctl -S; apache2ctl -M | grep -Ei "deflate|rewrite|ssl";
  cat /etc/apache2/sites-enabled/*;
  certbot certificates;
  ls -la <DEPLOY_PATH> <DEPLOY_PATH>/site;
  git -C <DEPLOY_PATH> remote -v; git -C <DEPLOY_PATH> log --oneline -3;
  ufw status; systemctl list-timers | grep certbot'
```
