#!/usr/bin/env bash
set -euo pipefail

# Simple update script to pull latest changes and redeploy on the VPS.
# Usage: run from the repo root on the VPS: ./update.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "Fetching latest from origin/main..."
git fetch origin main
git reset --hard origin/main

echo "Running deploy script to rebuild and restart services..."
if [ ! -x ./deploy.sh ]; then
  chmod +x ./deploy.sh
fi
./deploy.sh

echo "Update + deploy finished."
