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
| [section-library.md](system/section-library.md) | The section registry, page compositions, agent-demo build notes                           |
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

Those six are Phase 1 in full ([SCOPE.md](Initial/SCOPE.md) · [seo-strategy.md](system/seo-strategy.md) §3), minus the 2 case studies and 1 free tool — both of which carried into Phase 2.

#### Phase 2 — planned 2026-08-08, **floor built 2026-08-10**

Start with **[phase-2-plan.md](specs/phase-2-plan.md)**: scope, the fourteen routes, the dependency graph, the five build waves, and the link/schema debt each one retires. The specs below are its children and assume you've read it. Built on `feat/phase-2-wave-1` — not yet merged to `main`, not yet pushed to the remote (the branch's own commits are the record of what actually changed).

| Document                                           | Pages                                                                    | Wave | Status                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------ | ---- | ------------------------------------------------------------------------------------------------------------- |
| [phase-2-plan.md](specs/phase-2-plan.md)           | _the umbrella_                                                           | —    | —                                                                                                             |
| [services-hub-spec.md](specs/services-hub-spec.md) | `/services` + the nav mega-menu and footer columns                       | 1    | **Built**                                                                                                     |
| [legal-spec.md](specs/legal-spec.md)               | `/privacy` · `/terms` · `/cookies`                                       | 1    | **Built** — content pending real legal review                                                                 |
| [projects-spec.md](specs/projects-spec.md)         | `/projects` — client work **and labelled internal builds**               | 2    | **Built**, internal items only                                                                                |
| [case-studies-spec.md](specs/case-studies-spec.md) | `/case-studies` + `/case-studies/[slug]`                                 | 2    | Not built — blocked on **the Stratseek agreement**                                                            |
| [service-leaf-spec.md](specs/service-leaf-spec.md) | 4 leaves — 3 Automate, 1 Build                                           | 3    | **2 of 4 built** — `whatsapp-automation`, `ai-chatbot-development`. Remaining 2 blocked on keyword validation |
| [industries-spec.md](specs/industries-spec.md)     | `/industries` + `/industries/ecommerce` + `/industries/accounting-firms` | 4    | Not started                                                                                                   |
| [tools-spec.md](specs/tools-spec.md)               | `/tools/automation-roi-calculator`                                       | 4    | Not started                                                                                                   |
| [guides-spec.md](specs/guides-spec.md)             | `/guides` + 6–8 guides                                                   | 5    | **4 of 4 floor guides built**; 5–8 not started                                                                |

**Wave 0 is built** — the content adapter and six of seven Phase 2 section types, per [content-layer.md](engineering/content-layer.md). One deviation from its original plan is worth reading there: `next-mdx-remote/rsc`, not `@content-collections/mdx`, is what actually compiles guide and leaf bodies — the originally planned package renders client-side, which would have put that content outside the server-rendered HTML this site's SEO position depends on. `caseStudyBody` is the one section type still unbuilt, blocked with the case studies below. Authoring model: [ADR-0006](engineering/adr/0006-content-page-authoring-model.md).

**No Phase 2 page carries a Tier 1 signature scene.** Deliberate, and held in the built pages — [phase-2-plan.md](specs/phase-2-plan.md) §4, mapped in [motion-system.md](system/motion-system.md) §8a.

**The floor is built.** [phase-2-plan.md](specs/phase-2-plan.md) §5a — Waves 0 and 1 in full, `/projects`, two leaves, four guides. Everything above the floor is specced and not started: the third and fourth leaves, `/industries`, `/tools`, guides five through eight, and `/case-studies` (blocked, not merely deferred).

**The proof asymmetry drove three of the plan's decisions, and the build followed through on all three.** Both case studies are Build work while the brand is positioned on Automate — [phase-2-plan.md](specs/phase-2-plan.md) §1a explains why `/projects` moved out of Phase 3, why the two shipped Automate leaves carry the agent demo instead of a results section, and why the leaf split stayed 3 Automate / 1 Build.

Phase 3 pages (`/products`, `/blog` at cadence, the remaining ~15 service leaves) have no spec yet.

### `engineering/` — how the code works

| Document                                           | Contents                                                                                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [tech-stack.md](engineering/tech-stack.md)         | Every technology choice and its reason; the agent-demo architecture and guardrails                                                               |
| [repo-structure.md](engineering/repo-structure.md) | Directory tree, what each holds, naming, where a new thing goes                                                                                  |
| [content-layer.md](engineering/content-layer.md)   | **Built** — the content adapter, frontmatter schemas, the section types Phase 2 needed, and where the as-built implementation deviated from plan |
| [conventions.md](engineering/conventions.md)       | TypeScript, React, styling, motion, SEO, a11y, naming, definition of done, review                                                                |
| [workflow.md](engineering/workflow.md)             | Git, commits, PRs, CHANGELOG, ADRs, environments, releases, rollback                                                                             |
| [adr/](engineering/adr/)                           | Architecture Decision Records — why things are the way they are                                                                                  |

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

| Content                                                                  | Was linking to                                              | Now                                                                                                                                                                 |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home's featured-work cards                                               | `/case-studies/baladi-food-stuff`, `/case-studies/epicerma` | No "read the case study" link — `href` on `CaseStudyCard` is optional, omitted until `/case-studies/[slug]` exists                                                  |
| Home's six industry tiles                                                | `/industries`                                               | Plain cards, no hover affordance — `href` on `IndustryTile` is optional, omitted until `/industries` exists                                                         |
| `footer.tsx`'s 12 service leaf links, `Products`, `Case Studies`, `Blog` | invented URLs, none built                                   | Now: Services (hub + 3 pillars + 2 shipped leaves), Company (About, Projects, Contact), Legal (Privacy, Terms, Cookies). Resources still absent — waits on Wave 2/5 |
| `nav.tsx`'s `Case Studies`, `Blog`                                       | unbuilt pages                                               | Dropped; `Services` is now the three-column mega-menu (see gap 2, resolved) over Build/Automate/Grow, with the 2 shipped leaves linked from Automate's column       |

**2. Resolved — `nav.tsx` now matches [design-system.md](system/design-system.md) §6.5's three-column mega-menu.** Built in Phase 2 Wave 1 ([services-hub-spec.md](specs/services-hub-spec.md) §9). `Products` · `Case Studies` · `Blog` still don't appear — still no pages to point them at.

**2a. Resolved — mobile has a real nav now.** `components/layout/mobile-nav.tsx` adds the `md:hidden` full-screen overlay §6.5 calls for: staggered links, body scroll locked, closes on Escape/link click/resize past `md`. Previously About and Services were unreachable from a phone at all.

**3. Resolved — `footer.tsx` now has three of the four columns** [design-system.md](system/design-system.md) §6.6 specifies — Services / Company / Legal, built in Wave 1. Resources is the one still missing, correctly: it has nothing to link to until `/case-studies` (Wave 2, blocked) and more guides (Wave 5, 4 of 8 built) exist.

**4. Resolved — the `/services` JSON-LD defect.** `services/{build,automate,grow}/page.tsx` had been passing `{ name: 'Services', path: '/services' }` to `breadcrumbSchema` since Phase 1, resolving to a URL that 404'd — a broken URL actively declared in structured data, not just an unlinked page. Fixed the moment `/services` shipped in Wave 1.

**5. Resolved — `sitemap.ts` now generates itself.** Previously a literal list; now builds static routes from a literal array and content-driven routes (service leaves, guides) from `contentRepository.list()`/`slugs()` — a new MDX file publishes itself here without a code change, which was the whole point of building a content adapter. `/case-studies` and `/industries` stay out until those kinds have real entries.

---

## Open items blocking work

Live list; each is also recorded at the bottom of its spec.

- [x] ~~Price ranges for the Home engagement-model section~~ — shipped as "Starting from ₹X" on both Home and Build (Build also gained a 4th tier, Landing Page, so its floor covers the cheapest real thing it builds)
- [ ] **Read the Stratseek agreement** for client-naming and attribution clauses — blocks the featured-work section on Home, and blocks all of Phase 2 Wave 2 (`/case-studies`)
- [ ] Written permission before naming the employer from `docs/private/employer-context.md` anywhere, and check the relevant employment agreement's IP/moonlighting clauses
- [x] ~~Four verifiable stats for the Automate proof bar~~ — shipped (`2–4 weeks` / `40+ hrs/mo` / `30 days` / `100%`), each a self-verifiable operational commitment rather than a measured claim
- [x] ~~Note copy~~ — written and shipped on About §4, anonymously (no name/photo yet — see [about-spec.md](specs/about-spec.md) §4)
- [ ] Founder photo, and a decision on whether/when to sign it with a real name — also now what `authorBio` on every guide is waiting on (ships today at a role byline, no name)
- [ ] Three insight posts, or cut the Home insights section — moot in the sense that four guides now exist and could seed it, but Home's own `insights` section instance was never added and still isn't; a small separate step
- [ ] FAQ answers written — particularly the data-handling one. **Partly resolved**: `/privacy` now exists and Automate's data-handling FAQ answer was updated to point to it, but the policy itself is engineering-drafted, not legal-reviewed (see the gate below)
- [x] ~~Resolve the 404s above~~ — Phase 1 pages built, `nav.tsx`/`footer.tsx`/`sitemap.ts` unlinked from everything still unbuilt
- [x] ~~`teamSize` field: `contactSchema` + Drizzle table + `ContactForm`~~ — landed with the Contact page build
- [ ] Decide who monitors `hello@anvio.online` and where form submissions notify — a form that stores silently is how leads get missed. Now also the contact address named throughout `/privacy` for access/deletion requests
- [ ] anvio.online's own Lighthouse/CWV scores must clear 90+ before [grow-spec.md](specs/grow-spec.md) ships, since that page claims it. Also blocks the real numbers on the `/projects` "anvio.online itself" card, which currently ships without a published score rather than an invented one

### Phase 2 gates

Full context in [phase-2-plan.md](specs/phase-2-plan.md) §7. Status as of 2026-08-10, the floor build.

- [x] ~~**Choose the MDX loader**~~ — **content-collections**, paired with `next-mdx-remote/rsc` for the actual body render (see [content-layer.md](engineering/content-layer.md) §2 for why the pairing, not content-collections' own MDX package)
- [ ] **Read the Stratseek agreement** — still blocks `/case-studies` and `/case-studies/[slug]` entirely, and `/projects`' two withheld client cards (Baladi, Epicerma)
- [ ] **Keyword-validate the four leaf slugs** in Ahrefs/Semrush and Search Console — the two shipped leaves (`whatsapp-automation`, `ai-chatbot-development`) launched on the provisional slugs from [service-leaf-spec.md](specs/service-leaf-spec.md) without this research; validate before the remaining two ship, and be aware a rename later costs a redirect
- [ ] **Legal review of `/privacy`** against what the code actually collects — the page is live with an engineering-drafted policy (real audited data table, concrete retention periods and governing-law clause chosen as defaults, not legal sign-off). This is the one page where approximately right is not acceptable ([legal-spec.md](specs/legal-spec.md) §2)
- [x] ~~**Decide GA4 vs Plausible-only**~~ — moot as shipped: no analytics is wired into the codebase at all today, so `/cookies` states that plainly rather than choosing between the two aspirationally. Revisit this gate the day either one is actually added
- [x] ~~**A real author name**~~ — resolved as an upgrade path, not a blocker, per the plan: all four guides ship at the role-byline fallback (`"Anvio's founding engineer"`), no name. Swapping in a real name later is a frontmatter string change
- [x] ~~Resolve the sticky table-of-contents architecture~~ — built as `inline` (a native `<details>` disclosure, zero client JS), per [guides-spec.md](specs/guides-spec.md) Section 3's own reasoning against `sticky-rail`
- [ ] Decide whether `insights` and `guides` are one content kind or two — still open. As shipped, `/guides`' index reads guides by an explicit curated slug list in the page file, not by querying the `insights` kind, which has zero entries
