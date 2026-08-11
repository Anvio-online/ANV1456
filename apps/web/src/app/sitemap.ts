import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/constants'
import { contentRepository } from '@/lib/content'

/**
 * seo-strategy.md §8. Composed routes are literals; hybrid/article
 * routes (leaves, guides, industries) are generated from
 * contentRepository.list()/slugs() so a new MDX file publishes itself
 * here automatically — content-layer.md's whole point. case-studies
 * stays out until Wave 2 clears the Stratseek gate and has real
 * entries.
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
    '/guides',
    '/industries',
    '/tools/automation-roi-calculator',
    '/privacy',
    '/terms',
    '/cookies',
  ]

  const [services, guideSlugs, industrySlugs] = await Promise.all([
    contentRepository.list('services'),
    contentRepository.slugs('guides'),
    contentRepository.slugs('industries'),
  ])

  const routes = [
    ...staticRoutes,
    // Path built from each entry's own `pillar` rather than hardcoding
    // 'automate' — the Build leaf (website-development, Wave 3) lands
    // under a different pillar and this must not silently mislink it.
    ...services.map((s) => `/services/${s.pillar}/${s.slug}`),
    ...guideSlugs.map((slug) => `/guides/${slug}`),
    ...industrySlugs.map((slug) => `/industries/${slug}`),
  ]

  return routes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
  }))
}
