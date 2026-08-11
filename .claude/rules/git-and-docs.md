# Git, docs, and decisions

From [workflow.md](../../docs/engineering/workflow.md).

---

## Four records, none substituting for another

| Artifact                               | Answers                                       |
| -------------------------------------- | --------------------------------------------- |
| **Commit**                             | What changed, and why _this_ change           |
| **PR**                                 | What this batch does, and how it was verified |
| **`CHANGELOG.md`**                     | What a user or stakeholder would notice       |
| **[ADR](../../docs/engineering/adr/)** | Why the architecture is the way it is         |

The commonest failure is stopping at commits.

## Branches and commits

`<type>/<short-description>`. **One branch, one concern.**

Conventional Commits, enforced by commitlint:

- Types: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`
- Scopes: `home` `automate` `build` `grow` `sections` `motion` `agent` `seo` `db` `ui` `content` `deps` `repo`

**The subject says what; the body says why.** If the why isn't obvious, a body is required — that paragraph is the most valuable thing in the commit.

Never commit secrets or `.env`. Never force-push a shared branch. Never commit broken code — it breaks `bisect`.

## Before committing

**`pnpm verify` must pass** (`typecheck && lint && test && build`). Don't commit without it, and never bypass hooks with `--no-verify` — fix the cause.

## Docs move with the code

**Update docs in the same PR as the change.** A doc updated later is a doc that was wrong in between, and nobody knows which parts.

**One source of truth per fact.** A colour lives in design-system.md and nowhere else. If you find a value duplicated, delete one and link.

Adding a top-level directory is a change to [repo-structure.md](../../docs/engineering/repo-structure.md). Adding a file inside an existing one is not.

## ADRs

Write one when: choosing between real alternatives, setting a constraint others must follow, reversing an earlier decision, or making a call with a non-obvious tradeoff that is expensive to reverse.

Don't write one for: library choices a comment covers, or naming preferences.

**ADRs are immutable.** A changed decision gets a _new_ ADR that supersedes the old one; the old one stays, marked Superseded. Don't quietly edit the document describing the old choice.

## Actions that need a human

Never without explicit confirmation in the conversation: pushing, opening or merging a PR, force-pushing, `git reset --hard`, deleting a branch, tagging a release, or anything touching production or the database. Local commits on a feature branch are fine.
