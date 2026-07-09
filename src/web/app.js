/**
 * Arya — AI Wealth Advisor (Web Edition)
 * Vanilla JS. Views, router, chat engine, interactions.
 * IDBI Innovate 2026 Prototype.
 */

(function () {
  "use strict";

  const D = window.AryaData;
  const { inr, inrPlain, pct, netWorthTotal } = D.helpers;

  // ─── State ─────────────────────────────────────────────────────
  const state = {
    tab: "overview",
    lang: "en",
    chatHistory: [],
    firstVisitToChat: true,
  };

  // ─── DOM refs ──────────────────────────────────────────────────
  const content = document.getElementById("content");
  const navBtns = document.querySelectorAll(".side-nav-btn");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const chatForm = document.getElementById("chatForm");
  const langBtn = document.getElementById("langBtn");
  const langLabel = document.getElementById("langLabel");
  const langMenu = document.getElementById("langMenu");
  const toast = document.getElementById("toast");

  // ═══════════════════════════════════════════════════════════════
  //  ROUTER
  // ═══════════════════════════════════════════════════════════════
  function switchTab(tab) {
    state.tab = tab;
    navBtns.forEach((b) => {
      const active = b.dataset.tab === tab;
      b.classList.toggle("active", active);
    });
    content.scrollTop = 0;
    render();
  }

  function render() {
    content.innerHTML = "";
    switch (state.tab) {
      case "overview":
        renderOverview();
        break;
      case "wealth":
        renderWealth();
        break;
      case "goals":
        renderGoals();
        break;
      case "bills":
        renderBills();
        break;
      case "credit":
        renderCredit();
        break;
      case "tax":
        renderTax();
        break;
      case "portfolio":
        renderPortfolio();
        break;
      case "stock":
        renderStock();
        break;
      case "retirement":
        renderRetirement();
        break;
      case "purchase":
        renderPurchase();
        break;
      case "subscriptions":
        renderSubscriptions();
        break;
      case "memory":
        renderMemory();
        break;
      case "agents":
        renderAgents();
        break;
      case "trust":
        renderTrust();
        break;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  OVERVIEW / DASHBOARD
  // ═══════════════════════════════════════════════════════════════
  function renderOverview() {
    const total = netWorthTotal();
    const t = D.i18n[state.lang];

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">${t.greeting}, ${D.customer.firstName} 👋</div>
          <div class="view-subtitle">Here's what Arya has found for you today.</div>
        </div>
        <div class="view-actions">
          <button class="btn-ghost btn-sm">This month ▾</button>
          <button class="btn-secondary btn-sm">Export report</button>
        </div>
      </div>

      <div class="dash-grid">

        <!-- Hero — 3 wins today -->
        <div class="hero-wins">
          <div class="hero-wins-inner">
            <div>
              <div class="hero-greeting">Arya says</div>
              <div class="hero-headline">
                I've found <span class="gold">₹30,400/yr</span> for you today.
              </div>
              <div class="hero-sub">
                3 non-discretionary moves — a sweep-FD, a credit-card switch, and a small SIP top-up. Each one shows you exactly why, and only executes on your approval.
              </div>
              <div class="hero-cta-row">
                <button class="btn-primary" onclick="AryaWeb.talkTo('wins')">Show me the 3 wins</button>
                <button class="btn-ghost" style="background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.2)" onclick="AryaWeb.talkTo('hi')">Chat with Arya</button>
              </div>
            </div>
            <div class="wins-visual">
              <div class="wins-visual-item"><span class="win-icn">🏦</span><span class="win-txt">Sweep ₹4L idle → FD</span><span class="win-amt">₹16.4K</span></div>
              <div class="wins-visual-item"><span class="win-icn">💳</span><span class="win-txt">Switch card 42% → 24%</span><span class="win-amt">₹14K</span></div>
              <div class="wins-visual-item"><span class="win-icn">🎯</span><span class="win-txt">Top-up Home SIP</span><span class="win-amt">catch-up</span></div>
            </div>
          </div>
        </div>

        <!-- Net worth card -->
        <div class="card span-5">
          <div class="card-title"><span class="card-icon">💼</span> Net Worth</div>
          <div class="card-sub">Across IDBI + linked accounts</div>
          <div class="nw-headline">${inrPlain(total)}</div>
          <div class="nw-delta">▲ 7.4× in 24 months</div>
          <div class="nw-breakdown">
            <div class="nw-row"><span class="nw-icn">🏦</span><span class="nw-lbl">IDBI Savings</span><span class="nw-val">${inr(D.netWorth.idbiSavings)}</span></div>
            <div class="nw-row"><span class="nw-icn">💰</span><span class="nw-lbl">IDBI FD @ 7.1%</span><span class="nw-val">${inr(D.netWorth.idbiFD)}</span></div>
            <div class="nw-row"><span class="nw-icn">📈</span><span class="nw-lbl">Groww MF <span class="aa-badge">AA</span></span><span class="nw-val">${inr(D.netWorth.grow_MF)}</span></div>
            <div class="nw-row"><span class="nw-icn">📊</span><span class="nw-lbl">Zerodha Stocks <span class="aa-badge">AA</span></span><span class="nw-val">${inr(D.netWorth.zerodha_Stocks)}</span></div>
            <div class="nw-row"><span class="nw-icn">🏛️</span><span class="nw-lbl">EPFO <span class="aa-badge">AA</span></span><span class="nw-val">${inr(D.netWorth.epfo)}</span></div>
            <div class="nw-row"><span class="nw-icn">💳</span><span class="nw-lbl">Credit Card Outstanding</span><span class="nw-val neg">${inr(D.netWorth.ccOutstanding)}</span></div>
          </div>
        </div>

        <!-- Spend donut -->
        <div class="card span-7">
          <div class="card-title"><span class="card-icon">💸</span> Spend this month</div>
          <div class="card-sub">${inr(D.spends.total)} spent · ▲ ${D.spends.monthOnMonthDelta}% vs last month</div>
          <div class="donut-wrap">
            ${spendDonutSVG(D.spends.categories)}
            <div class="spend-legend">
              ${D.spends.categories
                .map(
                  (c) => `
                <div class="spend-legend-item">
                  <div class="spend-swatch" style="background: ${c.color}"></div>
                  <div class="spend-lbl">${c.icon} ${c.name}</div>
                  <div class="spend-amt">${inr(c.amount)}</div>
                  ${c.alert ? '<div class="spend-alert-dot" title="' + escapeAttr(c.alertMsg) + '">⚠️</div>' : "<div></div>"}
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>

        <!-- Money jars -->
        <div class="card span-6">
          <div class="card-title"><span class="card-icon">🎯</span> Money Jars</div>
          <div class="card-sub">Long-term goals · click to open</div>
          <div class="jars-mini">
            ${D.jars
              .map((j) => {
                const onTrackClass = j.onTrack
                  ? "on-track"
                  : j.shortfallPct > 0
                    ? "behind"
                    : "";
                return `
                <div class="jar-mini-row" onclick="AryaWeb.switchTab('goals')">
                  <div class="jar-mini-icon">${j.icon}</div>
                  <div>
                    <div class="jar-mini-name">${j.name}</div>
                    <div style="font-size:11px; color: var(--text-muted); font-variant-numeric: tabular-nums;">${inr(j.currentAmount)} of ${inr(j.targetAmount)}</div>
                    <div class="jar-mini-progress"><div class="jar-mini-fill ${onTrackClass}" style="width: ${j.fillPct}%"></div></div>
                  </div>
                  <div class="jar-mini-pct">${j.fillPct.toFixed(1)}%</div>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>

        <!-- CIBIL card -->
        <div class="card span-6">
          <div class="card-title"><span class="card-icon">📈</span> Credit Coach <span class="chip chip-gold" style="margin-left:auto">NEW v1</span></div>
          <div class="card-sub">CIBIL score + 60-day boost plan</div>
          <div class="cibil-gauge">
            <div class="cibil-score-row">
              <div class="cibil-score-val">${D.credit.score}</div>
              <div class="cibil-score-max">/ ${D.credit.scale}</div>
              <div class="cibil-band" style="margin-left:auto">${D.credit.band}</div>
            </div>
            <div class="cibil-track">
              <div class="cibil-marker" style="left: ${(D.credit.score / D.credit.scale) * 100}%"></div>
              <div class="cibil-marker-proj" style="left: ${(D.credit.projectedScore90d / D.credit.scale) * 100}%"></div>
            </div>
            <div class="cibil-scale"><span>300</span><span>${D.credit.projectedScore90d} proj (90d)</span><span>${D.credit.scale}</span></div>
            <button class="btn-primary btn-sm" style="margin-top:12px; align-self:flex-start" onclick="AryaWeb.switchTab('credit')">Open Credit Coach →</button>
          </div>
        </div>

        <!-- 14 agents quick rail -->
        <div class="card span-12">
          <div class="card-title"><span class="card-icon">🤖</span> Your 14 AI Agents <span class="chip" style="margin-left:auto">Powered by Arya</span></div>
          <div class="card-sub">Every recommendation is produced by these specialised agents — with a compliance guardrail.</div>
          <div class="agents-rail">
            ${D.agents
              .slice(0, 12)
              .map(
                (a) => `
              <button class="agent-tile" onclick="AryaWeb.switchTab('agents')">
                <div class="agent-tile-icon">${a.icon}</div>
                <div class="agent-tile-name">${a.name}</div>
                ${a.newV1 ? '<div class="agent-new-badge">NEW v1</div>' : ""}
              </button>
            `,
              )
              .join("")}
          </div>
          <div style="text-align:center; margin-top: 12px">
            <button class="btn-ghost btn-sm" onclick="AryaWeb.switchTab('agents')">See all 14 agents →</button>
          </div>
        </div>

      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  WEALTH
  // ═══════════════════════════════════════════════════════════════
  function renderWealth() {
    const total = netWorthTotal();
    const zerodhaValue = D.brokers.zerodha.stocks.reduce(
      (s, x) => s + x.qty * x.ltp,
      0,
    );
    const growwValue = D.brokers.groww.holdings.reduce(
      (s, x) => s + x.value,
      0,
    );

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">My Wealth</div>
          <div class="view-subtitle">Whole-of-wallet view · IDBI + linked accounts via AA</div>
        </div>
        <div class="view-actions">
          <button class="btn-ghost btn-sm">+ Link account</button>
        </div>
      </div>

      <div class="wealth-grid">
        <div class="wealth-tile">
          <div class="wealth-tile-lbl">Total Net Worth</div>
          <div class="wealth-tile-val">${inrPlain(total)}</div>
          <div class="wealth-tile-sub" style="color: var(--success)">▲ ${inr(1180000)} in 24 months (7.4×)</div>
        </div>
        <div class="wealth-tile">
          <div class="wealth-tile-lbl">IDBI Bank Total</div>
          <div class="wealth-tile-val">${inrPlain(D.idbi.savings.balance + D.idbi.fds[0].amount)}</div>
          <div class="wealth-tile-sub">Savings + FD</div>
        </div>
        <div class="wealth-tile">
          <div class="wealth-tile-lbl">External via AA</div>
          <div class="wealth-tile-val">${inrPlain(growwValue + zerodhaValue + D.retirement.epfo.balance)}</div>
          <div class="wealth-tile-sub">Groww + Zerodha + EPFO</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">🏦 IDBI Bank Accounts</div>
        <div class="card-sub">Native</div>
        <table class="holdings-table">
          <thead><tr><th>Account</th><th>Number</th><th style="text-align:right">Balance</th><th style="text-align:right">Rate</th></tr></thead>
          <tbody>
            <tr><td class="sym">IDBI Savings A/c</td><td>${D.idbi.savings.number}</td><td class="val" style="text-align:right">${inrPlain(D.idbi.savings.balance)}</td><td class="val" style="text-align:right">${D.idbi.savings.interestRate}%</td></tr>
            <tr><td class="sym">Fixed Deposit (${D.idbi.fds[0].id})</td><td>${D.idbi.fds[0].tenureMonths} mo · matures ${D.idbi.fds[0].maturityDate}</td><td class="val" style="text-align:right">${inrPlain(D.idbi.fds[0].amount)}</td><td class="val" style="text-align:right">${D.idbi.fds[0].rate}%</td></tr>
            <tr><td class="sym">IDBI Aspire Card</td><td>XXXX ${D.idbi.creditCard.last4}</td><td class="val" style="text-align:right; color: var(--danger)">-${inrPlain(D.idbi.creditCard.outstandingBalance)}</td><td class="val" style="text-align:right; color: var(--danger)">${D.idbi.creditCard.apr}% APR</td></tr>
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">📈 Groww Mutual Funds <span class="aa-badge">via AA</span></div>
        <table class="holdings-table">
          <thead><tr><th>Fund</th><th style="text-align:right">Units</th><th style="text-align:right">NAV</th><th style="text-align:right">Value</th><th style="text-align:right">SIP/mo</th></tr></thead>
          <tbody>
            ${D.brokers.groww.holdings
              .map(
                (h) => `
              <tr>
                <td class="sym">${h.fund}</td>
                <td class="val" style="text-align:right">${h.units}</td>
                <td class="val" style="text-align:right">₹${h.nav}</td>
                <td class="val" style="text-align:right">${inrPlain(h.value)}</td>
                <td class="val" style="text-align:right">${inrPlain(h.sipMonthly)}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">📊 Zerodha Direct Equity <span class="aa-badge">via AA</span></div>
        <table class="holdings-table">
          <thead><tr><th>Symbol</th><th style="text-align:right">Qty</th><th style="text-align:right">Avg Buy</th><th style="text-align:right">LTP</th><th style="text-align:right">Value</th><th style="text-align:right">Change</th></tr></thead>
          <tbody>
            ${D.brokers.zerodha.stocks
              .map(
                (s) => `
              <tr>
                <td class="sym">${s.symbol}</td>
                <td class="val" style="text-align:right">${s.qty}</td>
                <td class="val" style="text-align:right">₹${s.avgBuyPrice}</td>
                <td class="val" style="text-align:right">₹${s.ltp}</td>
                <td class="val" style="text-align:right">${inrPlain(s.qty * s.ltp)}</td>
                <td class="val ${s.changePct >= 0 ? "pct-pos" : "pct-neg"}" style="text-align:right">${s.changePct >= 0 ? "+" : ""}${s.changePct}%</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-title">🌴 Retirement Corpus <span class="aa-badge">via AA</span></div>
        <table class="holdings-table">
          <thead><tr><th>Instrument</th><th style="text-align:right">Balance</th><th style="text-align:right">Monthly Contribution</th></tr></thead>
          <tbody>
            <tr><td class="sym">EPFO</td><td class="val" style="text-align:right">${inrPlain(D.retirement.epfo.balance)}</td><td class="val" style="text-align:right">${inrPlain(D.retirement.epfo.monthlyContribution)}</td></tr>
            <tr><td class="sym">NPS Tier-1</td><td class="val" style="text-align:right; color: var(--danger)">${inrPlain(D.retirement.nps.balance)}</td><td class="val" style="text-align:right"><span class="chip chip-warn">Not opened · ₹50K gap on 80CCD(1B)</span></td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  GOALS (Money Jars)
  // ═══════════════════════════════════════════════════════════════
  function renderGoals() {
    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Money Jars</div>
          <div class="view-subtitle">Long-term goals with time-based mental accounting</div>
        </div>
        <div class="view-actions">
          <button class="btn-primary btn-sm">+ New jar</button>
        </div>
      </div>

      <div class="jars-grid">
        ${D.jars
          .map(
            (j) => `
          <div class="jar-card">
            <div class="jar-card-header">
              <div class="jar-card-icon">${j.icon}</div>
              <div>
                <div class="jar-card-name">${j.name}</div>
                <div class="jar-card-date">Target: ${new Date(j.targetDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
              </div>
            </div>
            <div class="jar-visual">
              <div class="jar-visual-fill ${j.onTrack ? "on-track" : ""}" style="height: ${j.fillPct}%"></div>
              <div class="jar-visual-pct">${j.fillPct.toFixed(1)}%</div>
            </div>
            <div class="jar-stats">
              <div>
                <div class="jar-stat-lbl">Saved</div>
                <div class="jar-stat-val">${inr(j.currentAmount)}</div>
              </div>
              <div>
                <div class="jar-stat-lbl">Target</div>
                <div class="jar-stat-val">${inr(j.targetAmount)}</div>
              </div>
            </div>
            <div class="jar-sip-row">
              <div>SIP: <b>${inrPlain(j.monthlySIP)}/mo</b></div>
              ${
                j.recommendedSIP > j.monthlySIP
                  ? `<span class="chip chip-warn">Bump to ${inrPlain(j.recommendedSIP)} — you're ${j.shortfallPct}% behind</span>`
                  : `<span class="chip chip-success">On track</span>`
              }
            </div>
            ${
              j.recommendedSIP > j.monthlySIP
                ? `<button class="btn-primary btn-sm" style="width:100%; margin-top:12px" onclick="AryaWeb.doAction('SIP top-up', 'Home 2032 SIP bumped to ₹${j.recommendedSIP}/mo — catches up in 4 months.')">Bump SIP → ${inrPlain(j.recommendedSIP)}</button>`
                : ""
            }
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  BILL NEGOTIATOR
  // ═══════════════════════════════════════════════════════════════
  function renderBills() {
    const total = D.billWins.reduce((s, w) => s + w.yearlySaving, 0);

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Bill Negotiator <span class="chip chip-gold" style="vertical-align:middle">NEW v1</span></div>
          <div class="view-subtitle">One-tap bill cuts, powered by IDBI's product catalog</div>
        </div>
      </div>

      <div class="bills-hero">
        <div>
          <div class="bills-hero-lbl">Total savings identified</div>
          <div class="bills-hero-num">${inrPlain(total)}/yr</div>
          <div class="bills-hero-detail">${D.billWins.length} wins · zero effort · you approve each</div>
        </div>
        <button class="btn-secondary" onclick="AryaWeb.doAction('All 4 executed', '${total} saved. 3 non-discretionary flows sent for OTP.')">Approve all 4 →</button>
      </div>

      <div class="bills-grid">
        ${D.billWins
          .map(
            (w) => `
          <div class="bill-card">
            <div class="bill-card-head">
              <div class="bill-icon-wrap">${w.icon}</div>
              <div style="flex:1">
                <div class="bill-title">${w.title}</div>
                <div class="bill-saving">▼ ${inrPlain(w.yearlySaving)}/yr saved</div>
              </div>
            </div>
            <div class="bill-row current">
              <div class="bill-row-lbl">Current</div>
              <div class="bill-row-val">${w.currentDetail}</div>
            </div>
            <div class="bill-row new">
              <div class="bill-row-lbl">Arya recommends</div>
              <div class="bill-row-val">${w.newDetail}</div>
            </div>
            <div class="bill-why"><b>Why?</b> ${w.why}</div>
            <div class="bill-actions">
              <button class="btn-primary btn-sm" onclick="AryaWeb.doAction('${w.action} sent', '${escapeAttr(w.title)} · ${inrPlain(w.yearlySaving)}/yr saved')">${w.action}</button>
              <button class="btn-ghost btn-sm">Later</button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  CREDIT COACH
  // ═══════════════════════════════════════════════════════════════
  function renderCredit() {
    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Credit Coach <span class="chip chip-gold" style="vertical-align:middle">NEW v1</span></div>
          <div class="view-subtitle">Understand your CIBIL — and lift it fast</div>
        </div>
      </div>

      <div class="cibil-hero">
        <div>
          <div style="font-size: 13px; opacity: 0.75">Your CIBIL score today</div>
          <div style="display:flex; align-items:baseline; gap:12px">
            <div class="cibil-hero-score">${D.credit.score}</div>
            <div class="cibil-hero-scale">/ ${D.credit.scale}</div>
          </div>
          <div class="cibil-hero-band">${D.credit.band}</div>
        </div>
        <div class="cibil-projection">
          <div class="cibil-proj-lbl">Projected in 90 days</div>
          <div class="cibil-proj-val">${D.credit.projectedScore90d} <span style="font-size:14px; color: var(--gold-500)">▲ ${D.credit.projectedScore90d - D.credit.score}</span></div>
          <div class="cibil-proj-sub">By following the 3-step plan below · updated monthly</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="card-title">🔍 What's dragging your score</div>
        <div class="cibil-drags">
          ${D.credit.drags
            .map(
              (d) => `
            <div class="drag-item ${d.severity}">
              <div style="font-size:20px">${d.icon}</div>
              <div style="flex:1">${d.text}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <div class="card">
        <div class="card-title">🚀 3-step boost plan (~90 days)</div>
        <div class="cibil-plan">
          ${D.credit.plan
            .map(
              (p) => `
            <div class="cibil-plan-item">
              <div class="cibil-step-num">${p.step}</div>
              <div>${p.text}</div>
              <button class="btn-primary btn-sm" onclick="AryaWeb.doAction('${p.cta} confirmed', 'Step ${p.step} · ${escapeAttr(p.text)}')">${p.cta}</button>
            </div>
          `,
            )
            .join("")}
        </div>
        <button class="btn-secondary" style="margin-top: 16px" onclick="AryaWeb.doAction('60-day plan started', 'All 3 CIBIL steps queued. Projected 720 → 760.')">Start all 3 steps →</button>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  TAX
  // ═══════════════════════════════════════════════════════════════
  function renderTax() {
    const t = D.tax;

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Tax Optimizer</div>
          <div class="view-subtitle">${t.financialYear} · assumed slab ${t.slabAssumed}</div>
        </div>
      </div>

      <div class="tax-grid">
        ${taxCard("80C", t.sec80C.limit, t.sec80C.total, t.sec80C.remaining, t.sec80C.suggestion)}
        ${taxCard("80CCD(1B) · NPS", t.sec80CCD1B.limit, t.sec80CCD1B.used, t.sec80CCD1B.remaining, t.sec80CCD1B.suggestion)}
        ${taxCard("80D · Health", t.sec80D.limit, t.sec80D.used, t.sec80D.remaining, t.sec80D.suggestion)}
      </div>

      <div class="card">
        <div class="card-title">⚖️ Old vs New Regime</div>
        <div class="card-sub">Winner for you: <b style="color: var(--success)">${t.regime.winner.toUpperCase()} regime</b> · saves ${inrPlain(t.regime.saving)} this year</div>
        <div class="regime-picker">
          <div class="regime-option ${t.regime.winner === "old" ? "winner" : ""}">
            <div class="rgm-name">Old Regime</div>
            <div class="rgm-tax">${inrPlain(t.regime.old.tax)}</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top:4px">Deductions: ${inrPlain(t.regime.old.deductionsClaimed)}</div>
            <div class="rgm-tag">${t.regime.winner === "old" ? "✓ Winner" : ""}</div>
          </div>
          <div class="regime-option ${t.regime.winner === "new" ? "winner" : ""}">
            <div class="rgm-name">New Regime</div>
            <div class="rgm-tax">${inrPlain(t.regime.new.tax)}</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top:4px">Standard deduction only</div>
            <div class="rgm-tag">${t.regime.winner === "new" ? "✓ Winner · saves " + inrPlain(t.regime.saving) : ""}</div>
          </div>
        </div>
        <button class="btn-primary" style="margin-top:16px" onclick="AryaWeb.doAction('Regime locked in', 'FY 2026-27 declared: NEW regime · saving ${inrPlain(t.regime.saving)}')">Declare ${t.regime.winner.toUpperCase()} regime</button>
      </div>
    `;
  }

  function taxCard(label, limit, used, remaining, suggestion) {
    const pctUsed = Math.min(100, (used / limit) * 100);
    return `
      <div class="tax-card">
        <div class="tax-card-title">${label}</div>
        <div class="tax-card-limit">Annual limit: ${inrPlain(limit)}</div>
        <div class="tax-progress">
          <div class="tax-progress-fill ${pctUsed >= 100 ? "full" : ""}" style="width: ${pctUsed}%"></div>
        </div>
        <div class="tax-values">
          <div class="used">Used: ${inrPlain(used)}</div>
          <div class="remain">Left: ${inrPlain(remaining)}</div>
        </div>
        ${remaining > 0 ? `<div class="tax-suggest">💡 ${suggestion}</div>` : `<div class="tax-suggest" style="background: var(--success-bg); color: var(--success); border-color: var(--success)">✓ Fully used</div>`}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  PORTFOLIO DOCTOR
  // ═══════════════════════════════════════════════════════════════
  function renderPortfolio() {
    const pd = D.portfolioDoctor;

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Portfolio Doctor</div>
          <div class="view-subtitle">Drift, overlap, and rebalance advice across IDBI + Groww + Zerodha</div>
        </div>
      </div>

      <div class="portfolio-health">
        <div class="health-score-ring">
          ${healthRingSVG(pd.overallHealth)}
        </div>
        <div>
          <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.4px">Overall portfolio health</div>
          <div style="font-size: 32px; font-weight: 700; color: var(--navy-900); margin: 4px 0">${pd.overallHealth}/100</div>
          <div style="font-size: 13px; color: var(--text-secondary)">Improvable — 3 findings below. Fixing them takes you to <b style="color: var(--success)">86/100</b>.</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">🔬 Findings</div>
        ${pd.findings
          .map(
            (f) => `
          <div class="finding-item ${f.severity}">
            <div class="finding-title">${f.severity === "high" ? "🔴" : f.severity === "medium" ? "🟡" : "🟢"} ${f.finding}</div>
            <div class="finding-fix"><b>Arya suggests:</b> ${f.fix}</div>
            <button class="btn-primary btn-sm" style="margin-top:10px" onclick="AryaWeb.doAction('${f.cta} queued', '${escapeAttr(f.fix)}')">${f.cta}</button>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  STOCK ADVISOR
  // ═══════════════════════════════════════════════════════════════
  function renderStock() {
    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Stock Advisor</div>
          <div class="view-subtitle">SEBI-compliant · non-discretionary signals only</div>
        </div>
      </div>

      ${D.stockSignals
        .map(
          (s) => `
        <div class="stock-signal-card">
          <div class="stock-sym-row">
            <div class="stock-sym">${s.symbol}</div>
            <div class="stock-change ${s.change.startsWith("+") ? "pct-pos" : "pct-neg"}">${s.change}</div>
            <span class="chip chip-success" style="margin-left:auto">✓ SEBI compliant</span>
          </div>
          <div style="font-size:13.5px; color: var(--text-primary); line-height: 1.6">${s.msg}</div>
          <div class="stock-disclaimer"><b>Tax:</b> ${s.tax}</div>
          <button class="btn-primary btn-sm" style="margin-top:12px" onclick="AryaWeb.doAction('Deep-link sent', '${escapeAttr(s.cta)}')">${s.cta}</button>
          <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 10px; font-style: italic">
            Not a buy/sell recommendation. Consult a SEBI-registered advisor for individual trading decisions.
          </div>
        </div>
      `,
        )
        .join("")}
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  RETIREMENT
  // ═══════════════════════════════════════════════════════════════
  function renderRetirement() {
    const r = D.retirementPlan;

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Retirement Planner</div>
          <div class="view-subtitle">Aggregating EPFO + NPS + MF + FD into one corpus target</div>
        </div>
      </div>

      <div class="retire-hero">
        <div>
          <div style="font-size: 12px; opacity: 0.85; text-transform: uppercase; letter-spacing: 0.4px">Target at age 60</div>
          <div class="retire-target">${inr(r.targetAtAge60)}</div>
          <div class="retire-gap" style="margin-top: 4px">Currently on pace for ${inr(r.projectedAtCurrent)} · gap: <b>${inr(r.gap)}</b></div>
        </div>
        <div style="align-self: end">
          <div style="font-size: 12px; opacity: 0.85">Current corpus (EPFO only)</div>
          <div style="font-size: 24px; font-weight: 700">${inr(r.currentCorpus)}</div>
          <div style="font-size: 12px; opacity: 0.85; margin-top: 8px">Months to retirement</div>
          <div style="font-size: 24px; font-weight: 700">${r.monthsToRetirement}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">🎯 What closes the gap</div>
        <div style="padding: 16px; background: var(--navy-50); border-radius: 10px; border-left: 4px solid var(--gold-500); font-size: 14px; line-height: 1.7">
          <b>Arya's plan:</b> ${r.action}
        </div>
        <button class="btn-primary" style="margin-top: 16px" onclick="AryaWeb.doAction('NPS opening queued', '₹50K/yr auto-debit set up. Tax saving of ₹15,600 confirmed for FY 2026-27.')">Open NPS Tier-1 →</button>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  PURCHASE ADVISOR
  // ═══════════════════════════════════════════════════════════════
  function renderPurchase() {
    const p = D.purchaseAdvisor;

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Can I afford this?</div>
          <div class="view-subtitle">Purpose-weighted purchase decisions</div>
        </div>
      </div>

      <div class="purchase-item">
        <div class="purchase-emoji">📱</div>
        <div style="flex:1">
          <div class="purchase-title">${p.item}</div>
          <div class="purchase-price">${inrPlain(p.price)}</div>
        </div>
        <span class="chip chip-warn">Waiting on your intent</span>
      </div>

      <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px">
        Arya needs one input from you — <b>why do you want this?</b> Same purchase, three very different answers:
      </div>

      <div class="branches-grid">
        ${Object.entries(p.branches)
          .map(
            ([key, b]) => `
          <div class="branch-card ${b.verdict}">
            <div class="branch-tag">${b.verdict}</div>
            <div class="branch-purpose">"${b.purpose}"</div>
            <div class="branch-reco">${b.recommendation}</div>
            <div class="branch-plan">${b.plan}</div>
            <button class="btn-primary btn-sm" style="margin-top: 12px; width: 100%" onclick="AryaWeb.doAction('${b.cta} logged', '${escapeAttr(b.plan)}')">${b.cta}</button>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  SUBSCRIPTIONS
  // ═══════════════════════════════════════════════════════════════
  function renderSubscriptions() {
    const totalMonthly = D.subscriptions.reduce((s, x) => s + x.amount, 0);
    const unusedTotal = D.subscriptions
      .filter((x) => !x.used)
      .reduce((s, x) => s + x.amount, 0);

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Subscriptions</div>
          <div class="view-subtitle">${D.subscriptions.length} active · ${D.subscriptions.filter((x) => !x.used).length} unused (last 90 days)</div>
        </div>
      </div>

      <div class="wealth-grid" style="grid-template-columns: repeat(3, 1fr)">
        <div class="wealth-tile">
          <div class="wealth-tile-lbl">Monthly total</div>
          <div class="wealth-tile-val">${inrPlain(totalMonthly)}</div>
        </div>
        <div class="wealth-tile">
          <div class="wealth-tile-lbl">Yearly total</div>
          <div class="wealth-tile-val">${inrPlain(totalMonthly * 12)}</div>
        </div>
        <div class="wealth-tile" style="background: var(--danger-bg); border-color: var(--danger)">
          <div class="wealth-tile-lbl" style="color: var(--danger)">Unused / month</div>
          <div class="wealth-tile-val" style="color: var(--danger)">${inrPlain(unusedTotal)}</div>
          <div class="wealth-tile-sub" style="color: var(--danger)">= ${inrPlain(unusedTotal * 12)}/yr cancellable</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">All subscriptions</div>
        <div class="sub-table">
          ${D.subscriptions
            .map(
              (s) => `
            <div class="sub-row ${!s.used ? "unused" : ""}">
              <div class="sub-icon">${s.icon}</div>
              <div class="sub-name">${s.name}</div>
              <div class="sub-amount">${inrPlain(s.amount)}/mo</div>
              <div class="sub-status ${s.used ? "used" : "unused"}">${s.used ? "✓ Used" : "✗ Unused 90d"}</div>
              ${
                !s.used
                  ? `<button class="btn-primary btn-sm" onclick="AryaWeb.doAction('Cancellation queued', '${s.name} · ${inrPlain(s.amount * 12)}/yr saved')">Cancel</button>`
                  : `<button class="btn-ghost btn-sm">Keep</button>`
              }
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  MEMORY
  // ═══════════════════════════════════════════════════════════════
  function renderMemory() {
    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Arya's Memory</div>
          <div class="view-subtitle">Every decision · every reason · every outcome</div>
        </div>
      </div>

      <div class="trust-callout" style="margin-bottom: 24px">
        <div style="font-size: 14px; font-weight: 700; color: var(--navy-900); margin-bottom: 4px">🧠 Why memory matters</div>
        <div style="font-size: 13px; color: var(--text-secondary)">Arya remembers the <i>why</i> behind every past nudge — so 12 months later when your context changes, we adapt instead of forget. This is what makes Arya a trusted friend, not just another chatbot.</div>
      </div>

      <div class="memory-list">
        ${D.memory
          .map(
            (m) => `
          <div class="memory-item">
            <div class="memory-date">${m.date}</div>
            <div class="memory-note">${m.note}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  AGENTS
  // ═══════════════════════════════════════════════════════════════
  function renderAgents() {
    const groups = ["Personal Finance", "Investment", "Orchestration"];

    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Your 14 AI Agents</div>
          <div class="view-subtitle">Each agent is specialised. Together they form Arya.</div>
        </div>
      </div>

      ${groups
        .map(
          (group) => `
        <div class="agents-group-title">${group}</div>
        <div class="agents-grid">
          ${D.agents
            .filter((a) => a.group === group)
            .map(
              (a) => `
            <div class="agent-card">
              ${a.newV1 ? '<div class="agent-card-new">NEW v1</div>' : ""}
              <div class="agent-card-icon">${a.icon}</div>
              <div class="agent-card-name">${a.name}</div>
              <div class="agent-card-desc">${a.desc}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      `,
        )
        .join("")}
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  TRUST & COMPLIANCE
  // ═══════════════════════════════════════════════════════════════
  function renderTrust() {
    content.innerHTML = `
      <div class="view-header">
        <div>
          <div class="view-title">Trust & Compliance</div>
          <div class="view-subtitle">How Arya keeps you — and IDBI — safe</div>
        </div>
      </div>

      <div class="trust-callout">
        <div style="font-size: 15px; font-weight: 700; color: var(--navy-900); margin-bottom: 8px">🛡️ Our promise</div>
        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.7">
          Arya never executes anything on your behalf without a "Yes" from you. Every recommendation includes the reason, the disclaimer, and the underlying agent. All product suggestions come from IDBI's approved catalogue only. All investment recommendations comply with SEBI's non-discretionary rules.
        </div>
      </div>

      <div class="trust-item">
        <div class="trust-icon">🔒</div>
        <div>
          <div class="trust-title">Non-discretionary by design</div>
          <div class="trust-desc">Arya recommends. You approve. IDBI executes only after your confirmation. Every action requires OTP.</div>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">🏦</div>
        <div>
          <div class="trust-title">IDBI-approved products only</div>
          <div class="trust-desc">Every MF, FD, insurance and loan suggestion comes from the bank's regulator-approved catalogue. No third-party plugins, no affiliate fees.</div>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">⚖️</div>
        <div>
          <div class="trust-title">SEBI compliance guardrail</div>
          <div class="trust-desc">Compliance Guardrail agent reviews every investment suggestion before it reaches you. Zero guaranteed-return language. Every risk clearly disclosed.</div>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">🇮🇳</div>
        <div>
          <div class="trust-title">Account Aggregator (AA) framework</div>
          <div class="trust-desc">Groww, Zerodha, EPFO data pulled only via the RBI's AA framework — you consent, we access, we forget. No screen scraping. No password sharing.</div>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">🔍</div>
        <div>
          <div class="trust-title">Explainable AI — always</div>
          <div class="trust-desc">Every nudge has a "Why?" button that opens the exact data points, math, and cross-checks Arya used to make the recommendation.</div>
        </div>
      </div>
      <div class="trust-item">
        <div class="trust-icon">📄</div>
        <div>
          <div class="trust-title">Audit trail</div>
          <div class="trust-desc">Every conversation, every recommendation, every executed action is logged and downloadable — for you, for IDBI, for regulators.</div>
        </div>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  SVG HELPERS
  // ═══════════════════════════════════════════════════════════════
  function spendDonutSVG(cats) {
    const size = 180,
      cx = size / 2,
      cy = size / 2,
      r = 68,
      thickness = 22;
    let angle = -Math.PI / 2;
    const arcs = cats
      .map((c) => {
        const slice = (c.pct / 100) * Math.PI * 2;
        const x1 = cx + r * Math.cos(angle);
        const y1 = cy + r * Math.sin(angle);
        const x2 = cx + r * Math.cos(angle + slice);
        const y2 = cy + r * Math.sin(angle + slice);
        const large = slice > Math.PI ? 1 : 0;
        const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
        angle += slice;
        return `<path d="${path}" fill="none" stroke="${c.color}" stroke-width="${thickness}" stroke-linecap="butt"/>`;
      })
      .join("");

    return `
      <svg class="donut-svg" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        ${arcs}
        <text x="${cx}" y="${cy - 8}" text-anchor="middle" class="donut-center-lbl">Total spent</text>
        <text x="${cx}" y="${cy + 14}" text-anchor="middle" class="donut-center-val">${inr(D.spends.total)}</text>
      </svg>
    `;
  }

  function healthRingSVG(pct) {
    const size = 160,
      cx = size / 2,
      cy = size / 2,
      r = 65;
    const circumference = 2 * Math.PI * r;
    const offset = circumference * (1 - pct / 100);
    const color =
      pct >= 80
        ? "var(--success)"
        : pct >= 60
          ? "var(--warning)"
          : "var(--danger)";
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="14"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="14"
                stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" style="font-size:32px; font-weight:800; fill: var(--navy-900)">${pct}</text>
        <text x="${cx}" y="${cy + 18}" text-anchor="middle" style="font-size:11px; fill: var(--text-muted); text-transform: uppercase; letter-spacing: 0.4px">out of 100</text>
      </svg>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  CHAT ENGINE
  // ═══════════════════════════════════════════════════════════════
  function chatSubmit(e) {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = "";
    userSays(text);
  }

  function userSays(text) {
    addUserBubble(text);
    setTimeout(() => aryaSpeak(text), 350);
  }

  function addUserBubble(text) {
    const div = document.createElement("div");
    div.className = "bubble user";
    div.textContent = text;
    chatMessages.appendChild(div);
    scrollChat();
  }

  function typing(on) {
    const existing = document.getElementById("typingIndicator");
    if (existing) existing.remove();
    if (on) {
      const ti = document.createElement("div");
      ti.className = "typing-indicator";
      ti.id = "typingIndicator";
      ti.innerHTML =
        '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
      chatMessages.appendChild(ti);
      scrollChat();
    }
  }

  function aryaSpeak(userText) {
    typing(true);
    const script = D.chatScripts.find((s) => s.match.test(userText || ""));

    setTimeout(() => {
      typing(false);
      let delay = 0;
      script.bubbles.forEach((b, i) => {
        setTimeout(() => addAryaBubble(b), delay);
        delay +=
          350 +
          (b.type === "text" ? Math.min(60, (b.text || "").length) * 8 : 200);
      });
    }, 500);
  }

  function addAryaBubble(b) {
    const div = document.createElement("div");
    div.className = "bubble arya";
    if (b.type === "text") {
      div.innerHTML = b.text;
    } else if (b.type === "why") {
      div.className = "bubble why";
      div.innerHTML = `
        <div class="why-title">💡 ${b.title}</div>
        <ul class="why-list">${b.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      `;
    } else if (b.type === "list") {
      div.className = "bubble arya list-b";
      div.innerHTML = `<ul>${b.items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
    } else if (b.type === "action") {
      div.className = "bubble action";
      div.innerHTML = `
        <div>${b.label} <span style="opacity:0.7">→</span></div>
        <span class="agent-tag">🤖 ${b.agent}</span>
        <span class="action-disclaimer">${b.disclaimer}</span>
      `;
      div.onclick = () => doAction(b.label, "Executed with your approval");
    } else if (b.type === "choices") {
      div.className = "bubble choices-row";
      div.innerHTML = b.options
        .map(
          (o) =>
            `<button class="choice-btn" onclick="AryaWeb.choicePick('${o.value}', '${escapeAttr(o.label)}')">${o.label}</button>`,
        )
        .join("");
    }
    chatMessages.appendChild(div);
    scrollChat();
  }

  function choicePick(value, label) {
    addUserBubble(label);

    // Route intents to app tabs directly
    const routeMap = { money: "wealth", goal: "goals", goals: "goals" };
    if (routeMap[value]) {
      setTimeout(() => switchTab(routeMap[value]), 500);
      return;
    }

    // Purchase advisor branches
    if (["creator", "personal", "emergency"].includes(value)) {
      const b = D.purchaseAdvisor.branches[value];
      setTimeout(() => {
        typing(true);
        setTimeout(() => {
          typing(false);
          const verdictEmoji = { yes: "✅", reconsider: "🤔", warning: "⚠️" }[
            b.verdict
          ];
          addAryaBubble({
            type: "text",
            text: `${verdictEmoji} <b>${b.recommendation}</b>`,
          });
          setTimeout(() => addAryaBubble({ type: "text", text: b.plan }), 400);
          setTimeout(
            () =>
              addAryaBubble({
                type: "action",
                label: b.cta,
                agent: "Purchase Advisor + Goal Planner",
                disclaimer: "Non-discretionary. You approve; IDBI executes.",
              }),
            900,
          );
        }, 550);
      }, 300);
      return;
    }

    // Otherwise treat as a new user message
    setTimeout(() => aryaSpeak(value), 400);
  }

  function suggest(text) {
    chatInput.value = text;
    userSays(text);
  }

  function talkTo(prompt) {
    // Clear any auto-greeting race
    state.firstVisitToChat = false;
    userSays(prompt);
  }

  function clearChat() {
    chatMessages.innerHTML = "";
    state.firstVisitToChat = true;
    initChatGreeting();
  }

  function initChatGreeting() {
    if (!state.firstVisitToChat) return;
    state.firstVisitToChat = false;
    setTimeout(() => aryaSpeak("hi"), 400);
  }

  function scrollChat() {
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  LANGUAGE
  // ═══════════════════════════════════════════════════════════════
  function toggleLangMenu() {
    langMenu.hidden = !langMenu.hidden;
  }
  function pickLang(lang) {
    state.lang = lang;
    langLabel.textContent = lang.toUpperCase();
    document
      .querySelectorAll(".lang-opt")
      .forEach((o) => o.classList.toggle("active", o.dataset.lang === lang));
    langMenu.hidden = true;
    if (state.tab === "overview") render();
  }

  // ═══════════════════════════════════════════════════════════════
  //  ACTIONS / TOAST
  // ═══════════════════════════════════════════════════════════════
  let toastTimeout = null;
  function doAction(title, msg) {
    document.getElementById("toastTitle").textContent = title;
    document.getElementById("toastMsg").textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.hidden = true;
    }, 3600);
  }

  // ═══════════════════════════════════════════════════════════════
  //  HELPERS
  // ═══════════════════════════════════════════════════════════════
  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }
  function escapeAttr(s) {
    return String(s).replace(/'/g, "\\'").replace(/"/g, "&quot;");
  }

  // ═══════════════════════════════════════════════════════════════
  //  WIRE UP
  // ═══════════════════════════════════════════════════════════════
  navBtns.forEach((b) =>
    b.addEventListener("click", () => switchTab(b.dataset.tab)),
  );
  chatForm.addEventListener("submit", chatSubmit);
  document
    .querySelectorAll(".chip[data-suggest]")
    .forEach((c) =>
      c.addEventListener("click", () => suggest(c.dataset.suggest)),
    );
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLangMenu();
  });
  document
    .querySelectorAll(".lang-opt")
    .forEach((o) =>
      o.addEventListener("click", () => pickLang(o.dataset.lang)),
    );
  document.addEventListener("click", (e) => {
    if (!langMenu.contains(e.target) && !langBtn.contains(e.target))
      langMenu.hidden = true;
  });
  document.getElementById("clearChatBtn").addEventListener("click", clearChat);

  // Global keyboard shortcut ⌘K to focus search
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      document.querySelector(".global-search input").focus();
    }
  });

  // Expose API
  window.AryaWeb = { switchTab, doAction, talkTo, suggest, choicePick };

  // Initial render
  render();
  initChatGreeting();
})();
