import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/constants'

/**
 * seo-strategy.md §7 rule 8 — allow reputable AI crawlers. Blocking
 * them removes us from the GEO channel we're explicitly trying to win.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  }
}
