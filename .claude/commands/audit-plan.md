---
description: Run the four-way strategy audit against a plan before acting on it
argument-hint: '[the plan, or a path to it]'
---

Audit this plan before anything is acted on: $ARGUMENTS

Read `.claude/rules/strategy-audit.md` and follow it exactly. Read the four business documents it names — `docs/business/positioning.md`, `icp.md`, `services-and-pricing.md`, `current-situation.md` — do not work from memory of them.

**Lead with what's wrong.** A plan audit that only confirms the plan has not been done properly. Check the two recurring traps explicitly:

- **Capacity** — does this only succeed at 100% execution by one person with a full-time job? State the floor.
- **Proof** — does this quietly assume client names, case studies, automation proof, or metrics Anvio does not have?

Output the audit block from the rule file, then a short verdict: proceed / proceed with these changes / don't.
