# Inplicit — Critical Hypothesis Testing Sprint

**Purpose:** Identify the 5 make-or-break hypotheses, design fast falsifiable tests, and define what "confirmed" vs. "rejected" looks like. Goal is to kill bad assumptions before they become expensive commitments.

**Timeframe:** 2–4 days of focused testing  
**Method:** Scientific — each hypothesis has a null, a test design, a minimum sample, a measurement, and a decision rule.

---

## The Causal Chain

Inplicit only works if all five links hold:

```
Employees speak candidly to AI
        ↓
AI surfaces genuine non-obvious insight
        ↓
Leadership finds output decision-relevant
        ↓
Buyers commit before seeing a finished product
        ↓
Compliance path is repeatable, not bespoke per deal
```

Each hypothesis below tests one link. One broken link means the business model needs rethinking at that level.

---

## H1 — The Candor Hypothesis

**Statement:** Employees will disclose materially different information to a conversational AI voice agent than they would provide in a standard survey or manager 1:1.

**Why it's make-or-break:** The entire value proposition rests on Inplicit unlocking latent organizational knowledge. If employees give AI the same safe answers they give surveys, the product is an expensive survey. There is no insight gap to sell.

**Null hypothesis (H0):** Employees' responses to AI interviews do not differ meaningfully from their survey responses on the same topic.

**Test design:**  
Recruit 8–12 people — ideally employees at a company going through any kind of change (doesn't need to be a paying customer; a friend's company, a network contact, or even Inplicit's own team works for now). Ask each person the same three questions twice: once in a short written survey, once in a prototype voice conversation. Questions should be about a real, slightly sensitive organizational topic (e.g., "How has communication changed in your team over the last year?"). Randomize the order. Keep the AI session to 10–12 minutes.

**What to measure:**
- Specificity delta: Does the spoken answer contain more specific claims, names, examples, or criticisms than the written one?
- Sentiment delta: Is the spoken answer more positive, negative, or ambivalent than the written one?
- Surprise rate: Ask the interviewee afterward: "Did you say anything in the conversation that you wouldn't have put in the survey?" (Yes/No + why)

**Confirmed if:** ≥6 of 10 participants produce responses with meaningful specificity or sentiment delta, or self-report saying something they wouldn't write down.

**Falsified if:** Fewer than 4 participants show meaningful difference. In this case, the interview format, the question design, or the trust architecture needs fundamental rethinking before any sales motion makes sense.

**Time required:** 1 day to recruit, 1 day to run, 1 day to analyze. Rough total: 3 days.

---

## H2 — The Insight Gap Hypothesis

**Statement:** The aggregated output of AI interviews contains themes, claims, or perspectives that the commissioning leader did not already know and could not easily have obtained through existing mechanisms (surveys, management reports, town halls).

**Why it's make-or-break:** If the Knowledge Map only reflects what leadership already suspected, there is no product — just a more expensive confirmation mechanism. The buyer is paying for the delta between what they know and what's actually true. If that delta is small or zero, there is no business.

**Null hypothesis (H0):** The Knowledge Map output does not meaningfully differ from what leadership would have identified through existing listening mechanisms.

**Test design:**  
Run a mini-deployment: 5–8 interviews with people who all work in the same team or on the same project (use your own network, a friendly company, or even a simulated scenario with willing participants). Generate a rough Knowledge Map from the output. Then present it to whoever would be the "leadership" equivalent — their manager, a founder, a team lead. Ask two structured questions before they see the output: "What do you currently believe is the top concern in this group?" and "What do you think is going well?" Then show them the output. Ask: "Did you know this? Could you have gotten this from an existing mechanism?"

**What to measure:**
- Surprise rate: How many themes in the output did leadership not already know? (Count as a fraction of total themes)
- Actionability signal: Does leadership immediately start forming hypotheses or actions based on what they read? (Observe, don't ask)
- Verbal reaction in the first 30 seconds of seeing the output — note it verbatim

**Confirmed if:** ≥1 non-trivial theme surprises leadership in ≥3 of the mini-deployments tested, AND leadership demonstrates unprompted engagement with the output (asking follow-up questions, wanting to act on something).

**Falsified if:** Leadership consistently says "yes, we knew this" or shows no behavioral engagement with the output. This would suggest the interview depth or the aggregation methodology needs significant work.

**Time required:** 2 days to run interviews, half a day to synthesize, 1 hour to present and measure reactions.

---

## H3 — The Buyer Pain Hypothesis

**Statement:** Senior leaders currently managing a transformation event (merger, restructuring, strategic pivot) experience the "flying blind" problem acutely enough that they will express willingness to commit time or money before seeing a completed product.

**Why it's make-or-break:** If buyers need a polished product, a full demo, a completed case study, and six months of procurement before they engage, Inplicit cannot get early traction. The thesis requires that transformation-phase urgency shortens the sales cycle. If the pain is real and acute, buyers will lean in early. If it isn't, the category may be real but the sales motion is wrong.

**Null hypothesis (H0):** Buyers in transformation-phase organizations do not express urgency or early commitment interest when presented with the Inplicit value proposition without a demo.

**Test design:**  
Run 5 discovery conversations with people who hold decision authority (CHRO, CTO, Chief Transformation Officer, CEO of mid-size firm) at companies currently in or recently through a transformation event. Present only the problem framing — not the product. Use a version of this: *"We've been speaking with leaders running large-scale transformations. Most tell us they can see what's happening at the top and they can measure it at the bottom, but the middle of the organization — what people are actually thinking, saying to each other, doing differently from what was agreed — is largely invisible. Does that match what you experience?"* 

Then listen. Don't pitch. See what they say next.

**What to measure:**
- Lean-in rate: Do they start volunteering their own version of the problem, giving specific examples, asking "how does it work?" (yes/no)
- Urgency signal: Do they mention a timeline, a deadline, or a consequence ("we have a board review in six weeks," "we're six months in and I still don't know what's happening")
- Commitment signal: Do they ask about pricing, pilot scope, or timeline unprompted — or agree to a follow-up before the conversation ends?

**Confirmed if:** ≥3 of 5 conversations produce a lean-in + either urgency or commitment signal.

**Falsified if:** Fewer than 2 conversations produce any of these signals, or buyers consistently reframe the problem ("we do this with surveys" / "our HR team handles that"). This would suggest either the wrong buyer profile, the wrong transformation trigger, or that the pain is real but not acute enough to drive early-stage sales.

**Time required:** Outreach + 5 x 30-minute calls. Realistically 2–3 days depending on network access.

---

## H4 — The Compliance Repeatability Hypothesis

**Statement:** The GDPR + works council compliance pathway can be codified into a standard documentation package that a typical German works council and legal team will accept without requiring bespoke negotiation per deal.

**Why it's make-or-break:** If every enterprise deal in Germany — Inplicit's core target market — requires a 3–6 month works council negotiation, the sales cycle is broken and the business model doesn't work at scale. Compliance needs to be a turnkey feature, not a consulting engagement that happens before the product can be deployed.

**Null hypothesis (H0):** Works councils and HR legal teams require bespoke, deal-by-deal negotiation that cannot be meaningfully standardized.

**Test design:**  
Talk to two people: a German works council representative (ideally from a large industrial or services company) and a German employment lawyer with HR tech experience. Present the Inplicit data architecture in plain language: voice interview, no recording retained, anonymized transcript, aggregated themes, no individual identification, data processed within EU, GDPR Article 6 basis to be confirmed. Ask: "What would you need to see to sign off on something like this?" and "Is there a standard framework that already covers this, and if so, what are the gaps?"

**What to measure:**
- Blockers identified: What specific conditions would need to be met? List them.
- Standardizability: Are these conditions universal (same for every company) or idiosyncratic (depends on the company's Betriebsvereinbarung)?
- Time estimate: What does the works council rep estimate a sign-off process would take if the documentation package was complete?

**Confirmed if:** Both contacts identify the same core set of conditions (suggesting standardization is possible), AND the estimated timeline with a complete package is ≤4 weeks.

**Falsified if:** Blockers are highly company-specific, or the timeline estimate is consistently 3+ months regardless of package quality. This would mean compliance needs to become a managed service or sales partnership (with HR law firms) rather than a self-serve feature.

**Time required:** 2 conversations, plus any follow-up documentation review. 1–2 days.

---

## H5 — The Descriptive Sufficiency Hypothesis

**Statement:** Senior buyers find a themed, anonymized, verbatim-quoted insight map sufficiently actionable to justify purchase — without Inplicit providing recommendations or a roadmap.

**Why it's make-or-break:** The "descriptive not prescriptive" product stance is a principled decision and a potential competitive differentiator. But it carries risk: buyers who expect recommendations may perceive the output as incomplete, and may not pay for "just insights." If this hypothesis is false, Inplicit either needs to add a prescriptive layer or reposition the output as something that replaces a more expensive alternative (e.g., the first phase of a consulting engagement).

**Null hypothesis (H0):** Buyers who see Knowledge Map output without recommendations respond with confusion, dissatisfaction, or requests for "next steps" — suggesting the output is insufficient as a standalone product.

**Test design:**  
Create a realistic mock Knowledge Map using sanitized or fictional organizational data — 4–6 insight clusters, each with a theme name, a 2–3 sentence synthesis, and 3–4 anonymized verbatim quotes. Make it look like a real output. Show it to 5 people who would be buyers (CHRO, Head of Transformation, senior strategy lead) without any preamble about what it is. Give them 3 minutes to read it. Then ask: "What would you do with this?"

**What to measure:**
- Immediate behavioral response: Do they start annotating, discussing, forming hypotheses, or acting? (Agency signal — confirms hypothesis)
- Verbal response: Do they say "what do I do with this?" or "this is interesting but I need recommendations"? (Insufficiency signal — challenges hypothesis)
- Perceived completeness: On a 1–5 scale, how complete does this feel as a product? (Benchmark: ≥3.5 average)
- Willingness-to-pay proxy: "If you had received this from a vendor at the end of a 4-week engagement, would you feel you got value?" (Yes/No)

**Confirmed if:** ≥4 of 5 buyers demonstrate agency signal AND ≥4 of 5 answer yes to the willingness-to-pay proxy.

**Falsified if:** Majority of buyers express need for recommendations or score perceived completeness below 3. In this case, consider whether the Knowledge Map needs a "Leadership Implications" layer — not prescriptions, but structured prompts that help buyers formulate their own next steps.

**Time required:** Half a day to build the mock output, 5 x 20-minute sessions. 1–2 days total.

---

## Testing Priority Order

Run in this sequence — earlier hypotheses gate later ones:

| Priority | Hypothesis | Why First |
|----------|-----------|-----------|
| 1 | H3 — Buyer Pain | Cheapest to test, and if pain isn't acute you don't need to build anything |
| 2 | H1 — Employee Candor | Most existential; requires a prototype but reveals whether the core mechanism works |
| 3 | H5 — Descriptive Sufficiency | Can run in parallel with H1 using mock output |
| 4 | H4 — Compliance Repeatability | Only matters once you have paying intent; block removed before first deal |
| 5 | H2 — Insight Gap | Requires real interviews + real output; validates quality after mechanism is confirmed |

---

## Decision Rules

**If H3 fails:** The current ICP or transformation-moment wedge is wrong. Run a second round of discovery with a different buyer profile or trigger event before building anything further.

**If H1 fails:** The interview format, trust architecture, or question design is broken. Do not proceed to sales until this is fixed. The product doesn't work yet.

**If H5 fails:** Add a structured "so what" layer to the Knowledge Map — not recommendations, but leadership reflection prompts tied to each insight cluster. Retest before selling.

**If H4 fails:** Partner with a German employment law firm to create a pre-certified compliance package. Make it a named feature of the enterprise offering.

**If H2 fails:** The aggregation methodology needs improvement. Investigate whether the interview questions are too shallow, the synthesis is too generic, or the output format is hiding real signal. Do not sell until this is resolved.
