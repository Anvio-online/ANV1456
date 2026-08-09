import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { contentRepository } from '@/lib/content'

/**
 * service-leaf-spec.md. Hybrid page (ADR-0006) — frame is fixed here,
 * content comes from content/services/whatsapp-automation.mdx. The
 * Automate leaves carry agentDemo:full where the Build leaf carries
 * results:metric-row — service-leaf-spec.md §3a: these pages have no
 * case study behind them yet, so the live demo is the proof.
 */
export async function generateMetadata(): Promise<Metadata> {
  const entry = await contentRepository.get('services', 'whatsapp-automation')
  if (!entry) return {}
  return buildMetadata({
    title: entry.title,
    description: entry.description,
    path: '/services/automate/whatsapp-automation',
  })
}

export default async function WhatsappAutomationPage() {
  const entry = await contentRepository.get('services', 'whatsapp-automation')
  if (!entry) notFound()

  const sections: SectionInstance[] = [
    {
      type: 'breadcrumb',
      id: 'breadcrumb',
      variant: 'inline',
      theme: 'dark',
      items: [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Automate', path: '/services/automate' },
        { name: entry.title, path: '/services/automate/whatsapp-automation' },
      ],
    },
    {
      type: 'hero',
      id: 'hero',
      variant: 'page-lead',
      theme: 'dark',
      eyebrow: 'AUTOMATE · WHATSAPP',
      heading: entry.h1,
      body: entry.description,
    },
    {
      type: 'problem',
      id: 'the-problem',
      variant: 'pain-grid',
      theme: 'dark',
      eyebrow: 'WHAT IT REPLACES',
      heading: 'The manual work this removes.',
      items: entry.pains,
    },
    {
      type: 'richText',
      id: 'body',
      variant: 'mdx',
      theme: 'light',
      body: entry.content,
    },
    {
      type: 'workflowGraph',
      id: 'how-it-works',
      variant: 'compact',
      theme: 'light',
      eyebrow: 'HOW A MESSAGE MOVES',
      heading: 'One WhatsApp message, start to finish.',
      scenario: 'A customer messages an order on WhatsApp at 11pm.',
      nodes: [
        {
          id: 'message',
          label: 'Customer message',
          status: 'received',
          explainer: 'The order arrives in free text, any time of day.',
        },
        {
          id: 'intent',
          label: 'Intent check',
          status: 'classifying',
          explainer: 'Reads the message against your policies and order data.',
        },
        {
          id: 'crm',
          label: 'CRM record',
          status: 'logged',
          explainer: 'The order is created or updated automatically.',
        },
        {
          id: 'reply',
          label: 'Reply sent',
          status: 'confirmed',
          explainer: 'A confirmation goes back in your tone, immediately.',
        },
      ],
      edges: [
        { from: 'message', to: 'intent' },
        { from: 'intent', to: 'crm' },
        { from: 'crm', to: 'reply' },
      ],
    },
    {
      type: 'faq',
      id: 'faq',
      variant: 'accordion',
      theme: 'light',
      eyebrow: 'QUESTIONS',
      heading: 'About WhatsApp automation specifically.',
      items: entry.faq,
    },
    {
      type: 'agentDemo',
      id: 'agent-demo',
      variant: 'full',
      theme: 'dark',
      eyebrow: 'SEE IT WORK',
      heading: 'Describe your WhatsApp process. Get a real plan.',
      body: 'Not a lead form. Our agent asks what you handle by hand over WhatsApp today, then builds the actual workflow — tools, steps, and roughly how many hours it saves.',
      placeholders: [
        'We re-type orders from WhatsApp into our CRM…',
        'Our team answers the same WhatsApp questions all day…',
        'Follow-ups happen when someone remembers to check…',
      ],
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
      variant: 'centered-bold',
      theme: 'dark',
      eyebrow: "Let's talk",
      heading: 'Send us a real WhatsApp conversation.',
      body: "30 minutes. We'll tell you honestly what's worth automating first, and what it would take.",
      cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
    },
  ]

  const service = serviceSchema({
    name: entry.title,
    description: entry.description,
    serviceType: entry.keywordPrimary,
    path: '/services/automate/whatsapp-automation',
  })
  const faq = faqSchema(entry.faq)
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Automate', path: '/services/automate' },
    { name: entry.title, path: '/services/automate/whatsapp-automation' },
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
