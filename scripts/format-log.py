#!/usr/bin/env python3
# format-log.py — pretty-print login_attempt events from debug.log
# Reads from stdin so it can be piped from either local or remote log.
#
# Usage:
#   cat logs/debug.log | python3 scripts/format-log.py
#   ./scripts/read-log.sh --remote | python3 scripts/format-log.py

import json
import sys

COL = {
    "ts":        ("Timestamp",  24),
    "username":  ("Username",   16),
    "password":  ("Password",   16),
    "screen":    ("Screen",     12),
    "userAgent": ("User Agent", 60),
}

header  = "  ".join(f"{label:<{w}}" for label, w in COL.values())
divider = "  ".join("-" * w        for _, w    in COL.values())
print(header)
print(divider)

count = 0
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    try:
        d = json.loads(line)
    except json.JSONDecodeError:
        continue
    if d.get("event") != "login_attempt":
        continue
    row = "  ".join(
        f"{str(d.get(key, '')):<{w}}"[:w]
        for key, (_, w) in COL.items()
    )
    print(row)
    count += 1

print(divider)
print(f"{count} attempt(s)")
