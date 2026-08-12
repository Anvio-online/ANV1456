# Template — Prospect site audit

Scaffold for auditing a prospect's website before outreach. One audit file covers one batch of leads; one section per company.

**Why this exists.** Outreach that opens with a specific, verifiable defect on the prospect's own site outperforms outreach that opens with a pitch — it proves capability instead of claiming it, which is the only proof route available while Anvio has no client case studies ([evidence-and-claims.md](../../.claude/rules/evidence-and-claims.md) §2). This template exists so every audit produces findings that are actually _usable_ in an email, rather than a generic checklist dump.

---

## 1. Where the output goes

`ops/leads/YYYY-MM-DD-<segment>-audits.md` — **gitignored.**

Prospect audits live alongside the lead list, not in `ops/seo/`. `ops/seo/` is tracked in git and is for Anvio's own and clients' audits; a prospect audit sits next to named decision-makers and feeds outreach, so it inherits the lead file's handling. Do not move it to a tracked path.

Carry the standard provenance frontmatter ([agent-outputs.md](../../.claude/rules/agent-outputs.md) §3) with `status: draft`.

---

## 2. The verification standard

**This is the part that matters most, and it is where the first pass went wrong.**

A finding must be verified in a **live browser against the rendered DOM** — not inferred from fetched HTML. On the Dubai run, a "broken link" was reported from fetched markup and correctly flagged as possibly a tooling artifact. Re-checking it in a browser confirmed it was real _and_ materially worse than described: a displayed address and its `href` pointed at different addresses, and an unclosed tag swallowed an entire contact row so it never rendered at all.

That is the difference between a hedge and a fact. Both directions are costly:

| Failure                                        | Cost                                                                                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Reporting a tooling artifact as a real bug     | The email asserts something false about their business. Credibility gone on the first line — the exact opposite of the intended effect |
| Hedging a real bug ("looks like it might be…") | Reads as vague rather than careful. The specificity _is_ the value; hedging discards it                                                |

So: **verify in the DOM, then assert plainly. If it can't be verified, it doesn't go in an email** — record it as a labelled gap instead.

Every finding carries its source and check date: _"Sales Enquiries row absent from rendered DOM — homepage contact block inspected directly, checked 2026-08-13."_

---

## 3. What to check

Work down the list per site. Not every category yields a finding; a category with nothing wrong is recorded as "none observed", not padded.

**Conversion path** — the highest-value category, because defects here have a direct revenue argument.

- Contact / enquiry forms: do they render, submit, and confirm?
- `mailto:` and `tel:` links: does the visible label match the actual target?
- Wholesale / B2B / trade enquiry routes specifically — these fail silently and nobody notices
- Cart and checkout: placeholder text, unrendered template tokens, broken steps
- Out-of-stock handling on bestsellers — dead storefront real estate

**Rendering and assets**

- Broken images or placeholder graphics standing in for real product photography
- Console errors on load; failed network requests
- Layout breakage at mobile widths (test at 375px, and reload — device gates run at load)

**Performance** — measured, never estimated. Record the number and the tool.

**SEO / GEO basics**

- Missing or duplicated titles and meta descriptions; missing canonicals
- Thin or absent product/category copy on a large catalogue
- Heading structure: more than one `<h1>`, or skipped levels
- Structured data present and valid

**Trust and compliance**

- SSL validity — an expired certificate is an emergency and a legitimate reason to make contact
- Privacy policy present; cookie consent behaviour

---

## 4. Per-finding record

```markdown
### <Company> — <site>

**Overall:** <one line — the single most important thing wrong, or "nothing outreach-usable found">

| #   | Finding | Severity                 | Pillar                  | Evidence + check date | Outreach-usable? |
| --- | ------- | ------------------------ | ----------------------- | --------------------- | ---------------- |
| 1   |         | critical / major / minor | Build / Automate / Grow |                       | yes / no + why   |

**Recommended opener:** <the single finding to lead with, and the business consequence in one sentence>
**Do not mention:** <findings that are real but would land badly — see §5>
```

Severity is about **consequence to their business**, not technical interest: `critical` = losing money or leads right now · `major` = materially suppressing conversion or discoverability · `minor` = worth fixing, not worth an email.

---

## 5. Which findings are usable in an email

A finding earns its place in outreach only if **all** of these hold:

1. **Verified** in the DOM, per §2
2. **Specific** — nameable in one sentence without jargon. "Your Sales Enquiries row doesn't render" works; "suboptimal semantic markup" does not
3. **Consequential** — a non-technical reader immediately sees why it costs them ([icp.md](../../docs/business/icp.md) §4: the buyer does not care about the stack)
4. **Tone-safe** — see below

**The tone-safe test, which is the one most often failed.** The email must read as _"here's something broken you'd want to know about"_, never as _"your website is bad."_ A prospect who feels judged does not reply, however accurate the finding.

- Lead with **one** finding. A list of eight defects is an insult with citations.
- Frame around the **visitor's experience or lost revenue**, not their competence.
- Never speculate about _why_ it's broken, and never imply their developer is bad at their job — they may have built it themselves.
- Offer the diagnosis **free and unconditionally**. That is the demonstration; the ask is secondary.
- Findings tied to a person (an out-of-date team page, a founder's own bio) are off limits.

**Withhold and note:** anything unverified, anything cosmetic, and anything that would require admitting to a scan more intrusive than loading their public pages as a visitor would.

---

## 6. Boundaries

Audit only what a member of the public sees by loading public pages. **No** authenticated areas, no rate-limit-testing, no vulnerability probing, no automated crawling at volume, no submitting their forms with junk data to "test" them. This is prospect research, not a security assessment, and nothing here is authorised by the prospect.

Anvio's own commercial constraints apply to whatever gets written from this: no prices for Automate or Grow work, no client names, no case studies, no metrics of client results, no team-size claims ([current-situation.md](../../docs/business/current-situation.md)).

---

## 7. Handoff to outreach

The outreach step reads this file and the lead file together. It should be able to answer, per company, without re-researching: **what is wrong, how bad it is, what it costs them, and which single finding opens the email.** If a section doesn't answer those four, it isn't finished.

Where a company yields no outreach-usable finding, say so explicitly. "No defect found" is a real result — it means the lead is weaker than its ICP score suggests, and the outreach step needs to know that rather than inventing an angle.
