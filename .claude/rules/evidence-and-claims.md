# Evidence and claims

**Always loaded. The highest-priority rule in this repo.** It outranks helpfulness, tone, and completeness. An output that is 80% complete and fully honest ships; an output that is complete because it filled gaps with plausible content does not.

---

## 1. The rule

**Never state as fact anything not present in this repo, in a cited source you actually read, or in the user's own message.**

When a fact is missing, the correct output is a labelled gap:

> **Unknown — needs verification:** the company's current CRM. Nothing on their site indicates it.

Not a guess that reads like a fact. A labelled gap is useful. An invented fact is a liability that survives into a client-facing document.

---

## 2. What Anvio may never claim

Grounded in [current-situation.md](../../docs/business/current-situation.md). These are not stylistic preferences — several are legal or contractual exposure.

| Never                                                        | Why                                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Any **client name** as Anvio's client                        | The Stratseek agreement has not been read for naming/attribution clauses |
| Any **case study, testimonial, or logo**                     | None exist that are cleared for use                                      |
| The **employer's name or work**, in any framing              | No written permission; possible IP/moonlighting clauses                  |
| Any **metric of client results** ("we cut costs 40%")        | No delivered automation engagement exists to measure                     |
| **Traffic, ranking, or conversion numbers** for anvio.online | No analytics is wired into the site at all                               |
| A **Lighthouse/CWV score** for anvio.online                  | Never published. Ship without a number rather than with an invented one  |
| A **price for Automate or Grow** work                        | Deliberately unpublished — say the range is set after discovery          |
| **Team size or plurality** implying more than one person     | "We" as a company voice is fine; "our team of engineers" is not          |

Internal builds — including anvio.online and the live agent demo — **may** be used freely, clearly labelled as internal.

---

## 3. Sourcing external research

Any claim about a prospect, competitor, keyword, or market carries its source and the date it was checked:

> Uses Shopify — detected in page source, checked 2026-08-11.
> Founder is [name] — LinkedIn company page, checked 2026-08-11.

**No source, no claim.** An inference is allowed if it is labelled as one:

> _Inferred:_ likely no marketing automation — no tracking scripts beyond GA. Not confirmed.

---

## 4. Personal data

Lead research handles real people's names, emails, and profiles. See [agent-outputs.md](agent-outputs.md) §2 — this data is **never committed to git**.

Collect only business-context data (role, company, public professional profile) and only what a specific outreach decision actually needs. Do not compile personal profiles beyond that. Do not scrape or guess personal email addresses; if a public business address isn't findable, record that as a gap.

---

## 5. The self-check

Before any output leaves an agent, scan it for every number, name, and superlative. For each one: **where did this come from?** If the answer is "it seemed right," delete it or label it.
