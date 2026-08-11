import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { SectionInstance, ServiceClusterItem } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { contentRepository } from '@/lib/content'

/**
 * industries-spec.md Part 2. Hybrid page (ADR-0006). §6 (featuredWork)
 * is omitted entirely — no case study exists yet for either industry,
 * same "omit rather than fabricate" rule as everywhere else.
 */
const SERVICE_DISPLAY: Record<string, ServiceClusterItem> = {
  'whatsapp-automation': {
    name: 'WhatsApp automation',
    description: 'Orders, questions, and follow-ups handled inside the WhatsApp conversation.',
    href: '/services/automate/whatsapp-automation',
  },
  'ai-chatbot-development': {
    name: 'AI chatbot development',
    description: 'Answers from your own documentation, not a generic script.',
    href: '/services/automate/ai-chatbot-development',
  },
  automate: {
    name: 'Automate',
    description: 'AI agents and workflows for the repetitive work your team does by hand.',
    href: '/services/automate',
  },
  build: {
    name: 'Build',
    description: 'Websites, storefronts, and internal systems.',
    href: '/services/build',
  },
  grow: {
    name: 'Grow',
    description: 'SEO, GEO, and performance work that gets you found.',
    href: '/services/grow',
  },
}

export async function generateStaticParams() {
  const slugs = await contentRepository.slugs('industries')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = await contentRepository.get('industries', slug)
  if (!entry) return {}
  return buildMetadata({
    title: entry.title,
    description: entry.description,
    path: `/industries/${slug}`,
  })
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = await contentRepository.get('industries', slug)
  if (!entry) notFound()

  const clusterItems = entry.services
    .map((s) => SERVICE_DISPLAY[s])
    .filter((s): s is ServiceClusterItem => Boolean(s))

  const sections: SectionInstance[] = [
    {
      type: 'breadcrumb',
      id: 'breadcrumb',
      variant: 'inline',
      theme: 'dark',
      items: [
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
        { name: entry.industry, path: `/industries/${slug}` },
      ],
    },
    {
      type: 'hero',
      id: 'hero',
      variant: 'page-lead',
      theme: 'dark',
      eyebrow: `INDUSTRIES · ${entry.industry.toUpperCase()}`,
      heading: entry.h1,
      body: entry.description,
    },
    {
      type: 'problem',
      id: 'the-problem',
      variant: 'pain-grid',
      theme: 'dark',
      eyebrow: 'WHERE THE HOURS GO',
      heading: `The manual work in ${entry.industry.toLowerCase()}.`,
      items: entry.pains,
    },
    {
      type: 'richText',
      id: 'body',
      variant: 'mdx',
      theme: 'light',
      body: entry.content,
    },
    ...(clusterItems.length > 0
      ? [
          {
            type: 'services' as const,
            id: 'relevant-services',
            variant: 'cluster-grid' as const,
            theme: 'light' as const,
            heading: 'Relevant services.',
            clusters: [
              {
                headline: `For ${entry.industry}`,
                promise: "Where we'd usually start",
                subItems: clusterItems,
              },
            ],
          },
        ]
      : []),
    {
      type: 'faq',
      id: 'faq',
      variant: 'accordion',
      theme: 'dark',
      eyebrow: 'QUESTIONS',
      heading: `About working with us in ${entry.industry.toLowerCase()}.`,
      items: entry.faq,
    },
    {
      type: 'relatedLinks',
      id: 'related',
      theme: 'dark',
      variant: 'card-grid',
      eyebrow: 'RELATED',
      heading: 'Where to go next.',
      items: entry.relatedLinks,
    },
    {
      type: 'ctaClosing',
      id: 'cta-closing',
      variant: 'split-with-form',
      theme: 'dark',
      eyebrow: "Let's talk",
      heading: `Tell us about your ${entry.industry.toLowerCase()} process.`,
      body: "30 minutes. We'll tell you honestly whether we've solved this before, and what it would take.",
    },
  ]

  const service = serviceSchema({
    name: entry.title,
    description: entry.description,
    serviceType: `AI automation for ${entry.industry}`,
    path: `/industries/${slug}`,
  })
  const faq = faqSchema(entry.faq)
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: entry.industry, path: `/industries/${slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SectionRenderer sections={sections} />
    </>
  )
}
