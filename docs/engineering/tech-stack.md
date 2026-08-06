# Anvio — Tech Stack

**Status:** v1, decided
**Principle:** boring where it doesn't differentiate, deliberate where it does.

Versions are pinned at scaffold time and recorded in `package.json` — this document records **choices and their reasons**, not version numbers. When a choice is reversed, write an [ADR](adr/) rather than silently editing this file.

---

## 1. Core

| Layer | Choice | Why this and not the alternative |
|---|---|---|
| Runtime | **Node.js**, current Active LTS, pinned in `.nvmrc` | Everyone runs the same Node. Unpinned Node is the most common "works on my machine". |
| Package manager | **pnpm**, pinned via `packageManager` + corepack | Workspaces without Turborepo overhead; strict node_modules catches phantom dependencies that npm hides. |
| Framework | **Next.js, App Router** | Server components keep marketing pages server-rendered by default — which is the whole SEO position. Static export can't run the agent demo; a SPA can't hit the LCP budget. |
| Language | **TypeScript**, `strict: true` | Non-negotiable. `any` requires a comment justifying it. |
| Styling | **Tailwind v4** with `@theme` mapping to `tokens.css` | CSS-first config means the design tokens live in one CSS file that both Tailwind and raw CSS consume. No duplicate token definitions. |
| Variants | **cva** + `tailwind-merge` + `clsx` | Component variants as data instead of string concatenation — the section library depends on this. |
| Motion | **Motion** (`motion`, the framer-motion successor) | Tier 1/2 scenes only. Tier 3/4 is plain CSS — see [motion-system.md](../system/motion-system.md) §6. |
| Smooth scroll | **Lenis** | Desktop pointer only, disabled on touch and under reduced-motion. |
| Content | **MDX**, read through a repository adapter | See §3. |
| Hosting | **Vercel** | Preview deploy per PR is worth more than the hosting cost, and it's the reference platform for App Router. |

**Explicitly not using:** a CSS-in-JS runtime (costs LCP), a component library like MUI/Chakra (fights the design system), Redux or similar (there is no global client state), GSAP (Motion covers what we need without the licence question).

---

## 2. Design tokens → Tailwind

Tokens are defined **once** as CSS custom properties in `apps/web/src/styles/tokens.css`, exactly as specified in [design-system.md](../system/design-system.md), then exposed to Tailwind via `@theme`. There is no `tailwind.config.js` colour palette — a second copy of the palette is a second source of truth.

Enforcement: `eslint-plugin-tailwindcss` with `no-arbitrary-value` on. `text-[#FF9130]` and `p-[37px]` fail CI. This one rule is what keeps 25 pages consistent.

---

## 3. Content layer — MDX behind an adapter

Content lives as typed MDX in `apps/web/content/`. **Pages never import MDX directly.** They call a repository interface:

```ts
// src/lib/content/index.ts — the contract
export interface ContentRepository {
  listCaseStudies(opts?: ListOpts): Promise<CaseStudy[]>
  getCaseStudy(slug: string): Promise<CaseStudy | null>
  listInsights(opts?: ListOpts): Promise<Insight[]>
  // …
}
export const content: ContentRepository = mdxRepository  // the only line that changes on migration
```

Frontmatter is validated with **Zod** at build time — a case study missing `results` fails the build, not the page.

**Why the adapter:** Phase 1 has two case studies and a handful of posts. A CMS now is infrastructure ahead of need. But when a non-developer needs to publish, swapping to Sanity or Payload should be one new file implementing `ContentRepository`, not a rewrite of every page. Contentlayer's abandonment is the cautionary tale — the adapter means any content tool we pick is replaceable.

Typed MDX loading uses **content-collections** (or velite) with Zod schemas. If that library dies too, only `mdxRepository` changes.

---

## 4. Data

| Concern | Choice | Notes |
|---|---|---|
| Database | **Neon Postgres** + **Drizzle ORM** | Leads and agent transcripts need durable storage — email-only lead capture loses leads silently. Drizzle over Prisma: no separate schema language, no query engine binary, smaller cold starts. |
| Rate limiting / cache | **Upstash Redis** | Serverless-native, generous free tier, and the right primitive for per-IP limits. A Postgres table for rate limiting works until it doesn't. |
| Migrations | `drizzle-kit`, committed to the repo | Migrations are code. Never hand-edit production. |
| Email | **Resend** + **React Email** | Templates as components, previewable in dev. |
| Forms | **React Hook Form** + **Zod**, submitted via **Server Actions** | One schema validates client and server. Never trust the client half. |

Both Neon and Upstash are portable — nothing here locks us to Vercel.

---

## 5. AI — the agent demo

The differentiator, so it's specified rather than left to implementation.

**SDK:** `@anthropic-ai/sdk`.
**Model:** **`claude-sonnet-5`** — 1M context, $3 / $15 per MTok ($2 / $10 introductory through 2026-08-31). Decided in [ADR-0005](adr/0005-agent-demo-model-and-email-gate.md), against `claude-opus-5` at $5 / $25.

**Two-call architecture, split by cost.** Do not try to stream a schema-constrained JSON blob and animate it — partial JSON makes a fragile demo. The split also happens to be the cost boundary, which is what the email gate keys off.

1. **Q&A turns → streamed text, `effort: low`.** The agent asks its 3–4 follow-ups. Cheap, and open to everyone — this is the part that makes the section feel like "try it, no call required".
2. **Plan generation → one structured call, `effort: medium`.** A single `messages.parse()` returns the plan as validated JSON. **This call requires a captured email.** The client animates the node diagram from the finished object, so the build-as-it-thinks effect is deterministic.

**The email gate** (ADR-0005): after the last follow-up, the panel shows *"Your plan is ready — where should we send it?"* The plan then renders **and** is emailed. Nobody consumes the expensive call without becoming a contactable lead. The gate sits at the highest-intent moment — after the visitor has already answered three or four questions — not at the door.

```ts
// Step 1 — streamed conversational turn
const stream = client.messages.stream({
  model: 'claude-opus-5',
  max_tokens: 4096,
  system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
  output_config: { effort: 'low' },   // latency matters more than depth for a follow-up question
  messages,
})
for await (const event of stream) {
  if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
    send(event.delta.text)
  }
}
const final = await stream.finalMessage()

// Step 2 — structured plan, validated before it reaches the client
const res = await client.messages.parse({
  model: 'claude-opus-5',
  max_tokens: 8192,
  output_config: { format: zodOutputFormat(AutomationPlanSchema), effort: 'medium' },
  messages,
})
const plan = res.parsed_output   // may be null — guard it
```

**Things that will bite if you don't know them:**

- **Thinking is on by default on `claude-opus-5`.** `max_tokens` caps thinking *plus* response text together, so a tight `max_tokens` truncates mid-answer. Use `output_config.effort` (`low` for the chat turns, `medium` for the plan) to control spend — do **not** reach for `thinking: {type: 'disabled'}`: on this model that can make it write a tool call as plain text or leak `<thinking>` tags into the output.
- **Check `stop_reason` before reading `content`.** Safety classifiers can decline a request and return HTTP 200 with `stop_reason: "refusal"` and empty content. Code that reads `content[0]` unconditionally crashes on it. Opt into server-side fallbacks (`fallbacks: "default"` with beta `server-side-fallback-2026-07-01`) so a decline is re-served instead of failing.
- **`parsed_output` can be null.** Guard it and fall back to `agentDemo:preview` — a broken-looking section is worse than a scripted one.
- **Prompt caching pays here.** The system prompt is identical on every request, and the cacheable minimum on `claude-opus-5` is 512 tokens. Put `cache_control: { type: 'ephemeral' }` on the last system block and keep the prompt byte-identical — no `new Date()`, no session ID interpolated into it. Verify with `usage.cache_read_input_tokens`; if it's zero across requests, something is invalidating the prefix.

**Guardrails (non-negotiable):**

| Control | Implementation |
|---|---|
| Key custody | Server-side route handler only. `ANTHROPIC_API_KEY` never reaches the client bundle — no `NEXT_PUBLIC_` prefix, ever. |
| Email gate | The plan call refuses without a captured email. Enforced server-side — the client-side form is UX, not the control. |
| Rate limiting | Upstash sliding window, per IP: **3 completed plans/hour, 10/day**, plus a separate lower cap on Q&A turns. There is no API-side spend cap — this is the only thing standing between you and a bill. |
| Spend alert | Monthly budget alert on the Anthropic account. The rate limit bounds one abuser; the alert catches everything else. |
| Token cap | Hard `max_tokens` per call and a max turn count per session, enforced server-side. |
| Output constraint | Zod schema via `output_config.format`. Never render free-text into the diagram. |
| Prompt versioning | System prompts live in `src/lib/ai/prompts/` as versioned files, reviewed like code. |
| Behaviour | Must decline off-topic requests and must never quote a firm price — ranges and "we'll confirm on a call" only. |
| Failure | Any error → `agentDemo:preview` fallback. Log the error; never show the user a stack trace or an empty panel. |
| Logging | Transcripts stored with a consent notice. Best product research the site will generate. |

---

## 6. Quality gates

| Concern | Tool | Runs |
|---|---|---|
| Lint | ESLint 9 flat config + `eslint-plugin-tailwindcss` | pre-commit + CI |
| Format | Prettier + `prettier-plugin-tailwindcss` | pre-commit |
| Types | `tsc --noEmit` | pre-commit + CI |
| Unit | Vitest | CI |
| E2E + visual | Playwright | CI |
| Accessibility | `@axe-core/playwright` | CI, on every page |
| Performance | Lighthouse CI against the budgets in [motion-system.md](../system/motion-system.md) §6 | CI, on preview URL |
| Bundle size | `size-limit`, per-route budget | CI |
| Errors | Sentry | production |
| Analytics | Plausible + GA4 + Vercel Analytics (RUM Web Vitals) | production |

**CI fails the build on:** type errors, lint errors, failing tests, a11y violations, Lighthouse below budget, or a route exceeding its JS budget. A green checkmark has to mean something or it means nothing.

---

## 7. Environment variables

Validated with Zod at startup in `src/lib/env.ts`. A missing variable fails the boot with a clear message, not a runtime `undefined` three pages deep.

```
# server-only — never prefixed NEXT_PUBLIC_
ANTHROPIC_API_KEY=
DATABASE_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RESEND_API_KEY=
SENTRY_AUTH_TOKEN=

# public — safe in the client bundle
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
NEXT_PUBLIC_GA_ID=
```

`.env.example` is committed and kept in sync. `.env*` (except `.example`) is gitignored. Secrets live in Vercel's env settings, never in the repo, never in a Slack message.

---

## 8. Deferred, with triggers

Don't build these yet. Do build them when the trigger fires.

| Thing | Build it when |
|---|---|
| CMS (Sanity / Payload) | A non-developer needs to publish, or content exceeds ~40 files |
| `packages/ui` extraction | A second app needs the design system |
| Turborepo + remote caching | CI exceeds ~5 minutes, or a third workspace appears |
| i18n / `hreflang` | Genuinely market-specific pages exist — not for one English site |
| Auth | A client portal or the Products surface needs it |
| Storybook | The component count passes ~40 |
