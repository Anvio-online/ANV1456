# Projects — Page Spec

**URL:** `/projects`
**Class:** Composed ([ADR-0006](../engineering/adr/0006-content-page-authoring-model.md))
**Wave:** 2, alongside `/case-studies` ([phase-2-plan.md](phase-2-plan.md) §5)
**Moved from Phase 3 on 2026-08-08** — see below.

---

## Why this moved into Phase 2

The original plan deferred `/projects` on the grounds that a gallery needs volume we don't have. That reasoning was about the wrong axis.

Anvio is positioned around AI and automation. Both shippable case studies — Baladi and Epicerma — are UAE ecommerce builds tagged `Web Development, Ecommerce`. They are **Build** proof. [employer-context.md](../private/employer-context.md) states the consequence directly: *"Anvio has web work to show but no AI/automation proof — which is the category it's positioned around,"* and it names the remedy — *"personal projects can also be shown, clearly labelled as such, on `/projects`."*

So Phase 2 without `/projects` ships three Automate leaf pages, a pillar page, and a hub with **nothing demonstrable behind the category the whole brand is built on.** That is the gap this page closes, and it is why it is now Wave 2 rather than Phase 3.

It is also the cheapest page in Phase 2: `featuredWork:grid` already exists, and the content is work that is already built.

**This page is not a case-study overflow.** [Information_arch.md](../Initial/Information_arch.md) separates them deliberately — a case study is a client's problem told in full; a project is *"a quick overview, screenshots, technologies."* Keep that line. If an item deserves a narrative, it belongs in `/case-studies`.

---

## The honesty rule, and how it's enforced

Every item declares what it is. **An internal build labelled as an internal build is an asset; the same build left ambiguous is the exaggeration [home-spec.md](home-spec.md) says costs more than an empty section ever would.**

`CaseStudyCard` gains a required `kind: 'client' | 'internal' | 'partner-agency'`, and the card renders the label from that field — the same structural approach `attribution` already uses on case studies, for the same reason: a hardcoded string can be dropped in a later edit, a required field can't.

| `kind` | Card label |
|---|---|
| `client` | *(none — the client name carries it)* |
| `partner-agency` | "Delivered via partner agency" |
| `internal` | **"Internal build"** |

No item may be listed without a `kind`. This is the one thing on the page that must not be left to editorial care.

---

## Sections

| # | Section | Theme | Tier | Notes |
|---|---|---|---|---|
| 1 | `breadcrumb:inline` | dark | 0 | `Home / Projects` |
| 2 | `hero:page-lead` | dark | 3 | |
| 3 | `featuredWork:grid` | dark | 3 | The gallery. `kind` label per card |
| 4 | `richText:prose` | light | 3 | What's ours, what's a client's, what's still running |
| 5 | `ctaClosing:centered-bold` | dark | 3 | |

**Title:** `Projects: What We've Built | Anvio` (34 chars)
**Description:** `Client work and internal builds — the AI agent behind our demo, the tools on this site, and ecommerce storefronts shipped for businesses in the UAE.` (147 chars)
**Schema:** `BreadcrumbList` + `CollectionPage`.

### Section 2 — Hero

> **Eyebrow:** PROJECTS
> **H1:** Things we've built, including the ones on this page.
> **Sub:** Client work where we can show it, and our own builds where we can't. Both are labelled, so you can weigh them differently.

**The sub is doing the honest work.** A visitor who discovers the labelling themselves reads it as a caveat; one who is told upfront reads it as candour. Same facts, opposite effect.

### Section 3 — The gallery

Six items at launch, each with: name · `kind` label · one-line problem · what it does · stack · a link where one exists.

| Item | `kind` | Why it's here |
|---|---|---|
| **The Anvio agent demo** | internal | The strongest AI artifact we own. Two-stage architecture, schema-constrained output, server-enforced email gate, graceful degradation. Links to `/services/automate#agent-demo` — it's live on the site, which is the whole point |
| **Automation ROI calculator** | internal | Links to `/tools/automation-roi-calculator` ([tools-spec.md](tools-spec.md)) |
| **anvio.online itself** | internal | **With its real Lighthouse and Core Web Vitals numbers.** A site that sells performance optimization and publishes its own scores is a verifiable claim, not a promise |
| **Baladi Food Stuff** | client | UAE · FMCG distribution · ecommerce. **Corrected 2026-08-10** — see below |
| **Epicerma** | client | UAE · skincare retail · ecommerce. **Corrected 2026-08-10** |
| **StableGuard.AI** | internal | Multi-agent stablecoin monitoring. 3rd prize, ETHOnline 2025 (best use of ASI Alliance / Fetch.ai). **The strongest AI proof on the site** — the only artifact with an external, competitive result behind it rather than our own description |
| **One further internal build** | internal | Open item — see below |

**The third item is the one to get right.** [grow-spec.md](grow-spec.md) already claims CWV expertise, and [docs/README.md](../README.md) already carries *"anvio.online's own Lighthouse/CWV scores must clear 90+ before grow-spec.md ships, since that page claims it"* as an open item. Publishing the numbers here converts that obligation into an asset — and makes it permanently visible if it ever regresses, which is the correct incentive for a site that sells this.

**Motion:** `fadeUpGroup`, `hoverLift`. No `counterRoll` — the CWV numbers are facts on a card, and animating them would be the theatre this site's own specs keep rejecting.

### Section 4 — What you're looking at

> **H2:** How to read this page.
> **Body:** Two of these were built for clients through a partner agency, and they're labelled that way. The rest we built for ourselves — the agent that runs the demo on this site, the calculator, and the site itself. We've listed them because the category we're positioned around is AI and automation, and our client work so far is web and ecommerce. Rather than imply otherwise, here's exactly what we've built and who for.
>
> Client AI and automation work is under NDA or not yet finished. When it can be shown, it'll be in [case studies](/case-studies), told properly.

**Say the gap out loud.** A visitor evaluating an AI agency will notice that the case studies are ecommerce builds. Naming it first is the difference between a candid page and a caught one — the same move [case-studies-spec.md](case-studies-spec.md) makes about having two entries and [industries-spec.md](industries-spec.md) makes about having two industry pages.

### Section 5 — Closing CTA

> **H2:** Want the automation version of this list?
> **Body:** It's being written. In the meantime the agent demo will build you a plan in about two minutes, which is a more useful thing to look at than someone else's project anyway.

Links to `/services/automate#agent-demo`, not `/contact`. This page's visitor is evaluating capability, and the demo is the capability.

---

## Internal linking

- `/case-studies` ↔ `/projects` cross-link, each explaining what the other is for
- Home's `featuredWork` section gains a "See all projects" link once this exists
- `/services/automate` and the three Automate leaves link here — **this is the point of the page**: it gives the Automate side something to point at ([service-leaf-spec.md](service-leaf-spec.md))
- Footer **Company** column gains `Projects`

## Motion budget check

**0 Tier 1, 0 Tier 2.** A gallery of cards.

## Deliberate omissions

- **No case-study narratives.** That's `/case-studies`. The separation is [Information_arch.md](../Initial/Information_arch.md)'s and it's correct.
- **No filtering or tag UI.** Six items.
- **No screenshots at launch** unless they're real. A mockup of a project is a fabricated screenshot, whatever the intent.
- **No GeniusCFO.** [employer-context.md](../private/employer-context.md) — it is the employer's production work and it is not Anvio's to show, on this page or any other. The permitted framing is a *team experience* sentence on About, and only with written permission.

## Build order

1. `CaseStudyCard` gains the required `kind` field + label rendering
2. The page — all existing components
3. Measure and publish anvio.online's real CWV numbers
4. Cross-links, footer Company column, `sitemap.ts`

## Open items

- [ ] **Decide the sixth item**, or ship with five. Five real projects beat six with a filler.
- [ ] Run Lighthouse/CWV against production and publish the actual numbers. If they don't clear 90+, that blocks [grow-spec.md](grow-spec.md) anyway — this page just makes it visible sooner
- [ ] **Ask Baladi and Epicerma directly for permission to name them.** Not a Stratseek question — see the correction below. A short email to each, not a contract review
- [ ] BluPebble stays behind the Stratseek gate — that one *was* delivered through the agency

### Correction, 2026-08-10 — Baladi and Epicerma were never agency work

This spec, [case-studies-spec.md](case-studies-spec.md), and [phase-2-plan.md](phase-2-plan.md) §1a all assumed Baladi and Epicerma came through Stratseek and were therefore blocked by the unread agency agreement. **They didn't. They were direct freelance clients** — confirmed by the person who did the work, and consistent with the public portfolio at ag.anvio.online, which describes that engagement as *"Delivered commercial sites solo for Dubai-based clients… Owned the full engagement from scope through launch and handover"* and names no agency.

**What this changes:** the Stratseek agreement never blocked these two. Permission to name them is a direct conversation with each client — an email, not a contract review. It still needs asking (naming a client publicly without their say-so is a bad habit regardless of who holds the contract), but the blocker is hours, not weeks.

**What it doesn't change:** the `partner-agency` value stays in the schema and is still correct — BluPebble genuinely did come through Stratseek, so the field has a real user and the honest-framing mechanism still earns its place.

**Worth noting how this was missed:** it was written down as an assumption early, then cited as established fact by three later documents, and nothing in a build or a test could have caught it. The only thing that surfaced it was asking the person who did the work.
- [ ] Decide whether the agent demo card links to the live demo or to a short write-up of how it's built. The write-up is the stronger engineering signal; the live demo is the stronger conversion
