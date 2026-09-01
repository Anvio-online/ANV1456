import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo/constants'
import { contentRepository } from '@/lib/content'

/**
 * The companion to /llms.txt. Where that file is a *map* — links and
 * one-liners — this one is the full text of every published guide in a
 * single plain-text document, the `llms-full.txt` convention some sites
 * now ship alongside `llms.txt` (llmstxt.org). It exists so an AI
 * system can ingest the substance of the guides in one request
 * without crawling and rendering eight HTML pages.
 *
 * Generated from contentRepository like /llms.txt and sitemap.ts — a
 * new guide MDX file appears here with no code change.
 */
const abs = (path: string) => new URL(path, SITE_URL).toString()
const rule = '='.repeat(72)

export async function GET() {
  const guides = await contentRepository.list('guides')

  const header = [
    `# ${SITE_NAME} — full guide text`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '> India-first, also serving the UAE. This file is the complete body text of',
    `> every published guide on ${SITE_URL}, concatenated for machine reading.`,
    `> The canonical HTML version of each guide is linked under its title.`,
    '',
  ].join('\n')

  const body = guides
    .map((g) => {
      const updated = g.updatedAt.toISOString().slice(0, 10)
      return [
        rule,
        `## ${g.title}`,
        `URL: ${abs(`/guides/${g.slug}`)}`,
        `Category: ${g.category} · Updated: ${updated} · Author: ${g.author}`,
        '',
        g.content.trim(),
        '',
      ].join('\n')
    })
    .join('\n')

  return new Response(`${header}\n${body}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
