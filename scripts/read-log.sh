#!/usr/bin/env bash
# ============================================================
# read-log.sh — Print the Monday page debug log to stdout
#
# Usage:
#   ./scripts/read-log.sh           # reads ./logs/debug.log locally
#   ./scripts/read-log.sh --remote  # reads the log on the remote server via SSH
#
# Output goes to stdout, so you can pipe it:
#   ./scripts/read-log.sh --remote | grep login_attempt
#   ./scripts/read-log.sh | less
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
LOCAL_LOG="${PROJECT_ROOT}/logs/debug.log"

if [[ "${1:-}" == "--remote" ]]; then
  ENV_FILE="${PROJECT_ROOT}/.env"
  if [[ ! -f "${ENV_FILE}" ]]; then
    echo "ERROR: .env not found at ${ENV_FILE}" >&2
    echo "Copy .env.example to .env and fill in your deployment config." >&2
    exit 1
  fi

  set -o allexport
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +o allexport

  : "${DEPLOY_HOST:?Set DEPLOY_HOST in .env}"
  : "${DEPLOY_USER:?Set DEPLOY_USER in .env}"
  : "${DEPLOY_PATH:?Set DEPLOY_PATH in .env}"

  REMOTE_LOG="${DEPLOY_PATH}/logs/debug.log"
  ssh -o StrictHostKeyChecking=no "${DEPLOY_USER}@${DEPLOY_HOST}" \
    "cat '${REMOTE_LOG}' 2>/dev/null || echo '(no log file yet)'"
else
  cat "${LOCAL_LOG}" 2>/dev/null || echo "(no log file yet)"
fi
