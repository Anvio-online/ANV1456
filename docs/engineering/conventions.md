# Anvio — Code Conventions

**Status:** v1
**Purpose:** make the code boring enough that changing it is safe.

Anything here that a linter can enforce, a linter enforces. Anything it can't, code review does.

---

## 1. TypeScript

- `strict: true`, plus `noUncheckedIndexedAccess` and `noImplicitOverride`.
- **`any` requires a comment justifying it.** `unknown` + a narrowing guard is almost always the answer.
- `type` for object shapes and unions; `interface` only when declaration merging is actually needed.
- Prefer discriminated unions over optional-field soup:
  ```ts
  // no
  type Section = { type: string; heading?: string; variant?: string; nodes?: Node[] }
  // yes
  type Section = HeroSection | ServicesSection | WorkflowGraphSection
  ```
- Derive, don't duplicate: `type CaseStudy = z.infer<typeof caseStudySchema>`. One source of truth per shape.
- No enums — use `as const` objects and `typeof X[keyof typeof X]`.
- Exported functions get explicit return types. Inference is fine internally; it's a poor API contract.
- Errors are typed and handled. A bare `catch (e) {}` fails review.

---

## 2. React & Next.js

**Server by default.** `'use client'` is opt-in, at the smallest possible leaf, and every one is a deliberate decision — it moves code into the bundle the LCP budget is measured against.

- Push `'use client'` down. A section with one interactive button marks the *button* as a client component, not the section.
- No data fetching in client components. Fetch on the server, pass as props.
- `async` server components for anything touching `lib/content` or `lib/db`.
- Server Actions for mutations (forms). Validate with the same Zod schema the client uses — **the client half is a UX affordance, not a security boundary**.
- `Suspense` around anything slow, with a real skeleton that reserves the right dimensions. A layout-shifting skeleton is worse than no skeleton.
- `next/image` always, with `sizes`. `priority` on the LCP image, nothing else.
- `next/link` for internal navigation. A bare `<a>` to an internal route is a bug.

**Component shape:**

```tsx
type Props = {
  heading: string
  items: readonly Item[]
  theme?: Theme
}

export function ThingList({ heading, items, theme = 'dark' }: Props) {
  // early returns first
  if (items.length === 0) return null
  return (/* … */)
}
```

Props are destructured with defaults in the signature. No `React.FC`. No default exports except route files and section variants (where the registry expects them).

---

## 3. Styling

- **Tailwind utilities only.** No `style={{}}` except for genuinely dynamic values (a computed `transform`, a CSS variable set from JS).
- **No arbitrary values.** `text-[#FF9130]`, `p-[37px]`, `w-[413px]` fail CI. If the value isn't in [design-system.md](../system/design-system.md), it doesn't go in the code — that's the whole point of having tokens.
- Class strings composed with `cn()` (clsx + tailwind-merge). Never template-literal concatenation — merge order matters.
- Variants via `cva`, colocated with the component:
  ```ts
  const button = cva('inline-flex items-center justify-center rounded-md …', {
    variants: { intent: { primary: '…', secondary: '…' }, size: { sm: '…', md: '…', lg: '…' } },
    defaultVariants: { intent: 'primary', size: 'md' },
  })
  ```
- Components consume **neutral aliases** (`--bg`, `--text`, `--accent-text`), never `--d-*` or `--l-*` directly, and never branch on theme in JS. That's what makes a section droppable onto either canvas.
- **Sections own no vertical margin.** The renderer applies `--section-y`. This is what makes reordering safe.

---

## 4. Motion

Restating from [motion-system.md](../system/motion-system.md) because it's where discipline slips:

- `transform` and `opacity` only. Never animate `width`, `height`, `top`, `left`, `box-shadow`, or `filter` in a loop.
- `will-change` set on interaction start, removed on end. Never left in a stylesheet.
- Every animation has a `prefers-reduced-motion` path and a mobile path. Both tested, not assumed.
- Anything offscreen is paused (`IntersectionObserver`).
- Tier 1 scenes are `dynamic(..., { ssr: false })` and gated on intersection.
- **No text inside canvas or WebGL.** All copy is server-rendered DOM.

---

## 5. Data & content

- Every external input — MDX frontmatter, form bodies, API responses, env vars — is Zod-validated at the boundary. Inside the boundary, types are trusted.
- Pages call `lib/content`, never `import`.
- Database access goes through `lib/db/queries/*`. No inline Drizzle in a component.
- Server Actions: validate → rate limit → act → revalidate. In that order.

---

## 6. SEO

- Metadata via the typed builders in `lib/seo/`. A hand-written `export const metadata` in a page file fails review — that's how a canonical goes missing on one route and nobody notices for six months.
- One `<h1>` per page. Heading levels never skip. The renderer computes levels from document order — sections never hardcode `<h2>`.
- Every page emits its schema from `lib/seo/schema.ts`.
- All copy is real, server-rendered text.
- Descriptive link anchors. "Learn more" as the only anchor text fails review.

---

## 7. Accessibility

Non-negotiable, and CI checks it with `@axe-core/playwright`:

- Semantic HTML first. `<div onClick>` is a bug; use `<button>`.
- Visible focus everywhere. `outline: none` without a replacement fails review.
- Contrast per the verified table in [design-system.md](../system/design-system.md) §2.3.
- Meaning never carried by colour alone.
- Hit targets ≥ 44×44px.
- Every interactive graphic has a DOM text equivalent.
- Images: descriptive `alt`, or `alt=""` when decorative. Never a missing `alt`.

---

## 8. Naming

| Thing | Convention |
|---|---|
| Components | `PascalCase`, describing what it *is* — `WorkflowGraph`, not `Graph2` |
| Hooks | `useThing` |
| Booleans | `isX` / `hasX` / `shouldX` |
| Handlers | `handleX` locally, `onX` as a prop |
| Constants | `SCREAMING_SNAKE` at module scope |
| Section ids | `kebab-case`, stable — analytics events are keyed to them, so renaming one breaks historical data |
| Analytics events | `snake_case`, in the typed map in `lib/analytics/events.ts` |

---

## 9. Comments

Comment the **why**, never the what. `// increment i` is noise; `// Stagger caps at 6 — beyond that the last item reads as broken` is worth keeping.

Every non-obvious constant gets a one-line reason. `const MAX_STAGGER_CHILDREN = 6` should say why it's 6.

No commented-out code. Git remembers.
No `TODO` without a name and a date: `// TODO(anshika, 2026-09): replace with CMS adapter`.

---

## 10. Definition of done

A change is done when:

- [ ] `pnpm verify` passes locally
- [ ] Both themes render correctly (for anything visual)
- [ ] Tested at 375 / 768 / 1280 / 1920
- [ ] Reduced-motion and mobile-degradation paths work
- [ ] Keyboard-operable with visible focus
- [ ] No arbitrary Tailwind values, no unjustified `any`
- [ ] Route still within its JS budget
- [ ] Copy comes from props or content, not hardcoded strings
- [ ] Docs updated if a decision or contract changed
- [ ] CHANGELOG entry if user-visible

---

## 11. Review

Reviewers check, in order: **correctness → accessibility → performance → consistency → style.** A PR that's stylistically perfect and inaccessible does not merge; a PR that's correct and accessible with a naming quibble does.

Blocking: security issues, a11y violations, budget regressions, missing validation on external input, arbitrary Tailwind values, silent error swallowing.

Non-blocking (comment, don't block): naming preferences, structural opinions where both work, anything that would be a separate refactor.
