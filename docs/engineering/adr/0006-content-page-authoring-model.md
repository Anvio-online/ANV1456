# ADR-0006: Content pages are a section frame around one MDX body

**Status:** Accepted
**Date:** 2026-08-08
**Deciders:** Anshika

## Context

Phase 1's six pages are all hand-composed: `page.tsx` exports a `SectionInstance[]` and every string is a literal in that array. That works because there are six of them and each is a bespoke sales page.

Phase 2 breaks that assumption. It adds service leaves, industry leaves, case study details, and guides — and [seo-strategy.md](../../system/seo-strategy.md) §4 puts a hard substance floor on them: leaf pages ≥ 800 words, guides ≥ 1,800. A 1,800-word guide expressed as a `paragraphs: string[]` prop inside a TypeScript file is not a document anyone will edit twice. It also has no headings inside the body, no links, no lists, no tables — which is the exact structure [seo-strategy.md](../../system/seo-strategy.md) §7 says GEO extraction depends on.

At the same time, [ADR-0003](0003-section-registry-composition.md) is load-bearing and we do not want to escape it. The renderer is what guarantees one `<h1>` per page, correct heading levels computed from document order, `--section-y` spacing, and theme sequencing. A page authored as free-form MDX gets none of those guarantees.

So the real question is not "MDX or section arrays." It is **where the boundary between them sits**, and that boundary is expensive to move later — it determines the shape of every content file we write from here on.

## Decision

Phase 2 pages fall into exactly three classes, and each has one authoring model.

**1. Composed pages** — `/services`, `/industries`, `/case-studies`, `/projects`, `/privacy`, `/terms`, `/cookies`.
Pure `SectionInstance[]` in `page.tsx`, exactly as Phase 1. No MDX. These are navigational and legal surfaces whose copy is short and structural.

**2. Hybrid pages** — service leaves, industry leaves, case study details.
The section array is **derived from an MDX entry**, not written per page. One `[slug]/page.tsx` (or one literal leaf route) reads an entry through `lib/content`, maps its validated frontmatter onto the section array, and renders the prose body through a single `richText:mdx` section. Structured content — FAQ items, metrics, related links, cluster sub-items — lives in **frontmatter**, not in the body. Prose lives in the body.

**3. Article pages** — guides, and blog posts when they land.
A fixed section frame — `breadcrumb · hero:page-lead · tableOfContents · richText:mdx · authorBio · relatedLinks · ctaClosing` — with everything except the body coming from frontmatter. The frame is identical for every article; only the body and the frontmatter differ.

**The rule that keeps this from becoming ADR-0003's escape hatch:** an MDX body may contain prose, headings (`##`/`###` only — the renderer owns `<h1>`), lists, tables, code, images, and a **whitelisted set of inline components** (`<Callout>`, `<Figure>`, `<Comparison>`). It may **never** contain a section component. A section inside an MDX body is outside the renderer, which means its heading level, spacing, and theme are unverifiable — and it re-opens the "25 subtly different pages" failure ADR-0003 exists to prevent.

Corollary: `richText` gains an `mdx` variant alongside `prose` and `numbered-steps`. It is the only section permitted to render compiled MDX.

## Alternatives considered

**Everything stays in section arrays.** Maximum consistency, zero new machinery. Rejected on the substance floor: 1,800 words as string props is unwritable and unreviewable, produces no in-body headings for the table of contents to target, and guarantees that the first non-developer who joins cannot publish anything — which is the exact migration [ADR-0002](0002-mdx-behind-content-adapter.md) was designed to make cheap.

**Full MDX pages — the page body *is* the MDX file, with section components imported into it.** Maximum authoring freedom. Rejected: it bypasses `SectionRenderer` entirely, so heading-level resolution, `--section-y`, theme sequencing, and the "sections own no vertical margin" invariant all become per-file conventions enforced by nobody. It also means a content edit can break a page's layout, which is the wrong blast radius for content.

**A `sections:` array inside MDX frontmatter.** Keeps the renderer, moves composition to content. Rejected: frontmatter becomes a poorly-typed programming language, layout decisions move out of code review into content review, and Zod validation of an arbitrary section union in YAML is far more machinery than writing the mapping in TypeScript once per page class.

**A CMS now, instead of MDX.** Rejected for the same reasons as [ADR-0002](0002-mdx-behind-content-adapter.md) — nothing has changed. Revisit that ADR, not this one.

## Consequences

**Good:** Three page classes cover every remaining page in the IA, so a new service leaf is an MDX file rather than a route. The renderer's guarantees survive on every page. Prose is written in the format prose should be written in, with real `<h2>`/`<table>`/`<ol>` semantics — which is what §7's extractability argument actually requires. `tableOfContents` has real headings to build from. When a writer joins, the MDX bodies and frontmatter port to a CMS and the section frames don't change at all.

**Bad:** Two places to look for a leaf page's content — frontmatter for structure, body for prose — and the split has judgement in it ("is this FAQ an answer or a section?"). The whitelist needs enforcing in review; MDX will happily render anything imported into scope. The frontmatter schemas become the real contract and get big. And a page class's frame is now shared, so a change to the guide frame changes every guide at once — which is the point, but it means guide frames need the same review care as a component.

**Revisit when:** a page class needs its frame varied per entry more than twice. That would mean the class boundary is drawn in the wrong place, and either the class should split or that content should move back to a composed page.
