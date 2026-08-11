# Code style

Condensed from [conventions.md](../../docs/engineering/conventions.md) §1–§2 and §8–§9. **Read the full doc when doing anything non-trivial** — this is the checklist, not the reasoning.

---

## TypeScript

- `strict`, plus `noUncheckedIndexedAccess` and `noImplicitOverride`
- **`any` needs a comment justifying it.** `unknown` + a narrowing guard is nearly always right
- `type` for shapes and unions; `interface` only for real declaration merging
- **Discriminated unions over optional-field soup**
- **Derive, don't duplicate** — `type X = z.infer<typeof xSchema>`
- No enums — `as const` objects + `typeof X[keyof typeof X]`
- Exported functions get explicit return types
- A bare `catch (e) {}` fails review

## React / Next

- **Server components by default.** `'use client'` is opt-in, at the smallest leaf, and each one is a deliberate decision — it moves code into the bundle the LCP budget is measured against
- A section with one interactive button marks **the button**, not the section
- No data fetching in client components. Fetch on the server, pass props
- Server Actions for mutations: **validate → rate limit → act → revalidate**, in that order. The client-side validation is a UX affordance, not a security boundary
- `next/image` always, with `sizes`. `priority` on the LCP image only
- `next/link` for internal navigation — a bare `<a>` to an internal route is a bug
- Props destructured with defaults in the signature. No `React.FC`. No default exports except route files and section variants

## Boundaries

`app/` → `sections/` → `components/` → `lib/`. Dependencies point one way. `lib/` never renders JSX; `components/` never imports from `sections/`.

## Naming

`PascalCase` components describing what a thing _is_ · `useThing` hooks · `isX`/`hasX`/`shouldX` booleans · `handleX` locally, `onX` as a prop · `SCREAMING_SNAKE` module constants · **`kebab-case` section ids that never change** (analytics is keyed to them) · `snake_case` analytics events in `lib/analytics/events.ts`

Files are `kebab-case.tsx`. `index.ts` is a barrel export only, never implementation. Path alias `@/*`; no `../../..` beyond one level.

## Comments

Comment the **why**, never the what. Every non-obvious constant gets a one-line reason. No commented-out code. No `TODO` without a name and a date: `// TODO(anshika, 2026-09): …`

## Where a new file goes

[repo-structure.md](../../docs/engineering/repo-structure.md) §6. **If you can't find its home there, stop and ask** — don't guess.
