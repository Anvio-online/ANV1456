import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class strings with correct precedence — never
 * template-literal concatenation, per conventions.md §3.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
