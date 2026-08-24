# `.claude/` — how the Anvio team works

The team's operating knowledge, checked into the repo so it is taught once and applies to every session.

Five layers, each with one job:

| Layer                      | Job                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| **[rules/](rules/)**       | Modular conventions. What to do, what fails. Linked from `CLAUDE.md` rather than restated |
| **[agents/](agents/)**     | Specialised roles — nine of them, covering strategy through delivery                      |
| **[commands/](commands/)** | Reusable workflows, invoked as `/name`                                                    |
| **[skills/](skills/)**     | Procedures with their own reference material, loaded when the task matches                |
| **[hooks/](hooks/)**       | Automated guardrails wired in [settings.json](settings.json)                              |

The **facts** those layers reason over live in [`docs/business/`](../docs/business/) — positioning, ICP, services and pricing, current situation, competitors, voice. Agents read from there and never invent around it.

Why it's split this way: [ADR-0007](../docs/engineering/adr/0007-agent-operating-system.md).

---

## The agents

Nine roles. Each one reads `docs/business/` before it works, and none of them sends, publishes, pushes, or commits — **an agent drafts, a human acts.**

| Agent                        | Use it for                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `anvio-strategy-director`    | Positioning, pricing, service mix, competitive stance, pressure-testing a plan |
| `anvio-growth-manager`       | The weekly cycle — content calendar, SEO opportunities, experiments            |
| `anvio-lead-researcher`      | A segment → a scored, sourced lead table                                       |
| `anvio-outreach-writer`      | Qualified leads → cold emails, LinkedIn messages, follow-ups                   |
| `anvio-sales-intelligence`   | Everything to know about a company before a meeting                            |
| `anvio-technical-architect`  | Requirements → architecture, phases, effort ranges, risks                      |
| `anvio-social-media-manager` | One raw thought → every channel                                                |
| `anvio-design-director`      | Client site + references → sitemap, UX, design direction                       |
| `anvio-seo-analyst`          | Keywords, technical SEO, content gaps, backlinks, GEO                          |

## The commands

**Engineering:** `/ship` · `/new-section` · `/new-guide` · `/doc-sync`
**Business:** `/audit-plan` · `/weekly` · `/find-leads` · `/prep-meeting` · `/scope` · `/design-brief` · `/repurpose` · `/seo-audit`

## The skills

`anvio-brand-voice` — the two-stage claims-then-voice edit on anything a person outside Anvio will read.
`lead-qualification` — the 100-point rubric, plus the anti-inflation check.
`proposal-builder` — a scope turned into a document a non-technical owner will sign.

## The hooks

| Hook                  | Fires on                  | Does                                                                                                                           |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `check-secrets.sh`    | `PreToolUse` Write/Edit   | **Denies** `.env` edits, `NEXT_PUBLIC_` secrets, literal API keys, and edits that look like they relax the ADR-0005 email gate |
| `check-git-safety.sh` | `PreToolUse` Bash `git *` | **Denies** force-adding gitignored PII and `--no-verify`; **asks** before push, force-push, hard reset, branch delete, tag     |
| `check-styles.sh`     | `PostToolUse` Write/Edit  | **Blocks** arbitrary Tailwind values; **warns** on vertical margin in a section file                                           |

All three were validated against the real codebase: **zero false positives across 184 source files and 84 section files.** They fire only on new violations.

If a hook stops firing after an edit to `settings.json`, open `/hooks` once or restart — the settings watcher only watches directories that had a settings file when the session began.

---

## Two boundaries that don't move

**Agents draft; humans act.** No agent emails a prospect, posts to social, opens a PR, pushes a branch, or submits a form. `status: draft` on an output means no human has checked it, and nothing at `draft` leaves the building.

**Lead and client data never enters git.** `ops/leads/`, `ops/outreach/`, `ops/meetings/`, and `ops/proposals/` hold named individuals and client-confidential material. They are gitignored, a hook blocks force-adding them, and a tracked summary may carry counts and patterns but never individuals. [rules/agent-outputs.md](rules/agent-outputs.md) §2.

---

## Changing this

Rules condense a `docs/` page — when the doc changes, the rule changes in the same PR, or it has silently drifted and become worse than nothing. `/doc-sync` checks for exactly that.
