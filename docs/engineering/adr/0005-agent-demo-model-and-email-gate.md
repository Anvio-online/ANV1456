# ADR-0005: Agent demo runs on Sonnet 5, behind an email gate

**Status:** Accepted
**Date:** 2026-08-07
**Deciders:** Anshika

## Context

The agent demo is the site's differentiator and its answer to having no AI/automation case studies yet ([home-spec.md](../../specs/home-spec.md) §4). It is also the only part of the site with a per-visitor marginal cost, and the only one with no upper bound on spend — a public LLM endpoint will be found, and some of the traffic hitting it will never become a lead.

Two questions had to be answered together: which model, and what guarantees the spend returns something.

## Decision

**Model: `claude-sonnet-5`** ($3 / $15 per MTok; $2 / $10 introductory through 2026-08-31), not `claude-opus-5` ($5 / $25).

**The expensive call is gated on an email address.** The flow splits by cost:

| Stage | Cost | Gate |
|---|---|---|
| Q&A turns (3–4 short streamed exchanges, `effort: low`) | Cheap | None — open to everyone |
| Plan generation (one structured call, `effort: medium`) | The real cost | **Email required** |

The visitor describes their process, answers the follow-ups, then sees: *"Your plan is ready — where should we send it?"* The plan renders in the panel **and** is emailed. Nobody pays for a plan we can't follow up on.

## Alternatives considered

**Opus 5, ungated.** Best demo quality and the most open feel. Rejected: roughly 1.7× the token cost with no capture guarantee, on the one endpoint that can run up an unbounded bill.

**Sonnet 5, email at the end (the original spec).** Plan renders free; email only for the "full written version". Rejected: it pays for every visitor and captures only the ones who want the follow-up — exactly the wrong side of the trade when the whole point is that the spend returns a contact.

**Email before anything.** Maximum protection. Rejected: it kills the demo. The section's promise is "try it, no call required" — a form on the front door makes it just another lead-gen widget, and the differentiator evaporates.

**Haiku 4.5** ($1 / $5). Rejected: this output *is* the sales pitch. There is a floor below which a bad plan does more damage than no demo.

## Consequences

**Good:** ~40% lower token cost than Opus. Every expensive call produces a contactable lead. The gate lands at the highest-intent moment — after three or four answers, when the visitor has already invested effort and the plan is one click away — rather than at the door. The cheap turns stay open, so the section still reads as "try it".

**Bad:** some visitors will abandon at the email field, and we'll have paid for their Q&A turns (small, but real). Sonnet 5 plans will occasionally be less insightful than Opus would produce. The gate adds a step to the demo, which slightly dilutes the "no friction" claim.

**Also required by this decision:**
- Upstash per-IP rate limit: **3 completed plans/hour, 10/day**, and a separate lower cap on Q&A turns.
- Hard `max_tokens` per call and a max turn count per session, server-side.
- A monthly spend alert on the Anthropic account. The rate limit bounds one abuser; the alert catches everything else.
- Consent notice on the email field, and transcripts stored against the captured email.

**Revisit when:** conversion data exists. If the gate's abandonment rate is high, test showing a partial plan (diagram only, no hours estimate) before the gate. If Sonnet 5 plan quality visibly underperforms in real conversations, revisit the model — write a new ADR either way.
