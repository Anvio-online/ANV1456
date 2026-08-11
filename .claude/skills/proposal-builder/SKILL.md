---
name: proposal-builder
description: Turn a technical scope into a client-facing proposal — problem, approach, phases, price, exclusions, and terms. Use when writing or reviewing a proposal, quote, or statement of work for a client.
---

# Proposal builder

Turns the output of `anvio-technical-architect` into a document a non-technical owner will read and sign.

Read `docs/business/services-and-pricing.md`, `docs/business/voice-and-tone.md`, and `.claude/rules/evidence-and-claims.md` first. If a scope file exists in `ops/proposals/`, start from it rather than re-deriving the scope.

---

## What a proposal has to do

The buyer is **non-technical, risk-averse about AI, and comparing Anvio against a cheaper option**. The proposal wins by:

1. Restating their problem **better than they stated it** — this is the single strongest signal that you understood the brief
2. Making the price feel like a decision rather than a number, by putting the cost of the status quo next to it
3. Removing risk — what happens if it's late, if scope changes, if they want to leave
4. Being clear about **what is not included**

It does not win by listing technologies.

---

## Structure

**1. The problem, in their words.** One paragraph. No Anvio, no solution yet. If they read only this and think "yes, exactly," the rest is a formality.

**2. The cost of leaving it.** Hours per month, in rupees, or revenue at risk — with the arithmetic shown. Use their numbers where they gave them and label anything estimated. This is the section that makes the price reasonable, so never skip it.

**3. What we'll do.** Outcome-led. The stack appears here as a credibility artifact, briefly, after the outcome — never as the opener.

**4. Phases.** What they can _see_ at the end of each. A client who sees nothing for six weeks starts asking different questions. Include their review points — this doubles as setting the expectation that client-side delay moves the date.

**5. Timeline.** Calendar weeks with a start condition ("weeks from kickoff, assuming assets by X"). Never a date that assumes instant client response.

**6. Investment.** The number, mapped to a published tier. Structure the payment schedule against phases. If the scope sits above a tier's published timeline, say so here — a public commitment that gets quietly exceeded is worse than one restated honestly.

**7. What's not included.** **Never empty.** Content writing, photography, ongoing hosting costs, third-party licences, post-launch changes beyond the support window, training beyond what's listed. Unstated exclusions become free work, then resentment.

**8. How we work.** The four published commitments, verbatim, because they are already public and must match:

> Scope changes are quoted before work starts — no surprise invoices.
> If we're running late, you hear before the deadline, with a revised date and the reason.
> You own everything we build — code, workflows, and documentation — from day one.
> At the end of an engagement, you can take everything and walk away.

**9. What we need from you.** Assets, approvals, access, and a named decision-maker. Client-side delay is the biggest risk on most SMB projects; naming it here is how it gets managed.

**10. Next step.** One action. Not "let us know your thoughts."

---

## Hard rules

- **No client names, case studies, testimonials, or results metrics.** None exist that are cleared for use. A proposal that leans on them is a proposal that can't be sent.
- **No price below a published floor** without a stated reason it's worth undercutting the positioning.
- **No single-number estimate** presented as certainty — the price is firm, the _scope_ is what's bounded.
- Never promise a delivery date that assumes zero client-side delay.
- Run the whole document through the `anvio-brand-voice` skill before it goes out.
- **A human sends it.** Draft to `ops/proposals/` at `status: draft`.
