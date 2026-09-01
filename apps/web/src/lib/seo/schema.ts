import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_CONTACT_EMAIL,
  SITE_AREA_SERVED,
} from './constants'

/**
 * seo-strategy.md §6. Typed builders — never hand-written JSON-LD per
 * page. Render with:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */

/** The @id every other schema on the site points `provider` / `publisher`
 * at, so an extractor resolves them to one entity rather than several
 * loose Organization stubs. seo-strategy.md §6: this is GEO
 * infrastructure — how a machine learns who Anvio is. */
export const ORGANIZATION_ID = `${SITE_URL}#organization`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    // Wordmark is the only brand mark that exists as a file today; SVG
    // is accepted by Google's logo guidelines since 2023.
    logo: new URL('/images/logo-wordmark.svg', SITE_URL).toString(),
    image: new URL('/images/og-image.png', SITE_URL).toString(),
    areaServed: [...SITE_AREA_SERVED],
    knowsAbout: [
      'AI automation',
      'Business process automation',
      'AI agents',
      'Chatbot development',
      'Web development',
      'Ecommerce development',
      'Search engine optimization',
      'Generative engine optimization',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONTACT_EMAIL,
      contactType: 'customer support',
      areaServed: [...SITE_AREA_SERVED],
      availableLanguage: ['English'],
    },
    // Verified Anvio profiles only. Add LinkedIn / GitHub here when they
    // exist — never a guessed handle (evidence-and-claims.md).
    sameAs: ['https://www.instagram.com/anvio.online/'],
  }
}

export const WEBSITE_ID = `${SITE_URL}#website`

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORGANIZATION_ID },
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
    // seo-strategy.md §6 — Service carries areaServed; provider resolves
    // to the one Organization @id rather than repeating a stub.
    areaServed: [...SITE_AREA_SERVED],
    provider: { '@id': ORGANIZATION_ID },
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
  primaryImage,
  about = false,
}: {
  /** 'WebPage' is legal-spec.md's fallback — schema.org has no
   * dedicated Privacy/Terms/Cookies type, and inventing one via
   * additionalType is more machinery than three reference pages need. */
  type: 'AboutPage' | 'ContactPage' | 'WebPage'
  name: string
  description: string
  path: string
  primaryImage?: string
  /** Set on pages that are substantively *about* Anvio the company —
   * Home, About — so an extractor links the page to the Organization
   * entity rather than treating it as a standalone document. */
  about?: boolean
}) {
  const url = new URL(path, SITE_URL).toString()
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    isPartOf: { '@id': WEBSITE_ID },
    ...(about ? { about: { '@id': ORGANIZATION_ID } } : {}),
    ...(primaryImage ? { primaryImageOfPage: new URL(primaryImage, SITE_URL).toString() } : {}),
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
  image,
}: {
  headline: string
  description: string
  author: string
  datePublished: Date
  dateModified: Date
  path: string
  /** Absolute or root-relative. Falls back to the sitewide OG image —
   * Google's Article guidance wants an image on every entry. */
  image?: string
}) {
  const url = new URL(path, SITE_URL).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: { '@type': 'Person', name: author },
    // seo-strategy.md §6: publisher resolves to the one Organization
    // @id, so provenance for the guide attaches to a known entity.
    publisher: { '@id': ORGANIZATION_ID },
    image: new URL(image ?? '/images/og-image.png', SITE_URL).toString(),
    datePublished: datePublished.toISOString(),
    dateModified: dateModified.toISOString(),
    url,
    mainEntityOfPage: url,
  }
}

/** seo-strategy.md §7 / GEO: how-to guides that lay out real ordered
 * steps get HowTo markup alongside Article. Steps come from an optional
 * `howToSteps` frontmatter array on the guide (content-collections.ts),
 * authored deliberately — never scraped from the body headings. */
export function howToSchema({
  name,
  description,
  steps,
  path,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
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
