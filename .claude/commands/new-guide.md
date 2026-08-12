---
description: Write a new MDX guide — validate the query first, then draft it to the content rules
argument-hint: '<topic, or the question the reader is asking>'
---

Write a new guide on: $ARGUMENTS

Read `.claude/rules/content-authoring.md` and `docs/business/voice-and-tone.md` first.

1. **Validate the query before writing.** anvio.online has zero authority — long-tail, specific intent only. Ask `anvio-seo-analyst` if the target query matters, and remember the slug **is** the URL, so getting it wrong costs a redirect later. Two leaves already shipped on unvalidated slugs; don't add a third.

2. **Check what already exists** in `apps/web/content/guides/` — eight guides are published. Depth on an existing cluster beats an orphan topic, and an internal link into an existing guide is worth more than a new standalone page.

3. **Draft it.** 1,200–2,000 words. Open with the question the reader actually typed. Concrete over abstract, specific numbers or no numbers, name the tradeoff. **End with an honest "when this doesn't apply"** — that section is the credibility mechanism.

4. **Frontmatter must pass the Zod schema** in `apps/web/src/lib/content/schemas.ts`. Read it, don't guess the fields. Byline stays at the role fallback — no invented name.

5. **Check every link resolves.** `relatedLinks` and inline body links, against routes that actually exist. This has broken twice.

6. **Don't use `<Comparison>`** — it crashes the production build under `next-mdx-remote/rsc`. Plain markdown table instead.

7. `pnpm verify`, then read the rendered page in the browser.
