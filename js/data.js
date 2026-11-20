/* ==========================================================================
   北海道冬日之旅 2026 — 行程資料檔
   --------------------------------------------------------------------------
   ★ 想修改行程、餐廳、住宿，只需要改這個檔案（用記事本開啟即可）。
   ★ 修改規則：只改引號 "..." 或 `...` 裡面的文字，不要刪掉逗號、引號和大括號。
   ★ 標示「待確認」的欄位 = 資料來源不一致或查不到，出發前請自行確認。
   ★ 內容主要依據你上傳的 PDF；餐廳為補充推薦，資料來源與日期寫在每間餐廳的 src 欄位。
   ========================================================================== */
window.TRIP = {

/* ---------------------------------------------------------------- 基本資料 */
meta: {
  title: "北海道冬日之旅",
  en: "HOKKAIDO TRAVEL JOURNAL",
  start: "2026-12-13", end: "2026-12-19",     // 旅行日期（倒數用）
  startLabel: "2026.12.13 SUN", endLabel: "12.19 SAT",
  people: "6 位旅伴（3 對情侶）",
  route: ["札幌 Sapporo","美瑛 Biei","富良野 Furano","旭岳 Asahidake","旭川 Asahikawa","小樽 Otaru"],
  driver: "小王（LINE 聯絡）",
  vehicle: "Toyota Hiace（豐田海獅）",
  lead: "一趟從吉隆坡出發，飛向札幌的冬日旅行。我們將穿過美瑛與富良野的茫茫雪原，登上旭岳纜車，走過旭川的安靜街巷，最後回到札幌與小樽，在運河的燈火裡為旅程畫下句點。願我們六個人的情誼，像北海道的雪景一樣，純粹、安靜，歷久彌新。",
  currentCityNote: "住宿：札幌 ×2 晚 → 旭川（西神樂）×2 晚 → 札幌 ×2 晚"
},

/* ---------------------------------------------------------------- 航班（PDF）*/
flights: [
  { date:"12/13", route:"吉隆坡 KUL → 東京成田 NRT T1", no:"ZIPAIR ZG062", time:"01:10 – 09:00" },
  { date:"12/13", route:"東京成田 NRT T1 → 新千歲 CTS", no:"Peach MM571", time:"14:45 – 16:35" },
  { date:"12/19", route:"新千歲 CTS → 吉隆坡 KUL T2", no:"AirAsia X D79551", time:"09:55 – 17:40" }
],
baggage: [
  { leg:"KUL → NRT（ZIPAIR）", check:"每人 1 件，30kg", carry:"個人物品 1 件 + 手提行李 1 件；兩者合計不超過 7kg" },
  { leg:"NRT → CTS（Peach）", check:"每人 1 件，20kg", carry:"個人物品 1 件 + 手提行李 1 件；兩者合計不超過 7kg" },
  { leg:"CTS → KUL（AirAsia X）", check:"每人 20kg", carry:"個人物品 1 件 + 手提行李 1 件；兩者合計不超過 7kg" }
],
charterNote: "包車安排：12/13 機場接機；12/15 札幌—美瑛—富良野（10 小時）；12/16 Airbnb—旭岳—旭川—Airbnb（10 小時）；12/17 Airbnb—札幌單程接送。12/14、12/18、12/19 自行搭乘公共交通。",

/* ---------------------------------------------------------------- 住宿（PDF）*/
lodging: {
  stream: {
    name:"Sapporo Stream Hotel", city:"札幌", nights:"12/13 – 12/15（2 晚）",
    address:"4 Chome-1-1 Minami 4 Jonishi, Chuo Ward, Sapporo, Hokkaido 064-0804, Japan",
    map:"Sapporo Stream Hotel, 4 Chome-1-1 Minami 4 Jonishi, Chuo Ward, Sapporo",
    room:"各自訂房；訂單示例為 Superior Twin Room。早餐按各自訂單。",
    inout:"12/13 15:00 後入住；12/15 11:00 前退房",
    price:"RM1,757.26（PDF 訂單截圖中的單份訂單金額，不代表 6 人總額）",
    kind:"hotel"
  },
  itoh: {
    name:"Guest House Itoh（Airbnb）", city:"旭川（西神樂）", nights:"12/15 – 12/17（2 晚）",
    address:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi, Hokkaidō 078-8383, Japan",
    map:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi, Hokkaidō 078-8383, Japan",
    room:"6 人一起入住；3 張雙人床（按旅伴確認安排）。不含早餐。",
    inout:"12/15 預計 19:30 Check-in；12/17 10:00 前退房",
    price:"RM3,759.94（PDF 訂單金額，6 人合住）",
    kind:"hotel"
  },
  cross: {
    name:"Cross Hotel Sapporo", city:"札幌", nights:"12/17 – 12/19（2 晚）",
    address:"23, Kita 2-jo Nishi 2-chome, Chuo Ward, Sapporo, Hokkaido 060-0002, Japan",
    map:"Cross Hotel Sapporo, Kita 2-jo Nishi 2-chome, Chuo Ward, Sapporo",
    room:"各自訂房；Cross Floor。早餐按各自訂單。可使用住客專屬 Meet Lounge 及公共浴場，具體以入住權益為準。",
    inout:"12/17 15:00 後入住（若提前抵達可先詢問行李寄存）；12/19 11:00 前退房",
    price:"RM1,713.20（PDF 訂單截圖中的單份訂單金額，不代表 6 人總額）",
    kind:"hotel"
  }
},

/* ---------------------------------------------------------------- 冬季行車/移動安全提醒 */
safety: [
  "札幌 12 月日落約 16:00–16:10，日出約 06:45–07:05；下午的移動請預留天黑前的時間。",
  "天黑後很難分辨路面是乾、濕還是結冰；看起來沒有積雪的路面也可能有黑冰。",
  "急煞車、急加速、急轉向都很危險 —— 請體諒司機放慢速度，行程時間有彈性。",
  "山路下坡通常比上坡更難駕駛（旭岳一帶尤其要小心）。",
  "全車乘客都要繫安全帶；下車拍照時留意來車與路肩積雪，不要進入私人農地。",
  "大雪或結冰時，PDF 建議減少步行、改搭地鐵或短程計程車；也可以和司機當場調整停留時間。",
  "外套、手套、暖暖包放在隨身包，不要全部鎖在行李箱；塞車或等待時車內溫度會下降。"
],

/* ---------------------------------------------------------------- 每日行程 */
/* type：spot 景點 / meal 用餐 / transit 交通 / flight 航班 / lodging 住宿 / note 備註
   kind：照片佔位插畫類型（hill tree tower ropeway canal lights food hotel airport shrine park street night train lounge shop）
   pdf ：PDF 原文備註（已轉繁體）。flags：該項目關聯的待確認事項。              */
days: [

/* ============================ DAY 0 ============================ */
{ n:0, date:"2026-12-12", dow:"六", title:"吉隆坡出發", en:"Departure preparation", route:"Kuala Lumpur", scene:"airport",
  summary:"PDF 列為出發前一晚的準備日（Day 0）。",
  stay:null, charter:null, safety:false, weather:[], mapMode:"driving",
  notes:[],
  items:[
    { id:"d0-klia", time:"22:00", type:"spot", kind:"airport", title:"抵達吉隆坡國際機場", en:"Kuala Lumpur International Airport",
      desc:"辦理值機、行李托運及出境手續。",
      pdf:"辦理值機、行李托運及出境手續。",
      address:"Kuala Lumpur International Airport, Sepang, Selangor", map:"Kuala Lumpur International Airport",
      stay:"—", hours:{t:"—"} },
    { id:"d0-zg", time:"深夜", type:"flight", kind:"airport", title:"準備搭乘 ZIPAIR ZG062", en:"Boarding preparation",
      desc:"建議預先確認線上值機及櫃台開放時間。",
      pdf:"建議預先確認線上值機及櫃台開放時間。" }
  ]
},

/* ============================ DAY 1 ============================ */
{ n:1, date:"2026-12-13", dow:"日", title:"吉隆坡 → 東京 → 札幌", en:"KUL → Tokyo → Sapporo", route:"KUL · NRT · CTS · Sapporo", scene:"airport",
  summary:"國際線＋成田轉機，傍晚抵達新千歲，由小王接機前往札幌。",
  stay:"stream", charter:"12/13 機場接機（小王）", safety:true, weather:["chitose","sapporo"], mapMode:"driving",
  notes:[
    "成田轉機時間約 5 小時 45 分。若兩段航班為分開出票，務必確認 Peach 值機、行李托運截止時間及行李提取流程。",
    "北海道冬季可能遇到降雪及道路結冰，機場至札幌車程以當日交通為準。"
  ],
  flags:["f-bag"],
  items:[
    { id:"d1-zg", time:"01:10", type:"flight", kind:"airport", title:"ZIPAIR ZG062", en:"KUL → Tokyo Narita (NRT T1)",
      desc:"吉隆坡 KUL → 東京成田 NRT T1，01:10 起飛，09:00 抵達。", pdf:"國際航班。",
      map:"Narita International Airport Terminal 1", stay:"飛行時間 01:10 – 09:00" },
    { id:"d1-nrt", time:"09:00", type:"transit", kind:"airport", title:"成田機場：Brunch、休息及轉機", en:"Layover at Narita",
      desc:"09:00 – 14:45 於機場內 Brunch、休息及轉機。", pdf:"不出機場；確認行李是否需提取及重新托運。",
      map:"Narita International Airport Terminal 1", stay:"約 5 小時 45 分", flags:["f-bag"] },
    { id:"d1-mm", time:"14:45", type:"flight", kind:"airport", title:"Peach MM571", en:"Narita (NRT T1) → New Chitose (CTS)",
      desc:"東京成田 NRT T1 → 新千歲 CTS，14:45 起飛，16:35 抵達。", pdf:"國內航段。", map:"新千歳空港", stay:"飛行時間 14:45 – 16:35" },
    { id:"d1-cts", time:"16:35", type:"spot", kind:"airport", title:"抵達新千歲機場，小王接機", en:"New Chitose Airport (CTS)",
      desc:"16:35 後抵達新千歲機場，小王接機，包車前往 Sapporo Stream Hotel。",
      pdf:"車程約 1 小時，視路況及天氣。", address:"新千歳空港 北海道千歳市美々987-22", map:"新千歳空港",
      stay:"—", hours:{t:"—"}, tips:["此時段已接近日落（約 16:00），路上多為夜間行車；冬季機場至札幌路段請預留彈性時間。"],
      driveNext:{ t:"約 1 小時（PDF）", mode:"car", note:"視路況及天氣", from:"新千歳空港", to:"Sapporo Stream Hotel" } },
    { id:"d1-in", time:"19:00", type:"lodging", kind:"hotel", title:"入住 Sapporo Stream Hotel", en:"Check-in", lodge:"stream",
      desc:"15:00 後可入住；各自訂房。", pdf:"7pm 入住 Sapporo Stream Hotel。",
      address:"4 Chome-1-1 Minami 4 Jonishi, Chuo Ward, Sapporo 064-0804", map:"Sapporo Stream Hotel, 4 Chome-1-1 Minami 4 Jonishi, Chuo Ward, Sapporo" },
    { id:"d1-dinner", time:"19:30", type:"meal", kind:"food", title:"晚餐", en:"Dinner",
      desc:"PDF 未指定餐廳。酒店位於薄野一帶，下方為步行可達的候選。",
      pdf:"7.30pm 晚餐（地點未指定）。", meal:{ slot:"晚餐", rec:["daruma","suage","hanamaru"] } }
  ]
},

/* ============================ DAY 2 ============================ */
{ n:2, date:"2026-12-14", dow:"一", title:"札幌市區觀光＋手信採購", en:"Sapporo City & Souvenir Shopping", route:"Maruyama · Jingu · Tanukikoji · Susukino", scene:"shrine",
  summary:"地鐵與步行為主：圓山公園、北海道神宮，午餐湯咖哩，下午狸小路買手信，晚上薄野吃壽司。",
  stay:"stream", charter:null, safety:false, weather:["sapporo"], mapMode:"transit",
  notes:[
    "建議路線步行時間（僅供規劃）：圓山公園至北海道神宮約 10–15 分鐘；北海道神宮至圓山公園站約 10–15 分鐘。地鐵前往市中心及狸小路區域可減少長距離步行。",
    "若雪勢較大或路面結冰，建議減少步行，改搭地鐵或短程計程車。",
    "主要手信採購安排在狸小路；12/19 新千歲機場再補買。"
  ],
  flags:["f-rest"],
  items:[
    { id:"d2-bf", time:"早餐", type:"meal", kind:"food", title:"Sapporo Stream Hotel 早餐", en:"Hotel breakfast",
      desc:"按各自酒店訂單。", pdf:"按各自酒店訂單。" },
    { id:"d2-go", time:"09:00", type:"transit", kind:"train", title:"從酒店出發", en:"Depart hotel",
      desc:"以地鐵及步行為主，當天路線可按天氣調整。", pdf:"建議以地鐵及步行為主；當天路線可按天氣調整。",
      map:"Sapporo Stream Hotel, Minami 4 Jonishi, Chuo Ward, Sapporo",
      driveNext:{ t:"約 20–25 分（地鐵：薄野站→大通換乘→圓山公園站）", mode:"transit", est:true, from:"Sapporo Stream Hotel, Sapporo", to:"円山公園, 札幌" } },
    { id:"d2-maru", time:"上午", type:"spot", kind:"park", title:"圓山公園", en:"Maruyama Park",
      desc:"札幌市區西側的公園，緊鄰北海道神宮與圓山原始林；冬季雪景安靜，運氣好可遇見蝦夷松鼠與野鳥。",
      pdf:"札幌市區自然景點；預留約 45–60 分鐘。",
      address:"北海道札幌市中央区宮ヶ丘（地鐵東西線 圓山公園站）", map:"円山公園, 札幌市中央区",
      stay:"約 45–60 分（PDF）", hours:{t:"公園本身全日可進入（以現場為準）", tbc:true},
      tips:["公園雪深處多，請穿防滑鞋。"],
      driveNext:{ t:"步行約 10–15 分（PDF）", mode:"walk", from:"円山公園, 札幌", to:"北海道神宮" } },
    { id:"d2-jingu", time:"接著", type:"spot", kind:"shrine", title:"北海道神宮", en:"Hokkaido Jingu",
      desc:"北海道的總鎮守，1869 年創祀；境內綠意深，冬季靜謐。境內設有六花亭神宮茶屋店。",
      pdf:"從圓山公園一帶步行前往；預留約 45–60 分鐘。",
      address:"北海道札幌市中央区宮ケ丘474", map:"北海道神宮",
      stay:"約 45–60 分（PDF）", hours:{t:"7:00 – 16:00（11/1–12/30 的開門時間；祈禱與授與所 9:00 起）；免費"},
      link:"https://www.hokkaidojingu.or.jp/",
      tips:["16:00 閉門，請勿拖到太晚。"],
      driveNext:{ t:"步行約 10–15 分至圓山公園站（PDF），再搭地鐵約 10 分至大通（估算）", mode:"transit", est:true, from:"北海道神宮", to:"大通駅 札幌" } },
    { id:"d2-lunch", time:"12:00", type:"meal", kind:"food", title:"湯咖哩", en:"Soup Curry",
      desc:"PDF 未指定餐廳，圓山或市中心一帶皆可。以下為順路候選。",
      pdf:"12.00pm 湯咖哩（餐廳尚未指定；可選擇圓山或市中心一帶）。",
      meal:{ slot:"午餐", rec:["garaku","suage"] } },
    { id:"d2-tanuki", time:"14:00", type:"spot", kind:"street", title:"狸小路商店街", en:"Tanukikoji Shopping Street",
      desc:"市中心有拱廊的商店街，藥妝、伴手禮、小吃集中，下雪也不怕淋。",
      pdf:"手信採購重點時段，建議預留 1.5–2 小時。",
      address:"北海道札幌市中央区南2・3条西1〜7丁目", map:"狸小路商店街, 札幌",
      stay:"約 1.5–2 小時（PDF）", hours:{t:"各店不同", tbc:true},
      driveNext:{ t:"步行約 10–15 分（估算）", mode:"walk", est:true, from:"狸小路商店街", to:"すすきの交差点" } },
    { id:"d2-susu", time:"17:00", type:"spot", kind:"night", title:"薄野", en:"Susukino",
      desc:"北海道最大的鬧區，餐廳、居酒屋雲集，夜晚霓虹招牌很適合拍照。與酒店同在南 4 條一帶。",
      pdf:"自由逛街、拍照及休息。",
      address:"北海道札幌市中央区南4〜6条西 付近", map:"すすきの 札幌",
      stay:"約 1 小時（依 PDF 時間推算）", hours:{t:"—"} },
    { id:"d2-dinner", time:"18:00", type:"meal", kind:"food", title:"壽司或海鮮料理晚餐", en:"Sushi / Seafood dinner",
      desc:"PDF 偏好刺身、握壽司、三文魚、吞拿魚、帆立貝及烤魚；不安排螃蟹。",
      pdf:"6.00pm 壽司或海鮮料理晚餐。偏好刺身、握壽司、三文魚、吞拿魚、帆立貝及烤魚；不安排螃蟹。",
      meal:{ slot:"晚餐", rec:["hanamaru"] } },
    { id:"d2-back", time:"21:00", type:"lodging", kind:"hotel", title:"返回 Sapporo Stream Hotel", en:"Back to hotel", lodge:"stream",
      desc:"住宿。", pdf:"住宿。", map:"Sapporo Stream Hotel, 4 Chome-1-1 Minami 4 Jonishi, Chuo Ward, Sapporo" }
  ]
},

/* ============================ DAY 3 ============================ */
{ n:3, date:"2026-12-15", dow:"二", title:"札幌 → 美瑛 → 富良野 → Airbnb", en:"Biei & Furano", route:"Sapporo · Biei · Furano · Asahikawa", scene:"tree",
  summary:"小王包車 10 小時。早上從札幌出發，美瑛雪景與午餐，傍晚在富良野看精靈露台點燈，晚餐後入住旭川的 Airbnb。",
  stay:"itoh", charter:"小王包車 10 小時（08:30 札幌出發）", safety:true, weather:["sapporo","biei","furano","asahikawa"], mapMode:"driving",
  notes:[],
  flags:["f-gap","f-dark","f-rest"],
  items:[
    { id:"d3-bf", time:"早餐", type:"meal", kind:"food", title:"Sapporo Stream Hotel 早餐", en:"Hotel breakfast",
      desc:"按各自訂單；退房前整理行李。", pdf:"按各自訂單；退房前整理行李。（12/15 11:00 前退房）" },
    { id:"d3-go", time:"08:30", type:"transit", kind:"hotel", title:"札幌出發，小王包車", en:"Depart Sapporo (charter)",
      desc:"包車 10 小時。", pdf:"包車 10 小時；行車時間視天氣及路況。", map:"Sapporo Stream Hotel, Minami 4 Jonishi, Chuo Ward, Sapporo",
      driveNext:{ t:"約 2 小時 30 分（PDF：08:30 出發→11:00 抵達）", mode:"car", from:"Sapporo Stream Hotel, Sapporo", to:"クリスマスツリーの木 美瑛" } },
    { id:"d3-tree", time:"11:00", type:"spot", kind:"tree", title:"美瑛聖誕樹", en:"Christmas Tree of Biei",
      desc:"美瑛丘陵上的獨立大樹，雪原襯托下很有層次，是冬季拍照熱點。",
      pdf:"拍照及欣賞雪景；請勿進入私人農地或阻礙道路。",
      address:"北海道上川郡美瑛町（位置請以 Google Maps 標示為準）", map:"クリスマスツリーの木 美瑛",
      stay:"約 30 分（依 PDF 時間推算）", hours:{t:"戶外景點，無營業時間"},
      tips:["路邊停車請勿阻礙道路；雪地拍照注意腳下與來車。"],
      driveNext:{ t:"車程約 10 分（估算）", mode:"car", est:true, from:"クリスマスツリーの木 美瑛", to:"四季の塔 美瑛" } },
    { id:"d3-shiki", time:"11:30", type:"spot", kind:"tower", title:"四季之塔", en:"Shiki no To",
      desc:"美瑛町役場旁的展望塔，高約 32 公尺；上到展望室可 360 度眺望美瑛丘陵、十勝連峰與大雪山，免費入場。",
      pdf:"視開放時間及天氣安排短暫停留。",
      address:"北海道上川郡美瑛町本町4-6-1", map:"四季の塔 美瑛",
      stay:"約 30 分（依 PDF 時間推算）", hours:{t:"約 8:30 – 17:00（冬季時段待確認）；免費", tbc:true},
      link:"https://www.town.biei.hokkaido.jp/", flags:["f-hours"],
      driveNext:{ t:"步行約 3–5 分（估算，兩處皆在本町 4 丁目）", mode:"walk", est:true, from:"四季の塔 美瑛", to:"洋食とCafe じゅんぺい 美瑛" } },
    { id:"d3-lunch", time:"12:30", type:"meal", kind:"food", title:"日式炸豬排定食", en:"Tonkatsu Teishoku & Cafe",
      desc:"PDF 未指定餐廳，可按當日營業情況選擇；下方候選就在四季之塔旁。",
      pdf:"餐廳未指定；可按當日營業情況選擇。", meal:{ slot:"午餐", rec:["jyunpei"] },
      driveNext:{ t:"約 1 小時（PDF：15:00 出發→約 16:00 抵達）", mode:"car", from:"洋食とCafe じゅんぺい 美瑛", to:"ニングルテラス 富良野" } },
    { id:"d3-go2", time:"15:00", type:"transit", kind:"hill", title:"前往富良野", en:"Drive to Furano",
      desc:"沿途視路況及日照調整停留時間。", pdf:"沿途視路況及日照調整停留時間。", map:"富良野駅" },
    { id:"d3-ningle", time:"約 16:00", type:"spot", kind:"lights", title:"精靈露台", en:"Ningle Terrace",
      desc:"新富良野王子飯店旁森林裡的約 15 間木屋工藝小店；日落後點燈，雪地中的暖色燈光很有童話感。",
      pdf:"冬季燈光及木屋景觀；建議預留約 60–90 分鐘。",
      address:"北海道富良野市中御料 新富良野プリンスホテル内", map:"ニングルテラス 富良野",
      stay:"約 60–90 分（PDF）", hours:{t:"冬季約 12:00 – 20:45；各店有不定休（待確認）", tbc:true},
      link:"https://www.princehotels.com/shinfurano/", flags:["f-hours"],
      tips:["PDF 預計約 16:00 抵達，剛好日落前後，可先看天色再點燈。","木屋小店多為手作與雜貨，也適合買少量手信。"],
      driveNext:{ t:"車程約 10–15 分（估算）", mode:"car", est:true, from:"ニングルテラス 富良野", to:"くまげら 富良野" } },
    { id:"d3-dinner", time:"17:30", type:"meal", kind:"food", title:"晚餐 Dinner — 富良野", en:"Dinner in Furano",
      desc:"PDF：富良野日式料理，地點不預先指定。以下為候選。",
      pdf:"5.30pm 晚餐（富良野日式料理；地點不預先指定）。", meal:{ slot:"晚餐", rec:["kumagera","suzukake"] },
      driveNext:{ t:"PDF：18:30 出發 → 約 19:30 入住；冬季夜間車程可能更長（估算 1 小時 15 分–1 小時 30 分，待確認）", mode:"car", est:true, flags:["f-dark"], from:"富良野駅", to:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi" } },
    { id:"d3-go3", time:"18:30", type:"transit", kind:"night", title:"前往 Guest House Itoh Airbnb", en:"Drive to Airbnb",
      desc:"入住旭川市西神樂區域。", pdf:"入住旭川市西神樂區域。", map:"富良野駅" },
    { id:"d3-in", time:"19:30", type:"lodging", kind:"hotel", title:"Check In", en:"Guest House Itoh (Airbnb)", lodge:"itoh",
      desc:"6 人一起入住；3 張雙人床；不含早餐。", pdf:"7.30pm Check In。",
      address:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi, Hokkaidō 078-8383", map:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi, Hokkaidō 078-8383, Japan" }
  ]
},

/* ============================ DAY 4 ============================ */
{ n:4, date:"2026-12-16", dow:"三", title:"旭岳纜車＋旭川市區", en:"Asahidake & Asahikawa", route:"Asahidake · Asahikawa", scene:"ropeway",
  summary:"小王包車 10 小時。早上上旭岳纜車看雪山，午餐旭川拉麵，下午在旭川市區自由逛，4 點回 Airbnb。",
  stay:"itoh", charter:"小王包車 10 小時（09:00 自 Airbnb 出發）", safety:true, weather:["asahikawa","asahidake"], mapMode:"driving",
  notes:[],
  flags:["f-rope","f-tight","f-aoba","f-rest"],
  items:[
    { id:"d4-bf", time:"早上", type:"meal", kind:"food", title:"Airbnb 附近早餐", en:"Breakfast near Airbnb",
      desc:"小王帶去順路早餐店；早餐後前往旭岳。", pdf:"小王帶去順路早餐店；早餐後前往旭岳。" },
    { id:"d4-go", time:"09:00", type:"transit", kind:"hill", title:"從 Airbnb 出發，小王包車", en:"Depart Airbnb (charter)",
      desc:"包車 10 小時。", pdf:"包車 10 小時；實際出發時間按早餐安排微調。",
      map:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi, Hokkaidō 078-8383, Japan",
      driveNext:{ t:"約 1 小時（PDF：09:00 出發→10:00 纜車）", mode:"car", from:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi", to:"大雪山旭岳ロープウェイ" } },
    { id:"d4-rope", time:"10:00", type:"spot", kind:"ropeway", title:"旭岳纜車", en:"Asahidake Ropeway",
      desc:"從標高約 1,100 公尺的山麓站到約 1,600 公尺的姿見站，約 10 分鐘；站外即可看到北海道最高峰旭岳（2,291 公尺）與大雪山連峰。",
      pdf:"搭乘纜車欣賞雪山景色及拍照；視路況及纜車營運時間調整。",
      address:"北海道上川郡東川町旭岳温泉", map:"大雪山旭岳ロープウェイ",
      stay:"約 1.5 小時（依 PDF 時間推算）",
      hours:{t:"約 6:30 – 17:30（隨季節變動）；2026/11/16–12/10 維修停駛；冬季時刻表待確認", tbc:true},
      price:"往復 ¥2,800（11/1–5/31，大人；來源 2026/08 更新，待確認）",
      link:"https://asahidake.hokkaido.jp/ja/", flags:["f-rope"],
      tips:["山頂區域比山下更冷、風大，請穿足保暖衣物、手套、防滑鞋。","駐車費資料不一致（¥500 或冬季免費），現場確認即可。","纜車依天候調整或停駛；若不營運，可請小王改順路景點（需自行與司機商量，PDF 未安排備案）。"],
      driveNext:{ t:"約 1 小時 15 分（估算，待確認）", mode:"car", est:true, flags:["f-tight"], from:"大雪山旭岳ロープウェイ", to:"旭川駅" } },
    { id:"d4-go2", time:"11:30", type:"transit", kind:"hill", title:"前往旭川市區", en:"Drive to Asahikawa",
      desc:"視路況及纜車營運時間調整。", pdf:"視路況及纜車營運時間調整。", map:"旭川駅", flags:["f-tight"] },
    { id:"d4-lunch", time:"12:30", type:"meal", kind:"food", title:"旭川拉麵", en:"Asahikawa Ramen",
      desc:"在旭川市區用餐。12/16 是週三，旭川老字號「青葉」週三公休，請看下方說明。",
      pdf:"12.30pm 旭川拉麵（在旭川市區用餐）。", meal:{ slot:"午餐", rec:["baikoken","aoba"] } },
    { id:"d4-free", time:"14:00", type:"spot", kind:"street", title:"旭川市區自由閒逛、吃東西", en:"Free time in Asahikawa",
      desc:"如果大家不累。梅光軒位於旭川站前的平和通買物公園沿線，適合餐後散步。",
      pdf:"2pm 旭川市區自由閒逛、吃東西，如果大家不累。", address:"旭川駅周辺", map:"平和通買物公園 旭川", stay:"約 2 小時（PDF：14:00–16:00）", hours:{t:"—"},
      driveNext:{ t:"約 20–30 分（估算）", mode:"car", est:true, from:"旭川駅", to:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi" } },
    { id:"d4-back", time:"16:00", type:"lodging", kind:"hotel", title:"回 Airbnb", en:"Back to Airbnb", lodge:"itoh",
      desc:"Guest House Itoh。", pdf:"4pm 回 Airbnb。", map:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi, Hokkaidō 078-8383, Japan" }
  ]
},

/* ============================ DAY 5 ============================ */
{ n:5, date:"2026-12-17", dow:"四", title:"旭川 → 札幌＋聖誕燈飾", en:"Asahikawa → Sapporo", route:"Asahikawa · Sapporo", scene:"lights",
  summary:"早上退房，小王單程接送回札幌；入住 Cross Hotel 後逛中島公園，傍晚看大通公園的白色燈樹節與聖誕市集。",
  stay:"cross", charter:"小王單程接送（Airbnb → 札幌）", safety:true, weather:["asahikawa","sapporo"], mapMode:"transit",
  notes:[],
  flags:["f-rest","f-lounge"],
  items:[
    { id:"d5-bf", time:"早上", type:"meal", kind:"food", title:"Airbnb 附近便利店早餐", en:"Convenience-store breakfast",
      desc:"自行解決，不需要司機接送早餐。", pdf:"自行解決，不需要司機接送早餐。" },
    { id:"d5-out", time:"10:00 前", type:"lodging", kind:"hotel", title:"Guest House Itoh 退房", en:"Check-out", lodge:"itoh",
      desc:"整理 6 人行李。", pdf:"10:00 前退房；整理 6 人行李。", map:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi, Hokkaidō 078-8383, Japan",
      driveNext:{ t:"約 2 小時–2 小時 30 分（估算，視雪況）", mode:"car", est:true, from:"25 Gō-543-58 Nishikagura 3 Sen, Asahikawa-shi", to:"Cross Hotel Sapporo" } },
    { id:"d5-go", time:"上午", type:"transit", kind:"hill", title:"小王包車返回札幌", en:"Charter back to Sapporo",
      desc:"單程接送；抵達 Cross Hotel 後可先寄存行李。", pdf:"單程接送；抵達 Cross Hotel 後可先寄存行李。", map:"Cross Hotel Sapporo, Kita 2-jo Nishi 2-chome" },
    { id:"d5-hotel", time:"下午", type:"lodging", kind:"hotel", title:"Cross Hotel Sapporo", en:"Check-in from 15:00", lodge:"cross",
      desc:"15:00 後正式入住；若未到入住時間，先寄存行李。", pdf:"15:00 後正式入住；若未到入住時間，先寄存行李。",
      address:"23, Kita 2-jo Nishi 2-chome, Chuo Ward, Sapporo 060-0002", map:"Cross Hotel Sapporo, Kita 2-jo Nishi 2-chome, Chuo Ward, Sapporo",
      driveNext:{ t:"地鐵＋步行約 20 分（估算）", mode:"transit", est:true, from:"Cross Hotel Sapporo", to:"中島公園 札幌" } },
    { id:"d5-naka", time:"下午", type:"spot", kind:"park", title:"中島公園", en:"Nakajima Park",
      desc:"市中心的大型都市公園，池畔與林木在雪中很安靜；PDF 註明為《First Love》取景地。",
      pdf:"First Love 取景地；視天氣安排散步及拍照。",
      address:"北海道札幌市中央区中島公園", map:"中島公園 札幌", stay:"約 1 小時（依行程推算）", hours:{t:"待確認", tbc:true},
      driveNext:{ t:"地鐵約 3–5 分（中島公園站→大通站，估算）", mode:"transit", est:true, from:"中島公園 札幌", to:"さっぽろテレビ塔" } },
    { id:"d5-tower", time:"傍晚", type:"spot", kind:"lights", title:"札幌電視塔、大通公園", en:"Sapporo TV Tower & Odori Park",
      desc:"大通公園東端的地標電視塔，周邊是札幌白色燈樹節（White Illumination）與德國聖誕市集的會場。",
      pdf:"欣賞札幌白色燈飾 White Illumination 及聖誕市集 Christmas Market。",
      address:"北海道札幌市中央区大通西1丁目（電視塔）；大通公園西1・2丁目", map:"さっぽろテレビ塔",
      stay:"約 1.5 小時（依行程推算）",
      hours:{t:"聖誕市集 2026/11/20–12/25，官方導覽冊標示大通公園 11:00–21:00；燈飾點燈時間與電視塔營業時間待確認", tbc:true},
      link:"https://www.sapporo.travel/event/winter/munich_christmas_market/?lang=en",
      tips:["夜間氣溫低，請穿足保暖；市集有帶座位的帳篷可避雪。"] },
    { id:"d5-dinner", time:"晚餐", type:"meal", kind:"food", title:"晚餐 Dinner（預留 2 小時）", en:"Dinner",
      desc:"建議約 18:30–20:30；地點待定。以下為候選。", pdf:"建議約 18:30–20:30；地點待定。",
      meal:{ slot:"晚餐", rec:["daruma","hanamaru","suage"] } },
    { id:"d5-lounge", time:"晚上", type:"lodging", kind:"lounge", title:"Cross Hotel Meet Lounge", en:"Cross Floor guests only", lodge:"cross",
      desc:"Cross Floor 住客專屬休息空間。", pdf:"開放及使用資格以酒店確認內容為準。", map:"Cross Hotel Sapporo, Kita 2-jo Nishi 2-chome", flags:["f-lounge"] },
    { id:"d5-bath", time:"夜間", type:"lodging", kind:"lounge", title:"18 樓公共浴場", en:"Public Bath", lodge:"cross",
      desc:"可安排晚餐後泡湯。", pdf:"以酒店當日開放時間為準。", map:"Cross Hotel Sapporo, Kita 2-jo Nishi 2-chome", flags:["f-lounge"] }
  ]
},

/* ============================ DAY 6 ============================ */
{ n:6, date:"2026-12-18", dow:"五", title:"小樽一日遊", en:"Otaru Day Trip", route:"Otaru", scene:"canal",
  summary:"搭 JR 前往小樽：運河、堺町通、壽司午餐，下午上天狗山看日落與夜景，傍晚回札幌吃居酒屋。",
  stay:"cross", charter:null, safety:false, weather:["otaru","sapporo"], mapMode:"transit",
  notes:[],
  flags:["f-rest"],
  items:[
    { id:"d6-bf", time:"早餐", type:"meal", kind:"food", title:"Cross Hotel 早餐", en:"Hotel breakfast", desc:"按各自酒店訂單。", pdf:"按各自酒店訂單。" },
    { id:"d6-go", time:"09:00", type:"transit", kind:"train", title:"從札幌出發，搭 JR 前往小樽", en:"JR Sapporo → Otaru",
      desc:"JR 車程約 35–45 分鐘，視車種及班次。", pdf:"搭乘 JR 前往小樽；車程約 35–45 分鐘，視車種及班次。", map:"札幌駅",
      driveNext:{ t:"JR 約 35–45 分（PDF）＋步行約 10 分（估算）", mode:"transit", from:"札幌駅", to:"小樽運河" } },
    { id:"d6-canal", time:"上午", type:"spot", kind:"canal", title:"小樽運河", en:"Otaru Canal",
      desc:"散步、拍照及欣賞港口城市景色；石造倉庫與運河是小樽最經典的畫面。", pdf:"散步、拍照及欣賞港口城市景色。",
      address:"北海道小樽市港町（運河沿線）", map:"小樽運河", stay:"約 1 小時（依行程推算）", hours:{t:"戶外景點"},
      driveNext:{ t:"步行約 10–15 分（估算）", mode:"walk", est:true, from:"小樽運河", to:"堺町通り 小樽" } },
    { id:"d6-sakai", time:"接著", type:"spot", kind:"shop", title:"堺町通", en:"Sakaimachi Street",
      desc:"玻璃工藝、甜點、伴手禮及特色小店。", pdf:"玻璃工藝、甜點、伴手禮及特色小店。",
      address:"北海道小樽市堺町", map:"堺町通り 小樽", stay:"約 1.5 小時（依行程推算）", hours:{t:"各店不同", tbc:true} },
    { id:"d6-lunch", time:"午餐", type:"meal", kind:"food", title:"小樽壽司或海鮮料理", en:"Sushi / Seafood lunch",
      desc:"PDF 未指定餐廳。以下為候選。", pdf:"小樽壽司或海鮮料理（餐廳未指定）。", meal:{ slot:"午餐", rec:["wakaraku","masa"] },
      driveNext:{ t:"計程車約 10–15 分，或巴士約 20 分（估算）", mode:"transit", est:true, from:"堺町通り 小樽", to:"小樽天狗山ロープウェイ" } },
    { id:"d6-tengu", time:"約 15:00", type:"spot", kind:"ropeway", title:"天狗山纜車", en:"Otaru Tenguyama Ropeway",
      desc:"標高約 532 公尺，纜車約 4–5 分登頂；山頂有 5 處展望台，可看小樽市區、港口與石狩灣，是北海道三大夜景之一。",
      pdf:"建議約 15:00 前後上山，爭取同時欣賞日落及夜景；視當日日落和纜車營運調整。",
      address:"北海道小樽市最上2丁目16-15", map:"小樽天狗山ロープウェイ",
      stay:"約 2 小時（依行程推算）",
      hours:{t:"冬季 9:00 – 20:00（最終上行約 19:48）；冬季營運期 11/28 起；悪天候運休"},
      price:"往復 大人 ¥2,000（冬季；待確認最新）", link:"https://tenguyama.ckk.chuo-bus.co.jp/",
      tips:["小樽 12 月日落約 16:00，15:00 上山剛好能看日落到夜景。","山頂很冷、風大，請戴好手套與帽子；纜車會因天候停駛。"],
      driveNext:{ t:"計程車約 10 分，或巴士約 20 分回小樽站，再搭 JR 約 35–45 分（估算）", mode:"transit", est:true, from:"小樽天狗山ロープウェイ", to:"小樽駅" } },
    { id:"d6-return", time:"傍晚", type:"transit", kind:"train", title:"返回小樽站，搭 JR 回札幌", en:"JR Otaru → Sapporo",
      desc:"車程約 35–45 分鐘，依班次而定。", pdf:"車程約 35–45 分鐘，依班次而定。", map:"小樽駅" },
    { id:"d6-dinner", time:"晚上", type:"meal", kind:"food", title:"晚餐 Dinner（居酒屋，預留 2 小時）", en:"Izakaya dinner",
      desc:"食物預算約每人 RM100–120，不含酒水；偏好有吸煙區的店鋪。",
      pdf:"食物預算約每人 RM100–120，不含酒水；偏好有吸煙區的店鋪。", meal:{ slot:"晚餐", rec:["inasuke"] } },
    { id:"d6-back", time:"夜間", type:"lodging", kind:"lounge", title:"返回 Cross Hotel", en:"Back to hotel", lodge:"cross",
      desc:"如時間允許，可使用 Meet Lounge 及公共浴場。", pdf:"如時間允許，可使用 Meet Lounge 及公共浴場。", map:"Cross Hotel Sapporo, Kita 2-jo Nishi 2-chome" }
  ]
},

/* ============================ DAY 7 ============================ */
{ n:7, date:"2026-12-19", dow:"六", title:"札幌 → 新千歲機場 → 吉隆坡", en:"Return to Kuala Lumpur", route:"Sapporo · CTS · KUL", scene:"airport",
  summary:"清晨退房、搭 JR 到新千歲機場，補買手信，搭 AirAsia X 回吉隆坡。",
  stay:null, charter:null, safety:false, weather:["sapporo","chitose"], mapMode:"transit",
  notes:[
    "Trip.com 行程單建議從新千歲機場出發的航班至少提前 3 小時抵達機場；請盡量不要延遲出發。",
    "機場購物安排在完成值機及行李托運後，仍須預留足夠時間前往登機口。"
  ],
  flags:["f-airport"],
  items:[
    { id:"d7-out", time:"清晨", type:"lodging", kind:"hotel", title:"Cross Hotel 退房", en:"Check-out", lodge:"cross",
      desc:"提前退房；酒店早餐可按實際時間決定是否放棄。", pdf:"提前退房；酒店早餐可按實際時間決定是否放棄。（12/19 11:00 前退房）", map:"Cross Hotel Sapporo, Kita 2-jo Nishi 2-chome" },
    { id:"d7-jr", time:"約 06:45", type:"transit", kind:"train", title:"札幌站搭乘 JR 前往新千歲機場", en:"JR Sapporo → New Chitose Airport",
      desc:"車程約 37 分鐘（參考值；以實際列車為準）。", pdf:"車程約 37 分鐘（參考值；以實際列車為準）。", map:"札幌駅", flags:["f-airport"],
      driveNext:{ t:"JR 約 37 分（PDF）", mode:"transit", from:"札幌駅", to:"新千歳空港" } },
    { id:"d7-cts", time:"約 08:00", type:"spot", kind:"airport", title:"抵達新千歲機場 CTS", en:"New Chitose Airport",
      desc:"辦理值機、托運行李及出境手續。", pdf:"辦理值機、托運行李及出境手續。", address:"新千歳空港 北海道千歳市美々987-22", map:"新千歳空港",
      stay:"—", hours:{t:"—"}, flags:["f-airport"] },
    { id:"d7-shop", time:"辦理手續後", type:"spot", kind:"shop", title:"機場購物及早餐", en:"Airport shopping & breakfast",
      desc:"補買北海道手信、吃早餐；留意登機時間。", pdf:"補買北海道手信、吃早餐；留意登機時間。", address:"新千歳空港", map:"新千歳空港" },
    { id:"d7-fl", time:"09:55", type:"flight", kind:"airport", title:"AirAsia X D79551", en:"CTS → Kuala Lumpur (KUL T2)",
      desc:"新千歲 CTS → 吉隆坡 KUL T2，09:55 起飛，17:40 抵達。", pdf:"回程航班。", map:"新千歳空港" },
    { id:"d7-end", time:"17:40", type:"spot", kind:"airport", title:"抵達吉隆坡國際機場 T2", en:"Kuala Lumpur (KUL T2)",
      desc:"旅程結束。", pdf:"旅程結束。", map:"Kuala Lumpur International Airport 2" }
  ]
}
],

/* ---------------------------------------------------------------- 待確認事項 */
/* level：warn（資料矛盾／風險）、info（提醒）。days：關聯的 DAY。 */
flags: [
  { id:"f-people", level:"warn", days:[], title:"人數不一致",
    text:"PDF 寫「6 位旅伴（3 對情侶）」，你的需求寫「兩人同行」。行程與時間一律照 PDF；預算功能預設「我、男朋友」兩位付款人，可在預算頁新增或改名。" },
  { id:"f-days", level:"info", days:[], title:"天數與 Day 0",
    text:"PDF 另有 Day 0（12/12 出發日）。首頁快速導覽放 Day 1–7（7 天 6 夜），Day 0 以虛線卡片另列。" },
  { id:"f-car", level:"warn", days:[], title:"包車 vs 自駕",
    text:"PDF 是「包車司機小王」，並非自駕；但預算分類有「租車／ETC／油錢」。我保留這些分類（改名為「租車／包車」），若全程包車，ETC／油錢可能為 0。行車安全提醒也以「包車乘客」角度撰寫。" },
  { id:"f-cur", level:"info", days:[], title:"幣別",
    text:"PDF 的住宿金額是 RM（馬幣），你要求預算可輸入日幣與台幣。預算功能支援 JPY／TWD／MYR 三種幣別，匯率可自行設定或一鍵更新。" },
  { id:"f-bag", level:"warn", days:[1], title:"成田轉機：托運行李額度下降",
    text:"PDF 行李額度：KUL→NRT（ZIPAIR）每人 30kg，NRT→CTS（Peach）每人 20kg。若在成田需提取行李並重新托運，Peach 的 20kg 低於第一段，且兩段若為分開出票，需要自行辦理提取與重新值機。請出發前確認是否超重。" },
  { id:"f-gap", level:"info", days:[3], title:"午餐後有約 2.5 小時空檔",
    text:"PDF：12:30 午餐 → 15:00 前往富良野，中間沒有安排。我沒有自行加景點；若想利用，可和小王商量順路停留（例如美瑛其他展望點）。" },
  { id:"f-dark", level:"warn", days:[3], title:"富良野 → Airbnb 夜間行車時間",
    text:"PDF 排 18:30 出發、19:30 入住（約 1 小時）。冬季夜間路況可能較慢，我估算約 1 小時 15 分–1 小時 30 分，僅是估算，建議問小王。日落約 16:00，這段全程夜間行車。" },
  { id:"f-hours", level:"warn", days:[3], title:"四季之塔、精靈露台冬季營業時間",
    text:"四季之塔查到 8:30–17:00（冬季時段未能確認）；精靈露台各家小店有不定休，冬季約 12:00–20:45。PDF 排 11:30 與約 16:00 抵達，建議出發前再看官網或 Google Maps。" },
  { id:"f-rope", level:"warn", days:[4], title:"旭岳纜車：維修停駛、時刻表與停車費",
    text:"查到 2026/11/16–12/10 為維修停駛，12/11 起應恢復營運，冬季約每 20 分一班；但營運時間、冬季時刻表及停車費（¥500 vs 冬季免費）各來源不一致。請出發前看官網「運行予定表」，12/16 當天也要看天候。" },
  { id:"f-tight", level:"warn", days:[4], title:"旭岳 → 旭川拉麵：時間偏緊",
    text:"PDF：11:30 離開旭岳、12:30 吃旭川拉麵。旭岳到旭川市區我估算約 1 小時 15 分（冬季更慢），可能趕不上 12:30，且纜車上下山與停留也要時間。我沒有改動，請與小王確認。" },
  { id:"f-aoba", level:"warn", days:[4], title:"旭川拉麵老店「青葉」週三公休",
    text:"12/16 是週三，青葉本店（旭川拉麵代表老店）週三公休。我預設推薦營業日不衝突的「梅光軒」，青葉僅列為資訊，標示為不適用該日。" },
  { id:"f-lounge", level:"info", days:[5,6], title:"Cross Hotel Meet Lounge／18 樓公共浴場",
    text:"PDF 已註明：開放時間、使用資格以酒店確認為準。請入住時向櫃台確認。" },
  { id:"f-airport", level:"warn", days:[7], title:"Day 7 抵達機場時間 vs 建議提前 3 小時",
    text:"PDF：約 06:45 搭 JR（約 37 分）、約 08:00 抵達機場；航班 09:55 起飛。PDF 同時建議至少提前 3 小時（即 06:55 前）抵達，兩者衝突。06:45 上車約 07:25 到機場；若要滿足 3 小時，需更早出發。請你決定。" },
  { id:"f-rest", level:"info", days:[1,2,3,4,5,6], title:"多數餐廳 PDF 未指定",
    text:"PDF 多半只寫菜式（湯咖哩、壽司、拉麵…），沒有指定餐廳。網站「餐廳」頁是我補充的候選，營業時間來自網路資料，不確定的欄位已標「待確認」，請出發前用 Google Maps 再確認，並考慮 6 人用餐是否需要訂位。" }
],

/* ---------------------------------------------------------------- 餐廳 */
/* closedDow：公休的星期（0=日 … 6=六）；null = 不確定。days：推薦給哪幾天。
   src：資料來源（網路搜尋，2026 年）；tbc：true = 資料有出入，需自行確認。            */
restaurants: [
 { id:"garaku", name:"SOUP CURRY GARAKU 札幌本店", jp:"スープカレー GARAKU 札幌本店", area:"札幌", cuisine:"湯咖哩", kind:"food",
   days:[2], meal:"午餐",
   address:"北海道札幌市中央区南2条西2-6-1 おくむらビルB1（るるぶ資料；另有部落格說本店已搬遷，待確認）", map:"SOUPCURRY GARAKU 札幌本店",
   hours:"11:30–15:30（L.O. 15:00）、17:00–21:00（L.O. 20:30）；湯賣完即結束", closed:"不定休（待確認）", closedDow:null,
   price:"約 ¥1,390–1,640／份湯咖哩", priceNote:"另可加料；米飯大盛 +¥110、辣度 6 號以上加價",
   dishes:["やわらかチキンレッグと野菜 ¥1,480","とろとろ炙り角煮 ¥1,640","かみふらのポークの豚しゃぶと7種きのこの森 ¥1,590"],
   why:"札幌最常被提名的湯咖哩名店之一，和風高湯底、辣度可調；在狸小路北側一條街，正好銜接下午 14:00 的狸小路行程。",
   transit:"圓山／神宮 → 地鐵東西線至大通站約 10 分 + 步行約 3 分；距狸小路步行約 5 分",
   warn:"常大排長龍（平日也會），6 人建議提早到；地址與營業日待確認。", tbc:true,
   src:"るるぶ、gutabi、retty（2026）" },
 { id:"suage", name:"Soup Curry Suage+ 本店", jp:"スープカリー スアゲ プラス 本店", area:"札幌", cuisine:"湯咖哩", kind:"food",
   days:[1,2,5], meal:"午餐／晚餐",
   address:"北海道札幌市中央区南4条西5 都志松ビル 2F", map:"スープカリー スアゲ プラス 本店 札幌",
   hours:"平日 11:30–21:30（L.O. 21:00）；週六 11:00–22:00（L.O. 21:30）；日・祝 11:00–21:30（L.O. 21:00）", closed:"年末年始（其餘無公休）", closedDow:[],
   price:"約 ¥1,150 起（資料較舊，待確認）", priceNote:"湯底可選：Suage／エビ赤／イカ黒／ココナッツ白",
   dishes:["パリパリ知床鶏と野菜カレー","可自選湯底與配料"],
   why:"薄野站步行約 2 分，與 Sapporo Stream Hotel 同在南 4 條一帶，營業到 21:30，晚餐也能吃；是 GARAKU 排太長時的替代。",
   transit:"薄野站 2 號出口步行約 2 分；距 Sapporo Stream Hotel 步行約 3–5 分（依地址推算）",
   warn:"價格資料較舊，請以現場菜單為準。", tbc:true,
   src:"aumo（營業時間）" },
 { id:"hanamaru", name:"四季 花まる すすきの店", jp:"四季 花まる すすきの店", area:"札幌", cuisine:"壽司／海鮮", kind:"food",
   days:[1,2,5], meal:"晚餐",
   address:"北海道札幌市中央区南四条西2-2-4 レコルトサッポロ 2F", map:"四季 花まる すすきの店",
   hours:"週一至週四 11:00–15:00、17:00–22:00（L.O. 21:30）；週五 11:00–15:00、17:00–23:00；週六 11:00–23:00；週日 11:00–22:00", closed:"不定休（待確認）", closedDow:null,
   price:"晚餐約 ¥5,000–5,999／人（Tabelog 口碑平均）", priceNote:"午餐約 ¥2,000–2,999",
   dishes:["握壽司（依當季，可點鮭魚、鮪魚、帆立貝）","おまかせ刺身盛り合わせ","烤魚類（現場菜單為準）"],
   why:"北海道知名壽司連鎖，坐得下 6 人且口碑穩定；符合 PDF「刺身、握壽司、三文魚、吞拿魚、帆立貝、不安排螃蟹」的偏好。口碑提到可預約。",
   transit:"薄野站步行約 2–3 分；距 Sapporo Stream Hotel 步行約 5–8 分（依地址推算）",
   warn:"12/14（週一）營業時間為 17:00–22:00；仍建議事先訂位。", tbc:true,
   src:"Tabelog（經 icotto）、花まる 口碑（2026）" },
 { id:"daruma", name:"成吉思汗 だるま 本店", jp:"成吉思汗 だるま 本店", area:"札幌", cuisine:"成吉思汗烤羊肉", kind:"food",
   days:[1,5], meal:"晚餐",
   address:"北海道札幌市中央区南5条西4 クリスタルビル 1F", map:"成吉思汗 だるま 本店 札幌",
   hours:"約 17:00 至深夜（各來源標示 03:00 或 05:00，待確認）", closed:"無休（年末年始待確認）", closedDow:[],
   price:"約 ¥3,000–5,000／人", priceNote:"只收現金（Retty 標示不可刷卡，待確認）",
   dishes:["成吉思汗（生マトン）","ヒレ肉","〆の茶漬け"],
   why:"薄野的老字號烤羊肉，肉質柔軟、羊味不重，適合第一次吃的人；就在酒店隔壁區，Day 1 抵達當晚走路就到。",
   transit:"距 Sapporo Stream Hotel 步行約 3–5 分（南 5 條西 4，依地址推算）；Cross Hotel → 地鐵至薄野約 10–15 分",
   warn:"常需排隊；6 人可能需要拆桌或到分店（だるま 在薄野有多間分店；二階亭只有吧台座位）。只收現金。", tbc:true,
   src:"Retty、icotto/Tabelog、gutabi、るるぶ（2026）" },
 { id:"jyunpei", name:"洋食とCafe じゅんぺい", jp:"洋食とCafe じゅんぺい", area:"美瑛", cuisine:"洋食／炸豬排定食", kind:"food",
   days:[3], meal:"午餐",
   address:"北海道上川郡美瑛町本町4-4-10", map:"洋食とCafe じゅんぺい 美瑛",
   hours:"11:00–15:00（賣完即打烊）", closed:"週一（12/15 為週二，應營業）", closedDow:[1],
   price:"定食約 ¥1,300–1,600；蝦丼約 ¥1,100–1,300（資料較舊，待確認）", priceNote:"現金／PayPay",
   dishes:["トンカツ定食（松／竹）","海老丼（炸蝦丼）","ジュンドッグ（炸蝦飯卷）"],
   why:"美瑛鎮上的人氣洋食店，就在四季之塔旁（本町 4 丁目）；有炸豬排定食，符合 PDF「炸豬排定食」。PDF 沒有指定店名，這是候選。",
   transit:"距四季之塔步行約 3–5 分；從美瑛聖誕樹車程約 10 分",
   warn:"人氣店，12:30 可能要等；定休日與價格請再確認。", tbc:true,
   src:"HAMONI、NAVITIME、mapple、Retty（2026）" },
 { id:"kumagera", name:"くまげら", jp:"お食事とご宴会の店 くまげら", area:"富良野", cuisine:"富良野鄉土料理", kind:"food",
   days:[3], meal:"晚餐",
   address:"北海道富良野市日の出町3-22", map:"くまげら 富良野",
   hours:"11:30–21:30（L.O. 21:00）（Hotpepper 標示至 22:00）", closed:"週三（12/15 為週二，應營業）", closedDow:[3],
   price:"晚餐約 ¥2,000–2,999／人", priceNote:"ローストビーフ丼約 ¥2,000–2,500（資料較舊）",
   dishes:["ふらの和牛ローストビーフ丼","ホエーカレー","チーズ豆腐","山賊鍋"],
   why:"富良野最知名的鄉土料理店，用大量富良野食材；是日式餐廳、有包廂，符合 PDF 的「富良野日式料理」。",
   transit:"富良野站步行約 3–5 分；從精靈露台車程約 10–15 分（估算）",
   warn:"人氣店，6 人建議電話洽詢訂位（0167-39-2345）。", tbc:false,
   src:"るるぶ、Hotpepper、livejapan（2026）" },
 { id:"suzukake", name:"ふらの和食 すずかけ", jp:"ふらの和食 すずかけ", area:"富良野", cuisine:"和食", kind:"food",
   days:[3], meal:"晚餐",
   address:"北海道富良野市幸町8-22", map:"ふらの和食 すずかけ 富良野",
   hours:"11:30–14:30、17:30–20:00", closed:"週一及臨時休（12/15 為週二，應營業）", closedDow:[1],
   price:"待確認", priceNote:"",
   dishes:["特製塩ざんぎ定食","すずかけ御膳（刺身＋天ぷら）","富良野オムカレー"],
   why:"在地人愛去的和食店，晚上有一品料理與酒；人潮比くまげら稍輕。17:30 開店，剛好對上 PDF 的晚餐時間。",
   transit:"JR 富良野站步行約 10 分；從精靈露台車程約 10–15 分（估算）",
   warn:"晚餐只到約 20:00，價格待確認。", tbc:true,
   src:"るるぶ（2026）" },
 { id:"baikoken", name:"梅光軒 旭川本店", jp:"梅光軒 旭川本店", area:"旭川", cuisine:"旭川拉麵", kind:"food",
   days:[4], meal:"午餐",
   address:"北海道旭川市二条通8丁目右1 ピアザビル B1階", map:"梅光軒 旭川本店",
   hours:"11:00–15:00（閉店 15:30）、17:00–20:30（閉店 21:00）", closed:"無休（年初不定休）→ 12/16 應營業", closedDow:[],
   price:"醬油拉麵約 ¥1,030（資料較舊，現價待確認）", priceNote:"",
   dishes:["醤油ラーメン（豚骨・雞骨＋魚介的 W 湯頭）","激煮干し王","味噌バターコーン"],
   why:"1969 年創業，旭川拉麵代表店之一，米其林北海道版收錄；位於旭川站前的平和通買物公園沿線，吃完可順路逛街，銜接 14:00 自由時間。",
   transit:"旭川站步行約 3 分；從旭岳車程約 1 小時 15 分（估算）",
   warn:"價格為舊資料，請以現場為準。", tbc:true,
   src:"mapple、Tabelog（2026）" },
 { id:"aoba", name:"旭川らぅめん青葉 本店", jp:"旭川らぅめん青葉 本店", area:"旭川", cuisine:"旭川拉麵", kind:"food",
   days:[], meal:"午餐",
   address:"北海道旭川市四条通8丁目1705-6", map:"旭川らぅめん青葉 本店",
   hours:"9:30–17:00（14:00–15:00 休息）", closed:"週三（遇祝日翌日休）→ 12/16 為週三，公休", closedDow:[3],
   price:"待確認", priceNote:"",
   dishes:["正油らぅめん（招牌）"],
   why:"1947 年屋台起家、旭川醬油拉麵的代表老店。僅列為資訊：12/16 公休，不適用於這趟行程；若行程日期變動才有機會。",
   transit:"旭川站步行約 8 分",
   warn:"12/16（週三）公休，不推薦該日前往。", tbc:false, unavailableOn:[4],
   src:"るるぶ、gltjp（2026）" },
 { id:"masa", name:"おたる政寿司 本店", jp:"おたる政寿司 本店", area:"小樽", cuisine:"壽司", kind:"food",
   days:[6], meal:"午餐",
   address:"北海道小樽市花園1-1-1", map:"おたる政寿司 本店",
   hours:"11:00–15:00（L.O. 14:30）、17:00–21:00（L.O. 20:30）", closed:"週三（12/18 為週五，應營業）", closedDow:[3],
   price:"午餐約 ¥5,000／人；晚餐約 ¥5,000–5,999", priceNote:"可刷卡（VISA/JCB/AMEX/Diners/Master）",
   dishes:["烏賊ソーメン（雲丹たれ）","おまかせ握り／コース","鰊、鱒、牡丹海老、雲丹（口碑常見）"],
   why:"1938 年創業的小樽代表老字號，位於「壽司屋通り」；260 席含包廂，6 人容易入座。",
   transit:"JR 小樽站步行約 10 分；從堺町通步行或計程車約 10–15 分（估算）",
   warn:"價位較高；可在預算頁設定。", tbc:false,
   src:"hitosara、Hotpepper、NTA（2026）" },
 { id:"wakaraku", name:"回転寿し 和楽 小樽店", jp:"回転寿し 和楽 小樽店", area:"小樽", cuisine:"迴轉壽司", kind:"food",
   days:[6], meal:"午餐",
   address:"北海道小樽市堺町3-1", map:"回転寿し 和楽 小樽店",
   hours:"11:00–15:30（閉店 16:00）、17:00–21:30（閉店 22:00）（可能變動）", closed:"待確認", closedDow:null,
   price:"單貫約 ¥400–1,100（本鮪赤身 ¥528、イクラ ¥528、うに ¥1,078；資料較舊）", priceNote:"",
   dishes:["本鮪赤身","活ほっき","イクラ","うに","活あわび"],
   why:"就在堺町通上，逛街途中就能吃；活貝與旬魚為主，比正式壽司店輕鬆，適合 6 人隨意點。",
   transit:"位在堺町通；JR 小樽站步行約 13 分",
   warn:"價格為舊資料，請以現場為準。", tbc:true,
   src:"mapple（2026 年查閱）" },
 { id:"inasuke", name:"めしや 因すけ 札幌大通店", jp:"めしや 因すけ 札幌大通店", area:"札幌", cuisine:"居酒屋", kind:"food",
   days:[6], meal:"晚餐",
   address:"札幌市電山鼻線「狸小路」站步行 1 分（詳細地址待確認）", map:"めしや 因すけ 札幌大通店",
   hours:"16:00–23:00（料理 L.O. 22:00，飲料 L.O. 22:30）", closed:"不定休（依大樓休館日）", closedDow:null,
   price:"平均約 ¥3,000／人（宴會約 ¥4,000）", priceNote:"約符合每人 RM100–120 不含酒水的預算",
   dishes:["つくね（店家主打）","居酒屋定番料理"],
   why:"入選原因是「全席可吸煙」（Gnavi 資料），符合 PDF 的吸煙區偏好，且位在狸小路旁、離 Cross Hotel 近。誠實說：這是連鎖居酒屋，食物水準屬中規中矩，不是美食名店。",
   transit:"Cross Hotel → 步行或地鐵約 15–20 分（估算）；JR 札幌站 → 地鐵／步行約 15–20 分",
   warn:"吸煙規定以現場為準；若想吃更有特色的店，可改選其他居酒屋。", tbc:true,
   src:"ぐるなび（Gnavi）（2026）" }
],

/* ---------------------------------------------------------------- 天氣地點 */
weatherPlaces: [
  { id:"sapporo",   name:"札幌",        lat:43.0618, lon:141.3545, note:"住宿城市（12/13–15、12/17–19）" },
  { id:"chitose",   name:"新千歲機場",  lat:42.7752, lon:141.6923, note:"12/13 抵達、12/19 離開" },
  { id:"biei",      name:"美瑛",        lat:43.5887, lon:142.4663, note:"12/15 午餐、美瑛聖誕樹" },
  { id:"furano",    name:"富良野",      lat:43.3420, lon:142.3830, note:"12/15 精靈露台、晚餐" },
  { id:"asahikawa", name:"旭川",        lat:43.7706, lon:142.3650, note:"住宿（西神樂）、12/16 拉麵與市區" },
  { id:"asahidake", name:"旭岳",        lat:43.6637, lon:142.8270, note:"12/16 旭岳纜車（座標為概略位置）" },
  { id:"otaru",     name:"小樽",        lat:43.1907, lon:140.9947, note:"12/18 運河、天狗山" }
],
weatherLinks: [
  { t:"氣象廳 氣象警報・注意報", s:"日本官方警報（降雪、暴風雪、強風）", u:"https://www.jma.go.jp/bosai/warning/" },
  { t:"氣象廳 天氣預報（北海道）", s:"官方預報；左側選擇地區", u:"https://www.jma.go.jp/bosai/forecast/" },
  { t:"tenki.jp 北海道", s:"日文天氣網，含雪雲與降雪預報", u:"https://tenki.jp/forecast/1/" },
  { t:"Northern Road Navi 道路資訊", s:"北海道道路狀況與封路（日文）", u:"https://northern-road.jp/" },
  { t:"JARTIC 交通資訊", s:"全日本道路交通與封路資訊", u:"https://www.jartic.or.jp/" },
  { t:"旭岳纜車官網", s:"運行予定表、停駛資訊", u:"https://asahidake.hokkaido.jp/ja/" },
  { t:"小樽天狗山纜車官網", s:"營運與停駛資訊", u:"https://tenguyama.ckk.chuo-bus.co.jp/" },
  { t:"JR 北海道 運行情報", s:"列車延誤與停駛", u:"https://www3.jrhokkaido.co.jp/webunkou/" }
],

/* ---------------------------------------------------------------- 預算分類 */
budgetCats: [
  { id:"flight",  name:"機票",           color:"#5E7A95" },
  { id:"rental",  name:"租車／包車",     color:"#9A7B58" },
  { id:"lodging", name:"住宿",           color:"#7E93A6" },
  { id:"etc",     name:"ETC／高速公路費", color:"#B9A586" },
  { id:"fuel",    name:"油錢",           color:"#A38C70" },
  { id:"food",    name:"餐飲",           color:"#C08F6B" },
  { id:"shop",    name:"購物",           color:"#8FA891" },
  { id:"ticket",  name:"景點門票",       color:"#6F8BA5" },
  { id:"other",   name:"其他",           color:"#B3A99A" }
],

/* ---------------------------------------------------------------- 旅行清單（預設項目；網站內可再新增） */
checklist: [
  { id:"docs", name:"護照及重要文件", items:[
    "護照（確認效期）","日本入境電子申報（Visit Japan Web 或官方最新方式）","旅遊保險保單","日圓現金與信用卡（確認海外手續費）","行程 PDF、住宿訂單截圖（存手機離線備份）","緊急聯絡人資料" ]},
  { id:"tickets", name:"機票及包車文件", items:[
    "ZIPAIR ZG062 電子機票／登機證","Peach MM571 電子機票／值機","AirAsia X D79551 回程電子機票","小王（包車司機）LINE：確認 12/13、12/15、12/16、12/17 接送時間與地點","Guest House Itoh（Airbnb）入住資訊","Sapporo Stream Hotel／Cross Hotel 訂單" ]},
  { id:"warm", name:"保暖衣物", items:[
    "防風防水羽絨外套","發熱衣／內層保暖（多件）","毛衣或刷毛中層","保暖褲／內搭褲","厚襪（多雙）","暖暖包（貼式／手握式）" ]},
  { id:"shoes", name:"防滑鞋", items:[
    "防滑雪靴／冬季防滑鞋","鞋底防滑冰爪（札幌街道與旭岳結冰路面）","備用襪、防水鞋套" ]},
  { id:"acc", name:"手套、圍巾、帽子", items:[
    "防水保暖手套","圍巾／脖圍","毛帽","耳罩","護唇膏、護手霜" ]},
  { id:"tech", name:"相機及充電設備", items:[
    "相機、記憶卡、備用電池（低溫很耗電）","行動電源（隨身攜帶，依航空規定）","充電線、多孔充電頭","日本插頭轉接頭（日本為 100V、A 型插頭）","eSIM／網卡／漫遊方案","手機保暖套或放內袋" ]},
  { id:"care", name:"盥洗用品", items:[
    "牙刷、牙膏","洗面乳、保濕乳液（冬季乾燥）","個人藥品（感冒、止痛、腸胃）","口罩","眼鏡／隱形眼鏡","隨身液體依航空規定（100ml 以下）" ]},
  { id:"pre", name:"出發前確認事項", items:[
    "線上值機（ZIPAIR、Peach、AirAsia X）","確認成田轉機：行李是否提取、Peach 20kg 額度","確認旭岳纜車 12/11 後復駛與 12/16 時刻","確認 Day 7 出發與抵達機場時間（建議提前 3 小時）","確認各餐廳營業日／是否訂位（6 人）","確認 Cross Hotel Meet Lounge／18 樓浴場資格","查看出發前一週天氣與路況","兌換日圓、準備現金（部分店只收現金）" ]}
]

};
