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
| [build-spec.md](specs/build-spec.md)       | `/services/build`    | Wireframe-to-render assembly | Spec'd |
| [grow-spec.md](specs/grow-spec.md)         | `/services/grow`     | Metrics dashboard evolve     | Spec'd |
| [about-spec.md](specs/about-spec.md)       | `/about`             | _(none — deliberate)_        | Spec'd |
| [contact-spec.md](specs/contact-spec.md)   | `/contact`           | _(none — deliberate)_        | Spec'd |

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

Found by auditing every internal link in the built site against what actually resolves. These aren't spec decisions — they're drift, and each one is a real defect today.

**1. Every internal link except `/` and `/services/automate` currently 404s.** Verified against the running app:

| Link                                                        | Where it's rendered                               | Status |
| ----------------------------------------------------------- | ------------------------------------------------- | ------ |
| `/services`, `/case-studies`, `/about`, `/blog`             | `nav.tsx` — all four primary nav links            | 404    |
| `/contact`                                                  | `nav.tsx` "Book a call" button, both closing CTAs | 404    |
| `/services/build`, `/services/grow`                         | Home's services pillar cards                      | 404    |
| `/industries`                                               | Home's six industry tiles                         | 404    |
| `/case-studies/baladi-food-stuff`, `/case-studies/epicerma` | Home's featured-work cards                        | 404    |
| 12 service leaf links, `/products`                          | `footer.tsx`                                      | 404    |

This directly violates the rule both built specs state: **"Never link to an unbuilt page"** ([automate-spec.md](specs/automate-spec.md) §4, [home-spec.md](specs/home-spec.md) §9). The rule was applied to _accordion sub-items_ and then not applied to nav, footer, or card links. `/contact` is the most damaging — it's the primary CTA on every page.

Fix is a decision, not just code: either build the Phase 1 pages (they're now all spec'd), or make unbuilt destinations non-links until they exist. Don't ship more pages that link into the same void.

**2. `nav.tsx` doesn't match [design-system.md](system/design-system.md) §6.5.** The doc specifies `Services (mega-menu: Build / Automate / Grow, three columns with descriptions) · Products · Case Studies · About · Blog`. The code has a plain `/services` link, no mega-menu, and no Products. Any spec that assumes the mega-menu exists is assuming a thing that was never built.

**3. `footer.tsx` doesn't match [design-system.md](system/design-system.md) §6.6.** The doc specifies four columns — Services / Company / Resources / **Legal**. The code has Build / Automate / Grow / Company. There is no Legal column anywhere, so `/privacy`, `/terms`, and `/cookies` ([seo-strategy.md](system/seo-strategy.md) §2) are unreachable and unwritten.

**4. `sitemap.ts` lists 5 routes, one of which 404s** (`/services`). Its comment says "Phase 1 routes only — extend as pages land," so it's a to-do list rather than a claim — but shipping a sitemap that points a crawler at a 404 is worth fixing before launch.

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
- [ ] **Resolve the 404s above** — build the Phase 1 pages or unlink their destinations
- [ ] `teamSize` field: `contactSchema` + Drizzle table + `ContactForm` — specced in [automate-spec.md](specs/automate-spec.md) §12, deferred during that build, owed by [contact-spec.md](specs/contact-spec.md)
- [ ] Decide who monitors `hello@anvio.online` and where form submissions notify — a form that stores silently is how leads get missed
- [ ] anvio.online's own Lighthouse/CWV scores must clear 90+ before [grow-spec.md](specs/grow-spec.md) ships, since that page claims it
