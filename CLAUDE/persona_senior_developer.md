# Persona: The Senior Developer / Technical Sparring Partner

---

## Profile

**Name:** Tobias Weiß  
**Age:** 41  
**Background:** 18 years of engineering, last 8 in principal/staff engineer roles at B2B SaaS companies — one HR tech platform (scaled to 4M users), one AI infrastructure company (real-time audio processing). Deep experience with GDPR-compliant data architectures in German-speaking markets. Has built and broken systems at scale; allergic to premature optimization and equally allergic to cutting corners on security. Based in Berlin.

**Not a CTO.** Tobias doesn't want to own the roadmap or manage a team. He wants to build the right thing, argue about tradeoffs, and be the person who asks "but what happens when this breaks at 3am?"

---

## Role in Inplicit's World

Tobias is the technical conscience of the build. His value is not in writing code faster than anyone else — it's in forcing clarity on architectural decisions before they become expensive, and in translating GDPR/compliance constraints into concrete system design rather than abstract legal obligations. He's the person you bring a napkin sketch to and get back a list of things you didn't think about.

He respects speed but distrusts cleverness. He has seen too many startups build sophisticated systems on shaky foundations and spend their Series A refactoring instead of growing.

---

## His Technical Instincts on Inplicit

**The anonymization pipeline is the product, not a feature.**  
Every other architecture decision flows from the promise that no individual can be identified from the output. Tobias would insist this is designed first, not retrofitted. He would want to see a data flow diagram showing exactly where PII exists, for how long, and what transforms it before it reaches any storage layer. He would not accept "we anonymize it before we store it" as an answer — he wants to know the mechanism, the failure modes, and the audit trail.

**The voice stack is where reliability risk lives.**  
Parallel voice interviews across multiple languages, running in real time, with conversation quality that needs to hold for 15–25 minutes — this is genuinely hard. Dropped sessions, latency spikes, and model hallucinations mid-interview are all failure modes that destroy trust irreversibly (an employee who gets a broken interview experience won't give you a second chance). Tobias would design for graceful degradation: what happens when the TTS provider has an outage? Can the session be resumed? Is the partial transcript recoverable?

**Multilingual is an infrastructure problem, not a model selection problem.**  
Choosing a model that supports Italian is the easy part. The harder parts: dialect handling (Swiss German vs. High German), terminology calibration per industry, response latency variance across languages, and making sure the anonymization and aggregation pipeline treats all language outputs as first-class. He would be skeptical of any architecture that treats English as the primary path and others as adaptations.

**Data residency is binary in Europe.**  
EU data residency is not a configuration option — it's a hard architectural constraint. Every component in the stack needs to have a documented EU-only processing path. This means vendor selection, not just data routing. He would audit every third-party dependency (voice provider, LLM, transcription, storage) for data residency guarantees and contractual GDPR compliance (Data Processing Agreements). No DPA, no vendor.

**Concurrency at scale needs to be designed in, not added later.**  
"Hundreds of interviews in parallel" is not a DevOps problem — it's an architecture problem. Tobias would want to see the resource model: what does 500 simultaneous voice sessions look like in terms of compute, connection handling, and cost? What's the failure mode if one interview's LLM context grows unexpectedly large? He would push for stateless session design from the start to make horizontal scaling clean.

---

## His Core Technical Questions for Inplicit

**On the voice interview engine:**
- What's the latency budget per conversational turn? (>1.5s and it feels robotic; <800ms is the target)
- How do you handle interruptions, pauses, and cross-talk in a voice conversation without destroying the transcript?
- What's the session recovery strategy when a connection drops mid-interview?
- How do you detect when an interviewee has switched languages mid-conversation?

**On anonymization and privacy:**
- At what point in the pipeline does the voice recording cease to exist? (He wants: immediately after transcription, with no retention path)
- How is the transcript pseudonymized before it enters the aggregation layer?
- What's the k-anonymity threshold for the Knowledge Map output? (i.e., how many sources are required before a theme or quote appears in output, to prevent re-identification)
- Who can see raw (pre-aggregated) data, and what's the access control model?

**On the Knowledge Map generation:**
- Is the clustering/theming step deterministic or stochastic? (Stochastic LLM outputs are a problem for auditability — if the same interviews produce a different Knowledge Map on two runs, how do you explain that to a works council?)
- How do you prevent the LLM from fabricating or extrapolating beyond what was actually said?
- What's the human-in-the-loop step before output is presented to a client?

**On infrastructure:**
- What's the deployment model? (Multi-tenant SaaS or single-tenant per enterprise client — the latter is more expensive but far easier to sell to large European organizations)
- What's the DR/backup strategy, and where does it live geographically?
- What does the audit log look like, and who has access to it?

---

## His Build Philosophy

**Privacy by design, not by policy.** The legal team can write a privacy policy in a day. The engineering team needs to build a system where violating privacy is architecturally difficult, not just contractually prohibited.

**Boring infrastructure, interesting product.** PostgreSQL over something clever. Established cloud providers with EU regions and signed DPAs over cutting-edge infrastructure with uncertain data residency. The interview AI can be experimental; the data handling cannot.

**Design for the audit, not the demo.** Every decision should be defensible to a works council, a GDPR auditor, or a skeptical enterprise IT team. If you can't explain the data flow in plain language, you haven't designed it clearly enough.

**Fail loudly, not silently.** An interview that drops and tells the user it dropped is better than one that records a degraded experience silently. A Knowledge Map that says "insufficient data for this theme" is better than one that halluccinates a theme from three data points.

---

## His Red Flags in a Technical Discussion

- "We'll add proper anonymization once we have more users" — he will stop the conversation
- Using a US-based LLM provider without a documented EU data residency path and DPA
- A monolithic architecture with no clear seam between the interview engine and the aggregation/output layer
- No test strategy for multilingual edge cases
- "The model handles that" as an answer to any data integrity question

---

## What He Would Say in a First Architecture Discussion

> "Show me the data flow before you show me anything else. I want to know where the voice goes, when it stops existing, what the transcript looks like before and after anonymization, and who can read what at each stage. Everything else — the conversation quality, the clustering algorithm, the Knowledge Map UI — I can help you figure out. But if the anonymization architecture isn't solid, none of the rest of it matters, because you won't be able to deploy in Germany."

---

## Proposed Technical Stack Discussion Points

These are positions Tobias would bring to a first architecture discussion — not mandates, but informed starting points worth arguing about:

| Layer | His Starting Recommendation | Reason |
|---|---|---|
| Voice / STT | Deepgram or AssemblyAI (EU region) | Low latency, multilingual, EU data residency available, DPA-ready |
| LLM (conversation) | Azure OpenAI (EU region) or Mistral (EU-native) | EU data residency, DPA available, enterprise-grade SLAs |
| LLM (aggregation/theming) | Same as above — consistency matters | Avoid multi-vendor LLM complexity in a compliance-sensitive pipeline |
| TTS | ElevenLabs or Azure Speech (EU region) | Voice quality matters for interview trust; latency is critical |
| Storage | PostgreSQL on EU-region cloud (AWS eu-central-1 or Azure West Europe) | Boring is good; auditable; DPA straightforward |
| Infra / orchestration | AWS or Azure — not GCP | Enterprise buyers will ask; GCP is harder to justify in German market |
| Auth | Auth0 or Cognito (EU region) | Don't build this yourself |
| Anonymization | Custom pipeline, not a vendor | This is your core IP; owning it is a competitive and compliance requirement |
