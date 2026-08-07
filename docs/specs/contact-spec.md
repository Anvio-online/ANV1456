# Contact — Page Spec

**URL:** `/contact`
**Primary intent:** Conversion. This is the last page before a lead exists.
**Reads as:** The shortest page on the site. Shared shell, no signature scene, nothing to scroll past.
**Primary conversion:** Book a call (form submission).

**Title:** `Contact Anvio — Book a Free Consultation` (40 chars)
**Description:** `Tell us what's slow. A 30-minute call, no pitch deck — we'll tell you honestly whether we can help and roughly what it would take.` (129 chars)

**Keyword cluster:** Navigational only (`contact Anvio`). **Do not optimize.** No keyword targeting, no content padding to hit a word count — [seo-strategy.md](../system/seo-strategy.md) §4's minimums explicitly apply to pillar/leaf/guide pages, not to a conversion page. Padding this page with SEO copy costs conversions and gains nothing.
**Schema:** `ContactPage` + `Organization` + `BreadcrumbList`

---

## The one rule for this page

**Every element either helps someone submit the form or it's cut.**

Contact pages fail in one of two ways: they ask for too much, or they bury the form under re-sold copy the visitor already agreed with — they're on `/contact`, they're convinced, stop selling. Every section below has to justify itself against "does this help them submit, or reduce the anxiety that stops them?"

The `/contact` route is already linked from the nav's primary CTA button, the footer, and both service pages' closing CTAs, so it receives high-intent traffic almost exclusively. Treat it accordingly.

---

## Section 1 — Hero + form
`contact:split-form` · dark · Tier 3

**Above the fold, both columns. The form is not below anything.**

**Left column — the reassurance:**
> **Eyebrow:** LET'S TALK
> **H1:** Tell us what's slow.
> **Sub:** A 30-minute call. We'll look at one process or one page, tell you honestly whether it's worth fixing, roughly what it'd take, and what it'd cost. If the answer is "not yet," you'll get that too.

Below the sub, three short reassurance lines with amber markers — these do the anxiety-reduction work:

> · We reply within one working day
> · No pitch deck, no slide about our "process journey"
> · If we're not the right fit, we'll say so and point you somewhere better

**Right column — the form.** Fields:

| Field | Required | Why it's here |
|---|---|---|
| Name | yes | — |
| Work email | yes | The only channel we need |
| Company | no | Useful context, not worth losing a submission over |
| Team size | no | Qualifies fast — 10–200 is our stated range |
| What should we look at? | yes | Textarea. Filters tyre-kickers and gives the call an opening line. |

**Submit:** `Book the call`

**On "Team size":** [automate-spec.md](automate-spec.md) §12 specced this field and it does not exist in the current `ContactForm` / `contactSchema` / DB table — the Automate build shipped without it and flagged the gap. **This page is where that field earns its keep**, so it should land as part of Contact's build: schema + migration + form field, not a drive-by change.

**Motion:** `fadeUp` on the left column, form renders immediately. `magneticCTA` on submit (Tier 4). Nothing that delays interactivity.

**States, all required:**
- **Idle** — as above
- **Submitting** — button label swaps, form disabled, no layout shift
- **Success** — replaces the form in place with a real confirmation: what happens next and *when* ("We'll reply by end of the next working day"). Not a toast, not a redirect to `/thank-you` — [seo-strategy.md](../system/seo-strategy.md) §4 excludes `/thank-you` from indexing, which is a hint it exists as a tracking artifact; an inline success state is better UX and still trackable.
- **Error** — inline, with the alternative contact route visible. Never lose what they typed.

**Validation:** inline, on blur, never on keystroke. Errors in `--error` with an icon and text, never colour alone ([design-system.md](../system/design-system.md) §6.7).

---

## Section 2 — Not ready for a call?
`leadMagnet:tool-card` · dark · Tier 3

**Purpose:** Catch the visitor who wants to check us out without talking to anyone. Without this, they leave and are gone.

Two options, side by side:

> **Try the agent demo** — Describe one repetitive process and get a real automation plan back. Free, no call, about 60 seconds. → `#agent-demo` on `/services/automate`
>
> **Get a free site audit** — Send a URL, get back a real technical audit in five working days. → `/services/grow` §7

Both already exist as conversion devices on their own pages; this section routes to them rather than duplicating them.

**Motion:** `hoverLift` only. Tier 4.

---

## Section 3 — Other ways to reach us
`contact:details` · dark · Tier 4

Plain, scannable, no form:

> **Email** hello@anvio.online
> **Response time** Within one working day, Monday–Friday
> **Where we are** India · working with clients in India, the UAE, and remote-first elsewhere

Include a real email as a `mailto:` link. Some people will never fill a form, and making them hunt for an address is a self-inflicted loss.

**No phone number** unless someone will actually answer it. A number that rings out is worse than no number.

**No physical address** unless it's a real place a client could visit. A residential address on a contact page reads worse than none.

**No embedded map.** It costs a third-party script and a CLS risk to show a pin nobody needs.

---

## Section 4 — What happens next
`richText` · dark · Tier 4

Four lines. This is the anxiety-reduction section and it converts better than anything else on the page.

> 1. **You send this form.** It reaches a person, not a queue.
> 2. **We reply within one working day** — usually with a couple of questions or a calendar link.
> 3. **The call is 30 minutes.** You describe the problem; we tell you what we'd do and roughly what it costs.
> 4. **You get a written summary** whether or not you hire us. Including the "you don't need this" version.

Point 4 is the one worth keeping verbatim.

Then footer.

---

## Motion budget check

**No Tier 1 and no Tier 2 on this page, deliberately.** Motion on a conversion page can only delay or distract. [motion-system.md](../system/motion-system.md) §6 rule 1's logic applies with extra force here: the form is the LCP-critical element and must never wait on a bundle.

| Tier | Section |
|---|---|
| 1 — Signature | *(none — intentional)* |
| 2 — Supporting | *(none — intentional)* |
| 3 — Ambient | §1 `fadeUp` on the copy column, §2 |
| 4 — Micro | `magneticCTA` on submit, `hoverLift` on §2 cards, field focus states |

The form itself never animates in. It's server-rendered and interactive on arrival.

---

## Deliberately not on this page

- **Testimonials / logos / stats** — they belong upstream. Someone on `/contact` is already convinced; re-selling reads as insecurity and pushes the form down.
- **A long "why choose us"** — that's `/about` and the service pages. Link, don't repeat.
- **Calendar embed (Cal.com / Calendly) as the primary CTA** — it's a heavier third-party script, it exposes an empty calendar, and it forces a time commitment before any context. Keep the form primary; send the calendar link in the reply, once we know what the call is about. Revisit if reply-time becomes the bottleneck.
- **A chatbot widget.** We sell automation; a support bot on our own contact page competes with the actual form and the agent demo does this job better.

## Build order

1. Hero + form, Other ways to reach us, What happens next *(shippable page — this is most of it)*
2. Not ready for a call?
3. `teamSize` field: schema + DB migration + form field

## Open items

- [ ] Add `teamSize` to `contactSchema`, the Drizzle `contactSubmissions` table, and `ContactForm` — deferred during the Automate build, owed here
- [ ] Confirm `hello@anvio.online` is monitored, and by whom
- [ ] Confirm the "within one working day" promise is one we'll actually hold — it appears three times on this page and breaking it is worse than never claiming it
- [ ] Decide where submissions land (DB is wired; is there an email/Slack notification?) — a form that stores silently and notifies nobody is how leads get missed
- [ ] Write the success-state copy
- [ ] `contact:split-form`, `contact:details`, `leadMagnet:tool-card`, and `richText` are all unbuilt section types/variants
