Brand strategy (positioning, messaging, target audience) - done
Information architecture (every page and URL) - done for initial
Wireframes (what every section contains) - done for Home + Automate → docs/specs/
UI inspiration and design system - done → docs/system/design-system.md
Motion & animation system - done → docs/system/motion-system.md
Section library / component registry - done → docs/system/section-library.md
SEO structure (keywords, internal linking, metadata) - done → docs/system/seo-strategy.md
Copywriting for every page - drafted for Home + Automate in the specs; open items listed at the bottom of each
Development - Phase 1's six pages built; Phase 2 built in full except /case-studies, 2026-08-10 (docs/specs/phase-2-plan.md)
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

Planned 2026-08-08. **Everything except `/case-studies` built 2026-08-10**, on `feat/phase-2-wave-1` — not yet merged to `main`, not yet pushed. Thirteen of fourteen planned routes across five waves.

| Wave | Contents | Status |
|---|---|---|
| 0 | Content adapter, frontmatter schemas, 6 new section types, 5 new variants, 3 SEO schema builders | **Built** — loader is content-collections + `next-mdx-remote/rsc` (see [docs/engineering/content-layer.md](../engineering/content-layer.md) §2 for why not content-collections' own MDX package). `caseStudyBody` unbuilt, blocked with Wave 2 |
| 1 | `/services` hub, legal trio, nav mega-menu, footer's four columns | **Built, in full** — all four footer columns now real |
| 2 | `/case-studies` + detail, **and `/projects`** | `/projects` **built**, internal items only. Case studies **not built** — the one route in this whole plan still blocked, on the Stratseek agreement |
| 3 | 4 service leaves | **2 of 4 built** — `whatsapp-automation`, `ai-chatbot-development`. Shipped on provisional slugs; keyword validation still hasn't run, and now applies retroactively to what's live, not just what's next |
| 4 | `/industries` + 2 industries, `/tools/automation-roi-calculator` | **Built, in full** |
| 5 | `/guides` + 6–8 guides | **Built, in full — all 8 guides** shipped in one session: ai-agent-vs-chatbot, whatsapp-business-api-cost-and-limits, which-processes-are-worth-automating, geo-vs-seo-getting-cited-by-ai, n8n-vs-zapier-vs-make, how-to-automate-invoice-data-entry, what-is-rag, what-a-business-website-should-cost |

Wave 1 also retired the live defect: `/services` 404'd while being emitted as a `BreadcrumbList` URL on all three pillar pages.

**Two real bugs surfaced and were fixed while shipping the above-the-floor scope**, not left in place: both live leaves had a link to an unbuilt third leaf (`ai-agent-development`) that would have 404'd, now repointed; and the `<Comparison>` MDX component crashes the build on array-literal props under `next-mdx-remote/rsc` — its one usage became a plain markdown table, and the component stays registered but flagged broken pending a real fix. Full detail in [docs/engineering/content-layer.md](../engineering/content-layer.md) and [phase-2-plan.md](../specs/phase-2-plan.md) §7.

**The whole plan is built except one page.** Verified with a full production build (33 routes, 154KB First Load JS held throughout, lint and typecheck clean) and spot-checked in-browser — the ROI calculator's arithmetic, the industries pages' full section frame, and a guide's table-of-contents links resolving to the exact heading IDs `rehype-slug` assigns. `/case-studies` is the only page in [phase-2-plan.md](../specs/phase-2-plan.md) not shipped, correctly, behind the Stratseek gate.

**Both case studies are Build work, while the brand is positioned on Automate.** That asymmetry moved `/projects` into the floor and put the agent demo on the two shipped Automate leaves instead of a results section ([phase-2-plan.md](../specs/phase-2-plan.md) §1a) — both held through the actual build, not just the plan.
