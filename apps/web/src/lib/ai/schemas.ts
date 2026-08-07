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

/**
 * No .max()/.min() on summary or nodes — Claude's structured outputs
 * (output_config.format) doesn't support string-length or array-length
 * JSON Schema constraints (claude-api skill: "Not supported: String
 * constraints (minLength, maxLength) ... Complex array constraints").
 * Sending them caused every /api/agent plan-stage call to 400. The
 * 400/7-node bounds are real requirements (section-library.md §5's
 * node diagram needs a bounded list) — enforced in the prompt instead,
 * in AGENT_DEMO_PLAN_PROMPT_V1, since the schema can't do it here.
 */
export const automationPlanSchema = z.object({
  summary: z.string(),
  nodes: z.array(planNodeSchema),
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
