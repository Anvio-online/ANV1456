import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/constants'
import { contentRepository } from '@/lib/content'

/**
 * seo-strategy.md §8. Composed routes are literals; hybrid/article
 * routes (leaves, guides) are generated from contentRepository.slugs()
 * so a new MDX file publishes itself here automatically — content-
 * layer.md's whole point. case-studies and industries stay out until
 * Waves 2/4 add real entries.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
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

  const [services, guideSlugs] = await Promise.all([
    contentRepository.list('services'),
    contentRepository.slugs('guides'),
  ])

  const routes = [
    ...staticRoutes,
    // Path built from each entry's own `pillar` rather than hardcoding
    // 'automate' — the Build leaf (website-development, Wave 3) lands
    // under a different pillar and this must not silently mislink it.
    ...services.map((s) => `/services/${s.pillar}/${s.slug}`),
    ...guideSlugs.map((slug) => `/guides/${slug}`),
  ]

  return routes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
  }))
}
