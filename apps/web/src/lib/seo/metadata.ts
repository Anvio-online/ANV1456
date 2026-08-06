import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from './constants'

/**
 * conventions.md §6: pages call this, never hand-write `export const
 * metadata`. Keeps canonical/OG/robots consistent across ~25 pages
 * without relying on nobody forgetting one.
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  noIndex?: boolean
}): Metadata {
  const url = new URL(path, SITE_URL).toString()

  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
