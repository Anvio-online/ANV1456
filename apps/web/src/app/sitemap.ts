import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/constants'

/**
 * seo-strategy.md §8. Phase 1 routes only — extend as pages land.
 * Content-driven routes (case studies, blog) should be appended here
 * from lib/content once that adapter has real entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/services', '/services/automate', '/about', '/contact']

  return routes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
  }))
}
