---
description: Turn a client site, industry, and references into a sitemap, UX structure, and design direction
argument-hint: '<client site URL, industry, and any reference sites>'
---

Build a design brief for: $ARGUMENTS

Use the `anvio-design-director` agent.

The thing that makes a brief buildable here: **Anvio composes sections from a registry, it doesn't design bespoke pages.** Map every page to existing section types, prefer a new variant over a new type, and justify each genuinely new type — that's the difference between a 4-week site and an 8-week one (ADR-0003).

Also require:

- **References read for their principle, not their surface.** "One accent colour makes a small catalogue feel premium" is useful; "make it look like this" isn't.
- Direction in words and tokens — **never arbitrary hex values sprinkled through prose**.
- The accessibility floor and motion budget apply to client work too.
- A **build-implications** section: new types vs. variants, and what each adds to the timeline.
- **Open questions for the client** — brand assets, content ownership, integrations.

Goes to `ops/strategy/`.
