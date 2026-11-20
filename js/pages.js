/* 頁面：首頁、每日行程、餐廳 */
const Pages = (() => {
  const dayOf = n => T.days.find(d => d.n === n);
  const dowNum = iso => new Date(iso + "T12:00:00+09:00").getDay();
  const lodgeOf = k => T.lodging[k];
  const flagOf = id => T.flags.find(f => f.id === id);
  const isDone = id => !!Store.get("flag:" + id, false);

  /* ---------- 待確認事項 ---------- */
  function flagCard(f){
    const done = isDone(f.id);
    const days = f.days && f.days.length ? f.days.map(n => `<a href="#/day/${n}">DAY ${n}</a>`).join(" · ") : "整體";
    return `<div class="flag ${f.level==="info"?"info":""} ${done?"done":""}" id="flag-${f.id}">
      <span class="ico">${ic(f.level==="info"?"info":"alert")}</span>
      <div class="fb"><b class="ft">${esc(f.title)}</b><div>${esc(f.text)}</div>
        <div class="meta"><span>${days}</span><label><input type="checkbox" data-flag="${f.id}" ${done?"checked":""}> 我已確認／處理</label></div></div></div>`;
  }
  const flagsFor = ids => (ids||[]).map(flagOf).filter(Boolean);
  function flagChips(ids){
    return "";
    return flagsFor(ids).map(f => `<a class="chip warn" href="#/home-flags" data-goflag="${f.id}">${ic("alert")}待確認：${esc(f.title.length>16?f.title.slice(0,16)+"…":f.title)}</a>`).join("");
  }

  /* ---------- 照片區（插畫 + 自己上傳） ---------- */
  function photoBox(key, kind, item){
    const src = item && item.photo;
    const inner = src ? `<img src="${esc(src)}" alt="" loading="lazy">` : ART.svg(kind);
    return `<div class="photo" data-cover="${esc(key)}" data-kind="${esc(kind)}">${inner}
      <div class="pbtn"><button type="button" data-cover-pick="${esc(key)}">${ic("camera")}換成我的照片</button><button type="button" data-cover-reset="${esc(key)}" class="hidden">還原</button></div></div>`;
  }

  /* ---------- 餐廳卡 ---------- */
  function fitChips(r, dayN){
    if(dayN == null) return "";
    const d = dayOf(dayN); if(!d) return "";
    const dw = dowNum(d.date), lab = `${fmtMD(d.date)}（${d.dow}）`;
    if((r.unavailableOn||[]).includes(dayN) || (r.closedDow||[]).includes(dw)) return `<span class="chip bad">${lab} 公休／不適用</span>`;
    if((r.days||[]).includes(dayN)) return `<span class="chip ok">${lab} 順路</span>`;
    return "";
  }
  function restCard(r, dayN){
    const q = r.map || r.name;
    const closed = r.closed ? `<div><dt>公休</dt><dd>${esc(r.closed)}</dd></div>` : "";
    return `<article class="rest" id="rest-${r.id}">
      ${photoBox("rest-"+r.id, "food", r)}
      <div class="rb">
        <h3>${esc(r.name)}</h3><div class="jp">${esc(r.jp||"")}</div>
        <div class="tags"><span class="chip blue">${esc(r.cuisine)}</span><span class="chip">${esc(r.area)}</span>${r.meal?`<span class="chip">${esc(r.meal)}</span>`:""}${r.tbc?`<span class="chip warn">資料待確認</span>`:""}${fitChips(r, dayN)}</div>
        <p class="why">${esc(r.why)}</p>
        <dl class="facts">
          <div><dt>營業</dt><dd>${esc(r.hours||"待確認")}</dd></div>${closed}
          <div><dt>價位</dt><dd>${esc(r.price||"待確認")}${r.priceNote?`<br><span class="muted">${esc(r.priceNote)}</span>`:""}</dd></div>
          <div><dt>交通</dt><dd>${esc(r.transit||"待確認")}</dd></div>
          <div><dt>地址</dt><dd>${esc(r.address||"待確認")}</dd></div>
        </dl>
        ${r.dishes&&r.dishes.length?`<div class="muted" style="font-size:.76rem;margin-top:10px;font-family:var(--sans)">推薦餐點</div><div class="dishes">${r.dishes.map(x=>`<span>${esc(x)}</span>`).join("")}</div>`:""}
        ${r.warn?`<div class="note-box" style="margin-top:12px">${ic("alert")} ${esc(r.warn)}</div>`:""}
        <div class="actions">
          <a class="btn sm" target="_blank" rel="noopener" href="${GM.search(q)}">${ic("pin")}Google Maps</a>
          <a class="btn sm pri" target="_blank" rel="noopener" href="${GM.dir(q,"",dayN!=null&&dayOf(dayN)&&dayOf(dayN).mapMode==="driving"?"driving":"transit")}">${ic("nav")}導航</a>
        </div>
        <div class="muted" style="font-size:.7rem;margin-top:10px;font-family:var(--sans)">資料來源：${esc(r.src||"—")}</div>
      </div></article>`;
  }

  /* ---------- 時間軸 ---------- */
  const TYPE = {spot:"景點", meal:"用餐", transit:"移動", flight:"航班", lodging:"住宿", note:"備註"};
  function driveRow(it, d){
    const dn = it.driveNext; if(!dn) return "";
    const mode = modeOf(dn.mode);
    const icon = dn.mode==="walk"?"walk":dn.mode==="transit"?"train":"car";
    const link = dn.from && dn.to ? `<a target="_blank" rel="noopener" href="${GM.dir(dn.to, dn.from, mode)}">路線 ↗</a>` : "";
    return `<div class="drive"><div></div><div class="rail"></div><div class="pillrow">
      <span class="tag">${ic(icon)}${esc(dn.t)}${dn.est?"（估算）":""}</span>${dn.note?`<span class="muted">${esc(dn.note)}</span>`:""}${link}${flagChips(dn.flags)}</div></div>`;
  }
  function tlItem(it, d){
    const hasPhoto = it.type==="spot" || it.type==="lodging";
    const timeTxt = /^\d{1,2}:\d{2}$/.test(it.time||"");
    const ln = it.lodge ? lodgeOf(it.lodge) : null;
    const addr = it.address || (ln && ln.address) || "";
    const mq = it.map || (ln && ln.map);
    const facts = [];
    if(it.stay && it.stay!=="—") facts.push(["停留", it.stay]);
    if(it.hours && it.hours.t && it.hours.t!=="—") facts.push(["營業", it.hours.t + (it.hours.tbc?"　⚠待確認":"")]);
    if(it.price) facts.push(["費用", it.price]);
    if(addr) facts.push(["地址", addr]);
    if(ln){ facts.push(["入退房", ln.inout]); facts.push(["房型", ln.room]); }
    const rec = it.meal && it.meal.rec && it.meal.rec.length
      ? `<div class="meal-rec"><div class="lbl">${esc(it.meal.slot||"用餐")}候選（PDF 未指定店家）</div>${it.meal.rec.map(id=>T.restaurants.find(r=>r.id===id)).filter(Boolean).map(r=>restCard(r, d.n)).join("")}</div>` : "";
    const modeD = d.mapMode==="transit" ? "transit" : "driving";
    return `<div class="tl-item type-${it.type}" id="${it.id}">
      <div class="tl-time ${timeTxt?"":"txt"}">${esc(it.time||"")}</div>
      <div class="tl-rail"><span class="tl-dot"></span></div>
      <div><div class="tl-card ${it.type}">
        ${hasPhoto?photoBox(it.id, it.kind||"hill", it):""}
        <div class="tl-body">
          <div class="tl-kicker">${ic(it.type==="meal"?"food":it.type==="lodging"?"bed":it.type==="flight"?"plane":it.type==="transit"?"car":"pin")}${TYPE[it.type]||""}${flagChips(it.flags)}</div>
          <h3>${esc(it.title)}${it.en?`<span class="en">${esc(it.en)}</span>`:""}</h3>
          ${it.desc?`<p class="desc">${esc(it.desc)}</p>`:""}
          ${facts.length?`<dl class="facts">${facts.map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`:""}
          ${it.pdf?`<div class="pdfnote"><b>PDF 原文</b>　${esc(it.pdf)}</div>`:""}
          ${it.tips&&it.tips.length?`<ul class="tips">${it.tips.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>`:""}
          ${mq?`<div class="actions"><a class="btn sm" target="_blank" rel="noopener" href="${GM.search(mq)}">${ic("pin")}在地圖開啟</a><a class="btn sm pri" target="_blank" rel="noopener" href="${GM.dir(mq,"",modeD)}">${ic("nav")}導航前往</a>${it.link?`<a class="btn sm ghost" target="_blank" rel="noopener" href="${esc(it.link)}">${ic("ext")}官方網站</a>`:""}</div>`:(it.link?`<div class="actions"><a class="btn sm ghost" target="_blank" rel="noopener" href="${esc(it.link)}">${ic("ext")}官方網站</a></div>`:"")}
          ${rec}
        </div></div>${driveRow(it, d)}</div></div>`;
  }

  /* ---------- 首頁 ---------- */
  function home(){
    const m = T.meta, n = daysUntil();
    const cd = n > 0 ? `<div class="cd">距離出發 <b>${n}</b> 天</div>` : n === 0 ? `<div class="cd">就是今天出發 ✦</div>` : (new Date() <= new Date(m.end+"T23:59:59+09:00") ? `<div class="cd">旅途進行中 ✦</div>` : `<div class="cd">旅程已結束，慢慢回味</div>`);
    const gflags = T.flags.filter(f => !f.days || !f.days.length);
    const dflags = T.flags.filter(f => f.days && f.days.length);
    return `
    <section class="hero"><div class="art">${ART.hero()}</div><div class="veil"></div><div class="snow">${ART.snowflakes()}</div>
      <div class="hero-inner"><div class="kicker">${esc(m.en)}</div>
        <h1>北海道<em>冬日之旅</em></h1>
        <div class="dates">2026.12.13 <span>—</span> 12.19</div>
        <div class="sub">7 天 6 夜 · 札幌 · 美瑛 · 富良野 · 旭岳 · 旭川 · 小樽</div>${cd}</div></section>

    <div class="wrap">
    <section class="intro blk"><p class="lead"><span class="big">${esc(m.lead.charAt(0))}</span>${esc(m.lead.slice(1))}</p>
      <div class="facts-grid">
        <div class="fact"><div class="k">${ic("cal")}天數</div><div class="v">7 天 6 夜<small>12/13 – 12/19（另有 Day 0 出發前夜）</small></div></div>
        <div class="fact"><div class="k">${ic("bed")}住宿</div><div class="v">3 處 · 3 個城市<small>札幌 2 晚 → 旭川 2 晚 → 札幌 2 晚</small></div></div>
        <div class="fact"><div class="k">${ic("car")}交通</div><div class="v">包車 + 地鐵／JR<small>${esc(m.vehicle)}；司機 ${esc(m.driver)}</small></div></div>
        <div class="fact"><div class="k">${ic("plane")}航班</div><div class="v">ZIPAIR · Peach · AirAsia X<small>吉隆坡進出，成田轉機</small></div></div>
        <div class="fact wide"><div class="k">${ic("map")}路線</div><div class="v">${m.route.map(esc).join(" · ")}<small>${esc(m.people)}</small></div></div>
      </div></section>

    <section class="blk"><div class="sec-h"><h2>每日行程</h2><span class="en">Itinerary</span><span class="rule"></span></div>
      <div class="quick">${T.days.map(d => `<a class="q ${d.n===0?"d0":""}" href="#/day/${d.n}"><div class="n">${d.n===0?"0":"DAY "+d.n}</div><div class="d">${fmtMD(d.date)}（${d.dow}）</div><div class="t">${esc(d.title)}</div><div class="r">${esc(d.route)}</div></a>`).join("")}</div></section>

    <section class="blk"><div class="sec-h"><h2>航班與行李</h2><span class="en">Flights</span><span class="rule"></span></div>
      <div class="scroll-x"><table class="tbl"><tr><th>日期</th><th>航段</th><th>航班</th><th>時間</th></tr>${T.flights.map(f=>`<tr><td>${esc(f.date)}</td><td>${esc(f.route)}</td><td>${esc(f.no)}</td><td>${esc(f.time)}</td></tr>`).join("")}</table></div>
      <div class="scroll-x" style="margin-top:12px"><table class="tbl"><tr><th>航段</th><th>托運</th><th>手提</th></tr>${T.baggage.map(b=>`<tr><td>${esc(b.leg)}</td><td>${esc(b.check)}</td><td>${esc(b.carry)}</td></tr>`).join("")}</table></div>
      <div class="note-box" style="margin-top:12px">${esc(T.charterNote)}</div></section>

    <section class="blk"><div class="sec-h"><h2>住宿</h2><span class="en">Stay</span><span class="rule"></span></div>
      <div class="lodging">${Object.values(T.lodging).map(l=>`<div class="card lodge"><div class="when">${esc(l.nights)}</div><h3>${esc(l.name)}</h3><div class="muted" style="font-size:.84rem">${esc(l.city)}</div>
        <ul><li>${esc(l.inout)}</li><li>${esc(l.room)}</li><li>${esc(l.address)}</li><li class="muted">${esc(l.price)}</li></ul>
        <div class="actions"><a class="btn sm" target="_blank" rel="noopener" href="${GM.search(l.map)}">${ic("pin")}地圖</a><a class="btn sm pri" target="_blank" rel="noopener" href="${GM.dir(l.map)}">${ic("nav")}導航</a></div></div>`).join("")}</div></section>

    <section class="blk"><div class="sec-h"><h2>冬季行車與移動提醒</h2><span class="en">Winter safety</span><span class="rule"></span></div>
      <div class="safe"><h4>${ic("snow")}出發前請先讀一遍</h4><ul>${T.safety.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div></section>

    <section class="blk"><div class="sec-h"><h2>旅行工具</h2><span class="en">Tools</span><span class="rule"></span></div>
      <div class="quick">
        <a class="q" href="#/food"><div class="n" style="font-size:1.5rem">餐廳</div><div class="t">沿途補充推薦</div><div class="r">營業時間、價位、推薦菜色</div></a>
        <a class="q" href="#/budget"><div class="n" style="font-size:1.5rem">預算</div><div class="t">記帳與分帳</div><div class="r">日圓／令吉，多人分攤</div></a>
        <a class="q" href="#/list"><div class="n" style="font-size:1.5rem">清單</div><div class="t">待辦與行李</div><div class="r">可勾選、可自行新增</div></a>
        <a class="q" href="#/weather"><div class="n" style="font-size:1.5rem">天氣</div><div class="t">各地預報</div><div class="r">即時 API + 官方警報連結</div></a>
        <a class="q" href="#/tools"><div class="n" style="font-size:1.5rem">備份</div><div class="t">匯出／匯入</div><div class="r">與旅伴同步資料</div></a>
      </div></section>
    </div>`;
  }

  /* ---------- 每日頁 ---------- */
  function mapStops(d){
    const out = [];
    d.items.forEach(it => {
      const q = it.map || (it.lodge && lodgeOf(it.lodge).map);
      if(q && ["spot","lodging","flight","transit"].includes(it.type) && out[out.length-1] !== q) out.push(q);
    });
    return out;
  }
  function mapBox(d){
    const stops = mapStops(d);
    if(!stops.length) return "";
    const mode = d.mapMode === "transit" ? "transit" : "driving";
    const uniq = stops.filter((s,i)=>stops.indexOf(s)===i);
    const via = uniq.slice(1,-1).slice(0,8);
    const openAll = uniq.length>1 ? GM.dir(uniq[uniq.length-1], uniq[0], mode, via) : GM.search(uniq[0]);
    return `<div class="card mapbox" data-mapbox data-day="${d.n}">
      <div class="mh"><h4>${ic("map")} 今日地圖</h4><a class="btn sm" target="_blank" rel="noopener" href="${openAll}">${ic("ext")}全日路線</a></div>
      <div class="frame"><div class="ph"><span>點下方按鈕載入地圖（需要網路）</span><button class="btn sm pri" data-embed-route="${d.n}">${ic("map")}載入全日路線</button></div></div>
      <div class="ctl">${uniq.map((s,i)=>`<button class="pill" data-embed-spot="${esc(s)}">${i+1}. ${esc(s.split(",")[0].slice(0,14))}</button>`).join("")}</div></div>`;
  }
  function day(n){
    const d = dayOf(+n); if(!d) return notFound();
    const prev = dayOf(d.n-1), next = dayOf(d.n+1);
    const stay = d.stay ? lodgeOf(d.stay) : null;
    const dfl = [];
    return `
    <div class="daystrip"><div class="wrap">${T.days.map(x=>`<a href="#/day/${x.n}" class="${x.n===d.n?"on":""}"><b>${x.n===0?"D0":"D"+x.n}</b>${fmtMD(x.date)}</a>`).join("")}</div></div>
    <section class="dayhead"><div class="art">${ART.svg(d.scene||"hill",{snow:14})}</div><div class="veil"></div>
      <div class="wrap"><div class="in">
        <div class="num">${d.n===0?"DAY 0":"DAY "+d.n}</div>
        <div class="date">2026.${fmtMD(d.date).replace("/",".")}　星期${d.dow}</div>
        <h1>${esc(d.title)}</h1><div class="en">${esc(d.en||"")}</div>
        <div class="chips">${d.route?`<span class="chip blue">${ic("pin")}${esc(d.route)}</span>`:""}${stay?`<span class="chip">${ic("bed")}${esc(stay.name)}</span>`:""}${d.charter?`<span class="chip">${ic("car")}${esc(d.charter)}</span>`:""}</div>
      </div></div></section>
    <div class="wrap"><div class="daygrid view-day">
      <div>
        ${d.summary?`<p class="muted" style="margin-bottom:16px">${esc(d.summary)}</p>`:""}
        ${dfl.length?`<div class="flags" style="margin-bottom:20px">${dfl.map(flagCard).join("")}</div>`:""}
        <div class="timeline">${d.items.map(it=>tlItem(it,d)).join("")}</div>
        ${d.notes&&d.notes.length?`<div class="note-box" style="margin-top:20px"><b>備註</b><ul style="margin:.4em 0 0;padding-left:1.2em">${d.notes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:""}
        <div class="actions" style="justify-content:space-between;margin-top:26px">
          ${prev?`<a class="btn" href="#/day/${prev.n}">← ${prev.n===0?"DAY 0":"DAY "+prev.n}</a>`:"<span></span>"}
          ${next?`<a class="btn pri" href="#/day/${next.n}">DAY ${next.n} →</a>`:`<a class="btn pri" href="#/">回首頁</a>`}
        </div>
      </div>
      <aside class="aside">
        ${mapBox(d)}
        ${d.weather&&d.weather.length?`<div class="card wx-mini" data-wxmini="${d.weather.join(",")}" data-date="${d.date}"><h4>${ic("cloud")} 當日天氣</h4><div class="muted">載入中…</div></div>`:""}
        ${d.safety?`<div class="safe"><h4>${ic("snow")}冬季提醒</h4><ul>${T.safety.slice(0,5).map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div>`:""}
      </aside></div></div>`;
  }

  /* ---------- 餐廳頁 ---------- */
  const fstate = {day:"all", cuisine:"all"};
  function foodList(){
    const rs = T.restaurants.filter(r => (fstate.day==="all" || (r.days||[]).includes(+fstate.day)) && (fstate.cuisine==="all" || r.cuisine===fstate.cuisine));
    return rs.length ? rs.map(r => restCard(r, fstate.day==="all"?null:+fstate.day)).join("") : `<div class="empty">沒有符合的餐廳</div>`;
  }
  function food(){
    const cuis = [...new Set(T.restaurants.map(r=>r.cuisine))];
    const days = [...new Set(T.restaurants.flatMap(r=>r.days||[]))].sort();
    return `<div class="wrap view"><section class="blk"><div class="sec-h"><h2>沿途餐廳</h2><span class="en">Restaurants</span><span class="rule"></span></div>
      <div class="note-box" style="margin-bottom:16px">PDF 只指定了少數用餐，以下是我依路線與營業日挑選的補充候選。營業時間、公休日以各店公告為準；<b>標示「待確認」的欄位表示來源不一致或查不到，請出發前用 Google Maps 再確認一次</b>。</div>
      <div class="filters"><div class="fgrp"><span class="lbl">日期</span><button class="pill ${fstate.day==="all"?"on":""}" data-fday="all">全部</button>${days.map(n=>`<button class="pill ${fstate.day==n?"on":""}" data-fday="${n}">DAY ${n}</button>`).join("")}</div>
      <div class="fgrp"><span class="lbl">類型</span><button class="pill ${fstate.cuisine==="all"?"on":""}" data-fcu="all">全部</button>${cuis.map(c=>`<button class="pill ${fstate.cuisine===c?"on":""}" data-fcu="${esc(c)}">${esc(c)}</button>`).join("")}</div></div>
      <div class="restlist" id="restlist">${foodList()}</div></section></div>`;
  }
  function notFound(){ return `<div class="wrap view"><div class="empty">找不到這一頁。<br><a href="#/">回首頁</a></div></div>`; }

  /* ---------- 事件（委派） ---------- */
  function bind(root){
    root.addEventListener("change", e => {
      const c = e.target.closest("[data-flag]"); if(!c) return;
      Store.set("flag:" + c.dataset.flag, c.checked);
      $$(`#flag-${c.dataset.flag}`).forEach(el => el.classList.toggle("done", c.checked));
      $$(`[data-flag="${c.dataset.flag}"]`).forEach(x => x.checked = c.checked);
    });
    root.addEventListener("click", e => {
      const g = e.target.closest("[data-goflag]");
      if(g){ e.preventDefault(); const here = $("#flag-"+g.dataset.goflag); if(here){ here.scrollIntoView({behavior:"smooth",block:"center"}); here.style.outline="2px solid var(--blue)"; setTimeout(()=>here.style.outline="",1800); return; } return; setTimeout(()=>{ const el = $("#flag-"+g.dataset.goflag); if(el){ el.scrollIntoView({behavior:"smooth",block:"center"}); el.style.outline="2px solid var(--blue)"; setTimeout(()=>el.style.outline="",1800);} }, 120); return; }
      const fd = e.target.closest("[data-fday]"), fc = e.target.closest("[data-fcu]");
      if(fd || fc){
        if(fd) fstate.day = fd.dataset.fday; if(fc) fstate.cuisine = fc.dataset.fcu;
        const v = $("#view"); v.innerHTML = food(); if(window.hydrateCovers) hydrateCovers(v); return;
      }
      const er = e.target.closest("[data-embed-route]"), es = e.target.closest("[data-embed-spot]");
      if(er || es){
        const box = e.target.closest("[data-mapbox]"), frame = $(".frame", box);
        let src;
        if(er){ const d = dayOf(+er.dataset.embedRoute); const st = mapStops(d).filter((s,i,a)=>a.indexOf(s)===i); src = st.length>1 ? GM.embedRoute(st, d.mapMode==="transit"?"transit":"driving") : GM.embed(st[0]); $$(".pill",box).forEach(p=>p.classList.remove("on")); }
        else { src = GM.embed(es.dataset.embedSpot); $$(".pill",box).forEach(p=>p.classList.toggle("on", p===es)); }
        frame.innerHTML = `<iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${esc(src)}" title="Google Maps"></iframe>`;
      }
    });
  }
  return { home, day, food, bind, restCard, notFound };
})();
