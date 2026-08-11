import type { ContentKind, Entry } from './types'
import { mdxContentRepository } from './mdx'

export type { ContentKind, Entry } from './types'

export interface ListOptions {
  featured?: boolean
  /** e.g. { services: ['whatsapp-automation'] } — used to resolve
   * cross-links such as a case study's related service pages. */
  where?: Partial<Record<string, string[]>>
  limit?: number
}

/**
 * content-layer.md §2. ADR-0002: pages never import content/ or the
 * MDX loader directly — always through this interface, so the
 * implementation (currently content-collections, lib/content/mdx.ts)
 * can be swapped without touching a single page.
 */
export interface ContentRepository {
  /** All published entries of a kind, newest `publishedAt` first.
   * Drafts excluded outside development. */
  list<K extends ContentKind>(kind: K, opts?: ListOptions): Promise<Entry<K>[]>
  /** One entry, or null. Never throws on a missing slug — callers call
   * notFound() themselves. */
  get<K extends ContentKind>(kind: K, slug: string): Promise<Entry<K> | null>
  /** Slugs only, for generateStaticParams. */
  slugs(kind: ContentKind): Promise<string[]>
}

export const contentRepository: ContentRepository = mdxContentRepository
