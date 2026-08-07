import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/constants'

/**
 * seo-strategy.md §8. Every route that actually resolves today —
 * extend as pages land. Content-driven routes (case studies, blog)
 * should be appended here from lib/content once that adapter has real
 * entries; '/services' (the hub) isn't built yet either, see
 * docs/README.md "Known gaps".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/contact',
    '/services/automate',
    '/services/build',
    '/services/grow',
  ]

  return routes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
  }))
}
