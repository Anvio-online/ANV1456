#!/usr/bin/env bash
# PreToolUse(Write|Edit): ANTHROPIC_API_KEY never reaches the client, and .env is never edited.
# Non-negotiable in CLAUDE.md; ADR-0005.
set -uo pipefail

payload=$(cat)
file=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty')
body=$(printf '%s' "$payload" | jq -r '[.tool_input.content, .tool_input.new_string] | map(select(. != null)) | join("\n")')

deny() {
  jq -n --arg r "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $r
    }
  }'
  exit 0
}

case "$file" in
  *.env | *.env.local | *.env.*.local)
    deny "Refusing to write $file. Secrets are never edited by an agent and never committed — update it yourself, and mirror any new key (name only, no value) into .env.example."
    ;;
esac

[ -n "$body" ] || exit 0

if printf '%s' "$body" | grep -qE 'NEXT_PUBLIC_[A-Z_]*(ANTHROPIC|API_KEY|SECRET|TOKEN)'; then
  deny "This writes a secret behind a NEXT_PUBLIC_ prefix, which ships it to the browser. ANTHROPIC_API_KEY must never reach the client — server-side route handlers only. See CLAUDE.md and ADR-0005."
fi

if printf '%s' "$body" | grep -qE 'sk-ant-[A-Za-z0-9_-]{8,}'; then
  deny "This looks like a literal Anthropic API key in source. Keys live in .env (gitignored) and are read server-side through lib/env.ts. If this key is real, rotate it — it has been in a tool payload."
fi

# The agent-demo plan call requires a captured email, enforced server-side (ADR-0005).
case "$file" in
  */app/api/agent/*)
    if printf '%s' "$body" | grep -qiE '(//|/\*).*(skip|bypass|disable|remove).*(email|gate)'; then
      deny "This edits the agent route in a way that looks like it relaxes the email gate. That gate is enforced server-side by ADR-0005 and is not a UI nicety — changing it needs a superseding ADR, not an inline edit."
    fi
    ;;
esac

exit 0
