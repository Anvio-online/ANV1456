import {
  allServices,
  allGuides,
  allIndustries,
  allCaseStudies,
  allInsights,
} from 'content-collections'
import type { ContentRepository, ListOptions } from './index'
import type { ContentKind, Entry } from './types'

/**
 * content-layer.md §2. The only file in the app that imports from
 * 'content-collections' (the generated output of content-collections.ts)
 * or knows content-collections exists at all. If the loader is ever
 * swapped, this file — and content-collections.ts itself — are the
 * only things that change; lib/content/index.ts's interface doesn't.
 */
const collections: { [K in ContentKind]: Entry<K>[] } = {
  services: allServices,
  guides: allGuides,
  industries: allIndustries,
  'case-studies': allCaseStudies,
  insights: allInsights,
}

function isDraft(entry: { draft: boolean }): boolean {
  return entry.draft && process.env.NODE_ENV === 'production'
}

function matchesWhere(entry: Record<string, unknown>, where: ListOptions['where']): boolean {
  if (!where) return true
  return Object.entries(where).every(([key, values]) => {
    if (!values) return true
    const field = entry[key]
    if (Array.isArray(field)) return field.some((v) => values.includes(v))
    if (typeof field === 'string') return values.includes(field)
    return false
  })
}

export const mdxContentRepository: ContentRepository = {
  async list(kind, opts) {
    let entries = collections[kind].filter((e) => !isDraft(e))
    if (opts?.featured) {
      entries = entries.filter((e) => 'featured' in e && (e as { featured?: boolean }).featured)
    }
    if (opts?.where) {
      entries = entries.filter((e) => matchesWhere(e as Record<string, unknown>, opts.where))
    }
    entries = [...entries].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    if (opts?.limit) entries = entries.slice(0, opts.limit)
    return entries
  },

  async get(kind, slug) {
    const entry = collections[kind].find((e) => e.slug === slug && !isDraft(e))
    return entry ?? null
  },

  async slugs(kind) {
    return collections[kind].filter((e) => !isDraft(e)).map((e) => e.slug)
  },
}
