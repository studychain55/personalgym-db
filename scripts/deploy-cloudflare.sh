#!/bin/zsh

set -euo pipefail

PROJECT_ROOT=${0:A:h:h}
cd "$PROJECT_ROOT"

[[ -f .env.local ]] && source ./.env.local
[[ -f .env.production ]] && source ./.env.production
[[ -f ~/.zshrc ]] && source ~/.zshrc

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "CLOUDFLARE_API_TOKEN is not set" >&2
  exit 1
fi

npm run build:cf
npx wrangler deploy
