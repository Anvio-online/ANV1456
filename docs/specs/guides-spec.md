# Guides — Page Spec

**URLs:** `/guides` (index) · `/guides/[slug]` (article)
**Class:** Composed (index) · Article ([ADR-0006](../engineering/adr/0006-content-page-authoring-model.md))
**Wave:** 5 ([phase-2-plan.md](phase-2-plan.md) §5)

Guides are the one channel where a zero-authority domain can compete immediately. [seo-strategy.md](../system/seo-strategy.md) §1: ranking on LLM surfaces *"depends on being clearly structured, factual, and extractable — which is a content-quality problem, not a backlink problem."* We can't out-link a ten-year-old agency domain. We can out-structure one this quarter.

That makes the guide template an SEO artifact, not a reading experience. Every decision below optimizes for a machine quoting a paragraph in isolation, and for a human who arrived at that paragraph from a citation and needs the surrounding context to make sense without the rest of the page.

**Substance floor: 1,800 words** ([seo-strategy.md](../system/seo-strategy.md) §4). Eight guides at 1,800 words is the single largest writing commitment in Phase 2. Ship six good ones rather than eight padded ones.

---

# Part 1 — `/guides` (index)

**Primary intent:** Navigational, plus a landing surface for `anvio guides`-shaped brand queries.
**Primary conversion:** A click into a guide.

**Title:** `Guides: AI Automation, Web Development & Search | Anvio` (54 chars)
**Description:** `Practical guides on automating manual work, choosing between tools, and getting found in search and AI assistants. Written from work we have actually done.` (154 chars)

**Schema:** `BreadcrumbList` + `CollectionPage`.

## Sections

| # | Section | Theme | Tier | Notes |
|---|---|---|---|---|
| 1 | `breadcrumb:inline` | dark | 0 | `Home / Guides` |
| 2 | `hero:page-lead` | dark | 3 | |
| 3 | `insights:featured-plus-list` | dark | 3 | One featured guide + the rest as a list, grouped by category |
| 4 | `ctaClosing:centered-bold` | dark | 3 | |

> **Eyebrow:** GUIDES
> **H1:** How this stuff actually works.
> **Sub:** Comparisons, definitions, and walkthroughs — written from projects we've shipped, with the trade-offs left in.

**The index's third section uses `featured-plus-list`, not `three-latest`.** `three-latest` is Home's variant and it's chronological; an index of eight evergreen guides is better served by editorial ordering, because "most recently published" is the least useful sort order for reference content.

**Do not publish the index before four guides exist.** A guides page with one entry undersells the site more than no guides page does.

---

# Part 2 — `/guides/[slug]` (article)

**Route:** `app/(marketing)/guides/[slug]/page.tsx`, `generateStaticParams` from `contentRepository.slugs('guides')`.
**Schema:** `Article` + `BreadcrumbList`, with `author`, `datePublished`, `dateModified` from frontmatter.

## The frame

Fixed for every guide ([ADR-0006](../engineering/adr/0006-content-page-authoring-model.md), class 3). Only frontmatter and body differ.

| # | Section | Theme | Tier | Source |
|---|---|---|---|---|
| 1 | `breadcrumb:inline` | dark | 0 | route |
| 2 | `hero:page-lead` | dark | 3 | `title`, `description`, `author`, `updatedAt`, `readingTime` |
| 3 | `tableOfContents:inline` | light | 4 | body headings, compiled |
| 4 | `richText:mdx` | light | 3 | **the body** |
| 5 | `authorBio:compact` | light | 3 | `author` |
| 6 | `relatedLinks:card-grid` | dark | 3 | `relatedLinks[]` + `commercialLink` |
| 7 | `ctaClosing:centered-bold` | dark | 3 | fixed |

Seven sections, so the renderer's *"no more than three consecutive same theme on pages longer than 8 sections"* rule doesn't bind — but the 2/3/2 split is the right rhythm anyway, and the light band is where the reading happens.

### Section 2 — Hero, and the provenance block

The hero carries **a named author, a visible `updatedAt` date, and reading time**. Not decoration: [seo-strategy.md](../system/seo-strategy.md) §7.5 makes stable, dated, attributed facts a direct input to citation likelihood, and an unsigned undated guide forfeits that for nothing.

`updatedAt` is displayed, not just emitted in schema. If a guide has not been touched in a year, the visible date should embarrass us into updating it — that is the mechanism working.

**A real name is better, and its absence must not block the wave.** About §4 already ships anonymously because the person writing it is employed elsewhere and hasn't disclosed Anvio publicly ([employer-context.md](../private/employer-context.md)) — an unresolved question that may stay unresolved for a while. Making guides wait on it would stall the site's only compounding channel indefinitely.

**The fallback, in order of preference:**
1. **A real name and role.** Strongest for citation likelihood. Requires the employment question to be settled first.
2. **A role byline without a name** — "Written by Anvio's founding engineer" — plus a real, specific `authorBio` describing the work behind the guide. Carries most of the provenance value; the same reasoning `team:founder-note` already uses to ship without a photo.
3. **"Anvio"** as the author. Weakest, and only if 2 isn't acceptable either.

Ship at level 2 and upgrade to level 1 later. `author` is a frontmatter string — changing it across eight files is a find-and-replace, not a rewrite.

### Section 3 — Table of contents

**`inline` in Phase 2. `sticky-rail` is deferred, for a structural reason worth recording.**

A sticky side rail requires the ToC and the body to share one grid container so the rail can `position: sticky` against the body's height. Under [ADR-0003](../engineering/adr/0003-section-registry-composition.md) they are two sibling sections, each spaced by the renderer's `--section-y` — there is no shared container to stick against, and creating one would mean a section that wraps another section, which breaks the flat composition model the renderer depends on.

Two acceptable resolutions, neither of which should be improvised at build time:
1. **Ship `inline`** — a collapsible ToC above the body. Works everywhere, zero architectural cost, and on mobile it is what you'd build anyway.
2. **Move the ToC into `richText:mdx` as a `toc?:` prop**, making the ToC-plus-body one section because they are one reading unit. Cleaner than option 1 on desktop, and it does not violate anything.

Phase 2 ships option 1. Option 2 is the open item.

Either way the ToC is **built from the body's `##`/`###` headings at compile time**, not by scanning the DOM after hydration, and scroll-spy is `IntersectionObserver` rather than a scroll listener ([motion-system.md](../system/motion-system.md) §6).

### Section 4 — The body

The whole page. Rules, in priority order, from [seo-strategy.md](../system/seo-strategy.md) §7:

1. **Answer-first.** Open the guide, and each major `##`, with a 40–60 word direct answer before expanding. This single habit does more for GEO than everything else combined.
2. **Question-shaped `##` headings.** They are what gets matched and quoted.
3. **Specifics over adjectives.** "Reduced invoice processing from 6 hours to 20 minutes a week" is citable; "dramatically improves efficiency" is not.
4. **Real semantics** — `<table>`, `<ol>`, `<dl>`. Comparison guides use `<Comparison>` ([content-layer.md](../engineering/content-layer.md) §2), which emits a real table.
5. **Each section stands alone.** A reader arriving from a citation lands mid-page. A paragraph that only makes sense after the three above it will be quoted without them and misread.

**One commercial link, contextual, in the body** — plus `commercialLink` in frontmatter, which Section 6 renders. It is a required frontmatter field precisely so that [seo-strategy.md](../system/seo-strategy.md) §5's *"every guide links to one commercial page"* stops being something we intend and starts being something the build enforces.

**No gate, no email wall, no PDF download.** A gated guide earns no citations, which is the entire reason to write it.

### Section 6 — Related links

3–5 guides and pages, plus `commercialLink` rendered as the last card with a distinguishable treatment. Descriptive anchors.

### Section 7 — Closing CTA

`centered-bold`. Copy varies by the guide's pillar, but the register is constant: an offer to answer the specific question, not a pitch.

> **H2:** Still deciding?
> **Body:** 30 minutes, no deck. Describe the situation and we'll tell you which of the options above we'd pick for it — including when the answer is to do nothing yet.

---

## The eight guides

Chosen to cover all four query shapes in [seo-strategy.md](../system/seo-strategy.md) §3 and all three pillars. Every one is something we can write credibly, which is the filter that matters — a comparison guide written from documentation rather than from use is obvious to the reader who needs it.

| # | Slug | Shape | Why us | Commercial link |
|---|---|---|---|---|
| 1 | `ai-agent-vs-chatbot` | Solution-aware / definitional | Highest citation-bait potential on the list, and **two service leaves depend on it** to hold their intent boundary ([service-leaf-spec.md](service-leaf-spec.md) §2) | `/services/automate` |
| 2 | `n8n-vs-zapier-vs-make` | Vendor comparison | Named in the SEO strategy as high-intent and low-competition. We build on these; the trade-offs are first-hand | `/services/automate/ai-agent-development` |
| 3 | `whatsapp-business-api-cost-and-limits` | Problem-aware | The pricing and 24-hour-window rules most vendors leave out until invoicing. Directly supports the WhatsApp leaf | `/services/automate/whatsapp-automation` |
| 4 | `how-to-automate-invoice-data-entry` | Problem-aware | The canonical SMB automation story; pairs with `/industries/accounting-firms` | `/services/automate` |
| 5 | `which-processes-are-worth-automating` | Problem-aware / framework | The site already commits to telling clients what *not* to automate ([automate-spec.md](automate-spec.md) §9). This is that position, long-form — the most on-brand guide on the list | `/contact` |
| 6 | `what-is-rag` | Definitional | Named in the SEO strategy. Supports the chatbot leaf | `/services/automate/ai-chatbot-development` |
| 7 | `what-a-business-website-should-cost` | Problem-aware | Pricing transparency in a market that hides it. Build-side, and it converts | `/services/build/website-development` |
| 8 | `geo-vs-seo-getting-cited-by-ai` | Solution-aware | **We sell this and the site is the proof** ([seo-strategy.md](../system/seo-strategy.md) §7). Publish the manual citation-tracking method — that is a genuinely novel post and the most likely of the eight to earn a link | `/services/grow` |

**Priority if only six ship:** 1, 3, 5, 8, 2, 7. #1 and #3 unblock service leaves; #5 and #8 are the two nobody else can write the way we can.

**Guides also seed Home's insights section**, which is currently blocked on the open item *"Three insight posts, or cut the Home insights section."* Three guides retire it. Note that `insights` and `guides` are separate content kinds ([content-layer.md](../engineering/content-layer.md) §3) — Home's section either reads from `guides` or the two kinds merge. Decide before building §3 of the index.

---

## Motion budget check

| Page | Tier 1 | Tier 2 | Tier 3/4 |
|---|---|---|---|
| Index | 0 | 0 | `fadeUpGroup`, `hoverLift` |
| Article | 0 | 0 | `fadeUp` on block entry, `accordionOpen` on the ToC, `arrowSlide` |

**Zero supporting motion on a guide, deliberately.** These pages compete on load speed and extractability. Animation on long-form reading is friction, and per-paragraph reveals actively hurt — a reader arriving from a citation should see the quoted paragraph immediately, not after it fades in.

## Deliberate omissions

- **No `/blog`.** Phase 3. Guides are evergreen and link-earning; a blog needs cadence we can't commit to yet, and an abandoned blog is a visible negative signal.
- **No comments, no social share buttons.** Third-party JS on the pages with the strictest performance argument, for engagement we won't get at this traffic level.
- **No gated PDF versions.** Section 4.
- **No `authorBio` photo** until a real one exists — same rule as `team:founder-note` ([about-spec.md](about-spec.md) §4). Never stock.
- **No reading progress bar.** Decorative, and it's a scroll-linked animation on the site's most performance-sensitive page type.

## Build order

1. Content adapter + `guides` schema; `richText:mdx` ([content-layer.md](../engineering/content-layer.md) §5)
2. `articleSchema` builder in `lib/seo/schema.ts` — **does not exist yet**; current builders cover Organization, WebSite, Service, WebPage, FAQPage, BreadcrumbList only
3. `tableOfContents:inline` + `authorBio:compact`
4. The article frame + guide #1 as the fixture
5. Guides #3, #5, #8 — enough to publish the index
6. `/guides` index + `insights:featured-plus-list`
7. Footer Resources column gains `Guides`
8. Remaining guides as content, no further engineering
9. Home's insights section, once three exist

## Open items

- [ ] **A real author name** — an upgrade, no longer a blocker. Ship at the role-byline fallback in Section 2 and revisit when the employment-disclosure question resolves
- [ ] Resolve the ToC architecture (Section 3): ship `inline`, or move the ToC into `richText:mdx` as a prop
- [ ] Decide whether `insights` and `guides` are one content kind or two, before the index is built
- [ ] Eight guides × 1,800 words is the largest writing commitment in Phase 2. Confirm the realistic number before committing the index's shape — six is a fine answer
- [ ] Verify WhatsApp API pricing (#3) and n8n/Zapier/Make pricing tiers (#2) at time of writing, and set a review reminder — both change, and a stale comparison guide is worse than none
- [ ] `/llms.txt` ([seo-strategy.md](../system/seo-strategy.md) §7.7) should list the guides once they exist. Cheap, and it belongs in this wave
