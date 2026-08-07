import type { AgentDemoProps } from './agent-demo.types'
import type { HeadingTag } from '@/lib/sections/heading-level'
import { Full } from './variants/full'
import { Preview } from './variants/preview'

/**
 * section-library.md §3 agentDemo — the differentiator. 'full' is the
 * live interactive demo; 'preview' is the scripted, non-interactive
 * fallback the spec calls for when the live path fails or isn't
 * configured (section-library.md §5's engineering notes: "graceful
 * degradation... the section must never look broken").
 */
export function AgentDemo(props: AgentDemoProps & { headingTag: HeadingTag }) {
  return props.variant === 'full' ? <Full {...props} /> : <Preview {...props} />
}
