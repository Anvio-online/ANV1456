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

### Notes

- Only the Home hero section is implemented; the remaining ~23 section types are typed and documented in [section-library.md](docs/system/section-library.md) but not yet built — this is the scaffold, not the finished site.
