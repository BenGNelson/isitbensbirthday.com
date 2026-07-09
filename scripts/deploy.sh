#!/usr/bin/env bash
# ============================================================
# deploy.sh — Deploy isitbensbirthday to a remote server
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
# The droplet serves DEPLOY_PATH/site directly via Apache, so "deploy" just
# means fast-forwarding the checkout to origin/DEPLOY_BRANCH. No build, no
# restart. The repo must already exist (bootstrap: see DROPLET.md).
ssh -o StrictHostKeyChecking=accept-new "${DEPLOY_USER}@${DEPLOY_HOST}" bash -s << EOF
set -euo pipefail

echo "--- On \$(hostname) as \$(whoami) ---"
command -v git >/dev/null || { echo "ERROR: git not installed"; exit 1; }

if [ ! -d "${DEPLOY_PATH}/.git" ]; then
  echo "ERROR: ${DEPLOY_PATH} is not a git checkout."
  echo "Bootstrap it first (see DROPLET.md § First-time provision), e.g.:"
  echo "  git clone <your-repo-url> ${DEPLOY_PATH}"
  exit 1
fi

cd "${DEPLOY_PATH}"

# If the deploy user doesn't own the repo (e.g. deploying as root), git needs a
# safe.directory override. Add it once, idempotently — the old script appended
# a duplicate on every deploy.
if ! git config --global --get-all safe.directory 2>/dev/null | grep -qx "${DEPLOY_PATH}"; then
  git config --global --add safe.directory "${DEPLOY_PATH}"
fi

# Never clobber uncommitted edits made directly on the droplet.
if [ -n "\$(git status --porcelain)" ]; then
  echo "ERROR: ${DEPLOY_PATH} has uncommitted local changes — refusing to pull."
  git status --short
  exit 1
fi

echo "--- Pulling ${DEPLOY_BRANCH} ---"
git fetch origin
git checkout "${DEPLOY_BRANCH}"
git pull --ff-only origin "${DEPLOY_BRANCH}"

echo ""
echo "=================================================="
echo "  Deployed \$(git rev-parse --short HEAD): \$(git log -1 --pretty=%s)"
echo "  Apache serves ${DEPLOY_PATH}/site directly — no restart needed."
echo "=================================================="
EOF

echo ""
echo "Done. Site deployed to ${DEPLOY_HOST}."
