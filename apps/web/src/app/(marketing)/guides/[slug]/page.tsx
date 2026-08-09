import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { contentRepository } from '@/lib/content'
import { extractHeadings } from '@/lib/content/toc'

/**
 * guides-spec.md Part 2. The fixed article frame — identical for
 * every guide, only frontmatter and body differ (ADR-0006, class 3).
 * The byline (author · date · reading time) lives in the hero's `body`
 * slot rather than a dedicated field — no section currently renders
 * that combination, and adding one for a single reused line isn't
 * worth a new prop; each guide's own opening paragraph, inside the
 * MDX body, carries the actual subtitle a reader sees first.
 */
const AUTHOR_BIO =
  "Anvio's founding engineer writes the guides on this site — drawn from the same automation, web development, and SEO work the rest of the site describes, not written by a separate content team."

export async function generateStaticParams() {
  const slugs = await contentRepository.slugs('guides')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = await contentRepository.get('guides', slug)
  if (!entry) return {}
  return buildMetadata({
    title: entry.title,
    description: entry.description,
    path: `/guides/${slug}`,
  })
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = await contentRepository.get('guides', slug)
  if (!entry) notFound()

  const headings = extractHeadings(entry.content)
  const updatedDate = entry.updatedAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const sections: SectionInstance[] = [
    {
      type: 'breadcrumb',
      id: 'breadcrumb',
      variant: 'inline',
      theme: 'dark',
      items: [
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: entry.title, path: `/guides/${slug}` },
      ],
    },
    {
      type: 'hero',
      id: 'hero',
      variant: 'page-lead',
      theme: 'dark',
      eyebrow: entry.category.toUpperCase(),
      heading: entry.title,
      body: `${entry.author} · Updated ${updatedDate} · ${entry.readingTime} min read`,
    },
    {
      type: 'tableOfContents',
      id: 'toc',
      variant: 'inline',
      theme: 'light',
      items: headings,
    },
    {
      type: 'richText',
      id: 'body',
      variant: 'mdx',
      theme: 'light',
      body: entry.content,
    },
    {
      type: 'authorBio',
      id: 'author',
      variant: 'compact',
      theme: 'light',
      role: entry.author,
      bio: AUTHOR_BIO,
    },
    {
      type: 'relatedLinks',
      id: 'related',
      theme: 'dark',
      variant: 'card-grid',
      eyebrow: 'RELATED',
      heading: 'Where to go next.',
      items: [
        ...entry.relatedLinks,
        {
          label: entry.commercialLink.label,
          href: entry.commercialLink.href,
          note: 'The commercial page this guide connects to.',
        },
      ],
    },
    {
      type: 'ctaClosing',
      id: 'cta-closing',
      variant: 'centered-bold',
      theme: 'dark',
      eyebrow: "Let's talk",
      heading: 'Still deciding?',
      body: "30 minutes, no deck. Describe the situation and we'll tell you which of the options above we'd pick for it — including when the answer is to do nothing yet.",
      cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
    },
  ]

  const article = articleSchema({
    headline: entry.title,
    description: entry.description,
    author: entry.author,
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt,
    path: `/guides/${slug}`,
  })
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: entry.title, path: `/guides/${slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SectionRenderer sections={sections} />
    </>
  )
}
