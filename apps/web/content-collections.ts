import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

/**
 * docs/engineering/content-layer.md §2–3. content-collections is the
 * loader ADR-0002 §6 left as an open item — chosen here. It owns
 * parsing frontmatter and validating it against these Zod schemas;
 * `content: string` (the raw MDX body) passes through unvalidated and
 * uncompiled.
 *
 * Deliberately NOT using @content-collections/mdx's compileMDX +
 * MDXContent here — that pipeline renders via mdx-bundler's client
 * runtime (`useMemo` + `new Function`-eval'd code), which means the
 * body would exist only after hydration, not in the server-rendered
 * HTML. That's a direct violation of this repo's non-negotiable:
 * "all copy is real DOM, server-rendered" (motion-system.md §6 rule 5,
 * seo-strategy.md §4's "animation trap"). The raw `content` string
 * from each entry is compiled server-side instead, per request, by
 * `next-mdx-remote/rsc`'s `<MDXRemote>` — an async Server Component,
 * not a client bundle — inside `richText:mdx`
 * (sections/rich-text/variants/mdx.tsx).
 */
const relatedLink = z.object({ label: z.string(), href: z.string(), note: z.string() })
const faqItem = z.object({ question: z.string(), answer: z.string() })
const painItem = z.object({ pain: z.string(), line: z.string() })
const howToStep = z.object({ name: z.string(), text: z.string() })

const baseFields = {
  title: z.string().max(70),
  description: z.string().min(140).max(158),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  draft: z.boolean().default(false),
  // Explicit per content-collections' own deprecation notice — it used
  // to add this implicitly for the default "frontmatter" parser.
  content: z.string(),
}

const services = defineCollection({
  name: 'services',
  directory: 'content/services',
  include: '*.mdx',
  schema: z.object({
    ...baseFields,
    pillar: z.enum(['build', 'automate', 'grow']),
    h1: z.string(),
    pains: z.array(painItem).max(6),
    faq: z.array(faqItem),
    relatedLinks: z.array(relatedLink).min(3).max(5),
    metrics: z.array(z.object({ name: z.string(), definition: z.string() })).optional(),
    keywordPrimary: z.string(),
  }),
})

const guides = defineCollection({
  name: 'guides',
  directory: 'content/guides',
  include: '*.mdx',
  schema: z.object({
    ...baseFields,
    category: z.string(),
    author: z.string(),
    commercialLink: z.object({ label: z.string(), href: z.string() }),
    relatedLinks: z.array(relatedLink).min(3).max(5),
    // Optional GEO structured-data inputs (seo-strategy.md §6–§7),
    // emitted by guides/[slug]/page.tsx only when present.
    // `faq`: each question/answer MUST also appear, in substance, as a
    //   question-shaped heading + answer in the body — Google's FAQ
    //   policy requires the marked-up content to be visible on the page.
    // `howToSteps`: authored for genuine ordered how-to guides only.
    faq: z.array(faqItem).min(2).optional(),
    howToSteps: z.array(howToStep).min(2).optional(),
  }),
  transform: (document) => ({
    ...document,
    // content-layer.md §3 — computed at build, never hand-entered.
    readingTime: Math.max(1, Math.round(document.content.trim().split(/\s+/).length / 200)),
  }),
})

const industries = defineCollection({
  name: 'industries',
  directory: 'content/industries',
  include: '*.mdx',
  schema: z.object({
    ...baseFields,
    industry: z.string(),
    h1: z.string(),
    pains: z.array(painItem).max(6),
    useCases: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .min(3)
      .max(5),
    services: z.array(z.string()),
    faq: z.array(faqItem),
    relatedLinks: z.array(relatedLink).min(3).max(5),
  }),
})

const caseStudies = defineCollection({
  name: 'caseStudies',
  directory: 'content/case-studies',
  include: '*.mdx',
  schema: z.object({
    ...baseFields,
    client: z.string(),
    clientDisplay: z.string(),
    attribution: z.enum(['direct', 'partner-agency']),
    industry: z.string(),
    region: z.string(),
    services: z.array(z.string()),
    problem: z.string(),
    results: z.array(z.object({ metric: z.string(), label: z.string() })),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
})

const insights = defineCollection({
  name: 'insights',
  directory: 'content/insights',
  include: '*.mdx',
  schema: z.object({
    ...baseFields,
    category: z.string(),
    author: z.string(),
  }),
})

export default defineConfig({
  content: [services, guides, industries, caseStudies, insights],
})
