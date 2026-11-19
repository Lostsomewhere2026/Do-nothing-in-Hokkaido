/* 相簿與自訂封面：照片存在你自己瀏覽器的 IndexedDB（不會上傳到任何伺服器） */
const DB = (() => {
  let db = null, ok = false; const mem = {photos:new Map(), covers:new Map()};
  const ready = new Promise(res => {
    try{
      const rq = indexedDB.open("hk26", 1);
      rq.onupgradeneeded = () => { const d = rq.result; d.createObjectStore("photos", {keyPath:"id"}); d.createObjectStore("covers"); };
      rq.onsuccess = () => { db = rq.result; ok = true; res(); };
      rq.onerror = rq.onblocked = () => res();
    }catch(e){ res(); }
  });
  const tx = (store, mode, fn) => new Promise((res, rej) => {
    const t = db.transaction(store, mode), r = fn(t.objectStore(store));
    t.oncomplete = () => res(r && r.result); t.onerror = () => rej(t.error);
  });
  return {
    ready, get ok(){ return ok; },
    async all(){ await ready; return ok ? (await tx("photos","readonly", s => s.getAll())) || [] : [...mem.photos.values()]; },
    async put(p){ await ready; if(ok) await tx("photos","readwrite", s => s.put(p)); else mem.photos.set(p.id, p); },
    async del(id){ await ready; if(ok) await tx("photos","readwrite", s => s.delete(id)); else mem.photos.delete(id); },
    async cget(k){ await ready; return ok ? await tx("covers","readonly", s => s.get(k)) : mem.covers.get(k); },
    async cset(k, b){ await ready; if(ok) await tx("covers","readwrite", s => s.put(b, k)); else mem.covers.set(k, b); },
    async cdel(k){ await ready; if(ok) await tx("covers","readwrite", s => s.delete(k)); else mem.covers.delete(k); }
  };
})();

async function compress(file, max=1600, q=.82){
  try{
    const bmp = await createImageBitmap(file, {imageOrientation:"from-image"});
    const sc = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas"); c.width = Math.round(bmp.width*sc); c.height = Math.round(bmp.height*sc);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    const b = await new Promise(r => c.toBlob(r, "image/jpeg", q));
    return b || file;
  }catch(e){ return file; }
}
function pickFiles(multiple, cb){
  const i = document.createElement("input"); i.type = "file"; i.accept = "image/*"; i.multiple = !!multiple;
  i.onchange = () => cb(Array.from(i.files)); i.click();
}

/* ---- 景點／餐廳封面換成自己的照片 ---- */
async function hydrateCovers(root){
  for(const el of $$("[data-cover]", root)){
    const blob = await DB.cget(el.dataset.cover);
    if(blob){
      const url = URL.createObjectURL(blob);
      const old = el.querySelector("svg:not(.i), img"); if(old) old.outerHTML = `<img src="${url}" alt="" loading="lazy">`;
      const rb = el.querySelector("[data-cover-reset]"); if(rb) rb.classList.remove("hidden");
    }
  }
}

const Photos = (() => {
  const state = {tab:"all", items:[], urls:{}, lb:-1};
  const DAYS = [1,2,3,4,5,6,7];
  const dayName = n => n==="all" ? "全部" : "DAY " + n;
  const url = p => state.urls[p.id] || (state.urls[p.id] = URL.createObjectURL(p.blob));
  const shown = () => state.items.filter(p => state.tab==="all" || String(p.day)===String(state.tab)).sort((a,b)=>b.ts-a.ts);

  async function load(){ state.items = await DB.all(); }
  function tabs(){
    const cnt = n => state.items.filter(p => String(p.day)===String(n)).length;
    return `<div class="ptabs"><button class="${state.tab==="all"?"on":""}" data-ptab="all">全部<small>${state.items.length}</small></button>${DAYS.map(n=>`<button class="${state.tab==n?"on":""}" data-ptab="${n}">DAY ${n}<small>${cnt(n)}</small></button>`).join("")}</div>`;
  }
  function grid(){
    const list = shown();
    if(!list.length) return `<div class="empty">${ic("camera")}<div>${state.tab==="all"?"還沒有照片":dayName(state.tab)+" 還沒有照片"}。<br>點上方「上傳照片」開始收藏。</div></div>`;
    return `<div class="masonry">${list.map((p,i)=>`<figure class="ph-item" data-open="${i}"><img src="${url(p)}" alt="${esc(p.cap||"")}" loading="lazy">${p.cap?`<figcaption class="cap"><b>${esc(p.cap)}</b></figcaption>`:`<figcaption class="cap"><b>${dayName(p.day)}</b></figcaption>`}</figure>`).join("")}</div>`;
  }
  async function render(){
    await load();
    return `<div class="wrap view"><section class="blk"><div class="sec-h"><h2>旅行相簿</h2><span class="en">Photo wall</span><span class="rule"></span></div>
      ${DB.ok?"":`<div class="note-box" style="margin-bottom:14px">此瀏覽器無法永久儲存照片（可能是無痕模式）。照片只會暫存到關閉分頁為止。</div>`}
      <div class="filters" style="justify-content:space-between;align-items:center"><div class="fgrp"><label class="lbl" for="up-day">上傳到</label><select id="up-day" style="width:auto">${DAYS.map(n=>`<option value="${n}" ${state.tab==n?"selected":""}>DAY ${n}</option>`).join("")}</select></div>
        <button class="btn pri" data-ph="upload">${ic("plus")}上傳照片</button></div>
      <div id="ptabs">${tabs()}</div><div id="pgrid">${grid()}</div>
      <p class="muted" style="font-size:.78rem;margin-top:16px;font-family:var(--sans)">照片會自動縮小並存在這台裝置的瀏覽器裡，不會上傳到網路。換手機或清除瀏覽資料前，請到「備份」頁匯出。</p></section></div>`;
  }
  const redraw = () => { $("#ptabs").innerHTML = tabs(); $("#pgrid").innerHTML = grid(); };

  async function upload(files, day){
    let n = 0;
    for(const f of files){
      if(!f.type.startsWith("image/")) continue;
      const blob = await compress(f);
      await DB.put({id:uid(), day:+day, cap:"", ts:Date.now()+n++, blob, name:f.name});
    }
    await load(); redraw(); toast(`已加入 ${n} 張照片`);
  }

  /* 燈箱 */
  function openLb(i){
    state.lb = i; const list = shown(), p = list[i]; if(!p) return;
    let el = $("#lb"); if(!el){ el = document.createElement("div"); el.id = "lb"; el.className = "lb"; document.body.appendChild(el); }
    el.innerHTML = `<div class="top"><span>${dayName(p.day)} · ${i+1}/${list.length}</span><button class="btn sm" data-lb="close">${ic("x")}關閉</button></div>
      <div class="stage"><button class="nav l btn" data-lb="prev" aria-label="上一張">‹</button><img src="${url(p)}" alt=""><button class="nav btn" data-lb="next" aria-label="下一張">›</button></div>
      <div class="bot"><input type="text" id="lb-cap" placeholder="寫一句說明…" value="${esc(p.cap||"")}"><select id="lb-day">${DAYS.map(n=>`<option value="${n}" ${n==p.day?"selected":""}>DAY ${n}</option>`).join("")}</select>
        <button class="btn sm" data-lb="save">儲存</button><button class="btn sm" data-lb="dl">${ic("down")}下載</button><button class="btn sm danger" data-lb="del">${ic("trash")}刪除</button></div>`;
    document.addEventListener("keydown", lbKey);
  }
  function closeLb(){ const el = $("#lb"); if(el) el.remove(); state.lb = -1; document.removeEventListener("keydown", lbKey); }
  function lbKey(e){ if(e.target.matches("input,select")) return; if(e.key==="Escape") closeLb(); if(e.key==="ArrowLeft") step(-1); if(e.key==="ArrowRight") step(1); }
  function step(d){ const n = shown().length; if(n) openLb((state.lb + d + n) % n); }

  function bind(root){
    root.addEventListener("click", async e => {
      const t = e.target;
      const cp = t.closest("[data-cover-pick]");
      if(cp){ pickFiles(false, async fs => { if(!fs[0]) return; await DB.cset(cp.dataset.coverPick, await compress(fs[0], 1400)); const box = cp.closest("[data-cover]"); const blob = await DB.cget(cp.dataset.coverPick); box.querySelector("svg:not(.i), img").outerHTML = `<img src="${URL.createObjectURL(blob)}" alt="">`; box.querySelector("[data-cover-reset]").classList.remove("hidden"); toast("已換成你的照片"); }); return; }
      const cr = t.closest("[data-cover-reset]");
      if(cr){ await DB.cdel(cr.dataset.coverReset); const box = cr.closest("[data-cover]"); box.querySelector("img").outerHTML = ART.svg(box.dataset.kind); cr.classList.add("hidden"); toast("已還原插畫"); return; }
      if(t.closest("[data-ph=upload]")){ pickFiles(true, fs => upload(fs, $("#up-day").value)); return; }
      const tab = t.closest("[data-ptab]"); if(tab){ state.tab = tab.dataset.ptab; const s = $("#up-day"); if(s && state.tab!=="all") s.value = state.tab; redraw(); return; }
      const op = t.closest("[data-open]"); if(op){ openLb(+op.dataset.open); return; }
    });
    document.addEventListener("click", async e => {
      const b = e.target.closest("[data-lb]"); if(!b) return;
      const a = b.dataset.lb, p = shown()[state.lb];
      if(a==="close") closeLb(); else if(a==="prev") step(-1); else if(a==="next") step(1);
      else if(!p) return;
      else if(a==="save"){ p.cap = $("#lb-cap").value.trim(); p.day = +$("#lb-day").value; await DB.put(p); await load(); const i = shown().findIndex(x=>x.id===p.id); redraw(); if(i<0) closeLb(); else openLb(i); toast("已儲存"); }
      else if(a==="dl"){ const l = document.createElement("a"); l.href = url(p); l.download = (p.name||"photo.jpg"); document.body.appendChild(l); l.click(); l.remove(); }
      else if(a==="del") confirmBox("刪除這張照片？", async () => { await DB.del(p.id); delete state.urls[p.id]; await load(); redraw(); closeLb(); toast("已刪除"); }, "刪除");
    });
  }
  return { render, bind };
})();
