# Services and Pricing

**Status:** v1 · **Canonical source for prices:** the shipped pages. This file restates them so agents don't have to parse route files.

> **If this file disagrees with the site, the site wins.** Build tiers live in `apps/web/src/app/(marketing)/services/build/page.tsx`. Changing a price there without updating this file is a bug — fix both in the same PR.

---

## 1. The three pillars

| Pillar       | Route                | Sells                                    | Signature proof today                     |
| ------------ | -------------------- | ---------------------------------------- | ----------------------------------------- |
| **Build**    | `/services/build`    | Websites, web apps, ecommerce            | Real delivered ecommerce work             |
| **Automate** | `/services/automate` | AI agents, chatbots, workflow automation | The live agent demo — no client proof yet |
| **Grow**     | `/services/grow`     | SEO, GEO, performance, maintenance       | anvio.online itself, once it scores       |

Shipped service leaves: `whatsapp-automation`, `ai-chatbot-development` (both Automate, both on **provisional slugs pending keyword validation**).

---

## 2. Build — published price floors

Stated as **"Starting from ₹X"**, deliberately. These are floors, not quotes.

| Tier                   | Fits                                    | Timeline   | Floor     |
| ---------------------- | --------------------------------------- | ---------- | --------- |
| **Landing Page**       | One focused page, one offer, no CMS     | 1–2 weeks  | ₹25,000   |
| **Marketing Site**     | 5–15 pages, CMS, contact + analytics    | 4–6 weeks  | ₹1,25,000 |
| **Ecommerce Build**    | Catalogue, checkout, payments, shipping | 6–10 weeks | ₹2,50,000 |
| **Custom Application** | Internal tool, dashboard, CRM/ERP work  | 8–16 weeks | ₹4,00,000 |

**We quote after discovery, never before.** The floor is what makes a cheap-website shopper self-select out; the quote is what makes the number honest.

---

## 3. Automate and Grow pricing

**Not published, and that is a decision, not an oversight.** Automation scope varies too much for a floor to mean anything, and there is no delivered-automation baseline to price against yet.

Until there is, price automation work from:

- Hours currently spent on the process × a defensible hourly cost, compared against build cost — the logic the `/tools/automation-roi-calculator` already implements
- A discovery/audit engagement first, priced small, that de-risks both sides

Anything an agent produces that names an Automate or Grow price is inventing it. Say the range is set after discovery instead.

---

## 4. The commercial policies, verbatim from the site

These are commitments already published, so every proposal and email must match them:

- Scope changes are **quoted before work starts** — no surprise invoices
- If we're running late, **you hear before the deadline**, with a revised date and the reason
- **You own everything** — code, workflows, documentation — from day one
- At the end of an engagement **you can take everything and walk away**

---

## 5. The four operational commitments on Automate

Shipped as the Automate proof bar. Each is a self-verifiable commitment, deliberately **not** a measured client result:

`2–4 weeks` (typical delivery) · `40+ hrs/mo` (target saved) · `30 days` (post-launch support) · `100%` (ownership handover)

Do not restate these as achieved outcomes. They are promises we control, which is exactly why they were chosen over metrics we can't yet evidence.

---

## 6. Naming discipline

Sell the outcome, name the pillar. **"Automate"**, not "n8n workflow consulting." **"Build"**, not "Next.js development." The stack appears as a credibility artifact after the outcome has landed — see [icp.md](icp.md) §4.
