# Sections and page composition

From [section-library.md](../../docs/system/section-library.md) and [ADR-0003](../../docs/engineering/adr/0003-section-registry-composition.md).

---

## The two hard rules

**Sections own no vertical margin.** `<Section>` applies `--section-y`. A section component with `mt-*` / `mb-*` / `my-*` on its root is a bug — that constraint is what makes reordering safe. A hook warns on this; the warning is usually right.

**A new section type needs a variant-first justification.** Before creating `sections/<new-type>/`, establish that it is not a new `variant` on an existing type. Adding a variant means extending the variant union in `<type>.types.ts` and nothing else. Adding a type means registering it, documenting it in section-library.md, and defending why a variant wouldn't do.

---

## Shape of a section folder

```
sections/<type>/
├─ index.tsx            # variant switch, nothing else
├─ <type>.types.ts      # the props + the variant union
└─ variants/<name>.tsx  # default-exports the component
```

Sections are **reusable by definition**. Anything only one page needs does not belong here.

## Headings

**One `<h1>` per page**, computed by `resolveHeadingLevel` from the section's array position. **Never hardcode a heading tag inside a section component.** Levels never skip.

## Adding a page

1. `app/(marketing)/…/page.tsx` with its `sections` array
2. Metadata + schema from the typed builders in `lib/seo/` — a hand-written `export const metadata` fails review
3. It appears in `sitemap.ts` (static routes are a literal array; content-driven routes generate from `contentRepository`)
4. Internal links per [seo-strategy.md](../../docs/system/seo-strategy.md) §5

## Never link to an unbuilt page

A link to a route that doesn't resolve is a live 404 waiting for a visitor. This has already happened twice in this repo. If the target page doesn't exist, render the content **without** a link — `href` is optional on the card components for exactly this reason.

Applies to `nav.tsx`, `footer.tsx`, `sitemap.ts`, `relatedLinks` frontmatter, and inline MDX body links.
