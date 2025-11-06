#!/usr/bin/env bash
set -euo pipefail

# Simple deploy script for VPS:
# - builds images for backend and frontend
# - starts services using docker-compose.prod.yml

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env ]; then
	echo ".env not found. Please create a .env from .env.example and set DOMAIN and LETSENCRYPT_EMAIL."
	exit 1
fi

echo "Loading .env"
set -o allexport
source .env
set +o allexport

if [ "${USE_EXTERNAL_PROXY:-false}" = "true" ]; then
	echo "USE_EXTERNAL_PROXY=true — skipping Caddy and exposing frontend on host port ${EXTERNAL_PROXY_PORT:-8080}"
	echo "Building images..."
	docker compose -f docker-compose.prod.yml build --pull
	echo "Starting backend and frontend (no caddy)..."
	docker compose -f docker-compose.prod.yml up -d backend frontend
	echo "Deployment complete."
	echo "Frontend should be reachable via your external proxy at https://${DOMAIN}:${EXTERNAL_PROXY_PORT:-8080}/ (or http depending on your proxy)."
	echo "Backend (internal): http://${DOMAIN}:3000/ (if proxied expose /api/ to backend)"
else
	echo "Generating Caddyfile from template..."
	mkdir -p caddy
	sed -e "s/{DOMAIN}/${DOMAIN}/g" -e "s/{LETSENCRYPT_EMAIL}/${LETSENCRYPT_EMAIL}/g" caddy/Caddyfile.template > caddy/Caddyfile

	echo "Building images..."
	docker compose -f docker-compose.prod.yml build --pull
	echo "Starting all services (including caddy for TLS)..."
	docker compose -f docker-compose.prod.yml up -d

	echo "Deployment complete."
	echo "Frontend: https://${DOMAIN}/"
	echo "Backend (internal): http://${DOMAIN}:3000/ (proxied at /api/)"
fi
