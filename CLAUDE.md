# CLAUDE.md

Guidance for Claude Code (or any AI assistant) working in this repo. This is a summary — the full documents are the source of truth; when in doubt, read them rather than trusting this file's paraphrase.

## What this is

Anvio's marketing site — a Next.js App Router app selling AI automation, web development, and growth services to SMBs. Full context: [docs/README.md](docs/README.md).

## Before writing code

1. Read [docs/engineering/repo-structure.md](docs/engineering/repo-structure.md) §6 — "where does a new thing go". If you can't find the file's home there, stop and ask rather than guessing.
2. Read [docs/engineering/conventions.md](docs/engineering/conventions.md) — TypeScript, React/Next patterns, styling, motion, a11y, naming.
3. If touching a page, read its spec in `docs/specs/`. If touching the design system, read `docs/system/design-system.md`.

## Non-negotiables

- **No Tailwind arbitrary values.** `text-[#FF9130]`, `p-[37px]` fail CI. If a value isn't a token in `apps/web/src/styles/tokens.css` / `globals.css` `@theme`, add the token — don't inline the value. See [design-system.md](docs/system/design-system.md).
- **Sections own no vertical margin.** `<Section>` applies `--section-y`. A section component with `mt-*`/`mb-*` on its root is a bug.
- **`'use client'` is opt-in, at the smallest leaf.** Server components by default — this is the whole SEO position. See [tech-stack.md](docs/engineering/tech-stack.md) §1.
- **Motion budget: 1 signature + 3–4 supporting scenes per page, max.** See [motion-system.md](docs/system/motion-system.md). transform/opacity only; every animation needs a reduced-motion path and a mobile path.
- **`ANTHROPIC_API_KEY` never reaches the client.** Server-side route handlers only, no `NEXT_PUBLIC_` prefix, ever.
- **The agent-demo plan call requires a captured email — enforced server-side.** This is [ADR-0005](docs/engineering/adr/0005-agent-demo-model-and-email-gate.md); don't relax it to "nice to have" in the UI without also changing the route.
- **A new section type needs a variant-first justification.** Before adding a `sections/<new-type>/`, check whether it's actually a new `variant` on an existing type. See [ADR-0003](docs/engineering/adr/0003-section-registry-composition.md).
- **One `<h1>` per page**, computed by `resolveHeadingLevel` from array position — never hardcode a heading tag inside a section component.

## Commits

Conventional Commits, enforced by commitlint. `<type>(<scope>): <subject>`, body explains _why_. See [workflow.md](docs/engineering/workflow.md) §2. Don't commit without running `pnpm verify` first.

## When you're not sure

Check for an ADR in [docs/engineering/adr/](docs/engineering/adr/) before assuming — several non-obvious calls (repo shape, content storage, agent model choice) are already decided and reasoned there. If a decision you're about to make is a real fork (not obvious, expensive to reverse), propose writing a new ADR rather than picking silently.
