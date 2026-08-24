# Anvio — Repository Structure

**Status:** v1
**Shape:** pnpm workspace, one app today, room for more without a migration.

---

## 1. The rule that matters most

**Every file has one obvious home, decided before it is written.** If you can't name the directory a file belongs in, that's a signal the file shouldn't exist yet — or that a new directory needs a documented purpose in this file first.

Adding a top-level directory is a change to this document. Adding a file inside an existing directory is not.

---

## 2. Tree

```
anvio/
├─ .github/
│  ├─ workflows/
│  │  ├─ ci.yml                    # typecheck · lint · test · build · size
│  │  └─ quality.yml               # lighthouse · axe, against the preview URL
│  ├─ PULL_REQUEST_TEMPLATE.md
│  └─ dependabot.yml
├─ .husky/                          # pre-commit → lint-staged; commit-msg → commitlint
│
├─ apps/
│  └─ web/
│     ├─ src/
│     │  ├─ app/                    # routes only — no business logic, no components
│     │  │  ├─ (marketing)/
│     │  │  │  ├─ layout.tsx        # Nav + Footer
│     │  │  │  ├─ page.tsx                                  /
│     │  │  │  ├─ services/
│     │  │  │  │  ├─ page.tsx                               /services
│     │  │  │  │  └─ [pillar]/
│     │  │  │  │     ├─ page.tsx                            /services/automate
│     │  │  │  │     └─ [service]/page.tsx                  /services/automate/ai-chatbot-development
│     │  │  │  ├─ industries/{page.tsx,[slug]/page.tsx}
│     │  │  │  ├─ case-studies/{page.tsx,[slug]/page.tsx}
│     │  │  │  ├─ projects/page.tsx
│     │  │  │  ├─ products/{page.tsx,[slug]/page.tsx}
│     │  │  │  ├─ blog/{page.tsx,[slug]/page.tsx}
│     │  │  │  ├─ guides/[slug]/page.tsx
│     │  │  │  ├─ tools/[slug]/page.tsx
│     │  │  │  ├─ about/page.tsx
│     │  │  │  └─ contact/page.tsx
│     │  │  ├─ (legal)/{privacy,terms,cookies}/page.tsx
│     │  │  ├─ api/
│     │  │  │  └─ agent/route.ts    # the only long-running route
│     │  │  ├─ layout.tsx           # html/body, fonts, analytics, Organization schema
│     │  │  ├─ not-found.tsx
│     │  │  ├─ error.tsx
│     │  │  ├─ opengraph-image.tsx
│     │  │  ├─ sitemap.ts
│     │  │  └─ robots.ts
│     │  │
│     │  ├─ sections/               # THE SECTION LIBRARY — one folder per type
│     │  │  ├─ hero/
│     │  │  │  ├─ index.tsx         # variant switch, nothing else
│     │  │  │  ├─ hero.types.ts
│     │  │  │  └─ variants/{centered-statement,split-visual,page-lead,case-lead}.tsx
│     │  │  ├─ services/  problem/  process/  work-graph/  agent-demo/
│     │  │  ├─ featured-work/  engagement-model/  why-us/  industries/
│     │  │  ├─ integrations/  faq/  insights/  cta-closing/  …
│     │  │  └─ index.ts             # barrel — the registry imports from here
│     │  │
│     │  ├─ scenes/                 # Tier 1 only. Dynamically imported, ssr: false
│     │  │  ├─ process-pin/
│     │  │  └─ workflow-graph/
│     │  │
│     │  ├─ components/
│     │  │  ├─ ui/                  # Button, Card, Badge, Input, Accordion, Marquee, Chip
│     │  │  ├─ motion/              # FadeUp, MaskReveal, CounterRoll, NodeCascade, PathPulse
│     │  │  └─ layout/              # Nav, Footer, Container, Section, Grid
│     │  │
│     │  ├─ lib/
│     │  │  ├─ sections/            # registry.ts · renderer.tsx · types.ts · heading-level.ts
│     │  │  ├─ content/             # index.ts (interface) · mdx.ts (impl) · schemas.ts
│     │  │  ├─ seo/                 # metadata.ts · schema.ts · constants.ts
│     │  │  ├─ ai/                  # client.ts · plan.ts · prompts/ · schemas.ts
│     │  │  ├─ db/                  # schema.ts · client.ts · queries/
│     │  │  ├─ rate-limit/          # index.ts (Upstash)
│     │  │  ├─ analytics/           # events.ts — the typed event map
│     │  │  ├─ env.ts               # Zod-validated environment
│     │  │  └─ utils/               # cn.ts · format.ts · slug.ts
│     │  │
│     │  ├─ styles/
│     │  │  ├─ tokens.css           # the single source of truth for design tokens
│     │  │  └─ globals.css
│     │  └─ types/
│     │
│     ├─ content/                   # MDX — see §5
│     │  ├─ case-studies/  insights/  guides/  industries/  services/
│     ├─ public/
│     │  ├─ fonts/                  # self-hosted woff2, subset
│     │  ├─ images/  icons/  llms.txt
│     ├─ tests/
│     │  ├─ e2e/  unit/  fixtures/
│     ├─ drizzle/                   # generated migrations, committed
│     ├─ next.config.ts  tsconfig.json  vitest.config.ts  playwright.config.ts
│     └─ package.json
│
├─ packages/                        # empty until a trigger fires — see tech-stack.md §8
│
├─ docs/
│  ├─ README.md                     # index — start here
│  ├─ Initial/                      # brand, IA, scope, original wireframes
│  ├─ business/                     # positioning · icp · services-and-pricing · current-situation · competitors · voice
│  ├─ system/                       # design-system · motion-system · section-library · seo-strategy
│  ├─ specs/                        # home-spec · automate-spec · …
│  └─ engineering/                  # tech-stack · repo-structure · conventions · workflow · adr/
│
├─ .claude/                         # how the team works — see ADR-0007
│  ├─ README.md
│  ├─ settings.json                 # permissions + hook wiring
│  ├─ launch.json                   # dev-server config
│  ├─ rules/                        # modular conventions, linked from CLAUDE.md
│  ├─ agents/                       # the nine specialist roles
│  ├─ commands/                     # /ship · /weekly · /find-leads · …
│  ├─ skills/                       # anvio-brand-voice · lead-qualification · proposal-builder
│  └─ hooks/                        # check-secrets · check-git-safety · check-styles
│
├─ ops/                             # agent output, dated. See .claude/rules/agent-outputs.md
│  ├─ strategy/  growth/  content/  seo/  templates/     # tracked
│  └─ leads/  outreach/  meetings/  proposals/           # GITIGNORED — personal + client-confidential
│
├─ CHANGELOG.md
├─ CLAUDE.md                        # conventions summary for AI assistants
├─ README.md                        # setup + scripts, ~1 page, links into docs/
├─ pnpm-workspace.yaml
├─ package.json
├─ .nvmrc  .editorconfig  .gitignore  .env.example
```

---

## 3. What each directory is for — and what it must not contain

| Directory | Contains | Never contains |
|---|---|---|
| `app/` | Route files, metadata exports, page composition arrays | Components, business logic, data fetching implementations |
| `sections/` | Page-level sections from [section-library.md](../system/section-library.md) | Anything a single page needs. Sections are reusable by definition |
| `scenes/` | Tier 1 signature animations only | Anything in the initial bundle. All four scenes are `dynamic(..., { ssr: false })` |
| `components/ui/` | Primitives with no domain knowledge | The word "Anvio". A Button doesn't know what business it's for |
| `components/motion/` | The primitives named in [motion-system.md](../system/motion-system.md) §3 | Section-specific animation. If it's used once, it belongs in that section |
| `lib/` | Pure logic, adapters, typed clients | JSX. If it renders, it isn't lib |
| `content/` | MDX with validated frontmatter | Anything a page imports directly — always go through `lib/content` |
| `styles/` | `tokens.css` and `globals.css`. That's it | Component styles. Those are Tailwind classes on the component |
| `docs/business/` | The factual base — positioning, ICP, pricing, situation, competitors, voice | Behaviour or instructions. Those are `.claude/rules/` |
| `.claude/` | Rules, agents, commands, skills, hooks — how the team works | Business *facts*. Those live once, in `docs/business/`, and are read from there |
| `ops/` | Dated agent deliverables | Anything the product imports. Four of its subdirectories hold PII and are gitignored |

**The layering rule:** `app/` → `sections/` → `components/` → `lib/`. Dependencies point one direction. A `component` importing from `sections/` is a design error; a `lib` importing JSX is a design error. Enforced by `eslint-plugin-boundaries`.

---

## 4. File naming

| Kind | Convention | Example |
|---|---|---|
| Component files | `kebab-case.tsx`, default-exporting a `PascalCase` component | `agent-demo/variants/full.tsx` → `AgentDemoFull` |
| Non-component modules | `kebab-case.ts` | `lib/seo/metadata.ts` |
| Types-only files | `*.types.ts` | `hero.types.ts` |
| Tests | `*.test.ts` colocated, or `tests/e2e/*.spec.ts` | |
| MDX content | `kebab-case.mdx`, filename **is** the URL slug | `baladi-food-stuff.mdx` → `/case-studies/baladi-food-stuff` |
| CSS | `kebab-case.css` | `tokens.css` |

`index.ts` is a barrel export only — never implementation. Path alias is `@/*` → `apps/web/src/*`; no `../../..` beyond one level.

---

## 5. Content files

Every MDX file has Zod-validated frontmatter. Adding a field means updating `lib/content/schemas.ts` first.

```mdx
---
title: "A catalogue their buyers could actually navigate"
client: "Baladi Food Stuff"
clientDisplay: "Baladi Food Stuff"        # or an anonymized string if NDA'd
attribution: "partner-agency"             # direct | partner-agency
industry: "FMCG Distribution"
region: "UAE"
services: ["web-development", "ecommerce"]
problem: "Wholesale buyers couldn't find products across a 2,000-SKU catalogue."
results:
  - metric: "—"
    label: "—"
stack: ["Next.js", "Shopify"]
featured: true
publishedAt: 2026-02-14
updatedAt: 2026-02-14
---
```

`attribution` exists because of the Stratseek white-label question — the card renders "Delivered via partner agency" from this field rather than from a hardcoded string, so the honest framing is structural, not something a future edit can quietly drop.

---

## 6. Where a new thing goes

| You're adding… | It goes in | And you must also |
|---|---|---|
| A new page | `app/(marketing)/…/page.tsx` | Add its `sections` array; add metadata + schema; add to `sitemap.ts`; add internal links per [seo-strategy.md](../system/seo-strategy.md) §5 |
| A new section **variant** | `sections/<type>/variants/` | Extend the variant union in `<type>.types.ts`. **Try this before a new type.** |
| A new section **type** | `sections/<new-type>/` | Register in `lib/sections/registry.ts`, document in [section-library.md](../system/section-library.md), and justify why a variant wouldn't do |
| A UI primitive | `components/ui/` | Both themes, both a11y states, no domain knowledge |
| An animation primitive | `components/motion/` | Reduced-motion + mobile path, documented in [motion-system.md](../system/motion-system.md) §3 |
| A case study or post | `content/<kind>/<slug>.mdx` | Frontmatter passing the Zod schema |
| A business fact (pricing, ICP, positioning) | `docs/business/` | State it **once**. If it also lives in code, name the code as canonical |
| A rule an assistant must follow | `.claude/rules/` | Link the `docs/` page that reasons about it; add a row to `.claude/rules/README.md` |
| A specialist role | `.claude/agents/` | Have it *read* `docs/business/` — never restate facts inside the agent file |
| A repeatable workflow | `.claude/commands/` (short) or `.claude/skills/` (needs its own reference material) | Add it to `.claude/README.md` |
| An agent deliverable | `ops/<area>/YYYY-MM-DD-slug.md` | Provenance frontmatter. If it names individuals, it goes in a gitignored subdirectory |
| Anything else | **Stop.** Decide the home, add it to §3 in this file, then write the file | |

---

## 7. Scripts

```jsonc
{
  "dev":        "pnpm --filter web dev",
  "build":      "pnpm --filter web build",
  "start":      "pnpm --filter web start",
  "typecheck":  "tsc --noEmit",
  "lint":       "eslint . --max-warnings 0",
  "format":     "prettier --write .",
  "test":       "vitest run",
  "test:e2e":   "playwright test",
  "test:a11y":  "playwright test --grep @a11y",
  "size":       "size-limit",
  "db:generate":"drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "verify":     "pnpm typecheck && pnpm lint && pnpm test && pnpm build"
}
```

`pnpm verify` is what CI runs. Run it before opening a PR and CI holds no surprises.
