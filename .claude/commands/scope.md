---
description: Turn a client requirement into architecture, phases, effort ranges, risks, and a proposal structure
argument-hint: '<the client requirement>'
---

Scope this: $ARGUMENTS

Use the `anvio-technical-architect` agent.

Hold it to the constraints that make an estimate honest here:

- **One part-time delivery person.** An estimate that assumes a team is wrong, and becomes a missed deadline with a client watching. State the assumed weekly capacity.
- **Ranges, never a single number** — optimistic / likely / pessimistic, with the assumptions attached. Include discovery, review cycles, content, QA, deployment, and handover as explicit line items; that's where estimates die.
- **Map it to a published tier and floor**, and say loudly if the scope doesn't comfortably fit the tier's published timeline. Those timelines are a public commitment.
- **"Explicitly excluded" is never empty.** Unstated exclusions become free work.
- If the requirement isn't clear enough to scope, the correct output is the list of questions that must be answered first — not a scope built on guesses.

Goes to `ops/proposals/` (gitignored). I quote and sign, not you.
