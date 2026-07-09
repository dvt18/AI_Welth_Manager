/**
 * Arya — AI Wealth Advisor (IDBI Innovate 2026)
 * View router + chat engine + interactions.
 * No framework; vanilla JS for portability and demo speed.
 */

(function () {
  "use strict";

  const D = window.AryaData;
  const { inr, inrPlain, pct, netWorthTotal } = D.helpers;

  // ─── State ─────────────────────────────────────────────────────
  const state = {
    tab: "home",
    moreView: null, // when set (e.g. 'bill'), a sub-page is shown under More
    lang: "en",
    chatHistory: [], // array of { from: 'user'|'arya', bubbles: [...] }
    firstVisitToChat: true,
  };

  // ─── DOM ───────────────────────────────────────────────────────
  const root = document.getElementById("viewRoot");
  const headerTitle = document.getElementById("appHeaderTitle");
  const navBtns = document.querySelectorAll(".nav-btn");

  // ═══════════════════════════════════════════════════════════════
  //  ROUTER
  // ═══════════════════════════════════════════════════════════════
  function switchTab(tab, moreView = null) {
    state.tab = tab;
    state.moreView = moreView;
    navBtns.forEach((b) => {
      const active = b.dataset.tab === tab;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active);
    });
    root.scrollTop = 0;
    render();
  }

  function render() {
    root.innerHTML = "";
    switch (state.tab) {
      case "home":
        renderHome();
        headerTitle.textContent = "Home";
        break;
      case "wealth":
        renderWealth();
        headerTitle.textContent = "My Wealth";
        break;
      case "chat":
        renderChat();
        headerTitle.textContent = "Arya";
        break;
      case "goals":
        renderGoals();
        headerTitle.textContent = "Money Jars";
        break;
      case "more":
        if (state.moreView) renderMoreSubview(state.moreView);
        else {
          renderMoreMenu();
          headerTitle.textContent = "More";
        }
        break;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  HOME VIEW
  // ═══════════════════════════════════════════════════════════════
  function renderHome() {
    const total = netWorthTotal();
    const savings = D.idbi.savings.balance;
    const cc = D.idbi.creditCard;

    root.innerHTML = `
      <!-- Arya greeting hero -->
      <div class="arya-hero">
        <div class="arya-avatar-row">
          <div class="arya-avatar">${aryaOrbSVG(44)}</div>
          <div>
            <div class="arya-name">Arya</div>
            <div class="arya-status">online · listening</div>
          </div>
        </div>
        <p class="arya-msg">
          Good morning, <b>${D.customer.firstName}</b> 👋<br>
          I've spotted <b>3 wins</b> for you this morning — worth <b>₹30,400/yr</b> in your pocket. Want to see them?
        </p>
        <div class="hero-actions">
          <button class="btn-primary" onclick="Arya.talkTo('wins')">Show me the 3 wins</button>
          <button class="btn-ghost"   onclick="Arya.switchTab('chat')">Chat</button>
        </div>
      </div>

      <!-- Top 3 wins list -->
      <div class="section-h">
        <h2>Today's Wins</h2>
        <span class="chip chip-gold">Arya-detected</span>
      </div>
      <div class="win-card" onclick="Arya.doAction('Sweep-FD booked','₹4L moved to Sweep-FD @ 7.1%. First interest credit in 30 days.')">
        <div class="win-icon blue">💰</div>
        <div class="win-body">
          <div class="win-title">Sweep ₹4L idle savings → FD</div>
          <div class="win-sub">₹6L idle at 3% · Sweep-FD @ 7.1% · zero exit penalty</div>
        </div>
        <div class="win-save">+₹16,400/yr</div>
      </div>
      <div class="win-card" onclick="Arya.doAction('Card switch initiated','IDBI Aspire Lite balance transfer request created. e-KYC in 2 clicks.')">
        <div class="win-icon">💳</div>
        <div class="win-body">
          <div class="win-title">Switch credit card 42% → 24%</div>
          <div class="win-sub">Balance transfer to IDBI Aspire Lite · break-even 45 days</div>
        </div>
        <div class="win-save">+₹14,000/yr</div>
      </div>
      <div class="win-card" onclick="Arya.doAction('SIP top-up','Home 2032 SIP increased by ₹1,800/mo. New total: ₹16,800/mo. Auto-debit next Monday.')">
        <div class="win-icon green">🏠</div>
        <div class="win-body">
          <div class="win-title">Top-up Home 2032 SIP by ₹1,800</div>
          <div class="win-sub">3% behind pace · catches up in 4 months</div>
        </div>
        <div class="win-save">Goal on track</div>
      </div>

      <!-- Balance + net worth tiles -->
      <div class="section-h"><h2>Snapshot</h2><a href="#" onclick="Arya.switchTab('wealth');return false;">View all →</a></div>
      <div class="balance-card">
        <div class="balance-tile">
          <div class="balance-tile-label">IDBI Balance</div>
          <div class="balance-tile-value">${inrPlain(savings)}</div>
          <div class="balance-tile-delta up">+ Salary credited today</div>
        </div>
        <div class="balance-tile">
          <div class="balance-tile-label">Net worth</div>
          <div class="balance-tile-value">${inr(total)}</div>
          <div class="balance-tile-delta up">↑ 7.4× in 24 months</div>
        </div>
      </div>

      <!-- Quick actions grid -->
      <div class="section-h"><h2>Quick Actions</h2></div>
      <div class="quick-actions">
        <button class="qa-btn" onclick="Arya.switchTab('more','bill')">
          <span class="qa-icon">✂️</span><span class="qa-label">Cut my bills</span>
        </button>
        <button class="qa-btn" onclick="Arya.switchTab('more','credit')">
          <span class="qa-icon">📈</span><span class="qa-label">Boost CIBIL</span>
        </button>
        <button class="qa-btn" onclick="Arya.switchTab('more','tax')">
          <span class="qa-icon">🧮</span><span class="qa-label">Save tax</span>
        </button>
        <button class="qa-btn" onclick="Arya.switchTab('more','purchase')">
          <span class="qa-icon">🛒</span><span class="qa-label">Can I afford?</span>
        </button>
      </div>

      <!-- Nudges strip -->
      <div class="section-h"><h2>Recent Nudges</h2><span class="chip">Nudge Engine</span></div>
      <div class="card">
        <div class="row">
          <div>
            <div style="font-size:13px;font-weight:700;">🍽️ Dining spend +42% this month</div>
            <div class="mini" style="margin-top:4px;">You've hit 62% of your dining budget in week 1.</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="row">
          <div>
            <div style="font-size:13px;font-weight:700;">📈 Salary hike detected — ₹18K/mo more</div>
            <div class="mini" style="margin-top:4px;">Step up your SIPs by ₹2K → +₹18L to retirement corpus.</div>
          </div>
          <button class="btn-ghost" style="color:var(--navy-800);font-size:12px;" onclick="Arya.doAction('SIP step-up','SIP step-up by ₹2,000 scheduled. Applied across your top 3 SIPs.')">Do it</button>
        </div>
      </div>
      <div class="card">
        <div class="row">
          <div>
            <div style="font-size:13px;font-weight:700;">📈 TATAMOTORS up 45% — concentration alert</div>
            <div class="mini" style="margin-top:4px;">Now 45% of your equity. Consider booking partial profits.</div>
          </div>
          <button class="btn-ghost" style="color:var(--navy-800);font-size:12px;" onclick="Arya.switchTab('more','stock')">Review</button>
        </div>
      </div>

      <!-- Trust footer -->
      <div style="text-align:center;padding:16px 8px;font-size:10px;color:var(--ink-300);line-height:1.5;">
        🔒 All data stays inside IDBI's cloud · Consent-first (RBI AA) · Non-discretionary advice<br>
        Every recommendation is cited and audit-logged.
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  WEALTH VIEW
  // ═══════════════════════════════════════════════════════════════
  function renderWealth() {
    const nw = D.netWorth;
    const total = netWorthTotal();
    const stockValue = D.brokers.zerodha.stocks.reduce(
      (s, x) => s + x.qty * x.ltp,
      0,
    );
    const mfValue = D.brokers.groww.holdings.reduce((s, x) => s + x.value, 0);

    root.innerHTML = `
      <!-- Net worth hero -->
      <div class="wealth-hero">
        <div class="wealth-hero-label">Consolidated Net Worth</div>
        <div class="wealth-hero-value">${inr(total)}</div>
        <div class="wealth-hero-delta">↑ ${inrPlain(85000)} this month</div>
        <div class="aa-badge">🔒 IDBI + Groww + Zerodha + EPFO · via RBI-AA</div>
      </div>

      <!-- Assets list -->
      <div class="section-h"><h2>Where your money lives</h2></div>
      <div class="card card-flush">
        <div class="asset-row">
          <div class="asset-icon idbi">🏦</div>
          <div class="asset-body">
            <div class="asset-name">IDBI Savings</div>
            <div class="asset-sub">${D.idbi.savings.number} · ${D.idbi.savings.interestRate}% p.a.</div>
          </div>
          <div class="asset-value">${inrPlain(nw.idbiSavings)}</div>
        </div>
        <div class="asset-row">
          <div class="asset-icon idbi">📃</div>
          <div class="asset-body">
            <div class="asset-name">IDBI Fixed Deposit</div>
            <div class="asset-sub">${D.idbi.fds[0].rate}% · matures ${D.idbi.fds[0].maturityDate}</div>
          </div>
          <div class="asset-value">${inrPlain(nw.idbiFD)}</div>
        </div>
        <div class="asset-row">
          <div class="asset-icon">📈</div>
          <div class="asset-body">
            <div class="asset-name">Groww Mutual Funds</div>
            <div class="asset-sub">${D.brokers.groww.holdings.length} funds · SIP ₹5K/mo · via AA</div>
          </div>
          <div class="asset-value">${inrPlain(mfValue)}</div>
        </div>
        <div class="asset-row">
          <div class="asset-icon">📊</div>
          <div class="asset-body">
            <div class="asset-name">Zerodha Stocks</div>
            <div class="asset-sub">${D.brokers.zerodha.stocks.length} holdings · via AA</div>
          </div>
          <div class="asset-value">${inrPlain(stockValue)}</div>
        </div>
        <div class="asset-row">
          <div class="asset-icon">🌴</div>
          <div class="asset-body">
            <div class="asset-name">EPFO / Provident Fund</div>
            <div class="asset-sub">Auto-contribution ₹9,600/mo · via AA</div>
          </div>
          <div class="asset-value">${inrPlain(nw.epfo)}</div>
        </div>
        <div class="asset-row">
          <div class="asset-icon">🎗️</div>
          <div class="asset-body">
            <div class="asset-name">NPS (National Pension)</div>
            <div class="asset-sub">Not opened · ₹50K deduction unused (80CCD-1B)</div>
          </div>
          <div class="asset-value" style="color:var(--danger-500);">Open →</div>
        </div>
        <div class="asset-row">
          <div class="asset-icon" style="background:var(--danger-50);">💳</div>
          <div class="asset-body">
            <div class="asset-name">IDBI Aspire Card</div>
            <div class="asset-sub">62% utilisation · 42% APR · due 18 Jul</div>
          </div>
          <div class="asset-value neg">${inrPlain(nw.ccOutstanding)}</div>
        </div>
      </div>

      <!-- Spend Analyzer -->
      <div class="section-h">
        <h2>Where your money went <span style="text-transform:none;font-weight:400;color:var(--ink-500);font-size:12px;">(last 30 days)</span></h2>
        <span class="chip chip-warn">+${D.spends.monthOnMonthDelta}% MoM</span>
      </div>
      <div class="card">
        <div class="spend-donut-wrap">
          ${spendDonutSVG(D.spends.categories)}
          <div class="spend-legend">
            ${D.spends.categories
              .slice(0, 5)
              .map(
                (c) => `
              <div class="spend-legend-row">
                <span class="spend-legend-dot" style="background:${c.color};"></span>
                <span>${c.name} · ${pct(c.pct)}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
        <div style="margin-top:14px;">
          ${D.spends.categories
            .map(
              (c) => `
            <div class="spend-row">
              <div class="spend-cat-icon" style="background:${c.color}22;">${c.icon}</div>
              <div style="flex:1;">
                <div class="spend-cat-name">${c.name}</div>
                ${c.alert ? `<div class="spend-alert-tag">${c.alertMsg}</div>` : c.tag ? `<div class="mini" style="margin-top:2px;">${c.tag}</div>` : ""}
              </div>
              <div class="spend-cat-amt">${inrPlain(c.amount)}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <!-- Portfolio Doctor -->
      <div class="section-h"><h2>Portfolio Doctor</h2><span class="chip chip-warn">Health ${D.portfolioDoctor.overallHealth}/100</span></div>
      ${D.portfolioDoctor.findings
        .map(
          (f, i) => `
        <div class="finding-card">
          <div class="finding-severity ${f.severity}"></div>
          <div class="finding-body">
            <div class="finding-title">${f.finding}</div>
            <div class="finding-fix">${f.fix}</div>
            <button class="btn-primary btn-inline" style="width:auto;padding:8px 14px;font-size:12px;" onclick="Arya.doAction('${f.cta} scheduled','Portfolio Doctor recommendation queued. Confirm in Chat with Arya before execution.')">${f.cta}</button>
          </div>
        </div>
      `,
        )
        .join("")}

      <!-- Stock Advisor -->
      <div class="section-h"><h2>Stock Signals</h2><span class="chip">SEBI-compliant</span></div>
      ${D.stockSignals
        .map(
          (s) => `
        <div class="stock-signal">
          <div class="stock-symbol">${s.symbol}</div>
          <div style="flex:1;min-width:0;">
            <div class="row">
              <div class="stock-change up">${s.change}</div>
            </div>
            <div class="stock-msg">${s.msg}</div>
          </div>
        </div>
      `,
        )
        .join("")}
      <div class="mini" style="text-align:center;padding:6px 8px;line-height:1.5;">
        ⚠️ These are non-discretionary observations. Consult a SEBI-registered advisor for individual trades.
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  CHAT VIEW
  // ═══════════════════════════════════════════════════════════════
  function renderChat() {
    root.innerHTML = `
      <div class="chat-shell">
        <div class="chat-messages" id="chatMessages"></div>
        <div class="chat-suggestions" id="chatSuggestions">
          <button class="chat-sugg" onclick="Arya.suggest('Can I buy an iPhone?')">🛒 Can I buy an iPhone?</button>
          <button class="chat-sugg" onclick="Arya.suggest('How do I save tax?')">🧮 How do I save tax?</button>
          <button class="chat-sugg" onclick="Arya.suggest('Reduce my bills')">✂️ Reduce my bills</button>
          <button class="chat-sugg" onclick="Arya.suggest('Improve my CIBIL')">📈 Improve CIBIL</button>
          <button class="chat-sugg" onclick="Arya.suggest('Should I sell TATAMOTORS?')">📊 Sell TATAMOTORS?</button>
          <button class="chat-sugg" onclick="Arya.suggest('Am I on track for retirement?')">🌴 Retirement plan</button>
        </div>
        <form class="chat-composer" id="chatForm" onsubmit="return Arya.chatSubmit(event)">
          <input type="text" class="chat-input" id="chatInput" placeholder="${D.i18n[state.lang].askArya}" autocomplete="off" />
          <button class="chat-send" type="submit" aria-label="Send">➤</button>
        </form>
      </div>
    `;

    const box = document.getElementById("chatMessages");

    // Replay history OR seed initial greeting
    if (state.firstVisitToChat) {
      state.firstVisitToChat = false;
      state.chatHistory = [];
      setTimeout(() => aryaSpeak("hi", box), 300);
    } else {
      state.chatHistory.forEach((entry) => {
        if (entry.from === "user") addUserBubble(box, entry.text, false);
        else entry.bubbles.forEach((b) => addAryaBubble(box, b, false));
      });
      scrollChatToBottom();
    }
  }

  function chatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return false;
    input.value = "";
    userSays(text);
    return false;
  }

  function suggest(text) {
    userSays(text);
  }

  function userSays(text) {
    const box = document.getElementById("chatMessages");
    if (!box) return;
    state.chatHistory.push({ from: "user", text });
    addUserBubble(box, text, true);
    setTimeout(() => aryaSpeak(text, box), 500);
  }

  function aryaSpeak(userText, box) {
    // Match script by regex
    const script = D.chatScripts.find((s) => s.match.test(userText));
    if (!script) return;

    // Typing indicator
    const typingEl = document.createElement("div");
    typingEl.className = "bubble-arya-row";
    typingEl.innerHTML = `
      <div class="arya-mini-avatar">${aryaOrbSVG(20)}</div>
      <div class="typing"><span></span><span></span><span></span></div>
    `;
    box.appendChild(typingEl);
    scrollChatToBottom();

    setTimeout(() => {
      typingEl.remove();
      const bubbles = [];
      script.bubbles.forEach((b, i) => {
        setTimeout(() => {
          addAryaBubble(box, b, true);
          bubbles.push(b);
          if (i === script.bubbles.length - 1) {
            state.chatHistory.push({ from: "arya", bubbles });
          }
        }, i * 500);
      });
    }, 900);
  }

  function addUserBubble(box, text, animate) {
    const el = document.createElement("div");
    el.className = "bubble bubble-user";
    if (!animate) el.style.animation = "none";
    el.textContent = text;
    box.appendChild(el);
    scrollChatToBottom();
  }

  function addAryaBubble(box, b, animate) {
    const wrap = document.createElement("div");
    wrap.className = "bubble-arya-row";
    wrap.innerHTML = `<div class="arya-mini-avatar">${aryaOrbSVG(20)}</div>`;
    const bubble = document.createElement("div");
    bubble.className = "bubble bubble-arya";
    if (!animate) bubble.style.animation = "none";

    if (b.type === "text") {
      bubble.textContent = b.text;
      wrap.appendChild(bubble);
      box.appendChild(wrap);
    } else if (b.type === "why") {
      bubble.classList.add("why");
      bubble.innerHTML = `
        <h4>💡 ${b.title}</h4>
        <ul>${b.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
      `;
      wrap.appendChild(bubble);
      box.appendChild(wrap);
    } else if (b.type === "list") {
      bubble.innerHTML = `<ul style="margin:0;padding-left:18px;line-height:1.7;">${b.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
      wrap.appendChild(bubble);
      box.appendChild(wrap);
    } else if (b.type === "action") {
      bubble.classList.add("action-card");
      bubble.innerHTML = `
        <div class="agent-line">🤖 ${b.agent}</div>
        <button class="btn-primary" onclick="Arya.doAction('${escapeAttr(b.label)}','Recommendation approved. Bank action queued for execution.')">${b.label}</button>
        <div class="disclaimer">${b.disclaimer}</div>
      `;
      wrap.appendChild(bubble);
      box.appendChild(wrap);
    } else if (b.type === "choices") {
      const choices = document.createElement("div");
      choices.className = "chat-choices";
      choices.innerHTML = b.options
        .map(
          (o) => `
        <button class="chat-choice" onclick="Arya.choicePick('${escapeAttr(o.value)}','${escapeAttr(o.label)}')">${escapeHtml(o.label)}</button>
      `,
        )
        .join("");
      box.appendChild(choices);
    }
    scrollChatToBottom();
  }

  function choicePick(value, label) {
    const box = document.getElementById("chatMessages");
    if (!box) return;
    state.chatHistory.push({ from: "user", text: label });
    addUserBubble(box, label, true);

    // Direct-route choices to a specific tab
    const routeMap = {
      money: "wealth",
      goal: "goals",
      goals: "goals",
    };
    if (routeMap[value]) {
      setTimeout(() => switchTab(routeMap[value]), 300);
      return;
    }

    // Purchase Advisor branch answer
    if (["creator", "personal", "emergency"].includes(value)) {
      const branch = D.purchaseAdvisor.branches[value];
      setTimeout(() => {
        const typingEl = document.createElement("div");
        typingEl.className = "bubble-arya-row";
        typingEl.innerHTML = `<div class="arya-mini-avatar">${aryaOrbSVG(20)}</div><div class="typing"><span></span><span></span><span></span></div>`;
        box.appendChild(typingEl);
        scrollChatToBottom();
        setTimeout(() => {
          typingEl.remove();
          const b1 = { type: "text", text: `${branch.recommendation}` };
          const b2 = { type: "text", text: branch.plan };
          const b3 = {
            type: "action",
            label: branch.cta,
            agent: "Purchase Advisor + Goal Planner",
            disclaimer:
              "Non-discretionary. Numbers based on IDBI Aspire rates, current NAVs, and your 4-mo emergency-fund threshold.",
          };
          [b1, b2, b3].forEach((b, i) =>
            setTimeout(() => addAryaBubble(box, b, true), i * 500),
          );
          state.chatHistory.push({ from: "arya", bubbles: [b1, b2, b3] });
        }, 900);
      }, 300);
      return;
    }

    // Route other choices to keyword handler
    setTimeout(() => aryaSpeak(value, box), 400);
  }

  function scrollChatToBottom() {
    const box = document.getElementById("chatMessages");
    if (box) box.scrollTop = box.scrollHeight;
  }

  // ═══════════════════════════════════════════════════════════════
  //  GOALS / MONEY JARS
  // ═══════════════════════════════════════════════════════════════
  function renderGoals() {
    const totalTarget = D.jars.reduce((s, j) => s + j.targetAmount, 0);
    const totalCurrent = D.jars.reduce((s, j) => s + j.currentAmount, 0);
    const overallPct = (totalCurrent / totalTarget) * 100;

    root.innerHTML = `
      <div class="wealth-hero">
        <div class="wealth-hero-label">All Goals · Money Jars</div>
        <div class="wealth-hero-value">${inr(totalCurrent)} <span style="font-size:14px;opacity:0.6;">/ ${inr(totalTarget)}</span></div>
        <div class="wealth-hero-delta">${overallPct.toFixed(1)}% funded across ${D.jars.length} jars</div>
      </div>

      ${D.jars
        .map(
          (j) => `
        <div class="jar-card">
          <div class="jar-header">
            <div class="jar-icon">${j.icon}</div>
            <div style="flex:1;">
              <div class="jar-name">${j.name}</div>
              <div class="jar-target">Target: ${inr(j.targetAmount)} by ${j.targetDate.slice(0, 4)}</div>
            </div>
            <span class="chip ${j.onTrack ? "chip-success" : "chip-warn"}">${j.onTrack ? "On track" : `${j.shortfallPct}% behind`}</span>
          </div>
          ${jarSVG(j.fillPct)}
          <div class="bar" style="margin:8px 0 4px;"><div class="bar-fill ${j.onTrack ? "success" : ""}" style="width:${Math.max(j.fillPct, 2)}%"></div></div>
          <div class="jar-stats">
            <div><div class="jar-stat-label">Saved</div><div class="jar-stat-value">${inr(j.currentAmount)}</div></div>
            <div><div class="jar-stat-label">SIP</div><div class="jar-stat-value">${inrPlain(j.monthlySIP)}/mo</div></div>
            <div><div class="jar-stat-label">${j.onTrack ? "Rec. SIP" : "Should be"}</div><div class="jar-stat-value" style="color:${j.onTrack ? "var(--success-500)" : "var(--warn-500)"};">${inrPlain(j.recommendedSIP)}/mo</div></div>
          </div>
          ${
            j.onTrack
              ? ""
              : `
            <div class="jar-ai-note">
              <b>💡 Arya says:</b> Top-up your SIP by <b>${inrPlain(j.recommendedSIP - j.monthlySIP)}/mo</b> to catch up in 4 months. Impact of skip: goal delayed by 8 months.
            </div>
            <button class="btn-primary" onclick="Arya.doAction('SIP top-up','${j.name} SIP increased to ${inrPlain(j.recommendedSIP)}/mo. Auto-debit next Monday.')">Top up SIP by ${inrPlain(j.recommendedSIP - j.monthlySIP)}</button>
          `
          }
        </div>
      `,
        )
        .join("")}

      <button class="btn-secondary" style="margin-top:16px;" onclick="Arya.doAction('Add goal','Goal creation wizard opened. Choose a template or start blank.')">➕ Add a new goal</button>

      <div class="mini" style="text-align:center;padding:12px 8px;">
        Money Jars are Arya-managed visual goal buckets. Each jar's SIP recommendation refreshes with salary hikes, life events, and portfolio drift.
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  MORE MENU
  // ═══════════════════════════════════════════════════════════════
  function renderMoreMenu() {
    const items = [
      {
        id: "bill",
        icon: "✂️",
        title: "Bill Negotiator",
        sub: "4 wins · Save ₹48,760/yr",
        new: true,
      },
      {
        id: "credit",
        icon: "📈",
        title: "Credit Coach",
        sub: "CIBIL 720 · plan to 760",
        new: true,
      },
      {
        id: "tax",
        icon: "🧮",
        title: "Tax Optimizer",
        sub: "80C · regime · NPS gap",
      },
      {
        id: "purchase",
        icon: "🛒",
        title: "Can I afford this?",
        sub: "Purchase Advisor",
      },
      {
        id: "retire",
        icon: "🌴",
        title: "Retirement Planner",
        sub: "Corpus + gap projection",
      },
      {
        id: "stock",
        icon: "📊",
        title: "Stock Advisor",
        sub: "Signals · concentration checks",
      },
      {
        id: "subs",
        icon: "📺",
        title: "Subscription Audit",
        sub: "11 detected · 3 unused",
      },
      {
        id: "memory",
        icon: "🧠",
        title: "Persistent Memory",
        sub: "What Arya remembers about you",
      },
      {
        id: "agents",
        icon: "🤖",
        title: "AI Agents (14)",
        sub: "How Arya thinks — Slide 15 view",
      },
      {
        id: "trust",
        icon: "🔒",
        title: "Trust & Compliance",
        sub: "Consent · audit · disclaimers",
      },
    ];
    root.innerHTML = `
      <div class="section-h"><h2>Everything else Arya can do</h2></div>
      ${items
        .map(
          (i) => `
        <button class="more-list-item" onclick="Arya.switchTab('more','${i.id}')">
          <div class="more-icon">${i.icon}</div>
          <div class="more-body">
            <div class="more-title">${i.title}${i.new ? '<span class="agent-new-badge">NEW</span>' : ""}</div>
            <div class="more-sub">${i.sub}</div>
          </div>
          <div class="more-caret">›</div>
        </button>
      `,
        )
        .join("")}
    `;
  }

  function renderMoreSubview(id) {
    const titles = {
      bill: "Bill Negotiator",
      credit: "Credit Coach",
      tax: "Tax Optimizer",
      purchase: "Can I afford this?",
      retire: "Retirement Planner",
      stock: "Stock Advisor",
      subs: "Subscription Audit",
      memory: "What Arya Remembers",
      agents: "AI Agents",
      trust: "Trust & Compliance",
    };
    headerTitle.innerHTML = `<button class="btn-ghost" style="padding:4px 8px;font-size:14px;" onclick="Arya.switchTab('more')">‹ More</button> ${titles[id] || ""}`;

    switch (id) {
      case "bill":
        renderBillNegotiator();
        break;
      case "credit":
        renderCreditCoach();
        break;
      case "tax":
        renderTaxOptimizer();
        break;
      case "purchase":
        renderPurchaseAdvisor();
        break;
      case "retire":
        renderRetirement();
        break;
      case "stock":
        renderStockAdvisor();
        break;
      case "subs":
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
      default:
        renderMoreMenu();
    }
  }

  // ─── Bill Negotiator ────────────────────────────────
  function renderBillNegotiator() {
    const total = D.billWins.reduce((s, w) => s + w.yearlySaving, 0);
    root.innerHTML = `
      <div class="savings-hero">
        <div class="savings-hero-label">Money Arya can put back in your pocket</div>
        <div class="savings-hero-value">${inrPlain(total)}/yr</div>
        <div class="savings-hero-sub">${D.billWins.length} negotiable wins detected</div>
      </div>

      ${D.billWins
        .map(
          (w) => `
        <div class="bill-card">
          <div class="bill-header">
            <div class="bill-icon">${w.icon}</div>
            <div class="bill-title">${w.title}</div>
            <div class="bill-yearly-save">Save ${inrPlain(w.yearlySaving)}/yr</div>
          </div>
          <div class="bill-compare">
            <div class="bill-side">
              <div class="bill-side-label">Now</div>
              <div class="bill-side-value strike">${w.currentDetail}</div>
            </div>
            <div class="bill-arrow">→</div>
            <div class="bill-side new">
              <div class="bill-side-label">After</div>
              <div class="bill-side-value">${w.newDetail}</div>
            </div>
          </div>
          <div class="bill-why">${w.why}</div>
          <button class="btn-primary" onclick="Arya.doAction('${w.action}','${w.title}: request logged. IDBI executes; you approve final terms in-app.')">${w.action}</button>
        </div>
      `,
        )
        .join("")}

      <div class="mini" style="text-align:center;padding:12px 8px;line-height:1.5;">
        🛡️ Bill Negotiator only recommends from IDBI's approved product catalog. Non-discretionary — you approve every switch.
      </div>
    `;
  }

  // ─── Credit Coach ───────────────────────────────────
  function renderCreditCoach() {
    const c = D.credit;
    const scorePct = (c.score / c.scale) * 100;
    root.innerHTML = `
      <div class="cibil-hero">
        <div class="cibil-score">${c.score}</div>
        <div class="cibil-band">${c.band} · out of ${c.scale}</div>
        <div class="cibil-gauge">
          <div class="cibil-gauge-bar"></div>
          <div class="cibil-gauge-marker" style="left:${scorePct}%;">
            <div class="cibil-gauge-marker-dot"></div>
          </div>
          <div class="cibil-gauge-scale">
            <span>Poor</span><span>Fair</span><span>Good</span><span>Excellent</span>
          </div>
        </div>
        <div class="cibil-projected">
          Projected in 90 days: <b>${c.projectedScore90d}</b> if you follow the plan below
        </div>
      </div>

      <div class="section-h"><h2>Top drags on your score</h2></div>
      <div class="card">
        ${c.drags
          .map(
            (d) => `
          <div class="drag-item">
            <span>${d.icon}</span>
            <span>${d.text}</span>
          </div>
        `,
          )
          .join("")}
      </div>

      <div class="section-h"><h2>Arya's 60-day boost plan</h2></div>
      ${c.plan
        .map(
          (step) => `
        <div class="plan-step">
          <div class="plan-step-num">${step.step}</div>
          <div class="plan-step-text">${step.text}</div>
          <button class="btn-inline" onclick="Arya.doAction('${step.cta}','Step ${step.step}: ${step.text}. Action queued.')">${step.cta}</button>
        </div>
      `,
        )
        .join("")}

      <div class="mini" style="text-align:center;padding:12px 8px;line-height:1.5;">
        CIBIL data refreshed via AA every 30 days. Projected boost is illustrative — actual score depends on lender reporting cycles.
      </div>
    `;
  }

  // ─── Tax Optimizer ──────────────────────────────────
  function renderTaxOptimizer() {
    const t = D.tax;
    const oldW = t.regime.winner === "old";
    const newW = t.regime.winner === "new";
    root.innerHTML = `
      <div class="wealth-hero">
        <div class="wealth-hero-label">${t.financialYear} · Slab ${t.slabAssumed}</div>
        <div class="wealth-hero-value">Save ${inrPlain(t.regime.saving + 6840 + 15600)}</div>
        <div class="wealth-hero-delta">Regime switch + 80C top-up + NPS</div>
      </div>

      <div class="section-h"><h2>Old vs New Regime</h2><span class="chip chip-success">${t.regime.winner.toUpperCase()} wins</span></div>
      <div class="section-tile">
        <div class="regime-picker">
          <div class="regime-tile ${oldW ? "winner" : ""}">
            <div class="regime-name">Old Regime</div>
            <div class="regime-tax">${inrPlain(t.regime.old.tax)}</div>
            ${oldW ? '<div class="winner-badge">RECOMMENDED</div>' : ""}
            <div class="mini" style="margin-top:4px;">₹${(t.regime.old.deductionsClaimed / 1000).toFixed(0)}K deductions</div>
          </div>
          <div class="regime-tile ${newW ? "winner" : ""}">
            <div class="regime-name">New Regime</div>
            <div class="regime-tax">${inrPlain(t.regime.new.tax)}</div>
            ${newW ? '<div class="winner-badge">RECOMMENDED</div>' : ""}
            <div class="mini" style="margin-top:4px;">No deductions</div>
          </div>
        </div>
        <div class="jar-ai-note">
          <b>💡 Arya says:</b> Your standard deduction + PF is under ₹1.5L this year, so NEW regime saves ₹${(t.regime.saving / 1000).toFixed(1)}K. As your 80C usage grows, revisit.
        </div>
      </div>

      <div class="section-h"><h2>Section 80C · ₹1.5L limit</h2></div>
      <div class="section-tile">
        <div class="tile-metric">
          <div class="tile-metric-value">${inrPlain(t.sec80C.total)}</div>
          <div class="tile-metric-of">/ ${inrPlain(t.sec80C.limit)} used</div>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${(t.sec80C.total / t.sec80C.limit) * 100}%"></div></div>
        <div style="margin-top:12px;font-size:12px;color:var(--ink-500);line-height:1.6;">
          PF: ${inrPlain(t.sec80C.usedByPF)} · LIC: ${inrPlain(t.sec80C.usedByLIC)} · ELSS: ${inrPlain(t.sec80C.usedByELSS)}
        </div>
        <div class="jar-ai-note">
          <b>💡 ${inrPlain(t.sec80C.remaining)} left.</b> ${t.sec80C.suggestion}
        </div>
        <button class="btn-primary" onclick="Arya.doAction('ELSS SIP started','₹1,900 ELSS SIP mandate created. Tax saving locked in for 3-year period.')">Start ₹1,900 ELSS SIP</button>
      </div>

      <div class="section-h"><h2>Section 80CCD(1B) · NPS · ₹50K extra</h2></div>
      <div class="section-tile" style="border:2px dashed var(--gold-500);">
        <div class="tile-metric">
          <div class="tile-metric-value" style="color:var(--danger-500);">${inrPlain(t.sec80CCD1B.used)}</div>
          <div class="tile-metric-of">of ${inrPlain(t.sec80CCD1B.limit)} — <b style="color:var(--warn-500);">100% unused</b></div>
        </div>
        <div class="jar-ai-note">
          <b>💡 Big miss.</b> ${t.sec80CCD1B.suggestion}
        </div>
        <button class="btn-primary" onclick="Arya.doAction('NPS Tier-1 opened','NPS Tier-1 e-KYC started. First contribution ₹50,000 via IDBI. Auto-tagged 80CCD(1B).')">Open NPS + Save ₹15,600</button>
      </div>

      <div class="section-h"><h2>Section 80D · Health insurance</h2></div>
      <div class="section-tile">
        <div class="tile-metric">
          <div class="tile-metric-value">${inrPlain(t.sec80D.used)}</div>
          <div class="tile-metric-of">/ ${inrPlain(t.sec80D.limit)} used</div>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${(t.sec80D.used / t.sec80D.limit) * 100}%"></div></div>
        <div class="jar-ai-note">
          <b>💡</b> ${t.sec80D.suggestion}
        </div>
      </div>

      <div class="mini" style="text-align:center;padding:12px 8px;line-height:1.5;">
        Tax math is deterministic — no LLM used for numbers. Consult a CA for personalised advice.
      </div>
    `;
  }

  // ─── Purchase Advisor ───────────────────────────────
  function renderPurchaseAdvisor() {
    const p = D.purchaseAdvisor;
    root.innerHTML = `
      <div class="arya-hero" style="margin-bottom:12px;">
        <div class="arya-avatar-row">
          <div class="arya-avatar">${aryaOrbSVG(44)}</div>
          <div>
            <div class="arya-name">Arya · Purchase Advisor</div>
            <div class="arya-status">Same question, three answers</div>
          </div>
        </div>
        <p class="arya-msg">
          <b>You asked:</b> "Can I buy the <b>${p.item}</b> (${inrPlain(p.price)})?"<br><br>
          I ask back — <b>what will you use it mostly for?</b> That's what changes the math. Three purposes → three answers.
        </p>
      </div>

      ${Object.entries(p.branches)
        .map(
          ([key, br]) => `
        <div class="purchase-branch">
          <span class="branch-tag ${br.verdict}">${br.verdict}</span>
          <div class="branch-purpose">"${br.purpose}"</div>
          <div class="branch-body"><b>Arya:</b> ${br.recommendation}</div>
          <div class="branch-plan">${br.plan}</div>
          <button class="btn-secondary" style="width:auto;padding:8px 16px;" onclick="Arya.doAction('${br.cta}','Purchase Advisor logged your intent. Next step: IDBI card / SIP mandate wizard.')">${br.cta}</button>
        </div>
      `,
        )
        .join("")}

      <div class="mini" style="text-align:center;padding:12px 8px;line-height:1.5;">
        This is what "AI advisor" actually means — not a chatbot that answers, but one that asks the right question first, then does the math against your goals, buffer, and purpose.
      </div>
    `;
  }

  // ─── Retirement Planner ─────────────────────────────
  function renderRetirement() {
    const r = D.retirementPlan;
    root.innerHTML = `
      <div class="wealth-hero">
        <div class="wealth-hero-label">Retirement corpus @ 60</div>
        <div class="wealth-hero-value">${inr(r.projectedAtCurrent)}</div>
        <div class="wealth-hero-delta">Target: ${inr(r.targetAtAge60)} · Gap: ${inr(r.gap)}</div>
      </div>

      <div class="section-h"><h2>Corpus builders</h2></div>
      <div class="card card-flush">
        <div class="asset-row">
          <div class="asset-icon">🌴</div>
          <div class="asset-body">
            <div class="asset-name">EPFO / PF</div>
            <div class="asset-sub">${inrPlain(D.retirement.epfo.monthlyContribution)}/mo · projects to ~${inr(28000000)} at 60</div>
          </div>
          <div class="asset-value">${inrPlain(D.retirement.epfo.balance)}</div>
        </div>
        <div class="asset-row">
          <div class="asset-icon" style="background:var(--warn-50);">🎗️</div>
          <div class="asset-body">
            <div class="asset-name">NPS (not opened)</div>
            <div class="asset-sub">Adds ~₹1.6Cr + ₹15,600/yr tax if you start now</div>
          </div>
          <div class="asset-value" style="color:var(--warn-500);">₹0</div>
        </div>
        <div class="asset-row">
          <div class="asset-icon">📈</div>
          <div class="asset-body">
            <div class="asset-name">Groww MF SIPs</div>
            <div class="asset-sub">₹5,000/mo · projects to ~${inr(6500000)} at 60</div>
          </div>
          <div class="asset-value">${inrPlain(D.brokers.groww.holdings.reduce((s, x) => s + x.value, 0))}</div>
        </div>
      </div>

      <div class="jar-ai-note" style="margin-top:16px;">
        <b>💡 Arya says:</b> ${r.action}
      </div>
      <button class="btn-primary" onclick="Arya.switchTab('more','tax')">Open NPS via Tax Optimizer →</button>
    `;
  }

  // ─── Stock Advisor ──────────────────────────────────
  function renderStockAdvisor() {
    const stocks = D.brokers.zerodha.stocks;
    const totalValue = stocks.reduce((s, x) => s + x.qty * x.ltp, 0);
    root.innerHTML = `
      <div class="wealth-hero">
        <div class="wealth-hero-label">Zerodha holdings (via AA)</div>
        <div class="wealth-hero-value">${inrPlain(totalValue)}</div>
        <div class="wealth-hero-delta">${stocks.length} holdings</div>
      </div>

      <div class="section-h"><h2>Your positions</h2></div>
      ${stocks
        .map((s) => {
          const value = s.qty * s.ltp;
          const pctOfPortfolio = ((value / totalValue) * 100).toFixed(1);
          return `
          <div class="stock-signal">
            <div class="stock-symbol">${s.symbol}</div>
            <div style="flex:1;min-width:0;">
              <div class="row">
                <div style="font-weight:700;font-size:13px;">${s.qty} shares · ${inrPlain(value)}</div>
                <div class="stock-change ${s.changePct >= 0 ? "up" : "down"}">${s.changePct >= 0 ? "+" : ""}${s.changePct}%</div>
              </div>
              <div class="stock-msg">Avg ₹${s.avgBuyPrice} · LTP ₹${s.ltp} · ${pctOfPortfolio}% of equity</div>
            </div>
          </div>
        `;
        })
        .join("")}

      <div class="section-h"><h2>Arya's signals</h2></div>
      ${D.stockSignals
        .map(
          (s) => `
        <div class="finding-card">
          <div class="finding-severity ${s.symbol === "TATAMOTORS" ? "medium" : "low"}"></div>
          <div class="finding-body">
            <div class="finding-title">${s.symbol} · ${s.change}</div>
            <div class="finding-fix">${s.msg}<br><br><i>${s.tax}</i></div>
            <button class="btn-primary btn-inline" style="width:auto;padding:8px 14px;font-size:12px;" onclick="Arya.doAction('${s.cta}','Deep-link opened. Arya does not execute trades — Zerodha handles the sell order.')">${s.cta}</button>
          </div>
        </div>
      `,
        )
        .join("")}

      <div class="mini" style="text-align:center;padding:12px 8px;line-height:1.5;">
        ⚠️ These are non-discretionary observations. Arya never gives buy/sell recommendations. No intraday, no F&O. SEBI-compliant by design.
      </div>
    `;
  }

  // ─── Subscription Audit ─────────────────────────────
  function renderSubscriptions() {
    const total = D.subscriptions.reduce((s, x) => s + x.amount, 0);
    const unused = D.subscriptions.filter((x) => !x.used);
    const wasted = unused.reduce((s, x) => s + x.amount, 0);
    root.innerHTML = `
      <div class="savings-hero">
        <div class="savings-hero-label">Monthly subscription bleed</div>
        <div class="savings-hero-value">${inrPlain(total)}/mo</div>
        <div class="savings-hero-sub">${unused.length} unused = ${inrPlain(wasted * 12)}/yr wasted</div>
      </div>
      ${D.subscriptions
        .map(
          (s) => `
        <div class="sub-row ${!s.used ? "unused" : ""}">
          <div class="sub-icon">${s.icon}</div>
          <div class="sub-name">${s.name}</div>
          <div class="sub-amt">${inrPlain(s.amount)}/mo</div>
          <div class="sub-status ${s.used ? "used" : "unused"}">${s.used ? "Used" : "90 days idle"}</div>
        </div>
      `,
        )
        .join("")}
      <button class="btn-primary" style="margin-top:12px;" onclick="Arya.doAction('Unused subs cancelled','3 unused subscriptions cancelled. ₹897/mo returns to your account.')">Cancel ${unused.length} unused · save ${inrPlain(wasted)}/mo</button>
    `;
  }

  // ─── Memory ─────────────────────────────────────────
  function renderMemory() {
    root.innerHTML = `
      <div class="section-h"><h2>What Arya remembers about you</h2><span class="chip chip-gold">Encrypted · in-VPC</span></div>
      <div class="card">
        <p class="small" style="line-height:1.6;margin:0 0 12px;">
          Arya keeps a private, encrypted memory of your past questions, anxieties, and wins — so every conversation feels like it's continuing, not restarting. Unlike Replika, we don't gamify or badge. Wealth is serious.
        </p>
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
      <button class="btn-secondary" onclick="Arya.doAction('Memory reviewed','Full memory log opened. You can delete any entry — DPDP-compliant right to erasure.')">Review full memory log</button>
    `;
  }

  // ─── Agents ─────────────────────────────────────────
  function renderAgents() {
    const groups = ["Personal Finance", "Investment", "Orchestration"];
    root.innerHTML = `
      <div class="section-h"><h2>The 14 specialist agents behind Arya</h2></div>
      <p class="small" style="padding:0 4px 8px;">Every recommendation you see is the output of one or more agents. The Compliance Guardrail sits over all of them.</p>

      ${groups
        .map(
          (group) => `
        <div class="agent-group-h">${group}</div>
        ${D.agents
          .filter((a) => a.group === group)
          .map(
            (a) => `
          <div class="agent-tile">
            <div class="agent-icon">${a.icon}</div>
            <div style="flex:1;">
              <div class="agent-name">${a.name} ${["billnegot", "creditcoach"].includes(a.id) ? '<span class="agent-new-badge">NEW v1</span>' : ""}</div>
              <div class="agent-desc">${a.desc}</div>
            </div>
          </div>
        `,
          )
          .join("")}
      `,
        )
        .join("")}

      <div class="mini" style="text-align:center;padding:12px 8px;line-height:1.5;">
        Orchestrated with LangGraph. Only agents relevant to a trigger fire — fast + cheap (~₹5–8/user/month LLM cost).
      </div>
    `;
  }

  // ─── Trust & Compliance ─────────────────────────────
  function renderTrust() {
    root.innerHTML = `
      <div class="section-h"><h2>How Arya keeps you safe</h2></div>
      <div class="card">
        <div class="drag-item"><span>🔒</span><span><b>Zero data egress.</b> Private-hosted LLM inside IDBI's VPC. Nothing leaves the bank.</span></div>
        <div class="drag-item"><span>✅</span><span><b>Consent-first.</b> Every AA fetch is logged with a purpose + expiry — DPDP-compliant.</span></div>
        <div class="drag-item"><span>📝</span><span><b>Full replay.</b> Every recommendation is audit-logged with model version + inputs. Regulator-replay in one click.</span></div>
        <div class="drag-item"><span>👋</span><span><b>Non-discretionary.</b> Arya suggests, you approve, bank executes. Zero auto-trading.</span></div>
        <div class="drag-item"><span>🛡️</span><span><b>Compliance Guardrail agent</b> sits over every recommendation — SEBI disclaimers auto-appended, no "guaranteed returns".</span></div>
        <div class="drag-item"><span>🚫</span><span><b>No dark-pattern nudges.</b> Arya never uses AA data to nudge overspend. No "you have ₹8K to spend now" messages.</span></div>
        <div class="drag-item"><span>🎮</span><span><b>No gamification.</b> No badges, streaks, or celebrations. Wealth is serious.</span></div>
      </div>

      <div class="section-h"><h2>Your data rights</h2></div>
      <button class="more-list-item" onclick="Arya.doAction('Data consent viewed','Consent dashboard opened. Revoke any FIP consent in one tap.')">
        <div class="more-icon">📋</div>
        <div class="more-body">
          <div class="more-title">View my consents</div>
          <div class="more-sub">See what Arya has access to · revoke anytime</div>
        </div>
        <div class="more-caret">›</div>
      </button>
      <button class="more-list-item" onclick="Arya.doAction('Data export requested','Data export requested. Encrypted archive ready in 48 hours.')">
        <div class="more-icon">📥</div>
        <div class="more-body">
          <div class="more-title">Export my data</div>
          <div class="more-sub">Download everything Arya knows about you</div>
        </div>
        <div class="more-caret">›</div>
      </button>
      <button class="more-list-item" onclick="Arya.doAction('Right to erasure','Erasure request logged. DPDP Act §12 — 30 day window applies.')">
        <div class="more-icon">🗑️</div>
        <div class="more-body">
          <div class="more-title">Delete my Arya history</div>
          <div class="more-sub">DPDP right to erasure</div>
        </div>
        <div class="more-caret">›</div>
      </button>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  //  SVG helpers
  // ═══════════════════════════════════════════════════════════════
  function aryaOrbSVG(size = 40) {
    return `<svg viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true">
      <defs>
        <radialGradient id="orbGrad-${size}" cx="30%" cy="30%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
          <stop offset="60%" stop-color="#FFD34E" />
          <stop offset="100%" stop-color="#F2A900" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#orbGrad-${size})" />
      <circle cx="14" cy="17" r="2.2" fill="#0B2545" />
      <circle cx="26" cy="17" r="2.2" fill="#0B2545" />
      <path d="M13 25 Q20 30 27 25" stroke="#0B2545" stroke-width="2" fill="none" stroke-linecap="round" />
    </svg>`;
  }

  function spendDonutSVG(categories) {
    const total = categories.reduce((s, c) => s + c.amount, 0);
    const R = 50,
      r = 32,
      cx = 65,
      cy = 65;
    let a = -Math.PI / 2; // start at top
    const paths = categories
      .map((c) => {
        const angle = (c.amount / total) * 2 * Math.PI;
        const a2 = a + angle;
        const x1 = cx + R * Math.cos(a),
          y1 = cy + R * Math.sin(a);
        const x2 = cx + R * Math.cos(a2),
          y2 = cy + R * Math.sin(a2);
        const xi1 = cx + r * Math.cos(a2),
          yi1 = cy + r * Math.sin(a2);
        const xi2 = cx + r * Math.cos(a),
          yi2 = cy + r * Math.sin(a);
        const large = angle > Math.PI ? 1 : 0;
        const d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${xi1} ${yi1} A ${r} ${r} 0 ${large} 0 ${xi2} ${yi2} Z`;
        a = a2;
        return `<path d="${d}" fill="${c.color}" />`;
      })
      .join("");
    return `<svg viewBox="0 0 130 130" class="spend-donut">
      ${paths}
      <text x="65" y="60" text-anchor="middle" class="spend-donut-center" font-size="10" fill="#5B6C7E" font-weight="600">SPENT</text>
      <text x="65" y="78" text-anchor="middle" class="spend-donut-center">${inr(total)}</text>
    </svg>`;
  }

  function jarSVG(fillPct) {
    // Jar mask visual — SVG rect fills up
    const fillHeight = Math.max(6, (fillPct / 100) * 74); // max jar liquid area = 74 units
    const yTop = 82 - fillHeight;
    return `<svg viewBox="0 0 260 100" class="jar-visual" preserveAspectRatio="none">
      <defs>
        <linearGradient id="jarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFD34E" />
          <stop offset="100%" stop-color="#F2A900" />
        </linearGradient>
      </defs>
      <!-- lid -->
      <rect x="70" y="4" width="120" height="10" rx="4" fill="#0B2545" />
      <!-- body outline -->
      <rect x="60" y="14" width="140" height="80" rx="8" ry="8" class="jar-body" />
      <!-- liquid -->
      <rect x="63" y="${yTop}" width="134" height="${fillHeight}" rx="6" class="jar-liquid" />
      <!-- percent -->
      <text x="130" y="60" text-anchor="middle" font-size="18" font-weight="900" fill="#0B2545">${fillPct.toFixed(0)}%</text>
    </svg>`;
  }

  // ═══════════════════════════════════════════════════════════════
  //  Actions + toast
  // ═══════════════════════════════════════════════════════════════
  function doAction(title, msg) {
    document.getElementById("toastTitle").textContent = title;
    document.getElementById("toastMsg").textContent = msg;
    const toast = document.getElementById("toast");
    toast.hidden = false;
    toast.setAttribute("data-show", "true");
    clearTimeout(doAction._t);
    doAction._t = setTimeout(() => {
      toast.setAttribute("data-show", "false");
      setTimeout(() => (toast.hidden = true), 300);
    }, 3400);
  }

  // ═══════════════════════════════════════════════════════════════
  //  Utilities
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

  // Shortcut for talkTo (from home hero) — jumps straight into a topic
  function talkTo(prompt) {
    state.firstVisitToChat = false; // suppress the default "hi" greeting
    state.chatHistory = [];
    switchTab("chat");
    setTimeout(() => {
      if (prompt === "wins") userSays("Show me the 3 wins");
      else if (prompt) userSays(prompt);
    }, 250);
  }

  // ═══════════════════════════════════════════════════════════════
  //  Language sheet
  // ═══════════════════════════════════════════════════════════════
  function openLangSheet() {
    document.getElementById("langSheet").hidden = false;
  }
  function closeLangSheet() {
    document.getElementById("langSheet").hidden = true;
  }
  function setLang(lang) {
    state.lang = lang;
    document.getElementById("langPicker").textContent = lang.toUpperCase();
    document
      .querySelectorAll(".lang-opt")
      .forEach((el) => el.classList.toggle("active", el.dataset.lang === lang));
    closeLangSheet();
    doAction(
      "Language set",
      `Arya will now respond in ${lang.toUpperCase()}. Full multilingual chat is a v1 feature.`,
    );
  }

  // ═══════════════════════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════════════════════
  navBtns.forEach((b) =>
    b.addEventListener("click", () => switchTab(b.dataset.tab)),
  );

  document
    .getElementById("langPicker")
    .addEventListener("click", openLangSheet);
  document
    .getElementById("langSheetClose")
    .addEventListener("click", closeLangSheet);
  document.getElementById("langSheet").addEventListener("click", (e) => {
    if (e.target.id === "langSheet") closeLangSheet();
  });
  document.querySelectorAll(".lang-opt").forEach((el) => {
    el.addEventListener("click", () => setLang(el.dataset.lang));
  });

  // Expose API
  window.Arya = {
    switchTab,
    doAction,
    chatSubmit,
    suggest,
    choicePick,
    talkTo,
  };

  // First render
  render();
})();
