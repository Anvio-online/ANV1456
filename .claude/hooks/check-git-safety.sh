#!/usr/bin/env bash
# PreToolUse(Bash) on git commands: keep lead/client PII out of git, and keep
# irreversible git operations in human hands.
# See .claude/rules/agent-outputs.md §2 and .claude/rules/git-and-docs.md.
set -uo pipefail

payload=$(cat)
raw=$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')

[ -n "$raw" ] || exit 0

# Strip heredoc bodies before matching. A commit message that *mentions* --no-verify
# or ops/leads is prose, not an invocation, and matching it is a false positive.
cmd=$(printf '%s\n' "$raw" | awk '
  !inhd && match($0, /<<-?[[:space:]]*'"'"'?"?[A-Za-z_][A-Za-z0-9_]*'"'"'?"?/) {
    d = substr($0, RSTART, RLENGTH)
    gsub(/^<<-?[[:space:]]*|['"'"'"]/, "", d)
    inhd = 1; delim = d; print; next
  }
  inhd { if ($0 == delim || $0 == "\t" delim) inhd = 0; next }
  { print }
')

# Same reasoning for -m/--message bodies: a commit subject that names a flag is
# describing it, not passing it. Paths stay visible so `git add -f` is still caught.
cmd=$(printf '%s\n' "$cmd" | sed -E \
  -e 's/(-m|--message)[=[:space:]]+"[^"]*"/\1 MSG/g' \
  -e "s/(-m|--message)[=[:space:]]+'[^']*'/\1 MSG/g")

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

ask() {
  jq -n --arg r "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: $r
    }
  }'
  exit 0
}

# Force-adding a gitignored path is the only way this PII reaches git. Block it.
if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+add' \
   && printf '%s' "$cmd" | grep -qE '(-f|--force)' \
   && printf '%s' "$cmd" | grep -qE '(ops/(leads|outreach|meetings|proposals)|docs/private)'; then
  deny "Refusing to force-add a gitignored PII path. ops/leads, ops/outreach, ops/meetings, ops/proposals and docs/private contain named individuals, their contact details, and client-confidential material — they are gitignored deliberately (.claude/rules/agent-outputs.md §2). A tracked summary may carry counts and patterns, never individuals."
fi

if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+commit' \
   && printf '%s' "$cmd" | grep -qE '(--no-verify|-n[[:space:]]|-n$)'; then
  deny "Refusing to bypass commit hooks. --no-verify skips commitlint and lint-staged. Fix the cause — a failing hook is telling you something. See .claude/rules/git-and-docs.md."
fi

# Irreversible or shared-state operations: a human confirms, every time.
if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+push.*(--force|-f([[:space:]]|$))'; then
  ask "Force-push — this can overwrite work on the remote. Confirm the branch and that nobody else has it."
fi

if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+(push|reset[[:space:]]+--hard|clean[[:space:]]+-[a-z]*f|branch[[:space:]]+-D|tag)'; then
  ask "This git command either touches shared state or discards local work. Confirm before it runs — see .claude/rules/git-and-docs.md."
fi

exit 0
