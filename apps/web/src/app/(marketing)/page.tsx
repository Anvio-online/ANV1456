import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * home-spec.md. Six of twelve sections are built — Hero, Proof bar,
 * Services, Why us, Industries, and the closing CTA. Featured work and
 * Engagement model are step-3 sections too, but are genuinely blocked
 * (Stratseek naming permission; real price ranges) rather than just
 * unbuilt — see home-spec.md "Open items". Agent demo, Process, and
 * Insights are their own budgeted sprints per the build order.
 *
 * Known temporary imbalance: every built section is dark-themed, since
 * the three light sections in the spec (Featured work, Process,
 * Engagement model) are exactly the ones still blocked. Once those
 * land, the page alternates per home-spec.md's documented order —
 * don't "fix" this by overriding whyUs/industries to light, they're
 * spec'd dark.
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
    type: 'whyUs',
    id: 'why-us',
    variant: 'contrast-table',
    theme: 'dark',
    eyebrow: 'Why Anvio',
    heading: 'Most agencies build you a website. We build you leverage.',
    rows: [
      {
        typical: 'Builds what you asked for',
        anvio: 'Maps your process first, then builds what actually helps',
      },
      {
        typical: 'AI is a feature they added last year',
        anvio: "AI-native — it's how we build and what we build",
      },
      {
        typical: 'Website, then goodbye',
        anvio: 'Build, automate, and grow under one roof',
      },
      {
        typical: 'You get a design file and an invoice',
        anvio: 'You get the code, the docs, and a team that knows your systems',
      },
      {
        typical: 'Fixed template, flexible truth',
        anvio: 'Published pricing, published process, weekly demos',
      },
    ],
  },
  {
    type: 'industries',
    id: 'industries',
    variant: 'compact-grid',
    theme: 'dark',
    eyebrow: 'Who we work with',
    heading: 'Is this for a business like mine?',
    items: [
      {
        name: 'Healthcare',
        line: 'Patient scheduling, intake, and follow-ups — automated without losing the human touch.',
        href: '/industries',
      },
      {
        name: 'Ecommerce',
        line: 'Order confirmations, inventory syncs, and support tickets that used to eat your afternoon.',
        href: '/industries',
      },
      {
        name: 'Real Estate',
        line: 'Lead follow-up and listing updates that happen the moment they should, not when someone remembers.',
        href: '/industries',
      },
      {
        name: 'Accounting & Finance',
        line: "Invoice entry and reconciliation off your team's desk and into a system that never forgets.",
        href: '/industries',
      },
      {
        name: 'Education',
        line: 'Admissions inquiries and enrollment follow-ups answered in minutes, not days.',
        href: '/industries',
      },
      {
        name: 'Logistics',
        line: 'Shipment updates and customer queries handled automatically, end to end.',
        href: '/industries',
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
