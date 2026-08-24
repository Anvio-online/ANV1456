# Styling

From [design-system.md](../../docs/system/design-system.md) and [conventions.md](../../docs/engineering/conventions.md) §3–§4.

---

## The non-negotiable

**No Tailwind arbitrary values.** `text-[#FF9130]`, `p-[37px]`, `w-[413px]` fail CI and are blocked by a `PostToolUse` hook.

If a value isn't already a token in `apps/web/src/styles/tokens.css` or the `globals.css` `@theme` block, **add the token** — don't inline the value. That is the entire point of having tokens.

Variant selectors are not arbitrary values and are fine: `data-[state=open]:`, `group-[…]:`, `peer-[…]:`, `has-[…]:`, `supports-[…]:`, `min-[…]:`, `max-[…]:`.

## Utilities only

- No `style={{}}` except genuinely dynamic values — a computed `transform`, a CSS variable set from JS
- Compose class strings with `cn()` (clsx + tailwind-merge). **Never template-literal concatenation** — merge order matters
- Variants via `cva`, colocated with the component

## Theme

Components consume **neutral aliases** — `--bg`, `--text`, `--accent-text` — never `--d-*` or `--l-*` directly, and **never branch on theme in JS**. That is what makes a section droppable onto either canvas.

## Motion

- **`transform` and `opacity` only.** Never animate `width`, `height`, `top`, `left`, `box-shadow`, or `filter` in a loop
- `will-change` set on interaction start, removed on end — never left in a stylesheet
- Every animation has a `prefers-reduced-motion` path **and** a mobile path, both tested
- Offscreen animation is paused via `IntersectionObserver`
- Tier 1 scenes are `dynamic(…, { ssr: false })` and gated on intersection
- **No text inside canvas or WebGL.** All copy is server-rendered DOM
- **Budget: 1 signature scene + 3–4 supporting scenes per page, max** — [motion-system.md](../../docs/system/motion-system.md)

## Accessibility floor

Semantic HTML first (`<div onClick>` is a bug) · visible focus everywhere (`outline: none` without a replacement fails review) · contrast per the verified table in design-system.md §2.3 · meaning never carried by colour alone · hit targets ≥ 44×44px · every interactive graphic has a DOM text equivalent · descriptive `alt`, or `alt=""` when decorative, never missing.
