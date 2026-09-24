/* Shared chrome: injects the top bar and the bottom tab bar.
   Each page sets <body data-page="home|roster|stats|teams|info">. */
(function () {
  const D = window.DK || {};
  const tabs = [
    { id: "home",   href: "index.html",   label: "Home",   icon: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>' },
    { id: "roster", href: "roster.html",  label: "Roster", icon: '<circle cx="9" cy="8" r="3.2"/><path d="M2.6 20a6.4 6.4 0 0 1 12.8 0"/><path d="M16.5 5.6a3 3 0 0 1 0 5.6"/><path d="M18 20a6.5 6.5 0 0 0-3-5.7"/>' },
    { id: "stats",  href: "stats.html",   label: "Stats",  icon: '<path d="M4 20V11"/><path d="M10 20V4"/><path d="M16 20v-6"/><path d="M2 20h20"/>' },
    { id: "teams",  href: "teams.html",   label: "Teams",  icon: '<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>' },
    { id: "info",   href: "info.html",    label: "Info",   icon: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>' },
  ];
  const cur = document.body.dataset.page;

  // top bar
  const top = document.createElement("header");
  top.className = "topbar";
  const snum = (D.SEASON || "").replace(/\D+/g, "") || "28";
  top.innerHTML =
    '<div class="inner"><img class="logo" src="logo.svg?v=3" alt="Double Kiss logo" width="40" height="40">' +
    '<div class="tt">' + (D.TEAM || "Double Kiss") + '</div>' +
    '<div class="season" aria-label="Season ' + snum + '">' +
    '<span class="dia" aria-hidden="true">💎</span><span>' + snum + '</span></div></div>';
  document.body.insertBefore(top, document.body.firstChild);

  // pull-to-refresh — the installed app has no native reload gesture
  const ptr = document.createElement("div");
  ptr.className = "ptr"; ptr.textContent = "Pull to refresh";
  document.body.appendChild(ptr);
  let sy = 0, pulling = false, armed = false;
  window.addEventListener("touchstart", e => {
    if (window.scrollY <= 0) { sy = e.touches[0].clientY; pulling = true; armed = false; }
  }, { passive: true });
  window.addEventListener("touchmove", e => {
    if (!pulling) return;
    const d = e.touches[0].clientY - sy;
    if (d > 18 && window.scrollY <= 0) {
      ptr.classList.add("show");
      armed = d > 70;
      ptr.textContent = armed ? "Release to refresh" : "Pull to refresh";
    } else { ptr.classList.remove("show"); armed = false; }
  }, { passive: true });
  window.addEventListener("touchend", () => {
    if (pulling && armed) { ptr.textContent = "Refreshing…"; location.reload(); }
    else ptr.classList.remove("show");
    pulling = false;
  }, { passive: true });

  // bottom tab bar
  const nav = document.createElement("nav");
  nav.className = "tabbar";
  nav.innerHTML = tabs.map(t =>
    '<a class="tab' + (t.id === cur ? ' active' : '') + '" href="' + t.href + '">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round">' + t.icon + '</svg>' +
    '<span>' + t.label + '</span></a>'
  ).join("");
  document.body.appendChild(nav);

  // ---- player card sheet: any element with data-card="Name" opens it ----
  const esc = x => String(x).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
  const sheet = document.createElement("div");
  sheet.className = "pcsheet"; sheet.hidden = true;
  sheet.innerHTML = '<div class="pcback"></div><div class="pcbox" role="dialog" aria-modal="true" aria-labelledby="pcname"></div>';
  document.body.appendChild(sheet);
  const box = sheet.querySelector(".pcbox");
  let lastFocus = null;

  function openCard(name) {
    const c = D.card && D.card(name);
    if (!c) return;
    const gl = c.gp - c.gw, pctv = c.gp ? Math.round(c.gw / c.gp * 100) : null;
    const tag = c.us ? "" : (c.next ? '<span class="pcnext">Next opponent \u00b7 Wk ' + c.next + '</span>' : "");
    const weeks = c.weeks.length ? [...c.weeks].reverse().map(w => {
      const cls = w.w > w.l ? "up" : w.w < w.l ? "dn" : "";
      const ha = w.ha === "Home" ? "H" : w.ha === "Away" ? "A" : "";
      return '<div class="pcwk"><div class="pcwl"><b>Wk ' + w.wk + ' \u00b7 vs ' + esc(w.op) + (ha ? ' (' + ha + ')' : '') + '</b>' +
        '<small>' + esc(w.date) + ' \u00b7 team <span class="tr ' + (w.team === "W" ? "up" : "dn") + '">' + w.team + ' ' + w.score + '</span></small></div>' +
        '<div class="pcsc ' + cls + '">' + w.w + '\u2013' + w.l + '</div></div>';
    }).join("") : '<div class="pcempty">Hasn\u2019t played yet this season.</div>';
    const sub = (c.allGp && c.allGp > c.gp)
      ? '<div class="pcnote">Also subbed for other teams \u2014 ' + c.allGw + '/' + c.allGp + ' games across the division. Weeks below are ' + esc(c.team) + ' only.</div>' : "";
    box.innerHTML =
      '<button class="pcx" type="button" aria-label="Close">\u00d7</button>' +
      '<div class="pchead"><div><div class="pcnm" id="pcname">' + esc(c.name) + '</div>' +
      '<div class="pctm">' + esc(c.team) + ' ' + tag + '</div></div>' +
      '<div class="pcfg">' + (c.r || "\u2014") + '<small>Fargo</small></div></div>' +
      '<div class="pcstats">' +
        '<div><b>' + c.gw + '\u2013' + gl + '</b><small>games W\u2013L</small></div>' +
        '<div><b>' + (pctv == null ? "\u2014" : pctv + "%") + '</b><small>win rate</small></div>' +
        '<div><b>' + c.weeks.length + '</b><small>nights</small></div>' +
        '<div><b>' + c.br + ' / ' + c.tr + '</b><small>B&amp;R / TR</small></div>' +
      '</div>' + sub +
      '<h3 class="pch">Week by week</h3><div class="pcweeks">' + weeks + '</div>' +
      '<div class="pcfoot">7 games a night \u00b7 FargoRate LMS \u00b7 as at ' + esc(D.FARGO_ASOF || "") + '</div>';
    lastFocus = document.activeElement;
    sheet.hidden = false; document.body.classList.add("pcopen");
    requestAnimationFrame(() => { sheet.classList.add("show"); box.querySelector(".pcx").focus(); });
  }
  function closeCard() {
    sheet.classList.remove("show"); document.body.classList.remove("pcopen");
    setTimeout(() => { sheet.hidden = true; }, 180);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  sheet.addEventListener("click", e => { if (e.target.closest(".pcx") || e.target.classList.contains("pcback")) closeCard(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !sheet.hidden) closeCard(); });
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-card]");
    if (!el || sheet.contains(el)) return;
    e.preventDefault(); e.stopPropagation(); openCard(el.dataset.card);
  }, true);
  document.addEventListener("keydown", e => {
    const el = e.target.closest && e.target.closest("[data-card]");
    if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openCard(el.dataset.card); }
  });
  // team page links: only for real division teams (not BYE / Finals)
  D.teamHref = name => (D.teams || []).some(t => t.name === name) ? "team.html?t=" + encodeURIComponent(name) : null;
  D.teamLink = (name, text) => { const h = D.teamHref(name); const t = esc(text == null ? name : text);
    return h ? '<a class="tlink" href="' + h + '">' + t + '</a>' : t; };
  // mark tappable: pages call DK.cardAttr(name) -> ' data-card="..." tabindex="0"' or ""
  D.cardAttr = name => (D.card && D.card(name)) ? ' data-card="' + esc(name) + '" tabindex="0" role="button"' : "";
})();
