#!/usr/bin/env bash

set -euo pipefail

formal_repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
formal_project_dir="$formal_repo_root/formal/lean"
formal_expected_vectors="$formal_repo_root/tests/formal-conformance/generated-vectors.json"
formal_actual_vectors="$(mktemp)"

cleanup_formal_vectors() {
  rm -f "$formal_actual_vectors"
}
trap cleanup_formal_vectors EXIT

lean --version | grep -Fq 'version 4.30.0'
lake --version | grep -Fq 'Lake version 5.0.0'

if rg -n '^\s*(sorry|axiom\s)' "$formal_project_dir" -g '*.lean'; then
  echo 'Formal verification rejected: sorry or a user-defined axiom is present.' >&2
  exit 1
fi

cd "$formal_project_dir"
lake build
lake exe dosage-reference vectors > "$formal_actual_vectors"

node -e 'JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8"))' \
  "$formal_expected_vectors"
node -e 'JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8"))' \
  "$formal_actual_vectors"
diff -u "$formal_expected_vectors" "$formal_actual_vectors"

echo 'Lean proofs, axiom audit surface, and canonical vectors verified.'
