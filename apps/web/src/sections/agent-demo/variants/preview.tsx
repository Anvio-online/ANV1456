import type { AgentDemoProps } from '../agent-demo.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Button } from '@/components/ui/button'

/**
 * section-library.md §3 — "non-interactive scripted transcript with a
 * CTA into full." Used two ways: (1) as its own page-composition
 * variant, and (2) by Full itself as the runtime fallback when the
 * live demo can't run (misconfigured, or the very first request
 * fails) — see full.tsx. Either way, the section must never look
 * broken, per section-library.md §5's engineering notes.
 */
const SCRIPT = [
  { role: 'user' as const, text: 'We re-type WhatsApp orders into our CRM by hand.' },
  { role: 'assistant' as const, text: 'Roughly how many orders come in on WhatsApp each week?' },
  { role: 'user' as const, text: 'About 180.' },
  {
    role: 'assistant' as const,
    text: 'Got it — high volume, low judgement. That’s a strong first automation.',
  },
]

export function Preview({
  eyebrow,
  heading,
  body,
  headingTag,
}: AgentDemoProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="mb-10 flex flex-col gap-4">
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

      <div className="max-w-content border-accent-line bg-surface mx-auto flex flex-col gap-3 rounded-xl border p-7">
        {SCRIPT.map((line, i) => (
          <p
            key={i}
            className={
              line.role === 'user'
                ? 'max-w-4/5 border-accent-line bg-accent-wash text-body-s text-text self-end rounded-xl border px-4 py-3'
                : 'max-w-4/5 border-border bg-surface-2 text-body-s text-text-2 self-start rounded-xl border px-4 py-3'
            }
          >
            {line.text}
          </p>
        ))}

        <div className="border-border mt-4 flex flex-col items-center gap-3 border-t pt-6 text-center">
          <p className="text-body-s text-text-2">
            The live version of this is temporarily unavailable — but a real conversation gets you
            the same answer, faster.
          </p>
          <Button href="/contact" size="md">
            Book a free consultation
          </Button>
        </div>
      </div>
    </div>
  )
}
