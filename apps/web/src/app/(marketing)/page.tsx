import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * home-spec.md. Eight of twelve sections are built — every step-3
 * section now has real content. Agent demo (§4) and Process (§6) are
 * their own budgeted sprints; Insights (§10) needs three real posts
 * before it ships, per its own "cut rather than placeholder" rule.
 *
 * Featured work uses real client names (Baladi Food Stuff, Epicerma —
 * UAE web development delivered via Stratseek) with NO fabricated
 * metrics — the `outcome` field is deliberately omitted rather than
 * invented. Industry labels are inferred from the company names, not
 * confirmed facts — correct them if wrong. Engagement model's price
 * ranges are Anvio's own first published pricing, not claims about a
 * third party, and can be adjusted anytime.
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
    type: 'featuredWork',
    id: 'featured-work',
    variant: 'two-up-deep',
    theme: 'light',
    heading: 'Shipped, in production, for real businesses.',
    items: [
      {
        client: 'Baladi Food Stuff',
        region: 'UAE',
        industry: 'Food & FMCG Distribution',
        problem:
          'A product catalogue that needed to work the way wholesale buyers actually shop, not just look good.',
        build:
          'Designed and built a storefront with real category structure and fast browsing, delivered end-to-end.',
        stack: ['Web Development', 'Ecommerce'],
        href: '/case-studies/baladi-food-stuff',
      },
      {
        client: 'Epicerma',
        region: 'UAE',
        industry: 'Skincare & Beauty Retail',
        problem:
          'A retail storefront that needed to convert visitors into customers, not just display products.',
        build:
          'Built for clarity and speed — product presentation and checkout designed to keep customers moving forward.',
        stack: ['Web Development', 'Ecommerce'],
        href: '/case-studies/epicerma',
      },
    ],
  },
  {
    type: 'engagementModel',
    id: 'engagement-model',
    variant: 'phase-timeline',
    theme: 'light',
    eyebrow: 'How we work',
    heading: 'What working with us actually costs.',
    body: "Most agencies make you book a call to find out. Here's the honest version.",
    tiers: [
      {
        name: 'Automation Sprint',
        audienceFit: 'One process, automated end to end',
        timeline: '2–4 weeks',
        range: '₹75,000 – ₹2,50,000',
        includes: [
          'Discovery, build, and integration',
          'Handover and documentation',
          '30 days of post-launch support',
        ],
      },
      {
        name: 'Product Build',
        audienceFit: 'A website, app, or internal tool',
        timeline: '6–14 weeks',
        range: '₹2,00,000 – ₹8,00,000',
        includes: [
          'Our full five-stage process',
          'Weekly demos, staging access',
          'Migration and team training',
        ],
      },
      {
        name: 'Growth Retainer',
        audienceFit: 'Ongoing SEO, performance, and iteration',
        timeline: 'Monthly',
        range: '₹35,000 – ₹90,000/mo',
        includes: ['Audit and roadmap', 'Ongoing execution', 'Monthly reporting'],
      },
    ],
    policyNotes: [
      'If scope changes mid-project, we quote the difference before starting — no surprise invoices.',
      "If we're running late, you hear about it before the deadline, not after — with a revised date and the reason why.",
      'You own everything we build — code, workflows, and documentation, from day one.',
      'At the end of an engagement, you can take everything and walk away. Most clients don’t, but you could.',
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
