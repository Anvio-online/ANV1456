import Anthropic from '@anthropic-ai/sdk'
import { env } from '@/lib/env'

/**
 * Server-only. Never imported from a client component or a route that
 * could leak into the client bundle — there is no NEXT_PUBLIC_ prefix
 * on ANTHROPIC_API_KEY, and it must stay that way. tech-stack.md §5.
 */
export const anthropic = env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: env.ANTHROPIC_API_KEY })
  : null

export const AGENT_MODEL = 'claude-sonnet-5' as const // ADR-0005
