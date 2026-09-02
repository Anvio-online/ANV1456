# Changelog

All notable changes to this project. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). See [docs/engineering/workflow.md](docs/engineering/workflow.md) §4 for how and when to update this.

## [Unreleased]

### Added

- **Live AI voice appointment-setter demo** ([ADR-0010](docs/engineering/adr/0010-ai-appointment-setter-voice-demo.md)) — a browser voice call with an AI that briefs Anvio, gauges interest, and books a real 15-minute call with the founder via Cal.com. On the home page (§11, new hero secondary CTA) and the new `ai-appointment-setter` service page. Runs on Vapi + `claude-haiku-4-5`; server-side consent gate, 3-minute call cap, per-IP + global rate limits, graceful fallback to the scripted preview when unconfigured. New `agentDemo:voice` section variant.
- **`/services/automate/ai-appointment-setter`** service page — the third Automate service leaf, linked from the Automate nav menu.
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
