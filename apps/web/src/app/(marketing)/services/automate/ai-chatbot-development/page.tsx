import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schema'
import { contentRepository } from '@/lib/content'

/**
 * service-leaf-spec.md. Same frame as whatsapp-automation/page.tsx —
 * see that file's docstring for the class and the agentDemo rationale.
 */
export async function generateMetadata(): Promise<Metadata> {
  const entry = await contentRepository.get('services', 'ai-chatbot-development')
  if (!entry) return {}
  return buildMetadata({
    title: entry.title,
    description: entry.description,
    path: '/services/automate/ai-chatbot-development',
  })
}

export default async function AiChatbotDevelopmentPage() {
  const entry = await contentRepository.get('services', 'ai-chatbot-development')
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
        { name: entry.title, path: '/services/automate/ai-chatbot-development' },
      ],
    },
    {
      type: 'hero',
      id: 'hero',
      variant: 'page-lead',
      theme: 'dark',
      eyebrow: 'AUTOMATE · CHATBOT',
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
      eyebrow: 'HOW A QUESTION IS ANSWERED',
      heading: 'One question, grounded in your own documentation.',
      scenario: 'A customer asks about your return policy.',
      nodes: [
        {
          id: 'question',
          label: 'Question',
          status: 'received',
          explainer: 'The customer asks in their own words.',
        },
        {
          id: 'kb',
          label: 'Knowledge base',
          status: 'searching',
          explainer: 'Your actual documents are searched for the relevant passage.',
        },
        {
          id: 'answer',
          label: 'Grounded answer',
          status: 'confident',
          explainer: 'The answer comes from what was found, not from guessing.',
        },
        {
          id: 'escalate',
          label: 'Escalate if unsure',
          status: 'fallback',
          explainer: 'Below the confidence threshold, a person sees it instead.',
        },
      ],
      edges: [
        { from: 'question', to: 'kb' },
        { from: 'kb', to: 'answer' },
        { from: 'answer', to: 'escalate' },
      ],
    },
    {
      type: 'faq',
      id: 'faq',
      variant: 'accordion',
      theme: 'light',
      eyebrow: 'QUESTIONS',
      heading: 'About the chatbot specifically.',
      items: entry.faq,
    },
    {
      type: 'agentDemo',
      id: 'agent-demo',
      variant: 'full',
      theme: 'dark',
      eyebrow: 'SEE IT WORK',
      heading: 'Describe what your team answers by hand. Get a real plan.',
      body: "Not a lead form. Our agent asks what questions eat your team's day, then builds the actual approach — what it would take, and roughly how many hours it saves.",
      placeholders: [
        'Our team answers the same twenty questions all day…',
        'Customers ask about our return policy constantly…',
        'Support tickets pile up outside business hours…',
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
      heading: 'Send us your most-asked question.',
      body: "30 minutes. We'll tell you honestly whether a chatbot is the right tool, and what it would take.",
      cta: { label: 'Book a free consultation', href: '/contact', style: 'primary' },
    },
  ]

  const service = serviceSchema({
    name: entry.title,
    description: entry.description,
    serviceType: entry.keywordPrimary,
    path: '/services/automate/ai-chatbot-development',
  })
  const faq = faqSchema(entry.faq)
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Automate', path: '/services/automate' },
    { name: entry.title, path: '/services/automate/ai-chatbot-development' },
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
