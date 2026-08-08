# Anvio — Section Library

**Status:** v1
**Purpose:** 25+ pages must not become 25 codebases.

---

## 1. The composition model

A page is **data**, not layout. Every page is an ordered list of section instances:

```ts
// app/(marketing)/automate/page.tsx
export const sections: SectionInstance[] = [
  { type: 'hero',        variant: 'split-visual', theme: 'dark',  props: { ... } },
  { type: 'proofBar',    variant: 'marquee',      theme: 'dark',  props: { ... } },
  { type: 'problem',     variant: 'before-after', theme: 'dark',  props: { ... } },
  { type: 'workflowGraph', variant: 'live',       theme: 'dark',  props: { ... } },
  { type: 'process',     variant: 'sticky-stack', theme: 'light', props: { ... } },
  ...
]
```

Rendered by a single `<SectionRenderer />` that maps `type` → component and applies `data-theme`.

**Three rules that keep this from rotting:**

1. **A section never knows what page it's on.** No `if (page === 'home')`. Differences are expressed as `variant` or props.
2. **New need → new `variant` on an existing section first.** A new section `type` requires justification: it must be structurally different, not just visually different. Target for the whole site: **≤ 24 types**.
3. **Sections own no vertical margin.** The renderer applies `--section-y`. This is what makes reordering safe.

**Theme sequencing:** the renderer validates that no more than three consecutive sections share a theme on a page longer than 8 sections. Long unbroken dark stretches are what make a page feel like an endless scroll.

---

## 2. Shared contract

```ts
interface SectionBase {
  id: string                    // anchor + analytics key, kebab-case
  type: SectionType
  variant: string
  theme: 'dark' | 'light'
  eyebrow?: string              // mono label, accent
  heading?: string              // h2 — h1 only in hero
  body?: string
  cta?: { label: string; href: string; style: 'primary' | 'secondary' | 'link' }
  width?: 'content' | 'container' | 'bleed'   // default 'content'
  motion?: 'none' | 'ambient' | 'supporting' | 'signature'  // default 'ambient'
}
```

Every section renders a `<section id>` with a heading in the correct level. Heading level is computed by the renderer from document order — sections never hardcode `<h2>`.

---

## 3. The catalogue

### Hero — `hero`

| Variant | Layout | Used by |
|---|---|---|
| `centered-statement` | Big centered headline, sub, dual CTA, ambient grid behind | Home |
| `split-visual` | Headline left, live visual right (workflow graph preview / browser frame / chart) | Automate, Build, Grow |
| `page-lead` | Compact: eyebrow + h1 + one line. No visual | About, Blog, Legal |
| `case-lead` | Client + outcome metric + hero image | Case study detail |

Props: `headline`, `sub`, `ctas[]`, `visual`, `trustLine?` (one line of proof under the CTAs).
**Constraint:** hero is server-rendered and complete without JS. It's the LCP element on every page.

### Proof bar — `proofBar`

| Variant | Content |
|---|---|
| `marquee` | Scrolling logo/tech tiles. **Phase 1: integrations and stack, not client logos.** |
| `stat-row` | 3–4 `counterRoll` metrics with mono labels |
| `statement` | One line of positioning + a single link |

Never ship `marquee` with fewer than 10 items — a sparse marquee announces that you have nothing to show.

### Services / pillars — `services`

| Variant | Layout |
|---|---|
| `pillar-cards` | 3 large cards (Build / Automate / Grow), each with a looping micro-visual in its own pillar language |
| `cluster-grid` | 3–4 capability clusters, each expandable to sub-items (accordion) |
| `list-detail` | Left: capability list. Right: detail panel that swaps on hover/click |

`cluster-grid` is the answer to "9 services is a wall." Group, then reveal.

### Problem framing — `problem`

| Variant | Layout |
|---|---|
| `before-after` | Split or toggle: "Without automation" vs "With Anvio". Sadewa-style. |
| `pain-grid` | 4–6 pain statements as cards, each with the cost it creates |
| `cost-calculator` | Interactive: inputs → hours/money lost. Doubles as a lead capture |

### Signature scenes

| Type | Variants | Notes |
|---|---|---|
| `process` | `horizontal-pin` (Home, Tier 1) · `sticky-stack` · `vertical-list` | `horizontal-pin` is **reserved for Home** so the signature stays unique |
| `workflowGraph` | `live` (Automate, Tier 1) · `static` · `compact` | DOM+SVG, never canvas |
| `buildAssembly` | `wireframe-to-render` · `component-grid` | Build pillar |
| `growthChart` | `dashboard-evolve` · `rank-climb` | Grow pillar |

Each is dynamically imported and IntersectionObserver-gated. See [motion-system.md](motion-system.md) §7.

### Agent demo — `agentDemo`

| Variant | Behaviour |
|---|---|
| `full` | Live conversational agent. Asks 3–4 questions about the visitor's manual processes, returns a mini automation plan + captures email for the full version |
| `preview` | Non-interactive scripted transcript with a CTA into `full` |

Phase 1 uses `full` on Home and Automate. See §5.

### Work / proof

| Type | Variants |
|---|---|
| `featuredWork` | `two-up-deep` (2 cards, full outcome) · `grid` · `carousel` |
| `caseStudyBody` | `narrative` (problem → approach → solution → results → lessons) |
| `results` | `metric-row` — `counterRoll` outcome stats |
| `testimonial` | `single-large` · `grid` · `with-avatar` |

**Phase 1 uses `two-up-deep`.** Two case studies told properly beat six thumbnails, and it's honest about where we are.

### Trust & differentiation

| Type | Variants | Notes |
|---|---|---|
| `whyUs` | `contrast-table` (us vs typical agency) · `principle-cards` · `numbered-list` | |
| `engagementModel` | `phase-timeline` · `tier-cards` | **The pricing/how-we-work section.** Phases, timelines, price ranges, what happens when scope changes |
| `team` | `founder-note` · `grid` | `founder-note` — real photo, real signature, why we started this |
| `industries` | `compact-grid` · `tabbed-detail` | Links to industry pages when they exist |
| `techStack` | `logo-grid` · `categorized` | Footer-adjacent or About. Not a homepage section |
| `integrations` | `marquee-dual` · `logo-grid` · `searchable` | Landio-style. Dual-row opposing direction |

### Content & conversion

| Type | Variants |
|---|---|
| `faq` | `accordion` · `two-column` — always emits `FAQPage` schema |
| `insights` | `three-latest` · `featured-plus-list` |
| `leadMagnet` | `tool-card` · `inline-form` — ROI calculator, scorecard, audit |
| `ctaClosing` | `centered-bold` · `split-with-form` · `calendar-embed` |
| `contact` | `form-plus-details` · `calendar` |

### Utility

`breadcrumb` · `tableOfContents` (long content pages) · `authorBio` · `relatedLinks` (internal-linking block, see [seo-strategy.md](seo-strategy.md) §5) · `richText` (MDX body).

**Total: 24 types.** That covers every page in the IA.

---

## 4. Page compositions

### Home
```
hero:centered-statement (dark)
proofBar:marquee (dark)
services:pillar-cards (dark)
agentDemo:full (dark)
featuredWork:two-up-deep (light)
process:horizontal-pin (light)          ← Tier 1
engagementModel:phase-timeline (light)
whyUs:contrast-table (dark)
industries:compact-grid (dark)
insights:three-latest (dark)
ctaClosing:split-with-form (dark)
```

### Automate
```
hero:split-visual (dark)
proofBar:stat-row (dark)
problem:before-after (dark)
services:cluster-grid (dark)
workflowGraph:live (dark)               ← Tier 1
process:sticky-stack (light)
integrations:marquee-dual (light)
featuredWork:two-up-deep (light)
whyUs:contrast-table (dark)
agentDemo:full (dark)
faq:accordion (dark)
ctaClosing:split-with-form (dark)
```

### Build (Phase 1)
Full spec: [build-spec.md](../specs/build-spec.md)
```
hero:split-visual (dark)
proofBar:stat-row (dark)
problem:pain-grid (dark)
services:cluster-grid (dark)
buildAssembly:wireframe-to-render (dark)   ← Tier 1
process:sticky-stack (light)
techStack:categorized (light)
featuredWork:grid (light)
engagementModel:tier-cards (light)
faq:accordion (dark)
ctaClosing:split-with-form (dark)
```

### Grow (Phase 1)
Full spec: [grow-spec.md](../specs/grow-spec.md)
```
hero:split-visual (dark)
proofBar:stat-row (dark)
problem:cost-calculator (dark)             ← interactive
services:cluster-grid (dark)
growthChart:dashboard-evolve (dark)        ← Tier 1
process:sticky-stack (light)
leadMagnet:tool-card (light)               ← free audit, the page's primary conversion
featuredWork:two-up-deep (light)
results:metric-row (light)
faq:accordion (dark)
ctaClosing:split-with-form (dark)
```

### About (Phase 1)
Full spec: [about-spec.md](../specs/about-spec.md)
```
hero:page-lead (dark)
richText (dark)                            ← why Anvio exists
whyUs:principle-cards (dark)
team:founder-note (light)
whyUs:numbered-list (light)                ← what we won't do
process:vertical-list (light)
richText (dark)                            ← where we work
ctaClosing:centered-bold (dark)
```
No Tier 1 — see motion-system.md §8.

### Contact (Phase 1)
Full spec: [contact-spec.md](../specs/contact-spec.md)
```
contact:split-form (dark)                  ← above the fold, both columns
leadMagnet:tool-card (dark)                ← routes to the agent demo / free audit
contact:details (dark)
richText (dark)                            ← what happens next
```
No Tier 1 or 2 — the form is LCP-critical and never waits on a bundle.

Note how much variety comes from **variant + theme + order** rather than new components. That's the point.

---

## 4a. Phase 2 compositions

Full plan: [phase-2-plan.md](../specs/phase-2-plan.md). Authoring model: [ADR-0006](../engineering/adr/0006-content-page-authoring-model.md) — composed pages write their array by hand, hybrid and article pages derive it from an MDX entry.

**No Phase 2 page carries a Tier 1 scene.** [phase-2-plan.md](../specs/phase-2-plan.md) §4.

### `/services` hub — composed · [spec](../specs/services-hub-spec.md)
```
breadcrumb:inline (dark)
hero:page-lead (dark)
services:pillar-cards (dark)        ← hoverLift only, no micro-visual
faq:accordion (dark)                ← "which one do you need?"
process:vertical-list (light)
featuredWork:grid (light)           ← withheld until Wave 2
whyUs:principle-cards (dark)
ctaClosing:split-with-form (dark)
```

### `/case-studies` index — composed · [spec](../specs/case-studies-spec.md)
```
breadcrumb:inline (dark) · hero:page-lead (dark) · featuredWork:grid (dark)
· ctaClosing:centered-bold (dark)
```

### `/case-studies/[slug]` — hybrid · [spec](../specs/case-studies-spec.md)
```
breadcrumb:inline (dark)
hero:case-lead (dark)
results:metric-row (dark)           ← Tier 2; omitted entirely when results[] is empty
caseStudyBody:narrative (light)     ← the MDX body
techStack:categorized (light)
relatedLinks:card-grid (light)
ctaClosing:split-with-form (dark)
```

### `/projects` — composed · [spec](../specs/projects-spec.md)
```
breadcrumb:inline (dark) · hero:page-lead (dark) · featuredWork:grid (dark)
· richText:prose (light) · ctaClosing:centered-bold (dark)
```
`CaseStudyCard` gains a required `kind: 'client' | 'internal' | 'partner-agency'` — the label
renders from the field, so honest attribution is structural rather than editorial.

### Service leaf — hybrid · [spec](../specs/service-leaf-spec.md)
```
breadcrumb:inline (dark)
hero:page-lead (dark)               ← deliberately not split-visual, which is the pillars'
problem:pain-grid (dark)
richText:mdx (light)                ← the substance — this is what ranks
workflowGraph:compact (light)       ← Tier 2 · buildAssembly:component-grid on the Build leaf
faq:accordion (light)               ← in the light band; the theme rule leaves nowhere else
agentDemo:full (dark)               ← Tier 2 · Automate leaves only
relatedLinks:card-grid (dark)
ctaClosing:centered-bold (dark)
```
The Build leaf swaps `agentDemo:full` for `results:metric-row` (dark) — the demo is
automation-scoped, and Build has real client work to point at instead. The Automate leaves
carry it because they have none: see [phase-2-plan.md](../specs/phase-2-plan.md) §1a.

### `/industries` hub — composed · [spec](../specs/industries-spec.md)
```
breadcrumb:inline (dark) · hero:page-lead (dark) · industries:compact-grid (dark)
· problem:pain-grid (light) · richText:prose (light) · faq:accordion (dark)
· ctaClosing:centered-bold (dark)
```

### `/industries/[slug]` — hybrid · [spec](../specs/industries-spec.md)
```
breadcrumb:inline (dark) · hero:page-lead (dark) · problem:pain-grid (dark)
· richText:mdx (light) · services:cluster-grid (light) · featuredWork:grid (light, optional)
· faq:accordion (dark) · relatedLinks:card-grid (dark) · ctaClosing:split-with-form (dark)
```

### `/guides` index and `/guides/[slug]` — composed / article · [spec](../specs/guides-spec.md)
```
index:   breadcrumb:inline (dark) · hero:page-lead (dark)
         · insights:featured-plus-list (dark) · ctaClosing:centered-bold (dark)

article: breadcrumb:inline (dark) · hero:page-lead (dark) · tableOfContents:inline (light)
         · richText:mdx (light) · authorBio:compact (light)
         · relatedLinks:card-grid (dark) · ctaClosing:centered-bold (dark)
```

### `/tools/automation-roi-calculator` — composed · [spec](../specs/tools-spec.md)
```
breadcrumb:inline (dark) · hero:page-lead (dark)
· problem:automation-calculator (dark)   ← Tier 2
· richText:prose (light) · leadMagnet:route-cards (light)
· faq:accordion (dark) · relatedLinks:card-grid (dark) · ctaClosing:centered-bold (dark)
```

### `/privacy` · `/terms` · `/cookies` — composed · [spec](../specs/legal-spec.md)
```
breadcrumb:inline (dark) · hero:page-lead (dark) · richText:prose (dark)
```

**Registry entries after Phase 2: 28** (§3's catalogue counts the same surface as "24 types" by folding the utility group into one line). 22 are built today, plus `breadcrumb`, `relatedLinks`, `tableOfContents`, `authorBio`, `caseStudyBody`, `insights`. `testimonial` stays unbuilt (no testimonials to show). Still under [ADR-0003](../engineering/adr/0003-section-registry-composition.md)'s "revisit at ~30" trigger, but only just — Phase 3 types must clear the variant-first bar properly. New variants and the missing schema builders are itemized in [content-layer.md](../engineering/content-layer.md) §4.

---

## 5. `agentDemo:full` — build notes

This is the differentiator, so it gets specified rather than left to implementation.

**Flow**
1. Idle state: an input with a rotating placeholder (`"We manually enter invoices into Tally…"`, `"Our team answers the same WhatsApp questions all day…"`).
2. Visitor describes a manual process in free text.
3. Agent asks up to 3 follow-ups (volume, tools in use, team size). Buttons for common answers so it's two taps, not an essay.
4. **Email gate.** *"Your plan is ready — where should we send it?"* One field. See [ADR-0005](../engineering/adr/0005-agent-demo-model-and-email-gate.md) — the cheap Q&A turns are open, the expensive plan call is not.
5. Agent returns a **mini automation plan**: the workflow as a node diagram (reusing `workflowGraph:compact`), the tools it would connect, an estimated hours-saved-per-month range, and a rough complexity band. It renders in the panel **and** is emailed.
6. Lead pipes into the CRM, tagged with the transcript.

**Engineering** — full detail in [tech-stack.md](../engineering/tech-stack.md) §5.
- Server-side API route. **The model key never reaches the client.**
- Model: **`claude-sonnet-5`** ([ADR-0005](../engineering/adr/0005-agent-demo-model-and-email-gate.md)).
- **Two calls, not one:** stream text for the Q&A turns (`effort: low`, ungated); one schema-constrained `messages.parse()` call for the plan (`effort: medium`, **email required**). Streaming a JSON blob and animating partial JSON makes a fragile demo — the client animates from the finished object instead.
- **The email gate is enforced server-side.** The route refuses to generate a plan without a captured email; the form is UX, not the control.
- **Rate limit per IP** (3 plans/hour, 10/day) and cap tokens per session. There is no API-side spend cap; this is the only thing between you and a bill.
- Constrain the plan to a Zod schema via `output_config.format`. Free-text answers make an unreliable demo, and an unreliable demo is worse than no demo.
- System prompt is versioned in the repo and reviewed like code. It must decline off-topic requests and never quote a firm price.
- Check `stop_reason` before reading content — a safety refusal returns HTTP 200 with empty content, and code that reads `content[0]` blindly will crash on it.
- Graceful degradation: any failure falls back to `agentDemo:preview` rather than showing an error. The section must never look broken.

**Guardrails**
- Never state a definitive price — ranges and "we'll confirm on a call" only.
- Never promise a specific integration exists without hedging.
- Log transcripts (with consent notice) — this is the best product research the site can generate.

---

## 6. Content model

Content is MDX + typed frontmatter in `content/`:

```
content/
  case-studies/*.mdx     # client, industry, services[], problem, approach, results[], stack[]
  insights/*.mdx         # title, description, category, publishedAt, updatedAt, author
  industries/*.mdx       # Phase 2
  services/*.mdx         # leaf page copy, Phase 2
  guides/*.mdx           # Phase 2 — author, readingTime, commercialLink
```

**None of this exists yet.** `content/` holds one `.gitkeep` and `lib/content/` is empty — the adapter, the schemas, and the seven unbuilt section types are the Phase 2 critical path, specified in [content-layer.md](../engineering/content-layer.md).

Section props for content-driven sections come from these files, not from page files. Migrate to Sanity or Payload when a non-developer needs to publish — the section contract doesn't change, only the data source.

---

## 7. Directory layout

```
components/
  sections/          # one folder per type, index.tsx + variants/
  ui/                # Button, Card, Badge, Input, Accordion, Marquee…
  motion/            # fadeUp, maskReveal, counterRoll, nodeCascade, pathPulse…
  scenes/            # Tier 1 — dynamically imported
lib/
  sections/          # registry, SectionRenderer, types, heading-level resolver
  seo/               # metadata + schema builders
content/
app/styles/tokens.css
```

---

## 8. Definition of done, per section

- [ ] Renders correctly in **both** themes
- [ ] Responsive at 375 / 768 / 1280 / 1920
- [ ] Reduced-motion and mobile degradation paths implemented
- [ ] All copy from props/content — no hardcoded strings
- [ ] Correct heading level via the renderer
- [ ] Keyboard-operable, visible focus, text equivalent for any graphic
- [ ] No Tailwind arbitrary values
- [ ] Owns no vertical margin
- [ ] Route still within the JS budget ([motion-system.md](motion-system.md) §6)
