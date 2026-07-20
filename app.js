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
    '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">' +
    '<path d="M6 3h12l4 6-10 12L2 9z" fill="#39b0ff" stroke="#8fd6ff" stroke-width="1" stroke-linejoin="round"/>' +
    '<path d="M2 9h20M8.5 3 6 9l6 12M15.5 3 18 9l-6 12" stroke="#0a1330" stroke-width="0.8" opacity="0.4" fill="none"/></svg>' +
    '<span>' + snum + '</span></div></div>';
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
})();
