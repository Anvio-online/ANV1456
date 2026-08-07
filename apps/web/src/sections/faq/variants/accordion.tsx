import type { FaqProps } from '../faq.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Accordion } from '@/components/ui/accordion'

/**
 * automate-spec.md §11. Question-shaped headings with answer-first
 * paragraphs — seo-strategy.md §7. Each question wraps its toggle
 * button in `role="heading" aria-level="3"` (see Accordion's
 * headingLevel doc) rather than a literal <h3> — semantically and for
 * SEO/AT purposes identical, real indexable heading content either way.
 */
export function FaqAccordion({
  eyebrow,
  heading,
  items,
  headingTag,
}: FaqProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-content px-gutter mx-auto">
      <div className="mb-head-gap flex flex-col gap-4">
        {eyebrow ? (
          <span className="text-label text-accent-text font-mono uppercase tracking-widest">
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <HeadingTagEl className="max-w-headline text-h2 leading-none tracking-tight">
            {heading}
          </HeadingTagEl>
        ) : null}
      </div>

      <Accordion
        headingLevel={3}
        items={items.map((item) => ({
          id: item.question,
          trigger: (
            <span key={item.question} className="text-body-l font-display font-medium">
              {item.question}
            </span>
          ),
          content: item.answer,
        }))}
      />
    </div>
  )
}
