# `ops/` — agent output

Where the business agents in [`.claude/agents/`](../.claude/agents/) write their deliverables. Not documentation (`docs/`), not product (`apps/`).

Rules: [`.claude/rules/agent-outputs.md`](../.claude/rules/agent-outputs.md).

---

## Layout

| Path         | Holds                                                                  | Tracked             |
| ------------ | ---------------------------------------------------------------------- | ------------------- |
| `strategy/`  | Positioning reviews, pricing analyses, competitor scans, design briefs | **Yes**             |
| `growth/`    | Weekly plans, content calendars, experiment logs                       | **Yes**             |
| `content/`   | Draft posts, threads, newsletters                                      | **Yes**             |
| `seo/`       | Keyword maps, technical audits, content-gap analyses                   | **Yes**             |
| `templates/` | Reusable output scaffolds                                              | **Yes**             |
| `leads/`     | Researched lead lists                                                  | **No — gitignored** |
| `outreach/`  | Personalised emails and messages                                       | **No — gitignored** |
| `meetings/`  | Pre-meeting intelligence briefs                                        | **No — gitignored** |
| `proposals/` | Client proposals and scopes                                            | **No — gitignored** |

Filenames are `YYYY-MM-DD-short-slug.md`, so staleness is visible without opening the file.

---

## The four untracked directories

They contain **named individuals, their contact details, and client-confidential material**. This repository has a public-facing future and a published privacy policy.

- They are gitignored. **Never `git add -f`** — a `PreToolUse` hook blocks it.
- Never move their contents into a tracked path "to keep a record."
- Never paste their contents into a commit message, PR body, issue, or doc.
- A tracked file may reference **counts and patterns** — "14 Dubai ecommerce leads, 9 on Shopify" — never individuals.

They are absent from a fresh clone. Create them as needed; the agents will.

---

## Provenance

Every generated file carries frontmatter:

```markdown
---
generated_by: anvio-lead-researcher
generated_at: 2026-08-11
inputs: 'Dubai ecommerce, 20–200 employees'
status: draft # draft | reviewed | actioned
---
```

**`status: draft` means no human has checked it.** Nothing at `draft` goes to a client, gets published, or gets sent.
