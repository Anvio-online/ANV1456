#!/usr/bin/env bash
# PostToolUse(Write|Edit): enforce the two styling rules a linter catches only at CI time.
#   1. No Tailwind arbitrary values          — blocks (docs/system/design-system.md)
#   2. No vertical margin on a section root  — warns  (ADR-0003 / .claude/rules/sections.md)
set -uo pipefail

payload=$(cat)
file=$(printf '%s' "$payload" | jq -r '.tool_response.filePath // .tool_input.file_path // empty')

[ -n "$file" ] || exit 0
[ -f "$file" ] || exit 0

case "$file" in
  */apps/web/src/*.ts | */apps/web/src/*.tsx) ;;
  *) exit 0 ;;
esac

# Arbitrary values: `text-[#FF9130]`, `p-[37px]`. Variant selectors that legitimately
# take a bracket argument (data-[…], group-[…], min-[…] …) are not arbitrary values.
arbitrary=$(
  grep -noE '[a-zA-Z0-9:_-]*-\[[^]]*\]' "$file" 2>/dev/null \
    | grep -vE ':?(data|aria|group|peer|has|not|supports|min|max|nth|where|is)-\[' \
    || true
)

if [ -n "$arbitrary" ]; then
  jq -n --arg f "$file" --arg m "$arbitrary" '{
    decision: "block",
    reason: ("Arbitrary Tailwind values in \($f) — these fail CI.\n\n\($m)\n\nAdd a token to apps/web/src/styles/tokens.css (or the globals.css @theme block) and use it. Do not inline the value. See .claude/rules/styling.md. If a match is a false positive, say so rather than silently ignoring it.")
  }'
  exit 0
fi

# Sections own no vertical margin — the renderer applies --section-y.
case "$file" in
  */apps/web/src/sections/*)
    margins=$(grep -noE '(^|["'"'"'` ])(-?m[tby])-[a-z0-9.]+' "$file" 2>/dev/null || true)
    if [ -n "$margins" ]; then
      jq -n --arg f "$file" --arg m "$margins" '{
        systemMessage: ("Vertical margin found in a section file: \($f)\n\($m)\nSections own no vertical margin — <Section> applies --section-y. Fine on an inner element; a bug on the section root."),
        hookSpecificOutput: {
          hookEventName: "PostToolUse",
          additionalContext: ("Vertical margin utilities in \($f):\n\($m)\nPer .claude/rules/sections.md a section root must not carry mt-*/mb-*/my-*. Verify these are on inner elements, not the root, and fix if they are on the root.")
        }
      }'
    fi
    ;;
esac

exit 0
