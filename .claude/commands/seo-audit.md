---
description: Run an SEO/GEO audit on anvio.online or a client site
argument-hint: '[site or scope — defaults to anvio.online]'
---

Run an SEO/GEO audit on: $ARGUMENTS (default to anvio.online if nothing given).

Use the `anvio-seo-analyst` agent.

For anvio.online specifically, two facts govern everything:

- **Zero domain authority.** Long-tail and GEO only. No head-term recommendations, no projection that assumes authority we don't have.
- **No analytics is wired into the site at all.** There is no traffic, ranking, or conversion data. The audit covers what's readable in the code and observable on the page — and must say plainly which recommendations can't be validated until analytics exists.

**No invented metrics.** No search volume, keyword difficulty, DA, backlink count, or ranking unless it was actually looked up, with the source and date. "Needs Ahrefs/Search Console" is the correct answer otherwise — the "What I could not measure" section should never be empty on this project.

Include the codebase-specific check: **is the content in the server-rendered HTML?** Any `'use client'` that moves copy out of the initial response is an SEO defect here, because server-rendered HTML is the strategy.

Order the fix list by impact ÷ effort, sized for one part-time person.
