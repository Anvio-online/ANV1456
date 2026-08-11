---
name: anvio-brand-voice
description: Edit any Anvio-facing copy to the brand voice and check it for unsupportable claims. Use before publishing or sending anything a person outside Anvio will read — site copy, guides, cold emails, LinkedIn posts, proposals, newsletters — or when asked to "check the voice", "tighten this copy", "does this sound like us", or "is this claim safe to make".
---

# Anvio brand voice pass

A two-stage edit: **claims first, then voice.** Claims are the stage that carries legal and contractual exposure, so it runs first and a failure there stops the edit.

Read `docs/business/voice-and-tone.md` and `.claude/rules/evidence-and-claims.md` before starting. Work from those files, not from a summary.

---

## Stage 1 — the claims pass

Scan the copy for **every number, name, superlative, and implied capability.** For each, ask: where did this come from?

Strike or rewrite anything in this list. These aren't stylistic — most are contractual or legal exposure:

| Kill on sight                                               | Replace with                                           |
| ----------------------------------------------------------- | ------------------------------------------------------ |
| Any named client, logo, or testimonial                      | Nothing. There is no cleared client name               |
| Any client results metric ("cut costs 40%")                 | The mechanism, or the operational commitment           |
| Traffic, ranking, or conversion numbers for anvio.online    | Nothing — no analytics is wired                        |
| A Lighthouse/CWV score                                      | Nothing until one is published                         |
| The employer's name or work, in any framing                 | Nothing, pending written permission                    |
| A price for Automate or Grow work                           | "Quoted after discovery"                               |
| "Our team", "our engineers", any implied plurality of staff | "We" as company voice is fine; staffing claims are not |
| "We've helped businesses like yours…"                       | Delete. It implies clients that don't exist            |

**Freely usable:** the live agent demo, the ROI calculator, anvio.online itself, and the published guides — all real, all ours. Internal builds are fine when labelled as internal.

If the copy collapses once unsupportable claims are removed, **say so** rather than substituting softer versions of the same implication. That's the finding.

---

## Stage 2 — the voice pass

The voice: _a senior engineer explaining a business problem to a smart non-technical owner, without condescending and without showing off._

Work through in this order:

1. **Concrete over abstract.** "Your team re-types 200 invoices a month" replaces "operational inefficiency."
2. **Specific numbers, or none.** "Up to 90%" is worse than no number at all.
3. **Outcome before mechanism.** The stack is credibility shown after trust, never the opener.
4. **Name the tradeoff.** If the copy is all upside, it reads as a pitch. One honest limitation buys more trust than three benefits.
5. **Cut the banned words** — cutting-edge, revolutionary, game-changing, seamless, synergy, leverage (verb), unlock, supercharge, "we're passionate about", "AI-powered" as a standalone benefit.
6. **Shorten.** Ordinary words, short sentences, second person. Delete every sentence that survives only because it sounds professional.
7. **Channel calibration** — length, opening move, and ending per `voice-and-tone.md` §4. A cold email is under 120 words; a LinkedIn post opens with a situation, not a hook.

---

## The two final tests

1. **Could a competitor put their logo on this unchanged?** If yes, it says nothing. Rewrite.
2. **Does this move toward or away from _"these people aren't freelancers, they look like a product engineering company"_?**

---

## Output

Show the edited copy, then a short list of what changed and why. **Call out separately any claim you removed** and what would make it usable — usually "once the Stratseek agreement is read" or "once analytics is wired." That list is often the most useful part of the pass.
