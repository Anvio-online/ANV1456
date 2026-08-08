# Legal pages — Page Spec

**URLs:** `/privacy` · `/terms` · `/cookies`
**Class:** Composed ([ADR-0006](../engineering/adr/0006-content-page-authoring-model.md))
**Route group:** `app/(legal)/` — separate from `(marketing)`, per [repo-structure.md](../engineering/repo-structure.md) §2
**Wave:** 1 ([phase-2-plan.md](phase-2-plan.md) §5)

---

## 0. Why these are Wave 1, and why this spec is short on copy

They're Wave 1 because they're cheap, they have no content dependency, and the footer's fourth column can't exist without them ([design-system.md](../system/design-system.md) §6.6).

This spec is short on copy on purpose. **Every other page spec in this repo writes the copy. This one writes the facts the copy must match**, because the failure mode here is different: a marketing page that overstates is a bad page, but a privacy policy that misdescribes what the site does is a false statement about data handling made to every visitor — and, on a site that collects an email before generating an AI plan, one that a regulator or a cautious enterprise buyer may actually read.

The site already makes a data-handling promise it has to keep. [automate-spec.md](automate-spec.md) §11 lists *"Is our data safe? Where does it go?"* as one of the three highest-value FAQ questions, and it's an open item precisely because nobody has answered it precisely yet. **These pages are where that answer gets written down, and the FAQ answers on Automate and `/industries` must then match it word for word.**

---

## 1. Shared frame

All three pages, identical:

| # | Section | Theme | Tier |
|---|---|---|---|
| 1 | `breadcrumb:inline` | dark | 0 |
| 2 | `hero:page-lead` | dark | 3 |
| 3 | `richText:prose` | dark | 3 |

`hero:page-lead` carries the title and a visible **"Last updated"** date. Not decorative — an undated policy is unenforceable in spirit and looks abandoned.

**Dark throughout, single column, `width: 'content'`.** No theme shift, no animation beyond a single `fadeUp`. These are reference documents.

**`robots`: index, follow.** Legal pages are a positive trust signal and absent ones are a negative one. Do not `noIndex` them.

**Schema:** `BreadcrumbList` only. No `FAQPage`, no `Article` — none of these is a content asset and dressing them as one is the kind of thing that looks like manipulation.

**Motion budget:** 0 Tier 1, 0 Tier 2. Obviously.

---

## 2. `/privacy` — the facts the policy must describe

**The policy is written from this table, not from a generator.** A template policy that describes cookies we don't set and omits the AI processing we do is worse than useless — it's a specific false statement.

Verified against the code as of 2026-08-08. **Re-verify before publishing**, and again whenever a form or route changes.

### What is collected, where it goes, and why

| Surface | Data | Stored where | Third parties |
|---|---|---|---|
| **Contact form** (`contact_submissions`) | Name, email, company, team size, message | Postgres, via Drizzle | Email delivery provider (Resend) for the notification |
| **Free audit form** (`audit_requests`) | URL, email | Postgres | Resend |
| **Agent demo** (`agent_leads`) | Email, **the full conversation transcript**, the generated plan, and the **source IP** | Postgres | **Anthropic** — conversation content is sent to the model API. Resend, for the plan email |
| **Agent demo, all requests** | IP address | Upstash, for rate limiting | Upstash |
| **Analytics** | Page views, section-level events | Plausible + GA4 | Plausible, Google |

**Three of these need explicit, prominent treatment:**

1. **Conversation content is sent to a third-party model provider.** This is the most consequential disclosure on the page and it must not be buried under "we may share data with service providers." Name Anthropic, say what is sent, and say what is retained.
2. **Transcripts are stored and reviewed.** [section-library.md](../system/section-library.md) §5 commits to *"log transcripts (with consent notice) — this is the best product research the site can generate."* The consent notice must be visible **in the agent demo UI at the point of use**, not only here. If that notice isn't in the component today, adding it is part of Wave 1, not a later polish.
3. **IP addresses are processed** for rate limiting and stored on `agent_leads.source_ip`. Small, easily forgotten, and an IP is personal data under both GDPR and India's DPDP Act.

### The policy must also state

- **Retention periods, per surface.** "As long as necessary" is not a period. Pick real numbers, including for transcripts, and honour them.
- **Legal basis / consent posture** for India's DPDP Act — the primary market ([seo-strategy.md](../system/seo-strategy.md)) — and for GDPR, because UAE and other English-speaking markets are on the roadmap and EU visitors will arrive before the expansion does.
- **A working deletion and access route.** A named contact that a real person monitors. This intersects the open item about who owns `hello@anvio.online`: a deletion request sent to an unmonitored inbox is a compliance failure, not an inbox problem.
- **No sale of personal data**, plainly stated, if true.
- **Children's data** — a standard clause; we don't knowingly collect it.
- **How changes are notified**, and the "Last updated" date being maintained.

### Anti-requirements

- **Do not claim certifications we don't hold.** No SOC 2, no ISO 27001, no "HIPAA compliant". This is also why `/industries/healthcare` is deferred ([industries-spec.md](industries-spec.md)).
- **Do not claim encryption or security controls that aren't in place.** Describe what's true.
- **Do not copy a template policy and change the company name.** Every row of the table above is site-specific, and a generated policy will describe none of them.

---

## 3. `/terms`

Standard terms of use for a marketing site — not a services agreement. Client work is governed by a signed contract, and the two should not be confused; say so on the page.

Must cover: acceptable use · intellectual property in the site's own content · **the agent demo is a demonstration, its output is an estimate and not a quote or professional advice** · no warranty on the free tools' output · limitation of liability · governing law and jurisdiction · how terms change.

**The agent-demo clause matters most.** The demo produces an automation plan with hours-saved ranges and a complexity band. The system prompt already forbids quoting a firm price ([section-library.md](../system/section-library.md) §5), and this page is where that guardrail becomes a stated term. The same applies to the ROI calculator ([tools-spec.md](tools-spec.md)) — its output is an estimate, and the page's visible disclaimer and this clause should agree.

---

## 4. `/cookies`

**Write this page from what the site actually sets, after auditing it — not from the analytics vendors' documentation.**

Plausible is cookieless. GA4 is not. So the honest position depends on a decision that hasn't been recorded anywhere:

> **Open question: do we run GA4 at all?** [seo-strategy.md](../system/seo-strategy.md) §9 lists both Plausible and GA4. Plausible alone is cookieless, needs no consent banner, and would let this page say "we set no tracking cookies" — which is both simpler and a better fit for a site that argues for performance and restraint. GA4 buys deeper funnel analysis at the cost of a consent banner, a heavier script on every route, and a longer cookie page.
>
> **Recommendation: Plausible only, until there is a specific question GA4 answers that Plausible can't.** Then this page is short and true, and there is no banner competing with the hero on the LCP screen.

The page must list, per cookie: name, purpose, duration, first- or third-party. If the recommendation above is taken, that table is nearly empty and the page says so.

**If GA4 stays**, a consent mechanism is required for EU visitors, and it must default to declining non-essential — which is also the standing instruction for how this site behaves.

---

## 5. What shipping these unblocks

**The footer's fourth column** ([design-system.md](../system/design-system.md) §6.6). Legal is the only one of the four columns that Wave 1 can complete on its own; Resources waits for Waves 2 and 5.

**`sitemap.ts`** gains three routes.

**The data-handling FAQ answers** on `/services/automate` §11 and `/industries` §6 stop being open items — they become excerpts of §2, and they must be maintained as excerpts rather than rewritten independently. One source of truth per fact ([docs/README.md](../README.md)): the policy is the source, the FAQ answers link to it.

---

## Deliberate omissions

- **No cookie consent banner**, if the Plausible-only recommendation in §4 is taken. A banner exists to obtain consent for something; without that something it is friction on the LCP screen for nothing.
- **No `/accessibility` statement in Phase 2.** Worth having eventually, but a statement is a commitment and the audit that would justify it hasn't run.
- **No DPA / sub-processor list page.** That's an enterprise-buyer artifact and we're not selling to enterprise ([Brand_strategy.md](../Initial/Brand_strategy.md)).

## Build order

1. `app/(legal)/layout.tsx` + the three routes, all `richText:prose`
2. Audit what the site actually sets and sends — §2's table, re-verified against the code
3. Write `/privacy` from that table
4. Decide GA4 (§4), then write `/cookies`
5. Write `/terms`
6. Footer Legal column + `sitemap.ts`
7. Update the agent demo's in-UI consent notice if it isn't already there
8. Replace the placeholder data-handling FAQ answers on Automate with excerpts

## Open items

- [ ] **Legal review.** These are the one set of pages on the site where "approximately right, we'll fix it later" is not acceptable. Budget for a lawyer who knows DPDP, or use a reputable generator *and then correct it against §2's table* — the generator will not know about the transcript storage or the model API call
- [ ] **Decide GA4 vs Plausible-only** (§4). This blocks `/cookies` and it also affects every route's JS budget
- [ ] Set real retention periods per surface, including agent transcripts
- [ ] Name the person who handles deletion and access requests — same unresolved owner question as `hello@anvio.online`
- [ ] Confirm the agent demo UI shows a consent notice today; if not, add it in this wave
- [ ] Governing law and jurisdiction, which depends on where the business is actually registered
