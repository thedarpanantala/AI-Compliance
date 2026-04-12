#!/usr/bin/env bash
set -euo pipefail
pip install -r backend/requirements.txt
pytest backend/tests
cd frontend
npm ci
npm run build
