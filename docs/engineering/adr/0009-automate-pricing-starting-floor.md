# ADR-0009: Automate work publishes a single "starting from" floor

**Status:** Accepted
**Date:** 2026-09-02
**Deciders:** Anshika (owner)

## Context

The brand is positioned on Automate. [evidence-and-claims.md](../../../.claude/rules/evidence-and-claims.md) §2 has, since v1, listed *"A price for Automate or Grow work"* under **Never** — the reasoning being that automation scope varies too much for a floor to mean anything, there is no delivered-automation engagement to price against, and a published number invites a quote-shaped expectation the discovery process is meant to set.

That rule is not being followed on the live site. `/services/automate/ai-chatbot-development` ships an FAQ answer quoting `₹30,000–₹90,000` to build; `/services/automate` ships one quoting `₹75,000–₹2,50,000` plus a `₹35,000/month` retainer; the `how-to-automate-invoice-data-entry` guide says a build "in the ₹30,000–₹90,000 range is typical." Three surfaces, three different shapes, all contradicting the rule doc, none recorded as a decision.

So the real choice is not "publish a price or not" — a price is already published. It is: remove all of them and go back to the rule, or make the published pricing deliberate and consistent.

[services-and-pricing.md](../../business/services-and-pricing.md) §2 already solves the same problem for Build: a single **"Starting from ₹X"** floor per tier, stated as a floor and not a quote, with *"we quote after discovery, never before."* The floor is what makes a cheap-website shopper self-select out; the quote is what keeps the number honest. That mechanism applies to Automate identically.

## Decision

**Automate content may state a single "Starting from ₹30,000" floor** for a well-defined single-process automation — a focused chatbot, one workflow, one integration.

Rules:
- **One floor, one number.** `₹30,000`. Not a range. The upper end of a range becomes an anchor and reads as an estimate.
- **No retainer figure as a published price.** Ongoing support and monitoring are quoted after discovery like any other scope.
- **Always paired with "we quote the full scope after a discovery call."** The floor is a filter, not an estimate.
- **Never presented as "typical" or "expected."** It is the starting point for the simplest real engagement; most builds are more.
- Applies to `/services/automate`, its leaves, and guides. The `automation-roi-calculator` is unaffected — it computes the client's own cost of *not* automating, not Anvio's price.

**Grow pricing stays unpublished.** SEO/GEO/performance retainers vary more than automation builds, have no delivered baseline under the Anvio name, and the Build-style floor logic does not map cleanly. The evidence-and-claims.md **Never** row is narrowed to Grow, not removed.

## Alternatives considered

- **Remove every Automate price, restore the original rule.** Rejected: the cheap-shopper filter is real value (it is the entire argument for Build's floors), the pages already carry numbers so removal is also a change, and "the range is set after discovery" with no floor at all gives a price-sensitive lead nothing to self-select against.
- **Publish ranges (`₹30,000–₹90,000`).** Rejected: a range reads as a quote, and the top number becomes the number the client remembers and expects to negotiate down from. A floor with an open top is honest about the discovery step in a way a range is not.
- **Publish a full Automate rate card by automation type.** Rejected: automation scope genuinely varies build-to-build, and there is no delivered-automation cost history to build a card from. That is the part of the original rule's reasoning that still holds.
- **Two floors (chatbot vs. multi-system workflow).** Rejected for now: more precise but two numbers to keep in sync across more surfaces, and the simplest engagement is the same order of magnitude either way. Revisit if the single floor misleads.

## Consequences

**Good:**
- One consistent, deliberate number across the site, replacing three contradictory ones.
- Same pricing model as Build — the site reads as one company with one commercial posture.
- Filters price-only leads before they reach a call.
- Resolves a standing site-vs-docs contradiction.

**Bad:**
- A floor with no delivered-automation engagement behind it is a softer number than Build's floors, which sit on real delivered ecommerce work. Mitigated by keeping it explicitly a *floor*, never a typical figure, and by the discovery-quote pairing.
- One more number that must stay in sync between the site and services-and-pricing.md (§2's existing rule — fix both in the same PR — now covers this too).
- Partially supersedes a rule that exists for legal/contractual caution. The caution was about *client-results metrics* and *invented specifics*; a published starting floor for our own service is neither, but the line is now one we have to hold deliberately rather than by blanket prohibition.

**Still unresolved after this ADR (not in scope, flagged for a follow-up):**
- Home's `engagementModel` section still shows a **Growth Retainer — "Starting from ₹35,000/mo"**. That is a published Grow price, which this decision explicitly does *not* sanction. Either Grow gets its own decision, or that tier's figure comes off Home.
- Home's `engagementModel` **Product Build — "Starting from ₹2,00,000"** does not match any Build tier floor in services-and-pricing.md §2 (₹25,000 / ₹1,25,000 / ₹2,50,000 / ₹4,00,000). Pre-existing drift, unrelated to Automate.

The Automate change here does align Home's **Automation Sprint** tier (was "Starting from ₹75,000") to the ₹30,000 floor.

**Revisit when:** a delivered automation engagement produces a real cost baseline (tighten or tier the floor from data), or the floor visibly attracts the wrong leads (raise it, or move back to discovery-only), or Grow reaches the same "numbers already on the page" state this decision was made to resolve.
