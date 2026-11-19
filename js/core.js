/* 共用工具：儲存、圖示、彈窗、地圖連結 */
const T = window.TRIP;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);
const DOW = ["日","一","二","三","四","五","六"];

/* ---- 本機儲存（localStorage，失敗時退回記憶體） ---- */
const Store = (() => {
  const mem = {}; let ok = true;
  try { localStorage.setItem("hk26:t","1"); localStorage.removeItem("hk26:t"); } catch(e){ ok = false; }
  return {
    ok,
    get(k, d){ try{ const v = ok ? localStorage.getItem("hk26:"+k) : mem[k]; return v==null ? d : JSON.parse(v); }catch(e){ return d; } },
    set(k, v){ const s = JSON.stringify(v); try{ if(ok) localStorage.setItem("hk26:"+k, s); else mem[k]=s; }catch(e){ mem[k]=s; } },
    del(k){ try{ ok ? localStorage.removeItem("hk26:"+k) : delete mem[k]; }catch(e){} },
    keys(){ return ok ? Object.keys(localStorage).filter(k=>k.startsWith("hk26:")).map(k=>k.slice(5)) : Object.keys(mem); }
  };
})();

/* ---- 圖示 ---- */
const P = {
  pin:'<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  nav:'<path d="M3 11l18-8-8 18-2-8z"/>',
  car:'<path d="M5 16V11l1.7-4.2A2 2 0 0 1 8.6 5.5h6.8a2 2 0 0 1 1.9 1.3L19 11v5"/><path d="M3 16h18v2.5H3z"/><circle cx="7.5" cy="14" r=".6"/><circle cx="16.5" cy="14" r=".6"/>',
  train:'<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8 21l2-4M16 21l-2-4"/><circle cx="9" cy="14" r=".6"/><circle cx="15" cy="14" r=".6"/>',
  walk:'<circle cx="13" cy="4.5" r="1.8"/><path d="M9 21l2.5-6.5L9.5 12l1.5-4 3.5 1.5L16 12M13 14.5l2.5 6.5M10 8L7 11"/>',
  plane:'<path d="M2 14l8-2-4-8h2l7 7 6-1.5a1.6 1.6 0 0 1 .5 3L15 14l-4 8H9l1-8z"/>',
  bed:'<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.7"/>',
  food:'<path d="M7 3v8a2 2 0 0 0 2 2v8M7 3v6M11 3v6M9 3v6M17 21V3c-2.5 1.5-3 5-3 8h3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  alert:'<path d="M12 3L2 20h20z"/><path d="M12 10v4M12 17.2v.1"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.1"/>',
  ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  camera:'<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  home:'<path d="M3 11l9-7 9 7M5 10v10h14V10"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  coin:'<circle cx="12" cy="12" r="9"/><path d="M14.5 9a3 3 0 0 0-5 0c0 3 5 2 5 5a3 3 0 0 1-5 0M12 6.5v11"/>',
  list:'<path d="M9 6h12M9 12h12M9 18h12"/><path d="M3.5 6l1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2"/>',
  cloud:'<path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5 4.3 4.3 0 0 1 17.5 18z"/>',
  more:'<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  edit:'<path d="M4 20l4-1L19 8l-3-3L5 16z"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  down:'<path d="M12 4v12M6 12l6 6 6-6M5 21h14"/>',
  snow:'<path d="M12 2v20M4 7l16 10M20 7L4 17"/>',
  sunset:'<path d="M3 18h18M7 18a5 5 0 0 1 10 0M12 4v4M5 9l2 2M19 9l-2 2"/>',
  check:'<path d="M5 12l5 5 9-10"/>',
  map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'
};
const ic = (n, cls="") => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]||""}</svg>`;

/* ---- 日期 ---- */
const fmtMD = iso => { const [y,m,d] = iso.split("-"); return `${+m}/${+d}`; };
const tripStart = () => new Date(T.meta.start + "T00:00:00+09:00");
const daysUntil = () => Math.ceil((tripStart() - new Date())/86400000);

/* ---- Google Maps 連結 ---- */
const enc = encodeURIComponent;
const GM = {
  search: q => `https://www.google.com/maps/search/?api=1&query=${enc(q)}`,
  dir: (to, from, mode="driving", via=[]) =>
    `https://www.google.com/maps/dir/?api=1&destination=${enc(to)}${from?`&origin=${enc(from)}`:""}&travelmode=${mode}${via.length?`&waypoints=${enc(via.join("|"))}`:""}`,
  embed: q => `https://www.google.com/maps?q=${enc(q)}&hl=zh-TW&output=embed`,
  embedRoute: (stops, mode="driving") => {
    const flag = {driving:"d", transit:"r", walking:"w"}[mode] || "d";
    const [a, ...rest] = stops;
    return `https://www.google.com/maps?saddr=${enc(a)}&daddr=${enc(rest.join(" to:"))}&dirflg=${flag}&hl=zh-TW&output=embed`.replace(/%20to%3A/g, "+to:");
  }
};
const modeOf = m => ({car:"driving", transit:"transit", walk:"walking"}[m] || "driving");

/* ---- 彈窗 / 提示 ---- */
function openModal(html, onMount){
  closeModal();
  const bg = document.createElement("div");
  bg.className = "modal-bg"; bg.id = "modal-bg";
  bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  bg.addEventListener("mousedown", e => { if(e.target === bg) closeModal(); });
  $("#modal-root").appendChild(bg);
  document.addEventListener("keydown", escClose);
  if(onMount) onMount(bg.firstElementChild);
  return bg.firstElementChild;
}
function escClose(e){ if(e.key === "Escape") closeModal(); }
function closeModal(){ const m = $("#modal-bg"); if(m) m.remove(); document.removeEventListener("keydown", escClose); }
function toast(msg){
  const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
}
function confirmBox(msg, onYes, yes="確定"){
  openModal(`<h3>${esc(msg)}</h3><div class="row-btn"><button class="btn" data-no>取消</button><button class="btn pri" data-yes>${yes}</button></div>`, m => {
    $("[data-no]", m).onclick = closeModal;
    $("[data-yes]", m).onclick = () => { closeModal(); onYes(); };
  });
}

/* ---- 天氣代碼（WMO） ---- */
const WX = c => {
  if(c===0) return ["晴","sun"]; if(c===1) return ["大致晴朗","sun"]; if(c===2) return ["多雲","pc"]; if(c===3) return ["陰","cloud"];
  if(c===45||c===48) return ["霧","cloud"]; if(c>=51&&c<=57) return ["毛毛雨","rain"]; if(c>=61&&c<=67) return ["雨","rain"];
  if(c>=71&&c<=77) return ["雪","snow"]; if(c>=80&&c<=82) return ["陣雨","rain"]; if(c===85||c===86) return ["陣雪","snow"];
  if(c>=95) return ["雷雨","rain"]; return ["—","cloud"];
};
function wxSvg(kind){
  const cl = '<path d="M16 40a9 9 0 0 1-1-17.9A12 12 0 0 1 38 25a8 8 0 0 1-1 15z" fill="#E3EAF0" stroke="#A9BCCB" stroke-width="2"/>';
  const sun = '<circle cx="32" cy="32" r="10" fill="#F3DDB4" stroke="#C9A66B" stroke-width="2"/><g stroke="#C9A66B" stroke-width="2" stroke-linecap="round"><path d="M32 12v6M32 46v6M12 32h6M46 32h6M18 18l4 4M42 42l4 4M46 18l-4 4M22 42l-4 4"/></g>';
  let body = cl;
  if(kind==="sun") body = sun;
  if(kind==="pc") body = '<circle cx="42" cy="22" r="8" fill="#F3DDB4" stroke="#C9A66B" stroke-width="2"/>' + cl;
  if(kind==="rain") body = cl + '<path d="M22 46l-2 6M32 46l-2 6M42 46l-2 6" stroke="#5E7A95" stroke-width="2.4" stroke-linecap="round"/>';
  if(kind==="snow") body = cl + '<g fill="#fff" stroke="#8FA8BE" stroke-width="1.6"><circle cx="22" cy="49" r="2.4"/><circle cx="32" cy="52" r="2.4"/><circle cx="42" cy="49" r="2.4"/></g>';
  return `<svg class="wx" viewBox="0 0 64 64">${body}</svg>`;
}
