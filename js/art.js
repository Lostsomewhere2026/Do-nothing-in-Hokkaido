/* 手繪風插畫佔位圖（沒有放照片時顯示）。想換成真實照片：看 README 的「換照片」。 */
const ART = (() => {
  const day  = ["#E9EFF3","#F6F0E3"], dusk = ["#C9D5E0","#F1E3CC"], night = ["#3B4C63","#7C8CA3"];
  const hills = (a="#DCE4EA", b="#EDF0EE", c="#FBF8F1") =>
    `<path d="M0 135C60 105 110 118 170 100S300 92 400 118V205H0z" fill="${a}"/>
     <path d="M0 160C70 135 140 150 210 132S340 128 400 146V205H0z" fill="${b}"/>
     <path d="M0 182C90 168 170 176 250 166S350 162 400 172V205H0z" fill="${c}"/>`;
  const pines = (xs, y=150, s=1, col="#6E8479") => xs.map(x =>
    `<g transform="translate(${x} ${y}) scale(${s})" fill="${col}"><path d="M0-34L9-14H-9zM0-24L12 0H-12zM0-12L15 14H-15z"/><rect x="-1.5" y="14" width="3" height="6" fill="#8A7B6A"/></g>`).join("");
  const snow = n => Array.from({length:n},(_,i)=>`<circle cx="${(i*67+23)%400}" cy="${(i*41+11)%190}" r="${1+(i%3)*.6}" fill="#fff" opacity=".8"/>`).join("");
  const sun = (x=300,y=48,r=22,c="#F6E3BF") => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".9"/>`;
  const scenes = {
    hill:()=>[day, sun()+hills()+pines([70,98,330,355],152,1)],
    tree:()=>[day, sun(90,50)+hills()+`<g transform="translate(260 128)"><rect x="-2" y="0" width="4" height="22" fill="#8A7B6A"/><path d="M0-62L16-32H-16zM0-48L22-14H-22zM0-30L28 6H-28z" fill="#738A7E"/><path d="M0-62L6-50H-6z" fill="#fff"/></g>`+pines([60,86],160,.7)],
    tower:()=>[day, sun(80,50,18)+hills()+`<g transform="translate(250 60)"><rect x="-14" y="0" width="28" height="104" fill="#C9B79B"/><rect x="-20" y="-14" width="40" height="18" fill="#9A7B58"/><path d="M-20-14L0-34L20-14z" fill="#7C6347"/><g fill="#FFFDF8" opacity=".8"><rect x="-6" y="14" width="4" height="6"/><rect x="2" y="14" width="4" height="6"/><rect x="-6" y="34" width="4" height="6"/><rect x="2" y="34" width="4" height="6"/></g></g>`+pines([70,340],160,.8)],
    ropeway:()=>[day, `<path d="M0 150L90 70L140 110L215 40L290 118L340 85L400 140V205H0z" fill="#CBD7E1"/><path d="M215 40L190 70L205 66L215 82L230 64L246 72z" fill="#fff"/>`+hills("#E3EAEF","#EEF1EF","#FBF8F1")+`<path d="M30 175L370 70" stroke="#6E5F50" stroke-width="1.6"/><g transform="translate(210 114) rotate(-17)"><rect x="-12" y="4" width="24" height="16" rx="3" fill="#B9705F"/><path d="M0 4V-2" stroke="#6E5F50" stroke-width="1.6"/></g>`],
    canal:()=>[dusk, sun(310,56,20,"#F7DDB0")+`<g fill="#C9B79B"><rect x="20" y="86" width="80" height="62"/><rect x="104" y="70" width="70" height="78" fill="#B8A68A"/><rect x="180" y="92" width="90" height="56"/></g><g fill="#FFFDF8" opacity=".7"><rect x="34" y="100" width="10" height="14"/><rect x="58" y="100" width="10" height="14"/><rect x="122" y="88" width="10" height="14"/><rect x="146" y="88" width="10" height="14"/><rect x="200" y="106" width="10" height="14"/><rect x="226" y="106" width="10" height="14"/></g><rect y="148" width="400" height="57" fill="#9FB4C5"/><g stroke="#E8EEF2" stroke-width="1.4" opacity=".8"><path d="M20 164h70M120 176h90M240 160h100M60 190h120M250 190h110"/></g><g fill="#6E5F50"><rect x="290" y="108" width="2" height="40"/><circle cx="291" cy="104" r="5" fill="#F6E3BF"/></g>`],
    lights:()=>[night, `<g fill="#F7DDB0">${Array.from({length:34},(_,i)=>`<circle cx="${(i*37+14)%390}" cy="${50+((i*53)%90)}" r="${1.6+(i%3)}" opacity="${.5+(i%4)*.12}"/>`).join("")}</g>`+`<path d="M0 150C80 130 160 150 240 136S350 132 400 144V205H0z" fill="#E6ECF1"/><path d="M0 182C100 168 200 178 400 168V205H0z" fill="#F7F4EC"/>`+pines([60,100,310,350],150,1,"#4F6659")+`<g transform="translate(200 40)"><path d="M0-6L10 24H-10z" fill="#F7DDB0" opacity=".9"/><rect x="-1.5" y="24" width="3" height="90" fill="#F7DDB0" opacity=".8"/></g>`],
    night:()=>[night, `<g fill="#F7DDB0">${Array.from({length:24},(_,i)=>`<rect x="${(i*41+10)%380}" y="${100+((i*29)%50)}" width="9" height="13" opacity="${.35+(i%3)*.2}"/>`).join("")}</g><rect y="155" width="400" height="50" fill="#26334A"/><g stroke="#C9A66B" stroke-width="2"><path d="M30 160h60M120 170h90M250 160h100"/></g>`],
    shrine:()=>[day, sun(80,48,18)+hills()+pines([40,70,350,372],150,1.1)+`<g transform="translate(200 160)" fill="#B9705F"><rect x="-44" y="-62" width="88" height="8" rx="2"/><rect x="-36" y="-48" width="72" height="5"/><rect x="-30" y="-54" width="8" height="64"/><rect x="22" y="-54" width="8" height="64"/></g>`],
    park:()=>[day, sun()+hills()+`<ellipse cx="200" cy="176" rx="90" ry="12" fill="#CFDDE8"/>`+pines([50,88,126,288,330,370],150,1)],
    street:()=>[dusk, `<g fill="#C9B79B"><rect x="0" y="40" width="400" height="26"/></g><g fill="#9A7B58"><rect x="0" y="62" width="400" height="6"/></g>`+Array.from({length:7},(_,i)=>`<g transform="translate(${20+i*56} 68)"><rect width="46" height="86" fill="${i%2?"#E3D8C3":"#D3C5AC"}"/><rect x="6" y="10" width="14" height="18" fill="#FFFDF8" opacity=".8"/><rect x="26" y="10" width="14" height="18" fill="#FFFDF8" opacity=".8"/><rect x="14" y="48" width="18" height="38" fill="#9A7B58" opacity=".7"/></g>`).join("")+`<rect y="154" width="400" height="51" fill="#F3EEE3"/>`],
    food:()=>[["#F1EADC","#FAF6EE"], `<ellipse cx="200" cy="130" rx="86" ry="16" fill="#E4D9C4"/><path d="M118 100a82 52 0 0 0 164 0z" fill="#FFFDF8" stroke="#C9B79B" stroke-width="2"/><path d="M134 100a66 8 0 0 1 132 0" fill="#E7C896" opacity=".85"/><g stroke="#B9A586" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"><path d="M170 78c-8-10 8-14 0-26M200 76c-8-10 8-14 0-26M230 78c-8-10 8-14 0-26"/></g>`],
    hotel:()=>[dusk, `<rect x="130" y="42" width="140" height="116" fill="#D8CDB8"/><g fill="#FFFDF8" opacity=".85">${Array.from({length:12},(_,i)=>`<rect x="${142+(i%4)*32}" y="${54+Math.floor(i/4)*34}" width="18" height="22"/>`).join("")}</g><rect x="186" y="124" width="28" height="34" fill="#9A7B58"/>`+`<path d="M0 158H400V205H0z" fill="#F3EEE3"/>`+pines([60,340],156,1)],
    airport:()=>[day, sun(90,52,20)+`<g transform="translate(220 80) rotate(-12)" fill="#FFFDF8" stroke="#A9BCCB" stroke-width="2"><path d="M-70 0L40-8C60-10 74-4 74 0s-14 10-34 8L-70 6z"/><path d="M-10-4L-34-36H-20L20-6zM-10 6L-34 38H-20L20 8z"/><path d="M-70 0l-8-18h10l16 12z"/></g>`+`<path d="M0 170h400v35H0z" fill="#E4EAEE"/><path d="M0 188h400" stroke="#fff" stroke-width="3" stroke-dasharray="22 14"/>`],
    train:()=>[day, hills()+`<g transform="translate(70 118)"><rect width="250" height="38" rx="9" fill="#FFFDF8" stroke="#A9BCCB" stroke-width="2"/><rect y="22" width="250" height="7" fill="#5E7A95"/><g fill="#CFDAE4">${Array.from({length:7},(_,i)=>`<rect x="${14+i*34}" y="8" width="22" height="12" rx="2"/>`).join("")}</g></g><path d="M0 172H400" stroke="#8A7B6A" stroke-width="3"/>`],
    lounge:()=>[dusk, `<rect x="40" y="110" width="320" height="50" rx="12" fill="#D8CDB8"/><rect x="40" y="90" width="320" height="30" rx="10" fill="#C9B79B"/><g stroke="#E8EEF2" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9"><path d="M150 80c-8-10 8-14 0-26M200 80c-8-10 8-14 0-26M250 80c-8-10 8-14 0-26"/></g>`],
    shop:()=>[dusk, `<g transform="translate(120 70)"><rect width="160" height="90" fill="#E3D8C3"/><path d="M-10 0h180l-14-24H4z" fill="#B9705F"/><rect x="14" y="30" width="46" height="60" fill="#FFFDF8" opacity=".8"/><rect x="76" y="30" width="70" height="36" fill="#CFDAE4"/></g><rect y="160" width="400" height="45" fill="#F3EEE3"/>`]
  };
  function svg(kind="hill", opts={}){
    const [g, body] = (scenes[kind] || scenes.hill)();
    const id = "g" + Math.random().toString(36).slice(2,7);
    const sn = opts.snow ? snow(opts.snow) : "";
    return `<svg viewBox="0 0 400 205" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="插畫">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset="1" stop-color="${g[1]}"/></linearGradient></defs>
      <rect width="400" height="205" fill="url(#${id})"/>${body}${sn}</svg>`;
  }
  /* 大版首頁主視覺 */
  function hero(){
    return `<svg viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9E4EC"/><stop offset=".6" stop-color="#F0EEE6"/><stop offset="1" stop-color="#FAF6EE"/></linearGradient></defs>
    <rect width="1200" height="720" fill="url(#hs)"/>
    <circle cx="880" cy="190" r="70" fill="#F8E7C6" opacity=".85"/>
    <path d="M0 430L170 300L260 370L430 220L560 350L720 270L900 400L1050 320L1200 410V720H0z" fill="#C7D5E0"/>
    <path d="M430 220L385 285L420 272L440 305L470 268L505 285z" fill="#fff" opacity=".9"/>
    <path d="M0 500C180 430 330 470 520 430S900 410 1200 470V720H0z" fill="#DCE5EB"/>
    <path d="M0 560C230 500 380 550 620 520S1000 500 1200 540V720H0z" fill="#EAEFF0"/>
    <path d="M0 620C300 580 520 620 800 596S1080 590 1200 610V720H0z" fill="#F6F3EC"/>
    <g transform="translate(900 520)"><rect x="-4" y="0" width="8" height="60" fill="#8A7B6A"/><path d="M0-150L40-80H-40zM0-120L55-35H-55zM0-72L68 14H-68z" fill="#6E8479"/><path d="M0-150L16-122H-16zM0-120L24-88H-24z" fill="#fff" opacity=".9"/></g>
    ${[120,170,230,1020,1080].map((x,i)=>`<g transform="translate(${x} ${560+i%2*14}) scale(${1-i%3*.12})" fill="#7D9186"><path d="M0-70L18-30H-18zM0-48L24 0H-24zM0-22L30 30H-30z"/><rect x="-3" y="30" width="6" height="12" fill="#8A7B6A"/></g>`).join("")}
    <g stroke="#B6A58A" stroke-width="2" opacity=".5">${Array.from({length:14},(_,i)=>`<path d="M${60+i*84} 640v-30"/>`).join("")}</g>
    </svg>`;
  }
  function snowflakes(n=26){
    return Array.from({length:n},()=>`<i style="left:${Math.random()*100}%;--dx:${(Math.random()*60-30).toFixed(0)}px;animation-duration:${(9+Math.random()*10).toFixed(1)}s;animation-delay:${(-Math.random()*14).toFixed(1)}s;width:${(2+Math.random()*4).toFixed(1)}px;height:${(2+Math.random()*4).toFixed(1)}px;opacity:${(.5+Math.random()*.4).toFixed(2)}"></i>`).join("");
  }
  return { svg, hero, snowflakes };
})();
