# Anvio — Documentation

Everything that isn't code. Start here.

---

## Reading order

**New to the project?** Read in this order — each builds on the last.

1. [Initial/Brand_strategy.md](Initial/Brand_strategy.md) — who we serve, what we sell, what we refuse to be
2. [Initial/Information_arch.md](Initial/Information_arch.md) — the sitemap and URL structure
3. [system/design-system.md](system/design-system.md) — colour, type, space, components
4. [system/section-library.md](system/section-library.md) — how pages are assembled
5. [engineering/repo-structure.md](engineering/repo-structure.md) — where everything lives

**About to write code?** [engineering/conventions.md](engineering/conventions.md) and [engineering/workflow.md](engineering/workflow.md), then the spec for the page you're building.

---

## Index

### `Initial/` — strategy and original planning

| Document                                                                                                                                                   | Contents                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [Brand_strategy.md](Initial/Brand_strategy.md)                                                                                                             | Target audience, problems solved, positioning, what we won't be  |
| [Information_arch.md](Initial/Information_arch.md)                                                                                                         | Sitemap, URL structure, footer, Build/Automate/Grow rationale    |
| [SCOPE.md](Initial/SCOPE.md)                                                                                                                               | Progress tracker, locked decisions, phasing                      |
| [design_direction.md](Initial/design_direction.md)                                                                                                         | Original design intent — superseded by `system/design-system.md` |
| [design_reference.md](Initial/design_reference.md)                                                                                                         | Framer template references                                       |
| [home_wireframe.md](Initial/home_wireframe.md) · [automate_wireframe.md](Initial/automate_wireframe.md) · [build_wireframe.md](Initial/build_wireframe.md) | Original section sketches — superseded by `specs/`               |

### `system/` — the design and content systems

| Document                                        | Contents                                                                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [design-system.md](system/design-system.md)     | Tokens, verified contrast ratios, type scale, spacing, components, responsive, a11y floor |
| [motion-system.md](system/motion-system.md)     | Motion tiers and budget, primitive library, reduced-motion, **performance contract**      |
| [section-library.md](system/section-library.md) | The 24 section types, page compositions, agent-demo build notes                           |
| [seo-strategy.md](system/seo-strategy.md)       | URL architecture, keyword map, on-page standards, internal linking, schema, GEO           |

### `specs/` — page specifications

Every spec follows the same structure: section by section with copy, layout, motion tier, and SEO role, then a motion-budget check, deliberate omissions, build order, and open items.

| Document                                   | Page                 | Tier 1 signature scene       | Status |
| ------------------------------------------ | -------------------- | ---------------------------- | ------ |
| [home-spec.md](specs/home-spec.md)         | `/`                  | Process — horizontal pin     | Built  |
| [automate-spec.md](specs/automate-spec.md) | `/services/automate` | Live workflow graph          | Built  |
| [build-spec.md](specs/build-spec.md)       | `/services/build`    | Wireframe-to-render assembly | Built  |
| [grow-spec.md](specs/grow-spec.md)         | `/services/grow`     | Metrics dashboard evolve     | Built  |
| [about-spec.md](specs/about-spec.md)       | `/about`             | _(none — deliberate)_        | Built  |
| [contact-spec.md](specs/contact-spec.md)   | `/contact`           | _(none — deliberate)_        | Built  |

Those six are Phase 1 in full ([SCOPE.md](Initial/SCOPE.md) · [seo-strategy.md](system/seo-strategy.md) §3), minus the 2 case studies and 1 free tool — both of which carry into Phase 2.

#### Phase 2 — planned 2026-08-08, nothing built

Start with **[phase-2-plan.md](specs/phase-2-plan.md)**: scope, the fourteen routes, the dependency graph, the five build waves, and the link/schema debt each one retires. The specs below are its children and assume you've read it.

| Document                                           | Pages                                                                    | Wave | Blocked on                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------ | ---- | ---------------------------------------------- |
| [phase-2-plan.md](specs/phase-2-plan.md)           | _the umbrella_                                                           | —    | —                                              |
| [services-hub-spec.md](specs/services-hub-spec.md) | `/services` + the nav mega-menu and footer columns                       | 1    | —                                              |
| [legal-spec.md](specs/legal-spec.md)               | `/privacy` · `/terms` · `/cookies`                                       | 1    | Legal review; the GA4 decision                 |
| [case-studies-spec.md](specs/case-studies-spec.md) | `/case-studies` + `/case-studies/[slug]`                                 | 2    | **The Stratseek agreement**                    |
| [projects-spec.md](specs/projects-spec.md)         | `/projects` — client work **and labelled internal builds**               | 2    | Partly — the internal items aren't             |
| [service-leaf-spec.md](specs/service-leaf-spec.md) | 4 leaves — 3 Automate, 1 Build                                           | 3    | **Keyword validation** (slugs are provisional) |
| [industries-spec.md](specs/industries-spec.md)     | `/industries` + `/industries/ecommerce` + `/industries/accounting-firms` | 4    | Two bodies at ≥800 words                       |
| [tools-spec.md](specs/tools-spec.md)               | `/tools/automation-roi-calculator`                                       | 4    | —                                              |
| [guides-spec.md](specs/guides-spec.md)             | `/guides` + 6–8 guides                                                   | 5    | 1,800 words each                               |

**Every one of them is gated on Wave 0** — the content adapter and six unbuilt section types, specified in [content-layer.md](engineering/content-layer.md). Authoring model: [ADR-0006](engineering/adr/0006-content-page-authoring-model.md).

**No Phase 2 page carries a Tier 1 signature scene.** Deliberate — [phase-2-plan.md](specs/phase-2-plan.md) §4, mapped in [motion-system.md](system/motion-system.md) §8a.

**Phase 2 has a stated floor, and it is smaller than the full spec set.** [phase-2-plan.md](specs/phase-2-plan.md) §5a — Waves 0 and 1 in full, `/projects`, two leaves, four guides. Everything else is specced but explicitly optional-if-capacity. Roughly 10,000 words rather than 20,000, for one person with a day job.

**The proof asymmetry drives three of the plan's decisions.** Both case studies are Build work while the brand is positioned on Automate — [phase-2-plan.md](specs/phase-2-plan.md) §1a explains why `/projects` moved out of Phase 3, why the Automate leaves carry the agent demo, and why the leaf split stays 3 Automate / 1 Build anyway.

Phase 3 pages (`/products`, `/blog` at cadence, the remaining ~15 service leaves) have no spec yet.

### `engineering/` — how the code works

| Document                                           | Contents                                                                                            |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [tech-stack.md](engineering/tech-stack.md)         | Every technology choice and its reason; the agent-demo architecture and guardrails                  |
| [repo-structure.md](engineering/repo-structure.md) | Directory tree, what each holds, naming, where a new thing goes                                     |
| [content-layer.md](engineering/content-layer.md)   | **Phase 2 critical path** — the content adapter, frontmatter schemas, the six unbuilt section types |
| [conventions.md](engineering/conventions.md)       | TypeScript, React, styling, motion, SEO, a11y, naming, definition of done, review                   |
| [workflow.md](engineering/workflow.md)             | Git, commits, PRs, CHANGELOG, ADRs, environments, releases, rollback                                |
| [adr/](engineering/adr/)                           | Architecture Decision Records — why things are the way they are                                     |

---

## Rules for these docs

**One source of truth per fact.** A colour lives in `design-system.md` and nowhere else; a motion budget in `motion-system.md` and nowhere else. Other documents link to it. If you find a value duplicated, delete one and link.

**Decisions go in ADRs, not in prose here.** If you change an architectural choice, write [an ADR](engineering/adr/) — don't quietly edit the document that describes the old choice. ADRs are immutable; superseding one is how a decision changes.

**Update docs in the same PR as the code.** A doc updated later is a doc that was wrong in between, and nobody knows which parts.

**Superseded documents stay.** `Initial/` holds the original thinking. It's marked superseded where it is, but it isn't deleted — the record of how the project got here is worth keeping.

---

## Known gaps between the docs and the shipped code

Found by auditing every internal link in the built site against what actually resolves. These aren't spec decisions — they're drift.

**1. Resolved — no internal link 404s.** All six Phase 1 pages (`/`, `/about`, `/contact`, `/services/build`, `/services/automate`, `/services/grow`) are built, and `nav.tsx`, `footer.tsx`, and `sitemap.ts` were re-pointed at only routes that actually resolve. Two categories of link were previously pointed at unbuilt Phase 2/3 pages and now render as non-interactive content instead, per **"Never link to an unbuilt page"** ([automate-spec.md](specs/automate-spec.md) §4, [home-spec.md](specs/home-spec.md) §9):

| Content                                                                  | Was linking to                                              | Now                                                                                                                |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Home's featured-work cards                                               | `/case-studies/baladi-food-stuff`, `/case-studies/epicerma` | No "read the case study" link — `href` on `CaseStudyCard` is optional, omitted until `/case-studies/[slug]` exists |
| Home's six industry tiles                                                | `/industries`                                               | Plain cards, no hover affordance — `href` on `IndustryTile` is optional, omitted until `/industries` exists        |
| `footer.tsx`'s 12 service leaf links, `Products`, `Case Studies`, `Blog` | invented URLs, none built                                   | Two columns only — Services (the 3 real pillar pages) and Company (About, Contact)                                 |
| `nav.tsx`'s `Case Studies`, `Blog`                                       | unbuilt pages                                               | Dropped; `Services` is now a hover dropdown over the 3 real pillar pages                                           |

**2. `nav.tsx` still doesn't fully match [design-system.md](system/design-system.md) §6.5.** The doc specifies a three-column mega-menu with descriptions plus `Products` · `Case Studies` · `Blog`. The code ships a plain single-column dropdown over Build/Automate/Grow — real links, right structure, but not the full mega-menu. Extend once the mega-menu's destination pages exist. → **Phase 2 Wave 1** ([services-hub-spec.md](specs/services-hub-spec.md) §9).

**2a. Resolved — mobile has a real nav now.** `components/layout/mobile-nav.tsx` adds the `md:hidden` full-screen overlay §6.5 calls for: staggered links, body scroll locked, closes on Escape/link click/resize past `md`. Previously About and Services were unreachable from a phone at all.

**3. `footer.tsx` still doesn't match [design-system.md](system/design-system.md) §6.6.** The doc specifies four columns — Services / Company / Resources / **Legal**. The code has two (Services / Company) because Resources and Legal have no pages to link to — `/privacy`, `/terms`, and `/cookies` ([seo-strategy.md](system/seo-strategy.md) §2) are unwritten. Add the columns when those pages exist, not before. → **Legal in Wave 1** ([legal-spec.md](specs/legal-spec.md)), **Resources in Waves 2 and 5**.

**5. Open defect — `/services` 404s while being asserted to search engines as site structure.** `services/{build,automate,grow}/page.tsx` each pass `{ name: 'Services', path: '/services' }` to `breadcrumbSchema`, which resolves it to an absolute URL in the emitted `BreadcrumbList` JSON-LD. This is a category worse than gap 1's unlinked pages: those were content we chose not to link, this is a broken URL we actively declare. → **Fixed by Wave 1** ([services-hub-spec.md](specs/services-hub-spec.md)).

**4. Resolved — `sitemap.ts` lists exactly the 6 routes that resolve.** It previously listed `/services`, which 404s. Now lists `/`, `/about`, `/contact`, `/services/build`, `/services/automate`, `/services/grow`; extend as Phase 2/3 pages land.

---

## Open items blocking work

Live list; each is also recorded at the bottom of its spec.

- [x] ~~Price ranges for the Home engagement-model section~~ — shipped as "Starting from ₹X" on both Home and Build (Build also gained a 4th tier, Landing Page, so its floor covers the cheapest real thing it builds)
- [ ] **Read the Stratseek agreement** for client-naming and attribution clauses — blocks the featured-work section
- [ ] Written permission before naming the employer from `docs/private/employer-context.md` anywhere, and check the relevant employment agreement's IP/moonlighting clauses
- [x] ~~Four verifiable stats for the Automate proof bar~~ — shipped (`2–4 weeks` / `40+ hrs/mo` / `30 days` / `100%`), each a self-verifiable operational commitment rather than a measured claim
- [x] ~~Note copy~~ — written and shipped on About §4, anonymously (no name/photo yet — see [about-spec.md](specs/about-spec.md) §4)
- [ ] Founder photo, and a decision on whether/when to sign it with a real name
- [ ] Three insight posts, or cut the Home insights section
- [ ] FAQ answers written — particularly the data-handling one
- [x] ~~Resolve the 404s above~~ — Phase 1 pages built, `nav.tsx`/`footer.tsx`/`sitemap.ts` unlinked from everything still unbuilt
- [x] ~~`teamSize` field: `contactSchema` + Drizzle table + `ContactForm`~~ — landed with the Contact page build
- [ ] Decide who monitors `hello@anvio.online` and where form submissions notify — a form that stores silently is how leads get missed
- [ ] anvio.online's own Lighthouse/CWV scores must clear 90+ before [grow-spec.md](specs/grow-spec.md) ships, since that page claims it

### Phase 2 gates

Each blocks a whole wave. Full context in [phase-2-plan.md](specs/phase-2-plan.md) §7.

- [ ] **Choose the MDX loader** (content-collections or velite) — blocks Wave 0, and therefore everything
- [ ] **Read the Stratseek agreement** — blocks Wave 2 entirely _(same item as above; it is now a wave gate, not just a section blocker)_
- [ ] **Keyword-validate the four leaf slugs** in Ahrefs/Semrush and Search Console — blocks Wave 3. A leaf URL is set once
- [ ] **Legal review of `/privacy`** against what the code actually collects — Wave 1. This is the one page where approximately right is not acceptable ([legal-spec.md](specs/legal-spec.md) §2)
- [ ] **Decide GA4 vs Plausible-only** — blocks `/cookies`, and it changes every route's JS budget ([legal-spec.md](specs/legal-spec.md) §4)
- [ ] **A real author name** — an upgrade, not a blocker. Guides ship at a role byline ([guides-spec.md](specs/guides-spec.md) Section 2) so the employment-disclosure question can't stall Wave 5 indefinitely
- [ ] Resolve the sticky table-of-contents architecture before building it ([guides-spec.md](specs/guides-spec.md) Section 3)
- [ ] Decide whether `insights` and `guides` are one content kind or two, before the guides index is built
