import GithubSlugger from 'github-slugger'

export interface TocHeading {
  level: 2 | 3
  text: string
  id: string
}

/**
 * guides-spec.md §3 — "built from the body's ##/### headings at
 * compile time, not by scanning the DOM after hydration." A regex
 * pass over the raw MDX source, not the compiled output — cheap, and
 * avoids a second render pass just to read heading text back out.
 *
 * IDs use the same `github-slugger` package rehype-slug uses internally
 * (sections/rich-text/variants/mdx.tsx's rehypePlugins), and a fresh
 * GithubSlugger instance per call — required for its own duplicate-
 * heading disambiguation ("Overview", "Overview" → "overview",
 * "overview-1") to match what rehype-slug assigns to the same body.
 */
export function extractHeadings(source: string): TocHeading[] {
  const slugger = new GithubSlugger()
  const headings: TocHeading[] = []

  for (const line of source.split('\n')) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue
    const level = match[1]!.length as 2 | 3
    const text = match[2]!.trim()
    headings.push({ level, text, id: slugger.slug(text) })
  }

  return headings
}
