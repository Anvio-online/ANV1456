# Grow — Page Spec

**URL:** `/services/grow`
**Primary intent:** Commercial — "SEO services", with GEO as the wedge.
**Reads as:** Its own landing page. Shared shell and design system, unique hero and unique signature visual.
**Primary conversion:** Free site audit (the lead magnet — lower friction than a call, and it qualifies hard).
**Secondary conversion:** Book a call.

**Title:** `SEO & AI Search Optimization Services | Anvio` (45 chars)
**Description:** `Get found by search engines and by the AI assistants your customers now ask first. Technical SEO, GEO, and performance work — measured, not promised.` (150 chars)

**Keyword cluster:** SEO services · technical SEO audit · GEO / generative engine optimization · AI search optimization · Core Web Vitals optimization · conversion rate optimization
**Schema:** `Service` + `FAQPage` + `BreadcrumbList`

**The strategic bet on this page:** GEO gets its own cluster and its own airtime. Every agency sells SEO; almost none can competently explain how to be cited by ChatGPT, Perplexity, and AI Overviews. Our own `seo-strategy.md` §7 is a real GEO methodology — this page is where that expertise becomes a sales argument. Selling it as one bullet inside "SEO" wastes the only genuinely differentiated thing we have on this page.

**Credibility constraint, non-negotiable:** this is the page where a technical buyer audits *us*. If anvio.online doesn't hit its own performance numbers, no copy on this page survives. See [motion-system.md](../system/motion-system.md) §1 — that constraint exists because of this page.

---

## Section 1 — Hero
`hero:split-visual` · dark · Tier 3

**Copy**
> **Eyebrow:** SEO · GEO · PERFORMANCE
> **H1:** Your customers stopped Googling. Some of them are asking an AI instead.
> **Sub:** We do the technical SEO that still decides rankings — and the newer work that decides whether an AI assistant cites you or your competitor. Measured monthly, in traffic and leads, not in "impressions."
> **CTA primary:** Get a free site audit
> **CTA secondary:** Book a consultation
> **Trust line:** First audit back in 5 working days · No contract to see it

*Alternates:* "Getting found is a different job than it was two years ago." / "Rankings are half the job now."

**Layout:** Headline + sub left (7 cols), a **static poster** of the dashboard scene right (5 cols) — a metrics panel at its "after" state, motionless. The live scene is §5 and stays out of the hero's critical path. Same rule as Automate and Build.

**Motion:** `maskReveal` headline, `fadeUpGroup` sub + CTAs. No JS dependency.

---

## Section 2 — Proof bar
`proofBar:stat-row` · dark · Tier 2

> `5 days` to your first audit, free
> `90+` Core Web Vitals score we build to on every engagement
> `Monthly` reporting in traffic and leads, not vanity metrics
> `No lock-in` month to month, cancel any time

**Motion:** `counterRoll` where there's a number, static where there isn't (`Monthly`, `No lock-in` render as-is — the primitive already handles strings with no digits).

**Rule:** every number survives "how do you know?" These four are all commitments we control, not outcome claims about past clients. That's deliberate — we don't yet have permission-cleared Grow results, and inventing them on the page that sells credibility would be the worst possible place to do it.

---

## Section 3 — What it's costing you
`problem:cost-calculator` · dark · **Tier 2, interactive**

**Purpose:** The recognition moment, but Grow's version is arithmetic rather than description. An SMB owner doesn't feel "poor search visibility" — they feel "the phone doesn't ring." This section does that conversion in front of them.

**Content:** Three inputs, one output. All client-side, no submission, no gate.

```
Monthly visitors        [ 2,000  ]
Enquiry rate            [  1.5% ]   ← industry-typical default, editable
Average deal value      [ ₹25,000 ]
─────────────────────────────────────
Today                    30 enquiries/mo   ₹7,50,000
At 3% enquiry rate       60 enquiries/mo   ₹15,00,000
The gap                                    ₹7,50,000 / month
```

Below, in `--d-text-3`: `Rough arithmetic, not a promise. A 1.5% → 3% move is realistic on most sites we audit; some are already there, and we'll tell you if yours is.`

That disclaimer is load-bearing. A calculator without it is the exact over-promising this page's whole positioning rejects.

**Motion:** `counterRoll` on the outputs as inputs change (debounced ~300ms so it settles rather than flickering). Inputs are real `<input type="number">` — keyboard-operable, labelled, no custom slider widget.

**Degradation:** server-renders with the default values already computed and visible. It's a real, readable table before any JS runs; interactivity is the enhancement.

**SEO/GEO:** the surrounding copy targets "how much is poor SEO costing me" / "SEO ROI" — genuinely searched, rarely answered with arithmetic.

---

## Section 4 — What we do
`services:cluster-grid` · dark · Tier 3

Six services, four clusters — GEO deliberately promoted to its own.

| Cluster | Headline promise | Sub-items (accordion) |
|---|---|---|
| **Search Visibility** | The technical work that still decides who ranks | Technical SEO audit · Site structure + internal linking · Content structure for search |
| **AI Search (GEO)** | Being the answer, not just a blue link | Generative engine optimization · Structured data + entity clarity · Citation-shaped content |
| **Performance** | Fast enough that nobody leaves before the page loads | Core Web Vitals · Performance optimization · Technical debt cleanup |
| **Conversion & Iteration** | Turning the traffic you already have into enquiries | Conversion rate optimization · Ongoing site maintenance · Monthly measurement + iteration |

**Motion:** `fadeUpGroup` on clusters, `accordionOpen` on sub-items.

**SEO:** sub-items are the Phase 2/3 leaf keyword set — `/services/grow/seo`, `/services/grow/geo`, `/services/grow/performance-optimization`, `/services/grow/technical-audit` are the four already in the footer. Never link to them until they exist.

**On the GEO cluster's copy:** it must explain the mechanism, not just claim the capability. "Structured data + entity clarity" and "citation-shaped content" are the actual levers; naming them is what separates us from an agency that added "AI SEO" to a pricing page last quarter.

---

## Section 5 — What good looks like, over six months
`growthChart:dashboard-evolve` · dark · **Tier 1 signature**

**Purpose:** The page's memorable object. Automate shows a workflow running; Build shows a thing being made; Grow shows *time passing* — because that's the honest shape of this service, and setting that expectation up front is itself a qualifying filter.

**Content:** A single metrics panel that advances month by month as you scroll. One panel, six states — not six charts.

```
M1   Baseline        audit done, 41 issues found, nothing fixed yet
M2   Technical       CWV green, crawl errors cleared — rankings flat, deliberately
M3   Structure       internal linking + schema land; first impressions move
M4   Content         citation-shaped pages ship; first AI Overview appearance
M5   Compounding     rankings and enquiries both moving
M6   Steady state    measurable lead flow, monthly iteration
```

Each state: a line chart advancing one segment, two or three metric readouts (`counterRoll`), and a mono caption naming what was done that month.

**The M2 state is the most important frame on the page** — "rankings flat, deliberately" is the single most credible thing we can say, because every honest SEO engagement has that month and no agency site ever shows it.

**Motion:** Full spec in [motion-system.md](../system/motion-system.md) §7.4. Scroll-driven, ~180vh pin, line path extends via `stroke-dashoffset`, metrics `counterRoll` per state, `01—06` progress rail. DOM + SVG, **never canvas** — the captions and numbers must be real text.

**Degradation:** below 1024px and under reduced motion, renders as a static six-row vertical list (month · what shipped · the numbers), all content visible. Server-rendered default; the scene is dynamically imported, `ssr:false`, IntersectionObserver-gated.

**Honesty constraint:** the numbers in this scene are **illustrative of a shape, not a case study**, and the section must say so in a visible caption — not a footnote. The moment they read as a real client's results without being one, this page is doing the thing it accuses other agencies of.

---

## Section 6 — Our process
`process:sticky-stack` · **light** · Tier 3

Same five stages, Grow-specific:

> 01 DISCOVER — Full technical audit: what's broken, what's ranking, what's invisible to AI.
> 02 STRATEGIZE — We pick the fixes with the best effort-to-impact ratio and tell you what to ignore.
> 03 BUILD — Technical fixes, structure, and content ship in priority order.
> 04 LAUNCH — Changes go live in measured batches, so we know what caused what.
> 05 GROW — Monthly measurement, monthly iteration, monthly report you can actually read.

**Theme:** first light section. `themeShift` at the boundary.

`04`'s "measured batches, so we know what caused what" is the methodological tell — it's how you know we're measuring rather than guessing.

---

## Section 7 — Free site audit
`leadMagnet:tool-card` · light · Tier 3

**Purpose:** The page's primary conversion, and the Phase 1 "1 free tool" from [SCOPE.md](../Initial/SCOPE.md)'s phasing.

**Copy**
> **H2:** Start with the audit. It's free, and it's not a PDF template.
> **Body:** Send us your URL. In five working days you get a real audit — technical issues ranked by impact, what's costing you rankings, how you look to an AI assistant, and what we'd fix first. If the answer is "your site's fine, spend the money elsewhere," we'll say that.
> **Form:** Website URL · Work email · **Get the audit**

**Why URL + email only:** every extra field costs completions, and those two are all we need to do the work. Name and company can come in the reply.

**The "spend the money elsewhere" line** is the whole offer's credibility. Keep it verbatim.

**Later:** this becomes `/tools/site-audit` as a real indexable page (seo-strategy.md §2 lists `/tools/*` as link magnets that rank). On this page it's a form; as a Phase 2 tool page it's a product.

---

## Section 8 — Selected work
`featuredWork:two-up-deep` · light · Tier 3

Two engagements, deep. Each: the state before · what we changed · **one hard metric** (`counterRoll`) · link to the case study.

**Blocked on content, and blocked harder than Build's.** Build can show a site that exists. Grow has to show *results*, and we have no permission-cleared Grow results yet. **Do not ship this section with illustrative numbers** — on the page that sells measurement honesty, a fabricated metric is disqualifying. Cut the section until there's one real engagement to show.

---

## Section 9 — What we report
`results:metric-row` · light · Tier 2

**Purpose:** Answers "what do I actually get every month?" — the objection that kills retainers.

A row of the metrics that appear in the monthly report, with a one-line definition of each. Not a chart — a definition list. Organic sessions · Ranking keywords in top 10 · AI citations (ChatGPT / Perplexity / AI Overviews) · Core Web Vitals · Enquiries from organic · Cost per enquiry.

Below: `And the ones we don't report on, because they don't mean anything: impressions, "domain authority", keyword count.`

That last line does more work than the list above it.

**Motion:** `counterRoll` is *not* used here — these are definitions, not values. `fadeUpGroup` only.

---

## Section 10 — FAQ
`faq:accordion` · dark · Tier 4

1. How long does SEO take to work?
2. What is GEO, and is it different from SEO?
3. How do we get cited by ChatGPT or AI Overviews?
4. Do you guarantee rankings?
5. What's in the monthly report?
6. Do we need to sign a long contract?
7. Can you work with our existing developer or agency?
8. What if our site is fine and doesn't need this?
9. How much does SEO cost for a small business?
10. Will AI search kill SEO traffic entirely?

**2, 3, and 10 are the highest-value** — all three are citation-bait definition queries where we have genuine expertise and almost nobody has written a straight answer. #4's answer is "no, and anyone who does is lying to you," which is the most valuable no on the page.

---

## Section 11 — Closing CTA
`ctaClosing:split-with-form` · dark · Tier 3

> **H2:** Find out what's actually wrong first.
> **Body:** The audit is free and there's no contract to see it. If it turns out you don't need us, that's a fine outcome — you'll still have the list.
> **Form:** Name · Work email · Website URL · **Get the free audit**

Deliberately re-offers the audit rather than a call — the page's primary conversion is the audit, and the closing CTA should match it, not compete with it.

---

## Motion budget check

| Tier | Section |
|---|---|
| **1 — Signature** | §5 Dashboard evolve |
| **2 — Supporting** | §2 `counterRoll` · §3 cost calculator · §9 metric row |
| 3 — Ambient | §1, §4, §6, §7, §8, §11 |
| 4 — Micro | §10 `accordionOpen`, hovers |

1 + 3. Within budget.

---

## Optional / Phase 2

- **Industries** — Home + `/industries`, same as the other pillars.
- **Agent demo** — wrong framing for this page (it asks about manual process). The free audit is Grow's equivalent conversion device and it's better suited. Don't put both on one page.
- **Tech stack** — Build's page, not this one.
- **Comparison content** ("us vs a typical SEO retainer") — strong, but it belongs in `/guides`, where it can be long enough to be fair.

## Build order

1. Hero, Proof bar, Cost calculator, Clusters, Free audit, Closing CTA *(shippable page)*
2. Process, What we report, FAQ
3. **Dashboard evolve** (Tier 1 — full sprint)
4. Selected work *(blocked on a real, permission-cleared engagement)*

## Open items

- [ ] The four proof-bar commitments — confirm we can actually turn an audit in 5 working days
- [ ] Cost calculator's default enquiry rate (1.5%) — source it or mark it clearly as a placeholder
- [ ] Decide where the free-audit submission goes and who does the work (this is an ops commitment, not just a form)
- [ ] The dashboard scene's six-month numbers — confirm the visible "illustrative, not a case study" caption ships with it
- [ ] FAQ answers written — #2, #3, #10 are worth real effort, they're the GEO citation bait
- [ ] anvio.online's own Lighthouse/CWV scores must clear 90+ before this page goes live
