#!/usr/bin/env bash
# ============================================================
# check-secrets.sh — Fail if any personal/identifying info would be committed.
#
# Two pattern sources, split by KIND — this split is the entire point of the
# script's design:
#
#   1. SHAPES (below, committed). Regexes that describe a FORM, not a value:
#      private IP ranges, private-key headers, token formats. Publishing these
#      reveals nothing, so they live here in the open.
#
#   2. LITERALS (.githooks/patterns.local, GITIGNORED). The actual hostname, IP,
#      surname, paths, emails. Loaded via .githooks/_patterns.sh.
#
#   This script previously kept the literals INLINE and excluded itself from its
#   own scan — so it passed every run while publishing, in a public repo, the
#   complete list of things it existed to hide. The scanner was the leak. Don't
#   put a literal back in this file.
#
# Scans the working-tree content of every file git tracks/stages, so .gitignore
# does the excluding for free (.env, *.local, CLAUDE.md are never scanned).
#
# Usage:  ./scripts/check-secrets.sh   (exit 0 = clean, 1 = leak found)
#         make check-secrets
# ============================================================
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${ROOT}"

# ── Shape patterns: safe to publish, always enforced ──────────────────────────
# NOTE: the droplet's PUBLIC IP is not here — it's a literal, and it's in
# patterns.local. Private ranges are a shape and belong here.
SHAPES=(
  '\b(10|127)\.[0-9]+\.[0-9]+\.[0-9]+\b'
  '\b192\.168\.[0-9]+\.[0-9]+\b'
  '\b172\.(1[6-9]|2[0-9]|3[01])\.[0-9]+\.[0-9]+\b'
  '-----BEGIN (RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----'
  '\bAKIA[0-9A-Z]{16}\b'
  '\bgh[pousr]_[A-Za-z0-9]{36,}\b'
  '(password|passwd|secret|api[_-]?key)[[:space:]]*[:=][[:space:]]*['"'"'"][^'"'"'"]{8,}'
)

# ── Literal patterns: loaded from the gitignored file ─────────────────────────
# shellcheck source=/dev/null
. "${ROOT}/.githooks/_patterns.sh"

if [[ -z "${FORBIDDEN:-}" ]]; then
  echo "⚠️  check-secrets: .githooks/patterns.local not found — running SHAPE checks only."
  echo "    Host literals (hostname, IP, surname, paths) are NOT being enforced."
  echo "    cp .githooks/patterns.local.example .githooks/patterns.local and fill it in."
  echo ""
fi

# Build the full pattern list: shapes, plus each literal line if present.
PATTERNS=("${SHAPES[@]}")
if [[ -n "${FORBIDDEN:-}" ]]; then
  # $FORBIDDEN is a '|'-joined alternation; scan it as one pattern so a hit
  # reports the offending FILE without echoing which literal matched.
  PATTERNS+=("${FORBIDDEN}")
fi

# git ls-files -z | xargs -0 so this works on macOS bash 3.2 (no `mapfile`) and
# on paths with spaces. -I skips binaries, -i is case-insensitive.
# Exclude .githooks/ — patterns.local legitimately contains every literal.
FOUND=0
for pat in "${PATTERNS[@]}"; do
  hits=$(git ls-files -z -- ':!:.githooks/' | xargs -0 grep -IniE "${pat}" 2>/dev/null)
  if [[ -n "${hits}" ]]; then
    echo "❌ Forbidden pattern found:"
    echo "${hits}" | sed 's/^/    /'
    FOUND=1
  fi
done

if [[ "${FOUND}" -eq 0 ]]; then
  echo "✅ check-secrets: no personal/identifying info in committable files."
  exit 0
else
  echo ""
  echo "check-secrets FAILED. Scrub the above (or gitignore the file) before committing."
  exit 1
fi
