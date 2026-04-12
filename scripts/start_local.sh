#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "❌ Docker is not installed. Install Docker Desktop first: https://www.docker.com/products/docker-desktop/"
  exit 1
fi

cp -n backend/.env.example backend/.env || true
cp -n frontend/.env.local.example frontend/.env.local || true

echo "🚀 Starting SHASIT stack..."
docker compose up --build
