Brand strategy (positioning, messaging, target audience) - done
Information architecture (every page and URL) - done for initial
Wireframes (what every section contains) - done for Home + Automate → docs/specs/
UI inspiration and design system - done → docs/system/design-system.md
Motion & animation system - done → docs/system/motion-system.md
Section library / component registry - done → docs/system/section-library.md
SEO structure (keywords, internal linking, metadata) - done → docs/system/seo-strategy.md
Copywriting for every page - drafted for Home + Automate in the specs; open items listed at the bottom of each
Development - Phase 1's six pages built; Phase 2 planned, not started
Analytics, lead capture, and automation - specced in seo-strategy.md §9, not implemented
Content marketing
International expansion (starting with India, then UAE, then other English-speaking markets)


Engineering docs (stack, repo structure, conventions, workflow, ADRs) - done → docs/engineering/
Documentation index - done → docs/README.md

## Locked decisions (v1)

- Theme: dark-anchored hybrid — dark canvas for hero/pillars/signature motion, near-white for process, case studies, pricing, FAQ
- Accent: Signal Amber #FF9130 (amber text on light surfaces is #9A4D06 — contrast)
- Type: Cabinet Grotesk (display) / Satoshi (body) / JetBrains Mono (labels, metrics, nodes)
- Phase 1 ships a full live AI agent demo on Home + Automate — this is the differentiator and the answer to having no client logos yet
- Stack: Next.js App Router, TypeScript, Tailwind v4, Motion, Lenis, MDX, Vercel, Plausible + GA4
- Repo: pnpm workspace, apps/web only for now (ADR-0001)
- Content: MDX behind a ContentRepository adapter, migrate to a CMS when a writer joins (ADR-0002)
- Agent demo runs on claude-opus-5 — two calls: streamed Q&A turns + one schema-constrained plan call

## Phasing

- Phase 1: Home, Automate, Build, Grow, About, Contact, 2 case studies, 1 free tool — **the six pages shipped; the case studies and the tool did not, and carry into Phase 2**
- Phase 2: 3–4 leaf service pages chosen by keyword data, Industries hub + 2 industries, 6–8 guides — plus the Phase 1 carryovers and the structural pages (`/services`, `/case-studies`, `/tools`, legal). **Planned in full → [docs/specs/phase-2-plan.md](../specs/phase-2-plan.md)**
- Phase 3: remaining leaves, Products, Projects, full blog cadence

## Phase 2 status

Planned 2026-08-08. Fourteen routes across five waves, gated on a content layer that does not exist yet ([docs/engineering/content-layer.md](../engineering/content-layer.md)). Nothing built.

| Wave | Contents | Blocked on |
|---|---|---|
| 0 | Content adapter, frontmatter schemas, 6 new section types, 5 new variants, 3 SEO schema builders | Choosing the MDX loader |
| 1 | `/services` hub, legal trio, nav mega-menu, footer's four columns | — |
| 2 | `/case-studies` + detail | **The Stratseek agreement, and two written case studies** |
| 3 | 4 service leaves | **Keyword validation** — the slugs are provisional |
| 4 | `/industries` + 2 industries, `/tools/automation-roi-calculator` | Two industry bodies at ≥800 words |
| 5 | `/guides` + 6–8 guides | A real author name; 1,800 words each |

Wave 1 also retires a live defect: `/services` 404s while being emitted as a `BreadcrumbList` URL on all three pillar pages.
