import type { ContactProps } from '../contact.types'
import type { HeadingTag } from '@/lib/sections/heading-level'

/**
 * contact-spec.md §3. Plain and scannable — no form, no map (a CLS
 * risk and a third-party script nobody needs), no phone number unless
 * someone actually answers it.
 */
export function Details({
  eyebrow,
  heading,
  email,
  responseTime,
  location,
  headingTag,
}: ContactProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  const rows: { label: string; value: string; href?: string }[] = [
    email ? { label: 'Email', value: email, href: `mailto:${email}` } : null,
    responseTime ? { label: 'Response time', value: responseTime } : null,
    location ? { label: 'Where we are', value: location } : null,
  ].filter((row): row is NonNullable<typeof row> => row !== null)

  return (
    <div className="max-w-page px-gutter mx-auto">
      {eyebrow || heading ? (
        <div className="mb-8 flex flex-col gap-4">
          {eyebrow ? (
            <span className="text-label text-accent-text font-mono uppercase tracking-widest">
              {eyebrow}
            </span>
          ) : null}
          {heading ? (
            <HeadingTagEl className="text-h2 leading-none tracking-tight">{heading}</HeadingTagEl>
          ) : null}
        </div>
      ) : null}

      <dl className="border-border-soft divide-border-soft flex flex-col divide-y border-t">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
            <dt className="text-label text-text-3 w-40 shrink-0 font-mono uppercase tracking-widest">
              {row.label}
            </dt>
            <dd className="text-body text-text">
              {row.href ? (
                <a href={row.href} className="hover:text-accent-text hover:underline">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
