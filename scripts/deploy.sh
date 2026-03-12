#!/usr/bin/env bash
# ============================================================
# deploy.sh — Deploy isitbensbirthday to a DigitalOcean droplet
#
# Usage:
#   ./scripts/deploy.sh
#
# Reads config from .env in the project root. Copy .env.example
# to .env and fill in your droplet details before running.
# ============================================================
set -euo pipefail

# ── Load .env from project root ───────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${PROJECT_ROOT}/.env"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "ERROR: .env not found at ${ENV_FILE}"
  echo "Copy .env.example to .env and fill in your deployment config."
  exit 1
fi

# Export variables from .env (skip blank lines and comments)
set -o allexport
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +o allexport

# ── Validate required vars ─────────────────────────────────────
: "${DEPLOY_HOST:?Set DEPLOY_HOST in .env}"
: "${DEPLOY_USER:?Set DEPLOY_USER in .env}"
: "${DEPLOY_PATH:?Set DEPLOY_PATH in .env}"
: "${DEPLOY_BRANCH:=main}"

echo "=================================================="
echo "  Deploying isitbensbirthday"
echo "  Host  : ${DEPLOY_USER}@${DEPLOY_HOST}"
echo "  Path  : ${DEPLOY_PATH}"
echo "  Branch: ${DEPLOY_BRANCH}"
echo "=================================================="
echo ""

# ── SSH into the droplet and deploy ───────────────────────────
ssh -o StrictHostKeyChecking=no "${DEPLOY_USER}@${DEPLOY_HOST}" bash -s << EOF
set -euo pipefail

echo "--- Checking for required tools ---"
command -v git || { echo "ERROR: git not installed"; exit 1; }

echo "--- Setting up deploy path: ${DEPLOY_PATH} ---"
mkdir -p "${DEPLOY_PATH}"
cd "${DEPLOY_PATH}"

if [ ! -d ".git" ]; then
  echo "--- Cloning repository ---"
  git clone . . 2>/dev/null || true
  # If no remote is configured, just ensure files are here
else
  echo "--- Pulling latest code from branch: ${DEPLOY_BRANCH} ---"
  git fetch origin
  git checkout "${DEPLOY_BRANCH}"
  git pull origin "${DEPLOY_BRANCH}"
fi

echo ""
echo "=================================================="
echo "  Deployment complete!"
echo "  Apache2 is already serving from ${DEPLOY_PATH}/site — no restart needed."
echo "=================================================="
EOF

echo ""
echo "Done. Site deployed to ${DEPLOY_HOST}."
