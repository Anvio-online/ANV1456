# Free tools — Page Spec

**URL:** `/tools/automation-roi-calculator`
**Class:** Composed ([ADR-0006](../engineering/adr/0006-content-page-authoring-model.md))
**Wave:** 4 ([phase-2-plan.md](phase-2-plan.md) §5)
**Origin:** [SCOPE.md](../Initial/SCOPE.md)'s Phase 1 line included *"1 free tool"*. It didn't ship. This is it.

[seo-strategy.md](../system/seo-strategy.md) §2 is specific about what a tool page has to be: *"`/tools/*` are their own indexable pages, not modals. They're link magnets and they rank."* A calculator behind a modal on another page earns nothing. This is a page.

---

## 1. Which tool, and how it avoids colliding with what exists

[seo-strategy.md](../system/seo-strategy.md) §3 names three candidates — ROI calculator, AI readiness scorecard, site audit. Two of the three are already partly live:

- **Site audit** is Grow's primary conversion, shipped as `leadMagnet:audit-form` ([grow-spec.md](grow-spec.md) §7) writing to `audit_requests`. Building a `/tools/site-audit` page would compete with it for the same intent.
- **AI readiness scorecard** is what the agent demo already does, better and interactively. A scorecard would be a worse version of the differentiator.

So: **the automation ROI calculator.** It is the only one of the three with no existing home.

**It must not duplicate Grow's cost calculator.** `problem:cost-calculator` on `/services/grow` §3 already exists and takes visitors × enquiry rate × deal value → revenue left on the table. That answers *"what is my underperforming website costing me."* This tool answers a different question with different inputs:

| | Grow's cost calculator | This tool |
|---|---|---|
| Question | What is the traffic I'm not converting worth? | What is the work my team does by hand costing me? |
| Inputs | Monthly visitors, enquiry rate, deal value | Hours/week, people involved, loaded hourly cost, automatable share |
| Output | Revenue left on the table | Annual cost of manual work, and payback period |
| Lives on | A pillar page, as framing | Its own page, as the destination |

Different question, different formula, different intent. Both can exist.

---

## 2. Sections

| # | Section | Theme | Tier | Notes |
|---|---|---|---|---|
| 1 | `breadcrumb:inline` | dark | 0 | `Home / Tools / Automation ROI Calculator` |
| 2 | `hero:page-lead` | dark | 3 | Short. The tool must be visible without scrolling on desktop |
| 3 | `problem:automation-calculator` | dark | **2** | The tool. New **variant**, same family |
| 4 | `richText:prose` | light | 3 | How this is calculated — the methodology |
| 5 | `leadMagnet:route-cards` | light | 3 | Routes to the agent demo and to a call |
| 6 | `faq:accordion` | dark | 4 | Methodology questions. `FAQPage` |
| 7 | `relatedLinks:card-grid` | dark | 3 | |
| 8 | `ctaClosing:centered-bold` | dark | 3 | |

**Title:** `Automation ROI Calculator: What Manual Work Costs | Anvio` (56 chars)
**Description:** `Work out what repetitive manual work costs your business each year, and how long an automation would take to pay for itself. No email required to see it.` (152 chars)
**Schema:** `SoftwareApplication` + `FAQPage` + `BreadcrumbList` ([seo-strategy.md](../system/seo-strategy.md) §6).

### Section 2 — Hero

> **Eyebrow:** FREE TOOL
> **H1:** What is manual work actually costing you?
> **Sub:** Four numbers, no email. It won't be exact — nothing that starts from four numbers is — but it will usually be larger than the estimate in your head.

Compact, and the calculator starts within the first screen. A tool page where the tool is below the fold converts and ranks worse for the same reason a buried answer does ([seo-strategy.md](../system/seo-strategy.md) §4).

### Section 3 — The calculator

**A new `variant` on the existing `problem` section, not a new type** — [ADR-0003](../engineering/adr/0003-section-registry-composition.md)'s variant-first rule, and [section-library.md](../system/section-library.md) §3 already defines the `cost-calculator` family as *"Interactive: inputs → hours/money lost."* This is exactly that with a different formula.

**Inputs** — four, with sensible defaults, all real `<input type="number">`:

| Input | Default | Notes |
|---|---|---|
| Hours per week spent on the process | 10 | |
| People involved | 2 | |
| Loaded hourly cost | ₹400 | "Loaded" = salary plus overhead. Say so inline; it's the input people get wrong |
| Share that could be automated | 70% | A slider. **Defaults below 100 on purpose** — a tool that assumes total automation is a tool nobody believes |

**Outputs:** annual cost of the manual work · hours returned per year · an indicative payback period against a stated build-cost range.

**Behaviour, inherited from Grow's calculator:**
- **Client-side only. No submission, no gate, no email.** The result appears as you type.
- **Server-rendered and readable before any JS runs** — defaults visible, labels and the disclaimer in the initial HTML.
- **A visible `disclaimer`, not a footnote.** Required in the props, same as Grow's, for the same reason: a calculator without one is exactly the over-promising the rest of the site rejects.
- Debounced ~300ms, `counterRoll` on outputs with `tabular-nums` so nothing reflows ([motion-system.md](../system/motion-system.md) §8).

**No URL state in v1.** Shareable result links would mean query-parameter URLs, which [seo-strategy.md](../system/seo-strategy.md) §4 requires be `noIndex` — a duplicate-content surface, for a sharing behaviour nobody has asked for. If it's added later, `noIndex` it then.

### Section 4 — Methodology

The section that makes this rank rather than just exist. A tool page with no prose is thin, and this is prose that genuinely belongs: the formula written out, what "loaded cost" means, why the automatable share defaults to 70%, and what the estimate deliberately excludes — error cost, opportunity cost, the work that only exists because the manual process exists.

> **H2:** How this is calculated.
> Answer-first, then the formula as a real `<ol>`, then the exclusions.

**Naming the exclusions is the credibility move.** A calculator that admits it understates is more persuasive than one that doesn't, and it is also true here.

### Section 5 — What to do with the number

`leadMagnet:route-cards`, two options:

| Card | Copy |
|---|---|
| **Get an actual plan** | "The number above is an estimate. Describe the process to our agent and get the specific workflow — the steps, the tools, and a real hours-saved range." → `/services/automate#agent-demo` |
| **Talk it through** | "30 minutes. We'll tell you whether this one is worth automating, and what it'd take." → `/contact` |

**This is the page's conversion design, and it is deliberately ungated.** The calculator is cheap and open; the agent demo is the expensive, email-gated thing ([ADR-0005](../engineering/adr/0005-agent-demo-model-and-email-gate.md)). Putting an email wall on a four-input arithmetic widget would cost the link equity the page exists to earn, and gate something that costs us nothing.

### Section 6 — FAQ

1. How accurate is this? — Answer-first and honest: it's an order-of-magnitude estimate.
2. What counts as "loaded" hourly cost?
3. Why doesn't it assume 100% automation?
4. What does an automation like this actually cost to build? — Range, with the same hedge every other page uses. Never a firm price.
5. What isn't included in this calculation?

Emits `FAQPage`. Questions 1 and 5 are the ones that make the tool citable.

---

## 3. Distribution

A tool page that nobody links to is a tool page that doesn't work. This is the part most likely to be skipped, so it's in the spec.

- Linked from `/services/automate` and the three Automate leaves via `relatedLinks`
- Linked from `/industries/accounting-firms`, where the calculation is most concrete
- Linked from guides #4 and #5 ([guides-spec.md](guides-spec.md)) as their contextual in-body link
- Footer **Resources** column, once that column exists
- Listed in `/llms.txt` ([seo-strategy.md](../system/seo-strategy.md) §7.7)
- `tool_completed` analytics event fires when all four inputs have been touched ([seo-strategy.md](../system/seo-strategy.md) §9)

**No `/tools` index page in Phase 2.** One tool doesn't need an index, and an index of one is a worse page than no page. Add it at three tools.

---

## Motion budget check

**0 Tier 1. 1 Tier 2** — `counterRoll` on the calculator outputs, which is the only motion on the page that explains anything (it makes clear that the number responds to the input). Everything else is Tier 3/4.

## Deliberate omissions

- **No email gate.** Section 5.
- **No PDF export.** Server-side rendering of a PDF for a four-number result is infrastructure for nothing.
- **No account, no saved results.** Same.
- **No `/tools` index.** §3.
- **No site-audit or scorecard tool.** §1 — both would collide with something that already exists.

## Build order

1. `problem:automation-calculator` variant + its prop type
2. `softwareApplicationSchema` builder in `lib/seo/schema.ts` — **does not exist yet**
3. The page, sections 1–4 and 6–8 *(shippable)*
4. Section 5's route cards
5. `sitemap.ts` + `/llms.txt` + the distribution links in §3, in the same PR — a tool page shipped without its inbound links is the failure mode this section exists to prevent

## Open items

- [ ] Confirm the default loaded hourly cost for the India SMB market. ₹400 is a placeholder and it is the input that most affects the output's credibility
- [ ] Agree the build-cost range used for the payback calculation, and check it against the ranges already published on Home and Build — three different numbers for the same thing across three pages is a trust problem
- [ ] Decide who monitors the leads this page routes into ([phase-2-plan.md](phase-2-plan.md) §7). It is the second lead surface pointing at an inbox with no named owner
- [ ] Write the methodology section (Section 4) before building the calculator, not after — the formula is easier to argue in prose first
