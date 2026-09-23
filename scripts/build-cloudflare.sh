#!/bin/zsh

set -euo pipefail

PROJECT_ROOT=${0:A:h:h}
cd "$PROJECT_ROOT"

export NEXT_PRIVATE_STANDALONE=true
export NEXT_PRIVATE_OUTPUT_TRACE_ROOT="$PROJECT_ROOT"

npx next build --webpack
npx @opennextjs/cloudflare build --skipBuild
