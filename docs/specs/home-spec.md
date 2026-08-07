# Home — Page Spec

**URL:** `/`
**Primary intent:** Brand + category orientation. "Who are these people, are they for me, can they actually do it?"
**Secondary intent:** Route to the right pillar (Build / Automate / Grow).
**Primary conversion:** Agent demo completion → email captured.
**Secondary conversion:** Book a call.

**Title:** `Anvio — AI Automation, Web Development & Growth` (52 chars)
**Description:** `We help growing businesses automate manual work, build software that scales, and get found online. See what we'd automate for you — free, in 60 seconds.` (151 chars)

**Strategic constraint:** we are a new agency with freelance work to show. The page must build trust through **demonstrated capability and transparency**, never through implied scale. No borrowed logos, no invented numbers, no "trusted by 100+ businesses." One caught exaggeration costs more than an empty section ever would.

---

## Section 1 — Hero
`hero:centered-statement` · dark · Tier 3

**Purpose:** State the category and the outcome in under three seconds, and offer a low-commitment first action.

**Copy**
> **H1:** Your business runs on work a machine should be doing.
> **Sub:** Anvio builds the AI automations, software, and websites that take manual work off your team — and bring the right customers in. Built for businesses with 10 to 200 people, not enterprise timelines.
> **CTA primary:** See what we'd automate → (scrolls to agent demo)
> **CTA secondary:** Book a free consultation
> **Trust line (mono, small):** Typical first automation ships in 2–4 weeks

*Alternates:* "Stop paying people to do what software does better." / "AI, software, and websites — built around how your business actually works."

**Layout:** Centered, max 18ch headline. Sub at `body-l`, max 60ch. CTAs side by side, primary first. Trust line below in mono `--d-text-3`. Ambient background: a faint 1px grid in `--d-border-soft` with a single slow amber glow drift — CSS-only.

**Motion:** `maskReveal` on headline (per line), `fadeUpGroup` on sub + CTAs (60ms stagger). Nothing else. This is the LCP element — it must be fully rendered and readable before any JS executes.

**SEO:** H1 carries the problem framing; the sub carries the keyword cluster (AI automation, software, websites) naturally. `Organization` + `WebSite` schema on this page.

---

## Section 2 — Proof bar
`proofBar:marquee` · dark · Tier 2

**Purpose:** Answer "do they actually work with real tools?" without claiming clients we don't have.

**Content:** Dual-row marquee of **tools and platforms we build on** — n8n, Make, OpenAI, Anthropic, Zapier, HubSpot, Salesforce, WhatsApp Business API, Shopify, Next.js, Supabase, Stripe, Twilio, Slack, Google Workspace, Zoho, Tally. Label above in mono: `WE CONNECT THE TOOLS YOU ALREADY USE`.

**Why not client logos:** we don't have enough to fill a row. A sparse or padded logo wall reads as fake and does more damage than this does good. Swap to client logos the moment we have six real ones — the section type doesn't change, only the data.

**Motion:** `marqueeLoop`, CSS-only, opposing directions, 50s cycle. Pauses on hover and under reduced motion.

---

## Section 3 — Services
`services:pillar-cards` · dark · Tier 2

**Purpose:** The routing decision. Three doors, clearly labelled by outcome.

**Copy**

| | BUILD | AUTOMATE | GROW |
|---|---|---|---|
| Line | Websites, web apps, and custom software that fit how you work | AI agents, chatbots, and workflows that handle the repetitive work | SEO, GEO, and performance work that brings the right people in |
| Sub-items | Websites · Ecommerce · Web apps · CRM/ERP · Custom software | AI agents · Chatbots · Workflow automation · WhatsApp · Integrations | SEO · GEO · Performance · Audits · Conversion |
| CTA | Explore Build → | Explore Automate → | Explore Grow → |

**Layout:** Three large cards, equal height, each holding a looping micro-visual in its own pillar language (browser frames / node graph / ascending chart). No icons, no emoji — per `design_direction.md`.

**Motion:** `hoverLift` + the card's micro-visual plays **on hover only** (three simultaneous loops is a frame-rate problem and visual noise). On mobile, the visual for the card in view plays; others hold a static final frame.

**SEO:** Primary internal links to all three pillars, in main content, with descriptive anchors.

---

## Section 4 — Agent demo
`agentDemo:full` · dark · Tier 2 · **the differentiator**

**Purpose:** Convert curiosity into a personalized artifact, and prove the capability by exercising it. This is the section that solves the no-proof problem — every other trust signal on the page is a claim; this one is a demonstration.

**Copy**
> **Eyebrow:** TRY IT NOW
> **H2:** Tell us what your team does by hand. We'll show you what to automate.
> **Body:** Describe one repetitive process. Our agent asks a few questions and builds you a real automation plan — the workflow, the tools, and roughly how many hours it saves. Free, no call required.

**Layout:** Wide panel, `--r-xl`, `--d-surface`, amber-line border. Input with rotating placeholders. On submit, the panel expands into a chat column (left) + live-building node diagram (right). Diagram reuses `workflowGraph:compact`. After the last follow-up, an inline email field: *"Your plan is ready — where should we send it?"* Then the plan renders — summary, node diagram, hours-saved range — and is emailed, with a soft "book a call to scope it" link.

**The email gate is the point, not friction.** Per [ADR-0005](../engineering/adr/0005-agent-demo-model-and-email-gate.md): the Q&A turns are cheap and open, the plan call is the expensive one and requires an email. It lands at the highest-intent moment — three or four answers in, plan one click away — so it converts far better than the same field on the front door, and it means no LLM spend happens without producing a contactable lead.

**Motion:** Message stagger, typing indicator, nodes appear as the plan is built. Streamed — never a spinner-then-dump. The build-as-it-thinks quality is most of the impact.

**Engineering:** See [section-library.md](../system/section-library.md) §5 and [tech-stack.md](../engineering/tech-stack.md) §5. `claude-sonnet-5`, server-side route, key never client-side, gate enforced server-side, IP rate limiting, token cap, Zod-constrained plan output, graceful fallback to `preview` on failure.

**Analytics:** `agent_demo_started`, `agent_demo_gate_shown`, `agent_demo_completed`, `lead_captured{source: agent_demo}`. Watch the gap between `gate_shown` and `completed` — that's the gate's abandonment rate, and it's the number that decides whether ADR-0005 needs revisiting.

---

## Section 5 — Featured work
`featuredWork:two-up-deep` · light · Tier 3

**Purpose:** Real proof, told honestly. **Two case studies, deep** — not six thumbnails.

**Copy per card:** Client (or "A 40-person logistics firm, Pune" if under NDA — anonymized is fine, fabricated is not) · the problem in one line · what we built · **one hard outcome metric** · stack chips · `Read the case study →`

**Layout:** Two cards side by side, generous. Media on top, outcome metric in `metric` mono. First light section — this is where the page changes register and slows down for substance.

**Motion:** `themeShift` at the boundary above, `fadeUpGroup`, `hoverLift`.

**Honesty rule:** if there are only two real projects, show two. An "and 30 more" line we can't back up is the single fastest way to lose a technical buyer.

### The actual inventory, and how to present it

**Available web work:** Baladi Food Stuff, Epicerma, BluPebble — all UAE businesses, all delivered as white-label subcontracting through **Stratseek**.

White-label work is completely normal and it counts. Two things to get right:

1. **Check the Stratseek agreement before publishing any client name.** Subcontracting agreements frequently restrict naming the end client or claiming the work publicly. If it's restricted, anonymize — "a UAE-based FMCG distributor" loses almost nothing, because what persuades is the *problem and the outcome*, not the logo.
2. **Attribute honestly.** Use a line like `Delivered via partner agency` on the card. It costs you nothing — it reads as an agency with partner relationships, which is a normal grown-up thing to be — and it means you never get caught implying a direct client relationship you didn't have.

**Strategic upside:** these are UAE businesses, and UAE is market #2 in the expansion plan. Three UAE builds on the site is a real asset when you start targeting there. Present them as "UAE" explicitly.

**On your own assessment that they're "not that great":** that's a reason to control the framing, not to hide them. Lead each card with *the business problem and what the build solved*, not with a hero screenshot. If a visual is genuinely weak, crop to the one screen that works, or use a stylized browser-frame treatment instead of a full screenshot. Two well-framed projects beat three defensive ones — pick the strongest two for Home and put all three on `/projects`.

### A current employer's production work — do not put this on the site as Anvio's work

Specifics (company name, exact framing) are in `docs/private/employer-context.md` (gitignored, not in this repo's history from this point on). The general rule, which anyone can act on without that file:

If a team member has shipped real production work at a current or former employer, presenting it as an Anvio case study is a real problem on three fronts: IP and confidentiality (the work product isn't theirs to showcase), the employment agreement (many have explicit clauses about outside ventures and use of company work), and conflict of interest if Anvio ever operates near that employer's market.

**What's legitimately fine** — presented as *team experience*, not agency work, and only on the About page: a factual, non-identifying sentence like "our team has shipped production AI systems in financial operations." That's standard for how engineers describe employment history, and it is not a portfolio claim. Naming the employer requires written permission first, and a read of the relevant employment agreement's moonlighting/IP clauses — see the private file for the specific status of that.

**The gap this leaves:** Anvio has web work to show but no AI/automation proof — which is the category it's positioned around. That is precisely the gap the **agent demo (§4)** and a free tool are built to fill. Personal projects can also be shown, clearly labelled as such, on `/projects` — an honest "internal build" label is fine; passing one off as client work is not.

---

## Section 6 — Our process
`process:horizontal-pin` · light · **Tier 1 signature**

**Purpose:** Show that we run a real engagement, not freelance improvisation. This is the section that most directly counters "they're new."

**Content:** `01 DISCOVER` · `02 STRATEGIZE` · `03 BUILD` · `04 LAUNCH` · `05 GROW` — each with a one-line promise, three concrete deliverables, and a typical duration.

> 01 DISCOVER — We learn how your business actually works. *Process mapping · stakeholder interviews · systems audit.* 1 week
> 02 STRATEGIZE — We decide what to build, and what not to. *Solution design · scope + estimate · success metrics.* 1 week
> 03 BUILD — Design and development, in visible increments. *Weekly demos · staging access · your feedback in the loop.* 2–8 weeks
> 04 LAUNCH — Deploy, integrate, and train your team. *Migration · integrations · handover docs.* 1 week
> 05 GROW — Measure, tune, extend. *Analytics · optimization · ongoing support.* Ongoing

**Motion:** Full spec in [motion-system.md](../system/motion-system.md) §7.1. Pinned 220vh, horizontal panels, progress rail, connector morphing between stages. Desktop ≥1024px only; `stickyStack` below; plain list under reduced motion. All five stages in the DOM at all times.

**SEO:** Named durations and deliverables are exactly the kind of specific, extractable content LLM surfaces cite. Worth writing precisely.

---

## Section 7 — How we work & what it costs
`engagementModel:phase-timeline` · light · Tier 3

**Purpose:** The highest-leverage trust section on the page, and almost no competitor has one. SMB buyers' top two fears are cost and abandonment. Answer both, in public.

**Copy**
> **H2:** What working with us actually costs.
> **Body:** Most agencies make you book a call to find out. Here's the honest version.

Three engagement shapes with **real ranges**:

| | Automation Sprint | Product Build | Growth Retainer |
|---|---|---|---|
| For | One process, automated end to end | A website, app, or internal tool | Ongoing SEO, performance, and iteration |
| Timeline | 2–4 weeks | 6–14 weeks | Monthly |
| Range | ₹— to ₹— | ₹— to ₹— | ₹—/mo |
| Includes | Discovery, build, integration, handover, 30 days support | Everything in Process 01–05 | Audit, roadmap, execution, monthly reporting |

Plus a short, plainly-worded block: what happens if scope changes, what we do if we're late, who owns the code (you do), and what happens at the end of an engagement.

**Resolved:** shipped as "Starting from ₹X" per tier rather than a two-sided range — a floor anchors the conversation without reading as a ceiling, and it's a lower barrier to the first click while still being real, published pricing (not "book a call to find out").

---

## Section 8 — Why us
`whyUs:contrast-table` · dark · Tier 3

**Purpose:** Differentiate concretely. No adjectives.

**Copy**
> **H2:** Most agencies build you a website. We build you leverage.

| Typical agency | Anvio |
|---|---|
| Builds what you asked for | Maps your process first, then builds what actually helps |
| AI is a feature they added last year | AI-native — it's how we build and what we build |
| Website, then goodbye | Build, automate, and grow under one roof |
| You get a design file and an invoice | You get the code, the docs, and a team that knows your systems |
| Fixed template, flexible truth | Published pricing, published process, weekly demos |

Close with the founder note (`team:founder-note`): real photo, real name, two honest sentences about why Anvio exists and who it's for. "Human" is in the brand personality — this is where it shows up.

---

## Section 9 — Industries
`industries:compact-grid` · dark · Tier 4

**Purpose:** The "is this for a business like mine?" moment — the exact concern named in `Information_arch.md`.

**Content:** 6 compact tiles — Healthcare · Ecommerce · Real Estate · Accounting & Finance · Education · Logistics. Each: industry, one line of the specific problem we solve there, link.

**Phase 1 note:** links go to an `/industries` hub anchor until the individual pages exist. **Never link to a page that isn't built** — a 404 from the homepage is worse than no link.

**Motion:** `hoverLift` only. This section is a navigational aid; it doesn't need to perform.

---

## Section 10 — Insights
`insights:three-latest` · dark · Tier 3

**Purpose:** Signal ongoing expertise and feed the content engine.

**Content:** Three most recent posts — category chip, title, read time, date. `View all insights →`.

**Ship condition:** needs at least three real posts. If they don't exist at launch, **cut this section** rather than shipping placeholders. An empty blog is a negative signal.

---

## Section 11 — Closing CTA
`ctaClosing:split-with-form` · dark · Tier 3

**Copy**
> **H2:** Let's find the first thing worth automating.
> **Body:** A 30-minute call. We'll look at one process in your business and tell you honestly whether automation is worth it. No pitch deck.
> **Form:** Name · Work email · Company · "What's the most repetitive thing your team does?" (textarea) · **Book the call**
> **Alt:** Or email us directly at hello@anvio.online

The qualifying textarea does double duty: it filters tyre-kickers and gives you a real answer to open the call with.

**Motion:** `fadeUp`, `magneticCTA` on submit (desktop pointer only, 6px max).

---

## Section 12 — Footer

Four columns (Services with all pillar + leaf links / Company / Resources / Legal) · oversized `ANVIO` wordmark band · contact · socials. Dark. Carries real internal-linking equity — see [seo-strategy.md](../system/seo-strategy.md) §5.

---

## Build order

1. Tokens, layout primitives, `SectionRenderer`, Nav, Footer
2. Hero → Services → Closing CTA → Proof bar *(a shippable, coherent page)*
3. Featured work, Why us, Engagement model, Industries
4. **Process scene** (Tier 1 — budget a full sprint)
5. **Agent demo** (backend + guardrails — budget a full sprint)
6. Insights, polish, CWV pass, schema, analytics

Steps 1–3 give you a launchable homepage. Steps 4–5 are what make it *Anvio's* homepage.

## Open items

- [x] ~~Real price ranges for §7~~ — shipped as "Starting from ₹X"
- [ ] **Read the Stratseek agreement** for client-naming and attribution clauses — blocks §5
- [ ] Pick the strongest two of Baladi / Epicerma / BluPebble for Home; all three go on `/projects`
- [ ] Written permission before naming the employer from `docs/private/employer-context.md` anywhere, and check the relevant employment agreement's IP/moonlighting clauses
- [ ] Founder photo + note copy
- [ ] Three insight posts, or cut §10
- [ ] Confirm 6 industries
- [ ] Responsive QA on a real mid-range Android — see [design-system.md](../system/design-system.md) §8
