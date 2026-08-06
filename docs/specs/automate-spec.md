# Automate — Page Spec

**URL:** `/services/automate`
**Primary intent:** Commercial — "AI automation services" and everything around it.
**Reads as:** Its own landing page. Shared shell and design system, unique hero and unique signature visual.
**Primary conversion:** Book a call (higher intent than Home — visitors here are already problem-aware).
**Secondary conversion:** Agent demo completion.

**Title:** `AI Automation Services for Growing Businesses | Anvio` (53 chars)
**Description:** `Cut manual work with AI agents, chatbots, and automated workflows. We map your process, build the automation, and integrate it with the tools you already use.` (157 chars)

**Keyword cluster:** AI automation services · business process automation · AI agent development · workflow automation · AI automation for small business · WhatsApp automation
**Schema:** `Service` + `FAQPage` + `BreadcrumbList`

**Change from `automate_wireframe.md`:** your draft had 14 sections including a 9-item service list, Industries, and Tech stack. This spec is 12 sections: the 9 services collapse into **4 capability clusters** (nine peer cards is a wall, not a menu), and Industries + Tech Stack move off this page — Industries lives on Home and its own hub, Tech Stack belongs in About/footer. Everything else from your draft is kept.

---

## Section 1 — Hero
`hero:split-visual` · dark · Tier 3

**Copy**
> **Eyebrow:** AI AUTOMATION
> **H1:** Your team is doing work your software should be doing.
> **Sub:** We find the processes eating your team's week — data entry, follow-ups, support replies, reporting — and replace them with AI agents and automated workflows that plug into the tools you already run on.
> **CTA primary:** Book a free consultation
> **CTA secondary:** See what we'd automate for you → (scrolls to agent demo)
> **Trust line:** First automation live in 2–4 weeks · Works with your existing stack

*Alternates:* "Automate the work nobody should be doing by hand." / "AI agents that actually do the work, not just chat about it."

**Layout:** Headline + sub left (7 cols), a static preview frame of the workflow graph right (5 cols). The right visual is a **poster image or CSS-only still** at first paint — the live graph is a separate section further down and must not be in the hero's critical path.

**Motion:** `maskReveal` headline, `fadeUpGroup` sub + CTAs. LCP-safe, no JS dependency.

---

## Section 2 — Proof bar
`proofBar:stat-row` · dark · Tier 2

Three to four honest, verifiable stats. Not client counts.

> `2–4 weeks` typical time to first live automation
> `40+ hrs/mo` typical manual hours removed per automated process
> `30 days` post-launch support included on every build
> `100%` code and workflows owned by you

**Motion:** `counterRoll`, `tabular-nums`, fires once at 40% entry.

**Rule:** every number here must survive a client asking "how do you know?" If it can't, cut it.

---

## Section 3 — Problems we solve
`problem:before-after` · dark · Tier 2

**Purpose:** The recognition moment — the visitor sees their own week described. Sadewa's "eliminate the bottlenecks" energy, but concrete.

**Copy**
> **Eyebrow:** THE REAL COST
> **H2:** The bottlenecks nobody puts on the P&L.
> **Body:** None of these feel like problems. Together they're a full salary.

| Without automation | With Anvio |
|---|---|
| Someone re-types order details from WhatsApp into your CRM | Orders land in the CRM the moment the message arrives |
| Support answers the same 20 questions all day | An AI agent handles them from your own documentation, and escalates the rest |
| Follow-ups happen when someone remembers | Every lead gets a timely, personal follow-up, automatically |
| Reports are assembled by hand every Monday | Reports build themselves and land in your inbox |
| Your tools don't talk, so people are the integration | Systems sync directly. People do the judgement work |

**Layout:** Two-column contrast with a toggle on mobile. Left column in `--d-text-2`, right column with amber active markers.

**Motion:** `fadeUpGroup` on rows (60ms stagger), plus a state toggle that animates left→right per row on interaction.

**SEO/GEO:** This table is highly extractable and directly answers "what can AI automation do for my business." Real `<table>` semantics, not divs.

---

## Section 4 — What we build
`services:cluster-grid` · dark · Tier 3

**Purpose:** Full capability coverage without a nine-card wall. Your nine services, clustered.

| Cluster | Headline promise | Sub-items (accordion) |
|---|---|---|
| **AI Agents & Assistants** | Software that takes an instruction and finishes the job | Custom AI agent development · AI-powered chatbots · AI customer support |
| **Workflow & Process Automation** | The repetitive path from A to B, without a person in the middle | Repetitive task automation · AI process automation · CRM automation |
| **Integrations & Data** | Your tools, finally talking to each other | Custom AI integrations · API integrations · RAG / knowledge-base solutions |
| **Strategy & Insight** | Knowing what to automate first — and what to leave alone | AI strategy consulting · Real-time insights & reporting · Automation audit |

Each sub-item links to its leaf page once built; until then it expands to a two-line description in place. **Never link to an unbuilt page.**

**Motion:** `fadeUpGroup` on clusters, `accordionOpen` on sub-items.

**SEO:** The sub-item names are the leaf-page keyword set. Having them as real text here builds the topical cluster before those pages exist, and gives them internal links on day one when they do.

---

## Section 5 — How an automation actually works
`workflowGraph:live` · dark · **Tier 1 signature**

**Purpose:** The page's memorable object, and the answer to "but what *is* it, actually?" Most automation agencies describe. This shows.

**Content:** A live directed graph of a real scenario — *"A customer messages on WhatsApp at 11pm."*

```
Customer (WhatsApp)
   → AI Agent  (reads intent, checks knowledge base)
   → Knowledge Base  (returns policy + order status)
   → CRM  (logs the conversation, updates the record)
   → WhatsApp  (replies, in your tone)
   → Team  (only if it needs a human — with full context attached)
```

Each node carries a mono label and a status line that updates as it activates (`AI Agent · classifying intent`). Hovering or tapping a node pauses the loop and expands a short explainer — which is what turns a decorative loop into a product explanation.

**Motion:** Full spec in [motion-system.md](../system/motion-system.md) §7.2. `nodeCascade` + `pathPulse`, ~9s loop, pauses offscreen. DOM + SVG, **never canvas**. Static all-active state on mobile and under reduced motion, with explainers as a stacked list.

**SEO:** Node labels and explainers are real indexable text targeting "AI agent workflow," "WhatsApp automation," "AI customer support automation." This section earns its build cost twice.

---

## Section 6 — Our process
`process:sticky-stack` · **light** · Tier 3

Same five stages as Home (`01 DISCOVER` → `05 GROW`), with automation-specific deliverables:

> 01 DISCOVER — We map the process end to end, including the parts nobody documented.
> 02 STRATEGIZE — We pick the highest-ROI automation first, and tell you what isn't worth automating yet.
> 03 BUILD — We build and test against your real data, with weekly demos.
> 04 LAUNCH — We integrate, run it in parallel with the manual process, then switch over.
> 05 GROW — We monitor, tune, and automate the next thing.

**Deliberately not the Home treatment.** `stickyStack`, not `horizontalPin` — the signature scroll piece stays unique to Home, and this page's Tier 1 budget is spent on the workflow graph.

The "run it in parallel, then switch over" detail is worth keeping verbatim. It's the single line that most reduces a cautious SMB owner's fear of automation breaking their business.

**Theme:** first light section. `themeShift` at the boundary.

---

## Section 7 — Integrations
`integrations:marquee-dual` · light · Tier 2

**Purpose:** Answers "will this work with what we already have?" — a genuine buying objection, cheaply resolved. Landio-style execution.

**Content:** Dual-row opposing marquee, ~30 logos, grouped: CRM (HubSpot, Salesforce, Zoho, Pipedrive) · Messaging (WhatsApp Business API, Slack, Telegram, Gmail) · Ops (Notion, Airtable, Google Sheets, Monday) · Commerce (Shopify, WooCommerce, Razorpay, Stripe) · AI (OpenAI, Anthropic, Google) · Automation (n8n, Make, Zapier) · Accounting (Tally, Zoho Books, QuickBooks).

Below: `Don't see yours? If it has an API, we can connect it. →`

**Motion:** `marqueeLoop`, CSS-only, opposing directions, pause on hover.

**Note:** Tally and Zoho matter for the India market specifically. Localize this row per market later.

---

## Section 8 — Case studies
`featuredWork:two-up-deep` · light · Tier 3

Two automation projects, deep. Each: the manual process before · what we built · the integration points · **one hard metric** (`counterRoll`) · link to the full case study.

Anonymize if under NDA ("a 60-person distributor in Ahmedabad"). Never fabricate.

---

## Section 9 — Why choose us
`whyUs:contrast-table` · dark · Tier 3

**Copy**
> **H2:** The difference is clear once you've been burned once.

| Typical automation vendor | Anvio |
|---|---|
| Sells you a chatbot | Maps your process first, then builds only what pays for itself |
| Generic bot on generic docs | Trained on your knowledge, your tone, your edge cases |
| Locked into their platform | Built on tools you own, with code and workflows handed to you |
| Goes quiet after launch | 30 days support included, then monitoring if you want it |
| "AI will transform everything" | We'll tell you which processes aren't worth automating |

That last row does the most work. Naming what you *won't* sell is the most credible thing on the page.

---

## Section 10 — Agent demo
`agentDemo:full` · dark · Tier 2

Same component and backend as Home §4, positioned differently: here the visitor is already problem-aware, so the framing is scoping rather than discovery.

> **H2:** Describe one process. Get a real automation plan.
> **Body:** Not a lead form with extra steps. Our agent asks what you do by hand, then builds you the actual workflow — tools, steps, and rough hours saved.

Placed after the trust sections deliberately: on this page, the demo converts better once the objections are already handled.

---

## Section 11 — FAQ
`faq:accordion` · dark · Tier 4

**Purpose:** Objection handling + a major GEO asset. Question-shaped H3s with answer-first paragraphs — see [seo-strategy.md](../system/seo-strategy.md) §7.

Questions to answer:
1. How much does AI automation cost for a small business?
2. How long does it take to build an automation?
3. Will this work with the software we already use?
4. What happens if the automation breaks?
5. Do we need technical staff to run it?
6. Is our data safe? Where does it go?
7. What's the difference between an AI agent and a chatbot?
8. Which processes are actually worth automating?
9. Do we own what you build?
10. What if we want to change it later?

Each answer opens with a direct 40–60 word response, then expands. Emits `FAQPage` schema. Questions 1, 6, and 7 are the highest-value: two are the real objections, one is a citation-bait definition query.

---

## Section 12 — Closing CTA
`ctaClosing:split-with-form` · dark · Tier 3

> **H2:** Tell us the most repetitive thing your team does.
> **Body:** 30 minutes. We'll tell you honestly whether it's worth automating, what it'd take, and roughly what it'd cost. If the answer is "not yet," we'll say that.
> **Form:** Name · Work email · Company · Team size · "What should we look at?" · **Book the call**

Then footer.

---

## Optional / Phase 2

From your draft, deferred with reasons:
- **Products CTA** ("Built by us. Available to you.") — add once there's a real product to link. Strong section, wrong time.
- **Industries** — belongs on Home + `/industries`. On this page it dilutes a commercial intent.
- **Tech stack** — About page or footer. Buyers here care about *their* tools (§7), not ours.
- **Insights** — add once there are automation-specific posts worth surfacing.

## Build order

1. Hero, Proof bar, Problem, Clusters, Closing CTA *(shippable page)*
2. Process, Integrations, Why us, FAQ
3. Case studies (blocked on content)
4. **Workflow graph** (Tier 1 — full sprint)
5. Agent demo (shared with Home — build once)

## Open items

- [ ] The four stat-row numbers, verifiable
- [ ] Two automation case studies + permission
- [ ] Confirm integration logo list and licensing for logo use
- [ ] FAQ answers written (assign: whoever can answer #6 on data handling precisely)
- [ ] Decide the workflow-graph scenario — WhatsApp→CRM is the recommendation; it's the most recognizable to the India SMB market
