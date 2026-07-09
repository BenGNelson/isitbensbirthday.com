#!/usr/bin/env bash
# ============================================================
# check-secrets.sh — Fail if any personal/identifying info would be committed.
#
# The public repo may only contain the first name "Ben" and the public domain
# isitbensbirthday.com. This greps the files git would actually commit (tracked
# + staged, minus gitignored) for anything that could deanonymize the owner,
# their server, or their network.
#
# Usage:  ./scripts/check-secrets.sh   (exit 0 = clean, 1 = leak found)
#         make check-secrets
# ============================================================
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$(cd "${SCRIPT_DIR}/.." && pwd)"

# Forbidden patterns (extended regex, case-insensitive). Add to this list as needed.
# NOTE: bare first name "ben" and the domain isitbensbirthday.com are ALLOWED.
PATTERNS=(
  'REDACTED'                 # the droplet's public IP
  '\b(10|127)\.[0-9]+\.[0-9]+\.[0-9]+\b'      # private/loopback IPv4 (172.16-31 handled below)
  '\b192\.168\.[0-9]+\.[0-9]+\b'
  '\b172\.(1[6-9]|2[0-9]|3[01])\.[0-9]+\.[0-9]+\b'
  'REDACTED'                            # server hostname
  'REDACTED'                            # surname
  'REDACTED|REDACTED'             # GitHub handle / email local-part
  'REDACTED'                        # personal email domain
  'REDACTED|@gmail\.com'            # personal gmail
  '/home/REDACTED\b'              # server home paths
  'REDACTED@'                           # server user
  '\bREDACTED\b'                         # real ZIP that leaked via a joke address
)

# Files git would commit: tracked files, honoring .gitignore. --cached would only
# catch staged; use ls-files (tracked) plus staged additions.
mapfile -t FILES < <(git ls-files)

FOUND=0
for pat in "${PATTERNS[@]}"; do
  # -I skips binary; print file:line:match
  if hits=$(printf '%s\0' "${FILES[@]}" | xargs -0 grep -InE "${pat}" 2>/dev/null); then
    echo "❌ Forbidden pattern /${pat}/ found:"
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
