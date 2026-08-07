# Build — Page Spec

**URL:** `/services/build`
**Primary intent:** Commercial — "web development services" and everything around it.
**Reads as:** Its own landing page. Shared shell and design system, unique hero and unique signature visual.
**Primary conversion:** Book a call.
**Secondary conversion:** Agent demo completion (shared component — the demo asks about manual process, which still qualifies a Build visitor).

**Title:** `Web Development Services for Growing Businesses | Anvio` (56 chars)
**Description:** `Websites, ecommerce, and custom software built to fit how your business actually works. Design, build, and integration under one roof — with the code handed to you.` (157 chars)

**Keyword cluster:** web development services · custom web application development · ecommerce development · CRM development · business website development · custom software development
**Schema:** `Service` + `FAQPage` + `BreadcrumbList`

**Source:** `docs/Initial/build_wireframe.md` had eight peer services (Business Websites, Corporate Websites, Landing Pages, Ecommerce, Web Applications, CRM/ERP, Custom Software, UI/UX Design). Same treatment as Automate: they collapse into **4 capability clusters**, because eight peer cards is a wall, not a menu.

**One deliberate omission — UI/UX Design is not a cluster.** `Brand_strategy.md` explicitly rules out positioning as "a graphic design studio." Design is real work we do, but selling it as a separate line item invites the wrong brief (a Figma file, no build). It appears inside the process (§6, stage 03) and inside every cluster's description, not as a thing you can buy alone.

---

## Section 1 — Hero
`hero:split-visual` · dark · Tier 3

**Copy**
> **Eyebrow:** WEB DEVELOPMENT
> **H1:** Most agencies ship you a website. We ship you the thing your business runs on.
> **Sub:** Websites, storefronts, and internal software built around how your team actually works — not around a template's idea of it. You get the code, the docs, and a team that still knows your system in a year.
> **CTA primary:** Book a free consultation
> **CTA secondary:** See our work → (scrolls to featured work)
> **Trust line:** Typical site live in 4–8 weeks · You own everything we build

*Alternates:* "Built to fit your business, not a template's idea of it." / "The website is the easy part. Making it fit your business isn't."

**Layout:** Headline + sub left (7 cols), a static poster of the assembly scene right (5 cols) — a wireframe frame with two or three blocks already resolved into finished UI. **Static markup, no scene JS.** Same rule as Automate's hero: the live scene is §5 and must never sit in the hero's critical path.

**Motion:** `maskReveal` headline, `fadeUpGroup` sub + CTAs. LCP-safe, no JS dependency.

---

## Section 2 — Proof bar
`proofBar:stat-row` · dark · Tier 2

Same component as Automate §2, different numbers. Every number must survive "how do you know?"

> `4–8 weeks` typical time from kickoff to a live site
> `90+` Lighthouse performance we ship to, not just test to
> `100%` code, design files, and docs owned by you
> `30 days` post-launch support included on every build

**Motion:** `counterRoll`, `tabular-nums`, fires once at 40% entry.

**Note:** the `90+` claim is the one that has to be defensible. It's a build standard we control, not a claim about a third party — but it means every Build case study we publish must actually hit it. If we can't hold that bar, cut the stat rather than soften it.

---

## Section 3 — What actually goes wrong
`problem:pain-grid` · dark · Tier 2

**Purpose:** The recognition moment. Automate's §3 does this with a before/after table; Build's failure modes aren't paired transformations, they're independent bad outcomes — so a grid, not a two-column contrast. Same section family, different variant, per section-library.md's variant-first rule.

**Copy**
> **Eyebrow:** WHY REBUILDS HAPPEN
> **H2:** Nobody sets out to rebuild a two-year-old website.
> **Body:** They rebuild because of one of these. Usually more than one.

| Pain | The line under it |
|---|---|
| **It's slow, and it's costing you** | Every second of load time is customers leaving before they see anything. Most SMB sites we audit fail Core Web Vitals on mobile. |
| **Nobody can update it** | The person who built it is gone, or it needs a developer for a text change. So it doesn't get updated, and it slowly stops being true. |
| **It doesn't fit how you work** | The template had a blog and a portfolio. You needed a quoting tool and a stock check. So your team works around the site instead of in it. |
| **It doesn't talk to anything** | Orders come in on the site and get re-typed into your CRM by hand. The website is an island. |
| **You don't own it** | Built on a platform you rent, with a design file you never got. Leaving means starting over. |
| **It was designed, not built** | Beautiful in Figma, brittle in production. No error states, no empty states, no plan for the 300th product. |

**Layout:** Three-column grid on desktop (2 rows), single column stacked on mobile. Each cell: bold pain, one supporting line. Amber marker on the pain, `--d-text-2` on the line.

**Motion:** `fadeUpGroup` across cells, 60ms stagger, capped at 6 (exactly 6 cells — at the primitive's documented limit, don't add a seventh).

**SEO/GEO:** These are literal search queries in disguise ("website slow", "can't update my website", "website doesn't integrate with CRM"). Real headings, real text.

---

## Section 4 — What we build
`services:cluster-grid` · dark · Tier 3

Same component as Automate §4. Eight services, four clusters.

| Cluster | Headline promise | Sub-items (accordion) |
|---|---|---|
| **Marketing Websites** | The site that has to earn trust in eight seconds | Business websites · Corporate websites · Landing pages |
| **Ecommerce** | A storefront built around how people actually buy from you | Ecommerce development · Catalogue + checkout · Payment and shipping integration |
| **Web Applications** | Software for the work a spreadsheet stopped being able to hold | Web application development · Internal tools + dashboards · Custom software development |
| **Business Systems** | The systems your operation runs on, connected properly | CRM / ERP development · Third-party integrations · Data migration |

Each sub-item expands to a two-line description in place. **Never link to an unbuilt leaf page** — same rule as Automate §4.

**Motion:** `fadeUpGroup` on clusters, `accordionOpen` on sub-items.

**SEO:** Sub-item names are the Phase 2/3 leaf keyword set (`/services/build/website-development`, `/services/build/ecommerce-development`, `/services/build/web-applications`, `/services/build/custom-software` — the four already linked from the footer). Real text here builds the cluster before the leaves exist.

---

## Section 5 — From wireframe to shipped
`buildAssembly:wireframe-to-render` · dark · **Tier 1 signature**

**Purpose:** The page's memorable object, and the answer to "what does 'we build it properly' actually mean?" Automate proves capability by showing a workflow running. Build proves it by showing a thing being made — and specifically by showing that the boring layers (structure, states, integration) are where the work is.

**Content:** A single UI frame that assembles in four passes as you scroll. Not four separate images — one frame, gaining fidelity.

```
Pass 1 — STRUCTURE   grey blocks, real layout, no styling
Pass 2 — DESIGN      type, colour, spacing land; blocks become components
Pass 3 — REAL DATA   lorem → real product names, real prices, a real empty state
Pass 4 — SHIPPED     live chrome: loading state, error state, a 94 Lighthouse badge
```

Each pass carries a mono caption and a one-line explainer that changes with it (`PASS 3 · REAL DATA — the pass most agencies skip`). The captions are the argument; the visual is the evidence.

**Motion:** Full spec in [motion-system.md](../system/motion-system.md) §7.3. Scroll-driven `borderDraw` + staged opacity/transform per layer, ~4 discrete states over ~180vh of pinned scroll — **shorter than Home's 220vh pin**, and inside §4's ≤250vh cap. Progress indicator `01—04`. DOM + CSS, **never canvas**.

**Degradation:** Below 1024px and under reduced motion, all four passes render as a static vertical stack of four labelled frames, all content visible — the same one-honest-fallback pattern as Process and the Workflow Graph. That fallback is the server-rendered default; the scene is dynamically imported, `ssr:false`, IntersectionObserver-gated.

**SEO:** Pass captions and explainers are real indexable text targeting "web development process", "custom website development". Same double-duty as Automate's graph.

---

## Section 6 — Our process
`process:sticky-stack` · **light** · Tier 3

Same five stages, same component as Automate §6, Build-specific deliverables:

> 01 DISCOVER — We learn what the site actually has to do, and for whom.
> 02 STRATEGIZE — Structure, scope, and what we're deliberately not building in v1.
> 03 BUILD — Design and development in visible increments, with weekly demos on real staging.
> 04 LAUNCH — Migration, redirects, analytics, and a launch that doesn't lose your rankings.
> 05 GROW — Measure what's working, then extend it.

**Theme:** first light section. `themeShift` at the boundary.

The `04 LAUNCH` line matters more here than on Automate. "A launch that doesn't lose your rankings" is the specific fear of anyone who has been burned by a redesign, and naming redirects explicitly is the cheapest credibility on the page.

---

## Section 7 — What we build on
`techStack:categorized` · light · Tier 2

**Purpose:** This is the section `automate-spec.md` §"Optional / Phase 2" deferred *off* Automate — "About page or footer. Buyers here care about *their* tools, not ours." On Build that reasoning inverts: a technical buyer commissioning custom software genuinely is evaluating the stack, because they'll inherit it. Same content, right page.

**Content:** Categorized, not a logo soup:

| Category | Items |
|---|---|
| Frontend | Next.js · React · TypeScript · Tailwind |
| Backend | Node · Postgres · Drizzle · Redis |
| Commerce | Shopify · WooCommerce · Stripe · Razorpay |
| Infrastructure | Vercel · Cloudflare · S3 |
| Integration | REST / GraphQL APIs · Webhooks · n8n |

Below: `Not married to any of it. If your team already runs something that works, we build on that instead. →`

That closing line is the whole point of the section — it converts a stack list from a brag into a reassurance.

**Motion:** `fadeUpGroup` per category, `hoverLift` on items. Not a marquee — Integrations on Automate is the marquee; repeating it here would make the two pages feel like the same page.

---

## Section 8 — Selected work
`featuredWork:grid` · light · Tier 3

Grid variant, not Automate's two-up-deep — Build has more shippable examples and they're more visual, so more of them shown shallower is the right trade.

Baladi Food Stuff · Epicerma · BluPebble. Each: client, industry, one line on what it needed, what we built, stack tags, link to the case study.

**Blocked on:** `/case-studies/[slug]` pages don't exist yet (see "Known gaps" below). Until they do, cards link to `/projects` or render without a link — **never to a 404**.

**No fabricated metrics.** Same rule as Home: the `outcome` field is omitted rather than invented for a real, named business.

---

## Section 9 — What it costs
`engagementModel:tier-cards` · light · Tier 3

Same component family as Home §7, `tier-cards` variant (Home uses `phase-timeline`).

| Tier | Fit | Timeline | Starting from |
|---|---|---|---|
| **Landing Page** | One focused page for a single offer, no CMS | 1–2 weeks | ₹25,000 |
| **Marketing Site** ← most common | 5–15 pages, CMS, contact + analytics | 4–6 weeks | ₹1,25,000 |
| **Ecommerce Build** | Catalogue, checkout, payments, shipping | 6–10 weeks | ₹2,50,000 |
| **Custom Application** | Internal tool, dashboard, or CRM/ERP work | 8–16 weeks | ₹4,00,000 |

Four tiers, not three — added Landing Page after the original three-tier version shipped without a floor for the single-page/portfolio work `services:cluster-grid` already lists under "Marketing Websites." Published as "starting from," same reasoning as Home §7: a floor anchors the conversation without reading as a ceiling. Marketing Site carries the "Most common" badge — `tier-cards.tsx`'s `highlighted` flag is set explicitly per tier now, not inferred from the middle array index, since that inference broke the moment a fourth tier was added.

Plus the same four policy notes as Home §7 (scope changes quoted before starting · lateness communicated before the deadline · you own everything · you can walk away with it). Reuse verbatim — consistency across pages is itself a trust signal.

---

## Section 10 — FAQ
`faq:accordion` · dark · Tier 4

Answer-first, 40–60 words before expanding. Emits `FAQPage` schema.

1. How much does a business website cost?
2. How long does a website take to build?
3. Do we own the code and the design files?
4. Can we update the site ourselves without a developer?
5. What happens to our search rankings when we relaunch?
6. Can you work with our existing site instead of rebuilding?
7. Do you do the design, or do we need a separate designer?
8. What if we need changes after launch?
9. Will it work on mobile and pass Core Web Vitals?
10. Can you integrate it with the systems we already use?

Questions 3, 5, and 6 are the highest-value: two are the real objections, one (#6) is the honest answer that wins trust by sometimes saying "you don't need a rebuild."

---

## Section 11 — Closing CTA
`ctaClosing:split-with-form` · dark · Tier 3

> **H2:** Tell us what your site needs to do.
> **Body:** 30 minutes. We'll tell you what it'd take, roughly what it'd cost, and whether a rebuild is actually the right call — sometimes it isn't.
> **Form:** Name · Work email · Company · "What are you trying to build?" · **Book the call**

Then footer.

---

## Motion budget check

Per [motion-system.md](../system/motion-system.md) §2 — 1 signature + 3–4 supporting, hard cap.

| Tier | Section |
|---|---|
| **1 — Signature** | §5 Wireframe-to-render assembly |
| **2 — Supporting** | §2 `counterRoll` · §3 `fadeUpGroup` pain grid · §7 `techStack` categorized reveal |
| 3 — Ambient | §1, §4, §6, §8, §9, §11 |
| 4 — Micro | §10 `accordionOpen`, hovers throughout |

1 + 3. Within budget.

---

## Optional / Phase 2

- **Industries** — belongs on Home + `/industries`. Same reasoning as Automate: on a commercial page it dilutes intent.
- **Agent demo** — the shared component works here but the framing is wrong; the demo asks "what do you do by hand," which is an Automate question. Either write a Build-specific framing or leave it off. Leaving it off is the honest default until someone writes that copy.
- **Products CTA** — add once there's a real product to link.
- **Insights** — add once there are web-development posts worth surfacing.

## Build order

1. Hero, Proof bar, Problem, Clusters, Closing CTA *(shippable page)*
2. Process, Tech stack, FAQ, Engagement model
3. Selected work *(blocked on case-study pages)*
4. **Wireframe-to-render assembly** (Tier 1 — full sprint)

## Open items

- [ ] The four proof-bar numbers, verifiable — especially the `90+` Lighthouse commitment
- [ ] Confirm the three engagement-model ranges are ones we'd actually honour
- [ ] BluPebble: confirm it can be named (Baladi and Epicerma already cleared)
- [ ] FAQ answers written
- [ ] Decide the assembly scene's subject — an ecommerce product page is the recommendation; it's the most recognizable and shows the most states (empty cart, out of stock, loading)
