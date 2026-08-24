import { NextResponse, type NextRequest } from 'next/server'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { anthropic, AGENT_MODEL } from '@/lib/ai/client'
import { AGENT_DEMO_SYSTEM_PROMPT_V1, AGENT_DEMO_PLAN_PROMPT_V1 } from '@/lib/ai/prompts/agent-demo'
import { agentRequestSchema, automationPlanSchema } from '@/lib/ai/schemas'
import { checkChatRateLimit, checkPlanRateLimit } from '@/lib/rate-limit'
import { sendAutomationPlanEmail } from '@/lib/email/agent-plan'

export const runtime = 'nodejs'

/**
 * The agent demo backend. Two stages, split at the cost boundary
 * (ADR-0005, tech-stack.md §5):
 *
 *   stage: 'chat' — streamed text, cheap, no email required.
 *   stage: 'plan' — one structured call, REQUIRES a captured email.
 *
 * The gate is enforced here, not just in the UI — a request for the
 * plan stage without a valid email is rejected before any model call
 * is made, regardless of what the client sends.
 */
export async function POST(req: NextRequest) {
  if (!anthropic) {
    return NextResponse.json({ error: 'Agent demo is not configured.' }, { status: 503 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'

  const parsed = agentRequestSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const { turns, email, stage } = parsed.data

  if (stage === 'chat') {
    const rl = await checkChatRateLimit(ip)
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 })
    }

    const stream = await anthropic.messages.stream({
      model: AGENT_MODEL,
      max_tokens: 512,
      system: [
        { type: 'text', text: AGENT_DEMO_SYSTEM_PROMPT_V1, cache_control: { type: 'ephemeral' } },
      ],
      output_config: { effort: 'low' },
      messages: turns.map((t) => ({ role: t.role, content: t.content })),
    })

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
        } finally {
          controller.close()
        }
      },
    })
    return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }

  // stage === 'plan' — the gated, expensive path.
  if (!email) {
    return NextResponse.json(
      { error: 'An email is required to generate the automation plan.' },
      { status: 400 },
    )
  }

  const rl = await checkPlanRateLimit(ip)
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many plans requested. Try again later.' },
      { status: 429 },
    )
  }

  // `turns` is the same array the client used for the chat stage, so it
  // ends on the assistant's "ready to sketch a plan" message — the client
  // never appends anything after that; the email submission is the only
  // signal that the plan was requested. Sonnet 5 (like every current
  // Claude model) rejects a conversation that doesn't end on a user turn
  // as an assistant-message prefill attempt, so every real plan request
  // 400'd here. Append the actual request as a real user turn rather than
  // relying on the transcript's last message already being one.
  const res = await anthropic.messages.parse({
    model: AGENT_MODEL,
    max_tokens: 1024,
    system: [
      { type: 'text', text: AGENT_DEMO_PLAN_PROMPT_V1, cache_control: { type: 'ephemeral' } },
    ],
    output_config: { format: zodOutputFormat(automationPlanSchema), effort: 'medium' },
    messages: [
      ...turns.map((t) => ({ role: t.role, content: t.content })),
      { role: 'user' as const, content: 'Generate the automation plan now.' },
    ],
  })

  // Safety classifiers can decline and return HTTP 200 with empty content —
  // never index into `content` before checking this. See tech-stack.md §5.
  if (res.stop_reason === 'refusal') {
    return NextResponse.json(
      { error: 'Could not generate a plan for that request.' },
      { status: 422 },
    )
  }

  // parsed_output is null if parsing failed even after a 200 — never
  // render free-text into the diagram. Fall back to the scripted
  // preview on the client instead. See section-library.md §5.
  if (!res.parsed_output) {
    return NextResponse.json({ error: 'Plan generation failed validation.' }, { status: 502 })
  }

  // The model call already succeeded and cost real money — a Resend
  // failure here must not crash to a bare, uncaught 500 (Next swallows
  // the message entirely). Log the real reason server-side and still
  // hand the visitor their plan; losing the emailed copy is better than
  // losing a plan we already paid to generate.
  try {
    await sendAutomationPlanEmail(email, res.parsed_output)
  } catch (err) {
    console.error('[agent] plan email failed to send', err)
  }

  return NextResponse.json({ plan: res.parsed_output })
}
