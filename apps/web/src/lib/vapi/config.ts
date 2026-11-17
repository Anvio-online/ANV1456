import { createHmac, timingSafeEqual } from 'node:crypto'
import { env } from '@/lib/env'
import {
  APPOINTMENT_DEMO_SYSTEM_PROMPT_V1,
  APPOINTMENT_DEMO_SUMMARY_PROMPT_V1,
  appointmentDemoFirstMessage,
} from '@/lib/ai/prompts/appointment-demo'

/**
 * Vapi wiring for the voice appointment-setter demo (ADR-0010).
 *
 * The browser SDK (`@vapi-ai/web`) starts the call with the *public*
 * key against a pre-configured assistant. This module supplies two
 * server-owned things the client must not author:
 *   1. `buildAssistantOverrides` — the versioned prompt + call limits,
 *      handed back by POST /api/appointment-demo so the client passes
 *      them straight into `vapi.start()`.
 *   2. `verifyVapiWebhook` — the inbound guard on the end-of-call report.
 *
 * `MODEL` is Haiku: the conversation is short, scripted branching plus
 * one tool call, and voice latency matters more than depth here
 * (ADR-0010). It is the cheapest Claude model, which keeps the per-call
 * cost near the floor.
 */
const MODEL = 'claude-haiku-4-5-20251001'

/** Hard ceiling per call — the single biggest cost control. Matches the
 * 3-minute figure in ADR-0010 and the rate-limit sizing. */
const MAX_CALL_SECONDS = 180

export const isVoiceDemoConfigured =
  Boolean(env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) && Boolean(env.VAPI_ASSISTANT_ID)

type BuildArgs = { name: string; leadId: string }

/**
 * Shape matches `AssistantOverrides` from `@vapi-ai/web` — kept as a
 * plain object (not imported) so this stays a server module with no
 * pull on the browser SDK. The client casts it on the way into
 * `vapi.start()`.
 */
export function buildAssistantOverrides({ name, leadId }: BuildArgs) {
  return {
    model: {
      provider: 'anthropic' as const,
      model: MODEL,
      // Short turns: this is a phone call, not an essay.
      maxTokens: 250,
      temperature: 0.4,
      messages: [{ role: 'system' as const, content: APPOINTMENT_DEMO_SYSTEM_PROMPT_V1 }],
      // The Cal.com booking tool lives on the assistant; re-declare it
      // here so overriding `model` doesn't drop it. Absent → the agent
      // falls back to "the founder will email you a time" (see prompt).
      ...(env.VAPI_CALCOM_TOOL_ID ? { toolIds: [env.VAPI_CALCOM_TOOL_ID] } : {}),
    },
    firstMessage: appointmentDemoFirstMessage(name),
    maxDurationSeconds: MAX_CALL_SECONDS,
    // LiquidJS `{{name}}` in the prompt; `leadId` is echoed back on the
    // end-of-call report so the webhook can find our row.
    variableValues: { name, leadId },
    // Only the report matters server-side; keep the client stream to
    // what the UI renders.
    serverMessages: ['end-of-call-report'],
    clientMessages: ['transcript', 'status-update', 'speech-update'],
    analysisPlan: {
      summaryPrompt: APPOINTMENT_DEMO_SUMMARY_PROMPT_V1,
      structuredDataPrompt:
        'Extract: interested (bool), booked (bool), bookedFor (string, if booked), ' +
        'requestedAutomation (string, if they named one).',
      structuredDataSchema: {
        type: 'object',
        properties: {
          interested: { type: 'boolean' },
          booked: { type: 'boolean' },
          bookedFor: { type: 'string' },
          requestedAutomation: { type: 'string' },
        },
      },
    },
  }
}

/**
 * Verify an inbound Vapi server message. Vapi can be configured with a
 * plain shared secret (sent as `x-vapi-secret`) or an HMAC signature
 * (`x-vapi-signature`, hex SHA-256 of the raw body). Accept either so
 * the webhook keeps working whichever the dashboard is set to.
 *
 * Fails closed when a secret is configured. In local dev with no secret
 * set, returns true so the flow is testable — never the production path
 * (`VAPI_WEBHOOK_SECRET` is required there by deploy config).
 */
export function verifyVapiWebhook(rawBody: string, headers: Headers): boolean {
  const secret = env.VAPI_WEBHOOK_SECRET
  if (!secret) return env.NODE_ENV !== 'production'

  const provided = headers.get('x-vapi-secret')
  if (provided && safeEqual(provided, secret)) return true

  const signature = headers.get('x-vapi-signature')
  if (signature) {
    const expected = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
    if (safeEqual(signature, expected)) return true
  }

  return false
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}
