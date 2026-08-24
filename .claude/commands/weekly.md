---
description: Run the weekly growth cycle — review last week, plan this week, update the content calendar
argument-hint: '[optional: anything notable that happened this week]'
---

Run this week's growth cycle. Context from me: $ARGUMENTS

Use the `anvio-growth-manager` agent. It reads last week's plan from `ops/growth/` and continues the cycle rather than starting fresh.

Remind it of the two constraints it exists to respect:

- **One person with a full-time job.** Must-ship is 1–3 items, chosen so the week is worth it even if nothing else lands.
- **No analytics is wired.** There is no traffic or engagement data. Report what shipped and what's observable — never invent a number.

If anything this week touches keywords or rankings, hand that part to `anvio-seo-analyst` rather than guessing.
