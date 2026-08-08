# Phase 2 — Plan

**Status:** v1
**Scope decided:** 2026-08-08
**Governs:** every spec listed in §3

Phase 1 shipped six pages that sell. Phase 2 ships the pages that **rank, prove, and complete the site's own structure** — and it retires the link and schema debt Phase 1 deliberately took on by refusing to link to unbuilt pages.

---

## 1. What Phase 2 is, and what changed from SCOPE.md

[SCOPE.md](../Initial/SCOPE.md) defines Phase 2 as *"3–4 leaf service pages chosen by keyword data, Industries hub + 2 industries, 6–8 guides."* That is still the core. Two additions:

**Phase 1's own carryovers come first.** SCOPE.md's Phase 1 line includes *"2 case studies, 1 free tool"* — neither shipped, because both were blocked on content rather than on code. They are Phase 2 work now, and they are the highest-value work in it: `/case-studies` is the only thing on the roadmap that directly addresses having no client logos.

**The structural pages are not optional.** `/services`, and the legal trio, are not growth pages — they are the pages whose absence is currently a defect (§2). Shipping leaves before the hub they belong to would deepen that defect rather than fix it.

**`/projects` moved into Wave 2** (2026-08-08, revised — it was originally deferred to Phase 3). Reasoning in §1a; full spec in [projects-spec.md](projects-spec.md).

**Deferred to Phase 3, deliberately:** `/products` (nothing to list), `/blog` at cadence, and the remaining ~15 service leaves.

---

## 1a. The proof asymmetry, and what it changes

This is the constraint the first draft of this plan under-weighted, and it reshapes three decisions.

**Anvio is positioned around AI and automation. Every piece of shippable proof is web and ecommerce.** Both case studies — Baladi and Epicerma — are UAE storefronts tagged `Web Development, Ecommerce`. [employer-context.md](../private/employer-context.md) names the gap and forbids the obvious patch: the employer's AI platform is *"not yours to showcase"* on any page, in any framing beyond a permission-gated *team experience* sentence on About.

So Phase 2 as first drafted would have shipped **three Automate leaf pages, a hub, and a pillar with nothing demonstrable behind the category the brand is built on** — while Wave 2 delivered proof exclusively for Build.

The same document names the remedy, and [SCOPE.md](../Initial/SCOPE.md)'s locked decisions agree: the agent demo is *"the answer to having no client logos yet,"* and internal builds, clearly labelled, belong on `/projects`. Three changes follow:

1. **`/projects` ships in Wave 2**, not Phase 3 ([projects-spec.md](projects-spec.md)). It is the cheapest page in Phase 2 — `featuredWork:grid` already exists — and the only one that shows AI capability we can point at.
2. **The three Automate leaves carry `agentDemo:full`** ([service-leaf-spec.md](service-leaf-spec.md) §3a). The first draft omitted it to keep conversion attribution clean, which weighed a measurement inconvenience against the page's central weakness.
3. **The leaf split stays 3 Automate / 1 Build.** Rebalancing toward the pillar where the proof happens to sit would mean selling the category we are *not* positioned around. The answer to thin proof is to demonstrate, not to retreat.

**What this does not license:** no invented metrics, no unlabelled internal work, no implying the ecommerce builds were automation projects. [home-spec.md](home-spec.md)'s constraint stands — *"one caught exaggeration costs more than an empty section ever would."*

---

## 2. The debt Phase 2 retires

[docs/README.md](../README.md)'s "Known gaps" section records what Phase 1 unlinked rather than shipped broken. Each item below names the page that closes it.

| Debt | Where it shows | Closed by |
|---|---|---|
| **`/services` 404s while being emitted in `BreadcrumbList` JSON-LD on all three pillar pages** | `services/{build,automate,grow}/page.tsx` each pass `{ name: 'Services', path: '/services' }` to `breadcrumbSchema`, which resolves it to an absolute URL. This is worse than a broken link — it is a broken link *asserted to search engines as site structure* | [services-hub-spec.md](services-hub-spec.md) |
| Home's featured-work cards have no "read the case study" link | `CaseStudyCard.href` optional, omitted | [case-studies-spec.md](case-studies-spec.md) |
| Home's six industry tiles are non-interactive | `IndustryTile.href` optional, omitted | [industries-spec.md](industries-spec.md) |
| Footer has two columns instead of four | No Resources or Legal destinations exist ([design-system.md](../system/design-system.md) §6.6) | [guides-spec.md](guides-spec.md) + [case-studies-spec.md](case-studies-spec.md) + [legal-spec.md](legal-spec.md) |
| Footer carries no leaf links | [seo-strategy.md](../system/seo-strategy.md) §5 wants them sitewide for equity | [service-leaf-spec.md](service-leaf-spec.md) |
| Nav is a single-column dropdown, not the three-column mega-menu | [design-system.md](../system/design-system.md) §6.5 | [services-hub-spec.md](services-hub-spec.md) §6 |
| Home's insights section has nothing to show | Open item: *"Three insight posts, or cut the Home insights section"* | [guides-spec.md](guides-spec.md) |
| Automate/Build/Grow cluster sub-items expand in place instead of linking | *"Never link to an unbuilt page"* ([automate-spec.md](automate-spec.md) §4) | [service-leaf-spec.md](service-leaf-spec.md) — four of them gain `href` |

**The rule stays in force.** Phase 2 does not pre-emptively link to Phase 3 pages. A cluster sub-item gains an `href` on the day its leaf ships, not before.

---

## 3. Page inventory

Fourteen routes, four spec documents plus three shared ones. Class per [ADR-0006](../engineering/adr/0006-content-page-authoring-model.md).

| Route | Class | Spec | Depends on |
|---|---|---|---|
| `/services` | Composed | [services-hub-spec.md](services-hub-spec.md) | `breadcrumb` |
| `/case-studies` | Composed | [case-studies-spec.md](case-studies-spec.md) | content adapter |
| `/case-studies/[slug]` | Hybrid | [case-studies-spec.md](case-studies-spec.md) | `caseStudyBody`, `relatedLinks` |
| `/projects` | Composed | [projects-spec.md](projects-spec.md) | `CaseStudyCard.kind` |
| `/tools/automation-roi-calculator` | Composed | [tools-spec.md](tools-spec.md) | — |
| `/services/automate/whatsapp-automation` | Hybrid | [service-leaf-spec.md](service-leaf-spec.md) | content adapter, `richText:mdx` |
| `/services/automate/ai-chatbot-development` | Hybrid | [service-leaf-spec.md](service-leaf-spec.md) | as above |
| `/services/automate/ai-agent-development` | Hybrid | [service-leaf-spec.md](service-leaf-spec.md) | as above |
| `/services/build/website-development` | Hybrid | [service-leaf-spec.md](service-leaf-spec.md) | as above |
| `/industries` | Composed | [industries-spec.md](industries-spec.md) | — |
| `/industries/[slug]` × 2 | Hybrid | [industries-spec.md](industries-spec.md) | content adapter |
| `/guides` | Composed | [guides-spec.md](guides-spec.md) | `insights` |
| `/guides/[slug]` × 6–8 | Article | [guides-spec.md](guides-spec.md) | `tableOfContents`, `authorBio` |
| `/privacy` · `/terms` · `/cookies` | Composed | [legal-spec.md](legal-spec.md) | — |

**Shared prerequisites:** [content-layer.md](../engineering/content-layer.md) (the adapter + seven section types), [ADR-0006](../engineering/adr/0006-content-page-authoring-model.md) (authoring model).

### Route shape

Leaves use **literal directories** — `services/automate/whatsapp-automation/page.tsx` — not the `[pillar]/[service]` dynamic segments sketched in [repo-structure.md](../engineering/repo-structure.md) §2. Phase 1 already built the pillars as literal folders, a dynamic `[pillar]` would have to reproduce three bespoke 400-line section arrays through one component, and four leaves is not enough volume to earn that. Each leaf route is ~15 lines: read the MDX entry, map frontmatter onto the shared frame.

Revisit at roughly eight leaves. That is when the literal-route duplication starts costing more than the indirection would.

---

## 4. Motion — Phase 2 carries no signature scene

**No Phase 2 page gets a Tier 1 piece.** This is a decision, not an omission, and it follows the same logic [motion-system.md](../system/motion-system.md) §8 already applies to About and Contact.

§2 of that document assigns the four Tier 1 scenes to the four pages that have to sell: Home, Automate, Build, Grow. Phase 2 pages have a different job. A leaf page's job is to answer one question thoroughly enough to rank and be cited; a case study's job is proof; a guide's job is extractability. A scroll-pinned scene on any of them spends the page's JS budget on the thing least connected to why the page exists — and on a content page, that budget is what protects the Core Web Vitals that [grow-spec.md](grow-spec.md) publicly claims.

There is a second reason. The four signature scenes are the site's differentiators precisely because there are four of them. A fifth on `/industries/healthcare` devalues the other four.

**What Phase 2 pages get instead:**

| Tier | Allowance | Notes |
|---|---|---|
| Tier 1 | **0** | Enforced by the same review checklist ([motion-system.md](../system/motion-system.md) §9) |
| Tier 2 | **≤ 2 per page**, and most pages use 0–1 | Only where it explains something: `counterRoll` on real case-study metrics, `workflowGraph:compact` on the two agent/automation leaves, the ROI calculator's outputs |
| Tier 3 / 4 | Default | `fadeUpGroup`, `hoverLift`, `accordionOpen`, `arrowSlide` |

The one place a Phase 2 page reuses signature machinery is `workflowGraph:compact` on the Automate leaves — and that is reuse of an already-built scene at reduced scope, not a new one. Full map in [motion-system.md](../system/motion-system.md) §8a.

---

## 5. Build sequence

Five waves. Each wave is independently shippable, and each unblocks a documented defect from §2.

**Wave 0 — Content layer.** [content-layer.md](../engineering/content-layer.md) §5, steps 1–4. No pages. Nothing else in Phase 2 can start.

**Wave 1 — Structure.** `/services` hub, the three legal pages, the footer's four columns, the nav mega-menu. All composed pages, no content dependency beyond `breadcrumb`. This wave fixes the JSON-LD defect and is the cheapest wave by a wide margin — ship it first for that reason alone.

**Wave 2 — Proof.** `/case-studies` + `/case-studies/[slug]`, two entries, **and `/projects`**. The case studies are **blocked on content and permission, not on code** — see the Stratseek agreement item in §7; build to the point where adding an MDX file publishes one, then wait. **`/projects` is only partly blocked by the same gate**: its two internal items (the agent demo, the ROI calculator, plus the site's own CWV numbers) need no permission at all, so a reduced version ships regardless. Given §1a, that reduced version is the more urgent half of this wave.

**Wave 3 — Commercial depth.** The four service leaves. Highest SEO value in Phase 2, and the wave that turns the pillar pages' cluster sub-items into real internal links.

**Wave 4 — Reach.** `/industries` + two industry pages, `/tools/automation-roi-calculator`.

**Wave 5 — Authority.** `/guides` + 6–8 guides, which also seeds Home's insights section.

Waves 3–5 can reorder if keyword data (§6) says so. Waves 0 and 1 cannot move.

### 5a. The floor — what "Phase 2 shipped" actually means

**Phase 2 as fully specced is roughly 20,000 words of expert writing**: eight guides at 1,800, four leaves at 800, two industry bodies at 800, two case studies, the legal trio, and the hub copy. [ADR-0003](../engineering/adr/0003-section-registry-composition.md) describes this operation as *"a team of one"* — and that person has a day job ([employer-context.md](../private/employer-context.md)).

A plan that only succeeds at 100% completion is a plan that fails. So the scope is split explicitly.

**The floor — this is Phase 2. Ship all of it or the phase isn't done.**

| | Why it's non-negotiable |
|---|---|
| **Wave 0** in full | Nothing else exists without it |
| **Wave 1** in full | Cheap, unblocks the footer and nav, retires the JSON-LD defect (§2) |
| **`/projects`**, at least the internal items | §1a — the only AI/automation proof on the site |
| **2 service leaves** — `whatsapp-automation` and `ai-chatbot-development` | The two highest-intent Automate terms, and the two the guides support |
| **4 guides** — `ai-agent-vs-chatbot`, `whatsapp-business-api-cost-and-limits`, `which-processes-are-worth-automating`, `geo-vs-seo-getting-cited-by-ai` | The first two unblock the leaves' intent boundary; the last two are the ones nobody else can write the way we can |
| **`/case-studies`** if and only if the Stratseek gate clears | Otherwise the route stays unpublished — not shipped empty |

Roughly 10,000 words. Still a lot. It is a coherent site.

**Above the floor — real, planned, optional-if-capacity.** Everything is specced and none of it is committed: the third and fourth leaves, `/industries` and its two pages, `/tools/automation-roi-calculator`, and guides five through eight. Take them in that order; each is independently shippable and none blocks another.

**Two rules that make the split work:**

1. **Never publish an index below its threshold.** `/guides` waits for four entries, `/case-studies` for one, `/industries` ships hub-only if the leaf bodies slip ([industries-spec.md](industries-spec.md)). A thin index is a worse signal than a missing page and it gets indexed.
2. **Cut entries, never the substance floor.** Six good guides beat eight padded ones; [seo-strategy.md](../system/seo-strategy.md) §1 is explicit that thin pages suppress the whole domain. The number of pages is the variable. The 800/1,800-word floors are not.

---

## 6. The keyword-data caveat

[seo-strategy.md](../system/seo-strategy.md) §3 says *"Do the research before Phase 2"* and that its own numbers are *"illustrative structure, not verified volumes."* That research has not happened.

**The four leaf slugs in [service-leaf-spec.md](service-leaf-spec.md) are provisional.** They were chosen on reasoning — concentrate on the pillar that carries the live demo and the signature scene, target the India-SMB long tail, prefer queries where we can write credibly — not on data. A leaf's URL is set once ([seo-strategy.md](../system/seo-strategy.md) §2); renaming costs a redirect and a ranking dip.

**Therefore:** validate the four slugs in Ahrefs/Semrush and Search Console **before Wave 3 starts**, not before Phase 2 starts. Waves 0–2 are unaffected by keyword data, so the research is not on the critical path — but it is a hard gate on Wave 3. If the data contradicts the reasoning, change the slugs; the spec's structure holds regardless of which four leaves it describes.

---

## 7. Blocking open items

Carried from [docs/README.md](../README.md) and each page spec. The first two block a whole wave.

- [ ] **Read the Stratseek agreement** for client-naming and attribution clauses — blocks Wave 2 entirely. `attribution: 'partner-agency'` exists in the schema so the honest framing is structural, but it does not answer whether the client can be named at all.
- [ ] **Keyword validation for the four leaf slugs** — hard gate on Wave 3 (§6).
- [ ] Legal review of the privacy policy's data-handling claims, which must match what the contact form and the agent demo actually do — see [legal-spec.md](legal-spec.md) §2. This is the one Phase 2 page where being approximately right is not acceptable.
- [ ] Founder name/photo decision — blocks `authorBio` on guides, same item that blocks About §4.
- [ ] Choose the MDX loader ([content-layer.md](../engineering/content-layer.md) §6) — blocks Wave 0 step 2.
- [ ] Decide who monitors `hello@anvio.online` before Wave 4 adds a second lead-capturing surface (`/tools`). A second form pointing at an unmonitored inbox doubles a known problem.
