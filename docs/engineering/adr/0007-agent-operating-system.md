# ADR-0007: The team's operating knowledge lives in the repo, split across `.claude/`, `docs/business/`, and `ops/`

**Status:** Accepted
**Date:** 2026-08-11
**Deciders:** Anshika

## Context

Anvio is one person doing nine jobs — strategy, growth, lead research, outreach, sales, architecture, social, design, and SEO — alongside a full-time job. Almost all of that work was being re-explained to an assistant from scratch each session, which meant three recurring failures:

1. **Context re-derivation.** Positioning, ICP, pricing, and the constraints of the current situation were restated conversationally every time, differently each time.
2. **Fabrication.** With no clients under the Anvio name, no cleared case studies, and no analytics, an assistant asked for a "confident" cold email or an SEO report would reach for plausible-sounding client results and traffic numbers. That is not a style problem — naming a client before the Stratseek agreement has been read is contractual exposure, and inventing metrics on a page selling trust is fatal to the product.
3. **Conventions living only in prose.** `docs/engineering/conventions.md` is good and long. The rules that actually break — arbitrary Tailwind values, section margins, secrets reaching the client — were caught at CI, or not at all.

The trigger was wanting nine named specialist agents. Nine agents each carrying their own copy of "who Anvio sells to" is nine copies that drift.

## Decision

Three directories, each with one job, and a strict rule about which holds what.

**`docs/business/`** — the **facts**. Positioning, ICP, services and pricing, current situation, competitors, voice. Prose for humans, and the only place a business fact is stated. It supersedes `docs/Initial/Brand_strategy.md` as the living version, the same way `system/design-system.md` superseded `Initial/design_direction.md`.

**`.claude/`** — the **behaviour**. Five layers: `rules/` (modular conventions, linked from `CLAUDE.md` rather than restated), `agents/` (the nine roles), `commands/` (workflows), `skills/` (procedures with their own reference material), `hooks/` (automated enforcement). No layer restates a fact from `docs/business/`; each reads it.

**`ops/`** — the **output**. Agent deliverables, dated. Four subdirectories holding personal or client-confidential data are gitignored, and a `PreToolUse` hook blocks force-adding them.

Two rules bind the whole thing:

- **`evidence-and-claims.md` outranks helpfulness.** A labelled gap is a correct output; a plausible guess is a defect. This is loaded for every agent.
- **Agents draft; humans act.** No agent sends, posts, pushes, merges, or submits.

## Alternatives considered

**Everything in `CLAUDE.md`.** Simplest. Rejected — `CLAUDE.md` is loaded into every session, so the honest version of all of this would cost thousands of tokens per turn regardless of the task. It is now an index and a list of non-negotiables; depth is one link away and loaded on demand.

**Business context inside each agent file.** Rejected outright: nine copies of the ICP is nine things to update and eight that will be stale. Agents point at `docs/business/`, which is why a positioning change is one edit.

**Business knowledge in an external tool** (Notion, a doc, a vector store). Rejected — it leaves version control, so a positioning change and the code change it motivates can't land in one reviewable commit, and it's a second system for one person to maintain.

**Prompt-only guardrails, no hooks.** Rejected. Instructions are advisory and degrade over a long session; the three rules that break most expensively (arbitrary values, secrets to the client, PII into git) are now mechanical. Validated at zero false positives across 184 source files.

**Committing lead data for continuity.** Rejected. Named individuals and their contact details in a repo with a public-facing future and a published privacy policy is a liability that git history makes permanent.

## Consequences

**Good.** Business context is taught once and versioned with the code. A positioning change is one file. Nine specialists share one factual base, so they cannot contradict each other. The three most expensive mistakes are mechanically prevented rather than hoped against. `git log` now explains the *company*, not just the site.

**Bad.** More directories to keep honest — a `rules/` file that drifts from the `docs/` page it condenses is worse than no rule, which is why `/doc-sync` checks for exactly that. `docs/business/current-situation.md` goes stale fastest and is the one most likely to be trusted while wrong; it carries a date and a warning for that reason. And the honesty constraints will sometimes produce a thinner deliverable than the founder wanted — that is the intended trade, not a bug.

**Revisit when:** Anvio has cleared client proof and real analytics. Roughly half the hard rules in `evidence-and-claims.md` exist because neither is true today, and keeping them past that point would suppress real, usable evidence. Also revisit if a second person joins — several rules assume a single operator, and `agent-outputs.md`'s "gitignored, local-only" model doesn't survive two people needing the same lead list.
