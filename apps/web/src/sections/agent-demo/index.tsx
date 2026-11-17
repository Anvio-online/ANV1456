import type { AgentDemoProps } from './agent-demo.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { isVoiceDemoConfigured } from '@/lib/vapi/config'
import { Full } from './variants/full'
import { Preview } from './variants/preview'
import { Voice } from './variants/voice'

/**
 * section-library.md §3 agentDemo — the differentiator.
 * - 'full'    — the live text plan demo (ADR-0005).
 * - 'preview' — the scripted, non-interactive fallback the spec calls
 *   for when a live path fails or isn't configured (section-library.md
 *   §5: "graceful degradation… the section must never look broken").
 * - 'voice'   — the live voice appointment-setter demo (ADR-0010): a
 *   short form, then a browser voice call that books a real meeting.
 *   Falls back to 'preview' on any failure, same as 'full'. Rendered
 *   here (server) as 'preview' when Vapi isn't configured, so an
 *   unconfigured deploy shows the scripted card rather than a form
 *   that would 503 on submit.
 */
export function AgentDemo(props: AgentDemoProps & { headingTag: HeadingTag }) {
  if (props.variant === 'voice')
    return isVoiceDemoConfigured ? <Voice {...props} /> : <Preview {...props} />
  if (props.variant === 'full') return <Full {...props} />
  return <Preview {...props} />
}
