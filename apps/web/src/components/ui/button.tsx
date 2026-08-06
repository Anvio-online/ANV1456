import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/**
 * design-system.md §6.1. Primary is amber fill everywhere (never used
 * as text-on-light per §2.3); the neutral aliases carry secondary so it
 * works on both canvases without a theme branch.
 */
const button = cva(
  // Tailwind's default `transition` covers color/background-color/border-color/
  // transform/opacity/box-shadow — no need to enumerate an arbitrary property list.
  'inline-flex items-center justify-center gap-2 rounded-md border border-transparent font-body font-medium transition duration-fast ease-soft-ui',
  {
    variants: {
      intent: {
        primary: 'bg-accent font-bold text-accent-on hover:bg-accent-hover hover:-translate-y-px',
        secondary:
          'border-border bg-transparent text-text hover:border-accent-line hover:bg-surface',
        link: 'gap-1 border-none bg-transparent p-0 text-accent-text hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-body-s',
        md: 'h-11 px-6 text-body',
        lg: 'h-13 px-7 text-body',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
)

type ButtonVariants = VariantProps<typeof button>

type ButtonAsButton = ButtonVariants &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonAsAnchor = ButtonVariants & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button({ className, intent, size, ...props }: ButtonAsButton | ButtonAsAnchor) {
  const classes = cn(button({ intent, size }), className)

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorProps } = props
    return (
      <a href={href} className={classes} {...anchorProps}>
        {props.children}
      </a>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...buttonProps}>
      {buttonProps.children}
    </button>
  )
}
