---
name: lead-qualification
description: Score a prospect against Anvio's ICP using the 100-point rubric — fit, problem severity, opportunity clarity, reachability, timing. Use when qualifying an inbound enquiry, deciding whether a lead is worth outreach, or reviewing a lead list for inflation.
---

# Lead qualification

The rubric `anvio-lead-researcher` scores against, usable on its own for a single inbound lead or to audit a list someone else produced.

Read `docs/business/icp.md` and `docs/business/current-situation.md` first.

---

## The rubric — 100 points

### ICP fit — 25

|       |                                                                                             |
| ----- | ------------------------------------------------------------------------------------------- |
| 20–25 | 10–200 employees, revenue-generating, India or UAE, in a sector where the problem is common |
| 12–19 | Fits size and market but the sector fit is unproven                                         |
| 5–11  | Edge of the profile — very small, or a market with no delivery precedent                    |
| 0–4   | Enterprise, pre-revenue, or asking for something off-position                               |

**Hard zero:** visible enterprise procurement (vendor portals, RFPs). The cycle is 6–18 months and Anvio cannot fund the wait.

### Problem severity — 25

Score on how much it is **costing them right now**, not on how interesting it is to solve.

|       |                                                                                                                                         |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 20–25 | Visible, quantifiable, and they've shown they feel it — a job posting for manual work, public support complaints, a broken revenue path |
| 12–19 | Clearly present and observable, but the cost is inferred                                                                                |
| 5–11  | Real but tolerable. They've lived with it for years                                                                                     |
| 0–4   | You had to invent the problem to make the lead work                                                                                     |

### Opportunity clarity — 20

Can you name the exact service and the outcome in **one sentence**?

|       |                                                                                     |
| ----- | ----------------------------------------------------------------------------------- |
| 16–20 | "Automate their invoice intake — the ops person spends ~15 hours a month re-typing" |
| 8–15  | The pillar is clear, the specific service isn't                                     |
| 0–7   | "Could use AI automation." True of everyone. Worthless                              |

### Reachability — 15

|       |                                                              |
| ----- | ------------------------------------------------------------ |
| 12–15 | Named decision-maker **and** a public business contact route |
| 7–11  | One of the two                                               |
| 3–6   | A generic inbox and no named person                          |
| 0–2   | No route at all                                              |

**Never** raise this score with a guessed or pattern-generated email address.

### Timing signal — 15

An active trigger from `icp.md` §5 — recent funding, hiring for a role that's mostly manual work, announced expansion, a visible competitor move, a public complaint about support volume.

|       |                                        |
| ----- | -------------------------------------- |
| 12–15 | Active trigger, dated within ~3 months |
| 6–11  | Older trigger, or a soft one           |
| 0–5   | None found                             |

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

**Six honest 85s beat thirty padded 70s.** The point of the score is to decide where a limited number of hours go.
