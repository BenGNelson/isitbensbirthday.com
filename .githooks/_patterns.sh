# Sourced by the git hooks and by scripts/check-secrets.sh. Builds $FORBIDDEN —
# a regex alternation of the LITERAL values this repo must never contain (this
# machine's hostname, IPs, paths, surname, personal emails).
#
# The values live in the gitignored .githooks/patterns.local (one POSIX extended
# regex per line; blank lines and "#" comments ignored), so the literals are
# ENFORCED without ever being committed. See patterns.local.example.
#
# This indirection is the whole point. The previous design kept the literals in
# scripts/check-secrets.sh, which is tracked in a PUBLIC repo and excluded itself
# from its own scan — so it passed every run while publishing the complete list
# of things it existed to hide. A scanner must never be the leak.
_hooks_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FORBIDDEN=""
_pat_file="$_hooks_dir/patterns.local"
if [ -f "$_pat_file" ]; then
  while IFS= read -r _line || [ -n "$_line" ]; do
    case "$_line" in '' | \#*) continue ;; esac
    if [ -z "$FORBIDDEN" ]; then
      FORBIDDEN="$_line"
    else
      FORBIDDEN="$FORBIDDEN|$_line"
    fi
  done < "$_pat_file"
fi
