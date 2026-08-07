import Image from 'next/image'
import type { TeamProps } from '../team.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import type { CSSVarStyle } from '@/lib/utils/css-vars'

/**
 * about-spec.md §4 "Who you actually work with" — the page's honesty
 * section, themeShift boundary (argument -> person). `photo`/`name`
 * are both optional by design (types.ts's TeamProps): the copy is
 * written in first-person-plural so it reads fine either as a signed
 * personal note or an anonymous one, and the layout collapses to a
 * single measure-width column with no empty avatar slot when photo is
 * absent — an empty placeholder would announce the gap more loudly
 * than just not having one. Add photo/name later without touching
 * this component.
 */
export function FounderNote({
  eyebrow,
  heading,
  paragraphs = [],
  photo,
  name,
  role,
  headingTag,
}: TeamProps & { headingTag: HeadingTag }) {
  const HeadingTagEl = headingTag

  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {photo ? (
          <div className="border-border-soft relative h-28 w-28 shrink-0 overflow-hidden rounded-full border">
            <Image src={photo.src} alt={photo.alt} fill sizes="112px" className="object-cover" />
          </div>
        ) : null}

        <div className="max-w-measure flex flex-1 flex-col gap-6">
          {eyebrow ? (
            <span className="text-label text-accent-text font-mono uppercase tracking-widest">
              {eyebrow}
            </span>
          ) : null}
          {heading ? (
            <HeadingTagEl className="text-h2 leading-none tracking-tight">{heading}</HeadingTagEl>
          ) : null}

          {paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              className="fade-up-in text-body-l text-text-2"
              style={{ '--reveal-i': i } as CSSVarStyle}
            >
              {paragraph}
            </p>
          ))}

          {name ? (
            <p className="text-body-s text-text-3 mt-2">
              — {name}
              {role ? `, ${role}` : ''}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
