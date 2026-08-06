import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * home-spec.md. Four of twelve sections are built — Hero, Proof bar,
 * Services, and the closing CTA — matching the build order's step 2:
 * "a shippable, coherent page." The remaining eight (agent demo,
 * featured work, process, engagement model, why us, industries,
 * insights) are documented in home-spec.md and typed in
 * lib/sections/types.ts, but not yet in registry.ts. Add each
 * section's `{ type: '...' }` entry here as its folder lands — the
 * array is the page, in the order home-spec.md §1–12 specifies.
 */
const sections: SectionInstance[] = [
  {
    type: 'hero',
    id: 'hero',
    variant: 'centered-statement',
    theme: 'dark',
    eyebrow: 'AI Automation · Software · Growth',
    heading: 'Your business runs on\nwork a machine should be doing.',
    body: 'Anvio builds the AI automations, software, and websites that take manual work off your team — and bring the right customers in. Built for businesses with 10 to 200 people, not enterprise timelines.',
    cta: { label: 'See what we’d automate →', href: '#agent-demo', style: 'primary' },
    ctaSecondary: { label: 'Book a free consultation', href: '/contact', style: 'secondary' },
    trustLine: 'Typical first automation ships in 2–4 weeks',
  },
  {
    type: 'proofBar',
    id: 'proof-bar',
    variant: 'marquee',
    theme: 'dark',
    eyebrow: 'We connect the tools you already use',
    rows: [
      {
        items: [
          'n8n',
          'Make',
          'OpenAI',
          'Anthropic',
          'Zapier',
          'HubSpot',
          'Salesforce',
          'WhatsApp Business API',
          'Shopify',
        ],
      },
      {
        items: [
          'Next.js',
          'Supabase',
          'Stripe',
          'Twilio',
          'Slack',
          'Google Workspace',
          'Zoho',
          'Tally',
        ],
      },
    ],
  },
  {
    type: 'services',
    id: 'services',
    variant: 'pillar-cards',
    theme: 'dark',
    eyebrow: 'What we do',
    heading: 'Three ways we make a business harder to compete with.',
    pillars: [
      {
        key: 'build',
        title: 'Build',
        body: 'Websites, web apps, and custom software that fit how you work — not how a template thinks you should.',
        subItems: ['Websites', 'Ecommerce', 'Web apps', 'CRM/ERP', 'Custom software'],
        href: '/services/build',
      },
      {
        key: 'automate',
        title: 'Automate',
        body: "AI agents, chatbots, and workflows that handle the repetitive work your team shouldn't be spending its week on.",
        subItems: ['AI agents', 'Chatbots', 'Workflows', 'WhatsApp', 'Integrations'],
        href: '/services/automate',
      },
      {
        key: 'grow',
        title: 'Grow',
        body: 'SEO, GEO, and performance work that gets you found — by search engines and by the AI assistants your customers now ask first.',
        subItems: ['SEO', 'GEO', 'Performance', 'Audits', 'CRO'],
        href: '/services/grow',
      },
    ],
  },
  {
    type: 'ctaClosing',
    id: 'cta-closing',
    variant: 'split-with-form',
    theme: 'dark',
    eyebrow: "Let's talk",
    heading: "Let's find the first thing worth automating.",
    body: "A 30-minute call. We'll look at one process in your business and tell you honestly whether automation is worth it. No pitch deck.",
    altContact: 'Or email us directly at hello@anvio.online',
  },
]

export const metadata: Metadata = buildMetadata({
  title: `${'Anvio'} — AI Automation, Web Development & Growth`,
  description:
    "We help growing businesses automate manual work, build software that scales, and get found online. See what we'd automate for you — free, in 60 seconds.",
  path: '/',
})

export default function HomePage() {
  return <SectionRenderer sections={sections} />
}
