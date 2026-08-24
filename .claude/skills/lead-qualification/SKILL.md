---
name: lead-qualification
description: Score a prospect against Anvio's ICP using the 100-point rubric — fit, problem severity, outreach leverage, opportunity clarity, reachability, timing. Use when qualifying an inbound enquiry, deciding whether a lead is worth outreach, or reviewing a lead list for inflation.
---

# Lead qualification

The rubric `anvio-lead-researcher` scores against, usable on its own for a single inbound lead or to audit a list someone else produced.

Read `docs/business/icp.md` and `docs/business/current-situation.md` first.

**v2, 2026-08-13.** Adds **Outreach leverage** and rebalances the weights. Scores produced under v1 are not comparable — re-score rather than convert. The reasoning is in §"Why leverage exists" below; read it before scoring, because it is the component people get wrong.

---

## The rubric — 100 points

| Component             | Points | Asks                                         |
| --------------------- | ------ | -------------------------------------------- |
| ICP fit               | 20     | Are they the kind of business we serve?      |
| Problem severity      | 20     | How much is it costing them?                 |
| **Outreach leverage** | **20** | **Does this problem give us a way in?**      |
| Opportunity clarity   | 15     | Can we name the work in one sentence?        |
| Reachability          | 15     | Can we actually reach a person who can sign? |
| Timing signal         | 10     | Is something happening right now?            |

### ICP fit — 20

|       |                                                                                             |
| ----- | ------------------------------------------------------------------------------------------- |
| 16–20 | 10–200 employees, revenue-generating, India or UAE, in a sector where the problem is common |
| 10–15 | Fits size and market but the sector fit is unproven                                         |
| 4–9   | Edge of the profile — very small, or a market with no delivery precedent                    |
| 0–3   | Enterprise, pre-revenue, or asking for something off-position                               |

**Hard zero:** visible enterprise procurement (vendor portals, RFPs). The cycle is 6–18 months and Anvio cannot fund the wait.

### Problem severity — 20

Score on how much it is **costing them right now**, not on how interesting it is to solve.

|       |                                                                                                                                                 |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 16–20 | Quantifiable and they demonstrably feel it — a job posting for manual work, public support complaints, a revenue path that is broken or leaking |
| 10–15 | Clearly present and observable, but the cost is inferred                                                                                        |
| 4–9   | Real but tolerable. They've lived with it for years                                                                                             |
| 0–3   | You had to invent the problem to make the lead work                                                                                             |

**Do not score visibility here.** How obvious the problem is belongs in Outreach leverage, where it counts _against_ the lead. A problem can be genuinely severe and still be a terrible thing to open an email with.

### Outreach leverage — 20

**The question this answers: does this problem give us a way in?** Two halves, 10 points each. Score them separately and show both.

**A. Owner-unawareness — 10.** Has the owner necessarily already seen this?

|      |                                                                                                                                                                                                                                     |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8–10 | Almost certainly unseen. Takes inspection to find — a link whose visible label and target differ, a page section swallowed by bad markup, a placeholder that only appears at a specific checkout step, thin catalogue copy at scale |
| 4–7  | They may know but are likely under-rating it — slow pages, weak metadata, unconverted traffic                                                                                                                                       |
| 0–3  | They unavoidably know. A total outage, an expired certificate, a suspended store, a site that will not load                                                                                                                         |

**B. Anvio-fixability — 10.** Is a developer actually the remedy?

|      |                                                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 8–10 | A developer is precisely the remedy, and it maps cleanly to Build / Automate / Grow                                                              |
| 4–7  | Anvio can help, but the fix needs something from them first — content, access, or a decision                                                     |
| 0–3  | The remedy is not development: a billing or account matter, a legal problem, a courier or supplier issue, or a strategic call only they can make |

**The cap.** If Outreach leverage totals **5 or below, the lead cannot exceed 59 overall**, whatever the other components say. Record the uncapped total alongside it so the reason stays visible.

This cap exists because without it, the worse a prospect's situation looks, the higher they score — which is exactly backwards.

### Opportunity clarity — 15

Can you name the exact service and the outcome in **one sentence**?

|       |                                                                                     |
| ----- | ----------------------------------------------------------------------------------- |
| 12–15 | "Automate their invoice intake — the ops person spends ~15 hours a month re-typing" |
| 6–11  | The pillar is clear, the specific service isn't                                     |
| 0–5   | "Could use AI automation." True of everyone. Worthless                              |

### Reachability — 15

|       |                                                              |
| ----- | ------------------------------------------------------------ |
| 12–15 | Named decision-maker **and** a public business contact route |
| 7–11  | One of the two                                               |
| 3–6   | A generic inbox and no named person                          |
| 0–2   | No route at all                                              |

**Never** raise this score with a guessed or pattern-generated email address.

Check the company's own LinkedIn page and their own About/Team pages directly. Search-result summaries are not sufficient — on the 2026-08-12 run, direct checks moved two leads up and confirmed one apparent gap was real.

### Timing signal — 10

An active trigger from `icp.md` §5 — recent funding, hiring for a role that's mostly manual work, announced expansion, a visible competitor move, a public complaint about support volume.

|      |                                        |
| ---- | -------------------------------------- |
| 8–10 | Active trigger, dated within ~3 months |
| 4–7  | Older trigger, or a soft one           |
| 0–3  | None found                             |

Weighted at 10 rather than 15 because triggers are genuinely rare in practice — 2 of 21 companies on the Dubai run, 0 of 23 on the India run. A component that almost never fires should not swing a third of the score.

---

## Why leverage exists

Two runs produced the evidence, and the pattern is worth internalising rather than just obeying.

**eské** scored **88** under v1 — the highest of either run — on a storefront returning HTTP 402. A browser check showed Shopify's own suspension notice: _"This store is currently unavailable… contact Shopify support."_ A billing matter. Anvio cannot fix it, the owner unavoidably knows (they cannot reach their own admin), and an email pointing it out reads as a stranger noticing their financial trouble. Severity scored 24/25.

**RAW Coffee Company** scored **72** on a malformed contact link. A browser check confirmed the displayed address and the `href` pointed at different addresses, and an unclosed tag swallowed an entire "Sales Enquiries" row so it never rendered at all. The owner almost certainly did not know. It is a cheap fix. **This was by far the better lead — and scored 16 points lower.**

The generalisation: **what earns a reply is a problem the owner has not already seen and Anvio can actually fix.** Severity alone rewards visible breakage, which is close to the inverse of that.

This is consistent with the tone-safe test in `ops/templates/prospect-site-audit.md` §5 — if a finding fails that test for outreach, it should be scoring low on leverage here. The two should never disagree.

---

## Bands

| Score     | Action                                                                   |
| --------- | ------------------------------------------------------------------------ |
| **80+**   | Research deeply, pursue now                                              |
| **60–79** | Worth outreach                                                           |
| **40–59** | Nurture. Low priority                                                    |
| **< 40**  | Drop — and record why, so the same lead isn't re-researched next quarter |

---

## Anti-inflation check

Run this before accepting any score, especially your own:

1. **Is every scoring input sourced?** No source, no points.
2. **Would the opportunity sentence survive being read back to the prospect?** If they'd say "that's not really a problem for us," the severity score is wrong.
3. **Does the distribution look real?** A list where everything scores 70–85 has been graded to a target, not assessed. Most real lists are bottom-heavy.
4. **Any hard-zero disqualifiers** from `icp.md` §6 — no decision-maker, enterprise procurement, design-only or SEO-only ask, an in-house engineering team with no stated gap.
5. **Is the top-scoring lead one you'd actually be glad to email?** If the answer is "well, not really" — as it was for eské — leverage is doing its job and the score should show it.

**Six honest 85s beat thirty padded 70s.** The point of the score is to decide where a limited number of hours go.
