/**
 * Arya — AI Wealth Advisor (IDBI Innovate 2026)
 * Dummy data for the prototype. Persona: Priya, 28, IT professional, Bengaluru.
 * All figures are illustrative — sandbox APIs will replace this file in Phase 2.
 */

const AryaData = {
  // ─── Customer ─────────────────────────────────────────────
  customer: {
    id: "IDBI-2411890",
    firstName: "Priya",
    lastName: "Sharma",
    age: 28,
    city: "Bengaluru",
    occupation: "IT Professional",
    monthlyIncome: 120000,
    riskScore: 7, // 1-10 (7 = moderately aggressive)
    languages: ["en", "hi", "mr", "ta", "te", "kn", "bn", "gu", "pa"],
    lifeEvents: [
      { event: "Salary hike 18%", date: "2026-04-01" },
      { event: "New credit card issued", date: "2025-11-10" },
    ],
  },

  // ─── IDBI accounts ───────────────────────────────────────
  idbi: {
    savings: {
      name: "IDBI Savings A/c",
      number: "XXXX 4521",
      balance: 620000,
      interestRate: 3.0,
    },
    fds: [
      {
        id: "FD-001",
        amount: 200000,
        rate: 7.1,
        maturityDate: "2027-03-15",
        tenureMonths: 24,
      },
    ],
    loans: [],
    creditCard: {
      name: "IDBI Aspire",
      last4: "8823",
      creditLimit: 200000,
      outstandingBalance: 124000,
      utilisation: 62,
      apr: 42.0, // p.a.
      dueDate: "2026-07-18",
    },
  },

  // ─── External brokers (via AA) ───────────────────────────
  brokers: {
    groww: {
      name: "Groww",
      linkedViaAA: true,
      holdings: [
        {
          fund: "Axis Bluechip Fund",
          units: 320.12,
          nav: 62.4,
          value: 19975,
          sipMonthly: 3000,
        },
        {
          fund: "Parag Parikh Flexi Cap",
          units: 145.5,
          nav: 74.8,
          value: 10883,
          sipMonthly: 2000,
        },
      ],
    },
    zerodha: {
      name: "Zerodha",
      linkedViaAA: true,
      stocks: [
        {
          symbol: "INFY",
          qty: 40,
          avgBuyPrice: 1420,
          ltp: 1785,
          changePct: 25.7,
        },
        {
          symbol: "TATAMOTORS",
          qty: 30,
          avgBuyPrice: 640,
          ltp: 928,
          changePct: 45.0,
        },
        {
          symbol: "HDFCBANK",
          qty: 12,
          avgBuyPrice: 1580,
          ltp: 1712,
          changePct: 8.4,
        },
      ],
    },
  },

  // ─── Retirement corpus via AA ────────────────────────────
  retirement: {
    epfo: { balance: 415000, monthlyContribution: 9600 },
    nps: { balance: 0, tier1Active: false, deductionGap80CCD1B: 50000 }, // full ₹50K gap
  },

  // ─── Consolidated net worth ─────────────────────────────
  netWorth: {
    // Values auto-summed in app.js; hardcoded here for quick reference
    idbiSavings: 620000,
    idbiFD: 200000,
    grow_MF: 30858,
    zerodha_Stocks: 194056, // 40*1785 + 30*928 + 12*1712
    epfo: 415000,
    nps: 0,
    ccOutstanding: -124000,
    total: 1335914,
  },

  // ─── Money jars (goals) ─────────────────────────────────
  jars: [
    {
      id: "jar-home",
      name: "Dream Home 2032",
      icon: "🏠",
      targetAmount: 5000000,
      currentAmount: 310000,
      targetDate: "2032-06-01",
      monthlySIP: 15000,
      recommendedSIP: 16800,
      fillPct: 6.2,
      onTrack: false,
      shortfallPct: 3.0,
    },
    {
      id: "jar-kids",
      name: "Kids' Education 2035",
      icon: "🎓",
      targetAmount: 3500000,
      currentAmount: 60000,
      targetDate: "2035-06-01",
      monthlySIP: 5000,
      recommendedSIP: 5000,
      fillPct: 1.7,
      onTrack: true,
      shortfallPct: 0,
    },
    {
      id: "jar-emergency",
      name: "Emergency Fund",
      icon: "🛡️",
      targetAmount: 480000, // 4 months expenses
      currentAmount: 452000,
      targetDate: "2026-12-01",
      monthlySIP: 5000,
      recommendedSIP: 3500,
      fillPct: 94.2,
      onTrack: true,
      shortfallPct: 0,
    },
  ],

  // ─── Spend analysis (last 30 days) ──────────────────────
  spends: {
    total: 68420,
    monthOnMonthDelta: 12.4, // % up
    categories: [
      { name: "Rent", amount: 22000, icon: "🏘️", color: "#134074", pct: 32.2 },
      {
        name: "Food & Dining",
        amount: 14200,
        icon: "🍽️",
        color: "#F5B301",
        pct: 20.8,
        alert: true,
        alertMsg: "42% higher than last month",
      },
      {
        name: "Shopping",
        amount: 9800,
        icon: "🛍️",
        color: "#8E44AD",
        pct: 14.3,
      },
      {
        name: "Transport",
        amount: 6200,
        icon: "🚗",
        color: "#0F9D58",
        pct: 9.1,
      },
      {
        name: "Subscriptions",
        amount: 4820,
        icon: "📺",
        color: "#E63946",
        pct: 7.0,
        alert: true,
        alertMsg: "11 active — 3 unused",
      },
      {
        name: "Utilities",
        amount: 3600,
        icon: "💡",
        color: "#5B6C7E",
        pct: 5.3,
      },
      {
        name: "Healthcare",
        amount: 2400,
        icon: "🏥",
        color: "#2E86AB",
        pct: 3.5,
      },
      {
        name: "Entertainment",
        amount: 2100,
        icon: "🎬",
        color: "#E67E22",
        pct: 3.1,
      },
      {
        name: "Investment",
        amount: 5000,
        icon: "📈",
        color: "#0F9D58",
        pct: 7.3,
        tag: "Groww SIP auto-tagged",
      },
    ],
  },

  // ─── Subscriptions detected ────────────────────────────
  subscriptions: [
    { name: "Netflix", amount: 649, used: true, icon: "🎥" },
    { name: "Amazon Prime", amount: 179, used: true, icon: "📦" },
    { name: "Spotify", amount: 119, used: true, icon: "🎵" },
    { name: "Hotstar", amount: 299, used: false, icon: "📺" },
    { name: "Gaana Plus", amount: 99, used: false, icon: "🎧" },
    { name: "YouTube Prem", amount: 129, used: true, icon: "▶️" },
    { name: "The Ken", amount: 499, used: false, icon: "📰" },
    { name: "Zomato Gold", amount: 200, used: true, icon: "🍕" },
    { name: "Cred Max", amount: 399, used: true, icon: "💳" },
    { name: "Notion Plus", amount: 1200, used: true, icon: "📝" },
    { name: "Adobe CC", amount: 450, used: true, icon: "🎨" },
  ],

  // ─── Bill Negotiator wins ──────────────────────────────
  billWins: [
    {
      id: "win-cc",
      icon: "💳",
      title: "Credit card interest",
      currentDetail: "42% p.a. on ₹1.24L outstanding",
      newDetail: "24% p.a. (IDBI Aspire Lite balance transfer)",
      yearlySaving: 14000,
      action: "Switch",
      why: "Your current card charges 42% p.a. — IDBI Aspire Lite offers 24% p.a. with a one-time transfer fee of ₹1,500. Break-even in 45 days.",
    },
    {
      id: "win-health",
      icon: "🏥",
      title: "Health insurance renewal",
      currentDetail: "₹28,000/yr (renewal in 40 days)",
      newDetail: "₹19,800/yr — same ₹10L cover",
      yearlySaving: 8200,
      action: "Re-shop",
      why: "3 IDBI-listed insurers offer identical ₹10L family floater for ₹19,800 (Star, Care, Manipal). Portability window is open until Aug 15.",
    },
    {
      id: "win-pl",
      icon: "🏦",
      title: "Personal loan EMI",
      currentDetail: "13.5% (₹18,000 EMI)",
      newDetail: "11.9% (IDBI PL — ₹17,120 EMI)",
      yearlySaving: 10560,
      action: "Refinance",
      why: "IDBI Personal Loan @ 11.9% with zero processing fee for existing customers. Foreclosure penalty on old loan is ₹4,200 — recovered in 5 months.",
    },
    {
      id: "win-subs",
      icon: "📅",
      title: "3 unused subscriptions",
      currentDetail: "Hotstar + Gaana Plus + The Ken",
      newDetail: "Cancel — no usage in 90 days",
      yearlySaving: 16764,
      action: "Cancel all",
      why: "You have not opened these apps in the last 90 days. Total monthly bleed: ₹897 (₹10,764/yr) plus one-time recovery of previous months.",
    },
  ],

  // ─── Credit Coach (CIBIL) ──────────────────────────────
  credit: {
    score: 720,
    band: "Good",
    scale: 900,
    projectedScore90d: 760,
    drags: [
      {
        severity: "high",
        text: "Credit utilisation 72% (healthy < 30%)",
        icon: "🔴",
      },
      { severity: "medium", text: "1 late payment in Feb 2026", icon: "🟡" },
      { severity: "low", text: "Age of credit — 6 years, good", icon: "🟢" },
    ],
    plan: [
      {
        step: 1,
        text: "Enable auto-pay on IDBI Aspire card",
        cta: "Enable",
        done: false,
      },
      {
        step: 2,
        text: "Pay ₹15,000 towards CC → utilisation < 30%",
        cta: "Pay now",
        done: false,
      },
      {
        step: 3,
        text: "Dispute Feb 2026 late-payment (bank error)",
        cta: "Start",
        done: false,
      },
    ],
  },

  // ─── Tax Optimizer ─────────────────────────────────────
  tax: {
    financialYear: "FY 2026-27",
    slabAssumed: "30%",
    sec80C: {
      limit: 150000,
      usedByPF: 115200,
      usedByELSS: 0,
      usedByLIC: 12000,
      total: 127200,
      remaining: 22800,
      suggestion:
        "Start ELSS SIP of ₹1,900/mo — locks in 3 years, saves ₹6,840 tax",
    },
    sec80CCD1B: {
      limit: 50000,
      used: 0,
      remaining: 50000,
      suggestion: "Open NPS Tier-1 & invest ₹50,000 → save ₹15,600 tax",
    },
    sec80D: {
      limit: 25000,
      used: 12000,
      remaining: 13000,
      suggestion: "Add parental health cover — save ₹3,900",
    },
    regime: {
      old: { tax: 128700, deductionsClaimed: 165000 },
      new: { tax: 118200, deductionsClaimed: 0 },
      winner: "new",
      saving: 10500,
    },
  },

  // ─── Portfolio Doctor ──────────────────────────────────
  portfolioDoctor: {
    overallHealth: 68, // out of 100
    findings: [
      {
        severity: "high",
        finding: "Overlap of 78% between Axis Bluechip and your index fund",
        fix: "Switch Axis Bluechip → Parag Parikh Flexi Cap (same AMC, no exit load)",
        cta: "Switch",
      },
      {
        severity: "medium",
        finding: "Zero debt allocation — recommend 20% given moderate risk",
        fix: "Start SIP in IDBI Corporate Bond Fund ₹3,000/mo",
        cta: "Start SIP",
      },
      {
        severity: "low",
        finding: "TATAMOTORS at 45% of equity — concentration risk",
        fix: "Consider partial profit booking — sell 10 shares (LTCG applies)",
        cta: "Review",
      },
    ],
  },

  // ─── Stock Advisor signals ─────────────────────────────
  stockSignals: [
    {
      symbol: "TATAMOTORS",
      change: "+45%",
      msg: "Up 45% in 6 months. Concentration is 45% of your equity — consider booking partial profits.",
      tax: "LTCG @10% on gains above ₹1L applies",
      cta: "Review & sell (deep-link to Zerodha)",
      compliant: true,
    },
    {
      symbol: "INFY",
      change: "+25.7%",
      msg: "Outperforming Nifty IT by 8%. Hold — momentum intact.",
      tax: "No action recommended",
      cta: "View benchmark chart",
      compliant: true,
    },
  ],

  // ─── Retirement Planner ────────────────────────────────
  retirementPlan: {
    currentCorpus: 415000, // EPFO only
    targetAtAge60: 40000000, // ₹4Cr
    projectedAtCurrent: 32000000,
    gap: 8000000,
    monthsToRetirement: 32 * 12,
    action:
      "Open NPS Tier-1 with ₹50K/yr — adds ₹1.6Cr at retirement + ₹15,600 tax/yr",
  },

  // ─── Persistent Memory highlights ──────────────────────
  memory: [
    {
      date: "Jan 2025",
      note: "You were nervous about SIP timing during the market dip. You stayed the course. Result: +18% in 12 months.",
    },
    {
      date: "Aug 2024",
      note: "You asked whether to prepay your education loan or start SIPs. We chose SIPs. Loan cleared 4 months late, but you gained ₹42K more in returns.",
    },
    {
      date: "Mar 2024",
      note: "First IDBI account opened. Net worth was ₹1.8L. Today: ₹13.4L. That's 7.4× in 24 months.",
    },
  ],

  // ─── Purchase Advisor: iPhone scenario ────────────────
  purchaseAdvisor: {
    item: "iPhone 16 Pro",
    price: 135000,
    branches: {
      creator: {
        purpose: "I'm a content creator — I shoot Reels + YouTube on the side",
        verdict: "yes",
        recommendation: "The Pro's camera pays for itself if you monetise.",
        plan: "Split it: ₹80,000 on your IDBI card (6-month no-cost EMI) + ₹55,000 from savings. Keeps your Home-goal SIP untouched.",
        cta: "Book it",
      },
      personal: {
        purpose: "Just personal use — WhatsApp, photos, banking",
        verdict: "reconsider",
        recommendation:
          "The iPhone 15 (₹65,000) or 16-base (₹79,000) gives you the same experience.",
        plan: "The ₹56,000 you'd save becomes ₹1,82,000 in 10 years at 12%.",
        cta: "Route difference to Home-goal SIP",
      },
      emergency: {
        purpose: "My old phone broke, I need one urgently",
        verdict: "warning",
        recommendation:
          "₹1.35L in one shot cuts your emergency fund from 4 months to 2.",
        plan: "Two options: (a) iPhone 15 refurbished at ₹52K, keeps buffer intact; or (b) iPhone 16 Pro on 12-month 0% EMI via IDBI card — ₹11,250/mo, fits your surplus.",
        cta: "Choose plan",
      },
    },
  },

  // ─── 14 AI Agents ──────────────────────────────────────
  agents: [
    {
      id: "spend",
      group: "Personal Finance",
      icon: "🧾",
      name: "Spend Analyzer",
      desc: "Categorises every rupee spent. Detects month-on-month deltas, subscription creep.",
    },
    {
      id: "income",
      group: "Personal Finance",
      icon: "💰",
      name: "Income Intelligence",
      desc: "Detects salary + other income. Triggers SIP step-up on hike. Computes true savings rate.",
    },
    {
      id: "goal",
      group: "Personal Finance",
      icon: "🎯",
      name: "Goal Planner",
      desc: "Given goal + horizon + risk, computes required SIP. Handles long-term goals + near-term buys.",
    },
    {
      id: "purchase",
      group: "Personal Finance",
      icon: "🛒",
      name: "Purchase Advisor",
      desc: "'Can I afford this?' Analyses buffer, goals, purpose. Suggests alternatives + payment method.",
    },
    {
      id: "billnegot",
      group: "Personal Finance",
      icon: "✂️",
      name: "Bill Negotiator",
      desc: "Cuts credit-card interest, insurance premiums, personal-loan rates. NEW in v1.",
    },
    {
      id: "creditcoach",
      group: "Personal Finance",
      icon: "📈",
      name: "Credit Coach",
      desc: "CIBIL score explainer + top-drags + micro-actions. Projected boost in 60–90 days. NEW in v1.",
    },
    {
      id: "portfolio",
      group: "Investment",
      icon: "⚕️",
      name: "Portfolio Doctor",
      desc: "Checks drift, overlap, underperformers, tax-loss harvesting across IDBI + external brokers.",
    },
    {
      id: "stock",
      group: "Investment",
      icon: "📊",
      name: "Stock Advisor",
      desc: "Tracks individual stocks vs benchmark. Flags concentration, profit-booking (SEBI-compliant).",
    },
    {
      id: "risk",
      group: "Investment",
      icon: "🎲",
      name: "Risk Profiler",
      desc: "Blends questionnaire + behaviour to score 1–10. Refreshes on life events.",
    },
    {
      id: "retire",
      group: "Investment",
      icon: "🌴",
      name: "Retirement Planner",
      desc: "Aggregates PF + NPS + MF + FD into total corpus. Projects gap, suggests NPS top-up.",
    },
    {
      id: "tax",
      group: "Investment",
      icon: "🧮",
      name: "Tax Optimizer",
      desc: "80C tracker, old vs new regime picker, NPS 80CCD(1B) gap, capital-gains alerts.",
    },
    {
      id: "product",
      group: "Investment",
      icon: "📚",
      name: "Product Recommender",
      desc: "Picks from bank's approved MF/FD/insurance catalog (RAG over product docs).",
    },
    {
      id: "nudge",
      group: "Orchestration",
      icon: "🔔",
      name: "Nudge Engine",
      desc: "Detects idle savings, missed SIP, high-interest debt, salary-hike SIP step-up.",
    },
    {
      id: "guardrail",
      group: "Orchestration",
      icon: "🛡️",
      name: "Compliance Guardrail",
      desc: "Ensures every suggestion carries SEBI disclaimers. No guaranteed returns, ever.",
    },
  ],

  // ─── Chat scripts (Arya's canned responses) ───────────
  // Keyword → sequence of bubbles from Arya
  chatScripts: [
    {
      match:
        /(wins|3 wins|show me the (3 )?wins|see (them|the wins)|show wins|three wins)/i,
      bubbles: [
        {
          type: "text",
          text: "Sure — here are your 3 wins in detail. All 3 sit behind one 'Yes' if you want to skip the walk-through.",
        },
        {
          type: "text",
          text: "1️⃣ Sweep ₹4L idle savings → FD. Currently earning 3%. Sweep-FD at 7.1% keeps ₹2L instantly liquid, zero exit penalty. Net gain: ₹16,400/yr.",
        },
        {
          type: "text",
          text: "2️⃣ Switch credit card 42% → 24%. Your Aspire card charges 42% on ₹1.24L outstanding. IDBI Aspire Lite balance transfer to 24% pays back the ₹1,500 transfer fee in 45 days. Net gain: ₹14,000/yr.",
        },
        {
          type: "text",
          text: "3️⃣ Top up Home 2032 SIP by ₹1,800/mo. Jar is 3% behind pace — this catches up in 4 months, and the impact of skipping is an 8-month delay on the goal.",
        },
        {
          type: "action",
          label: "Say Yes to all 3 · ₹30K in your pocket",
          agent:
            "Nudge Engine + Product Recommender + Bill Negotiator + Goal Planner",
          disclaimer:
            "3 separate non-discretionary approvals. Each executes only after you confirm.",
        },
      ],
    },
    {
      match:
        /(idle|savings idle|money idle|₹?6l idle|show my money|money$|net worth|networth)/i,
      bubbles: [
        {
          type: "text",
          text: "I noticed ₹6L sitting in your savings account earning just 3%. Moving ₹4L to a Sweep-FD at 7.1% earns you ₹16,400 extra per year — with zero premature-exit penalty. 🟢",
        },
        {
          type: "why",
          title: "Why I'm suggesting this",
          points: [
            "RBI repo rate: 6.5% · IDBI Sweep-FD: 7.1%",
            "Your ₹6L has sat idle for 8 months (Nov 2025 – Jul 2026)",
            "Sweep-FD keeps ₹2L liquid — instant break, no penalty",
            "Cross-checked against your 4-month emergency fund (₹4.52L in place)",
          ],
        },
        {
          type: "action",
          label: "Move ₹4L to Sweep-FD @ 7.1%",
          agent: "Product Recommender + Nudge Engine",
          disclaimer:
            "Non-discretionary. You approve; IDBI executes. Interest subject to prevailing rate on booking date.",
        },
      ],
    },
    {
      match: /(iphone|phone|buy phone|buy iphone|afford iphone)/i,
      bubbles: [
        {
          type: "text",
          text: "Sure — quick question first, what will you use it mostly for? Content creation, personal use, or is your old phone broken and you need one urgently?",
        },
        {
          type: "choices",
          options: [
            { label: "Content creation (Reels + YouTube)", value: "creator" },
            { label: "Personal use (WhatsApp, photos)", value: "personal" },
            { label: "Old phone broke — urgent", value: "emergency" },
          ],
        },
      ],
    },
    {
      match: /(tax|80c|save tax|tax saving)/i,
      bubbles: [
        {
          type: "text",
          text: "Two quick wins on tax for FY 2026-27:",
        },
        {
          type: "list",
          items: [
            "You're ₹22,800 short of the 80C limit — start ELSS SIP ₹1,900/mo → saves ₹6,840 tax.",
            "You have zero NPS. Open Tier-1, invest ₹50K → saves ₹15,600 under 80CCD(1B).",
            "Old vs new regime for your income: NEW wins by ₹10,500 this year.",
          ],
        },
        {
          type: "action",
          label: "Start ₹1,900 ELSS SIP + Open NPS",
          agent: "Tax Optimizer + Product Recommender",
          disclaimer:
            "Tax computed on FY 2026-27 slabs. Consult a CA for personalised advice.",
        },
      ],
    },
    {
      match: /(cibil|credit score|credit rating)/i,
      bubbles: [
        {
          type: "text",
          text: "Your CIBIL is 720 — 'Good' band. Top drag: credit-card utilisation at 72% (healthy < 30%). Here's a 60-day plan to push you to 760.",
        },
        {
          type: "list",
          items: [
            "Enable autopay on IDBI Aspire → removes late-payment risk.",
            "Pay ₹15,000 towards card → utilisation drops below 30% next cycle.",
            "Dispute Feb 2026 late payment — it was a bank error (I have the trail).",
          ],
        },
        {
          type: "action",
          label: "Start 60-day CIBIL boost plan",
          agent: "Credit Coach",
          disclaimer:
            "CIBIL scores refresh monthly. Projected +40 points based on utilisation math.",
        },
      ],
    },
    {
      match: /(stock|tatamotors|sell|profit book)/i,
      bubbles: [
        {
          type: "text",
          text: "TATAMOTORS is up 45% in 6 months and now makes up 45% of your equity — that's concentration risk. Consider booking partial profits on 10 shares.",
        },
        {
          type: "why",
          title: "Why partial, not full",
          points: [
            "Sell 10 → realise ₹2,880 profit within LTCG-free ₹1L threshold",
            "Keep 20 → retain upside if the rally continues",
            "Reallocate ₹9,280 to your Debt allocation gap (Portfolio Doctor flag)",
          ],
        },
        {
          type: "action",
          label: "Deep-link to Zerodha to sell 10 shares",
          agent: "Stock Advisor + Portfolio Doctor",
          disclaimer:
            "Non-discretionary. This is not a buy/sell recommendation. Consult SEBI-registered advisor for individual trading decisions.",
        },
      ],
    },
    {
      match: /(bill|reduce bill|save money|subscription)/i,
      bubbles: [
        {
          type: "text",
          text: "I found ₹48,760/yr you can save right now — with zero effort from you. Details in the Bill Negotiator tab, but here's the summary:",
        },
        {
          type: "list",
          items: [
            "💳 Credit-card interest 42% → 24%: save ₹14,000/yr",
            "🏥 Health insurance renewal: save ₹8,200/yr",
            "🏦 Personal loan rate 13.5% → 11.9%: save ₹10,560/yr",
            "📅 Cancel 3 unused subscriptions: save ₹16,764/yr",
          ],
        },
      ],
    },
    {
      match: /(portfolio|drift|overlap|fund)/i,
      bubbles: [
        {
          type: "text",
          text: "Your portfolio health is 68/100 — improvable. Two flags to review:",
        },
        {
          type: "list",
          items: [
            "78% overlap between Axis Bluechip & your index fund",
            "Zero debt allocation (recommended 20% for your risk score of 7)",
          ],
        },
        {
          type: "action",
          label: "Open Portfolio Doctor",
          agent: "Portfolio Doctor",
          disclaimer:
            "Fund switches subject to exit load / STT. Same-AMC switch has no exit load.",
        },
      ],
    },
    {
      match: /(goal|home|retire|retirement)/i,
      bubbles: [
        {
          type: "text",
          text: "Your Home 2032 jar is 3% behind pace. A ₹1,800/month SIP top-up catches you up. Your retirement gap is ₹80L — opening NPS closes half of that.",
        },
        {
          type: "action",
          label: "Top up Home SIP + Open NPS",
          agent: "Goal Planner + Retirement Planner",
          disclaimer:
            "Projections use 12% p.a. equity + 7% p.a. debt. Actual returns vary.",
        },
      ],
    },
    {
      match: /(hi|hello|hey|namaste|hola)/i,
      bubbles: [
        {
          type: "text",
          text: "Hi Priya 👋 I noticed 3 wins for you today. Sweep idle ₹6L to earn ₹16.4K/yr, switch your credit card to save ₹14K/yr, and top-up your Home SIP by ₹1,800 to catch up. Want to see all three?",
        },
        {
          type: "choices",
          options: [
            { label: "Yes, show me the 3 wins", value: "wins" },
            { label: "Can I afford an iPhone?", value: "iphone" },
            { label: "How do I save tax?", value: "tax" },
          ],
        },
      ],
    },
    // Fallback
    {
      match: /.*/,
      bubbles: [
        {
          type: "text",
          text: "I can help with 5 things right now: your money (net worth + spend), your goals (SIPs + jars), taxes, bills to cut, and CIBIL. What would you like to explore?",
        },
        {
          type: "choices",
          options: [
            { label: "Show my money", value: "money" },
            { label: "Save on taxes", value: "tax" },
            { label: "Cut my bills", value: "bill" },
            { label: "Improve CIBIL", value: "cibil" },
          ],
        },
      ],
    },
  ],

  // ─── Multilingual UI strings ──────────────────────────
  i18n: {
    en: {
      greeting: "Good morning",
      threeWinsToday: "3 wins for you today",
      showMe: "Show me",
      later: "Later",
      why: "Why?",
      doIt: "Do it",
      notNow: "Not now",
      netWorth: "Net worth",
      balance: "Balance",
      askArya: "Ask Arya anything…",
    },
    hi: {
      greeting: "सुप्रभात",
      threeWinsToday: "आज आपके लिए 3 अवसर",
      showMe: "दिखाओ",
      later: "बाद में",
      why: "क्यों?",
      doIt: "करो",
      notNow: "अभी नहीं",
      netWorth: "कुल संपत्ति",
      balance: "शेष राशि",
      askArya: "आर्या से पूछें…",
    },
    mr: {
      greeting: "शुभ सकाळ",
      threeWinsToday: "आज तुमच्यासाठी 3 संधी",
      showMe: "दाखवा",
      later: "नंतर",
      why: "का?",
      doIt: "करा",
      notNow: "आत्ता नाही",
      netWorth: "एकूण संपत्ती",
      balance: "शिल्लक",
      askArya: "आर्याला विचारा…",
    },
    ta: {
      greeting: "காலை வணக்கம்",
      threeWinsToday: "இன்று உங்களுக்கு 3 வெற்றிகள்",
      showMe: "காட்டு",
      later: "பிறகு",
      why: "ஏன்?",
      doIt: "செய்",
      notNow: "இப்போது வேண்டாம்",
      netWorth: "மொத்த சொத்து",
      balance: "இருப்பு",
      askArya: "ஆர்யாவிடம் கேளுங்கள்…",
    },
  },
};

// Convenience helpers
AryaData.helpers = {
  inr(n) {
    const sign = n < 0 ? "-" : "";
    const abs = Math.abs(n);
    if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;
    if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(2)} L`;
    if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(1)} K`;
    return `${sign}₹${abs.toFixed(0)}`;
  },
  inrPlain(n) {
    // Full form with commas: ₹1,24,000
    const s = Math.abs(n).toFixed(0);
    const [lastThree, ...rest] = [s.slice(-3), s.slice(0, -3)];
    let out = lastThree;
    let remaining = rest[0] || "";
    while (remaining.length > 2) {
      out = remaining.slice(-2) + "," + out;
      remaining = remaining.slice(0, -2);
    }
    if (remaining) out = remaining + "," + out;
    return (n < 0 ? "-" : "") + "₹" + out;
  },
  pct(n) {
    return `${n.toFixed(1)}%`;
  },
  netWorthTotal() {
    const nw = AryaData.netWorth;
    return (
      nw.idbiSavings +
      nw.idbiFD +
      nw.grow_MF +
      nw.zerodha_Stocks +
      nw.epfo +
      nw.nps +
      nw.ccOutstanding
    );
  },
};

// Freeze to prevent accidental mutation from UI
Object.freeze(AryaData);

// Expose to app.js (const bindings don't attach to window automatically)
window.AryaData = AryaData;
