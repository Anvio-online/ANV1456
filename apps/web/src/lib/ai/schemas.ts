import { z } from 'zod'

/**
 * The plan's shape, enforced via output_config.format on the structured
 * call — see tech-stack.md §5. Free-text plans make an unreliable demo;
 * this schema is what the client's node diagram renders from.
 */
export const planNodeSchema = z.object({
  label: z.string(),
  detail: z.string(),
})

export const automationPlanSchema = z.object({
  summary: z.string().max(400),
  nodes: z.array(planNodeSchema).min(3).max(7),
  estimatedHoursSavedPerMonth: z.object({ low: z.number(), high: z.number() }),
  complexity: z.enum(['low', 'medium', 'high']),
})

export type AutomationPlan = z.infer<typeof automationPlanSchema>

export const chatTurnSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2000),
})

export type ChatTurn = z.infer<typeof chatTurnSchema>

/** Request body for POST /api/agent — see route.ts for the two-stage flow. */
export const agentRequestSchema = z.object({
  turns: z.array(chatTurnSchema).min(1).max(12),
  /** Required only when the client is asking for the plan stage (ADR-0005). */
  email: z.string().email().optional(),
  stage: z.enum(['chat', 'plan']),
})
