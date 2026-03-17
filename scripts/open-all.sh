#!/usr/bin/env bash
# ============================================================
# open-all.sh — Open all 8 day experiences in the browser
#
# Usage:
#   ./scripts/open-all.sh
#   make open
#
# Reads HOST_PORT from .env if present, defaults to 8080.
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${PROJECT_ROOT}/.env"

HOST_PORT=8080

if [[ -f "${ENV_FILE}" ]]; then
  port_line=$(grep -E '^HOST_PORT=' "${ENV_FILE}" || true)
  if [[ -n "${port_line}" ]]; then
    HOST_PORT="${port_line#HOST_PORT=}"
  fi
fi

BASE_URL="http://localhost:${HOST_PORT}/"

DAYS=(0 1 2 3 4 5 6 birthday)

# Detect how to open URLs in this environment
open_url() {
  local url="$1"
  if grep -qi microsoft /proc/version 2>/dev/null; then
    cmd.exe /c start "" "${url}"
  elif [[ "$(uname)" == "Darwin" ]]; then
    open "${url}"
  elif command -v xdg-open &>/dev/null; then
    xdg-open "${url}"
  else
    echo "  ${url}"
    return
  fi
  echo "  Opened: ${url}"
}

echo "Opening all 8 day experiences on port ${HOST_PORT}..."
echo ""

first=true
for day in "${DAYS[@]}"; do
  open_url "${BASE_URL}?day=${day}"
  if [[ "${first}" == true ]]; then
    sleep 1.5
    first=false
  else
    sleep 0.3
  fi
done

echo ""
echo "Done."
