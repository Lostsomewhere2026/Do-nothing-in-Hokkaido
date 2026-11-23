/* 路由與導覽 */
(() => {
  const view = $("#view");
  const NAV = [
    ["#/", "首頁", "home"], ["day", "行程", "cal"], ["#/budget", "預算", "coin"],
    ["#/list", "清單", "list"], ["#/weather", "天氣", "cloud"], ["#/tools", "備份", "down"]
  ];
  const dayLinks = () => T.days.map(d => `<a href="#/day/${d.n}"><b>${d.n===0?"DAY 0":"DAY "+d.n} · ${fmtMD(d.date)}</b><span>${esc(d.title)}</span></a>`).join("");

  function buildNav(){
    $("#navlinks").innerHTML = NAV.map(([h, t]) => h === "day"
      ? `<div class="dd"><button class="navbtn" data-nav="day" aria-haspopup="true">${t} ▾</button><div class="dd-menu">${dayLinks()}</div></div>`
      : `<a href="${h}" data-nav="${h}">${t}</a>`).join("") + `<span class="countdown" id="cdn"></span>`;
    $("#tabbar").innerHTML = [
      ["#/", "首頁", "home"], ["sheet-days", "行程", "cal"], ["#/budget", "預算", "coin"], ["sheet-more", "更多", "more"]
    ].map(([h, t, i]) => h.startsWith("#") ? `<a href="${h}" data-nav="${h}">${ic(i)}<span>${t}</span></a>` : `<button data-sheet="${h}" data-nav="${h}">${ic(i)}<span>${t}</span></button>`).join("");
    const n = daysUntil(); const c = $("#cdn"); if(c) c.textContent = n > 0 ? `倒數 ${n} 天` : n === 0 ? "今天出發" : "";
  }
  function sheet(kind){
    if(kind === "sheet-days") openModal(`<h3>選擇日期</h3><div class="sheet-list">${dayLinks()}</div>`, m => m.addEventListener("click", e => { if(e.target.closest("a")) closeModal(); }));
    else openModal(`<h3>更多</h3><div class="sheet-list">
      <a href="#/list"><b>清單</b><span>待辦與行李，可勾選</span></a><a href="#/weather"><b>天氣</b><span>各地預報與官方警報</span></a><a href="#/tools"><b>備份與同步</b><span>匯出／匯入資料</span></a></div>`, m => m.addEventListener("click", e => { if(e.target.closest("a")) closeModal(); }));
  }

  function route(){
    closeModal();
    const raw = (location.hash || "#/").replace(/^#/, ""), parts = raw.split("/").filter(Boolean);
    const key = parts[0] || "home";
    let html, title = "北海道冬日之旅 2026", after = null, active = "#/";
    if(key === "home") html = Pages.home();
    else if(key === "day"){ const d = T.days.find(x => x.n === +parts[1]); html = Pages.day(parts[1]); if(d) title = `DAY ${d.n} ${d.title} · ${title}`; active = "day"; }
    else if(key === "food"){ html = Pages.food(); active = "#/food"; title = "餐廳 · " + title; }
    else if(key === "budget"){ html = Budget.render(); active = "#/budget"; title = "預算 · " + title; }
    else if(key === "photos"){ html = null; active = "#/photos"; title = "相簿 · " + title; after = Photos.render().then(h => h); }
    else if(key === "list"){ html = Checklist.render(); active = "#/list"; title = "清單 · " + title; }
    else if(key === "weather"){ html = Weather.page(); active = "#/weather"; title = "天氣 · " + title; after = "wx"; }
    else if(key === "tools"){ html = Tools.render(); active = "#/tools"; title = "備份 · " + title; }
    else { html = Pages.notFound(); }
    document.title = title;
    $$("[data-nav]").forEach(a => a.classList.toggle("on", a.dataset.nav === active || (active === "day" && ["day","sheet-days"].includes(a.dataset.nav)) || (["#/list","#/weather","#/tools"].includes(active) && a.dataset.nav === "sheet-more")));
    const done = () => { hydrateCovers(view); Weather.hydrateMini(view); if(after === "wx") Weather.body(); window.scrollTo(0, 0); };
    if(html != null){ view.innerHTML = html; done(); }
    else { view.innerHTML = `<div class="wrap view"><div class="empty">載入中…</div></div>`; after.then(h => { if(location.hash.indexOf("photos") < 0) return; view.innerHTML = h; done(); }); }
  }

  buildNav();
  [Pages, Budget, Photos, Checklist, Weather, Tools].forEach(m => m.bind(view));
  document.addEventListener("click", e => {
    const dd = $(".dd"); const b = e.target.closest("[data-nav=day].navbtn");
    if(b){ dd.classList.toggle("open"); return; }
    if(dd && !e.target.closest(".dd-menu")) dd.classList.remove("open");
    if(e.target.closest(".dd-menu a") && dd) dd.classList.remove("open");
    const s = e.target.closest("[data-sheet]"); if(s) sheet(s.dataset.sheet);
  });
  window.addEventListener("hashchange", route);
  route();
  setInterval(() => { const n = daysUntil(), c = $("#cdn"); if(c) c.textContent = n > 0 ? `倒數 ${n} 天` : n === 0 ? "今天出發" : ""; }, 3600e3);
})();
