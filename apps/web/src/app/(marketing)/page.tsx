import type { Metadata } from 'next'
import type { SectionInstance } from '@/lib/sections/types'
import { SectionRenderer } from '@/lib/sections/renderer'
import { buildMetadata } from '@/lib/seo/metadata'

/**
 * home-spec.md — Section 1 (Hero) only in the scaffold. The remaining
 * 11 sections are documented in home-spec.md and typed in
 * lib/sections/types.ts, but their components aren't built yet — see
 * registry.ts. Add each section's `{ type: '...' }` entry here as its
 * folder lands; the array is the page.
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
