---
description: Build a pre-meeting intelligence brief on a company
argument-hint: '<company name and website>'
---

Prepare me for a meeting with: $ARGUMENTS

Use the `anvio-sales-intelligence` agent.

The framing that matters: **Anvio has no track record to lean on.** This meeting is won by understanding their business better than they expect a vendor to, and by being the first person to put a number on a problem they've been tolerating. Weight the brief toward their situation, not Anvio's pitch.

Requirements:

- Open with a **60-second read** — five bullets I can absorb walking in.
- The **automation opportunities** section is the one that matters most. Evidence for each, and label inferences as inferences.
- **8–12 questions**, including the two or three that would disqualify them. A fast no is worth more than a slow maybe.
- **"What I could not find out" is never empty.**
- Never suggest citing a client, a case study, or a results metric — none exist that are cleared for use.

Brief goes to `ops/meetings/` (gitignored). If it turns into a real opportunity, `anvio-technical-architect` does the scoping — not this step.
