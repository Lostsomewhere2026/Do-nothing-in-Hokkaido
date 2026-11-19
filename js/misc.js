/* 清單、天氣、備份工具 */

/* ====================== 清單 ====================== */
const Checklist = (() => {
  const load = () => { const s = Store.get("cl", {}); return {checked:s.checked||{}, custom:s.custom||{}, removed:s.removed||{}}; };
  const save = s => Store.set("cl", s);
  const itemsOf = (g, s) => g.items.map(t => ({k:g.id+":"+t, t, def:true})).filter(i => !s.removed[i.k])
    .concat((s.custom[g.id]||[]).map(c => ({k:c.id, t:c.t, def:false})));
  function render(){
    const s = load(); let all = 0, done = 0;
    const html = T.checklist.map(g => {
      const its = itemsOf(g, s), d = its.filter(i => s.checked[i.k]).length; all += its.length; done += d;
      return `<div class="card cl" data-g="${g.id}"><h3>${esc(g.name)}<small>${d}/${its.length}</small></h3>
        <ul>${its.map(i => `<li class="${s.checked[i.k]?"done":""}"><input type="checkbox" data-ck="${esc(i.k)}" ${s.checked[i.k]?"checked":""} aria-label="${esc(i.t)}"><span class="tx">${esc(i.t)}</span><button class="x" data-cx="${esc(i.k)}" data-g="${g.id}" aria-label="刪除">×</button></li>`).join("")}</ul>
        <form class="add" data-add="${g.id}"><input type="text" placeholder="新增項目…" aria-label="新增項目"><button class="btn sm" type="submit">${ic("plus")}</button></form></div>`;
    }).join("");
    const pct = all ? Math.round(done/all*100) : 0;
    return `<div class="wrap view"><section class="blk"><div class="sec-h"><h2>待辦與行李清單</h2><span class="en">Checklist</span><span class="rule"></span></div>
      <div class="card pad" style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;font-family:var(--sans);font-size:.88rem"><span>整體完成度</span><b>${done}/${all}（${pct}%）</b></div><div class="pbar" style="margin-top:8px"><i style="width:${pct}%"></i></div>
        <div class="actions"><button class="btn sm ghost" data-cl="uncheck">全部取消勾選</button><button class="btn sm ghost" data-cl="reset">還原預設清單</button></div></div>
      <div class="cl-grid">${html}</div></section></div>`;
  }
  const refresh = () => { const v = $("#view"), y = scrollY; v.innerHTML = render(); scrollTo(0, y); };
  function bind(root){
    root.addEventListener("change", e => {
      const c = e.target.closest("[data-ck]"); if(!c) return;
      const s = load(); if(c.checked) s.checked[c.dataset.ck] = true; else delete s.checked[c.dataset.ck]; save(s); refresh();
    });
    root.addEventListener("click", e => {
      const x = e.target.closest("[data-cx]");
      if(x){ const s = load(), k = x.dataset.cx, g = x.dataset.g;
        if(s.custom[g] && s.custom[g].some(i=>i.id===k)) s.custom[g] = s.custom[g].filter(i=>i.id!==k); else s.removed[k] = true;
        delete s.checked[k]; save(s); refresh(); return; }
      const b = e.target.closest("[data-cl]"); if(!b) return;
      if(b.dataset.cl==="uncheck"){ const s = load(); s.checked = {}; save(s); refresh(); }
      if(b.dataset.cl==="reset") confirmBox("還原預設清單？你自己新增的項目也會被移除。", () => { Store.del("cl"); refresh(); }, "還原");
    });
    root.addEventListener("submit", e => {
      const f = e.target.closest("[data-add]"); if(!f) return; e.preventDefault();
      const inp = $("input", f), t = inp.value.trim(); if(!t) return;
      const s = load(), g = f.dataset.add; (s.custom[g] = s.custom[g]||[]).push({id:"c-"+uid(), t}); save(s); refresh();
      const again = $(`[data-add="${g}"] input`); if(again) again.focus();
    });
  }
  return { render, bind };
})();

/* ====================== 天氣（Open-Meteo） ====================== */
const Weather = (() => {
  const state = {id:null};
  const API = () => {
    const P = T.weatherPlaces;
    return "https://api.open-meteo.com/v1/forecast?latitude=" + P.map(p=>p.lat).join(",") + "&longitude=" + P.map(p=>p.lon).join(",") +
      "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m,snowfall" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max,sunrise,sunset" +
      "&timezone=Asia%2FTokyo&forecast_days=16";
  };
  let pending = null;
  async function fetchAll(){
    try{ const c = JSON.parse(sessionStorage.getItem("hk26:wx")||"null"); if(c && Date.now()-c.t < 30*60e3) return c.d; }catch(e){}
    if(!pending) pending = fetch(API()).then(r => { if(!r.ok) throw 0; return r.json(); }).then(j => {
      const d = Array.isArray(j) ? j : [j]; try{ sessionStorage.setItem("hk26:wx", JSON.stringify({t:Date.now(), d})); }catch(e){} return d; }).finally(() => pending = null);
    return pending;
  }
  const dayIdx = (w, date) => w.daily.time.indexOf(date);
  const hm = s => s ? s.slice(11,16) : "—";
  function links(){
    return `<div class="linkgrid">${T.weatherLinks.map(l=>`<a class="lk" target="_blank" rel="noopener" href="${esc(l.u)}"><b>${esc(l.t)} ↗</b><span>${esc(l.s)}</span></a>`).join("")}</div>`;
  }
  function page(){
    const P = T.weatherPlaces; state.id = state.id || P[0].id;
    return `<div class="wrap view"><section class="blk"><div class="sec-h"><h2>天氣</h2><span class="en">Weather</span><span class="rule"></span></div>
      <div class="note-box" style="margin-bottom:14px">資料來自 Open-Meteo（免費氣象 API），顯示「現在」與未來 16 天預報。<b>出發日期距今超過 16 天時，旅行日預報會顯示「尚未開放」</b>，這不是壞掉。API 提供降水機率與降雪量（公分），<u>沒有「降雪機率」與官方警報</u>；警報與路況請看下方官方連結。</div>
      <div class="wxtabs">${P.map(p=>`<button class="${p.id===state.id?"on":""}" data-wxp="${p.id}">${esc(p.name)}</button>`).join("")}</div>
      <div id="wxbody"><div class="empty">載入天氣中…</div></div>
      <div class="sec-h" style="margin-top:34px"><h2>官方警報與路況</h2><span class="en">Official links</span><span class="rule"></span></div>${links()}</section></div>`;
  }
  async function body(){
    const el = $("#wxbody"); if(!el) return;
    let data; try{ data = await fetchAll(); }catch(e){ el.innerHTML = `<div class="empty">${ic("cloud")}<div>目前無法取得天氣資料（可能離線或被擋）。<br>請改用下方官方連結查看。</div></div>`; return; }
    const i = T.weatherPlaces.findIndex(p => p.id === state.id), w = data[i], p = T.weatherPlaces[i]; if(!w) return;
    const c = w.current, [lab, kind] = WX(c.weather_code);
    const row = (date, k) => { const j = dayIdx(w, date); const dt = new Date(date+"T12:00:00+09:00");
      if(j<0) return `<div class="d ${k?"trip":""} na"><div class="dt">${fmtMD(date)}（${DOW[dt.getDay()]}）</div><div class="sm">預報尚未開放</div></div>`;
      const [l, kd] = WX(w.daily.weather_code[j]);
      return `<div class="d ${k?"trip":""}"><div class="dt">${fmtMD(date)}（${DOW[dt.getDay()]}）</div>${wxSvg(kd)}<div class="hl">${Math.round(w.daily.temperature_2m_max[j])}° / ${Math.round(w.daily.temperature_2m_min[j])}°</div><div class="sm">${l}<br>降水 ${w.daily.precipitation_probability_max[j]??"—"}%<br>降雪 ${w.daily.snowfall_sum[j]??0} cm<br>風 ${Math.round(w.daily.wind_speed_10m_max[j])} km/h</div></div>`; };
    const trip = []; for(let n=0;n<=7;n++){ const d = T.days[n]; if(d.n>=1) trip.push(d.date); }
    const next = w.daily.time.slice(0,7);
    el.innerHTML = `<div class="wxnow">${wxSvg(kind)}<div><div class="temp">${Math.round(c.temperature_2m)}°C</div><div class="desc">${esc(p.name)} 現在：${lab}<br><span class="muted">${esc(p.note||"")}</span></div></div></div>
      <div class="wxstats"><div><div class="k">體感</div><div class="v">${Math.round(c.apparent_temperature)}°C</div></div><div><div class="k">風速</div><div class="v">${Math.round(c.wind_speed_10m)} km/h</div></div><div><div class="k">陣風</div><div class="v">${Math.round(c.wind_gusts_10m)} km/h</div></div><div><div class="k">降雪</div><div class="v">${c.snowfall||0} cm/h</div></div></div>
      <h3 style="margin:22px 0 10px;font-size:1.05rem">旅行日預報（12/13 – 12/19）</h3><div class="fc">${trip.map(d=>row(d,true)).join("")}</div>
      <h3 style="margin:22px 0 10px;font-size:1.05rem">接下來 7 天</h3><div class="fc">${next.map(d=>row(d,false)).join("")}</div>
      <p class="muted" style="font-size:.76rem;margin-top:10px;font-family:var(--sans)">日出日落：${hm(w.daily.sunrise[0])} / ${hm(w.daily.sunset[0])}（今日，${esc(p.name)}）。山區（旭岳）座標為近似位置，實際山頂氣溫會更低。</p>`;
  }
  async function hydrateMini(root){
    const els = $$("[data-wxmini]", root); if(!els.length) return;
    let data = null; try{ data = await fetchAll(); }catch(e){}
    els.forEach(el => {
      const ids = el.dataset.wxmini.split(","), date = el.dataset.date;
      if(!data){ el.innerHTML = `<h4>${ic("cloud")} 當日天氣</h4><div class="muted">目前無法取得天氣。</div><div class="actions"><a class="btn sm" href="#/weather">天氣頁</a></div>`; return; }
      const rows = ids.map(id => { const i = T.weatherPlaces.findIndex(p=>p.id===id); if(i<0) return ""; const w = data[i], j = w ? dayIdx(w, date) : -1, nm = T.weatherPlaces[i].name;
        if(j<0) return `<div class="wx-row"><span class="nm">${esc(nm)}</span><span class="s">預報尚未開放</span></div>`;
        return `<div class="wx-row"><span class="nm">${esc(nm)}</span><span class="s">${WX(w.daily.weather_code[j])[0]} ${Math.round(w.daily.temperature_2m_max[j])}°/${Math.round(w.daily.temperature_2m_min[j])}° · 降水${w.daily.precipitation_probability_max[j]??"—"}% · 雪${w.daily.snowfall_sum[j]??0}cm</span></div>`; }).join("");
      el.innerHTML = `<h4>${ic("cloud")} 當日天氣</h4>${rows}<div class="muted" style="font-size:.72rem;margin-top:8px">預報最多提前 16 天；出發前請再看一次，並查氣象廳警報。</div><div class="actions"><a class="btn sm" href="#/weather">更多天氣</a><a class="btn sm ghost" target="_blank" rel="noopener" href="https://www.jma.go.jp/bosai/warning/">氣象警報 ↗</a></div>`;
    });
  }
  function bind(root){
    root.addEventListener("click", e => { const b = e.target.closest("[data-wxp]"); if(!b) return; state.id = b.dataset.wxp; $$(".wxtabs button").forEach(x=>x.classList.toggle("on", x===b)); body(); });
  }
  return { page, body, hydrateMini, bind };
})();

/* ====================== 備份／工具 ====================== */
const Tools = (() => {
  const b2d = b => new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); });
  const d2b = async d => (await fetch(d)).blob();
  async function exportAll(withPhotos){
    const out = {app:"hk26", v:1, at:new Date().toISOString(), store:{}, photos:[], covers:{}};
    Store.keys().forEach(k => out.store[k] = Store.get(k));
    if(withPhotos){
      for(const p of await DB.all()) out.photos.push({...p, blob:await b2d(p.blob)});
      for(const k of T.days.flatMap(d=>d.items.map(i=>i.id)).concat(T.restaurants.map(r=>"rest-"+r.id))){ const b = await DB.cget(k); if(b) out.covers[k] = await b2d(b); }
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(out)], {type:"application/json"}));
    a.download = `hokkaido-backup-${new Date().toISOString().slice(0,10)}${withPhotos?"-with-photos":""}.json`; document.body.appendChild(a); a.click(); a.remove(); toast("已匯出備份檔");
  }
  async function importAll(file){
    try{
      const j = JSON.parse(await file.text()); if(j.app !== "hk26") throw 0;
      Object.entries(j.store||{}).forEach(([k,v]) => Store.set(k, v));
      for(const p of j.photos||[]) await DB.put({...p, blob:await d2b(p.blob)});
      for(const [k,d] of Object.entries(j.covers||{})) await DB.cset(k, await d2b(d));
      toast("匯入完成"); setTimeout(() => location.reload(), 700);
    }catch(e){ toast("這不是有效的備份檔"); }
  }
  function render(){
    return `<div class="wrap view"><section class="blk"><div class="sec-h"><h2>備份與同步</h2><span class="en">Backup</span><span class="rule"></span></div>
      <div class="note-box" style="margin-bottom:16px"><b>資料存在哪？</b> 預算、清單、照片都存在「這台裝置的這個瀏覽器」裡，重新整理不會消失；但<b>你和男朋友各自的手機不會自動同步</b>。想合併，請其中一人匯出備份檔、傳給另一人匯入。${Store.ok?"":"<br>⚠ 此瀏覽器目前無法永久儲存（可能是無痕模式）。"}</div>
      <div class="grid g2">
        <div class="card pad"><h3 style="font-size:1.05rem">匯出備份</h3><p class="muted" style="font-size:.88rem">下載 JSON 檔。含照片的檔案會比較大。</p>
          <div class="actions"><button class="btn pri" data-tool="exp">${ic("down")}匯出（不含照片）</button><button class="btn" data-tool="exp-ph">${ic("down")}匯出（含照片）</button></div></div>
        <div class="card pad"><h3 style="font-size:1.05rem">匯入備份</h3><p class="muted" style="font-size:.88rem">選擇之前匯出的檔案。<b>會覆蓋同名資料</b>（例如預算、清單）。</p>
          <div class="actions"><button class="btn pri" data-tool="imp">匯入檔案</button></div></div>
      </div>
      <div class="card pad" style="margin-top:16px"><h3 style="font-size:1.05rem">重設</h3><p class="muted" style="font-size:.88rem">清除這個網站在此瀏覽器的所有資料（預算、清單、照片、待確認勾選）。無法復原，請先匯出。</p>
        <div class="actions"><button class="btn danger" data-tool="wipe">${ic("trash")}清除全部資料</button></div></div></section></div>`;
  }
  function bind(root){
    root.addEventListener("click", e => {
      const b = e.target.closest("[data-tool]"); if(!b) return; const a = b.dataset.tool;
      if(a==="exp") exportAll(false); else if(a==="exp-ph") exportAll(true);
      else if(a==="imp"){ const i = document.createElement("input"); i.type="file"; i.accept="application/json,.json"; i.onchange = () => i.files[0] && importAll(i.files[0]); i.click(); }
      else if(a==="wipe") confirmBox("真的要清除全部資料嗎？", async () => { Store.keys().forEach(k => Store.del(k)); for(const p of await DB.all()) await DB.del(p.id); toast("已清除"); setTimeout(()=>location.reload(), 600); }, "清除");
    });
  }
  return { render, bind };
})();
