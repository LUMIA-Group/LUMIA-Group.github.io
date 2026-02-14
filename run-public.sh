#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required but was not found in PATH." >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Building production site..."
npm run build

HOST="${HOST:-0.0.0.0}"
PORT="${PORT:-8080}"

echo "Starting public server on http://${HOST}:${PORT}"
HOST="$HOST" PORT="$PORT" npm run serve:public
