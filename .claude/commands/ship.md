---
description: Run pnpm verify, update CHANGELOG if user-visible, and commit the current work as a Conventional Commit
argument-hint: '[optional: what this change is]'
---

Ship the current working changes. $ARGUMENTS

Follow `.claude/rules/git-and-docs.md`. Do all of this, in order, and stop at the first failure rather than working around it:

1. **`git status` and `git diff`** — understand what actually changed. If unrelated changes are mixed in, say so and ask before committing; one branch, one concern.

2. **`pnpm verify`** (`typecheck && lint && test && build`). If it fails, **fix the cause**. Never `--no-verify`, never skip a test, never loosen a lint rule to get green.

3. **Definition of done** — check what applies from `docs/engineering/conventions.md` §10. Flag anything unverifiable here (visual checks, both themes, reduced-motion, breakpoints) rather than claiming it passed.

4. **Docs** — if a decision or contract changed, update the doc **in this commit**. If an architectural call was made, propose an ADR.

5. **CHANGELOG.md** — add an entry under `[Unreleased]` if a user or stakeholder would notice. Skip silently if not, and say why.

6. **Commit.** Conventional Commits; commitlint enforces types and scopes (`home` `automate` `build` `grow` `sections` `motion` `agent` `seo` `db` `ui` `content` `deps` `repo`). Subject says what, body says **why** — write the body unless the why is genuinely obvious.

**Do not push. Do not open a PR.** Report what was committed and what the next step would be.
