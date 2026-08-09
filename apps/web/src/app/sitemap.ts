import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/constants'

/**
 * seo-strategy.md §8. Every route that actually resolves today —
 * extend as pages land. Content-driven routes (case studies, guides)
 * should be appended here from lib/content once that adapter has real
 * entries (content-layer.md) — not yet built, so not listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/contact',
    '/services',
    '/services/automate',
    '/services/build',
    '/services/grow',
    '/projects',
    '/privacy',
    '/terms',
    '/cookies',
  ]

  return routes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
  }))
}
