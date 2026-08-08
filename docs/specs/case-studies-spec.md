# Case studies — Page Spec

**URLs:** `/case-studies` (index) · `/case-studies/[slug]` (detail)
**Class:** Composed (index) · Hybrid (detail) — [ADR-0006](../engineering/adr/0006-content-page-authoring-model.md)
**Wave:** 2 — **blocked on content and permission, not on code** ([phase-2-plan.md](phase-2-plan.md) §7)

This is the highest-value page in Phase 2 and the one most likely to ship badly. Every instinct on a case-study page pulls toward invention: a rounder number, a warmer quote, a client name that isn't quite ours to use. [Information_arch.md](../Initial/Information_arch.md) is right that *"case studies are what help close deals"* — but a case study with one fabricated metric is worth less than no case study, because the buyer who checks is exactly the buyer worth having.

So the structural rules come before the copy.

---

## 0. Three rules, enforced by the schema not by discipline

1. **`results` may be empty.** The frontmatter schema ([content-layer.md](../engineering/content-layer.md) §3) allows an empty array and the detail page renders correctly without a metric row. This mirrors `CaseStudyCard.outcome` being optional in `lib/sections/types.ts`, and it exists so that "we don't have a number for this one" is a supported state rather than a reason to invent one.
2. **Attribution is structural.** `attribution: 'direct' | 'partner-agency'` renders "Delivered via partner agency" from the field, never from hardcoded copy — so the honest framing can't be quietly dropped in a later edit. This field exists because of the open Stratseek question.
3. **`clientDisplay` may be anonymized.** `"a 60-person FMCG distributor in Ahmedabad"` is a complete, honest client name for our purposes. An NDA is a reason to anonymize, never a reason to skip the case study.

**Do not ship these pages until the Stratseek agreement has been read.** Naming a client you weren't licensed to name is not a fixable mistake. [`/projects`](projects-spec.md), the other half of Wave 2, is only partly gated by this — its internal items need no permission and should ship regardless ([phase-2-plan.md](phase-2-plan.md) §1a).

**Both entries are Build work.** Baladi and Epicerma are UAE ecommerce storefronts, so Wave 2 delivers proof for the pillar Anvio is *least* positioned around. That asymmetry is why `/projects` exists and why the Automate leaves carry the agent demo — [phase-2-plan.md](phase-2-plan.md) §1a. Nothing on this page should be stretched to compensate.

---

# Part 1 — `/case-studies` (index)

**Primary intent:** Proof, browsed. A visitor who arrived from a pillar page wanting to know whether we've done this before.
**Primary conversion:** A click into a detail page.

**Title:** `Case Studies: AI Automation & Web Development | Anvio` (52 chars)
**Description:** `Real projects, with the problem, the approach, and what actually changed. Including the parts that were harder than expected and what we'd do differently.` (153 chars)

**Schema:** `BreadcrumbList` + `CollectionPage`. No `Service` — this page sells nothing directly.

## Section 1 — Breadcrumb
`breadcrumb:inline` · dark · Tier 0 — `Home / Case Studies`

## Section 2 — Hero
`hero:page-lead` · dark · Tier 3

> **Eyebrow:** CASE STUDIES
> **H1:** Fewer projects, told properly.
> **Sub:** We'd rather show you two engagements in full — the problem, what we built, what changed, and what we got wrong — than twenty thumbnails you can't verify.

**The headline is doing honest work.** An index with two entries needs a framing that makes two the intended number rather than the available number, and [section-library.md](../system/section-library.md) §3 already commits to that position: *"Two case studies told properly beat six thumbnails, and it's honest about where we are."* Change the headline when there are eight, not before.

**Motion:** `fadeUpGroup`. No `maskReveal` — this page's two reveals are spent on the detail pages.

## Section 3 — The list
`featuredWork:grid` · dark · Tier 3

One card per entry, from `contentRepository.list('case-studies')`. Each card: `clientDisplay` · industry · region · the one-sentence `problem` · service tags · the headline metric **if one exists** · "Delivered via partner agency" when `attribution` says so.

Service tags link to the pillar or leaf they name — half of the cross-link pattern in [seo-strategy.md](../system/seo-strategy.md) §5.

**Motion:** `fadeUpGroup`, `hoverLift`, `arrowSlide` on the card link. `counterRoll` is **not** used on index cards — a grid of simultaneously counting numbers reads as a dashboard, and it's the detail page's device.

**Empty state:** the route is not published until at least one entry exists. An empty index is a worse signal than a 404, and it will get indexed.

## Section 4 — Closing CTA
`ctaClosing:centered-bold` · dark · Tier 3

> **H2:** Your project doesn't have to be like these.
> **Body:** Most of what we do doesn't become a case study — it becomes a workflow nobody thinks about again. Tell us what you're dealing with.

`centered-bold`, not `split-with-form`. A visitor here is evaluating, not converting; a form is premature and the page is short enough that a second scroll to `/contact` costs nothing.

---

# Part 2 — `/case-studies/[slug]` (detail)

**Primary intent:** Verification. This visitor is close, and is checking whether we're real.
**Primary conversion:** Book a call.
**Secondary:** A click into the service pages the project exercised.

**Title:** From frontmatter `title`, ≤ 60 chars including ` | Anvio`.
**Description:** From frontmatter, 140–158, enforced by Zod.
**Schema:** `Article` + `BreadcrumbList`. `author`, `datePublished`, `dateModified` from frontmatter — [seo-strategy.md](../system/seo-strategy.md) §7.5, provenance is what makes a page citable.

**Route:** `app/(marketing)/case-studies/[slug]/page.tsx`, `generateStaticParams` from `contentRepository.slugs('case-studies')`, `notFound()` on a null entry.

## Section 1 — Breadcrumb
`breadcrumb:inline` · dark · Tier 0 — `Home / Case Studies / {clientDisplay}`

## Section 2 — Hero
`hero:case-lead` · dark · Tier 3

The one **new variant** this spec requires. Layout: eyebrow (`industry · region`), H1 (the outcome, not the client name), a one-line problem statement, and the headline metric at `display-l` in `--accent` if one exists. Hero image optional and `priority`-loaded when present — it is the LCP element.

> **Eyebrow:** {industry} · {region}
> **H1:** {frontmatter `h1`} — the sentence about what changed, not "Baladi Food Stuff"
> **Sub:** {frontmatter `problem`}
> **Attribution line:** "Delivered via partner agency" · rendered from the field, in `--d-text-3`, directly under the eyebrow

**The H1 is the outcome, not the client.** "A catalogue their buyers could actually navigate" ranks and reads; "Baladi Food Stuff" does neither. The client name belongs in the eyebrow and the body.

**Degradation when there is no metric:** the metric slot collapses and the sub gets the space. Reserve the height with `aspect-ratio` either way — no CLS ([motion-system.md](../system/motion-system.md) §6.6).

## Section 3 — Results
`results:metric-row` · dark · **Tier 2** — the page's one supporting scene

`counterRoll` on `results[]` from frontmatter. **The entire section is omitted when `results` is empty**, and that omission must look intentional: the page flows hero → body with no gap, no "results coming soon", no empty state.

Each metric carries its `label` as a definition, not a boast — the same discipline as `results:metric-row` on Grow, where the footnote names what we deliberately *don't* report.

**This is the page's only Tier 2 piece.** [phase-2-plan.md](phase-2-plan.md) §4 permits two; one is enough, and spending it on the real numbers is the obvious call.

## Section 4 — The story
`caseStudyBody:narrative` · **light** · Tier 3

The MDX body, through the new `caseStudyBody` section ([content-layer.md](../engineering/content-layer.md) §4). Five parts, in this order, as `##` headings inside the body:

| Part | What goes in it |
|---|---|
| **The problem** | What was actually happening, in the client's terms. Concrete: how many people, how many hours, which tool. |
| **What we looked at first** | Discovery. Including anything we found that wasn't the stated problem — this is the part that reads as real. |
| **What we built** | The solution, with the integration points named. Real `<table>` or `<ol>`, never a styled div ([seo-strategy.md](../system/seo-strategy.md) §7.6). |
| **What changed** | Outcomes in prose, expanding on the metric row. If there's no metric, this section carries the whole weight and needs to be specific in other ways — cycle time, error rate, what stopped happening. |
| **What we'd do differently** | **Required.** Not optional, not "lessons learned" as a throwaway. |

**On the last section:** [Information_arch.md](../Initial/Information_arch.md) lists "lessons learned" as part of what a case study is, and it is the single most differentiating block available to us. Every agency case study on the internet ends in triumph. One that names a wrong assumption, a week lost to a bad integration choice, or a feature the client didn't end up using is instantly more credible than the four above it — and it costs nothing but nerve.

**Theme:** light. The body is long-form reading and the near-white canvas is what [SCOPE.md](../Initial/SCOPE.md)'s locked theme decision reserves for exactly this.

**Motion:** `fadeUp` on block entry only. Long-form prose that animates per paragraph is unreadable.

## Section 5 — Stack
`techStack:categorized` · light · Tier 3

From `stack[]`. Grouped where the array has enough entries to group, a single row where it doesn't. Short — this is a fact, not an argument.

## Section 6 — Related
`relatedLinks:card-grid` · light · Tier 3

3–5 links: the pillar and leaf pages this project exercised (from `services[]`), the industry page if one exists, and one other case study. Descriptive anchors with a one-line note each — never bare "learn more" ([seo-strategy.md](../system/seo-strategy.md) §4).

**This section is the other half of the equity loop.** [seo-strategy.md](../system/seo-strategy.md) §5: *"every case study links to the service pages it exercised, and vice versa — this is the pattern that turns proof into rankings."* Resolve the links from `services[]` rather than hand-listing them, so a service page rename can't silently orphan them.

## Section 7 — Closing CTA
`ctaClosing:split-with-form` · dark · Tier 3

> **H2:** Recognize any of this?
> **Body:** If the problem above sounds like yours, the conversation is short. 30 minutes, and we'll tell you whether the same approach applies.
> **Form:** Name · Work email · Company · "What's the situation?" · **Book the call**

---

## Motion budget check

| Page | Tier 1 | Tier 2 | Notes |
|---|---|---|---|
| Index | 0 | 0 | A grid of cards. Fade-ups only. |
| Detail | 0 | 1 — `counterRoll` on the metric row | Within [phase-2-plan.md](phase-2-plan.md) §4's ≤2 |

## Deliberate omissions

- **No testimonial section.** `testimonial` stays unbuilt in Phase 2 ([content-layer.md](../engineering/content-layer.md) §4). We have no quotes, and an empty testimonial block on a page about credibility is self-defeating.
- **No client logo.** Requires permission we may not have, and one logo is worse than none.
- **No "similar projects" carousel.** With two entries it's a link to the other one, which §6 already provides.
- **No internal builds on this page.** They live on [`/projects`](projects-spec.md), which ships in the same wave. [Information_arch.md](../Initial/Information_arch.md) separates the two deliberately — a case study is a client's problem told in full; a project is a quick overview. Both pages cross-link and each explains what the other is for.

## Build order

1. Content adapter + `case-studies` schema ([content-layer.md](../engineering/content-layer.md) §5 steps 1–2)
2. `caseStudyBody:narrative` and `hero:case-lead`
3. `/case-studies` index — shippable with one entry
4. `/case-studies/[slug]`
5. Re-point Home's `featuredWork` cards: `CaseStudyCard.href` becomes populated ([phase-2-plan.md](phase-2-plan.md) §2)
6. Footer Resources column gains `Case Studies`
7. Add both routes to `sitemap.ts` from `contentRepository.slugs()`, not as literals

## Open items

- [ ] **Read the Stratseek agreement** — client naming, attribution wording, and whether metrics can be published. Blocks everything above.
- [ ] Write the two case studies. Each needs a real "what we'd do differently" section, which means asking the question honestly while the project is fresh.
- [ ] Decide `author` for `Article` schema — same unresolved name/attribution question as About §4 and `authorBio`.
- [ ] Confirm whether either project has a publishable metric. If neither does, §3 is omitted on both pages and that is an acceptable v1.
