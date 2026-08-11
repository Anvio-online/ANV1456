---
description: Research and score a batch of leads for a given segment
argument-hint: "<segment — e.g. 'Dubai ecommerce companies, 20–200 staff'>"
---

Research leads for: $ARGUMENTS

Use the `anvio-lead-researcher` agent.

What a good result looks like: **every row names a specific, observed reason to talk to Anvio.** A row whose opportunity column says "could use AI automation" is padding — that's true of everyone. Six real leads beat thirty filler ones.

Hold it to these:

- Every fact carries its source and the date checked. Inferences labelled as inferences.
- **Public business sources only.** No guessed emails, no personal contact details, no scraping behind logins or bot protection.
- Output goes to `ops/leads/` which is **gitignored and stays that way** — never `git add -f`, never copy the contents into a tracked file.
- Report which segments came up dry. That's a real finding, not a failure.

When it's done, tell me the score distribution and which leads are worth handing to `anvio-outreach-writer` — don't draft outreach in this step.
