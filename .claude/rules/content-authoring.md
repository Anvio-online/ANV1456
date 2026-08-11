# Content authoring

From [content-layer.md](../../docs/engineering/content-layer.md) and [ADR-0006](../../docs/engineering/adr/0006-content-page-authoring-model.md).

---

## Mechanics

- MDX lives in `apps/web/content/<kind>/<slug>.mdx`. **The filename is the URL slug.**
- Frontmatter is **Zod-validated**. Adding a field means updating `lib/content/schemas.ts` first
- Pages call `lib/content` — **never `import` an MDX file directly**
- A new MDX file publishes itself into `sitemap.ts` with no code change. That was the point of the content adapter
- `.content-collections/` is generated. Never hand-edited, never committed

## Known landmines

- **`<Comparison>` is registered and broken.** Array-literal JSX props arrive `undefined` under `next-mdx-remote/rsc`, which crashes the production build. Use a plain markdown table until someone diagnoses it
- **Check every `relatedLinks` entry and inline link resolves.** Both shipped service leaves once pointed at a leaf that was never built — a live 404. See [sections.md](sections.md)
- `insights` vs `guides` as one content kind or two is **still undecided**. `/guides` currently reads a curated slug list in the page file, not a `kind` query

## Writing

Voice, banned words, and per-channel calibration: [voice-and-tone.md](../../docs/business/voice-and-tone.md).

A guide is 1,200–2,000 words, opens with the question the reader typed, and **ends with an honest "when this doesn't apply."** That last section is the credibility mechanism — it's what a competitor's content won't have.

All bylines currently use the role fallback — `"Anvio's founding engineer"`, no personal name. Swapping in a real name later is a frontmatter string change; don't invent one now.

## Claims in content

[evidence-and-claims.md](evidence-and-claims.md) applies fully. No client names, no results metrics, no traffic numbers. A guide may reference the agent demo and the ROI calculator freely — both are real and ours.
