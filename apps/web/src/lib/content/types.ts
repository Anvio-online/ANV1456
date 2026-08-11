import type { Service, Guide, Industry, CaseStudy, Insight } from 'content-collections'

/**
 * content-layer.md §2. Mirrors the five content-collections.ts
 * collections one-to-one. `case-studies` (kebab, matching its route
 * and directory) maps to the `CaseStudy` type; content-collections'
 * own collection name is `caseStudies` (camelCase, a JS identifier
 * constraint) — this file is the one place that translation happens.
 */
export type ContentKind = 'services' | 'guides' | 'industries' | 'case-studies' | 'insights'

interface EntryMap {
  services: Service
  guides: Guide
  industries: Industry
  'case-studies': CaseStudy
  insights: Insight
}

export type Entry<K extends ContentKind> = EntryMap[K]
