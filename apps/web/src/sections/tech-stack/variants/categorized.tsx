import type { TechStackProps } from '../tech-stack.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * build-spec.md §7. Categorized, not a logo soup — and deliberately
 * not a marquee, since Automate's Integrations section already owns
 * that device; repeating it here would make the two pages feel
 * interchangeable. hoverLift only (motion-system.md §3, pointer
 * devices only via Tailwind's hover: variant).
 */
export function Categorized({
  eyebrow,
  heading,
  categories,
  footnote,
  headingTag,
}: TechStackProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
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

      <div className="flex flex-col gap-6">
        {categories.map((cat, i) => (
          <div
            key={cat.category}
            className="fade-up-in flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6"
            style={{ '--reveal-i': i } as CSSVarStyle}
          >
            <span className="text-label text-text-3 w-28 shrink-0 font-mono uppercase tracking-widest">
              {cat.category}
            </span>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="border-border bg-surface text-body-s text-text-2 duration-fast ease-soft-ui hover:border-accent-line hover:text-text rounded-full border px-4 py-2 font-mono transition hover:-translate-y-0.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {footnote ? <p className="text-body-s text-text-2 mt-8">{footnote}</p> : null}
    </div>
  )
}
