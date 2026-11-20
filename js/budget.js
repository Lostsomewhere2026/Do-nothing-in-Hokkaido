/* 預算管理：記帳、匯率換算、分類預算、兩人分帳 */
const Budget = (() => {
  const CUR = {JPY:"日圓 ¥", TWD:"台幣 NT$", MYR:"令吉 RM"};
  const SYM = {JPY:"¥", TWD:"NT$", MYR:"RM"}, CURN = {JPY:"日圓", TWD:"台幣", MYR:"令吉"};
  const DEF = { base:"MYR", rates:{JPY:0.0286, TWD:0.143, MYR:1}, ratesNote:"預設匯率只是佔位數字，請用「更新即時匯率」或自行輸入", total:0, planned:{}, people:["我","男朋友"] };
  const load = () => { let s = Store.get("bud:set", {}); if(s.rates && !s.base){ s = { people:s.people, ratesNote:"" }; } const base = s.base || DEF.base; return { ...DEF, ...s, base, rates:{...DEF.rates, ...(s.rates||{}), [base]:1}, planned:s.planned||{}, people:(s.people&&s.people.length?s.people:DEF.people) }; };
  const loadEx = () => Store.get("bud:ex", []);
  const saveSet = s => Store.set("bud:set", s);
  const saveEx = e => Store.set("bud:ex", e);
  const toBase = (x, s) => (+x.amt || 0) * (s.rates[x.cur] || 0);
  const fmt = (n, d=0) => (Math.round(n * 10**d)/10**d).toLocaleString("en-US", {maximumFractionDigits:d});
  const catOf = id => T.budgetCats.find(c => c.id === id) || {name:"其他", color:"#999"};

  function calc(){
    const s = load(), ex = loadEx();
    const byCat = {}; T.budgetCats.forEach(c => byCat[c.id] = 0);
    let total = 0; const paid = {}, owe = {};
    s.people.forEach(p => { paid[p] = 0; owe[p] = 0; });
    ex.forEach(x => {
      const v = toBase(x, s); total += v; byCat[x.cat] = (byCat[x.cat]||0) + v;
      if(paid[x.payer] == null){ paid[x.payer] = 0; owe[x.payer] = 0; }
      paid[x.payer] += v;
      if(x.split === "payer") owe[x.payer] += v;
      else s.people.forEach(p => owe[p] += v / s.people.length);
    });
    const plannedSum = Object.values(s.planned).reduce((a,b)=>a+(+b||0),0);
    const budget = +s.total || plannedSum;
    return {s, ex, byCat, total, paid, owe, budget, plannedSum};
  }
  function settle(c){
    const bal = Object.keys(c.paid).map(p => ({p, v: c.paid[p] - c.owe[p]}));
    const give = bal.filter(b => b.v < -0.5).map(b => ({...b})).sort((a,b)=>a.v-b.v);
    const get = bal.filter(b => b.v > 0.5).map(b => ({...b})).sort((a,b)=>b.v-a.v);
    const out = []; let i=0, j=0;
    while(i<give.length && j<get.length){
      const m = Math.min(-give[i].v, get[j].v);
      out.push({from:give[i].p, to:get[j].p, v:m});
      give[i].v += m; get[j].v -= m;
      if(give[i].v > -0.5) i++; if(get[j].v < 0.5) j++;
    }
    return out;
  }

  function render(){
    const c = calc(), s = c.s, B = SYM[s.base], fb = n => fmt(n, s.base==="MYR"?2:0);
    const diff = c.budget - c.total;
    const exs = c.ex.slice().sort((a,b) => (b.date||"").localeCompare(a.date||"") || b.id.localeCompare(a.id));
    const jpyTot = c.ex.filter(x=>x.cur==="JPY").reduce((a,x)=>a+(+x.amt||0),0);
    return `<div class="wrap view"><section class="blk">
      <div class="sec-h"><h2>預算與記帳</h2><span class="en">Budget</span><span class="rule"></span></div>
      <div class="sumcards">
        <div class="sc"><div class="k">總預算（${CURN[s.base]}）</div><div class="v">${B} ${fb(c.budget)}</div><small>${s.total?"手動設定":"= 分類預算加總"}</small></div>
        <div class="sc"><div class="k">實際已花</div><div class="v">${B} ${fb(c.total)}</div><small>其中日圓 ¥${fmt(jpyTot)}</small></div>
        <div class="sc"><div class="k">${!c.budget?"預算差額":diff>=0?"預算剩餘":"已超出預算"}</div><div class="v ${!c.budget?"":diff>=0?"pos":"neg"}">${c.budget?B+" "+fb(Math.abs(diff)):"—"}</div><small>${c.budget?fmt(Math.min(999,c.total/c.budget*100))+"% 已使用":"尚未設定預算"}</small></div>
        <div class="sc"><div class="k">筆數</div><div class="v">${c.ex.length}</div><small>${s.people.map(esc).join("、")}</small></div>
      </div>

      <div class="bud-grid">
        <div>
          <div class="card pad"><h3 style="font-size:1.05rem;margin-bottom:10px">匯率（換算成${CURN[s.base]}）</h3>
            <label class="f">記帳與預算的主要幣別<select id="base-sel">${Object.keys(CURN).map(k=>`<option value="${k}" ${k===s.base?"selected":""}>${CURN[k]}</option>`).join("")}</select></label>
            <div class="frow">${Object.keys(CURN).filter(k=>k!==s.base).map(k=>`<label class="f">1 ${CURN[k]} ＝ ${B}<input type="number" step="0.0001" min="0" data-rate="${k}" value="${s.rates[k]}"></label>`).join("")}</div>
            <div class="actions"><button class="btn sm" data-bud="rate-live">${ic("down")}更新即時匯率</button><button class="btn sm pri" data-bud="rate-save">儲存匯率</button></div>
            <p class="muted" style="font-size:.76rem;margin-top:8px;font-family:var(--sans)" id="rate-note">${esc(s.ratesNote||"")}</p></div>

          <div class="card pad" style="margin-top:14px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><h3 style="font-size:1.05rem">分類預算</h3>
            <label class="f" style="display:flex;gap:6px;align-items:center;margin:0">總預算 ${B}<input type="number" min="0" id="bud-total" value="${s.total||""}" placeholder="自動" style="width:110px"></label></div>
            <div style="margin-top:8px">${T.budgetCats.map(cat => {
              const sp = c.byCat[cat.id]||0, pl = +s.planned[cat.id]||0, pct = pl? sp/pl*100 : 0;
              return `<div class="catrow"><div class="nm"><span class="dot" style="background:${cat.color}"></span>${esc(cat.name)}</div>
                <div class="amt">${B} ${fb(sp)}</div>
                <div class="bar"><i class="${pct>100?"over":""}" style="width:${Math.min(100,pct)}%;background:${pct>100?"":cat.color}"></i></div>
                <div class="sub"><span>預算 ${B} <input class="bi" type="number" min="0" data-plan="${cat.id}" value="${pl||""}" placeholder="0"></span><span>${pl?(pl-sp>=0?"剩 ":"超 ")+fb(Math.abs(pl-sp)):"—"}</span></div></div>`;
            }).join("")}</div></div>
        </div>

        <div>
          <div class="card pad"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="font-size:1.05rem">分帳結算</h3><button class="btn sm ghost" data-bud="people">${ic("edit")}改名</button></div>
            <div style="margin-top:8px;font-family:var(--sans);font-size:.86rem">${s.people.map(p=>`<div style="display:flex;justify-content:space-between;padding:4px 0"><span>${esc(p)} 先付</span><b>${B} ${fb(c.paid[p]||0)}</b></div><div style="display:flex;justify-content:space-between;padding:0 0 6px;color:var(--muted)"><span>${esc(p)} 應分攤</span><span>${B} ${fb(c.owe[p]||0)}</span></div>`).join("")}</div>
            <div class="settle">${(()=>{const r=settle(c); return r.length? r.map(t=>`<div>${esc(t.from)} → ${esc(t.to)}　<b>${B} ${fb(t.v)}</b>${s.base!=="JPY"&&s.rates.JPY?`<small>（約 ¥${fmt(t.v/s.rates.JPY)}）</small>`:""}</div>`).join("") : `<div class="muted">目前不需要轉帳 ✓</div>`;})()}</div></div>

          <div class="card pad" style="margin-top:14px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><h3 style="font-size:1.05rem">支出明細</h3>
            <button class="btn sm ghost" data-bud="csv">${ic("down")}匯出 CSV</button></div>
            <div class="exlist">${exs.length? exs.map(x => { const cat = catOf(x.cat);
              return `<div class="ex"><div class="dt">${x.date?fmtMD(x.date):"—"}</div>
                <div class="ds"><span class="dot" style="background:${cat.color}"></span>${esc(x.title||cat.name)}<small>${esc(cat.name)} · ${esc(x.payer)} 付款${x.split==="payer"?" · 個人支出":" · 均分"}${x.note?" · "+esc(x.note):""}</small></div>
                <div class="am">${SYM[x.cur]}${fb(+x.amt, x.cur==="MYR"?2:0)}${x.cur!==s.base?`<small>≈ ${B} ${fb(toBase(x,s))}</small>`:""}</div>
                <div class="ops"><button class="btn sm ghost" data-bud="edit" data-id="${x.id}" aria-label="編輯">${ic("edit")}</button><button class="btn sm ghost" data-bud="del" data-id="${x.id}" aria-label="刪除">${ic("trash")}</button></div></div>`; }).join("")
              : `<div class="empty">${ic("coin")}<div>還沒有記帳。點右下角「＋」新增第一筆。</div></div>`}</div></div>
        </div>
      </div></section></div>
      <button class="fab" data-bud="add" aria-label="新增支出">${ic("plus")}</button>`;
  }

  function form(x){
    const s = load(); x = x || {date:new Date().toISOString().slice(0,10), cat:"food", cur:"JPY", payer:s.people[0], split:"equal"};
    const inRange = x.date >= T.meta.start && x.date <= T.meta.end;
    return `<h3>${x.id?"編輯支出":"新增支出"}</h3>
      <div class="frow"><label class="f">日期<input type="date" id="x-date" value="${esc(x.date||"")}"></label>
      <label class="f">分類<select id="x-cat">${T.budgetCats.map(c=>`<option value="${c.id}" ${c.id===x.cat?"selected":""}>${esc(c.name)}</option>`).join("")}</select></label></div>
      <label class="f">項目<input type="text" id="x-title" value="${esc(x.title||"")}" placeholder="例如：湯咖哩、地鐵、伴手禮"></label>
      <div class="frow"><label class="f">金額<input type="number" step="any" min="0" id="x-amt" value="${x.amt==null?"":esc(x.amt)}" inputmode="decimal"></label>
      <label class="f">幣別<select id="x-cur">${Object.keys(CUR).map(k=>`<option value="${k}" ${k===x.cur?"selected":""}>${CUR[k]}</option>`).join("")}</select></label></div>
      <div class="muted" id="x-conv" style="font-size:.82rem;font-family:var(--sans);margin:-4px 0 8px"></div>
      <div class="frow"><label class="f">誰付款<select id="x-payer">${s.people.map(p=>`<option ${p===x.payer?"selected":""}>${esc(p)}</option>`).join("")}</select></label>
      <label class="f">分攤方式<select id="x-split"><option value="equal" ${x.split!=="payer"?"selected":""}>大家均分</option><option value="payer" ${x.split==="payer"?"selected":""}>只算付款人（個人支出）</option></select></label></div>
      <label class="f">備註（選填）<input type="text" id="x-note" value="${esc(x.note||"")}"></label>
      <div class="row-btn"><button class="btn" data-no>取消</button><button class="btn pri" data-save>儲存</button></div>`;
  }
  function openForm(x){
    openModal(form(x), m => {
      const upd = () => { const s = load(), B = SYM[s.base], fb = n => fmt(n, s.base==="MYR"?2:0), a = +$("#x-amt",m).value||0, cur=$("#x-cur",m).value; $("#x-conv",m).textContent = cur===s.base||!a ? "" : `≈ ${B} ${fb(a*(s.rates[cur]||0))}（匯率 ${s.rates[cur]}）`; };
      ["#x-amt","#x-cur"].forEach(q => $(q,m).addEventListener("input", upd)); upd();
      $("[data-no]",m).onclick = closeModal;
      $("[data-save]",m).onclick = () => {
        const amt = parseFloat($("#x-amt",m).value);
        if(!(amt >= 0) || isNaN(amt)){ toast("請輸入金額"); return; }
        const rec = { id:(x&&x.id)||uid(), date:$("#x-date",m).value, cat:$("#x-cat",m).value, title:$("#x-title",m).value.trim(), amt, cur:$("#x-cur",m).value, payer:$("#x-payer",m).value, split:$("#x-split",m).value, note:$("#x-note",m).value.trim() };
        const list = loadEx(), i = list.findIndex(e => e.id === rec.id);
        if(i>=0) list[i] = rec; else list.push(rec);
        saveEx(list); closeModal(); refresh(); toast(i>=0?"已更新":"已新增");
      };
    });
  }
  function refresh(){ const v = $("#view"), y = window.scrollY; v.innerHTML = render(); window.scrollTo(0, y); }

  async function liveRate(){
    const note = $("#rate-note"); if(note) note.textContent = "更新中…";
    try{
      const r = await fetch("https://open.er-api.com/v6/latest/JPY"); const j = await r.json();
      const R = k => k==="JPY" ? 1 : j.rates && j.rates[k]; const s = load();
      if(!R("TWD") || !R("MYR")) throw 0;
      Object.keys(CURN).filter(k => k!==s.base).forEach(k => s.rates[k] = +(R(s.base)/R(k)).toFixed(5));
      s.ratesNote = "已於 " + new Date().toLocaleString("zh-TW") + " 更新（來源：open.er-api.com，僅供參考，實際以刷卡／換匯為準）";
      saveSet(s); refresh(); toast("已更新匯率");
    }catch(e){ if(note) note.textContent = "無法取得即時匯率（可能離線），請手動輸入。"; toast("更新失敗，請手動輸入"); }
  }
  function csv(){
    const s = load(), rows = [["日期","分類","項目","金額","幣別","換算"+CURN[load().base],"付款人","分攤","備註"]];
    loadEx().forEach(x => rows.push([x.date, catOf(x.cat).name, x.title, x.amt, x.cur, Math.round(toBase(x,s)), x.payer, x.split==="payer"?"個人":"均分", x.note]));
    const txt = "﻿" + rows.map(r => r.map(v => `"${String(v==null?"":v).replace(/"/g,'""')}"`).join(",")).join("\r\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], {type:"text/csv;charset=utf-8"})); a.download = "hokkaido-budget.csv"; document.body.appendChild(a); a.click(); a.remove();
  }
  function bind(root){
    root.addEventListener("click", e => {
      const b = e.target.closest("[data-bud]"); if(!b) return;
      const a = b.dataset.bud, id = b.dataset.id;
      if(a==="add") openForm();
      else if(a==="edit") openForm(loadEx().find(x=>x.id===id));
      else if(a==="del") confirmBox("刪除這筆支出？", () => { saveEx(loadEx().filter(x=>x.id!==id)); refresh(); toast("已刪除"); }, "刪除");
      else if(a==="rate-live") liveRate();
      else if(a==="rate-save"){ const s = load(); $$("[data-rate]").forEach(i => { s.rates[i.dataset.rate] = +i.value || s.rates[i.dataset.rate]; }); s.ratesNote = "手動設定於 " + new Date().toLocaleString("zh-TW"); saveSet(s); refresh(); toast("匯率已儲存"); }
      else if(a==="csv") csv();
      else if(a==="people"){
        const s = load();
        openModal(`<h3>兩位旅伴的名字</h3>${s.people.map((p,i)=>`<label class="f">旅伴 ${i+1}<input type="text" data-pn="${i}" value="${esc(p)}"></label>`).join("")}<p class="muted" style="font-size:.8rem">改名後，舊記錄的付款人也會一起更新。</p><div class="row-btn"><button class="btn" data-no>取消</button><button class="btn pri" data-save>儲存</button></div>`, m => {
          $("[data-no]",m).onclick = closeModal;
          $("[data-save]",m).onclick = () => {
            const nn = $$("[data-pn]",m).map(i => i.value.trim() || "旅伴");
            const map = {}; s.people.forEach((p,i) => map[p] = nn[i]);
            saveEx(loadEx().map(x => ({...x, payer: map[x.payer]||x.payer})));
            s.people = nn; saveSet(s); closeModal(); refresh();
          };
        });
      }
    });
    root.addEventListener("change", e => {
      const t = e.target;
      if(t.id === "base-sel"){ const s = load(), nb = t.value, f = s.rates[nb] || 1; const nr = {}; Object.keys(CURN).forEach(k => nr[k] = k===nb ? 1 : +(s.rates[k]/f).toFixed(6));
        Object.keys(s.planned).forEach(k => s.planned[k] = Math.round(s.planned[k]/f)); s.total = Math.round((s.total||0)/f); s.rates = nr; s.base = nb; s.ratesNote = "已切換主要幣別，請確認匯率"; saveSet(s); refresh(); toast("主要幣別已切換"); }
      else if(t.matches("[data-plan]")){ const s = load(); s.planned[t.dataset.plan] = +t.value||0; saveSet(s); refresh(); }
      else if(t.id === "bud-total"){ const s = load(); s.total = +t.value||0; saveSet(s); refresh(); }
    });
  }
  return { render, bind };
})();
