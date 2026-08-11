import type { Metadata } from 'next'
import type { SectionInstance, InsightItem } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { collectionPageSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { contentRepository } from '@/lib/content'

/**
 * guides-spec.md Part 1. Editorial order, not chronological —
 * which-processes-are-worth-automating leads because it's the guide
 * that most directly demonstrates the site's own positioning (willing
 * to say "don't automate this yet"), per guides-spec.md §3's own
 * description of it as "the most on-brand guide on the list." Fetched
 * by explicit slug rather than contentRepository.list()'s default
 * publishedAt sort, since all eight currently share a publish date.
 * Grouped roughly by pillar after the featured pick: definitional
 * (agent vs. chatbot, RAG), Automate-commercial (WhatsApp, invoices,
 * tool comparison), then Build and Grow's one guide each.
 */
const FEATURED_ORDER = [
  'which-processes-are-worth-automating',
  'ai-agent-vs-chatbot',
  'what-is-rag',
  'whatsapp-business-api-cost-and-limits',
  'how-to-automate-invoice-data-entry',
  'n8n-vs-zapier-vs-make',
  'what-a-business-website-should-cost',
  'geo-vs-seo-getting-cited-by-ai',
]

export const metadata: Metadata = buildMetadata({
  title: 'Guides: AI Automation, Web Development & Search',
  description:
    'Practical guides on automating manual work, choosing between tools, and getting found in search and AI assistants. Written from work we have actually done.',
  path: '/guides',
})

export default async function GuidesIndexPage() {
  const entries = await Promise.all(
    FEATURED_ORDER.map((slug) => contentRepository.get('guides', slug)),
  )
  const items: InsightItem[] = entries
    .filter((e) => e !== null)
    .map((entry) => ({
      title: entry.title,
      description: entry.description,
      href: `/guides/${entry.slug}`,
      category: entry.category,
    }))

  const sections: SectionInstance[] = [
    {
      type: 'breadcrumb',
      id: 'breadcrumb',
      variant: 'inline',
      theme: 'dark',
      items: [
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
      ],
    },
    {
      type: 'hero',
      id: 'hero',
      variant: 'page-lead',
      theme: 'dark',
      eyebrow: 'GUIDES',
      heading: 'How this stuff actually works.',
      body: "Comparisons, definitions, and walkthroughs — written from projects we've shipped, with the trade-offs left in.",
    },
    {
      type: 'insights',
      id: 'guides-list',
      variant: 'featured-plus-list',
      theme: 'dark',
      items,
    },
    {
      type: 'ctaClosing',
      id: 'cta-closing',
      variant: 'centered-bold',
      theme: 'dark',
      eyebrow: "Let's talk",
      heading: "Didn't find your specific question?",
      body: "30 minutes, no deck. Describe the situation and we'll answer it directly.",
      cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
    },
  ]

  const collectionPage = collectionPageSchema({
    name: 'Guides',
    description:
      'Practical guides on automating manual work, choosing between tools, and getting found in search and AI assistants.',
    path: '/guides',
  })
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SectionRenderer sections={sections} />
    </>
  )
}
