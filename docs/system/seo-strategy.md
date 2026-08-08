# Anvio — SEO & GEO Strategy

**Status:** v1
**Domain:** anvio.online
**Markets:** India (primary) → UAE → other English-speaking
**Audience:** SMB decision-makers (10–200 employees), non-technical buyers, plus technical evaluators at startups

---

## 1. Strategic position

We are a **zero-authority domain**. That fact should drive every decision here, and it points to three things:

1. **Do not chase head terms.** "AI automation company" and "web development agency" are owned by domains with 10+ years of links. We will not rank for them in year one and pursuing them wastes the whole content budget.
2. **Win on specificity and intent.** Long-tail, problem-shaped, and comparison queries convert better anyway. A page that ranks #3 for *"automate WhatsApp order confirmations for small business"* is worth more than page 4 for *"AI automation."*
3. **Win on GEO before competitors do.** ChatGPT, Claude, Perplexity, and AI Overviews are already a meaningful share of SMB research. Ranking well *there* depends on being clearly structured, factual, and extractable — which is a content-quality problem, not a backlink problem. **This is the one channel where a new domain can compete immediately**, and it's also a live demonstration of a service we sell.

**Corollary that constrains the build:** thin pages hurt. Twenty-five shallow service pages will suppress the whole domain. Ship pages only when there is real substance behind them — see the phasing in §4.

---

## 2. URL architecture

Confirmed from `Information_arch.md`, with additions:

```
/                                          Home
/services                                  Services hub
/services/build                            Pillar
/services/build/website-development        Leaf
/services/automate                         Pillar  ← Phase 1
/services/automate/ai-chatbot-development  Leaf
/services/grow                             Pillar
/services/grow/seo                         Leaf
/industries                                Hub
/industries/healthcare                     Leaf
/case-studies  ·  /case-studies/[slug]
/projects                                  Gallery (distinct from case studies)
/products  ·  /products/[slug]
/blog  ·  /blog/[slug]
/guides/[slug]                             Long-form, link-earning
/tools/[slug]                              Free tools — ROI calculator, AI readiness scorecard, site audit
/about  ·  /contact
/privacy  ·  /terms  ·  /cookies
```

**Rules**
- Lowercase, hyphenated, no trailing slash, no dates in blog URLs.
- Depth ≤ 3 segments.
- A leaf page's URL is set once. Renaming later costs a redirect and a ranking dip — decide the slug from keyword research before publishing, not after.
- `/tools/*` are their own indexable pages, not modals. They're link magnets and they rank.

---

## 3. Keyword map

**Do the research before Phase 2.** Numbers below are illustrative structure, not verified volumes — validate in Ahrefs/Semrush/Search Console before committing slugs.

### Page-level targeting

| Page | Primary intent | Supporting terms |
|---|---|---|
| `/` | Brand + category | AI automation agency India, AI web development company |
| `/services/automate` | **AI automation services** | business process automation, AI agent development, workflow automation services, AI automation for small business |
| `/services/build` | web development services | custom web application development, ecommerce development, CRM development |
| `/services/grow` | SEO services | technical SEO audit, GEO / AI search optimization, conversion optimization |
| `/services/automate/ai-chatbot-development` | AI chatbot development | WhatsApp chatbot, customer support automation, RAG chatbot |
| `/services/automate/whatsapp-automation` | WhatsApp automation | WhatsApp Business API automation, order confirmation automation |
| `/industries/[x]` | AI for {industry} | automation for accounting firms / clinics / real estate |
| `/tools/automation-roi-calculator` | tool intent | automation ROI calculator, how much can automation save |
| `/guides/[x]` | informational | how to automate {process}, {tool} vs {tool} |

### The four query shapes worth writing for

| Shape | Example | Where it lives |
|---|---|---|
| **Problem-aware** | "how to stop manually entering invoices" | Guides, blog |
| **Solution-aware** | "AI agent vs chatbot difference" | Guides — strong GEO citation bait |
| **Vendor-comparison** | "n8n vs Zapier for small business" | Guides — high intent, low competition, we have real expertise |
| **Local + service** | "AI automation company in {city}" | Pillar + industry pages |

**One page = one intent.** If two pages could both answer a query, merge them or differentiate them explicitly. Cannibalization is the most common self-inflicted SEO wound.

### Phasing

- **Phase 1:** `/`, `/services/automate`, `/services/build`, `/services/grow`, `/about`, `/contact`, 2 case studies, 1 tool. *Shipped: the six pages. The case studies and the tool moved to Phase 2.*
- **Phase 2:** 3–4 highest-opportunity leaf pages (chosen by data, not by completeness), `/industries` + 2 industries, 6–8 guides — plus the Phase 1 carryovers and the structural pages (`/services`, `/case-studies`, `/tools`, legal). Full plan: [phase-2-plan.md](../specs/phase-2-plan.md).
- **Phase 3:** remaining leaves, `/products`, `/projects`, `/blog` at cadence.

**Phase 2's four leaf slugs are provisional.** [service-leaf-spec.md](../specs/service-leaf-spec.md) proposes `whatsapp-automation`, `ai-chatbot-development`, `ai-agent-development` under Automate and `website-development` under Build — chosen by reasoning, not by the research this section calls for. Validating them is a **hard gate on Wave 3**, not on Phase 2 as a whole ([phase-2-plan.md](../specs/phase-2-plan.md) §6), because a leaf URL is set once per §2 and everything before Wave 3 is unaffected by the answer.

The other cannibalization risk Phase 2 introduces is internal: `/services` must not compete with its own three pillars, and the chatbot and agent leaves must not compete with each other. Both are handled explicitly — [services-hub-spec.md](../specs/services-hub-spec.md) scopes the hub to *choosing* rather than selling, and [service-leaf-spec.md](../specs/service-leaf-spec.md) §2 assigns one owned question per leaf with the definitional query routed to a guide instead.

---

## 4. On-page standards

### Metadata

| Field | Rule |
|---|---|
| `<title>` | ≤ 60 chars. `{Primary Keyword} \| Anvio`. Home: `Anvio — AI Automation, Web Development & Growth`. Never keyword-stuff. |
| `meta description` | 140–158 chars. Written as ad copy with a benefit and an implicit CTA. It doesn't rank, it earns the click. |
| `canonical` | Self-referencing on every page, absolute URL. |
| OG / Twitter | Every page. Dynamic OG images via `next/og` — page title on the dark canvas with the amber accent. |
| `robots` | Index everything except `/thank-you`, previews, and tool result URLs with query params. |

Implement as typed builders in `lib/seo/` — never hand-written per page. A missing canonical on one route is invisible until it costs you.

### Content structure

- Exactly one `<h1>`, matching the page's primary intent. Never skip levels.
- Primary keyword in H1, first 100 words, one H2, and the URL. **Once each.** Density optimization is a 2010 tactic that now reads as spam to both crawlers and humans.
- Minimum substance: pillar pages ≥ 1,200 words of real content; leaf pages ≥ 800; guides ≥ 1,800. If you can't hit it honestly, don't publish the page.
- Every page answers the user's question in the **first screen**. Burying the answer under a hero animation costs both rankings and conversions.
- Descriptive alt text on all meaningful images; `alt=""` on decorative ones.
- Internal links use descriptive anchors — never "click here" or "learn more" as the sole anchor.

### The animation trap

Repeating from [motion-system.md](motion-system.md) §6 because it's the highest-risk SEO failure on this build: **all copy is server-rendered DOM text.** No text in canvas, no text that only appears after a scroll trigger mounts a component, no content hidden behind a client-only tab that isn't in the HTML. The Process scene and the Workflow Graph both carry real indexable text — that's a requirement, not an implementation detail.

---

## 5. Internal linking

Link equity has to flow, and on a new domain it's the only equity we control.

- **Hub-and-spoke:** every leaf links up to its pillar; every pillar links down to all its leaves; siblings cross-link where genuinely related.
- Home links to all three pillars in the main content, not only in nav.
- Every case study links to the service pages it exercised, and vice versa — this is the pattern that turns proof into rankings.
- Every guide links to one commercial page with a contextual anchor.
- The `relatedLinks` section ships on all leaf and content pages: 3–5 curated links, editorially chosen.
- **Footer carries all pillar + leaf links.** Sitewide, crawlable, and real equity for a small site.
- ≤ 100 links per page.

---

## 6. Structured data

JSON-LD, built from typed helpers in `lib/seo/schema.ts`. This is also GEO infrastructure — it's how machines extract facts about us.

| Schema | Where |
|---|---|
| `Organization` + `logo`, `sameAs`, `contactPoint` | Sitewide (root layout) |
| `WebSite` + `SearchAction` | Root |
| `Service` | Each service page — `serviceType`, `provider`, `areaServed` |
| `FAQPage` | Every page with a `faq` section |
| `Article` / `BlogPosting` | Blog + guides — `author`, `datePublished`, `dateModified` |
| `BreadcrumbList` | All pages ≥ 2 levels deep |
| `SoftwareApplication` | `/products/*` and `/tools/*` |
| `LocalBusiness` | Only once there's a verifiable address. Do not fake this. |

Validate every template in Google's Rich Results Test before launch.

---

## 7. GEO — Generative Engine Optimization

We sell this. The site must be the proof.

**How LLM surfaces actually pick sources:** they favour content that is clearly structured, directly answers a question near the top, states verifiable specifics, and is easy to quote in isolation. Optimize for **extractability**.

**Tactics:**

1. **Answer-first blocks.** Open each major section with a 40–60 word direct answer to the question the section title implies, then expand. This one habit does more for GEO than everything else combined.
2. **Question-shaped H2s.** "How much does workflow automation cost for a small business?" outperforms "Pricing."
3. **Specifics over adjectives.** "Reduced invoice processing from 6 hours to 20 minutes per week" is citable. "Dramatically improves efficiency" is not.
4. **Comparison and definition content.** LLMs cite these heavily. `n8n vs Zapier`, `AI agent vs chatbot`, `what is RAG` — and we can write them credibly.
5. **Stable, dated facts.** Visible `dateModified`, named author, and a real bio. Provenance raises citation likelihood.
6. **Clean HTML semantics.** Real `<table>`, `<ol>`, `<dl>` — not divs styled to look like them. Extractors parse structure.
7. **`/llms.txt`** at the root: a plain-text map of the site's key pages and what we do, in the [llms.txt convention](https://llmstxt.org). Cheap, and a signal we're paying attention.
8. **`robots.txt` allows reputable AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). Blocking them removes us from the channel we're trying to win.
9. **Track it:** monthly, prompt the major assistants with your target queries and record whether Anvio appears. There's no Search Console for this yet — manual tracking is the state of the art, and doing it makes a genuinely good blog post.

---

## 8. Technical SEO

Non-negotiables for a site that sells technical audits:

- Server-render every marketing page. Static generation where possible, ISR for content.
- `sitemap.xml` generated from routes + content, with `lastModified`. Submitted to GSC and Bing.
- `robots.txt` per §7.
- **Core Web Vitals per [motion-system.md](motion-system.md) §6.** Non-negotiable — this *is* a sales asset.
- HTTPS, HSTS, single canonical host (`https://anvio.online`, www → apex, 301).
- Custom 404 with useful links. No soft 404s.
- 301 map maintained from day one for any slug change.
- `hreflang` **only when** genuinely market-specific pages exist. Don't add it for a single English site.
- Image: AVIF/WebP via `next/image`, explicit dimensions, lazy below fold, **eager + `priority` on the LCP image**.

---

## 9. Measurement

**Set up before launch, not after:**
Google Search Console · Bing Webmaster Tools · GA4 · Plausible (clean top-line numbers) · Vercel Analytics for real-user CWV.

**Events:** `cta_click` (with section id) · `agent_demo_started` · `agent_demo_completed` · `lead_captured` (with source section) · `tool_completed` · `case_study_read` · `nav_service_click`.

Every section has a stable `id`, so every conversion is attributable to the section that produced it. After 90 days that data tells you which sections to cut — which is the real reason to instrument now.

**Review cadence:** weekly GSC query check for the first 90 days; monthly full review (rankings, CWV, conversion by section, GEO citation check).

**Realistic expectations:** meaningful organic traffic from a new domain takes 4–8 months. Phase 1 should be judged on conversion rate and demo completion, not on organic sessions. Judging month two by traffic leads to exactly the wrong decisions.
