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

Those six are Phase 1 in full ([SCOPE.md](Initial/SCOPE.md) · [seo-strategy.md](system/seo-strategy.md) §3), minus the 2 case studies and 1 free tool. Phase 2/3 pages (`/services` hub, `/industries`, `/case-studies`, `/projects`, `/products`, `/blog`, service leaves, `/guides`, `/tools`, legal) have no spec yet.

### `engineering/` — how the code works

| Document                                           | Contents                                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [tech-stack.md](engineering/tech-stack.md)         | Every technology choice and its reason; the agent-demo architecture and guardrails |
| [repo-structure.md](engineering/repo-structure.md) | Directory tree, what each holds, naming, where a new thing goes                    |
| [conventions.md](engineering/conventions.md)       | TypeScript, React, styling, motion, SEO, a11y, naming, definition of done, review  |
| [workflow.md](engineering/workflow.md)             | Git, commits, PRs, CHANGELOG, ADRs, environments, releases, rollback               |
| [adr/](engineering/adr/)                           | Architecture Decision Records — why things are the way they are                    |

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

**2. `nav.tsx` still doesn't fully match [design-system.md](system/design-system.md) §6.5.** The doc specifies a three-column mega-menu with descriptions plus `Products` · `Case Studies` · `Blog`. The code now ships a plain single-column dropdown over Build/Automate/Grow — real links, right structure, but not the full mega-menu, and no mobile overlay menu exists yet (About/Services are unreachable from a mobile nav today, only via footer or CTAs). Extend once the mega-menu's destination pages exist.

**3. `footer.tsx` still doesn't match [design-system.md](system/design-system.md) §6.6.** The doc specifies four columns — Services / Company / Resources / **Legal**. The code has two (Services / Company) because Resources and Legal have no pages to link to — `/privacy`, `/terms`, and `/cookies` ([seo-strategy.md](system/seo-strategy.md) §2) are unwritten. Add the columns when those pages exist, not before.

**4. Resolved — `sitemap.ts` lists exactly the 6 routes that resolve.** It previously listed `/services`, which 404s. Now lists `/`, `/about`, `/contact`, `/services/build`, `/services/automate`, `/services/grow`; extend as Phase 2/3 pages land.

---

## Open items blocking work

Live list; each is also recorded at the bottom of its spec.

- [ ] **Price ranges** for the Home engagement-model section — publishing them is the entire point of that section
- [ ] **Read the Stratseek agreement** for client-naming and attribution clauses — blocks the featured-work section
- [ ] **Written permission before naming GeniusCFO** anywhere, and check the employment agreement's IP/moonlighting clauses
- [ ] **Four verifiable stats** for the Automate proof bar — each must survive "how do you know?"
- [ ] Founder photo and note copy
- [ ] Three insight posts, or cut the Home insights section
- [ ] FAQ answers written — particularly the data-handling one
- [x] ~~Resolve the 404s above~~ — Phase 1 pages built, `nav.tsx`/`footer.tsx`/`sitemap.ts` unlinked from everything still unbuilt
- [x] ~~`teamSize` field: `contactSchema` + Drizzle table + `ContactForm`~~ — landed with the Contact page build
- [ ] Decide who monitors `hello@anvio.online` and where form submissions notify — a form that stores silently is how leads get missed
- [ ] anvio.online's own Lighthouse/CWV scores must clear 90+ before [grow-spec.md](specs/grow-spec.md) ships, since that page claims it
