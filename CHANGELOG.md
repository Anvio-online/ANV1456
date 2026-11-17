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
- First-touch attribution on every captured lead — landing page, referrer, and UTM params are snapshotted by `middleware.ts` (consent-gated) and stamped onto agent-demo, contact, and audit rows, so a lead can be traced to the link it came from ([ADR-0008](docs/engineering/adr/0008-analytics-attribution-and-lead-visibility.md))
- Agent-demo plans are now persisted to `agent_leads` (email, transcript, plan, whether the email sent, attribution) — previously the row ADR-0005 assumed was never actually written
- PostHog product analytics wired for the lead funnel — `build_my_plan_clicked`, agent-demo turns, email submitted, plan generated, plan email sent, contact and audit submissions ([ADR-0008](docs/engineering/adr/0008-analytics-attribution-and-lead-visibility.md)). `posthog-js` is lazy-loaded only after consent, so it stays out of the shared bundle
- Analytics consent banner — shown once, defaults to declined; analytics and the attribution cookie only run after "Accept". `/privacy` and `/cookies` updated to name PostHog, list every cookie, and describe how to withdraw consent (both pages still pending legal review)

- **GEO infrastructure pass** ([seo-strategy.md](docs/system/seo-strategy.md) §6–§7): `/llms-full.txt` — the full text of every guide in one machine-readable document; `HowTo` and guide-level `FAQPage` structured data via optional `faq` / `howToSteps` guide frontmatter; a `WebPage` node on Home linking it to the Organization; a GEO citation-tracking log at `ops/seo/`
- Visible **Common questions** sections on the invoice-automation and WhatsApp-API guides
- Three guides: **How to Automate Lead Follow-Ups** (with `HowTo` markup), **AI Agents for Customer Support: What They Can and Can't Do**, and **How Much Does an AI Chatbot Cost for a Small Business?** — cross-linked from the related existing guides and listed on `/guides`
- Anvio Instagram (`instagram.com/anvio.online`) added to `Organization.sameAs` and the site footer (Company column)

### Changed

- **Automate pricing is now published as a single "Starting from ₹30,000" floor** ([ADR-0009](docs/engineering/adr/0009-automate-pricing-starting-floor.md)), replacing the inconsistent ranges and retainer figures previously shown on `/services/automate`, the chatbot leaf, Home's engagement model, and two content pages. Grow pricing stays unpublished.
- `Organization` structured data now carries `description`, `logo`, `image`, `areaServed` (India, UAE), `knowsAbout`, and `contactPoint`; `Organization`/`WebSite` gained stable `@id`s that every other schema builder now references instead of repeating a stub. `Article` gained `publisher`, `image`, `mainEntityOfPage`; `Service` gained `areaServed`
- **WhatsApp Business API guide** updated for Meta's per-message pricing model (effective 2026-07-01) — free-form service replies inside the 24-hour window are no longer charged; only template messages are

- **Live AI voice appointment-setter demo** ([ADR-0010](docs/engineering/adr/0010-ai-appointment-setter-voice-demo.md)) — a browser voice call with an AI that briefs Anvio, gauges interest, and books a real 15-minute call with the founder via Cal.com. On the home page (§11, new hero secondary CTA) and the new `ai-appointment-setter` service page. Runs on Vapi + `claude-haiku-4-5`; server-side consent gate, 3-minute call cap, per-IP + global rate limits, graceful fallback to the scripted preview when unconfigured. New `agentDemo:voice` section variant.
- **`/services/automate/ai-appointment-setter`** service page — the third Automate service leaf, linked from the Automate nav menu.

### Notes

- Only the Home hero section is implemented; the remaining ~23 section types are typed and documented in [section-library.md](docs/system/section-library.md) but not yet built — this is the scaffold, not the finished site.
