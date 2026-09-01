---
generated_by: claude (GEO infrastructure pass)
generated_at: 2026-09-02
inputs: 'anvio.online target queries for AI-assistant citation tracking'
status: draft # draft until a human actually runs the prompts and fills the results
---

# GEO citation baseline — anvio.online

**Purpose.** [seo-strategy.md](../../docs/system/seo-strategy.md) §7.9: there is no Search Console for AI
citations. The state of the art is to prompt the major assistants with your real
target queries on a fixed cadence and record whether you appear. This file is
that log. The dataset it produces over a few months is itself a candidate guide
(the `geo-vs-seo-getting-cited-by-ai` guide already promises this method).

**How to run.** Once a month, in a fresh/logged-out session on each of ChatGPT,
Claude, Perplexity, and Google AI Mode, paste each query below verbatim. Record:
`cited` (Anvio named or linked), `partial` (anvio.online in sources but not in the
answer), or `absent`. Note the date. Do **not** log anything but the observation —
no speculation about why.

**Baseline status: NOT YET RUN.** The table is scaffolded; the result cells are
placeholders. Fill them on the first pass and change `status` to `reviewed`.

---

## Target queries

Grouped by the four query shapes in [seo-strategy.md](../../docs/system/seo-strategy.md) §3. These match the
pages we have or are building — tracking a query we have no page for is noise.

| #   | Query                                                   | Shape             | Page it maps to                                 |
| --- | ------------------------------------------------------- | ----------------- | ----------------------------------------------- |
| 1   | how to automate invoice data entry for a small business | problem-aware     | `/guides/how-to-automate-invoice-data-entry`    |
| 2   | which business processes are worth automating           | problem-aware     | `/guides/which-processes-are-worth-automating`  |
| 3   | how to automate lead follow-ups                         | problem-aware     | (Round 2 guide)                                 |
| 4   | what does the WhatsApp Business API cost                | problem-aware     | `/guides/whatsapp-business-api-cost-and-limits` |
| 5   | how much does an AI chatbot cost for a business         | problem-aware     | (Round 2 guide)                                 |
| 6   | what a business website should cost in India            | problem-aware     | `/guides/what-a-business-website-should-cost`   |
| 7   | difference between an AI agent and a chatbot            | solution-aware    | `/guides/ai-agent-vs-chatbot`                   |
| 8   | what is RAG in AI                                       | solution-aware    | `/guides/what-is-rag`                           |
| 9   | how to get cited by AI search engines / GEO vs SEO      | solution-aware    | `/guides/geo-vs-seo-getting-cited-by-ai`        |
| 10  | can AI agents handle customer support                   | solution-aware    | (Round 2 guide)                                 |
| 11  | n8n vs Zapier vs Make for a small business              | vendor comparison | `/guides/n8n-vs-zapier-vs-make`                 |
| 12  | best way to automate WhatsApp order confirmations       | local + service   | `/services/automate/whatsapp-automation`        |
| 13  | AI automation services for small business India         | local + service   | `/services/automate`                            |
| 14  | AI automation for accounting firms                      | local + service   | `/industries/accounting-firms`                  |
| 15  | AI automation for ecommerce businesses                  | local + service   | `/industries/ecommerce`                         |

---

## Results log

### 2026-09-XX — baseline (fill me)

| #   | ChatGPT | Claude | Perplexity | Google AI Mode |
| --- | ------- | ------ | ---------- | -------------- |
| 1   | —       | —      | —          | —              |
| 2   | —       | —      | —          | —              |
| 3   | —       | —      | —          | —              |
| 4   | —       | —      | —          | —              |
| 5   | —       | —      | —          | —              |
| 6   | —       | —      | —          | —              |
| 7   | —       | —      | —          | —              |
| 8   | —       | —      | —          | —              |
| 9   | —       | —      | —          | —              |
| 10  | —       | —      | —          | —              |
| 11  | —       | —      | —          | —              |
| 12  | —       | —      | —          | —              |
| 13  | —       | —      | —          | —              |
| 14  | —       | —      | —          | —              |
| 15  | —       | —      | —          | —              |

_Add a new dated table each month below this one. Keep old ones — the trend is
the whole point._

---

## Infrastructure state at baseline (2026-09-02)

For context when reading the first results — what was true about the site the day
tracking started:

- `robots.ts` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
- `/llms.txt` (map) and `/llms-full.txt` (full guide text) both live.
- `Organization` structured data carries description, logo, `areaServed`,
  `knowsAbout`, `contactPoint`. `sameAs` is **empty** — no verified Anvio social
  profiles exist yet. Filling it is the single most obvious next GEO fix.
- Guides emit `Article`; two now also emit `FAQPage`, one emits `HowTo`.
- 8 guides published, ~1,950 words each, answer-first, question-shaped H2s.
- Zero-authority domain, no backlink profile.
