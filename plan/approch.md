# IDBI Innovate 2026 — AI-Powered Digital Wealth Advisor (Avatar-Based)

## 1. Problem Recap
Wealth management at IDBI is fragmented and inaccessible to the majority of retail customers. The bank lacks a unified view of each customer's **investment behaviour + spending habits**, so advice today is generic, reactive, and delivered through channels most customers never touch (RM calls, branch visits, PDFs).

## 2. Our Solution — "Arya", the AI Wealth Avatar
A **conversational, avatar-driven wealth advisor** embedded as a new module inside the existing IDBI mobile banking app. Customers see a friendly 3D/2D avatar that:

**The easy way to explain Arya (elevator pitch):** *Think of it as a CRED-style consolidated view of every rupee you own — your IDBI balance, credit cards, mutual funds, stocks from Groww/Zerodha, PF, NPS — but with a real advisor sitting inside your bank, watching your money and telling you what to do next in plain language.*

1. **Understands** their full financial picture (accounts, cards, loans, investments, spends, goals, PF, NPS, and external broker holdings from Groww/Zerodha).
2. **Analyses** behaviour with ML models (risk profile, cash-flow, goal gap, portfolio drift).
3. **Advises** in plain language via **chat + visuals** — "Here's what I noticed, here's what I suggest, here's the one-tap action." *(Voice/talk-to-Arya is a planned v2 enhancement — see Section 14.)*
4. **Acts** — executes the recommendation through existing bank rails (SIP start, FD booking, MF switch, insurance quote, goal creation) with the customer's consent.

Tagline: **"Your personal wealth manager, inside your bank app."**

> **Prototype platform note:** The hackathon prototype is being built as a **web application** (React on browser) for speed of build, judge accessibility (open on any device via URL), and demo stability. The **exact same experience ports to the mobile app for production v1** — same backend, same agents, same ML models; only the UI layer swaps from React web to React Native mobile. See §5 for the two-phase delivery plan.

## 3. Market Context & Competitive Landscape
Wealth-tech in India is crowded, but every current offering is a **product catalog with dashboards** — none is a true *advisor*.

| Player | What they do well | What's missing |
|---|---|---|
| **HDFC SmartWealth** | DIY MF/FD/insurance, SmartJars (goal buckets), CAS import, rule-based rebalancing, 5-tier risk profile, 9-language UI, DigiPassBook (AA-based multi-bank view) | No conversational AI, no avatar, no proactive/behavioural nudges, no spend analysis, purely reactive — user has to know what to ask |
| **ICICI iWealth / SBI YONO Invest** | Broad product shelf inside bank app | Same limitations — static screens, no personalisation beyond risk score |
| **Zerodha Coin / Groww / Kuvera** | Fast DIY MF investing, low friction | No banking integration, no unified net-worth, no advisory, no spending data |
| **INDmoney / Jar** | Aggregated net-worth + auto-invest | Standalone apps — most users never onboard; no bank-grade trust |
| **Traditional RM / Wealth Managers** | Genuine advice | Only serve HNI (₹50L+); cost-to-serve too high for retail |

**The gap:** No one has combined (a) bank-integrated data, (b) conversational AI, (c) proactive behavioural coaching, and (d) a true whole-of-wallet view (IDBI + external brokers + PF + NPS + credit cards) into a single retail-scale product. That's exactly where IDBI can leap-frog.

### 3.1 What the industry is heading toward (EY, Oct 2023)
- Wealth-management executives rank **"alpha generation + financial advice"** as the #1 GenAI use case.
- Firms are re-imagining the **advisor desktop** with GenAI — next-best-action, meeting prep, life-event tracking.
- Winners will move from "GenAI pilots" to **enterprise-scale, avatar-mediated client engagement**.
- Regulators expect **explainability, guardrails, audit trails** (SR 11-7-style model risk management adapted for LLMs).

Our proposal turns the "GenAI-powered advisor desktop" concept **upside down** — instead of arming the RM, we put the advisor *directly in the customer's pocket* through an avatar. Same intelligence, 100× the reach, 1/10th the cost.

### 3.2 Academic & industry evidence backing the approach
Peer-reviewed research (Challoumis, *AI in Wealth Management*, XVI Int'l Scientific Conference, Philadelphia, Oct 2024) and public deployments confirm three things Arya is built on:

- **Personalisation drives outcomes.** AI-tailored plans that ingest spending, income and life-events measurably beat one-size-fits-all advice — the study frames this as a "reactive → proactive" paradigm shift, which is exactly Arya's nudge engine.
- **Robo-advice scales fast when trust exists.** Global robo-advisory AUM grew by **~$400B (2018→2023)** across 20M+ users — but the winners paired algorithms with a trusted institution (bank/broker), not standalone startups. IDBI's brand is the moat; Arya is the interface.
- **Proven bank-embedded case studies:**
  - **BoA Erica** — AI assistant, **8M+ requests handled**, +25% engagement lift → validates the *conversational-in-app* thesis.
  - **JPMorgan COiN** — document/contract intelligence, ~$9M/yr savings → validates AI's cost-to-serve wedge in financial ops.
  - **Wealthfront** — algorithmic portfolio management, **~3% p.a. portfolio uplift** from disciplined rebalancing → validates the "portfolio doctor" agent.
  - **Klarna AI Assistant (2024–26)** — handles ~2/3 of customer service; **replaced ~700 human agents** in one year; ~100M users; **applied for a US banking licence (July 2026)** → validates AI at retail-bank scale and shows the fintech-becomes-bank arc (mirror-image of our bank-becomes-fintech play).
  - **Revolut AIR (2025)** — conversational AI assistant embedded in the bank app at **75M+ user scale** → closest live analogue to Arya's positioning.
  - **HSBC + Google Cloud (2026)** — enterprise AI banking partnership for wealth infrastructure → signals major-bank commitment to LLM-grade advisor stack.
  - **CommBank + OpenAI (2025)** — SMB financial-literacy AI programme → the advisor-as-teacher pattern Arya adopts via its "Why?" explainability and Credit Coach agent.
- **Regional adoption pattern favours India.** The paper flags Asia (China + India) as the fastest AI-in-wealth adopter thanks to high mobile penetration and supportive regulators — Arya rides this wave with multilingual chat as the accelerant (vernacular voice added in v2).
- **The industry's known failure modes are ours to avoid by design.** Documented AI-wealth failures trace to (a) weak data governance, (b) advisor–tech misalignment, (c) unaddressed algorithmic bias. Sections 9 and 15 explicitly design against each — private-endpoint LLM, human-review queue, fairness testing across income/geography/gender, and full audit trail per recommendation.

## 4. Key Differentiators & USP
| # | Feature | Why it wins vs HDFC SmartWealth / peers |
|---|---------|-----------------------------------------|
| 1 | **Avatar-first conversational UX** (expressive 3D/2D avatar, chat-based) | SmartWealth is a menu-driven DIY app; ours *converses*. Breaks the app-fatigue barrier for tier-2/3 & first-time investors |
| 2 | **Behavioural + investment AI in one brain** | Peers analyse investments *or* spending — never both. We fuse spend patterns, cash-flow, life events, and holdings for truly personalised advice |
| 3 | **Proactive, not reactive** | SmartWealth waits for the user to open the app. Arya *reaches out*: "I noticed your salary hike — want to raise your SIP?" |
| 4 | **Zero-context-switch — inside IDBI mobile app** | Reuses existing SSO / mPIN / UPI. No new app, no new KYC. HDFC SmartWealth is a *separate* app — high drop-off |
| 5 | **Explainable AI with cited reasoning** — every suggestion carries "Why?" tap-through with source citations (RBI rate, SEBI rule, product-doc line) | Meets SEBI advisory norms, builds trust that a black-box robo can't; steals the Perplexity-style cited-answer pattern |
| 6 | **Action-in-one-tap** | Advice → transaction in the same screen. No dead-end PDFs, no "please call your RM" |
| 7 | **Multilingual chat** — Hindi, English + **7 regional languages at launch** (Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati, Punjabi) | Parity with HDFC SmartWealth's 9-language coverage tier; vernacular text UX for the next 300M Indian bank users; voice added in v2 |
| 8 | **Emotional intelligence** | Avatar tone adapts — celebratory on goal hit, cautious on overspend. This is the "human" layer no fintech has |
| 9 | **True Customer 360 via Account Aggregator** | Same AA rails HDFC uses for DigiPassBook, but combined with AI reasoning → whole-of-wallet insight including external brokers, PF, NPS |
| 10 | **Democratises HNI-grade advice** | What a private banker does for ₹5Cr customers, Arya does for a ₹50K saver — at zero marginal cost |
| 11 | **"Can I afford this?" conversational coach** | User asks "Can I buy an iPhone?" — Arya analyses goals, budget, purpose, and gives a contextual yes/no with alternatives. No app does this today |
| 12 | **In-v1 Tax Intelligence** | 80C tracker, old vs new regime picker, NPS 80CCD(1B) gap, capital-gains alerts — most apps defer this to a later version; we ship it at launch |
| 13 | **Money Jars — visual goal buckets** | Every goal (Home 2032, Kids' Ed 2035, Emergency Fund) is a visual "jar" that fills as user contributes. Direct parity with HDFC SmartJars — but wired to Arya's AI so the jar itself recommends the SIP amount, revises on salary changes, and celebrates milestones |
| 14 | **Bill Negotiator agent (new)** — actively cuts credit-card interest, insurance premiums, personal-loan rates | Steals the Rocket Money bill-negotiation pattern, wired through IDBI's own product catalog. No Indian wealth app does this; direct hit on the customer's biggest pain (recurring bill bleed) |
| 15 | **Credit Coach agent (new)** — CIBIL score explainer + top-drag visualisation + micro-actions to boost score | India's #1 requested-but-underserved need. Explains why the score is what it is, prescribes 3 micro-actions (autopay setup, utilisation cap, dispute prompts). Rent-to-CIBIL reporting a v1.5 aspiration |
| 16 | **Persistent Memory — Arya remembers you** | Recalls past anxieties, wins, life events across sessions ("You were nervous about SIP timing last year — you stayed the course and gained 18%"). Steals the Replika memory pattern, safely — no gamification |

**One-line USP:** *"Every IDBI customer gets a personal wealth manager — with a face, in their language, with access to every rupee they own — inside the app they already use."*

## 4. Solution Architecture (High Level)

```
┌────────────────────────────────────────────────────────────────────┐
│                    IDBI Mobile App (existing)                      │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │   Wealth Module (NEW) — React Native / Native SDK        │    │
│   │   • Avatar Renderer  (Unity / Ready Player Me / Lottie)  │    │
│   │   • Chat UI  (multilingual text; voice in v2)            │    │
│   │   • Insight Cards, Goal Tracker, Action Sheets           │    │
│   └──────────────────────────────────────────────────────────┘    │
└─────────────────────────┬──────────────────────────────────────────┘
                          │  HTTPS + OAuth2 (bank SSO)
                          ▼
┌────────────────────────────────────────────────────────────────────┐
│              Wealth Advisor Backend (new microservices)            │
│                                                                    │
│   ┌───────────────┐  ┌───────────────┐  ┌────────────────────┐    │
│   │ Orchestrator  │→ │ AI Advisor    │→ │ Action Executor    │    │
│   │  (LangGraph)  │  │  (LLM + RAG)  │  │  (MF/SIP/FD/Ins)   │    │
│   └───────┬───────┘  └───────┬───────┘  └─────────┬──────────┘    │
│           │                  │                    │               │
│   ┌───────▼──────────────────▼────────────────────▼──────────┐   │
│   │              Analytics & ML Layer                        │   │
│   │  • Spend Categorizer   • Risk Profiler                   │   │
│   │  • Goal Gap Model      • Portfolio Optimizer             │   │
│   │  • Anomaly / Nudge Engine                                │   │
│   └───────┬──────────────────────────────────────────────────┘   │
│           │                                                       │
│   ┌───────▼──────────────────────────────────────────────────┐   │
│   │      Unified Customer 360 Data Store (feature store)     │   │
│   └──────────────────────────────────────────────────────────┘   │
└─────────────────────────┬──────────────────────────────────────────┘
                          │  Bank Sandbox APIs (to be provided)
                          ▼
┌────────────────────────────────────────────────────────────────────┐
│  Core Bank Systems: CBS, Cards, UPI, MF Platform, Demat, Insurance │
└────────────────────────────────────────────────────────────────────┘
```

## 5. Delivery Strategy — Prototype (Web) → Production (Mobile)
The bank's app already exists — we do **not** rebuild it. Delivery happens in two phases so we can demo fast now and ship inside the IDBI mobile app later:

- **Phase A — Prototype (hackathon / shortlist demo): Web application.** Standalone React web app served from a secure origin. Fastest to build, easiest for judges/PMs/compliance to open via URL on any device, and lets us demo all 5 hero flows end-to-end without waiting on the bank's mobile-app release train.
- **Phase B — Production v1: Mobile module inside the IDBI app.** Ship as a **React Native module / Android+iOS SDK** the bank drops into their existing app. Single entry point: `IDBIWealth.launch(customerToken)`. **Backend, agents, ML models, and business logic are unchanged from Phase A** — only the UI layer swaps from React web to React Native mobile.
- **Bridge option (if mobile port slips):** Wrap the same web app as a **WebView micro-app** inside the mobile app, with a JS bridge for native actions (biometric auth, deep-link to payment). Zero rework.
- **Auth:** Reuse bank's existing SSO / mPIN — we accept a short-lived customer token from the host app, no re-login.
- **Data:** Consume bank's **Sandbox APIs** (to be shared) — accounts, transactions, holdings, KYC, product catalog.
- **Actions:** Every "Invest / Book / Switch" call goes back through the bank's own transaction APIs → no new regulatory surface.

## 6. The AI Avatar — What It Actually Does
The avatar is not a gimmick; it is the **face of a multi-agent AI system**.

### 6.1 Perception (what Arya sees about the user)
- Last 12 months of transactions → categorised spends (IDBI account + credit cards)
- Current holdings (FD, MF, equity, insurance, loans) — IDBI + external (Groww, Zerodha via AA)
- Salary/income pattern — primary salary + other income sources (freelance, rent, dividends) auto-detected and tagged
- Credit card spends — category-wise breakdown (dining, travel, shopping, subscriptions, EMIs), utilisation ratio
- PF balance + NPS corpus — pulled via AA (EPFO + PFRDA data)
- Declared goals: long-term (retirement, child education, home) + near-term major purchases (car, gadget, vacation)
- Risk profile (from questionnaire + inferred from actual behaviour)
- Life events (detected: salary hike, new loan, big spend spike, broker debit = investment tagged)

### 6.2 Reasoning (LLM + specialist ML models)
An **orchestrator agent** (LangGraph-style) routes questions to specialist tools:
| Agent / Model | Job |
|---|---|
| Spend Analyzer | "Where is your money going?" — categorisation, month-on-month deltas, credit card spend breakdown, subscription creep detection |
| Income Intelligence | Detects salary pattern, tags other income sources (freelance, rent, dividends), computes true savings rate, triggers SIP step-up nudge on salary hike |
| Risk Profiler | Blends questionnaire + behaviour to score 1–10 |
| Goal Planner | Given goal + horizon + risk, computes required SIP; handles both long-term goals and near-term major purchases |
| Portfolio Doctor | Checks drift, overlap, underperformers, tax-loss harvesting across IDBI + external broker holdings + demat |
| Retirement Planner | Aggregates PF + NPS + MF + FD into total retirement corpus; projects gap; suggests NPS top-up for 80CCD(1B) |
| Purchase Advisor | "Can I afford this?" — analyses emergency fund, goal progress, monthly budget, purchase purpose (work/personal/content creation), suggests alternatives and optimal payment method |
| Stock Advisor | Tracks individual stock performance vs benchmark; flags concentration risk, profit-booking opportunities, tax-loss harvesting; all suggestions non-discretionary with SEBI disclaimers |
| Tax Optimizer | 80C tracker (PF + ELSS + LIC auto-counted), 80D, 80CCD(1B) NPS gap, old vs new regime picker, capital-gains alerts before sell, HRA optimisation, advance-tax reminders for non-salaried |
| Product Recommender | Picks from bank's approved MF/FD/insurance catalog (RAG over product docs) |
| Nudge Engine | Detects idle savings, missed SIP, high-interest debt, low emergency fund, SIP step-up opportunity, subscription creep, credit utilisation >30% |
| Bill Negotiator | Actively renegotiates recurring bills — credit-card interest rate reduction, insurance premium re-shop at renewal, personal-loan rate optimisation, EMI restructuring. Uses bank backend APIs + IDBI-approved product catalog; every change customer-approved. (Steals the Rocket Money concierge pattern.) |
| Credit Coach | CIBIL score explainer + top-drag visualisation ("utilisation is 72% vs healthy 30%") + micro-actions to boost score (utilisation cap alerts, dispute prompts, autopay setup, 12-month payment history reminders). Rent-to-CIBIL reporting is a v1.5 aspiration pending CIBIL/CRIF partnership. |
| Compliance Guardrail | Ensures every suggestion carries SEBI-compliant disclaimers, no guaranteed returns |

### 6.3 Delivery (how Arya communicates)
- **Chat + visual** — text conversation paired with insight cards, charts, and animated avatar expressions *(voice/TTS is a v2 enhancement — see Section 14)*
- **Multilingual** — Hindi, English, plus **7 regional languages at launch** (Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati, Punjabi) — all in text; parity with HDFC SmartWealth's 9-language tier
- **Empathy layer** — avatar expression + tone-of-message adapts (celebratory on goal hit, cautious on overspend)
- **Explainability with cited sources** — every insight has a "Why do you say this?" tap-through that shows a reasoning tree with source citations (RBI rate, SEBI rule, product-doc line) — Perplexity-style
- **Persistent memory** — Arya remembers past goals, anxieties, wins, and communication preferences across sessions ("You were nervous about SIP timing last year — you stayed the course and gained 18%"). Long-context recall, safely — no gamification, no badges

### 6.4 Action (one tap, done)
| Insight | One-tap action |
|---|---|
| "Your savings account has ₹4.2L idle" | → Sweep to FD @7.1% |
| "You'll fall short of your child's education goal by ₹8L" | → Increase SIP by ₹3,500 |
| "Your equity MF overlaps 78% with your index fund" | → Switch suggestion |
| "You spent 42% more on dining this month" | → Set a category budget |
| "Emergency fund covers only 1.2 months" | → Start a liquid-fund SIP |
| "Your salary grew 15% — ₹2K SIP increase adds ₹18L to retirement" | → Step up SIP |
| "Stock X is up 45% in 6 months — consider partial profit booking" | → Review & sell (broker deep-link) |
| "You're ₹28K short of 80C limit — 2 months left" | → Start ELSS SIP |
| "Can I buy an iPhone?" → Arya: "Yes, in 2 months. Here's why + alternatives" | → Set savings goal or EMI plan |
| "Your Groww SIP debit detected — tagged as Investment" | → View consolidated portfolio |
| "Your credit-card interest rate is 42% p.a. — 3 alternatives cost 24%" | → Switch card or negotiate rate (Bill Negotiator) |
| "Your CIBIL is 720 — one late payment last quarter cost you 40 pts" | → Dispute + set autopay to recover in 90 days (Credit Coach) |
| "You spend ₹4,800/mo on 11 subscriptions — 3 are unused" | → Cancel unused subs, save ₹1,400/mo (Subscription Audit) |
| "Health insurance premium up 18% at renewal — same cover ₹8K cheaper elsewhere" | → Compare 3 IDBI-listed alternatives (Bill Negotiator) |
| "You have ₹8K surplus most month-ends" | → Auto round-up to Liquid Fund earning 6.5% (Autopilot Savings) |

## 7. Data & AI/ML Approach
- **Sandbox data (bank-provided)** → ingested into a **feature store** (offline: Snowflake/BigQuery; online: Redis).
- **External data via Account Aggregator (AA):**
  - Groww / Zerodha holdings → pulled as AA-registered FIPs; debits to broker accounts auto-tagged as "Investment".
  - EPFO (PF balance + statement) + PFRDA (NPS corpus) → via AA consent flow.
  - Credit card statements (all issuers) → spend categorisation + utilisation tracking.
- **Models:**
  - Transaction categorisation: fine-tuned transformer (or off-the-shelf + rules for hackathon).
  - Income detection: rule-based pattern matcher (regular large credits → salary; irregular credits → other income) + user confirmation loop.
  - Risk profiling: gradient-boosted classifier + rule overlay.
  - Goal projection: Monte-Carlo simulation on historical MF NAVs.
  - Portfolio optimisation: mean-variance / risk-parity with bank-catalog constraints; extended to cover external demat holdings.
  - Purchase affordability model: rule engine over emergency fund status + goal gap + monthly surplus + purpose weight.
  - Stock signal model: momentum + benchmark comparison + concentration risk rules (non-discretionary, SEBI-compliant).
  - Tax optimisation: deterministic rule engine over 80C/80D/80CCD/capital-gains/HRA inputs — no LLM for numbers.
  - Advisor conversation: LLM (GPT-4o / Llama-3-70B / Gemini) with **RAG** over bank product catalog + SEBI advisory rules.
- **Guardrails:** PII redaction before LLM calls, response validator (no guaranteed returns, no unregistered products), full audit log of every recommendation.
- **Privacy:** All PII stays inside bank VPC; LLM can be hosted on bank cloud or via a private endpoint (Azure OpenAI / on-prem Llama).

## 8. Proposed Tech Stack
| Layer | Choice | Rationale |
|---|---|---|
| UI — Prototype | **React (web app, browser-based)** | Fastest to build & demo; judges open via URL on any device; same component tree as mobile |
| UI — Production v1 | React Native + native bridges | One codebase iOS + Android, drops into IDBI's existing mobile app as an SDK module |
| Avatar | Ready Player Me + Rive/Lottie (2D fallback) | Fast, low bandwidth, works on mid-tier phones |
| Conversation UI | Chat-first (multilingual text) | Ships fast, works on low-bandwidth devices, no mic-permission friction. Voice (Azure Speech / Google Indic STT+TTS) added in v2 |
| Backend | Python (FastAPI) + LangGraph orchestrator | Fast to prototype, agent-friendly |
| LLM | Private-hosted Llama-3 / Azure OpenAI | Data residency + cost |
| ML | scikit-learn, XGBoost, PyTorch | Standard, explainable |
| Data | PostgreSQL + Redis + object store; Snowflake for analytics | Standard bank-friendly stack |
| Voice (v2) | ElevenLabs / OpenAI Voice Agents API (Indic voices) | Hyper-natural regional-language voice for hands-free ambient mode |
| Video avatar (v2) | HeyGen / Synthesia | On-demand explainer videos in 7 regional languages, generated on-the-fly |
| Infra | Kubernetes on bank cloud, API gateway, WAF | Bank-grade security |
| Observability | OpenTelemetry + audit log DB | Regulatory traceability |

## 9. Security, Compliance & Trust
- **RBI/SEBI:** All advice is **non-discretionary** — customer must confirm every action. Disclaimers auto-appended.
- **DPDP Act:** Explicit consent screen at first launch; data-use dashboard for the customer.
- **Auth:** Bank's existing SSO; step-up biometric for any transaction.
- **AI safety:** Prompt-injection filter, output validator, human-review queue for edge cases.
- **Audit:** Every recommendation stored with model version, inputs, and output — replayable for regulator.

## 10. Two-Phase Delivery Plan
### Phase 1 — Hackathon Submission (PPT stage — current)
Deliverables:
- Problem & customer insight
- Solution concept + avatar mockups
- Architecture diagram (this doc's Section 4)
- Key screens (wireframes / Figma)
- AI/ML approach + sample insights
- Business impact (see Section 11)
- Roadmap

### Phase 2 — Prototype (if shortlisted)
Once bank sandbox is provided:
1. Connect to sandbox APIs + AA consent flow, ingest sample customer data (IDBI + simulated Groww/Zerodha/EPFO/NPS).
2. Build **web prototype** (React on browser) with 5 hero flows *(the same UI layer will be ported to React Native for the mobile v1 build post-pilot — backend, agents & models remain identical)*:
   - **Flow A:** "Show me my money" — consolidated net-worth (IDBI + external) + spend insight
   - **Flow B:** "Am I on track?" — goal gap + one-tap SIP boost
   - **Flow C:** "Fix my portfolio" — drift + switch suggestion + stock signals
   - **Flow D:** "Can I afford this?" — purchase advisor chat demo
   - **Flow E:** "Save on taxes" — 80C tracker + regime picker
3. Wire avatar + multilingual chat UI in the web app.
4. Deploy the web app on bank cloud sandbox with a shareable demo URL; demo end-to-end.

*(Voice/STT+TTS layer is deliberately deferred to v2 — see Section 14 — to keep prototype scope tight and demo-stable. Mobile-app port to React Native happens after the web prototype is validated in the pilot.)*

## 11. Use Cases & Customer Personas
Real scenarios showing how Arya replaces confusion with action.

### Persona 1 — Priya, 28, IT professional, Bengaluru (₹1.2L/month salary)
- **Situation:** Salary account has ₹6L sitting idle; has a Groww SIP she set up herself; no clue about tax saving; wants to buy an iPhone 16 Pro.
- **What Arya does:** Detects idle balance → suggests sweep-FD + liquid MF. Pulls Groww holdings via AA → shows consolidated portfolio. Notices no ELSS → flags ₹46,800 tax savings opportunity. When Priya asks "Can I buy an iPhone?", Arya checks her emergency fund (OK), goal progress (on track), monthly surplus (₹18K), and — critically — asks about *purpose* before answering (see purpose-weighted branch below). Builds a "Dream Home 2032" goal with a ₹15K SIP plan.
- **Outcome:** ₹6L earning 7% instead of 3%; ₹46,800 tax saved; goal-linked investing started; informed purchase decision made.

**The "Can I buy this?" moment — same question, 3 different Arya answers (this is our single most demo-worthy differentiator):**

Priya asks: *"Arya, can I buy the iPhone 16 Pro (₹1.35L)?"*  
Arya asks back: *"Sure — quick question, what will you use it mostly for?"*

| If Priya answers... | Arya's response |
|---|---|
| *"I'm a content creator — I shoot Reels + YouTube on the side"* | *"Then yes — the Pro's camera pays for itself if you monetise. Split it: ₹80K on your IDBI card (6-month no-cost EMI) + ₹55K from savings. Keeps your Home-goal SIP untouched. Book it."* |
| *"Just personal use — WhatsApp, photos, banking"* | *"The iPhone 15 (₹65K) or 16-base (₹79K) gives you the same experience for that. The ₹56K you'd save becomes ₹1.8L in 10 years at 12%. Want me to route the difference to your Home-goal SIP?"* |
| *"My old phone broke, I need one urgently"* | *"Understood — but ₹1.35L in one shot cuts your emergency fund from 4 months to 2. Two options: (a) iPhone 15 refurbished at ₹52K, keeps your buffer intact; or (b) iPhone 16 Pro on 12-month 0% EMI via your IDBI card — ₹11,250/mo, fits your surplus, no lump-sum hit."* |

*This is what "AI wealth advisor" actually means — not a chatbot that answers, but an advisor that asks the right question first, then does the math. No fintech, RM, or robo-advisor does this today.*

### Persona 2 — Ramesh, 45, small-business owner, Nashik
- **Situation:** Uneven income, big lump-sum deposits, no retirement plan, high-interest business loan.
- **What Arya does:** Analyses cash-flow volatility → recommends 6-month emergency fund in liquid fund first. Flags that pre-paying loan (12% interest) beats new equity investment. Sets up an auto-invest STP for lumpy months.
- **Outcome:** Debt cleared 2 years early; retirement corpus started; volatility-aware plan.

### Persona 3 — Meera, 58, homemaker, Chennai (Tamil-first, low digital literacy)
- **Situation:** Husband handles all money; recently widowed; ₹80L insurance payout sitting in savings account.
- **What Arya does:** Chats in Tamil with large-font text, simple visual analogies (jars, ladders, pie-charts) and the avatar guiding step-by-step. Recommends conservative allocation — senior citizen FD ladder + debt MF + small equity component. Every action requires an explicit tap-to-confirm. *(v2: same conversation via voice for zero-typing UX.)*
- **Outcome:** Money starts earning safely; Meera feels in control without needing a middleman.

### Persona 4 — Arjun, 35, mid-career manager, Pune (existing IDBI customer, has RM)
- **Situation:** Portfolio drift — 78% overlap between two equity MFs; SIPs on autopilot for 4 years, never reviewed.
- **What Arya does:** Runs portfolio doctor → shows overlap + underperformance vs benchmark. Recommends switch (same AMC, no exit load). Projects goal-gap for kids' education.
- **Outcome:** Portfolio rebalanced in 3 taps; RM freed up for genuinely HNI work.

### Persona 5 — Karan, 22, first-time earner, Lucknow (tier-2 city, gig worker)
- **Situation:** Just opened an IDBI account; no financial vocabulary; scrolls Instagram reels for "money tips"; has a Zerodha account with 3 stocks.
- **What Arya does:** Onboards conversationally in Hindi. Pulls Zerodha holdings via AA → shows true net-worth. Starts with ₹500 SIP + auto-round-up on UPI spends. Gamifies goals ("Bike in 2 years"). Flags one stock that's up 60% and concentrated at 40% of portfolio → "Consider booking some profit — here's why in simple terms." Teaches through 30-second avatar explainers.
- **Outcome:** Financial habit formed at 22 — 40 years of compounding unlocked; first informed sell decision made.

### Persona 6 — Vikram, 38, salaried manager + freelancer, Mumbai
- **Situation:** Has a salary + irregular freelance income; PF auto-deducted but never checked; no NPS; pays high taxes every year.
- **What Arya does:** Detects two income streams from transaction pattern → tags salary + freelance separately → computes true savings rate. Pulls EPFO balance via AA → shows PF corpus. Flags: "You're missing ₹50K NPS deduction under 80CCD(1B) — that's ₹15,600 in tax saved at 30% slab." Runs old vs new regime comparison → "New regime saves you ₹22K this year given your deductions." Sets advance-tax reminders for freelance income.
- **Outcome:** ₹15,600 tax saved; NPS started; first time Vikram has a clear picture of all income and tax exposure.

### Everyday scenarios (bank-wide)
| Trigger | Arya's response | Value unlocked |
|---|---|---|
| Salary credited | "Your salary is in. Ready to auto-invest ₹8K to your Home goal?" | Investing discipline |
| Salary hike detected | "Your salary jumped 18% — increasing your SIP by ₹2K adds ₹18L to retirement. One tap?" | SIP step-up |
| Debit to Groww/Zerodha | "₹5K sent to Groww — tagged as Investment. Your total invested this month: ₹12K." | Unified tracking |
| Big UPI spend | "Heads-up — you've spent 62% of your dining budget in week 1." | Behavioural nudge |
| Subscription creep | "You have 7 active subscriptions totalling ₹3,240/month. Want to review?" | Spend optimisation |
| Credit card utilisation >30% | "Your card utilisation hit 38% — this can impact your credit score. Pay ₹X to bring it below 30%." | Credit health |
| Market drop 5%+ | "Markets fell — this is normal. Your 15-yr goal is still on track. Want to top-up?" | Prevents panic redemption |
| Stock up 40%+ | "Stock X is up 44% in 5 months — consider booking partial profits. Here's the tax impact." | Wealth capture |
| FD maturing | "Your ₹2L FD matures Friday. Rates are 20 bps higher now — want to renew or move to a balanced fund?" | Retention + upsell |
| Missed SIP | "Insufficient balance yesterday. Skip once, or shift SIP date to 5th of the month?" | SIP survival |
| Life event (new loan detected) | "New home loan detected. Should we set up a home-insurance quote and revise your emergency fund?" | Cross-sell + protection |
| Tax season (Jan–Mar) | "You need ₹42K more under 80C to max savings. Also, NPS can save you ₹15,600 extra. Here are 3 options." | Timely tax help |
| Bonus/windfall | "₹1.5L unusual credit. Options: pay down loan, top-up SIP, park in liquid fund." | Wealth capture |
| User asks "Can I buy X?" | Arya analyses budget + goals + purpose → contextual yes/no + alternatives | Purchase coaching |

## 12. How It Helps — Value for Every Stakeholder

### For the customer
- **Confidence:** Plain-language advice, in their own language, from a friendly face.
- **Time saved:** No more googling "best mutual fund 2026" — Arya knows their context.
- **Better outcomes:** Idle money earns; goals get funded; portfolios stay healthy; tax gets optimised.
- **Financial inclusion:** Voice + vernacular + avatar → works for the 60%+ Indians who won't read English fintech screens.
- **Trust:** Bank-hosted, explainable, non-pushy — the opposite of a stock-tip Telegram channel.

### For IDBI Bank
| Lever | Impact |
|---|---|
| **AUM growth** | Convert dormant CASA (~30% of avg. balance sits idle) into MF/FD → est. ₹2–3× wallet share per active user |
| **Fee income** | MF distribution commission, insurance cross-sell, demat activation — all in-app |
| **Cost-to-serve ↓** | 1 RM serves ~150 customers today; Arya serves ∞. Human RMs freed for HNI |
| **Retention ↑** | Every additional product = ~15% churn reduction (industry data) |
| **App engagement** | Avatar interactions push DAU/MAU up 30–50% vs static apps |
| **Brand positioning** | Positions IDBI as *India's first truly AI-native bank* — huge PR and hiring lift |
| **Data flywheel** | Every interaction improves the model → sustainable moat vs new entrants |
| **Regulatory posture** | Explainable + audited AI = ahead of the curve when SEBI/RBI publish GenAI norms |

### For the ecosystem
- **AMCs / insurers:** Cheaper distribution channel with better-matched leads (advice-led, not push-led).
- **Regulator:** Cleaner audit trail than human RM notes; every recommendation reproducible.
- **Society:** Millions of first-time investors onboarded responsibly.

## 13. Business Impact — Quantified KPIs
- **For customer:** Democratises wealth advice — every account holder gets a "private banker" experience.
- **For bank:**
  - ↑ Cross-sell (MF, insurance, FD) — expect **2–3× conversion** vs. static banners.
  - ↑ CASA stickiness — idle-balance sweeps.
  - ↓ Cost-to-serve — advisor bandwidth freed up for HNI customers.
  - ↑ App DAU/MAU — avatar interactions drive engagement.
- **Target KPIs (12 months post-launch):**
  - Activation rate: 25%+ of active mobile users try Arya at least once/month
  - AUM per active user: ↑ 40%
  - Cross-sell (2+ products): ↑ from ~1.3 to 2.5 products per active user
  - NPS lift: +15 points vs non-users
  - Cost per acquired MF investor: ↓ 60% vs branch channel

## 14. Future Roadmap — What "Arya" Can Become
Arya is not a one-shot feature; it's a compounding platform. The wedge is conversational wealth advice, but the platform can expand along three vectors — **channels, agents, and life coverage**.

### v1 (Hackathon → 6 months) — Foundation
Everything in Sections 2–7: avatar, spend insights, goal planner, portfolio doctor, product recommender, nudge engine, **Bill Negotiator, Credit Coach, Money Jars, persistent memory**. In-app only. **Chat-based conversational UI** in English + Hindi + **7 regional languages at launch** (Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati, Punjabi).

**Also in v1 (pulled forward from v2 due to high impact):**
- **Consolidated net-worth** — IDBI holdings + external broker holdings (Groww, Zerodha) via AA consent flow; broker debits auto-tagged as investments.
- **Income Intelligence** — salary detection, other income tagging (freelance, rent, dividends), true savings rate computation, salary-hike SIP step-up nudge.
- **Credit card spend tracking** — category-wise breakdown, subscription creep detection, credit utilisation alert.
- **PF + NPS tracking** — EPFO + PFRDA data via AA; total retirement corpus view; NPS 80CCD(1B) gap alert.
- **"Can I afford this?" Purchase Advisor** — conversational chat flow; analyses emergency fund, goal progress, purpose, suggests alternatives.
- **Tax Intelligence (core)** — 80C tracker, old vs new regime picker, NPS deduction gap, capital-gains alert before sell.
- **Stock performance signals** — benchmark comparison, concentration risk, profit-booking nudge (non-discretionary, SEBI-compliant).
- **Goal types expanded** — long-term goals + near-term major purchases (gadget, car, vacation) with instrument recommendation by horizon.
- **SIP step-up engine** — triggers on salary hike detection; shows compounding impact tied to specific goal.

### v2 (6–12 months) — Deeper Advice & Wider Reach
- **Talk to Arya (voice)** — In-app STT + TTS with Indic voices (ElevenLabs / OpenAI Voice Agents / Azure Speech / Google Indic). Lip-synced avatar, wake-word ("Hey Arya"), fully hands-free flows for accessibility and low-literacy users. Unlocks the tier-2/3 vernacular-voice moat highlighted in Section 3.2.
- **HeyGen video-avatar explainers** — On-demand 45-second personalised videos in 7 regional languages ("Why your gold allocation dropped 2%", "How to claim 80CCD(1B)"). Batch-generated at night, cached, streamed on request.
- **Predictive cash-flow AI** — "You'll run short by ₹8K on the 25th; move salary date or start a mini-liquid buffer."
- **Full tax optimiser (extended)** — HRA optimisation, advance-tax reminders for freelancers/business owners, 80D, capital-gain harvesting across all holdings.
- **Insurance gap analyser** — Detects underinsurance vs income/loans/dependents; quotes term/health via IDBI's tie-ups.
- **Family goals & shared plans** — Spouse/parent can join a goal, get progress updates.
- **Multi-channel Arya** — Same brain via **WhatsApp**, **voice call ("Call Arya")**, and **branch-tablet mode** for assisted banking.
- **AI → Human handoff transparency** — When Arya escalates a query to a human RM, the customer sees *why* Arya escalated, *what data will be shared*, and can approve or edit before hand-off. Whitespace no bank currently owns.
- **Peer benchmarking** — Anonymised: "People with similar income save 22% — you're at 14%." Motivational, not judgmental.
- **Spending fingerprint** — Needs vs wants vs investments ratio; seasonal spend pattern detection ("You overspend every December — want a holiday budget?").
- **Wealth reports** — Monthly personalised PDF Arya-authored summary emailed/shared to customer.

### v3 (12–24 months) — Agentic & Ecosystem
- **Full HNI-grade financial planning** — retirement projections, will/estate guidance, succession planning.
- **Premium voice-clone tier** — HNI-aspirant customers can pick a Bollywood personality voice, IDBI brand-ambassador voice, or clone their own voice for Arya (ElevenLabs). Optional paid tier.
- **Credit + wealth in one brain** — Holistic net-worth optimisation: "Pre-pay this loan vs invest here — Arya's math says pre-pay wins by ₹1.4L."
- **Agentic AI (opt-in, guardrailed)** — Customer sets rules ("keep 6 months emergency fund, rebalance if drift >10%") and Arya auto-executes within limits, notifying after.
- **ESG / thematic portfolios** — Values-aligned investing curated by the AI.
- **NRI + cross-border** — FEMA-aware advice, FCNR/NRE optimisation, US-tax-aware planning for returnees.
- **Marketplace for verified third-party products** — Curated PMS, AIF, sovereign gold, bonds — with the same guardrails.
- **Arya-as-a-Service (B2B2C)** — IDBI licenses the Arya stack to co-operative banks, RRBs, and NBFCs as a white-label wealth module. New revenue line + regulatory positioning as *India's AI-wealth infrastructure provider*.

### v4 (24 months+) — The Ambient Bank
- **Proactive avatar** — Arya calls *you* (with consent) when markets move, life events hit, or opportunities appear.
- **AR / smart-glass mode** — Wealth insights overlaid on spending in the real world.
- **Federated learning across banks** — Better models without moving data (privacy-preserving).
- **Regulator co-pilot** — Real-time audit dashboard for SEBI/RBI showing model behaviour and disclaimers.

## 15. Risks & Mitigations
| Risk | Mitigation |
|---|---|
| LLM hallucinates advice | Deterministic ML for numbers; LLM only for wording; output validator + disclaimers |
| Regulatory push-back on "advice" | Position as *non-discretionary suggestions*; customer confirms every action |
| Data privacy concerns | On-prem / private-endpoint LLM; PII redaction; DPDP consent flow |
| Avatar feels gimmicky | Ship 2D fallback + text-only mode; make avatar optional |
| Mobile app team push-back on integration | Ship as SDK/WebView — minimum footprint in host app |
| Competitor (HDFC/ICICI) copies feature | First-mover embedded-in-app advantage; data flywheel; multilingual voice moat |
| Model bias / unfair recommendations | Fairness testing across segments (gender, geography, income); human-in-loop review |
| AA consent drop-off (external broker/PF data) | Make AA onboarding optional and incremental — core IDBI features work without it; AA unlocks "full picture" as an upgrade |
| Stock signals misused as trading advice | Hard guardrail: all stock suggestions labelled "things to consider", never "buy/sell now"; SEBI disclaimer auto-appended; no intraday or F&O signals |
| Tax advice errors | Tax engine is fully deterministic rule-based (no LLM for numbers); annual rule-set update process; "consult your CA" disclaimer on all tax outputs |
| Gamification trap (Replika-style engagement hacks) | No badges, no streaks, no "you invested ₹1L!" celebrations. Wealth is serious business; frivolous UX kills trust. Explicit design rule, enforced in review |
| Dark-pattern lending nudges (Klarna criticism) | Arya never uses AA data to nudge overspend. No "you have ₹8K to spend now" messages. Explicit ban in Nudge Engine ruleset; regulator-aligned messaging only |
| Data monetisation risk (DPDP + RBI) | Zero customer-data sales to third parties, ever. Contractual + technical enforcement (no external egress). Bright-line rule, not a preference |
| Notification fatigue (TRAI cracking down on spam) | Cap outbound notifications at 1–2/day per customer; must be actionable; opt-out in one tap; weekly digest as alternative |
| Biometric / phone-data over-collection | Reuse IDBI's existing KYC; do not re-collect biometric or phone data. All optional data extras are explicit opt-in with clear purpose statement |

## 16. What We Need From the Bank (for Phase 2)
1. Sandbox API access — accounts, transactions, holdings, KYC, product catalog.
2. Sample anonymised customer dataset (500–1000 profiles) — ideally including credit card transactions, salary credits, and broker debits.
3. Approved product list + associated disclaimers.
4. Design tokens / style guide of the existing mobile app.
5. Confirmation of AA integration scope — which FIPs (Groww, Zerodha, EPFO, PFRDA, card issuers) are accessible via the bank's AA handle.
6. A single point of contact from the digital + compliance teams.

## 17. Slide-by-Slide PPT Outline (for the submission deck)
1. Title — "Arya: Your AI Wealth Advisor, Inside IDBI"
2. The problem (with a customer persona)
3. Why now (AI + avatar + mobile penetration + EY industry data)
4. Market scan — what HDFC SmartWealth, ICICI, Zerodha do (and don't)
5. Our USP — one line + differentiator table
6. Solution overview — one screen with the avatar
7. Live scenario walk-through (3 hero flows + 2 personas)
8. How the AI thinks (agents + models diagram)
9. Architecture & mobile integration
10. Data & security / compliance
11. Business impact & KPIs
12. Future roadmap (v2 / v3 / Arya-as-a-Service)
13. Team & ask
14. Thank you / Q&A

---
*Prepared for IDBI Innovate 2026 — hackathon submission stage.*