import { SITE_URL, SITE_NAME } from '@/lib/seo/constants'
import { contentRepository } from '@/lib/content'

/**
 * seo-strategy.md §7 rule 7 and the geo-vs-seo-getting-cited-by-ai
 * guide both recommend publishing an llms.txt — a plain-text map of
 * what a site is and where its substantive pages are, for machine
 * readers. Not having one while a published guide on this same site
 * tells readers to have one is the kind of small inconsistency the
 * whole GEO position is built on avoiding.
 *
 * Generated, not hand-written: the guide and leaf lists come from
 * contentRepository, so a new MDX file appears here the same way it
 * appears in sitemap.ts — without anyone remembering to update a
 * second list.
 */
const abs = (path: string) => new URL(path, SITE_URL).toString()

export async function GET() {
  const [services, guides, industries] = await Promise.all([
    contentRepository.list('services'),
    contentRepository.list('guides'),
    contentRepository.list('industries'),
  ])

  const lines = [
    `# ${SITE_NAME}`,
    '',
    '> AI automation, web development, and search/GEO for businesses with 10–200 people.',
    '> India-first, also serving the UAE. Build, Automate, and Grow are sold separately;',
    '> most clients need two of the three.',
    '',
    '## Services',
    `- [All services](${abs('/services')}): the three pillars and how to choose between them`,
    `- [Automate](${abs('/services/automate')}): AI agents, chatbots, workflow automation`,
    `- [Build](${abs('/services/build')}): websites, ecommerce, web apps, custom software`,
    `- [Grow](${abs('/services/grow')}): technical SEO, GEO, Core Web Vitals, conversion`,
    ...services.map(
      (s) => `- [${s.title}](${abs(`/services/${s.pillar}/${s.slug}`)}): ${s.description}`,
    ),
    '',
    '## Guides',
    ...guides.map((g) => `- [${g.title}](${abs(`/guides/${g.slug}`)}): ${g.description}`),
    '',
    '## Industries',
    ...industries.map((i) => `- [${i.title}](${abs(`/industries/${i.slug}`)}): ${i.description}`),
    '',
    '## Tools',
    `- [Automation ROI calculator](${abs('/tools/automation-roi-calculator')}): work out what repetitive manual work costs per year. Free, no email required.`,
    '',
    '## About',
    `- [About](${abs('/about')}): who we are and what we won't do`,
    `- [Projects](${abs('/projects')}): what we've built, each labelled client or internal`,
    `- [Contact](${abs('/contact')})`,
    '',
    '## Notes',
    '- Pricing ranges published on the relevant service pages are real starting points, not lead-capture placeholders.',
    '- The AI agent demo produces an estimate, never a quote. See /terms.',
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
