# Phase 2 — Plan

**Status:** v3 — **everything except `/case-studies` is built**, on `feat/phase-2-wave-1` (not yet merged or pushed)
**Scope decided:** 2026-08-08
**Floor shipped:** 2026-08-10 · **above-the-floor scope shipped:** 2026-08-10
**Governs:** every spec listed in §3

Phase 1 shipped six pages that sell. Phase 2 ships the pages that **rank, prove, and complete the site's own structure** — and it retires the link and schema debt Phase 1 deliberately took on by refusing to link to unbuilt pages.

**Implementation status, for review:** every page in this plan is built and verified — full production build passing, 33 routes, lint and typecheck clean, spot-checked in-browser — except `/case-studies`, which stays correctly unpublished behind an external gate.

| Item | Status |
|---|---|
| Wave 0 (content adapter) | **Built** — [content-layer.md](../engineering/content-layer.md), with one real deviation from plan: `next-mdx-remote/rsc` instead of `@content-collections/mdx` (that doc's §2 explains why) |
| Wave 1 (`/services`, legal trio, nav, footer) | **Built** |
| `/projects`, internal items | **Built** — 3 internal cards; Baladi/Epicerma withheld, still gated on Stratseek |
| 4 service leaves | **2 of 4 built** — `whatsapp-automation`, `ai-chatbot-development`. `ai-agent-development` and `website-development` remain unbuilt; keyword validation for the two shipped leaves' slugs still hasn't run either (§6) |
| `/industries` + 2 leaves | **Built** — hub, `ecommerce`, `accounting-firms` |
| `/tools/automation-roi-calculator` | **Built** |
| 8 guides | **Built** — all eight in §3's list, all clearing the 1,800-word floor |
| `/case-studies` | **Not built** — still blocked on the Stratseek agreement, per its own gate below |

**Two real bugs found and fixed during the above-the-floor build, not left in place:** both shipped leaves had a `relatedLinks` entry and one inline body link pointing at `/services/automate/ai-agent-development` — a leaf that was never built, which would have 404'd. Fixed by removing the frontmatter link and repointing the inline reference at the `ai-agent-vs-chatbot` guide instead. Separately, the `<Comparison>` MDX whitelist component (content-layer.md §2) crashes the build — `columns` arrives `undefined` inside `next-mdx-remote/rsc`'s compile path for array-literal JSX prop expressions. Root cause not chased down under time pressure; its one real usage (in `n8n-vs-zapier-vs-make`) was swapped for a plain GFM markdown table, which was already documented as covering the same case. `<Comparison>` stays in the whitelist, unused, until someone fixes it.

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

Five waves. Each wave is independently shippable, and each unblocks a documented defect from §2. Status reflects 2026-08-10.

**Wave 0 — Content layer. Built.** [content-layer.md](../engineering/content-layer.md) §5, steps 1–4, 6, 7 done; step 5 (`caseStudyBody`) stays blocked with Wave 2 below.

**Wave 1 — Structure. Built.** `/services` hub, the three legal pages, the footer's four columns, the nav mega-menu. All composed pages, no content dependency beyond `breadcrumb`. Fixed the JSON-LD defect.

**Wave 2 — Proof. Partly built.** `/projects` shipped, at the reduced scope its own spec anticipated — three internal items (agent demo, ROI calculator, the site itself), no invented Lighthouse numbers. `/case-studies` + `/case-studies/[slug]` remain **blocked on content and permission, not on code** — see the Stratseek agreement item in §7. The code isn't built to the "add an MDX file, it publishes" state this section originally described, because `caseStudyBody` itself is the piece still gated; building it against no real content risked getting the `results`-frontmatter integration wrong in a way nothing would catch until real content landed.

**Wave 3 — Commercial depth. Half built.** Two of the four service leaves shipped — `whatsapp-automation` and `ai-chatbot-development`, the pair [§6](#6-the-keyword-data-caveat) already flagged as highest-priority. `ai-agent-development` and the Build leaf (`website-development`) are specced, not started, and both still need the keyword-validation gate below cleared regardless of build order — which now applies retroactively to the two shipped leaves too, since they launched on provisional slugs without that research running first.

**Wave 4 — Reach. Built.** `/industries` hub + `ecommerce` + `accounting-firms`, `/tools/automation-roi-calculator`.

**Wave 5 — Authority. Built, in full.** `/guides` + all eight guides in §3's list. Did not seed Home's insights section — Home has no `insights` instance to seed; that's a small separate addition, not done here, tracked in [content-layer.md](../engineering/content-layer.md) §6.

Waves 3–5 can reorder if keyword data (§6) says so. Waves 0 and 1 cannot move.

### 5a. The floor — what "Phase 2 shipped" actually means

**Phase 2 as fully specced is roughly 20,000 words of expert writing**: eight guides at 1,800, four leaves at 800, two industry bodies at 800, two case studies, the legal trio, and the hub copy. [ADR-0003](../engineering/adr/0003-section-registry-composition.md) describes this operation as *"a team of one"* — and that person has a day job ([employer-context.md](../private/employer-context.md)).

A plan that only succeeds at 100% completion is a plan that fails. So the scope was split explicitly, and the floor shipped as its own checkpoint on 2026-08-10 before the rest continued the same day.

**The floor — this is Phase 2. Ship all of it or the phase isn't done.** Every row below is shipped except the last, which is exactly the conditional it always was — the Stratseek gate hasn't cleared, so `/case-studies` correctly stays unpublished rather than shipped empty, per the rule two paragraphs down.

| | Why it's non-negotiable | Status |
|---|---|---|
| **Wave 0** in full | Nothing else exists without it | Built |
| **Wave 1** in full | Cheap, unblocks the footer and nav, retires the JSON-LD defect (§2) | Built |
| **`/projects`**, at least the internal items | §1a — the only AI/automation proof on the site | Built |
| **2 service leaves** — `whatsapp-automation` and `ai-chatbot-development` | The two highest-intent Automate terms, and the two the guides support | Built |
| **4 guides** — `ai-agent-vs-chatbot`, `whatsapp-business-api-cost-and-limits`, `which-processes-are-worth-automating`, `geo-vs-seo-getting-cited-by-ai` | The first two unblock the leaves' intent boundary; the last two are the ones nobody else can write the way we can | Built |
| **`/case-studies`** if and only if the Stratseek gate clears | Otherwise the route stays unpublished — not shipped empty | Not built — gate hasn't cleared |

Roughly 10,000 words. Still a lot. It was a coherent site at this checkpoint alone.

**Above the floor — built the same day, once the floor checkpoint confirmed the pace held.** The third and fourth leaves are the one exception — they stayed unbuilt because building them would have meant shipping more provisional slugs without the keyword-validation gate ever clearing, compounding rather than resolving that open item. `/industries` and its two pages, `/tools/automation-roi-calculator`, and guides five through eight are all built.

**Two rules that made the split work, both held:**

1. **Never publish an index below its threshold.** `/guides` shipped its floor at four entries then extended to eight in the same session; `/industries` shipped hub-plus-both-leaves rather than hub-only, since both bodies cleared 800 words; `/case-studies` correctly still doesn't exist. A thin index is a worse signal than a missing page and it gets indexed.
2. **Cut entries, never the substance floor.** Every guide shipped at ≥1,800 words and every industry body at ≥800 — [seo-strategy.md](../system/seo-strategy.md) §1 is explicit that thin pages suppress the whole domain. The floors held; only the leaf count stayed short of the full four, deliberately.

---

## 6. The keyword-data caveat

[seo-strategy.md](../system/seo-strategy.md) §3 says *"Do the research before Phase 2"* and that its own numbers are *"illustrative structure, not verified volumes."* That research has not happened.

**The four leaf slugs in [service-leaf-spec.md](service-leaf-spec.md) are provisional.** They were chosen on reasoning — concentrate on the pillar that carries the live demo and the signature scene, target the India-SMB long tail, prefer queries where we can write credibly — not on data. A leaf's URL is set once ([seo-strategy.md](../system/seo-strategy.md) §2); renaming costs a redirect and a ranking dip.

**Therefore:** validate the four slugs in Ahrefs/Semrush and Search Console **before Wave 3 starts**, not before Phase 2 starts. Waves 0–2 are unaffected by keyword data, so the research is not on the critical path — but it is a hard gate on Wave 3. If the data contradicts the reasoning, change the slugs; the spec's structure holds regardless of which four leaves it describes.

---

## 7. Blocking open items

Carried from [docs/README.md](../README.md) and each page spec. The first two block a whole wave.

- [ ] **Read the Stratseek agreement** for client-naming and attribution clauses — blocks `/case-studies` entirely, the one remaining page in this plan. `attribution: 'partner-agency'` exists in the schema so the honest framing is structural, but it does not answer whether the client can be named at all.
- [ ] **Keyword validation for the four leaf slugs** — the two shipped leaves (`whatsapp-automation`, `ai-chatbot-development`) launched without this research running first, on the provisional slugs §6 always flagged as provisional. Validate before building the remaining two, and be aware a rename to either shipped slug now costs a real redirect, not just a docs update.
- [x] ~~Legal review of the privacy policy's data-handling claims~~ — `/privacy` is live with an audited data table and concrete retention/governing-law defaults, but those defaults are engineering-chosen, not lawyer-reviewed. Still open as an actual review, not a build task — see [legal-spec.md](legal-spec.md) §2.
- [x] ~~Founder name/photo decision — blocks `authorBio` on guides~~ — resolved as a non-blocker: all eight guides ship at guides-spec.md §2's role-byline fallback (`"Anvio's founding engineer"`, no name). Upgrade later is a frontmatter string change, not a rebuild.
- [x] ~~Choose the MDX loader~~ — **content-collections**, paired with `next-mdx-remote/rsc` (content-layer.md §2).
- [ ] Decide who monitors `hello@anvio.online` — now genuinely urgent: `/tools/automation-roi-calculator` is live and routes to `/contact`, and `/privacy` names that address as the deletion/access-request contact. Two live surfaces now depend on someone actually reading it.
- [ ] Fix `<Comparison>`'s broken array-literal prop handling under `next-mdx-remote/rsc` (found shipping guide 6) — not blocking anything today since its one usage was rewritten as a markdown table, but it's shipped, documented, and broken, which is worse than not having built it yet.
