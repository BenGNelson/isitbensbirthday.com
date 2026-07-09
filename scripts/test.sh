#!/usr/bin/env bash
# ============================================================
# test.sh — Validate the site. Two suites:
#   --static   offline checks (no server needed): JS syntax, PHP lint,
#              day module/CSS presence, router invariants, HTML sanity.
#   --smoke    HTTP checks against the running dev container (needs
#              `docker compose up`): routes, log.php, error codes, gzip.
# With no args, runs both. Also runs scripts/check-secrets.sh.
#
# Usage:  ./scripts/test.sh [--static|--smoke]   |   make test
# ============================================================
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${ROOT}"

BASE="${BASE:-http://localhost:${HOST_PORT:-8080}}"
DAYS=(birthday sunday monday tuesday wednesday thursday friday saturday)

PASS=0; FAIL=0; SKIP=0
pass() { printf '  \033[32m✓\033[0m %s\n' "$1"; PASS=$((PASS+1)); }
fail() { printf '  \033[31m✗\033[0m %s\n' "$1"; FAIL=$((FAIL+1)); }
skip() { printf '  \033[33m∼ SKIP\033[0m %s\n' "$1"; SKIP=$((SKIP+1)); }
head() { printf '\n\033[1m%s\033[0m\n' "$1"; }
code() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

run_static() {
  head "Static checks"

  # JS syntax — node on host, else a throwaway node container, else skip.
  if command -v node >/dev/null 2>&1; then
    for f in site/js/*.js; do
      if node --check "$f" 2>/dev/null; then pass "js syntax: $f"; else fail "js syntax: $f"; fi
    done
  elif command -v docker >/dev/null 2>&1; then
    if docker run --rm -v "${ROOT}/site/js:/js:ro" node:20-alpine \
         sh -c 'for f in /js/*.js; do node --check "$f" || exit 1; done' 2>/dev/null; then
      pass "js syntax: all site/js/*.js (via node:20-alpine)"
    else
      fail "js syntax: at least one file failed (via node:20-alpine)"
    fi
  else
    skip "js syntax: no node and no docker available"
  fi

  # PHP lint — run inside the running web container if present.
  if docker compose ps --status running 2>/dev/null | grep -q web; then
    if docker compose exec -T web php -l /var/www/html/api/log.php >/dev/null 2>&1; then
      pass "php lint: api/log.php"; else fail "php lint: api/log.php"; fi
  else
    skip "php lint: web container not running (docker compose up)"
  fi

  # Each day defines window.<Name> with an init(), and has a matching CSS file.
  for d in "${DAYS[@]}"; do
    N="$(python3 -c "print('$d'.capitalize())")"
    [ -f "site/js/$d.js" ] || { fail "missing site/js/$d.js"; continue; }
    grep -qE "window\.$N\s*=" "site/js/$d.js" && pass "$d defines window.$N" || fail "$d missing window.$N"
    grep -qE "\binit\s*\(" "site/js/$d.js"     && pass "$d has init()"        || fail "$d missing init()"
    [ -f "site/css/$d.css" ] && pass "$d has css" || fail "$d missing site/css/$d.css"
  done

  # Router maps all 7 weekday names in Sun→Sat order.
  grep -q "'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'" site/js/main.js \
    && pass "main.js weekday map intact" || fail "main.js weekday map drift"

  # No day file references another day's global (cross-day leakage).
  local leak=0
  for d in "${DAYS[@]}"; do
    N="$(python3 -c "print('$d'.capitalize())")"
    for other in "${DAYS[@]}"; do
      [ "$other" = "$d" ] && continue
      O="$(python3 -c "print('$other'.capitalize())")"
      if grep -qE "\b$O\.(init|buildHTML)" "site/js/$d.js" 2>/dev/null; then
        fail "$d.js references other day's global: $O"; leak=1
      fi
    done
  done
  [ "$leak" -eq 0 ] && pass "no cross-day global references"

  # index.html sanity (lenient HTML parser).
  if command -v xmllint >/dev/null 2>&1; then
    if xmllint --html --noout site/index.html 2>&1 | grep -qi 'error'; then
      fail "index.html has HTML errors"; else pass "index.html parses"; fi
  else
    skip "index.html: xmllint not available"
  fi
}

run_smoke() {
  head "Smoke checks against ${BASE}"
  if [ "$(code "${BASE}/" )" != 200 ]; then
    fail "server not reachable at ${BASE} — run 'docker compose up' first"; return
  fi

  # All routes serve the SPA shell (day selection is client-side).
  for q in "" "?day=0" "?day=1" "?day=2" "?day=3" "?day=4" "?day=5" "?day=6" "?day=birthday" "?date=2025-07-05"; do
    [ "$(code "${BASE}/${q}")" = 200 ] && pass "GET /${q} → 200" || fail "GET /${q} not 200"
  done

  # Static assets.
  [ "$(code "${BASE}/css/main.css")" = 200 ] && pass "css/main.css → 200" || fail "css/main.css"
  [ "$(code "${BASE}/js/main.js")" = 200 ]   && pass "js/main.js → 200"   || fail "js/main.js"

  # log.php: valid POST → 204 and writes exactly one line.
  local before after
  before="$(wc -l < logs/debug.log 2>/dev/null || echo 0)"
  if [ "$(code -X POST -H 'Content-Type: application/json' -d '{"event":"selftest"}' "${BASE}/api/log.php")" = 204 ]; then
    pass "POST /api/log.php → 204"
    after="$(wc -l < logs/debug.log 2>/dev/null || echo 0)"
    [ "$after" -eq "$((before+1))" ] && pass "log.php wrote one line" || fail "log.php did not write a line"
  else
    fail "POST /api/log.php not 204"
  fi

  [ "$(code -X POST -H 'Content-Type: application/json' -d 'not-json' "${BASE}/api/log.php")" = 400 ] \
    && pass "malformed POST → 400" || fail "malformed POST not 400"
  [ "$(code "${BASE}/api/log.php")" = 405 ] && pass "GET /api/log.php → 405" || fail "GET log.php not 405"
  [ "$(code "${BASE}/does-not-exist.html")" = 404 ] && pass "missing path → 404" || fail "missing path not 404"

  # gzip via mod_deflate.
  curl -sI -H 'Accept-Encoding: gzip' "${BASE}/js/main.js" | grep -qi '^content-encoding: gzip' \
    && pass "gzip applied to js" || fail "gzip not applied"

  # Log dir not web-accessible (defense-in-depth).
  [ "$(code "${BASE}/logs/debug.log")" != 200 ] && pass "logs/ not web-accessible" || fail "logs/ IS web-accessible!"
}

MODE="${1:-all}"
case "$MODE" in
  --static) run_static ;;
  --smoke)  run_smoke ;;
  all|"")   run_static; run_smoke ;;
  *) echo "usage: $0 [--static|--smoke]"; exit 2 ;;
esac

head "Secrets / PII scan"
if "${SCRIPT_DIR}/check-secrets.sh" >/tmp/.check-secrets.$$ 2>&1; then
  pass "check-secrets: clean"; else fail "check-secrets: LEAK (run scripts/check-secrets.sh)"; cat /tmp/.check-secrets.$$; fi
rm -f /tmp/.check-secrets.$$

printf '\n\033[1mResult:\033[0m %d passed, %d failed, %d skipped\n' "$PASS" "$FAIL" "$SKIP"
[ "$FAIL" -eq 0 ]
