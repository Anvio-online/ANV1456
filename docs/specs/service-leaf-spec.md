# Service leaf pages — Page Spec

**URLs:** `/services/automate/whatsapp-automation` · `/services/automate/ai-chatbot-development` · `/services/automate/ai-agent-development` · `/services/build/website-development`
**Class:** Hybrid ([ADR-0006](../engineering/adr/0006-content-page-authoring-model.md))
**Wave:** 3 — **gated on keyword validation** ([phase-2-plan.md](phase-2-plan.md) §6)

One document for four pages, because they share a frame and differ only in frontmatter, body, and the visual in Section 5. Writing four near-identical specs would produce four near-identical pages, which is the exact outcome this spec exists to prevent.

---

## 0. The two risks

**Thin pages.** [seo-strategy.md](../system/seo-strategy.md) §1: *"Twenty-five shallow service pages will suppress the whole domain."* The floor is **800 words of real content** per leaf, and the word "real" is load-bearing — restating the pillar page in different words does not count. If a leaf can't clear it honestly, ship three leaves instead of four.

**Cannibalization.** Three of these four sit under the same pillar and describe overlapping work. [seo-strategy.md](../system/seo-strategy.md) §3: *"one page = one intent. If two pages could both answer a query, merge them or differentiate them explicitly."* §2 below is that explicit differentiation, and it is not optional editorial garnish — it is the thing that decides whether these pages help or hurt.

---

## 1. Slug status

**Provisional.** [phase-2-plan.md](phase-2-plan.md) §6 — these four were chosen by reasoning, not by data, and a leaf URL is set once ([seo-strategy.md](../system/seo-strategy.md) §2). Validate in Ahrefs/Semrush and Search Console before Wave 3 starts.

The reasoning: three Automate leaves concentrate on the pillar that carries the live workflow graph and the agent demo, where our credibility is highest and the India-SMB long tail is least contested. One Build leaf covers the highest-volume commercial term the site owns. Grow's leaves wait for Phase 3 — `/services/grow` already ranks its own keyword cluster densely, and splitting it early risks the cannibalization above with no offsetting gain.

The frame in §3 holds whichever four leaves the data selects.

---

## 2. Intent separation — the table that has to hold

Each page owns one question. If a section on one page answers another page's question better than that page does, it belongs on the other page.

| Page | The one question it owns | Explicitly **not** this page | Primary term |
|---|---|---|---|
| `whatsapp-automation` | "How do I stop my team re-typing WhatsApp messages into our systems?" | Anything about the bot's conversational quality — that's the chatbot page | WhatsApp automation |
| `ai-chatbot-development` | "How do I get something to answer my customers' questions correctly?" | Anything that takes an *action* in another system — that's the agent page | AI chatbot development |
| `ai-agent-development` | "How do I get software to complete a multi-step task, not just reply?" | Anything about answering questions from documents — that's the chatbot page | AI agent development |
| `website-development` | "What does it cost and take to get a website that actually brings in enquiries?" | Ecommerce and web applications — separate leaves in Phase 3 | website development services |

**The chatbot/agent boundary is the hard one**, and it is also a genuine content opportunity. Each page states the distinction in one sentence near the top and links to the guide `ai-agent-vs-chatbot` ([guides-spec.md](guides-spec.md)) for the full answer. The guide takes the definitional query; the two leaves take the commercial ones. That is three pages targeting three intents rather than three pages fighting over one.

Automate's pillar page keeps the head term (`AI automation services`) and links down. No leaf targets it.

---

## 3. The shared frame

Nine sections, from [section-library.md](../system/section-library.md) §4's Phase 2 template. Identical across all four leaves; only frontmatter, body, and Section 5's visual differ.

| # | Section | Theme | Tier | Source |
|---|---|---|---|---|
| 1 | `breadcrumb:inline` | dark | 0 | `Home / Services / {Pillar} / {Leaf}` |
| 2 | `hero:page-lead` | dark | 3 | frontmatter `h1`, `description` |
| 3 | `problem:pain-grid` | dark | 3 | frontmatter `pains[]`, max 6 |
| 4 | `richText:mdx` | light | 3 | **the body — the 800 words that rank** |
| 5 | `workflowGraph:compact` \| `buildAssembly:component-grid` | light | **2** | fixed per leaf |
| 6 | `results:metric-row` | light | 3 | frontmatter `metrics[]` — definitions |
| 7 | `faq:accordion` | dark | 4 | frontmatter `faq[]` |
| 8 | `relatedLinks:card-grid` | dark | 3 | frontmatter `relatedLinks[]` |
| 9 | `ctaClosing:centered-bold` | dark | 3 | fixed copy, leaf-specific question |

3 dark → 3 light → 3 dark, satisfying the renderer's consecutive-theme check.

**Schema:** `Service` + `FAQPage` + `BreadcrumbList`, per page. `serviceType` is the leaf's primary term, not the pillar's.

### Section 2 — Hero

`page-lead`, deliberately. Not `split-visual`, which is the three pillar pages' signature layout — a leaf that looks like a pillar page reads as a pillar page, both to a visitor and in the site's own hierarchy. The compact lead also puts the first substantive text within one screen, which [seo-strategy.md](../system/seo-strategy.md) §4 requires.

The H1 is frontmatter `h1`, **distinct from the `<title>` tag.** These are different sentences with different jobs and conflating them costs both ([content-layer.md](../engineering/content-layer.md) §3).

### Section 3 — Pain grid

Leaf-specific, never the pillar's set. The pillar page describes the category's problems; the leaf describes this service's problems. If the two lists overlap, the leaf isn't specific enough yet.

### Section 4 — The body

**This is the page.** Everything else is frame. It is where the 800-word floor is met and where GEO extraction happens, so it follows [seo-strategy.md](../system/seo-strategy.md) §7 literally:

- Opens with a **40–60 word direct answer** to the page's owned question from §2, before anything expands.
- `##` headings are **question-shaped**: "How much does WhatsApp automation cost?" not "Pricing".
- Specifics, not adjectives. Named tools, real ranges, actual timelines.
- Real `<table>`, `<ol>`, `<dl>` — the whitelist components in [content-layer.md](../engineering/content-layer.md) §2 exist so the body never needs a styled div.
- The primary keyword appears in the H1, the first 100 words, one `##`, and the URL. **Once each.**

Recommended body outline, adapted per leaf: what it is · what it actually replaces · how it works, concretely · what it costs and how long it takes · what it doesn't do · what you own afterward.

**"What it doesn't do" is required.** It is the section that most reliably separates a real service page from a brochure, and on the agent and chatbot pages it is also the honest way to hold the §2 boundary.

### Section 5 — The visual

One Tier 2 element per leaf, and the only one ([phase-2-plan.md](phase-2-plan.md) §4 permits two; one is right).

**`workflowGraph:compact`** on the three Automate leaves. A reduced form of Automate's Tier 1 scene ([motion-system.md](../system/motion-system.md) §7.2): 3–4 nodes instead of six, `nodeCascade` only — **no `pathPulse`**, no hover-to-pause explainer layer. It is reuse of built machinery at lower cost, not a new scene. Static all-active on mobile and under reduced motion, with node labels as real DOM text.

**`buildAssembly:component-grid`** on the Build leaf. A static grid of the pages/components a site build actually includes. **Not** `wireframe-to-render` — that pinned scene is Build's Tier 1 and stays unique to it.

### Section 6 — Results

Definitions, not numbers — the same treatment as Grow's `results:metric-row` ([grow-spec.md](grow-spec.md) §9), which is explicitly **not** `counterRoll`ed because counting animations on definitions is theatre. Frontmatter `metrics[]` is `{ name, definition }[]` for this reason.

### Section 7 — FAQ

From frontmatter, so the accordion and the `FAQPage` schema come from one source and cannot drift. 5–8 questions, each answered in 40–60 words before expanding.

**Do not duplicate the pillar's FAQ.** Automate's ten questions ([automate-spec.md](automate-spec.md) §11) are category-level. A leaf's are service-level: pricing for *this* service, what breaks in *this* integration, what this specific thing can't do.

### Section 8 — Related links

3–5, resolved from frontmatter. Every leaf links **up** to its pillar, **sideways** to its sibling leaves where genuinely related, and **out** to one guide. Hub-and-spoke, per [seo-strategy.md](../system/seo-strategy.md) §5.

### Section 9 — Closing CTA

`centered-bold`, not `split-with-form`. A leaf visitor has read 800 words and has one specific question; a five-field form is more friction than a button to `/contact`, and the pillar page above already carries the form.

---

## 4. The four leaves

### `/services/automate/whatsapp-automation`

**Title:** `WhatsApp Automation for Business | Anvio` (39 chars)
**H1:** Every WhatsApp message shouldn't need a person.
**Pains:** orders re-typed from chat into the CRM · "where's my order" answered dozens of times a day · messages missed after hours · no record of what was promised to whom · follow-ups depending on someone scrolling back.
**Section 5 graph:** `Customer message → Intent check → CRM record → Reply` — four nodes.
**Body must cover:** WhatsApp Business API vs the regular app and why it matters; template message approval and the 24-hour window; what happens after hours; handover to a human with context; cost structure including Meta's per-conversation charge, which most vendors omit and which will otherwise surprise the client.
**Pillar action:** Automate's *Workflow & Process Automation* cluster currently has no WhatsApp sub-item — **it must be added** (see §5 below).

### `/services/automate/ai-chatbot-development`

**Title:** `AI Chatbot Development Services | Anvio` (38 chars)
**H1:** A chatbot that answers from your documentation, not from guesswork.
**Pains:** the same twenty questions all day · a generic bot that invents answers · nothing that knows your policies · no escalation path · answers going stale when the policy changes.
**Section 5 graph:** `Question → Knowledge base → Grounded answer → Escalate if unsure` — four nodes.
**Body must cover:** what RAG is in two plain sentences; how the knowledge base is built and kept current; how hallucination is actually constrained and the honest residual risk; the escalation threshold; where a chatbot is the wrong tool.
**Boundary sentence, near the top:** "A chatbot answers. An agent acts. If you need something to update a record or place an order, that's [AI agent development](/services/automate/ai-agent-development)."

### `/services/automate/ai-agent-development`

**Title:** `AI Agent Development Services | Anvio` (36 chars)
**H1:** Software that takes an instruction and finishes the job.
**Pains:** work that needs three systems and a person to join them · rules that live in one employee's head · exceptions that stall everything · processes too variable to script but too repetitive to staff.
**Section 5 graph:** `Trigger → Plan → Act across tools → Verify → Report` — five nodes, the largest of the three.
**Body must cover:** agent vs. workflow automation (the more useful distinction than agent vs. chatbot for a buyer); what an agent is permitted to do and how that's bounded; human-in-the-loop checkpoints; failure and rollback; why we recommend deterministic automation when it will do.
**Honesty requirement:** this is the page most likely to over-promise, and the pillar page already commits to *"we'll tell you which processes aren't worth automating"* ([automate-spec.md](automate-spec.md) §9). The body has to hold that line.

### `/services/build/website-development`

**Title:** `Website Development Services | Anvio` (35 chars)
**H1:** A website that brings in enquiries, not just compliments.
**Pains:** a site nobody finds · slow on phones · content changes needing a developer · no analytics worth reading · rebuilt every two years because nothing was reusable.
**Section 5 visual:** `buildAssembly:component-grid` — the pages and components a build includes.
**Body must cover:** what's actually in a build; timeline by size; the ownership position (code and content are yours); the performance and SEO structure that ships with it rather than after it; when not to rebuild — improving an existing site is often the right call and saying so is the differentiator.
**Boundary:** ecommerce and web applications are separate leaves in Phase 3. Name them and link to `/services/build` rather than covering them here.

---

## 5. Upstream changes Wave 3 requires

Shipping these four is not additive — it changes three existing pages and the footer.

**Automate's cluster grid needs a WhatsApp sub-item.** `automate/page.tsx`'s *Workflow & Process Automation* cluster currently lists *Repetitive task automation · AI process automation · CRM automation*. There is no WhatsApp entry, yet [Information_arch.md](../Initial/Information_arch.md) lists WhatsApp Automation under Automate and [seo-strategy.md](../system/seo-strategy.md) §3 targets the URL. **Add "WhatsApp automation" to that cluster with an `href`** — without it the leaf ships orphaned from its own pillar, which breaks the hub-and-spoke pattern that gives it equity.

**Two existing sub-items gain `href`:** *Custom AI agent development* → the agent leaf, *AI-powered chatbots* → the chatbot leaf.

**Build's *Business websites* sub-item gains `href`** → `/services/build/website-development`. Note the label and the slug differ; that's fine — the label is UI copy and the slug is the query shape — but the mapping should be explicit in the page file rather than inferred.

**`/services` hub Section 3** ([services-hub-spec.md](services-hub-spec.md)) links the same four sub-items.

**Footer Services column** gains the four leaves, sitewide ([seo-strategy.md](../system/seo-strategy.md) §5 — the footer carrying leaf links is real equity on a small site).

**`sitemap.ts`** gains four routes, from `contentRepository.slugs('services')` rather than as literals.

---

## Motion budget check

Per leaf: **0 Tier 1**, **1 Tier 2** (Section 5's graph or grid), Tier 3/4 elsewhere. Well inside [phase-2-plan.md](phase-2-plan.md) §4's allowance, and the single Tier 2 is reused machinery rather than new.

## Deliberate omissions

- **No proof bar.** The four stats are Automate's page-level claims; repeating them per leaf implies per-service measurement we don't have.
- **No agent demo.** It lives on Home and Automate. A third instance splits the conversion data across three sections for no gain, and the leaf's job is depth, not demo.
- **No pricing tiers.** Ranges live on Home and Build. A leaf states a range in prose in the body, where it can be qualified — a tier card can't be.
- **No integrations marquee.** Automate §7 owns it. A leaf names the two or three integrations that matter to *it*, in the body.
- **No Grow leaves in Phase 2.** §1.

## Build order

1. **Keyword validation** — gate, not a step ([phase-2-plan.md](phase-2-plan.md) §6)
2. Content adapter + `services` schema; `richText:mdx`; `breadcrumb`; `relatedLinks` ([content-layer.md](../engineering/content-layer.md) §5)
3. `workflowGraph:compact` and `buildAssembly:component-grid` variants
4. The shared leaf frame + one route, with `whatsapp-automation` as the first entry
5. The remaining three MDX entries — at this point a leaf is a content file, not a build
6. §5's upstream changes, in one PR so no page is briefly inconsistent

## Open items

- [ ] Keyword validation for all four slugs — hard gate
- [ ] Four bodies at ≥800 words each. This is the real cost of Wave 3 and it is writing, not engineering
- [ ] Confirm Meta's current WhatsApp per-conversation pricing model before the WhatsApp body quotes it — it has changed more than once and a stale number on a page about being specific is the worst kind of error
- [ ] Decide whether `ai-agent-development` or `ai-agent-development-services` is the slug
- [ ] Write `ai-agent-vs-chatbot` ([guides-spec.md](guides-spec.md)) in the same wave as the two leaves that depend on it for their boundary
