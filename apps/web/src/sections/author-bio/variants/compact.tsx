import Image from 'next/image'
import type { AuthorBioProps } from '../author-bio.types'

/**
 * guides-spec.md §2's fallback ladder. `name` omitted means a role
 * byline only — same "no empty avatar slot, just a single column"
 * treatment as team:founder-note when there's no photo yet, and the
 * same rule against a stock photo: omit, never fake.
 */
export function Compact({ name, role, bio, photo }: AuthorBioProps) {
  return (
    <div className="max-w-page px-gutter mx-auto">
      <div className="border-border-soft max-w-measure mx-auto flex items-start gap-4 border-t pt-8">
        {photo ? (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <Image src={photo.src} alt={photo.alt} fill sizes="56px" className="object-cover" />
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          <p className="text-body font-medium">{name ? `${name} — ${role}` : role}</p>
          <p className="text-body-s text-text-2">{bio}</p>
        </div>
      </div>
    </div>
  )
}
