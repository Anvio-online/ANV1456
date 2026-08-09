# Anvio — Content Layer

**Status:** v2, **built** — content adapter and every section type below except `caseStudyBody` are live on `main`
**Decided by:** [ADR-0002](adr/0002-mdx-behind-content-adapter.md) (MDX behind an adapter) and [ADR-0006](adr/0006-content-page-authoring-model.md) (section frame around one MDX body)

This document was the build contract for the content adapter and the seven section types Phase 2 needed. It's kept in the same shape — plan first, then what actually shipped — because the gap between the two is exactly the part worth a reader's attention: **the original plan called for `@content-collections/mdx`'s `compileMDX` + `MDXContent`, and that was dropped mid-build** because it renders MDX bodies client-side, which would have put guide and leaf content only in the post-hydration DOM — a direct hit on this repo's non-negotiable server-rendered-copy rule. §2 below describes what actually ships instead: `next-mdx-remote/rsc`.

**Everything in [specs/phase-2-plan.md](../specs/phase-2-plan.md)'s floor (§5a) is built on top of this.** Two service leaves and four guides are live; case studies remain blocked on the Stratseek agreement, and `caseStudyBody` (§4) is the one section type still unbuilt as a direct result.

---

## 1. Current state

| Thing | Documented in | Built? |
|---|---|---|
| `lib/content/` adapter | [repo-structure.md](repo-structure.md) §2, [ADR-0002](adr/0002-mdx-behind-content-adapter.md) | **Yes** — `index.ts`, `mdx.ts`, `types.ts`, `toc.ts` |
| `content-collections.ts` (frontmatter schemas) | §3 below | **Yes** — all five kinds, at the repo root next to `next.config.ts` |
| `content/services/*.mdx`, `content/guides/*.mdx` | [repo-structure.md](repo-structure.md) §5 | **Yes** — 2 leaves, 4 guides. `case-studies/`, `industries/` still empty |
| 28 section types | [section-library.md](../system/section-library.md) §3 | **Yes**, registered — `testimonial` deliberately excluded from the union (§4) |
| `breadcrumb` · `tableOfContents` · `authorBio` · `relatedLinks` · `insights` | [section-library.md](../system/section-library.md) §3 | **Yes** |
| `caseStudyBody` | [section-library.md](../system/section-library.md) §3 | **No** — blocked on Wave 2's Stratseek gate, nothing to build it against yet |
| `richText:mdx` variant | [ADR-0006](adr/0006-content-page-authoring-model.md) | **Yes** — via `next-mdx-remote/rsc`, not `@content-collections/mdx` (see §2) |

Phase 1 got away with none of this because all six pages are composed pages with literal copy. Phase 2 is content pages, and this is what makes them work.

---

## 2. The adapter

**As built:**

```
apps/web/
  content-collections.ts   # the five Zod schemas + collection config —
                            # content-collections' own API takes the
                            # schema at the collection definition, not
                            # in a separate schemas.ts; see the note below
  src/lib/content/
    index.ts       # the ContentRepository interface + the exported singleton
    mdx.ts         # the only file that imports from 'content-collections'
    types.ts       # Entry<K> — maps ContentKind to content-collections' generated types
    toc.ts         # extractHeadings() — regex over raw MDX source, used by tableOfContents
```

**Two deviations from the original plan below, both found while wiring it rather than assumed up front:**

**No `lib/content/schemas.ts`.** content-collections' `defineCollection` takes the schema as a direct argument (`schema: z.object({...})`), not a `(z) => ({...})` factory some older docs and the original draft of this file assumed — the version installed (`@content-collections/core@0.15.2`) uses the Standard Schema spec, and Zod v4 (already this repo's dependency) implements it natively. So the schemas live in `content-collections.ts` at the repo root, next to the `next.config.ts` wrapper that generates from it — that's where content-collections' own convention puts them, and duplicating them into a second file `lib/content/` would just be two sources of truth for the same shape.

**No `@content-collections/mdx`.** The package exists and does compile MDX, but its render path — `compileMDX` + `<MDXContent>` — uses `mdx-bundler`'s client runtime (`useMemo` + `new Function`-eval'd code inside `sections/rich-text/variants/mdx.tsx`'s would-be implementation). That means the body exists only after hydration, not in server-rendered HTML — a direct violation of motion-system.md §6 rule 5 and seo-strategy.md §4's "animation trap," both non-negotiable. content-collections now only parses and validates frontmatter; the raw `content: string` passes through untouched. Body compilation happens separately, per request, via **`next-mdx-remote/rsc`'s `<MDXRemote>`** — an async Server Component, in `sections/rich-text/variants/mdx.tsx` — which is real server-rendered HTML on every request. `remark-gfm` (tables, strikethrough) and `rehype-slug` (heading `id`s, matched independently by `lib/content/toc.ts`'s own `github-slugger` pass over raw source) run in that same component.

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

1. **Pages never import from `content/` or from the MDX loader.** They import `contentRepository` from `lib/content`. This is the whole point of [ADR-0002](adr/0002-mdx-behind-content-adapter.md); a single direct import quietly cancels it. `mdx.ts` is, as built, the one file that imports from `'content-collections'` — enforce with an `eslint-plugin-boundaries` rule, not with vigilance, if a second import site ever appears.
2. **`slugs()` must not compile bodies.** Moot as built — there is no compile step at load time; content-collections only parses and validates frontmatter, so every read (`list`, `get`, `slugs`) is equally cheap. The rule stays here as a constraint on *any future loader swap*, not a warning about the current one.
3. **Validation failures fail the build, loudly, with the filename.** A guide with a malformed `updatedAt` should never reach a preview URL — a silently-dropped entry is a page that 404s in production and nobody notices for a month. Confirmed working: a fixture entry with an out-of-bounds `description` failed the build with the exact file and field during Wave 0.
4. **`draft: true` entries are excluded in production and included in development.** This is how a half-written guide lives on `main` without publishing itself.
5. **The loader is content-collections**, chosen over velite when Wave 0 started ([ADR-0002](adr/0002-mdx-behind-content-adapter.md) left either permitted). Referenced only in `content-collections.ts` and `lib/content/mdx.ts` — the two files that would change if it's ever swapped.

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

One Zod schema per kind in **`content-collections.ts`** (not `lib/content/schemas.ts` — see §2's note on why). Adding a field means editing that file first ([repo-structure.md](repo-structure.md) §5), and `lib/content/types.ts`'s `Entry<K>` picks it up automatically since it's inferred from content-collections' generated types, not hand-duplicated.

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

The `description` bounds are deliberately a hard `min`/`max` rather than a lint warning. A 40-character meta description is the single most common on-page defect on a content site, and it is invisible until you audit. As built, `baseFields` also declares `content: z.string()` explicitly — content-collections deprecated the implicit content property it used to add for the default "frontmatter" parser, so this repo declares it rather than relying on a deprecated default.

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

As in [section-library.md](../system/section-library.md) §6 — `title`, `description`, `category`, `publishedAt`, `updatedAt`, `author`. Unchanged; listed here so `content-collections.ts` has all five kinds in one file. No entries exist yet — the `insights` section type (§4) is built and registered, but nothing populates it. Guides could seed it (each guide is a plausible "insight"), or the two kinds could merge; that decision is still open — see §6.

---

## 4. The seven section types — six built, one blocked

All seven were already in [section-library.md](../system/section-library.md) §3's catalogue, so none needed an [ADR-0003](adr/0003-section-registry-composition.md) new-type justification. Each got a folder under `src/sections/`, a `<type>.types.ts`, a union member in `lib/sections/types.ts`, and a line in `registry.ts`.

| Type | Variants | Used by | Status |
|---|---|---|---|
| `breadcrumb` | `inline` | Every page ≥ 2 levels deep | **Built.** Renders `<nav aria-label="Breadcrumb">` + `<ol>`. Emits nothing — `BreadcrumbList` schema stays a separate `breadcrumbSchema()` call on the page, so the visible trail and the schema can't drift apart. Zero motion. Required reworking `resolveHeadingLevel()` — it assumed index 0 was always the hero; it now finds the first section that isn't `breadcrumb`. |
| `relatedLinks` | `card-grid` built · `inline-list` not built | Leaves, industries, guides, case studies | **Built** (`card-grid` only — every spec that uses this type uses that variant). 3–5 curated links with a one-line note each. |
| `tableOfContents` | `inline` built · `sticky-rail` not built | Guides, long leaves | **Built.** `inline`, per guides-spec.md §3's own reasoning against `sticky-rail` — a rail needs to share a grid container with the body, which the flat, sibling-sections composition model under [ADR-0003](adr/0003-section-registry-composition.md) doesn't support. Built from the body's raw `##`/`###` headings via `lib/content/toc.ts` (regex + `github-slugger`), not by scanning the rendered DOM. A native `<details>`/`<summary>` disclosure — zero client JS. |
| `authorBio` | `compact` | Guides | **Built.** `name` is optional — guides-spec.md §2's fallback ladder, so a guide ships with a role byline (`"Anvio's founding engineer"`) while the employment-disclosure question stays open, same pattern as `team:founder-note`. |
| `caseStudyBody` | `narrative` | `/case-studies/[slug]` | **Not built.** Blocked on Wave 2's Stratseek gate — there's no case-study content to build it against yet, and building the section without a real entry to verify it against risks getting the `results`-frontmatter integration wrong in a way that only shows up once real content lands. |
| `insights` | `featured-plus-list` built · `three-latest` not built | `/guides` index | **Built** (`featured-plus-list` — guides-spec.md's index needs editorial, not chronological, ordering). Home §10's `three-latest` stays unbuilt; Home has no insights section instance today, so nothing regressed by leaving it. |
| `testimonial` | — | Deferred | **Not built, and removed from the `SectionInstance` union entirely** — not even as a placeholder. There are no testimonials to show, and `PlaceholderSection` was deleted once every other placeholder use became real; keeping one dead branch alive for `testimonial` alone wasn't worth the type-union noise. Re-add when there's a real testimonial. |

Plus one variant, not a type: **`richText:mdx`**, per [ADR-0006](adr/0006-content-page-authoring-model.md) — **built**, via `next-mdx-remote/rsc` (§2). The only section permitted to render a body.

That takes the registry to 28 types (27 registered plus `testimonial` documented-only), under [ADR-0003](adr/0003-section-registry-composition.md)'s "revisit at ~30" trigger — but only just. Any Phase 3 type must clear the variant-first bar properly.

### New variants on existing types

| Variant | For | Status |
|---|---|---|
| `richText:mdx` | Every content page | **Built** — see §2 |
| `services:pillar-cards` gains `showViz` | `/services` hub | **Built**, not originally planned here — the hub reuses Home's pillar-cards variant for its full sub-item lists but needed to suppress the per-card looping micro-visual to stay at zero Tier 2 pieces (phase-2-plan.md §4); added as an optional prop rather than a new variant |
| `hero:case-lead` | `/case-studies/[slug]` | **Not built** — blocked with `caseStudyBody`, same gate |
| `workflowGraph:compact` | The two shipped Automate leaves | **Built.** Ended up fully server-rendered with zero client JS — no dynamic import at all, unlike `live`. A one-time `fade-up-in` stagger across nodes in authored order turned out to satisfy "reduced nodeCascade, no pathPulse, no hover-explainer layer" without needing any of `live`'s client-side machinery. |
| `buildAssembly:component-grid` | `/services/build/website-development` | **Not built** — that leaf is Wave 3's third/fourth item, above the floor |
| `problem:automation-calculator` | `/tools/automation-roi-calculator` | **Not built** — `/tools` is Wave 4, above the floor |

### `lib/seo/schema.ts` builders

`schema.ts` had `organizationSchema`, `websiteSchema`, `serviceSchema`, `webPageSchema`, `faqSchema`, `breadcrumbSchema`. Two of the three Phase 2 additions are **built**:

| Builder | Used by | Status |
|---|---|---|
| `articleSchema` | `/guides/[slug]` (built) · `/case-studies/[slug]` (pending) | **Built.** `headline`, `description`, `author`, `datePublished`, `dateModified`, `url` |
| `collectionPageSchema` | `/guides` (built) · `/case-studies` (pending) | **Built.** `name`, `description`, `url` |
| `softwareApplicationSchema` | `/tools/[slug]` | **Not built** — `/tools` is above the floor |

`serviceSchema` still doesn't have `areaServed` — no industry leaf exists yet to need it.

---

## 5. Build order

Strictly sequential. Each step was unusable without the one above it. **All done except step 5**, which stays blocked in place rather than out of order.

1. ~~**`content-collections.ts`** — all five kinds.~~ Done, as `content-collections.ts` rather than `lib/content/schemas.ts` — see §2.
2. ~~**`mdx.ts` + `index.ts`**~~ Done. Verified with a throwaway fixture entry (removed once confirmed) before any real content was written — validation genuinely rejects bad frontmatter, with the file and field named.
3. ~~**`richText:mdx` + the three whitelist components.**~~ Done, via `next-mdx-remote/rsc` rather than the originally planned `@content-collections/mdx` — see §2.
4. ~~**`breadcrumb` + `relatedLinks`.**~~ Done. `breadcrumb` retired the live schema defect ([phase-2-plan.md](../specs/phase-2-plan.md) §2) the moment `/services` shipped.
5. **`caseStudyBody`**, then the case-study routes. **Still blocked** — the Stratseek agreement hasn't been read, so there's no case-study content this section could be built and verified against.
6. ~~**`tableOfContents` + `authorBio`**, then the guide routes.~~ Done — four guides live at `/guides/[slug]`.
7. ~~**`insights`**~~ Done (`featured-plus-list` only), which seeded `/guides`' index. Did not unblock Home §10 — Home has no `insights` section instance to begin with, so there was nothing to seed there; adding one is a small, separate, not-yet-done step.

## 6. Open items

- [x] ~~Choose the loader: content-collections or velite.~~ **content-collections.** [ADR-0002](adr/0002-mdx-behind-content-adapter.md)'s two-file guarantee held: swapping it means changing `content-collections.ts` and `lib/content/mdx.ts`, nothing else.
- [x] ~~Decide whether `readingTime` counts code blocks.~~ It does — the computation is a plain word count over the raw body, including code fences. Not worth special-casing for the volume of code in current guides.
- [ ] `authorBio`'s `name` field is unused so far — every guide ships at guides-spec.md §2's fallback level 2 (`"Anvio's founding engineer"`, no name). Upgrade when the employment-disclosure question in [docs/README.md](../README.md) resolves; it's a frontmatter string change, not a rebuild.
- [ ] `caseStudyBody`, `hero:case-lead`, and the case-study routes remain blocked on the Stratseek agreement — same gate as [phase-2-plan.md](../specs/phase-2-plan.md) §7's first item.
- [ ] `insights` has no entries — only guides populate `/guides`' index today, built by explicit slug list in that page rather than by querying the `insights` kind. Decide whether guides and insights merge into one kind, or whether real insight posts get written separately, before Home's own insights section is built.
