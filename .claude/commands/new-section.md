---
description: Add a section variant (or, with justification, a new section type) following the registry rules
argument-hint: '<what the section does, and which page needs it>'
---

Add a section for: $ARGUMENTS

Read `.claude/rules/sections.md` and `.claude/rules/styling.md` first.

**Start from the assumption that this is a new `variant`, not a new type.** ADR-0003 exists because that's usually true.

1. Read `docs/system/section-library.md` and `apps/web/src/lib/sections/registry.ts` — list the existing types and ask which one this is a variant of. Only if none fits, state plainly why a variant won't work.

2. **If it's a variant:** add `sections/<type>/variants/<name>.tsx` (default export), extend the variant union in `<type>.types.ts`. Nothing else changes.

3. **If it's genuinely a new type:** create the folder with `index.tsx` (variant switch only), `<type>.types.ts`, and `variants/`. Register it in `lib/sections/registry.ts`, export it from the barrel, and document it in `docs/system/section-library.md` in the same change.

4. **Non-negotiables while writing it:**
   - **No vertical margin on the root.** `<Section>` owns `--section-y`
   - **No arbitrary Tailwind values** — add a token if one is missing
   - Neutral colour aliases only (`--bg`, `--text`, `--accent-text`), never `--d-*`/`--l-*`, never a theme branch in JS
   - **Never hardcode a heading tag** — levels come from `resolveHeadingLevel`
   - Server component unless it genuinely needs interactivity; then `'use client'` on the smallest leaf
   - Copy comes from props, never hardcoded strings
   - Both themes, keyboard-operable, visible focus, 44×44px targets

5. Run `pnpm verify`, then verify it renders in the browser at 375 / 768 / 1280 — start the dev server and actually look, don't assume.
