import type { ProblemProps } from '../problem.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { AutomationCalculatorInputs } from './automation-calculator-inputs'

/**
 * tools-spec.md §3. Same server/client split as cost-calculator.tsx —
 * defaults computed and visible before any JS runs, only the input
 * handling is client-side.
 */
export function AutomationCalculator({
  eyebrow,
  heading,
  body,
  automationCalculator,
  headingTag,
}: ProblemProps & { headingTag: HeadingTag }) {
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
        {body ? <p className="max-w-measure text-body-l text-text-2">{body}</p> : null}
      </div>

      {automationCalculator ? (
        <AutomationCalculatorInputs calculator={automationCalculator} />
      ) : null}
    </div>
  )
}
