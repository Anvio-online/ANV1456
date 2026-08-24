# SEO and accessibility

From [seo-strategy.md](../../docs/system/seo-strategy.md) and [conventions.md](../../docs/engineering/conventions.md) §6–§7.

---

## The position this protects

Server-rendered HTML **is** the SEO strategy. Every `'use client'` that moves copy out of the server-rendered response works against it directly. This is why `next-mdx-remote/rsc` compiles guide bodies rather than the client-rendering alternative.

## Rules

- **Metadata via the typed builders in `lib/seo/`.** A hand-written `export const metadata` in a page file fails review — that's how a canonical goes missing on one route and nobody notices for six months
- Every page emits its schema from `lib/seo/schema.ts`
- **One `<h1>` per page.** Levels never skip. The renderer computes them from document order
- **All copy is real, server-rendered text.** Not canvas, not client-only, not an image
- **Descriptive link anchors.** "Learn more" as the only anchor text fails review
- Preview deploys send `X-Robots-Tag: noindex` — an indexed preview competing with production is a self-inflicted wound

## Keyword reality

anvio.online is a **zero-authority domain**. Head terms are not winnable this year.

- Long-tail, specific, low-competition intent only
- **GEO — being cited by AI assistants — is more reachable than classic SERP position** for a new domain, and is a first-class target
- **Validate a slug before shipping it.** Two service leaves already shipped on provisional, unvalidated slugs; renaming one now costs a real redirect
- No traffic projection that assumes authority we don't have

## Accessibility — CI enforces this with `@axe-core/playwright`

Semantic HTML first · visible focus everywhere · contrast per design-system.md §2.3 · meaning never by colour alone · hit targets ≥ 44×44px · every interactive graphic has a DOM text equivalent · descriptive `alt` or `alt=""`, never missing.

**Blocking in review:** a11y violations, budget regressions, missing validation on external input, arbitrary Tailwind values, silent error swallowing. Review order is **correctness → accessibility → performance → consistency → style**.
