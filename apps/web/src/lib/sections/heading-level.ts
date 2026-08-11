/**
 * conventions.md §6: heading levels come from document order, never
 * hardcoded in a section component. The page's <h1> is the first
 * section that actually carries a top-level heading; every subsequent
 * one gets an <h2> unless it explicitly nests (not yet needed — flat
 * pages only so far).
 *
 * 'breadcrumb' is excluded from that count — content-layer.md §4: it's
 * a Tier 0 navigation trail with no heading role, and Phase 2 puts one
 * ahead of the hero on every page ≥2 levels deep (services-hub-spec.md
 * §1, and every hybrid/article page). Without this exclusion, index 0
 * would resolve to the breadcrumb and the hero — the section that must
 * carry the page's one real <h1> — would get demoted to <h2>.
 */

export type HeadingTag = 'h1' | 'h2'

const NON_HEADING_TYPES = new Set(['breadcrumb'])

export function resolveHeadingLevel(sections: { type: string }[], index: number): HeadingTag {
  const firstHeadingIndex = sections.findIndex((s) => !NON_HEADING_TYPES.has(s.type))
  return index === firstHeadingIndex ? 'h1' : 'h2'
}
