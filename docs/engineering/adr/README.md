# Architecture Decision Records

A short document per significant technical decision: what we chose, what we rejected, and what it costs us.

**ADRs are immutable.** When a decision changes, write a new ADR that supersedes the old one and mark the old one `Superseded by ADR-000N`. Never edit the reasoning of a past ADR — the record of what you used to believe, and why you changed your mind, is the whole value.

**Filename:** `NNNN-kebab-case-title.md`, four digits, sequential, never reused.

## Index

| # | Title | Status | Date |
|---|---|---|---|
| [0001](0001-pnpm-workspace-single-app.md) | pnpm workspace with a single app | Accepted | 2026-08-07 |
| [0002](0002-mdx-behind-content-adapter.md) | MDX content behind a repository adapter | Accepted | 2026-08-07 |
| [0003](0003-section-registry-composition.md) | Pages compose from a section registry | Accepted | 2026-08-07 |
| [0004](0004-motion-budget-and-perf-gates.md) | Per-page motion budget and CI performance gates | Accepted | 2026-08-07 |
| [0005](0005-agent-demo-model-and-email-gate.md) | Agent demo runs on Sonnet 5, behind an email gate | Accepted | 2026-08-07 |
| [0006](0006-content-page-authoring-model.md) | Content pages are a section frame around one MDX body | Accepted | 2026-08-08 |
| [0007](0007-agent-operating-system.md) | Team operating knowledge lives in the repo, split across `.claude/`, `docs/business/`, and `ops/` | Accepted | 2026-08-11 |

## Template

```markdown
# ADR-NNNN: <Title>

**Status:** Proposed | Accepted | Superseded by ADR-NNNN | Deprecated
**Date:** YYYY-MM-DD
**Deciders:** <names>

## Context
The situation and the forces at play. What makes this a real decision rather
than an obvious one? What constraints apply?

## Decision
What we are doing. Present tense, unambiguous.

## Alternatives considered
Each option, and the specific reason it lost. An ADR with no rejected
alternatives is a note, not a decision record.

## Consequences
**Good:** what this buys us.
**Bad:** what it costs — be honest, this is the section future-you reads.
**Revisit when:** the concrete trigger that would make us reconsider.
```

The **Revisit when** line matters most. A decision without a stated trigger for reconsidering becomes dogma.
