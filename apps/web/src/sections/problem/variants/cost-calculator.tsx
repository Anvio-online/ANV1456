import type { ProblemProps } from '../problem.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { CostCalculatorInputs } from './cost-calculator-inputs'

/**
 * grow-spec.md §3. The recognition moment as arithmetic, not
 * description — a visitor doesn't feel "poor search visibility," they
 * feel "the phone doesn't ring." Server-rendered with the default
 * values already computed and visible: a real, readable table before
 * any JS runs, per the spec's degradation rule. Only the interactive
 * input handling is client-side (CostCalculatorInputs).
 */
export function CostCalculator({
  eyebrow,
  heading,
  body,
  calculator,
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

      {calculator ? <CostCalculatorInputs calculator={calculator} /> : null}
    </div>
  )
}
