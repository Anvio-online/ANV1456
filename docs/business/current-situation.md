# Current Situation

**Status:** as of 2026-08-11. **This file goes stale fastest — re-check it before trusting it.**

Its job is to stop plans that assume assets Anvio does not have. Read it before proposing anything.

---

## 1. The four constraints that bind every plan

### Zero client proof under the Anvio name

Anvio has **no past clients as Anvio**. What exists:

| Asset                                                                 | Real? | Usable how                                                                                                                                     |
| --------------------------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Founder's freelance delivery (ecommerce builds, via a partner agency) | Yes   | Only once the **Stratseek agreement** is read for naming/attribution clauses — currently blocking `/case-studies` entirely                     |
| Employer production work (AI in financial operations)                 | Yes   | **Never as Anvio's work.** Team-experience framing on `/about` only, and only with written permission — see `docs/private/employer-context.md` |
| Internal builds, including anvio.online itself                        | Yes   | Freely, on `/projects`, **clearly labelled internal**                                                                                          |
| The live agent demo                                                   | Yes   | Freely — it is the Automate proof substitute                                                                                                   |

### The proof asymmetry

**Positioned on Automate. Every verifiable delivered project is Build/ecommerce.**

This is the trap this project sets most often. Before presenting anything, ask: _does this assume automation proof we do not have?_ If yes, it's wrong, regardless of how good the rest is.

### Zero-authority domain

anvio.online is new. No backlinks worth counting, no ranking history, no brand search volume. Consequences:

- Head terms are not winnable this year. Long-tail, specific, low-competition intent only.
- **GEO — being cited by AI assistants — is more reachable than classic SERP position** for a new domain, which is why it's a first-class target and not a trend-chase.
- Every SEO projection must be honest about a 6–12 month floor before organic acquisition contributes anything.

### Solo operator with a day job

One person. Employed full-time. This is a **capacity ceiling, not a motivation problem**.

A plan that only succeeds at 100% completion is a failed plan. **Every plan states a floor alongside its ambition** — the version that still works at 40% execution. A previously-rejected plan scoped ~20,000 words of writing as if for a team; that failure mode is specific and recurring.

---

## 2. What is actually shipped

Phase 1 (6 pages) and almost all of Phase 2 are built on `feat/phase-2-wave-1`. Live surfaces include `/`, `/about`, `/contact`, the three pillar pages, `/services`, `/projects`, `/industries` + 2 leaves, `/guides` + 8 guides, 2 service leaves, the ROI calculator, and the legal pages.

**Not built:** `/case-studies` (blocked on Stratseek), `/products`, `/blog`, ~15 further service leaves.

Authoritative status is always `docs/README.md` — check it rather than trusting this summary.

---

## 3. Open blockers, and what each one blocks

| Blocker                                                                  | Blocks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stratseek agreement unread**                                           | `/case-studies` entirely; the two withheld client cards on `/projects`; every "our client" claim in outreach                                                                                                                                                                                                                                                                                                                                                                                                     |
| **No written permission to name the employer**                           | Any mention of them anywhere, even the unnamed version                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Leaf slugs never keyword-validated**                                   | Two leaves shipped on provisional slugs; renaming now costs a redirect                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`/privacy` not legally reviewed**                                      | The one page where approximately-right is unacceptable                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`hello@anvio.online` still unmonitored — now only on the legal pages** | Partly resolved. Form submissions notify `anshika1307goel@gmail.com` (`lib/email/lead-notification.ts`), and `/contact` + the home alt-contact now display `teamanvio@gmail.com`. **Still open:** `/privacy`, `/terms`, and `/cookies` name `hello@anvio.online` as the data deletion/access route, and nobody reads it — per [legal-spec.md](../specs/legal-spec.md) §68 that is a compliance failure, not an inbox problem. It also remains the Resend `from:` domain, which is why it can't simply be retired |
| **No _published_ Lighthouse/CWV score**                                  | Scores were **measured** during the llms.txt verification pass (commit `62526ab`: live baseline Perf 98, new build 100, A11y 96, SEO 100, CLS 0) — but nothing is published on the site yet, so `/services/grow`'s performance claim and the `/projects` anvio.online card still ship without numbers. Cite these only as measurements with the commit as source, never as a published score                                                                                                                     |
| **Analytics wired, but no data yet**                                     | Vercel Web Analytics and Speed Insights are both mounted in `app/layout.tsx` (commits `e408b81`, `4f15825`). Data has only been accumulating since then, so there is still **no meaningful traffic history** — a claim about traffic or conversion remains unsupportable, but it is now a matter of elapsed time rather than missing instrumentation                                                                                                                                                             |

---

## 4. What this means for each agent

- **Strategy / Growth** — plan for a zero-authority domain and one part-time person. State the floor.
- **Lead research / Outreach** — no client names, no case studies, no "we helped X achieve Y." Credibility comes from specific observed insight about _their_ business, plus the demo and the free tool.
- **Sales intelligence** — the meeting is won on understanding their problem, not on our track record. Prepare accordingly.
- **Technical architect** — quote against the real floors and real timelines in [services-and-pricing.md](services-and-pricing.md); one person delivers this.
- **SEO / Social** — long-tail and GEO. No head terms. No projections that assume authority.
