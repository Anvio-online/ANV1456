# ADR-0010: The AI appointment-setter demo is a web voice call on Vapi + Haiku, PSTN deferred

**Status:** Accepted
**Date:** 2026-09-02
**Deciders:** Anshika

> Numbering note: ADR-0008 and ADR-0009 are claimed on `feat/geo-infrastructure`,
> not yet merged. This lands on its own branch as 0010 to avoid a collision.

## Context

Anvio is positioned on **Automate** and every verifiable delivered project is
**Build** — the proof asymmetry [current-situation.md](../../business/current-situation.md)
calls the trap this project sets most often. The text agent demo ([ADR-0005](0005-agent-demo-model-and-email-gate.md))
is the current Automate-proof substitute. This adds a second, stronger one: a
live **AI appointment setter** — a voice agent that talks to the visitor, briefs
Anvio, gauges interest, and books a real 15-minute call with the founder. It is a
working demonstration of the exact service, and "AI appointment setter" is a
low-competition long-tail with clear buyer intent (checked 2026-09-02, distinct
from "AI appointment scheduling").

Two questions had to be answered together: what channel (a real phone call, or a
browser call), and on what infrastructure.

The constraints that bind the decision, all from `current-situation.md`:

- **Solo operator with a day job.** A voice system that spends money per
  interaction, live, in front of prospects is an ongoing operational load, not a
  one-time build.
- **No API-side spend cap.** ADR-0005 already calls the text demo "the only [part]
  with no upper bound on spend." A voice call is 10–50× the cost per interaction.
- **A real outbound dialer is a toll-fraud vector** (a visitor enters a
  premium-rate number, we pay) and pulls in Indian telecom regulation (TRAI UCC /
  DND) plus outbound caller-ID KYC.

## Decision

**Channel: the call happens in the visitor's browser (WebRTC), not on the PSTN.**
The visitor fills a short form (name, email, phone, consent), presses "talk to the
AI", and speaks to the agent through their mic and speakers. The phone number is
**collected** (the founder needs it to follow up) but **not dialled** in v1.

**Infrastructure: Vapi**, with **`claude-haiku-4-5`** as the model.

- Vapi has the most mature web SDK (`@vapi-ai/web`), takes a versioned prompt via
  `assistantOverrides` at call time, has a native Anthropic provider, a built-in
  Cal.com booking tool, and an `end-of-call-report` webhook — and the same
  platform carries a future PSTN phase with no re-architecture.
- Haiku, not Sonnet: the conversation is short scripted branching plus one tool
  call. It does not need Sonnet's depth, and **voice latency matters more than
  reasoning here**. Haiku is the cheapest Claude model, which keeps the per-call
  cost near the floor.
- The canonical prompt lives in `apps/web/src/lib/ai/prompts/appointment-demo.ts`,
  versioned and reviewed like code (same discipline as ADR-0005). The route passes
  it on every call; the Vapi assistant carries a copy so the dashboard playground
  matches.

**Booking: Cal.com.** The founder connects Google Calendar and exposes an "Anvio
intro call (15 min)" event type, wired to the assistant as a tool. Cal.com sends
the calendar invite to both parties itself.

**The gate is server-side.** `POST /api/appointment-demo` validates the form,
**re-checks consent**, rate-limits, records a lead row, then returns the assistant
config. A rate-limited or non-consenting caller gets no config back, so no call
starts. The Vapi **public** key is returned to the client — that is what it is
for; it can only start a call against the pre-configured assistant, it cannot read
data or change config.

**Cost controls (non-negotiable, mirrors ADR-0005's table):**

| Control | Implementation |
|---|---|
| Call duration | `maxDurationSeconds: 180` in the assistant overrides — the single biggest lever. |
| Per-IP rate limit | Upstash sliding window: **2 calls/hour, 6/day**. |
| Global kill-switch | **40 calls/day** across the whole demo, one fixed key. One abuser is bounded by the per-IP cap; the global cap catches a botnet or a link that goes around. |
| Spend alerts | A Vapi monthly budget alert **and** the existing Anthropic budget alert. |
| Consent | `consent: z.literal(true)`, re-checked in the start route. |
| AI disclosure | The first spoken line says it is an AI. Enforced in the prompt, first sentence. |
| Behaviour | Never quotes a firm price; declines off-topic; ends the call after a booking or a captured "no". |
| Failure | Any error → the section renders `agentDemo:preview`. Never a broken control. |

**PSTN (a real outbound phone call) is explicitly out of scope for v1** and needs
its own ADR: OTP phone verification, a country allowlist, per-number caps, a
robocall/TRAI compliance review, and Indian outbound caller-ID KYC.

## Alternatives considered

**Real outbound phone call now.** The bigger "wow", and closer to how the service
actually runs. Rejected for v1: it adds toll-fraud exposure, phone-verification
work, and a telecom-compliance review, on top of a system that already needs live
monitoring the founder doesn't have. The browser call runs the same conversation
and books the same real meeting at a fraction of the risk. PSTN becomes worth it
once the web demo is proven.

**Retell instead of Vapi.** A fine platform — LLM-agnostic, cheaper bundled
pricing, native Claude. Rejected only on web-SDK maturity; kept as the fallback if
Vapi's web SDK disappoints in practice.

**ElevenLabs Conversational AI.** Strong voices, simple widget. Rejected: less
control over the custom prompt and the LLM, and it absorbs LLM cost today but has
said it will pass it through later — an unpredictable cost base for the one
surface with no spend ceiling.

**Our own custom-LLM proxy route** (Vapi calls our app, our app calls Claude).
Rejected: an extra network hop to pay for and more code, for control we get anyway
by passing the prompt via `assistantOverrides`.

**Sonnet 5 (the text demo's model).** Rejected: over-specified for scripted
branching, and slower — in a voice call the pause is the cost.

**Replacing the text plan demo.** Rejected: they prove different things (a written
plan vs. a booked call) and cost differently. Both run; revisit with conversion
data.

## Consequences

**Good.** A second Automate-proof asset that demonstrates the service by doing it.
No toll-fraud surface, no phone-verification build, no TRAI exposure. The per-call
cost is bounded by a 3-minute cap and the rate limits. The whole thing degrades to
a static card when unconfigured, so it ships dark and lights up when the founder
adds the keys.

**Bad.** Two live demos on the home page is an attention and motion cost — the
voice section sits lower and quieter than §4, but it is still a second thing
asking for a mic. The `@vapi-ai/web` SDK (Daily.co under it) is a heavy lazy chunk
that loads when a visitor starts a call. Lead-row correlation depends on Vapi
echoing `variableValues.leadId` on the end-of-call report; if it doesn't, the
founder still gets the transcript email, just without the DB row linked. A browser
call is less impressive than "it rang my phone", which is the thing PSTN phase 2
buys back.

**Revisit when:**
- The web demo has real usage and we want the phone-call version → new ADR with
  the phone-verification and compliance model.
- Vapi's web SDK proves unreliable → switch to Retell (same architecture).
- Voice-demo conversion data exists → decide whether it earns its home-page slot
  next to the text demo, or replaces it.
- The global kill-switch trips in normal traffic → the demo is more popular than
  planned; raise the cap deliberately and note it here.
