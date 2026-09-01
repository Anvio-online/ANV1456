# Changelog

All notable changes to this project. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). See [docs/engineering/workflow.md](docs/engineering/workflow.md) §4 for how and when to update this.

## [Unreleased]

### Added

- Repository scaffold: pnpm workspace, Next.js App Router app, TypeScript strict mode ([ADR-0001](docs/engineering/adr/0001-pnpm-workspace-single-app.md))
- Design tokens wired end-to-end — `tokens.css` → Tailwind v4 `@theme`, verified contrast pairs, self-hosted fonts (Cabinet Grotesk, Satoshi, JetBrains Mono)
- Section registry and renderer — the composition system from [ADR-0003](docs/engineering/adr/0003-section-registry-composition.md)
- Home page hero (`centered-statement` variant) as the reference section implementation
- Nav and Footer
- Agent-demo backend (`POST /api/agent`): two-stage flow on `claude-sonnet-5`, email-gated plan generation, per-IP rate limiting ([ADR-0005](docs/engineering/adr/0005-agent-demo-model-and-email-gate.md))
- Drizzle schema for captured leads and contact submissions
- SEO scaffolding: typed metadata builder, JSON-LD schema builders, sitemap, robots (AI-crawler allowlist)
- CI-facing quality gates: ESLint with the `app → sections → components → lib` boundary rule and a no-arbitrary-Tailwind-values rule, Prettier, commitlint, Husky pre-commit
- `docs/business/` — the living business layer (positioning, ICP, services and pricing, current situation, competitors, voice), superseding `Initial/Brand_strategy.md`
- `.claude/` operating system: modular rules, nine specialist agents, twelve commands, three skills, and three enforcement hooks ([ADR-0007](docs/engineering/adr/0007-agent-operating-system.md))
- `ops/` for dated agent deliverables, with lead/outreach/meeting/proposal output gitignored as personal and client-confidential data
- **GEO infrastructure pass** ([seo-strategy.md](docs/system/seo-strategy.md) §6–§7): `/llms-full.txt` — the full text of every guide in one machine-readable document; `HowTo` and guide-level `FAQPage` structured data via optional `faq` / `howToSteps` guide frontmatter; a `WebPage` node on Home linking it to the Organization; a GEO citation-tracking log at `ops/seo/`
- Visible **Common questions** sections on the invoice-automation and WhatsApp-API guides
- Two guides: **How to Automate Lead Follow-Ups** (with `HowTo` markup) and **AI Agents for Customer Support: What They Can and Can't Do** — both cross-linked from the related existing guides and listed on `/guides`
- Anvio Instagram (`instagram.com/anvio.online`) added to `Organization.sameAs`

### Changed

- **Automate pricing is now published as a single "Starting from ₹30,000" floor** ([ADR-0009](docs/engineering/adr/0009-automate-pricing-starting-floor.md)), replacing the inconsistent ranges and retainer figures previously shown on `/services/automate`, the chatbot leaf, Home's engagement model, and two content pages. Grow pricing stays unpublished.
- `Organization` structured data now carries `description`, `logo`, `image`, `areaServed` (India, UAE), `knowsAbout`, and `contactPoint`; `Organization`/`WebSite` gained stable `@id`s that every other schema builder now references instead of repeating a stub. `Article` gained `publisher`, `image`, `mainEntityOfPage`; `Service` gained `areaServed`
- **WhatsApp Business API guide** updated for Meta's per-message pricing model (effective 2026-07-01) — free-form service replies inside the 24-hour window are no longer charged; only template messages are

### Notes

- Only the Home hero section is implemented; the remaining ~23 section types are typed and documented in [section-library.md](docs/system/section-library.md) but not yet built — this is the scaffold, not the finished site.
