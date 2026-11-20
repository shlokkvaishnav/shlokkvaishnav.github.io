#!/usr/bin/env bash
# Done check: the same steps as CI (.github/workflows/ci.yml). Usage: bash .claude/check.sh
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"
out=$(mktemp -d)
failed=()
gate() { local name=$1; shift; echo "== $name"; "$@" || failed+=("$name"); }
gate tests node --test "tests/**/*.test.mjs"
gate build node scripts/build.mjs --out "$out"
gate links node scripts/check-links.mjs "$out"
rm -rf "$out"
if [ ${#failed[@]} -eq 0 ]; then echo "check: all gates passed"; else echo "check: FAILED: ${failed[*]}"; exit 1; fi
