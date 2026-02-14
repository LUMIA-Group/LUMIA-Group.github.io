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

TARGET_PORT="${PORT:-8080}"
if command -v lsof >/dev/null 2>&1; then
  if lsof -iTCP:"$TARGET_PORT" -sTCP:LISTEN -n -P >/dev/null 2>&1; then
    for CANDIDATE in 8081 8082 8083 8084 8085 8086 8087 8088 8089; do
      if ! lsof -iTCP:"$CANDIDATE" -sTCP:LISTEN -n -P >/dev/null 2>&1; then
        TARGET_PORT="$CANDIDATE"
        break
      fi
    done
  fi
fi

echo "Starting site at http://localhost:${TARGET_PORT}"
if command -v open >/dev/null 2>&1; then
  (sleep 2 && open "http://localhost:${TARGET_PORT}") >/dev/null 2>&1 || true
fi

npm run serve -- --port "$TARGET_PORT"
