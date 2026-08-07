# About — Page Spec

**URL:** `/about`
**Primary intent:** Trust. Nobody arrives here to be sold to — they arrive to check whether we're real before booking a call.
**Reads as:** Quieter than the service pages. Shared shell, no signature scene.
**Primary conversion:** Book a call.

**Title:** `About Anvio — AI Automation & Software, Built Properly` (53 chars)
**Description:** `Why Anvio exists, how we work, and what we won't do. A small engineering team building AI automation, software, and growth systems for businesses with 10–200 people.` (157 chars)

**Keyword cluster:** Low commercial intent by design. `about Anvio` · `AI automation agency India` (brand + category reinforcement only). **Do not optimize this page for a service keyword** — that's what the pillar pages are for, and competing with them is textbook cannibalization ([seo-strategy.md](../system/seo-strategy.md) §3: "one page = one intent").
**Schema:** `AboutPage` + `Organization` + `BreadcrumbList`

---

## The strategic problem this page has to solve

[Brand_strategy.md](../Initial/Brand_strategy.md) sets the target impression: *"These people aren't freelancers. They look like a product engineering company."*

But Anvio today is a very small team, and the UAE work (Baladi, Epicerma, BluPebble) was delivered as a subcontractor through another agency. **An About page that implies a 20-person office is a lie that gets discovered on the first call** — and the discovery costs more than the impression gained.

The resolution is to not compete on size at all. Compete on **method**: published pricing, a published process, real engineering standards, and a clear statement of what we won't take on. A small team with all of that reads as far more serious than a vague "team of passionate experts" — and it's true, which means it survives contact with the client.

This page's job is to make small feel *deliberate*, not *provisional*.

---

## Section 1 — Hero
`hero:page-lead` · dark · Tier 3

`page-lead` is the quieter hero variant (documented in [section-library.md](../system/section-library.md) §3, not yet built) — no split visual, no poster, no CTA pair. Headline and a short lead, centred or left, generous space. Nothing to interact with.

**Copy**
> **Eyebrow:** ABOUT ANVIO
> **H1:** We build the boring infrastructure that makes a business faster.
> **Sub:** Anvio is a small engineering team. We automate manual work, build software that fits how a business actually runs, and make sure people can find it. Most of what we do isn't glamorous — it's the plumbing that stops your team retyping things.

**Motion:** `maskReveal` on the headline, `fadeUp` on the lead. That's the whole page's ambition for motion above the fold.

---

## Section 2 — Why Anvio exists
`richText` · dark · Tier 3

**Purpose:** The thesis. Two or three short paragraphs, written in a real voice, no agency boilerplate.

**Copy direction** (final copy to be written — see open items):

> Most businesses with 10 to 200 people are running on a stack of things that half-work. A website someone built three years ago and nobody can update. A CRM that people update by hand, when they remember. A team spending Monday morning assembling a report that a machine could have written at 6am.
>
> None of it is broken enough to fix urgently. All of it, together, is a full-time salary's worth of wasted time.
>
> Anvio exists to fix that layer specifically — not to redesign your brand, and not to sell you an AI strategy deck. We build the automation, the software, and the search visibility, and we hand you the code.

**Layout:** Single column, `--measure` (68ch), generous leading. No cards, no icons. The visual restraint is the point — a page that argues for substance shouldn't be decorated.

**Rule:** no founder-origin-story clichés. No "we were frustrated by…", no "founded on the belief that…". State what's true.

---

## Section 3 — What we believe
`whyUs:principle-cards` · dark · Tier 3

The `principle-cards` variant of the same section type Home and Automate use as `contrast-table`. Different shape because this isn't a competitor comparison — it's a statement of method.

| Principle | The line under it |
|---|---|
| **Published pricing** | Ranges are on the site. You shouldn't need a call to find out whether we're in your budget. |
| **You own everything** | Code, workflows, design files, documentation — yours from day one, not licensed to you. |
| **Weekly demos, not status updates** | You see the actual thing every week. "On track" is not a status. |
| **We'll tell you not to buy** | If a process isn't worth automating or your site doesn't need a rebuild, that's the advice you get. It costs us a project and saves you a bad one. |
| **Boring where it counts** | Proven tools, tested against your real data, with the failure modes thought through. Novelty is a cost, not a feature. |
| **We stay reachable** | 30 days support on every build, and a team that still knows your system in a year. |

**Motion:** `fadeUpGroup`, 60ms stagger, capped at 6 (exactly 6 — at the primitive's limit).

**Note:** every one of these is already promised somewhere else on the site (engagement-model policy notes, the service-page FAQs). That repetition is deliberate and correct — this is the page where they're stated as *principles* rather than as terms.

---

## Section 4 — Who you actually work with
`team:founder-note` · light · Tier 3

**Purpose:** The honesty section, and the one that most decides whether a cautious SMB owner books.

**Content:** A real photo, a real name, a short note in first person. Not a grid of stock headshots. Not "our team" if it's one or two people.

**Copy direction:**
> Anvio is small on purpose. You'll talk to the person building your system, not an account manager relaying messages to a team you never meet. When something breaks at an awkward time, that's a direct line, not a ticket queue.
>
> For larger builds we bring in specialists we've worked with before — and we tell you who's doing what before the work starts, not after.

**Theme:** first light section. `themeShift` at the boundary. The shift lands here deliberately — the page changes register from argument to person.

**Shipped without a photo or name.** Not a placeholder — the copy above is the real, final first-person-plural note, written so it's honest whether or not it's signed. The photo and a name/role are still pending (the person it'd name is still employed elsewhere and hasn't decided to disclose Anvio publicly yet); `TeamProps.photo`/`.name` in `sections/team/` are optional for exactly this reason. **Still true if that changes: never a stock photo.**

---

## Section 5 — What we won't do
`whyUs:numbered-list` · light · Tier 3

**Purpose:** The most credible section on the page, and the cheapest to write honestly. Straight from [Brand_strategy.md](../Initial/Brand_strategy.md)'s "What We Will NOT Be", turned outward.

> **H2:** Things we'll turn down.
> **Body:** Being clear about this saves everyone a discovery call.

1. **We're not a design studio.** We design what we build. We don't sell a Figma file and wish you luck.
2. **We're not a social media or ads agency.** We'll make you findable in search and AI assistants. We won't run your Instagram.
3. **We don't do WordPress theme work.** If you need a plugin configured on an existing WordPress site, we're the wrong call — and an expensive one.
4. **We don't take enterprise procurement.** Twelve-month sales cycles and six stakeholders aren't what we're built for. Under 200 people is where we're good.
5. **We won't automate something that shouldn't be.** Some processes are too low-volume, too judgement-heavy, or too close to changing. We'll say so.

**Motion:** `fadeUpGroup`, numbered mono markers in `--accent-text`.

**Why this works:** naming a real "no" is the only claim on a services site that can't be copied by a competitor without cost. Every item here loses us some enquiries — which is exactly why it's believable.

---

## Section 6 — How we work
`process:vertical-list` · light · Tier 3

The five stages, compressed. **Not** `sticky-stack` and **not** `horizontal-pin` — both belong to the service pages, and re-running a signature treatment here would flatten the distinction between an About page and a sales page.

> 01 DISCOVER · 02 STRATEGIZE · 03 BUILD · 04 LAUNCH · 05 GROW

One line each, then: `The full version, with what ships at each stage → /services/automate`

**Motion:** `fadeUpGroup` only. Tier 3.

---

## Section 7 — Where we work
`richText` · dark · Tier 3

Short. Based in India, working with businesses in India and the UAE, and remote-first for English-speaking markets ([SCOPE.md](../Initial/SCOPE.md): "starting with India, then UAE, then other English-speaking markets").

Include timezone/working-hours honesty and how project communication actually runs (weekly demo, shared staging, direct line). This is a real objection for a UAE or international buyer and it's cheap to resolve.

---

## Section 8 — Closing CTA
`ctaClosing:centered-bold` · dark · Tier 3

`centered-bold`, not `split-with-form`. The form belongs on `/contact`; About should hand off rather than compete with it.

> **H2:** If that sounds like the right fit, let's talk.
> **Body:** 30 minutes, no pitch deck. Tell us what's slow and we'll tell you honestly whether we can help.
> **CTA:** Book a free consultation → `/contact`

Then footer.

---

## Motion budget check

**No Tier 1 on this page, deliberately.** [motion-system.md](../system/motion-system.md) §2 assigns signature scenes to Home, Automate, Build, and Grow — the four pages that have to *sell*. About's job is credibility, and a scroll-jacked scene on a trust page reads as a company performing rather than explaining.

| Tier | Section |
|---|---|
| 1 — Signature | *(none — intentional)* |
| 2 — Supporting | *(none)* |
| 3 — Ambient | All sections: `maskReveal` on §1, `fadeUpGroup` throughout |
| 4 — Micro | Hovers, `arrowSlide` on links |

Well under budget. That restraint is the design.

---

## Deliberately not on this page

- **Tech stack** — [automate-spec.md](automate-spec.md) deferred it to "About page or footer"; [build-spec.md](build-spec.md) §7 takes it instead, with the reasoning that a buyer commissioning custom software is genuinely evaluating the stack they'll inherit. One home per section. Recorded here so the decision is traceable rather than looking like an omission.
- **Case studies / logos** — `/case-studies` is the page for that. Repeating them here dilutes both.
- **Careers** — [Information_arch.md](../Initial/Information_arch.md) lists it as "later". Add when there's a real role.
- **Awards / certifications** — none that are real. Leave it empty rather than inflate it.

## Build order

All eight sections shipped, including §4.

## Open items

- [x] ~~§2 and §4 copy written in a real first-person voice~~ — done
- [ ] A real photo for §4, and a name/role to sign it with. No stock. No AI-generated portrait. Shipped anonymously on purpose — the person it'd name is still employed elsewhere and hasn't decided to disclose Anvio publicly. `TeamProps.photo`/`.name` (`sections/team/`) are optional specifically so these drop in later without a rebuild.
- [ ] Decide how to describe the Stratseek-delivered UAE work honestly if it comes up — "delivered as a subcontractor" is fine and normal; implying direct client relationships is not
- [ ] Confirm team size language matches reality at launch (§4 says "small on purpose" — keep it accurate as that changes)
