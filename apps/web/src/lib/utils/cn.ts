import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge v2 ships with a snapshot of Tailwind's default theme —
 * it has no way to know about this project's own custom tokens
 * (design-system.md's --color-* and --text-* scales, registered in
 * globals.css's @theme block), so `text-{customColor}` and
 * `text-{customFontSize}` both fall through its default "ambiguous
 * text-* value" handling and get treated as the same conflicting
 * group. That silently deleted the color half of every
 * `text-{color} ... text-{size}` pairing on the site — most visibly,
 * every Button's `text-accent-on`/`text-text`/`text-accent-text` was
 * being dropped by its own `size` variant's `text-body-s` class,
 * leaving buttons with no explicit text color at all. Found via a live
 * Lighthouse contrast audit, not by inspection — this class of bug
 * produces no error, no warning, just silently wrong rendered output.
 *
 * Fix: tell tailwind-merge about both scales explicitly, so it can
 * tell a color utility apart from a font-size one instead of guessing.
 * Keep in sync with globals.css's @theme block — a token added there
 * without a matching entry here silently reintroduces this bug for
 * that token specifically.
 */
const COLOR_TOKENS = [
  'bg',
  'surface',
  'surface-2',
  'border',
  'border-soft',
  'text',
  'text-2',
  'text-3',
  'accent',
  'accent-hover',
  'accent-ink',
  'accent-press',
  'accent-on',
  'accent-wash',
  'accent-line',
  'accent-text',
  'success',
  'warning',
  'error',
  'info',
]

const FONT_SIZE_TOKENS = [
  'display-xl',
  'display-l',
  'h2',
  'h3',
  'h4',
  'body-l',
  'body',
  'body-s',
  'label',
  'metric',
  'code',
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'text-color': [{ text: COLOR_TOKENS }],
      'font-size': [{ text: FONT_SIZE_TOKENS }],
    },
  },
})

/**
 * Merge Tailwind class strings with correct precedence — never
 * template-literal concatenation, per conventions.md §3.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
