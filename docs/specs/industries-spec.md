# Industries — Page Spec

**URLs:** `/industries` (hub) · `/industries/ecommerce` · `/industries/accounting-firms`
**Class:** Composed (hub) · Hybrid (leaves) — [ADR-0006](../engineering/adr/0006-content-page-authoring-model.md)
**Wave:** 4 ([phase-2-plan.md](phase-2-plan.md) §5)

[Information_arch.md](../Initial/Information_arch.md) makes the case plainly: a visitor running an accounting firm reads *"AI Solutions"* and wonders whether it's for them; they read *"AI for Accounting"* and think *"these people understand businesses like mine."* That recognition is the whole product of these pages.

The failure mode is equally plain, and it is what kills most industry sections: six near-identical pages with the industry name find-and-replaced. [seo-strategy.md](../system/seo-strategy.md) §1 is explicit that thin pages suppress the whole domain. **Two real industry pages beat six templated ones**, which is why Phase 2 builds two and the hub says so out loud.

---

## Which two, and why

Home already ships six industry tiles — Healthcare, Ecommerce, Real Estate, Accounting & Finance, Education, Logistics ([home-spec.md](home-spec.md)). Two get pages in Phase 2.

**`/industries/ecommerce`.** The only one of the six that genuinely exercises all three pillars — a store to build, order and support flows to automate, and product-page search to win. It is also where the WhatsApp automation leaf ([service-leaf-spec.md](service-leaf-spec.md)) has its most recognizable use case in the India market.

**`/industries/accounting-firms`.** Invoice entry and reconciliation is the canonical automation story, the one every SMB owner recognizes in a sentence. Tally and Zoho Books are already named in Automate's integration marquee ([automate-spec.md](automate-spec.md) §7), so the specificity is real rather than researched. [seo-strategy.md](../system/seo-strategy.md) §3 names *"automation for accounting firms"* as an example target.

**Slug note:** the tile says "Accounting & Finance" but the URL is `accounting-firms`, matching the query shape rather than the category label. Confirm against real data before Wave 4 — a leaf URL is set once ([seo-strategy.md](../system/seo-strategy.md) §2).

**Healthcare is deliberately deferred**, despite being the most obvious pick. Patient data means a defensible position on India's DPDP Act and, for any international client, HIPAA — and we do not have one documented. An industry page that invites healthcare enquiries before we can answer *"where does our patient data go?"* generates leads we shouldn't take. Build it in Phase 3, after the data-handling answer exists (it is already an open item on [automate-spec.md](automate-spec.md) §11 and [legal-spec.md](legal-spec.md)).

---

# Part 1 — `/industries` (hub)

**Primary intent:** Recognition and routing. Confirm we work with businesses like theirs, then send them somewhere specific.
**Primary conversion:** A click into an industry page, or into a pillar.

**Title:** `Industries We Work With: AI & Web Development | Anvio` (53 chars)
**Description:** `Ecommerce, accounting, healthcare, real estate, education, logistics. The manual bottlenecks differ by industry — the pattern behind them usually doesn't.` (152 chars)

**Schema:** `BreadcrumbList` + `FAQPage`. No `Service`.

## Section 1 — Breadcrumb
`breadcrumb:inline` · dark · Tier 0 — `Home / Industries`

## Section 2 — Hero
`hero:page-lead` · dark · Tier 3

> **Eyebrow:** INDUSTRIES
> **H1:** Six industries we know well. The pattern is usually the same.
> **Sub:** What gets automated in a clinic and what gets automated in a warehouse look nothing alike from the outside. Underneath, it's almost always the same four bottlenecks.

**Motion:** `fadeUpGroup`. No `maskReveal` — the hub is a router.

## Section 3 — The six
`industries:compact-grid` · dark · Tier 4

The same six tiles and lines as Home §9, from the same source. **Ecommerce and Accounting & Finance carry `href`; the other four remain plain cards** — `IndustryTile.href` is already optional for exactly this reason, and the rule holds ([automate-spec.md](automate-spec.md) §4).

**Motion:** `hoverLift` on linked tiles only. A hover affordance on a non-linked card is a broken promise, and the current `IndustryTile` already handles this correctly.

**Do not duplicate the tile copy across two files.** These six lines currently live inline in Home's section array; the hub should read them from one shared source so they can't drift.

## Section 4 — The four bottlenecks
`problem:pain-grid` · **light** · Tier 3

The page's substance, and the reason it isn't a link list. Four patterns, each stated generically then instantiated per industry.

| Bottleneck | The cost it creates |
|---|---|
| **Re-typing** | The same information entered twice, into two systems that don't talk. A WhatsApp order re-keyed into the CRM; an invoice PDF re-keyed into Tally. Nobody logs the hours because it's five minutes at a time. |
| **Answering the same question** | A support inbox, a front desk, or a sales rep spending most of a day on questions already answered somewhere in writing. |
| **Remembering to follow up** | Follow-ups that depend on a person remembering. The ones that don't happen are invisible, which is what makes them expensive. |
| **Assembling the report** | Somebody's Monday morning spent copying numbers between spreadsheets to produce a view a system could produce continuously. |

**Capped at four**, well inside `fadeUpGroup`'s six-child limit ([motion-system.md](../system/motion-system.md) §3).

**SEO/GEO:** This section is what makes `/industries` a page rather than a menu, and it's directly extractable — a clear four-item answer to *"what does business automation actually replace."*

## Section 5 — Why there aren't twenty of these
`richText:prose` · light · Tier 3

> **H2:** Why we don't have twenty industry pages.
> **Body:** Most agencies do, and most of them are the same page with a word swapped. We've written the two we can write specifically — ecommerce and accounting — because we've done the work and can name the actual tools and the actual failure points. The rest are on this page as tiles, honestly, until we can do the same for them.
>
> If your industry isn't listed, that's usually not a problem. Ask us about the process, not the sector — a distributor's order desk and a clinic's front desk fail in almost exactly the same way.

**This section is the page's credibility.** Naming the reason the page is short is more persuasive than padding it, and it's the same move [case-studies-spec.md](case-studies-spec.md) makes with two entries.

## Section 6 — FAQ
`faq:accordion` · dark · Tier 4

1. **Do you only work with these industries?** — No. These are the ones we can describe specifically.
2. **We're in a regulated industry. Can you work with our data?** — Answer-first, honest, and **must match [legal-spec.md](legal-spec.md)'s privacy policy exactly.** Do not write this one loosely.
3. **How much does industry experience actually matter?** — Less than process experience, and saying so is the honest answer.
4. **Do you have references in our sector?** — Links to `/case-studies`, filtered where possible.

Emits `FAQPage`.

## Section 7 — Closing CTA
`ctaClosing:centered-bold` · dark · Tier 3

> **H2:** Tell us about the process, not the industry.
> **Body:** 30 minutes. Describe what your team does by hand and we'll tell you whether we've solved it before — in your sector or a different one that fails the same way.

---

# Part 2 — `/industries/[slug]` (leaf)

**Primary intent:** `AI automation for {industry}` and the industry-shaped long tail.
**Primary conversion:** Book a call.
**Route:** `app/(marketing)/industries/[slug]/page.tsx`, `generateStaticParams` from `contentRepository.slugs('industries')`.
**Schema:** `Service` (with `areaServed`) + `FAQPage` + `BreadcrumbList`.
**Substance floor:** ≥ 800 words of real content, per [seo-strategy.md](../system/seo-strategy.md) §4. Most of it lives in the MDX body.

## Shared frame

Nine sections, identical for every industry leaf. Only frontmatter and the body differ ([ADR-0006](../engineering/adr/0006-content-page-authoring-model.md), class 2).

| # | Section | Theme | Tier | Source |
|---|---|---|---|---|
| 1 | `breadcrumb:inline` | dark | 0 | route |
| 2 | `hero:page-lead` | dark | 3 | frontmatter `h1`, `description` |
| 3 | `problem:pain-grid` | dark | 3 | frontmatter `pains[]` — **industry-specific, max 6** |
| 4 | `richText:mdx` | light | 3 | **the body — this is what ranks** |
| 5 | `services:cluster-grid` | light | 3 | frontmatter `services[]`, resolved to pillars + shipped leaves |
| 6 | `featuredWork:grid` | light | 3 | `list('case-studies', { where: { industry } })` — **omitted when empty** |
| 7 | `faq:accordion` | dark | 4 | frontmatter `faq[]` |
| 8 | `relatedLinks:card-grid` | dark | 3 | frontmatter `relatedLinks[]` |
| 9 | `ctaClosing:split-with-form` | dark | 3 | fixed copy, industry-specific question |

Theme runs 3 dark → 3 light → 3 dark, satisfying the renderer's *"no more than three consecutive"* check ([section-library.md](../system/section-library.md) §1). Section 6 dropping out leaves 3/2/3, which is still valid — worth noting, because a frame that becomes invalid when an optional section is omitted is a latent bug.

**§3 is the section that must not be generic.** If a leaf's `pains[]` could be pasted onto another industry unchanged, the page has failed and should not ship. This is the difference between the two pages we're writing and the twenty we're not.

## `/industries/ecommerce`

**Title:** `Ecommerce Automation & Development Services | Anvio` (50 chars)
**H1:** Your store runs fine. The work around it doesn't.

**Pains (§3):** order confirmations typed by hand from WhatsApp · inventory drift between the store and the warehouse sheet · "where is my order" answered forty times a day · abandoned-cart follow-up that nobody has time to run · returns tracked in a spreadsheet · marketplace listings updated separately from the site.

**Body (§4) must cover:** the WhatsApp-to-CRM order flow in concrete terms; inventory sync and what breaks when it's manual; support deflection with a real number range; what we'd build first and what we'd leave alone; the Shopify/WooCommerce/Razorpay reality of the India market.

**Services (§5):** Automate (WhatsApp automation ✱, AI chatbot ✱) · Build (ecommerce development) · Grow (product-page search). ✱ = shipped leaves, real links.

## `/industries/accounting-firms`

**Title:** `AI Automation for Accounting Firms | Anvio` (41 chars)
**H1:** Your team's billable hours are going into data entry.

**Pains (§3):** invoices re-keyed from PDF and email into Tally or Zoho Books · reconciliation done by eye · client document chasing by hand every month · the same compliance question answered for thirty clients · deadline tracking living in one person's head · reports assembled manually at month end.

**Body (§4) must cover:** document intake and extraction and its honest accuracy limits; what human review still has to exist and why; Tally and Zoho Books integration specifics; a per-client-per-month time range; and an explicit statement of what we would *not* automate — anything requiring professional judgement. That last point is not a disclaimer, it's the reason a cautious firm keeps reading.

**Services (§5):** Automate (AI agent development ✱, workflow automation, API integrations) · Build (internal tools) · Grow (local search).

---

## Motion budget check

| Page | Tier 1 | Tier 2 | Tier 3/4 |
|---|---|---|---|
| Hub | 0 | 0 | `fadeUpGroup`, `hoverLift`, `accordionOpen` |
| Each leaf | 0 | 0 | `fadeUpGroup`, `accordionOpen`, `arrowSlide` |

Zero supporting motion on all three pages. These are reading pages; their competitive advantage is that they load instantly and are easy to extract from.

## Deliberate omissions

- **No industry-specific signature scene.** [phase-2-plan.md](phase-2-plan.md) §4 — a fifth Tier 1 devalues the four that exist.
- **No `industries:tabbed-detail` variant.** It's in the catalogue but a tab set hides content behind client-side state, and [seo-strategy.md](../system/seo-strategy.md) §4's animation trap rules that out for anything load-bearing. `compact-grid` plus real pages is strictly better.
- **No proof bar or stat row.** The pillar pages' stats are pillar claims; re-stating them per industry implies industry-specific measurement we don't have.
- **No healthcare, real estate, education, or logistics pages.** Tiles only, until each can be written as specifically as these two.

## Build order

1. Content adapter + `industries` schema ([content-layer.md](../engineering/content-layer.md) §3)
2. `/industries` hub — no content dependency beyond `breadcrumb`; **ship this alone if the leaf copy slips**
3. Extract the six tile definitions to one shared source, consumed by both Home and the hub
4. `/industries/[slug]` frame + the ecommerce entry
5. The accounting entry
6. Home's six tiles gain `href` for the two that exist ([phase-2-plan.md](phase-2-plan.md) §2)
7. Both leaves into `sitemap.ts` via `contentRepository.slugs()`

## Open items

- [ ] Validate `accounting-firms` vs `accounting` vs `accounting-and-finance` as the slug, before the URL is set
- [ ] Write both bodies to ≥800 words with named tools and real numbers — if either can't clear that honestly, ship the hub and one leaf
- [ ] The regulated-data FAQ answer (§6.2) must be written by whoever can answer it precisely, and must match [legal-spec.md](legal-spec.md). Same blocker as [automate-spec.md](automate-spec.md) §11 question 6
- [ ] Decide whether the six tile lines move to `content/industries/` frontmatter or to a shared TS constant — the two-linked/four-plain split makes the constant simpler for now
