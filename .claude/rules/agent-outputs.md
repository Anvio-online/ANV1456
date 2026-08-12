# Agent outputs

Where an agent's work goes, and what must never be committed.

---

## 1. The `ops/` directory

Agent deliverables land in `ops/`, never in `docs/` (which is documentation) and never in `apps/` (which is the product).

| Path             | Holds                                                   | Tracked in git      |
| ---------------- | ------------------------------------------------------- | ------------------- |
| `ops/strategy/`  | Positioning reviews, pricing analyses, competitor scans | **Yes**             |
| `ops/growth/`    | Weekly growth plans, content calendars, experiment logs | **Yes**             |
| `ops/content/`   | Draft posts, threads, newsletters, repurposed pieces    | **Yes**             |
| `ops/seo/`       | Keyword maps, technical audits, content-gap analyses    | **Yes**             |
| `ops/templates/` | Reusable output scaffolds                               | **Yes**             |
| `ops/leads/`     | Researched lead lists                                   | **No — gitignored** |
| `ops/outreach/`  | Personalised emails and messages                        | **No — gitignored** |
| `ops/meetings/`  | Pre-meeting intelligence briefs                         | **No — gitignored** |
| `ops/proposals/` | Client proposals and scopes                             | **No — gitignored** |

Filenames: `YYYY-MM-DD-short-slug.md`. Dated, so staleness is visible without opening the file.

---

## 2. Personal data never enters git

`ops/leads/`, `ops/outreach/`, `ops/meetings/`, and `ops/proposals/` contain **named individuals, their email addresses, and their employers**. This repository has a public-facing future and a published privacy policy.

- These paths are gitignored. **Do not `git add -f` them.** A `PreToolUse` hook blocks staging them.
- Do not move their contents into a tracked path to "keep a record."
- Do not paste lead PII into a commit message, a PR body, an issue, or a doc.
- A tracked summary may reference **counts and patterns** — "14 Dubai ecommerce leads, 9 on Shopify" — never individuals.

`docs/private/` is already gitignored for a different purpose (employer/contract context). Don't mix the two.

---

## 3. Every output carries its provenance

Front-matter on every generated file:

```markdown
---
generated_by: anvio-lead-researcher
generated_at: 2026-08-11
inputs: 'Dubai ecommerce, 20–200 employees'
status: draft # draft | reviewed | actioned
---
```

`status: draft` means **a human has not checked it**. Nothing at `draft` goes to a client, gets published, or gets sent.

---

## 4. Agents don't send, publish, or push

An agent drafts. A human sends.

No agent emails a prospect, posts to social, opens a PR, pushes a branch, or submits a form. The deliverable is a file for review. This is a hard boundary, not a default to be relaxed when output looks good.
