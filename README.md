# Anvio

AI automation, web development, and growth — built for businesses with 10–200 people. Source for [anvio.online](https://anvio.online).

**New here?** Start at [docs/README.md](docs/README.md) — brand strategy, design system, page specs, and engineering conventions, in reading order.

## Setup

```bash
nvm use          # Node 22, per .nvmrc
corepack enable
pnpm install
cp .env.example apps/web/.env.local   # fill in what you have; see docs/engineering/tech-stack.md §7
pnpm dev          # http://localhost:3000
```

## Scripts

| Command                                | Does                                           |
| -------------------------------------- | ---------------------------------------------- |
| `pnpm dev`                             | Start the dev server                           |
| `pnpm verify`                          | typecheck + lint + test + build — what CI runs |
| `pnpm test:e2e`                        | Playwright, including the `@a11y` axe suite    |
| `pnpm db:generate` / `pnpm db:migrate` | Drizzle migrations                             |

## Where things are

- [docs/system/](docs/system/) — design tokens, motion, the section library, SEO strategy
- [docs/specs/](docs/specs/) — page-by-page specs (copy, layout, motion tier, SEO role)
- [docs/engineering/](docs/engineering/) — stack, repo structure, conventions, workflow, [ADRs](docs/engineering/adr/)
- [apps/web/src/sections/](apps/web/src/sections/) — the section library in code; `hero` is the reference implementation
- [apps/web/src/app/api/agent/route.ts](apps/web/src/app/api/agent/route.ts) — the agent-demo backend (see [ADR-0005](docs/engineering/adr/0005-agent-demo-model-and-email-gate.md))


Contributing? Read [docs/engineering/conventions.md](docs/engineering/conventions.md) and [docs/engineering/workflow.md](docs/engineering/workflow.md) first.
