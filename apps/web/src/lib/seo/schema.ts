import { SITE_NAME, SITE_URL } from './constants'

/**
 * seo-strategy.md §6. Typed builders — never hand-written JSON-LD per
 * page. Render with:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [] as string[],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  }
}

export function serviceSchema({
  name,
  description,
  serviceType,
  path,
}: {
  name: string
  description: string
  serviceType: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: new URL(path, SITE_URL).toString(),
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

/** about-spec.md / contact-spec.md — both want `@type: AboutPage` /
 * `ContactPage` rather than the generic WebPage. Same shape either way,
 * one builder with the type as a parameter rather than two near-
 * identical functions. */
export function webPageSchema({
  type,
  name,
  description,
  path,
}: {
  /** 'WebPage' is legal-spec.md's fallback — schema.org has no
   * dedicated Privacy/Terms/Cookies type, and inventing one via
   * additionalType is more machinery than three reference pages need. */
  type: 'AboutPage' | 'ContactPage' | 'WebPage'
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: new URL(path, SITE_URL).toString(),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/** content-layer.md §4 — guides and case studies, both needing named
 * authorship and dates for GEO's provenance argument
 * (seo-strategy.md §7.5), which a generic WebPage doesn't carry. */
export function articleSchema({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  path,
}: {
  headline: string
  description: string
  author: string
  datePublished: Date
  dateModified: Date
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: { '@type': 'Person', name: author },
    datePublished: datePublished.toISOString(),
    dateModified: dateModified.toISOString(),
    url: new URL(path, SITE_URL).toString(),
  }
}

/** content-layer.md §4 — /guides and /case-studies indexes. */
export function collectionPageSchema({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: new URL(path, SITE_URL).toString(),
  }
}

/** content-layer.md §4 — /tools/[slug]. Free tools, so `offers` is
 * always a fixed zero-price Offer rather than a parameter. */
export function softwareApplicationSchema({
  name,
  description,
  applicationCategory,
  path,
}: {
  name: string
  description: string
  applicationCategory: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    url: new URL(path, SITE_URL).toString(),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  }
}
