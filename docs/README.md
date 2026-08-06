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

| Document                                                                                                | Contents                                                         |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [Brand_strategy.md](Initial/Brand_strategy.md)                                                          | Target audience, problems solved, positioning, what we won't be  |
| [Information_arch.md](Initial/Information_arch.md)                                                      | Sitemap, URL structure, footer, Build/Automate/Grow rationale    |
| [SCOPE.md](Initial/SCOPE.md)                                                                            | Progress tracker, locked decisions, phasing                      |
| [design_direction.md](Initial/design_direction.md)                                                      | Original design intent — superseded by `system/design-system.md` |
| [design_reference.md](Initial/design_reference.md)                                                      | Framer template references                                       |
| [home_wireframe.md](Initial/home_wireframe.md) · [automate_wireframe.md](Initial/automate_wireframe.md) | Original section sketches — superseded by `specs/`               |

### `system/` — the design and content systems

| Document                                        | Contents                                                                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [design-system.md](system/design-system.md)     | Tokens, verified contrast ratios, type scale, spacing, components, responsive, a11y floor |
| [motion-system.md](system/motion-system.md)     | Motion tiers and budget, primitive library, reduced-motion, **performance contract**      |
| [section-library.md](system/section-library.md) | The 24 section types, page compositions, agent-demo build notes                           |
| [seo-strategy.md](system/seo-strategy.md)       | URL architecture, keyword map, on-page standards, internal linking, schema, GEO           |

### `specs/` — page specifications

| Document                                   | Contents                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------- |
| [home-spec.md](specs/home-spec.md)         | Home, section by section: copy, layout, motion tier, SEO role, build order, open items |
| [automate-spec.md](specs/automate-spec.md) | `/services/automate`, same structure                                                   |

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

## Open items blocking work

Live list; each is also recorded at the bottom of its spec.

- [ ] **Price ranges** for the Home engagement-model section — publishing them is the entire point of that section
- [ ] **Read the Stratseek agreement** for client-naming and attribution clauses — blocks the featured-work section
- [ ] **Written permission before naming GeniusCFO** anywhere, and check the employment agreement's IP/moonlighting clauses
- [ ] **Four verifiable stats** for the Automate proof bar — each must survive "how do you know?"
- [ ] Founder photo and note copy
- [ ] Three insight posts, or cut the Home insights section
- [ ] FAQ answers written — particularly the data-handling one
