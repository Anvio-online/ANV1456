import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/constants'

/**
 * seo-strategy.md §7 rule 8 — allow reputable AI crawlers. Blocking
 * them removes us from the GEO channel we're explicitly trying to win.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/admin', '/api/'] },
    ],
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  }
}
