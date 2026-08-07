import type { WhyUsProps } from '../why-us.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * home-spec.md §8. A real <table>, not styled divs — semantic markup
 * this content is directly extractable per seo-strategy.md's GEO
 * guidance (§7): comparison tables are exactly what LLM surfaces cite.
 */
export function ContrastTable({
  eyebrow,
  heading,
  rows,
  headingTag,
}: WhyUsProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="mb-14 flex flex-col gap-4">
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

      <p className="text-label text-text-3 mb-3 font-mono uppercase tracking-widest md:hidden">
        Swipe to compare →
      </p>
      <div className="table-scroll-fade overflow-x-auto">
        <table className="min-w-150 text-body w-full border-collapse">
          <thead>
            <tr>
              <th className="border-border text-label text-text-3 border-b pb-4 text-left font-mono uppercase tracking-widest">
                Typical agency
              </th>
              <th className="border-border text-label text-accent-text border-b pb-4 pl-5 text-left font-mono uppercase tracking-widest">
                Anvio
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.typical} className="border-border-soft border-b">
                <td className="py-4.5 text-text-3 w-1/2 pr-5 align-top">{row.typical}</td>
                <td className="py-4.5 text-text relative pl-5 align-top">
                  <span
                    aria-hidden
                    className="bg-accent absolute left-0 top-6 h-1.5 w-1.5 rounded-full"
                  />
                  {row.anvio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
