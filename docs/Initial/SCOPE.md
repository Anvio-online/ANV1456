Brand strategy (positioning, messaging, target audience) - done
Information architecture (every page and URL) - done for initial
Wireframes (what every section contains) - done for Home + Automate → docs/specs/
UI inspiration and design system - done → docs/system/design-system.md
Motion & animation system - done → docs/system/motion-system.md
Section library / component registry - done → docs/system/section-library.md
SEO structure (keywords, internal linking, metadata) - done → docs/system/seo-strategy.md
Copywriting for every page - drafted for Home + Automate in the specs; open items listed at the bottom of each
Development - not started
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

- Phase 1: Home, Automate, Build, Grow, About, Contact, 2 case studies, 1 free tool
- Phase 2: 3–4 leaf service pages chosen by keyword data, Industries hub + 2 industries, 6–8 guides
- Phase 3: remaining leaves, Products, full blog cadence
