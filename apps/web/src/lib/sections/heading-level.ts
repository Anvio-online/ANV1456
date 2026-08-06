/**
 * conventions.md §6: heading levels come from document order, never
 * hardcoded in a section component. The page's <h1> is the hero's
 * heading; every subsequent section with a `heading` prop gets an <h2>
 * unless it explicitly nests (not yet needed — flat pages only so far).
 */

export type HeadingTag = 'h1' | 'h2'

export function resolveHeadingLevel(index: number): HeadingTag {
  return index === 0 ? 'h1' : 'h2'
}
