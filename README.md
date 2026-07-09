# Arya — AI Wealth Advisor

**IDBI Innovate 2026 · Hackathon Prototype**

> A conversational, multi-agent AI wealth advisor built for IDBI Bank customers.
> Turns every IDBI account holder into someone with a personal wealth manager — in their language.

---

## ⚠️ Prototype notice

**This is a static, self-contained UI prototype using dummy data.** It is not connected to any live IDBI backend, sandbox API, Account Aggregator, CIBIL bureau, or LLM. All figures — net worth, CIBIL scores, portfolio holdings, subscriptions, bill savings — are illustrative for the persona **Priya Sharma** (28, IT Professional, Bengaluru). Phase 2 will replace [`data.js`](src/app/data.js) / [`web/data.js`](src/web/data.js) with real sandbox API responses.

No network calls. No credentials. No PII. No LLM inference. Everything runs 100% client-side.

---

## 📁 Project structure

```
Hackathon/
├── README.md                   ← you are here
├── plan/                       ← concept & content
│   ├── ProblemStatement.txt
│   ├── Approach.md             ← full solution architecture
│   └── Slide-Content.md        ← 18-slide pitch deck copy
└── src/
    ├── app/                    ← MOBILE prototype (phone-frame layout)
    │   ├── index.html
    │   ├── styles.css
    │   ├── data.js             ← Priya's dummy data
    │   ├── app.js              ← views, chat, interactions
    │   └── README.md           ← deep-dive on mobile prototype
    └── web/                    ← DESKTOP prototype (browser dashboard)
        ├── index.html
        ├── styles.css
        ├── data.js             ← same dummy data, self-contained
        └── app.js              ← desktop views + docked chat rail
```

Both prototypes share the same feature set and persona but present them differently — one optimised for the phone, one for the desktop.

---

## 🚀 How to run

### Option A — Open directly in a browser

Both prototypes are pure HTML/CSS/JS with no build step. Just open either entry point:

```bash
open src/app/index.html    # mobile / phone-frame view
open src/web/index.html    # desktop / dashboard view
```

> On some browsers, opening `file://` URLs may block scripts. If a page appears blank, use Option B below.

### Option B — Serve locally (recommended)

Any static server works. Python's built-in is the simplest:

```bash
cd /path/to/Welth_Manager/src
python3 -m http.server 8000
```

Then open:

| Prototype | URL |
|---|---|
| **Mobile app** view | [http://localhost:8000/app/](http://localhost:8000/app/) |
| **Desktop web** view | [http://localhost:8000/web/](http://localhost:8000/web/) |

To stop the server: `Ctrl+C` (or `lsof -ti:8000 \| xargs kill`).

### Node users

```bash
npx serve src -l 8000
# then visit http://localhost:8000/app/ or http://localhost:8000/web/
```

**Requirements:** any modern browser (Chrome / Safari / Firefox / Edge — 2023+). No npm install. No build. No environment variables.

---

## 🎬 Recommended demo flow (both prototypes)

1. Land on the home screen → see the "3 wins today" hero.
2. Click **Show me the 3 wins** → Arya walks you through Sweep-FD, credit-card switch, SIP top-up. Total: ₹30,400/yr.
3. Ask Arya: *"Can I afford an iPhone?"* → she asks your **purpose** first, then routes to one of three branches (creator / personal / emergency).
4. Open **Bill Negotiator** → ₹49,524/yr in 4 wins, each with a "Why?" reason.
5. Open **Credit Coach** → CIBIL 720 today, projected 760 in 90 days with a 3-step plan.
6. Open **AI Agents** → all 14 specialised agents grouped by Personal Finance / Investment / Orchestration.
7. Open **Trust & Compliance** → non-discretionary promise, SEBI guardrail, AA framework.

---

## 🧩 What's included in the prototype

All features described in [`plan/Approach.md`](plan/Approach.md) and [`plan/Slide-Content.md`](plan/Slide-Content.md):

- **14 AI agents** (Spend Analyzer · Income Intelligence · Goal Planner · Purchase Advisor · Bill Negotiator ⭐ · Credit Coach ⭐ · Portfolio Doctor · Stock Advisor · Risk Profiler · Retirement Planner · Tax Optimizer · Product Recommender · Nudge Engine · Compliance Guardrail)
- **5 hero flows** from Slide 6 (Proactive greeting · Chat with "Why?" · Money Jars · Bill Negotiator · Credit Coach)
- **Whole-of-wallet view** (IDBI Savings + FD + Credit Card, Groww MF, Zerodha Stocks, EPFO — all via AA)
- **Money Jars** (Dream Home 2032, Kids' Education 2035, Emergency Fund)
- **Purchase Advisor** with 3 purpose-weighted branches
- **Tax Optimizer** (80C · 80CCD(1B) · 80D · Old vs New regime picker)
- **Persistent Memory** (past decisions + outcomes)
- **9-language switcher** (English + Hindi + Marathi + Tamil pre-translated; 5 more listed)

⭐ = flagged as **NEW in v1** — the two agents that distinguish Arya from every existing PFM tool.

---

## 📎 References

- [`plan/ProblemStatement.txt`](plan/ProblemStatement.txt) — the original IDBI Innovate 2026 brief
- [`plan/Approach.md`](plan/Approach.md) — solution architecture, agent design, tech stack, roadmap
- [`plan/Slide-Content.md`](plan/Slide-Content.md) — 18-slide pitch deck copy
- [`src/app/README.md`](src/app/README.md) — deep-dive on the mobile prototype (view-by-view coverage map)

---

_Built for IDBI Innovate 2026 · July 2026 · Prototype v1.0_