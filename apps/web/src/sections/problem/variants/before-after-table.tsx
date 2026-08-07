'use client'

import { useState } from 'react'
import type { ProblemRow } from '../problem.types'
import type { CSSVarStyle } from '@/lib/utils/css-vars'
import { cn } from '@/lib/utils/cn'

type Column = 'without' | 'with'

/**
 * automate-spec.md §3 — "two-column contrast with a toggle on mobile."
 * why-us:contrast-table uses horizontal-scroll+fade instead, which
 * suits its short phrase-pairs; these rows are full sentences, where
 * horizontal scroll would cut mid-sentence, so a toggle is the better
 * fit here specifically, not a general upgrade to apply everywhere.
 *
 * Both columns stay in the DOM at all times — the toggle only ever
 * hides a <td> with CSS (`hidden`), never removes it — so the table
 * keeps its real semantics and both columns stay crawlable regardless
 * of which one is visually active. Server-rendered default is 'with',
 * matching the spec's amber-marker column being the one worth reading
 * first if JS never runs.
 */
export function BeforeAfterTable({ rows }: { rows: ProblemRow[] }) {
  const [active, setActive] = useState<Column>('with')

  return (
    <div>
      <div className="border-border mb-6 inline-flex gap-1 rounded-md border p-1 md:hidden">
        <ToggleButton
          label="Without automation"
          active={active === 'without'}
          onClick={() => setActive('without')}
        />
        <ToggleButton
          label="With Anvio"
          active={active === 'with'}
          onClick={() => setActive('with')}
        />
      </div>

      <table className="text-body w-full border-collapse">
        <thead className="hidden md:table-header-group">
          <tr>
            <th className="border-border text-label text-text-3 border-b pb-4 text-left font-mono uppercase tracking-widest">
              Without automation
            </th>
            <th className="border-border text-label text-accent-text border-b pb-4 pl-5 text-left font-mono uppercase tracking-widest">
              With Anvio
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.without}
              className="fade-up-in border-border-soft hover:bg-surface duration-fast border-b transition-colors"
              style={{ '--reveal-i': i } as CSSVarStyle}
            >
              <td
                className={cn(
                  'py-4.5 text-text-2 w-1/2 pr-5 align-top',
                  active !== 'without' && 'hidden md:table-cell',
                )}
              >
                {row.without}
              </td>
              <td
                className={cn(
                  'py-4.5 text-text relative pl-5 align-top',
                  active !== 'with' && 'hidden md:table-cell',
                )}
              >
                <span
                  aria-hidden
                  className="bg-accent absolute left-0 top-6 h-1.5 w-1.5 rounded-full"
                />
                {row.withAnvio}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ToggleButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'text-body-s duration-fast rounded-sm px-4 py-2 font-medium transition-colors',
        active ? 'bg-surface-2 text-text' : 'text-text-3',
      )}
    >
      {label}
    </button>
  )
}
