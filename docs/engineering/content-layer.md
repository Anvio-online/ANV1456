# Anvio — Content Layer

**Status:** v1, Phase 2 prerequisite
**Decided by:** [ADR-0002](adr/0002-mdx-behind-content-adapter.md) (MDX behind an adapter) and [ADR-0006](adr/0006-content-page-authoring-model.md) (section frame around one MDX body)

This document is the build contract for the two things every Phase 2 page depends on: the content adapter, and the seven section types that are documented in [section-library.md](../system/section-library.md) but not yet built.

**Nothing in [specs/phase-2-plan.md](../specs/phase-2-plan.md) can ship before §2 and §4 of this document do.** That is why this is a document and not an implementation detail — it is the critical path.

---

## 1. Current state

| Thing | Documented in | Built? |
|---|---|---|
| `lib/content/` adapter | [repo-structure.md](repo-structure.md) §2, [ADR-0002](adr/0002-mdx-behind-content-adapter.md) | **No** — directory is empty |
| `content/*` MDX files | [repo-structure.md](repo-structure.md) §5 | **No** — only `case-studies/.gitkeep` |
| 22 section types | [section-library.md](../system/section-library.md) §3 | Yes, registered |
| `breadcrumb` · `tableOfContents` · `authorBio` · `relatedLinks` · `caseStudyBody` · `insights` · `testimonial` | [section-library.md](../system/section-library.md) §3 | **No** |
| `richText:mdx` variant | [ADR-0006](adr/0006-content-page-authoring-model.md) | **No** |

Phase 1 got away with none of this because all six pages are composed pages with literal copy. Phase 2 is content pages. Every one of them needs both columns above to be "yes."

---

## 2. The adapter

```
lib/content/
  index.ts       # the ContentRepository interface + the exported singleton
  mdx.ts         # the only file that knows MDX exists
  schemas.ts     # Zod frontmatter schemas, one per kind
  types.ts       # the entry types inferred from schemas.ts
```

### Interface

```ts
export type ContentKind = 'case-studies' | 'guides' | 'industries' | 'services' | 'insights'

export interface ContentRepository {
  /** All published entries of a kind, newest first. Drafts excluded in production. */
  list<K extends ContentKind>(kind: K, opts?: ListOptions): Promise<Entry<K>[]>
  /** One entry, or null. Never throws on a missing slug — callers call notFound(). */
  get<K extends ContentKind>(kind: K, slug: string): Promise<Entry<K> | null>
  /** Slugs only, for generateStaticParams. Cheap — must not compile bodies. */
  slugs(kind: ContentKind): Promise<string[]>
}

interface ListOptions {
  featured?: boolean
  /** e.g. { services: ['whatsapp-automation'] } — used by related-links resolution. */
  where?: Partial<Record<string, string[]>>
  limit?: number
}
```

**Rules, in the order they matter:**

1. **Pages never import from `content/` or from the MDX loader.** They import `contentRepository` from `lib/content`. This is the whole point of [ADR-0002](adr/0002-mdx-behind-content-adapter.md); a single direct import quietly cancels it. Enforce with an `eslint-plugin-boundaries` rule, not with vigilance.
2. **`slugs()` must not compile bodies.** `generateStaticParams` runs for every route; compiling every MDX body to enumerate slugs turns a fast build into a slow one for no reason.
3. **Validation failures fail the build, loudly, with the filename.** A guide with a malformed `updatedAt` should never reach a preview URL — a silently-dropped entry is a page that 404s in production and nobody notices for a month.
4. **`draft: true` entries are excluded in production and included in development.** This is how a half-written guide lives on `main` without publishing itself.
5. The loader is content-collections or velite ([ADR-0002](adr/0002-mdx-behind-content-adapter.md)). Whichever is chosen, it is referenced **only** in `mdx.ts`.

### The MDX component whitelist

Per [ADR-0006](adr/0006-content-page-authoring-model.md), an MDX body may use exactly these, and no section components:

| Component | Purpose |
|---|---|
| `<Callout type="note" \| "warning">` | An aside. Renders as a bordered block, amber marker. |
| `<Figure src alt caption>` | Image with a real `<figcaption>`. Wraps `next/image` with explicit dimensions — CLS ([motion-system.md](../system/motion-system.md) §6.6). |
| `<Comparison>` | A two-column comparison table. Emits a real `<table>`, because [seo-strategy.md](../system/seo-strategy.md) §7.6 says extractors parse structure. |

Everything else in a body is plain markdown. Headings in a body start at `##` — the renderer owns the `<h1>`.

---

## 3. Frontmatter schemas

One Zod schema per kind in `schemas.ts`. Adding a field means editing that file first ([repo-structure.md](repo-structure.md) §5).

### Shared base

Every kind extends this:

```ts
const base = z.object({
  title: z.string().max(70),
  description: z.string().min(140).max(158),   // seo-strategy.md §4 — enforced, not advisory
  slug: z.string().regex(/^[a-z0-9-]+$/),      // filename is the URL; this asserts it
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  draft: z.boolean().default(false),
})
```

The `description` bounds are deliberately a hard `min`/`max` rather than a lint warning. A 40-character meta description is the single most common on-page defect on a content site, and it is invisible until you audit.

### `case-studies`

Already sketched in [repo-structure.md](repo-structure.md) §5. Formalized:

| Field | Type | Notes |
|---|---|---|
| `client`, `clientDisplay` | string | `clientDisplay` may be anonymized (`"a 60-person distributor in Ahmedabad"`) |
| `attribution` | `'direct' \| 'partner-agency'` | Renders "Delivered via partner agency" structurally, not from a hardcoded string |
| `industry`, `region` | string | `industry` should match an `/industries` slug where one exists |
| `services` | `string[]` | Pillar or leaf slugs — drives the case-study ↔ service cross-links ([seo-strategy.md](../system/seo-strategy.md) §5) |
| `problem` | string | One sentence. Used on cards. |
| `results` | `{ metric, label }[]` | **May be empty.** Never invent one — same rule as `CaseStudyCard.outcome` in `lib/sections/types.ts` |
| `stack` | `string[]` | |
| `featured` | boolean | |

### `services` (leaf pages)

| Field | Type | Notes |
|---|---|---|
| `pillar` | `'build' \| 'automate' \| 'grow'` | Determines the breadcrumb and the up-link |
| `h1` | string | Distinct from `title` — `title` is the `<title>` tag, `h1` is the page heading. They are usually not the same sentence and conflating them costs both. |
| `pains` | `{ pain, line }[]` | Feeds `problem:pain-grid`. Max 6 ([motion-system.md](../system/motion-system.md) §3) |
| `faq` | `{ question, answer }[]` | Feeds `faq:accordion` **and** `FAQPage` schema from one source |
| `relatedLinks` | `{ label, href, note }[]` | 3–5, editorially chosen ([seo-strategy.md](../system/seo-strategy.md) §5) |
| `metrics` | `{ name, definition }[]` | Optional — feeds `results:metric-row` |
| `keywordPrimary` | string | Recorded so the "once each in H1/first 100 words/one H2/URL" rule is auditable |

### `industries`

| Field | Type | Notes |
|---|---|---|
| `industry` | string | Display name |
| `pains` | `{ pain, line }[]` | Industry-specific, not the pillar's generic set — this is the entire reason the page exists |
| `useCases` | `{ title, body }[]` | 3–5 |
| `services` | `string[]` | Which pillars/leaves this industry buys — drives cross-links |
| `faq`, `relatedLinks` | as above | |

### `guides`

| Field | Type | Notes |
|---|---|---|
| `category` | string | |
| `author` | string | Named author. [seo-strategy.md](../system/seo-strategy.md) §7.5 — provenance raises citation likelihood, and an unsigned guide forfeits that |
| `readingTime` | number | Computed at build from the body, not hand-entered |
| `commercialLink` | `{ label, href }` | **Required.** §5 of the SEO strategy says every guide links to one commercial page with a contextual anchor; making it a required field is how that stops being a thing we forget |
| `relatedLinks` | as above | |

### `insights`

As in [section-library.md](../system/section-library.md) §6 — `title`, `description`, `category`, `publishedAt`, `updatedAt`, `author`. Unchanged; listed here so `schemas.ts` has all five kinds in one file.

---

## 4. The seven unbuilt section types

All seven are already in [section-library.md](../system/section-library.md) §3's catalogue, so none needs an [ADR-0003](adr/0003-section-registry-composition.md) new-type justification. Each needs a folder under `src/sections/`, a `<type>.types.ts`, a union member in `lib/sections/types.ts`, and a line in `registry.ts`.

| Type | Variants | Used by | Notes |
|---|---|---|---|
| `breadcrumb` | `inline` | Every page ≥ 2 levels deep | Renders `<nav aria-label="Breadcrumb">` + `<ol>`. **Emits nothing** — `BreadcrumbList` schema stays in `lib/seo/schema.ts` and is rendered by the page, so the visible trail and the schema can't drift apart while both exist. Zero motion. |
| `relatedLinks` | `card-grid` · `inline-list` | Leaves, industries, guides, case studies | 3–5 curated links with a one-line note each. Descriptive anchors only — [seo-strategy.md](../system/seo-strategy.md) §4 bans bare "learn more". Tier 3. |
| `tableOfContents` | `sticky-rail` · `inline` | Guides, long leaves | Built from the body's `##`/`###` headings at compile time, not by scanning the DOM at runtime. `sticky-rail` on ≥1024px, `inline` collapsible below. Scroll-spy is `IntersectionObserver`, not a scroll listener. Tier 4. |
| `authorBio` | `compact` | Guides | Name, role, one line, optional photo. Same rule as `team:founder-note` — **omit the photo rather than use a stock one**. Blocked on the same open item as About §4. |
| `caseStudyBody` | `narrative` | `/case-studies/[slug]` | Problem → approach → solution → results → lessons. Consumes the MDX body ([ADR-0006](adr/0006-content-page-authoring-model.md)) plus `results` frontmatter. Tier 3, `counterRoll` on the metric row only. |
| `insights` | `three-latest` · `featured-plus-list` | Home §10, `/guides` index | Already a placeholder union member in `lib/sections/types.ts` — this is the one type the codebase already admits is missing. |
| `testimonial` | `single-large` · `grid` · `with-avatar` | Deferred | **Do not build in Phase 2.** There are no testimonials, and an empty testimonial section is worse than none. Listed for completeness. |

Plus one variant, not a type: **`richText:mdx`**, per [ADR-0006](adr/0006-content-page-authoring-model.md). It takes compiled MDX and the whitelist from §2, and it is the only section permitted to render a body.

That takes the registry from 22 to 28 types, still under [ADR-0003](adr/0003-section-registry-composition.md)'s "revisit at ~30" trigger — but only just. Any Phase 3 type must clear the variant-first bar properly.

### New variants on existing types

Four, each clearing [ADR-0003](adr/0003-section-registry-composition.md)'s variant-first bar without a new type.

| Variant | For | Notes |
|---|---|---|
| `richText:mdx` | Every content page | [ADR-0006](adr/0006-content-page-authoring-model.md). The only section permitted to render a body |
| `hero:case-lead` | `/case-studies/[slug]` | Already in the `HeroProps` union in `lib/sections/types.ts`, not yet implemented |
| `workflowGraph:compact` | The three Automate leaves | 3–5 nodes, `nodeCascade` only, no `pathPulse`, no hover-explainer layer |
| `buildAssembly:component-grid` | `/services/build/website-development` | Static grid. **Not** the pinned `wireframe-to-render` scene, which stays Build's alone |
| `problem:automation-calculator` | `/tools/automation-roi-calculator` | Different inputs and formula from Grow's `cost-calculator`, same family |

### Missing `lib/seo/schema.ts` builders

`schema.ts` today exports `organizationSchema`, `websiteSchema`, `serviceSchema`, `webPageSchema`, `faqSchema`, `breadcrumbSchema`. Phase 2 needs three more, and they belong in the same typed-builder pattern — never hand-written JSON-LD per page ([seo-strategy.md](../system/seo-strategy.md) §6).

| Builder | Used by | Fields |
|---|---|---|
| `articleSchema` | `/guides/[slug]`, `/case-studies/[slug]` | `headline`, `description`, `author`, `datePublished`, `dateModified`, `url`. Provenance is the point ([seo-strategy.md](../system/seo-strategy.md) §7.5) |
| `collectionPageSchema` | `/case-studies`, `/guides` | `name`, `description`, `url` |
| `softwareApplicationSchema` | `/tools/[slug]` | `name`, `description`, `applicationCategory`, `offers` (free), `url` |

`serviceSchema` also needs an optional `areaServed` for the industry leaves.

---

## 5. Build order

Strictly sequential. Each step is unusable without the one above it.

1. **`schemas.ts`** — all five kinds. Nothing to test against yet, but it is the contract.
2. **`mdx.ts` + `index.ts`** — the loader and the interface, with one real case study MDX file as the fixture. If the adapter can render one entry, it can render forty.
3. **`richText:mdx` + the three whitelist components.** The moment this works, every article-class page becomes a content file.
4. **`breadcrumb` + `relatedLinks`.** Small, needed by every Phase 2 page, and `breadcrumb` retires a live schema defect (see [phase-2-plan.md](../specs/phase-2-plan.md) §2).
5. **`caseStudyBody`**, then the case-study routes.
6. **`tableOfContents` + `authorBio`**, then the guide routes.
7. **`insights`**, which unblocks Home §10 as a side effect.

## 6. Open items

- [ ] Choose the loader: content-collections or velite. [ADR-0002](adr/0002-mdx-behind-content-adapter.md) permits either and defers the pick; §2 rule 5 means this decision costs one file, so it does not need its own ADR — but it does need making before step 2.
- [ ] Decide whether `readingTime` counts code blocks. Trivial, but it should be decided once rather than per-guide.
- [ ] `authorBio` is blocked on the same unresolved item as About §4 — a real name and photo, and the employment-disclosure question in [docs/README.md](../README.md).
