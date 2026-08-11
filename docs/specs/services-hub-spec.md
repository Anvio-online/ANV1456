# Services hub — Page Spec

**URL:** `/services`
**Class:** Composed ([ADR-0006](../engineering/adr/0006-content-page-authoring-model.md))
**Primary intent:** Navigational + disambiguation. This page's job is to get a visitor to the right pillar in under fifteen seconds, and to say the one thing no pillar page can say about itself.
**Reads as:** A short, dense index. Not a fourth landing page.
**Primary conversion:** A click into Build / Automate / Grow.
**Secondary conversion:** Book a call, for the visitor who needs more than one pillar and doesn't want to choose.

**Title:** `AI Automation, Web Development & SEO Services | Anvio` (52 chars)
**Description:** `Three ways we help growing businesses: automate manual work, build software that scales, and get found online. See what each covers and where to start.` (150 chars)

**Keyword cluster:** Deliberately thin — see §9. The page targets the brand-plus-category shape (`Anvio services`, `AI and web development agency services`) and explicitly does **not** compete with its own pillars.
**Schema:** `BreadcrumbList` + `FAQPage`. **Not `Service`** — the three pillar pages each emit their own, and a fourth generic one on the hub is the schema equivalent of keyword cannibalization.

---

## The problem this page solves, and the one it could create

`/services` is currently a 404 that three pillar pages assert to Google as part of the site's breadcrumb trail ([phase-2-plan.md](phase-2-plan.md) §2). That alone justifies building it.

But a services hub is the classic cannibalization page. Written as *"we offer AI automation services, web development services, and SEO services…"* it competes with `/services/automate` for the same query, splits internal equity three ways, and ranks for none of it. [seo-strategy.md](../system/seo-strategy.md) §3: **one page = one intent.**

So the intent here is **choosing**, not selling. Every section below is either a router or an argument about combination — never a compressed version of a pillar page.

---

## Section 1 — Breadcrumb
`breadcrumb:inline` · dark · Tier 0

`Home / Services`. Renders `<nav aria-label="Breadcrumb">` + `<ol>`. Emits nothing — `breadcrumbSchema` stays in the page's own JSON-LD ([content-layer.md](../engineering/content-layer.md) §4).

---

## Section 2 — Hero
`hero:page-lead` · dark · Tier 3

Compact. No visual, no split — this page should reach its first real content within one screen.

**Copy**
> **Eyebrow:** SERVICES
> **H1:** Three ways we help. Most clients need two.
> **Sub:** Build makes the thing. Automate removes the manual work around it. Grow gets it found. They're sold separately because not everyone needs all three — but they're built by the same people, which is why they fit together.

*Alternates:* "Everything we do, and how to tell which part you need." / "One team, three problems."

**Motion:** `maskReveal` on the headline, `fadeUpGroup` on the sub. No CTAs in the hero — the pillar cards immediately below *are* the call to action, and a "Book a call" button above them would compete with the page's actual job.

**Note:** "Most clients need two" is the most useful sentence on the page and it should not be softened. It sets an expectation that makes the multi-pillar engagement normal rather than an upsell.

---

## Section 3 — The three pillars
`services:pillar-cards` · dark · Tier 3

The page's spine. Same component as Home §3, but with **full sub-item lists** rather than Home's teaser set — this is the one place where seeing the whole surface area at once is the point.

| Pillar | Promise | Sub-items |
|---|---|---|
| **Build** | Websites, applications, and internal systems that hold up as you grow | Business & corporate websites · Landing pages · Ecommerce · Web applications · Internal tools & dashboards · CRM / ERP · Custom software · Integrations · Data migration |
| **Automate** | AI agents and workflows that do the repetitive work your team is doing by hand | AI agent development · AI chatbots · AI customer support · Workflow automation · CRM automation · API integrations · RAG / knowledge base · Automation audit |
| **Grow** | Found in search, fast on every device, and improving month over month | Technical SEO · Site structure & internal linking · Generative engine optimization · Core Web Vitals · Performance optimization · Conversion optimization · Ongoing maintenance |

Each card links to its pillar page. **Sub-items are plain text until their leaf exists** — the four leaves from [service-leaf-spec.md](service-leaf-spec.md) gain links in Wave 3, the rest stay text ([automate-spec.md](automate-spec.md) §4: never link to an unbuilt page).

**Motion:** `hoverLift` only. Home's version of this section carries a looping micro-visual per card as Tier 2 ([motion-system.md](../system/motion-system.md) §8) — **deliberately dropped here.** The visitor who reaches `/services` has already decided to look; they need the list, not the pitch.

**SEO:** The sub-item names are the full leaf keyword set as real text. This is the single densest topical-cluster signal on the site, and it costs nothing to render.

---

## Section 4 — Which one do you need?
`faq:accordion` · dark · Tier 4

**Purpose:** The disambiguation section, shaped as questions because that is both how visitors think about it and how LLM surfaces cite it ([seo-strategy.md](../system/seo-strategy.md) §7.2).

**Copy**
> **Eyebrow:** START HERE
> **H2:** Which one do you need?

Questions:
1. **We have a website but it doesn't bring in enquiries. Where do we start?** — Usually Grow, not Build. Rebuilding a site that nobody finds solves the wrong problem.
2. **Our team is drowning in manual work. Do we need new software first?** — Usually not. Automate works on the tools you already run; a rebuild is only necessary when the existing system has no API at all.
3. **Can you do all three at once?** — Yes, and it's often cheaper, because the site gets built with the automation hooks and the search structure already in it rather than retrofitted.
4. **What if we don't know which problem we have?** — That's what the free consultation is for. We'll tell you which of the three we'd start with, including when the answer is "none of them yet."
5. **Do you work on projects you didn't build?** — Yes for Automate and Grow. For Build we'll usually recommend improving what exists before replacing it.
6. **What's the smallest thing you'll take on?** — A landing page, a single automated workflow, or a technical audit. All three pillars have an entry point that isn't a full engagement.

Each answer opens with a direct 40–60 word response, then expands. Emits `FAQPage` schema.

**This section carries the page.** Questions 1 and 2 are the two most common misdiagnoses in SMB software buying, and answering them by *sending the visitor away from the more expensive service* is the most credible thing on the page.

---

## Section 5 — How we work, whichever you pick
`process:vertical-list` · **light** · Tier 3

The same five stages every pillar page carries — `01 DISCOVER → 05 GROW` — stated once, generically.

> **H2:** The process is the same, whichever you start with.
> **Body:** Discovery, a plan you approve, weekly demos, a launch that runs in parallel with what you have now, and support after. The deliverables change per pillar. The shape doesn't.

**Deliberately `vertical-list`,** not `sticky-stack` and certainly not `horizontal-pin`. The pillar pages each get the richer treatment; this is a reference statement, and the About page ([about-spec.md](about-spec.md)) already established `vertical-list` as the register for "here's how we operate" rather than "here's how we'll sell you."

**Theme:** first light section. `themeShift` at the boundary.

---

## Section 6 — Selected work
`featuredWork:grid` · light · Tier 3

Case studies across all three pillars, each tagged with the services it exercised. Links to `/case-studies/[slug]`.

**Blocked on Wave 2.** Until case studies exist this section is withheld entirely — not filled with placeholders. If Wave 1 ships before Wave 2, `/services` launches at seven sections and gains this one later.

**SEO:** This is half of the case-study ↔ service cross-link pattern from [seo-strategy.md](../system/seo-strategy.md) §5. The other half lives on each case study.

---

## Section 7 — Why one partner for all three
`whyUs:principle-cards` · dark · Tier 3

The page's actual argument, and the one thing no pillar page can make on its own. This is [Brand_strategy.md](../Initial/Brand_strategy.md)'s UVP — *"far fewer can say we combine AI, automation, modern web development, and growth strategy under one roof"* — stated as consequences rather than as a claim.

> **H2:** Why this isn't three vendors.

| Principle | Body |
|---|---|
| **The automation is designed into the build** | When the same team builds the site and the workflows, the integration points exist from day one instead of being bolted on by whoever inherits the project. |
| **Nobody gets to blame the other vendor** | The most expensive weeks in any multi-vendor project are the ones spent establishing whose fault something is. One team, one answer. |
| **Search structure isn't retrofitted** | A site built without a URL architecture, schema, and internal linking gets those added later at three times the cost, badly. Ours ship with the build. |
| **You can start with one and add later** | Nothing here is a bundle. Each pillar is a real standalone engagement, and we'd rather do one well than sell three. |

That last card is what keeps this section from reading as an upsell. Say it plainly.

---

## Section 8 — Closing CTA
`ctaClosing:split-with-form` · dark · Tier 3

> **H2:** Not sure which one you need?
> **Body:** Tell us the problem rather than the service. 30 minutes, and we'll tell you which of the three we'd start with — including if the honest answer is "wait."
> **Form:** Name · Work email · Company · "What's the problem?" · **Book the call**

---

## 9. Nav and footer changes this page unblocks

Shipping `/services` is the precondition for two documented gaps, and both should land in the same wave ([phase-2-plan.md](phase-2-plan.md) §5, Wave 1).

**Nav — the mega-menu ([design-system.md](../system/design-system.md) §6.5).** The current single-column dropdown becomes a three-column panel: one column per pillar, each with its heading linking to the pillar page and its sub-items beneath. The panel header links to `/services` itself. `Products` · `Case Studies` · `Blog` from the design-system spec stay out until those pages exist — the mega-menu's *structure* lands now, its full link set arrives with Phase 3.

**Footer — four columns ([design-system.md](../system/design-system.md) §6.6).** Services gains `/services` plus the four shipped leaves; Resources and Legal columns appear once Waves 2/5 and Wave 1's legal pages land. Per [seo-strategy.md](../system/seo-strategy.md) §5 the footer carries the leaf links sitewide, which is real equity on a small site — but only for leaves that exist.

---

## Motion budget check

| Tier | Count | What |
|---|---|---|
| 1 | **0** | By policy — [phase-2-plan.md](phase-2-plan.md) §4 |
| 2 | **0** | Nothing here explains itself better in motion |
| 3 | — | `maskReveal` (hero, 1 of the page's 2 permitted), `fadeUpGroup` throughout |
| 4 | — | `hoverLift`, `accordionOpen`, `arrowSlide` |

A hub page with zero supporting motion is correct. Every second of animation here is a second between the visitor and the pillar page they came to find.

## Deliberate omissions

- **No proof bar.** The stats belong on the pages that make the claims. Repeating them here dilutes them and adds a screen before the pillar cards.
- **No agent demo**, despite it being on Home, Automate and the three Automate leaves ([service-leaf-spec.md](service-leaf-spec.md) §3a). Those are all pages where the visitor has already picked a direction. This one's entire job is to send them to a pillar in fifteen seconds; a demo here competes with that, and a visitor who wants it is one click from it.
- **No pricing.** Ranges are per-pillar and live on Home and Build. A blended range across three services is a number that's wrong for everyone.
- **No industries.** `/industries` is its own hub; linking there from the nav and Home is enough.

## Build order

1. `breadcrumb` section type ([content-layer.md](../engineering/content-layer.md) §5 step 4)
2. Sections 1–5, 7, 8 — all existing components *(shippable page)*
3. Nav mega-menu + footer Services column
4. Section 6, when Wave 2 lands

## Open items

- [ ] Confirm the full sub-item lists in §3 match the three pillar pages' cluster contents exactly — they're the same keyword set and drift between them is a cannibalization risk
- [ ] FAQ answers written to the 40–60 word answer-first standard, particularly #1 and #2
- [ ] Decide whether the mega-menu's fourth column is `/case-studies` (Wave 2) or nothing until Phase 3
