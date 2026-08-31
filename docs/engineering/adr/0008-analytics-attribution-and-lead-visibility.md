# ADR-0008: Product analytics, first-touch attribution, and lead visibility

**Status:** Accepted
**Date:** 2026-08-31
**Deciders:** Anshika

## Context

The site now produces leads — the agent demo captures an email against a
generated plan, and the contact and audit forms write rows. What it does
not produce is any way to *see* them, or to answer the questions that
decide where the next hour of growth work goes:

- How much traffic is there, and is it moving?
- Who clicked "Build my plan", and how many of them finished?
- For each captured email: which plan did we show, did the email send,
  and where did that visitor come from?
- Which referral source or campaign actually produces leads, not just
  pageviews?

[current-situation.md](../../business/current-situation.md) constrains
the answer twice. Vercel Web Analytics and Speed Insights are mounted
but only give aggregate, cookieless RUM — no funnels, no per-person
timeline, no link from a session to the lead it became. And the builder
is one person with a day job: a custom event pipeline plus a CRM
front-end is 40–80 hours that does not build the content engine
[positioning.md](../../business/positioning.md) §5 calls the priority.

[tech-stack.md](../tech-stack.md) §6 names "Plausible + GA4 + Vercel
Analytics" as the analytics plan and §8 defers auth until "a client
portal or the Products surface needs it". Both assumptions are worth
re-testing now that there is a concrete need: attribution that ties a
lead to its source, and a place to look at leads.

The [/cookies](../../../apps/web/src/app/(legal)/cookies/page.tsx) and
`/privacy` pages make a specific promise: the first-choice analytics
tool is cookieless; anything that sets a cookie is named in a table with
a consent option that defaults to declined. That promise is a hard
constraint on what can ship and how.

## Decision

**Buy the behavioural analytics. Extend the tables we already own for
attribution. Use no-code BI for the dashboard. Defer a real CRM.**

### 1. PostHog (EU Cloud) for behaviour, funnels, and attribution

One hosted tool covers visitors, click autocapture, per-person
timelines, funnels, and source attribution, on a free tier
(1M events/month). EU Cloud for data-residency posture.

- `posthog-js` (~85 KB gzip) is **never statically imported** — it would
  land in the shared bundle the LCP budget is measured against. A
  dynamic `import()` pulls it as its own chunk, and only after the
  visitor grants consent; before that it is never fetched and capture
  calls are no-ops. `posthog-node` for server-side events from the agent
  route and the Server Actions.
- A typed `snake_case` event catalogue in `lib/analytics/events.ts`
  (naming per [code-style.md](../../../.claude/rules/code-style.md)):
  `build_my_plan_clicked`, `agent_demo_turn_sent`,
  `agent_plan_email_submitted`, `agent_plan_generated`,
  `agent_plan_email_sent`, `contact_form_submitted`, `audit_requested`.
- `posthog.identify(email)` fires at the moment of capture, so the prior
  anonymous journey stitches to the person.

This **supersedes the "Plausible + GA4" line** in tech-stack.md §6 for
behavioural analytics. Vercel Web Analytics stays (cookieless RUM,
independent). GA4 is not added.

### 2. First-touch attribution, persisted to our own rows

`middleware.ts` snapshots the first request from a consented visitor —
landing path, referrer origin, UTM params — into an `httpOnly`
`anv_attr` cookie (180 days, never overwritten). Every lead-producing
path (`lib/actions/contact.ts`, `lib/actions/audit.ts`,
`app/api/agent/route.ts`) reads it back through
`lib/analytics/attribution.ts` and writes the fields onto the row, plus
the PostHog `distinct_id` for reconciliation.

New nullable columns on `agent_leads`, `contact_submissions`,
`audit_requests`: `landing_page`, `referrer`, `utm_source`,
`utm_medium`, `utm_campaign`, `utm_term`, `utm_content`,
`posthog_distinct_id`. Plus `email_sent` (boolean) on `agent_leads`.

The agent route also gains the `agent_leads` **insert it never had** —
the table was defined by ADR-0005 but nothing wrote to it. Without that
row there is no lead record for the dashboard to read.

### 3. The dashboard is Metabase pointed at Neon

No custom UI. Metabase (open-source self-host, or Cloud) connects to the
existing Postgres with a read-only role and renders leads-per-day,
leads-by-source, plan-complexity split, and email-delivery rate as
SQL-backed cards. Nothing to build in the app, no auth to own.

### 4. A real CRM is deferred

`ops/leads/` and `ops/outreach/` are near-empty; there is no pipeline to
manage. When outreach volume is real, the choice is **Attio** (hosted,
free tier, webhook-ingest a new `agent_leads` row). Not now.

### 5. `/admin` in the app is deferred

Everything the dashboard needs, Metabase does from outside. An in-app
admin surface — and the auth it drags in, which tech-stack.md §8 defers
— waits until there is a reason Metabase cannot serve.

## Alternatives considered

**Stay with the planned Plausible + GA4.** Plausible is cookieless and
simple, which fits the /cookies promise with zero consent work. Rejected
as the primary tool: it has no per-person profiles and no real funnels,
so it cannot answer "who clicked Build my plan and did they finish" or
tie a captured email to its journey — the exact questions this ADR
exists to answer. GA4 could do funnels but not per-person, is painful to
model, and adds a Google dependency for no gain PostHog does not give.

**Build the event pipeline and a lead dashboard in-app.** Full control,
no third party, data stays in one Postgres. Rejected on capacity: it is
weeks of work — event schema, ingestion, funnel queries, an auth'd UI,
session handling — for a solo operator, and every hour of it is an hour
not spent on the content engine. PostHog's free tier delivers the same
output this week.

**Amplitude instead of PostHog.** Strong funnels and retention analysis.
Rejected: smaller free-tier ceiling, no session replay, and no clear
advantage for a site this size over PostHog, which also self-hosts later
if the bill ever matters.

**Klaviyo as capture + CRM + nurture in one.** Tempting because it would
also own the follow-up email sequences. Rejected for now: it is
ecommerce-shaped, heavier than the need, and pulls lead data into a
marketing tool before there is a nurture programme to run. Revisit with
the CRM decision.

**A real CRM (Attio / Twenty) now.** Rejected: infrastructure ahead of
need. There are not enough leads to manage a pipeline, and a CRM with
nothing in it is a maintenance cost with no return. The trigger is
stated below.

**Client-side attribution capture instead of middleware.** Simpler, no
new file at the framework's edge. Rejected: a client script cannot see
the `Referer` header reliably, runs after the first paint, and is
trivially blocked. Middleware sees the real first request and writes one
`httpOnly` cookie the server owns.

## Consequences

**Good:** Every question in the Context section becomes answerable this
week, with roughly a day of code and no custom UI to maintain. Leads
carry their source in our own database, so the dashboard does not depend
on a third-party API being up. The attribution and event models mirror
PostHog's own, so nothing has to be re-modelled if analysis moves fully
into PostHog later. Both PostHog and Metabase are portable and have
free/cheap tiers that fit a solo operator.

**Bad:** PostHog is a third party in the request path and a cookie on
the site — which means a consent banner and a /cookies + /privacy edit
are now on the critical path, and `/privacy` is still not legally
reviewed ([current-situation.md](../../business/current-situation.md)
§3). Until the banner ships, `anv_attr` is never set and attribution
columns stay null — Phase 0 captures the *plumbing*, not the data. Two
analytics tools now run (Vercel + PostHog) with overlapping pageview
counts that will not match exactly. Metabase is another service to keep
patched if self-hosted. And this ADR moves a tech-stack.md §6 line,
which means that doc must be updated in the same PR as the PostHog
install.

**Revisit when:**
- **CRM:** `ops/outreach/` shows a sustained pipeline (say >15 active
  leads being worked) — stand up Attio and webhook `agent_leads` into it.
- **`/admin`:** a lead workflow needs a write action (status, notes,
  assignment) that Metabase cannot do read-only — build the in-app
  surface and take on auth then, superseding §5 here.
- **PostHog cost:** the event volume approaches the free-tier ceiling —
  self-host PostHog rather than pay, or narrow autocapture.
- **Vote to drop Vercel Analytics:** if PostHog's RUM proves sufficient,
  removing the overlap is a one-line change to `app/layout.tsx`.
