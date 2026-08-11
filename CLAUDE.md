# CLAUDE.md

Guidance for Claude Code (or any AI assistant) in this repo. **This file is an index and a list of non-negotiables, not a manual** — the linked documents are the source of truth. When in doubt, read them rather than trusting this file's paraphrase.

## What this is

Anvio's marketing site — a Next.js App Router app selling AI automation, web development, and growth services to SMBs. Full context: [docs/README.md](docs/README.md).

It is also where Anvio's **business operating knowledge** lives, so the same repo runs the company and the site. See [`.claude/README.md`](.claude/README.md).

---

## Before writing code

1. [`.claude/rules/code-style.md`](.claude/rules/code-style.md) and [`.claude/rules/styling.md`](.claude/rules/styling.md) — the checklists.
2. [docs/engineering/repo-structure.md](docs/engineering/repo-structure.md) §6 — "where does a new thing go". **If you can't find the file's home there, stop and ask rather than guessing.**
3. If touching a page, read its spec in `docs/specs/`. If touching sections, [`.claude/rules/sections.md`](.claude/rules/sections.md). If touching content, [`.claude/rules/content-authoring.md`](.claude/rules/content-authoring.md).

## Before answering a business question

Read [docs/business/](docs/business/) — positioning, ICP, services and pricing, current situation, competitors, voice. Then use the right agent from [`.claude/agents/`](.claude/agents/).

---

## Non-negotiables

**Honesty about what Anvio has.** No client names, no case studies, no results metrics, no traffic or ranking numbers, no implied team. None of these exist in a form that is cleared for use, and several carry legal or contractual exposure. This outranks being helpful — [`.claude/rules/evidence-and-claims.md`](.claude/rules/evidence-and-claims.md).

**Audit every plan before presenting it.** Against the long-term goal, the target customer, the services, and the current situation — and lead with where it _fails_. Check the two recurring traps: scoping for a team rather than one person with a day job, and assuming proof that doesn't exist. [`.claude/rules/strategy-audit.md`](.claude/rules/strategy-audit.md).

**No Tailwind arbitrary values.** `text-[#FF9130]`, `p-[37px]` fail CI and are blocked by a hook. If a value isn't a token in `apps/web/src/styles/tokens.css` / `globals.css` `@theme`, add the token — don't inline it. [design-system.md](docs/system/design-system.md).

**Sections own no vertical margin.** `<Section>` applies `--section-y`. A section component with `mt-*`/`mb-*` on its root is a bug.

**`'use client'` is opt-in, at the smallest leaf.** Server components by default — this is the whole SEO position. [tech-stack.md](docs/engineering/tech-stack.md) §1.

**Motion budget: 1 signature + 3–4 supporting scenes per page, max.** transform/opacity only; every animation needs a reduced-motion path and a mobile path. [motion-system.md](docs/system/motion-system.md).

**`ANTHROPIC_API_KEY` never reaches the client.** Server-side route handlers only, never a `NEXT_PUBLIC_` prefix.

**The agent-demo plan call requires a captured email — enforced server-side.** [ADR-0005](docs/engineering/adr/0005-agent-demo-model-and-email-gate.md); don't relax it in the UI without changing the route.

**A new section type needs a variant-first justification.** Check whether it's actually a new `variant` on an existing type. [ADR-0003](docs/engineering/adr/0003-section-registry-composition.md).

**One `<h1>` per page**, computed by `resolveHeadingLevel` from array position — never hardcode a heading tag inside a section.

**Never link to an unbuilt page.** This has caused live 404s twice. If the target doesn't exist, render the content without a link.

---

## Commits

Conventional Commits, enforced by commitlint. `<type>(<scope>): <subject>`, body explains _why_. **Run `pnpm verify` before committing, and never `--no-verify`.** [`.claude/rules/git-and-docs.md`](.claude/rules/git-and-docs.md).

**Don't push, open a PR, merge, force-push, tag, or touch production or the database without asking first.** Local commits on a feature branch are fine.

---

## When you're not sure

Check [docs/engineering/adr/](docs/engineering/adr/) before assuming — several non-obvious calls are already decided and reasoned there. If a decision you're about to make is a real fork (not obvious, expensive to reverse), propose writing a new ADR rather than picking silently.
