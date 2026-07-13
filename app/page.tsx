"use client";
import Image from "next/image";
import {useEffect,useState} from "react";
type Entry={title:string;text:string};
const drawerItems=[
 {id:"home",label:"मुख्यपृष्ठ",icon:"⌂"},{id:"about",label:"श्री गुरुपीठ",icon:"◆"},{id:"swami",label:"श्री स्वामी समर्थ",icon:"॥"},{id:"gurupranali",label:"गुरुप्रणाली",icon:"ॐ"},
 {id:"nitya",label:"नित्यसेवा",icon:"☼"},{id:"aarti",label:"आरती संग्रह",icon:"♨"},{id:"charitra",label:"स्वामी चरित्र सारामृत",icon:"▤"},{id:"jap",label:"मंत्रजप",icon:"●"},
 {id:"chandi",label:"अब्जचंडी सेवा",icon:"✦"},{id:"guide",label:"स्वामी मार्गदर्शिका",icon:"▣"},{id:"festivals",label:"सण-वार व उत्सव",icon:"✺"},{id:"monthly",label:"मासिक सेवा",icon:"◫"},
 {id:"activities",label:"सेवा मार्ग उपक्रम",icon:"✥"},{id:"publications",label:"प्रकाशन व साहित्य",icon:"▥"},{id:"charitable",label:"चॅरिटेबल सेवा",icon:"♡"},{id:"village",label:"ग्राम व सामाजिक विकास",icon:"⌘"},
 {id:"youtube",label:"व्हिडिओ व यूट्यूब",icon:"▶"},{id:"contact",label:"संपर्क",icon:"☎"}
];
const services=[
 {id:"nitya",title:"नित्यसेवा",sub:"१४ स्तोत्र व मंत्र",img:"new_nitya_seva.png"},{id:"aarti",title:"आरती संग्रह",sub:"दैनिक आरती",img:"new_arti_sangrah.png"},
 {id:"charitra",title:"स्वामी चरित्र",sub:"२१ अध्याय",img:"new_swamicharitra.png"},{id:"jap",title:"मंत्रजप",sub:"जप मोजणी",img:"new_mantra_jap.png"},
 {id:"chandi",title:"अब्जचंडी",sub:"सेवा व माहिती",img:"new_abjya_chandi.png"},{id:"guide",title:"मार्गदर्शिका",sub:"पंचांग व मुहूर्त",img:"new_margadarshika.png"},
 {id:"festivals",title:"सण-वार",sub:"उत्सव दिनदर्शिका",img:"new_san_var.png"},{id:"myseva",title:"माझी सेवा",sub:"सेवा नोंद",img:"new_majhi_seva.png"}
];
const centers=[["श्री गुरुपीठ","cardgurupeeth.png"],["श्री प्रसादालय","cardprasadalay.png"],["आयुर्वेदिक हॉस्पिटल","cardayuhospital.png"]];
const aboutSections=[
 {title:"श्री गुरुपीठ",text:"श्री क्षेत्र दिंडोरी येथील प्रधान सेवा केंद्र आणि सेवा मार्गाच्या विविध उपक्रमांचे प्रेरणास्थान.",img:"cardgurupeeth.png"},
 {title:"श्री प्रसादालय",text:"भाविक आणि सेवेकऱ्यांसाठी अन्नदान व प्रसाद सेवेचे भव्य केंद्र.",img:"cardprasadalay.png"},
 {title:"सद्गुरू मोरेदादा चॅरिटेबल हॉस्पिटल",text:"गरजू रुग्णांसाठी आरोग्यसेवा आणि सामाजिक बांधिलकीचा उपक्रम.",img:"cardayuhospital.png"},
 {title:"दत्तधाम",text:"श्री दत्त उपासना, साधना आणि आध्यात्मिक सेवेसाठी पवित्र स्थान.",img:"card_dattdham.png"},
 {title:"गोशाळा",text:"गोसेवा, संवर्धन आणि भारतीय संस्कृतीशी जोडलेले सेवाकार्य.",img:"card_gaushala.png"},
 {title:"जनकल्याण",text:"समाजोपयोगी उपक्रम, आपत्ती मदत आणि सेवेकरी सहभागातून जनकल्याण.",img:"cardjankalyan.png"}
];
const aartiDetails:Record<string,string>={
 "श्री गणपती आरती":`सुखकर्ता दुःखहर्ता वार्ता विघ्नाची । नुरवी पुरवी प्रेम कृपा जयाची ।
सर्वांगी सुंदर उटी शेंदुराची । कंठी झळके माळ मुक्ताफळांची ॥

जय देव जय देव जय मंगलमूर्ती । दर्शनमात्रे मनकामना पुरती ॥ धृ ॥

रत्नखचित फरा तुज गौरीकुमरा । चंदनाची उटी कुंकुमकेशरा ।
हिरेजडित मुकुट शोभतो बरा । रुणझुणती नूपुरे चरणी घागरिया ॥

लंबोदर पीतांबर फणिवरबंधना । सरळ सोंड वक्रतुंड त्रिनयना ।
दास रामाचा वाट पाहे सदना । संकटी पावावे निर्वाणी रक्षावे सुरवरवंदना ॥`,
 "श्री स्वामी समर्थ आरती":`जय देव जय देव जय श्री स्वामी समर्था । आरती ओवाळू चरणी ठेवुनिया माथा ॥ धृ ॥

छेली खेडेग्रामी तू अवतरलासी । जगदुद्धारासाठी राया तू फिरसी ।
भक्तवत्सल खरा तू एक होसी । म्हणून शरण आलो तुझ्या चरणासी ॥

त्रैगुण परब्रह्म तुझा अवतार । त्याची काय वर्णू लीला पामर ।
शेषादिक शिणले न लागे त्याचा पार । तेथे जडमूढ कैसा करू विस्तार ॥

देवाधिदेवा तू स्वामिराया । निर्जर मुनिजन ध्याती भावे तव पाया ।
तुजसी अर्पण केली आपुली ही काया । शरणागता तारी तू स्वामीराया ॥`,
 "श्री दत्त आरती":`त्रिगुणात्मक त्रैमूर्ती दत्त हा जाणा । त्रिगुणी अवतार त्रैलोक्यराणा ।
नेती नेती शब्द न ये अनुमाना । सुरवर मुनिजन योगी समाधी न ये ध्याना ॥

जय देव जय देव जय श्री गुरुदत्ता । आरती ओवाळिता हरली भवचिंता ॥ धृ ॥

सबाह्य अभ्यंतरी तू एक दत्त । अभाग्यासी कैसी न कळे ही मात ।
पराही परतली तेथे कैचा हेत । जन्ममरणाचा पुरलासे अंत ॥

दत्त येऊनिया उभा ठाकला । सद्भावे साष्टांगे प्रणिपात केला ।
प्रसन्न होऊनी आशीर्वाद दिधला । जन्ममरणाचा फेरा चुकविला ॥`,
 "श्री दुर्गा देवी आरती":`दुर्गे दुर्घट भारी तुजविण संसारी । अनाथनाथे अंबे करुणा विस्तारी ।
वारी वारी जन्ममरणाते वारी । हारी पडलो आता संकट निवारी ॥

जय देवी जय देवी महिषासुरमथिनी । सुरवर ईश्वरवरदे तारक संजीवनी ॥ धृ ॥

त्रिभुवनभुवनी पाहता तुजऐसी नाही । चारी श्रमले परंतु न बोलवे काही ।
साही विवाद करिता पडिले प्रवाही । ते तू भक्तालागी पावसि लवलाही ॥

प्रसन्नवदने प्रसन्न होसी निजदासा । क्लेशांपासुनी सोडवी तोडी भवपाशा ।
अंबे तुजवाचून कोण पुरविल आशा । नरहरी तल्लीन झाला पदपंकजलेशा ॥`
};
const remoteInfo:Record<string,{title:string;intro:string;items:string[]}>= {
 aarti:{title:"आरती संग्रह",intro:"श्री स्वामी समर्थ सेवा मार्गातील दैनिक आरती संग्रह.",items:["श्री गणपती आरती","श्री स्वामी समर्थ आरती","श्री दत्त आरती","श्री दुर्गा देवी आरती"]},
 chandi:{title:"अब्जचंडी सेवा",intro:"अब्जचंडी सेवेची माहिती, नियम व सेवा क्रम.",items:["सेवा परिचय","सेवा संकल्प","पाठ क्रम","सेवा समर्पण"]},
 guide:{title:"श्री स्वामी समर्थ मार्गदर्शिका",intro:"पंचांग, राहू काळ, शुभाशुभ कोष्टक, मुहूर्त आणि सुविचार.",items:["आजचे पंचांग","राहू काळ","शुभाशुभ कोष्टक","मुहूर्त","सुविचार"]},
 festivals:{title:"सण-वार व उत्सव",intro:"दिंडोरी प्रणीत उत्सव आणि भारतीय सणांची दिनदर्शिका.",items:["मासिक उत्सव","गुरुपीठ उत्सव","सण व विशेष दिवस"]},
 swami:{title:"श्री स्वामी समर्थ",intro:"श्री स्वामी समर्थ महाराजांचे जीवन, शिकवण आणि भक्तिमार्गाची ओळख.",items:["श्री स्वामी समर्थ परिचय","अक्कलकोट परंपरा","तारक मंत्र","सेवा संदेश"]},
 gurupranali:{title:"गुरुप्रणाली",intro:"सेवा मार्गाची गुरु परंपरा आणि आध्यात्मिक प्रणाली.",items:["गुरु परंपरा","सेवा मार्ग","आध्यात्मिक मार्गदर्शन"]},
 monthly:{title:"मासिक सेवा",intro:"दर महिन्याच्या नियोजित सेवा, उपासना आणि सामूहिक कार्यक्रम.",items:["मासिक सेवा सूची","सामूहिक उपासना","सेवा नोंद"]},
 activities:{title:"सेवा मार्ग उपक्रम",intro:"आध्यात्मिक, शैक्षणिक, आरोग्य आणि समाजोपयोगी उपक्रम.",items:["युवा प्रबोधन","बालसंस्कार","कृषी व पर्यावरण","स्वयंरोजगार"]},
 publications:{title:"प्रकाशन व साहित्य",intro:"सेवा मार्गाची अधिकृत पुस्तके, मासिके आणि उपासना साहित्य.",items:["आध्यात्मिक पुस्तके","मासिक प्रकाशन","उपासना साहित्य","आयुर्वेद साहित्य"]},
 charitable:{title:"चॅरिटेबल सेवा",intro:"आरोग्य, अन्नदान आणि गरजूंसाठी चालविले जाणारे सेवा उपक्रम.",items:["चॅरिटेबल हॉस्पिटल","प्रसादालय","रुग्णसेवा","आपत्ती मदत"]},
 village:{title:"ग्राम व सामाजिक विकास",intro:"ग्रामविकास, कृषी, पर्यावरण आणि जनकल्याणाचे उपक्रम.",items:["ग्राम अभियान","कृषी मार्गदर्शन","पर्यावरण संवर्धन","गोसेवा"]},
 youtube:{title:"व्हिडिओ व यूट्यूब",intro:"सेवा मार्गाचे प्रवचन, कार्यक्रम आणि मार्गदर्शनपर व्हिडिओ.",items:["प्रवचन","उत्सव कार्यक्रम","सेवा मार्गदर्शन","भक्तिगीते"]},
 contact:{title:"संपर्क",intro:"श्री गुरुपीठ आणि सेवा मार्गाशी संपर्क साधण्यासाठी माहिती.",items:["श्री क्षेत्र दिंडोरी","दूरध्वनी: +९१ ९८६०४७१२७४","ईमेल: apps@dindoripranit.org","संकेतस्थळ: dindoripranit.org"]},
 myseva:{title:"माझी सेवा",intro:"आपली दैनिक व मासिक सेवा नोंद येथे व्यवस्थापित करा.",items:["दैनिक सेवा","साप्ताहिक सेवा","मासिक सेवा"]}
};
function toMarathiNumber(value:number){return String(value).replace(/[0-9]/g,d=>String.fromCodePoint(0x0966+Number(d)))}
function cleanHtml(value:string){return value.replace(/<br\s*\/?\s*>/gi,"\n").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").trim()}
export default function Home(){
 const [view,setView]=useState("home"),[entries,setEntries]=useState<Entry[]>([]),[selected,setSelected]=useState<Entry|null>(null),[loading,setLoading]=useState(false),[open,setOpen]=useState(false),[menuOpen,setMenuOpen]=useState(false),[count,setCount]=useState(0);
 useEffect(()=>{
  if(view!=="nitya"&&view!=="charitra") return;
  setLoading(true); setEntries([]); setSelected(null);
  const file=view==="nitya"?"nityasevastotramantra.json":"newswamicharitra.json";
  fetch(`/app-assets/${file}`)
   .then(r=>{if(!r.ok) throw Error(); return r.json()})
   .then(data=>{
    const next:Entry[]=view==="nitya"
     ? data.resources.string.map((x:{_name:string,__text:string})=>({title:x._name,text:x.__text}))
     : data.data.map((x:{title:string,description:string})=>({title:x.title,text:cleanHtml(x.description)}));
    setEntries(next);
   })
   .finally(()=>setLoading(false));
 },[view]);
 function openService(id:string){setMenuOpen(false);setSelected(null);if(id==="jap")setOpen(true);else setView(id)}
 const info=remoteInfo[view];
 return <main className="shell">
  <header><button className="menu-trigger" aria-label={"\u092e\u0947\u0928\u0942"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(true)}>☰</button><div className="brand"><Image className="brand-guru-image" unoptimized src="/app-assets/guru-app-icon.png" alt="श्री स्वामी समर्थ" width={46} height={46}/><div><b>श्री गुरुपीठ</b><small>दिंडोरी प्रणीत सेवा मार्ग</small></div></div><button className="lang">मराठी</button></header>
  {view==="home"&&<><section className="hero"><div><em>॥ श्री स्वामी समर्थ ॥</em><h1>सेवा, साधना आणि<br/>संस्कारांचा मार्ग</h1><p>नित्यसेवा, आरती, मंत्रजप आणि सेवा मार्गाची माहिती आता एका ठिकाणी.</p><button className="primary" onClick={()=>setView("nitya")}>आजची नित्यसेवा →</button></div><div className="portrait"><i/><Image unoptimized src="/app-assets/swami_samarth.png" alt="श्री स्वामी समर्थ" width={300} height={533} priority/></div></section><section className="content"><div className="heading"><div><em>आपली दैनिक सेवा</em><h2>सेवा सुविधा</h2></div></div><div className="grid">{services.map(x=><button className="card" key={x.id} onClick={()=>openService(x.id)}><span><Image unoptimized src={`/app-assets/${x.img}`} alt="" width={52} height={52}/></span><b>{x.title}</b><small>{x.sub}</small></button>)}</div></section><section className="quote">“<p>भिऊ नकोस, मी तुझ्या पाठीशी आहे.</p><small>— श्री स्वामी समर्थ</small></section><section className="content"><div className="heading"><div><em>सेवा कार्य</em><h2>आपली केंद्रे</h2></div></div><div className="centers">{centers.map(([t,img])=><article key={t}><Image unoptimized src={`/app-assets/${img}`} alt={t} fill/><div><b>{t}</b><small>माहिती पहा →</small></div></article>)}</div></section></>}
  {(view==="nitya"||view==="charitra")&&<section className="page reader-page"><button className="back" onClick={()=>selected?setSelected(null):setView("home")}>← {selected?"सूची":"मुख्यपृष्ठ"}</button><em>{view==="nitya"?"दैनिक उपासना":"श्री स्वामी चरित्र सारामृत"}</em><h2>{selected?.title||(view==="nitya"?"नित्यसेवा स्तोत्र व मंत्र":"स्वामी चरित्र")}</h2>{selected?<article className="devotional-text">{selected.text}</article>:loading?<div className="loading">अधिकृत मजकूर उघडत आहे…</div>:<div className="list">{entries.map((x,i)=><button key={x.title} onClick={()=>setSelected(x)}><span>{toMarathiNumber(i+1).padStart(2,"\u0966")}</span><b>{x.title}</b><strong>›</strong></button>)}</div>}</section>}
  {info&&<section className="page reader-page"><button className="back" onClick={()=>selected?setSelected(null):setView("home")}>← {selected?"सूची":"मुख्यपृष्ठ"}</button><em>श्री गुरुपीठ</em><h2>{selected?.title||info.title}</h2>{selected?<article className="devotional-text">{selected.text}</article>:<><p>{info.intro}</p><div className="list">{info.items.map((x,i)=><button key={x} onClick={()=>setSelected({title:x,text:aartiDetails[x]||x+' या विभागाची सविस्तर माहिती लवकरच उपलब्ध होईल.'})}><span>{toMarathiNumber(i+1).padStart(2,"\u0966")}</span><b>{x}</b><strong>›</strong></button>)}</div>{view!=="aarti"&&<p className="source-note">या विभागाचा सविस्तर मजकूर मूळ अनुप्रयोगामध्ये संकेतस्थळावरून येतो. अनुप्रयोगात उपलब्ध नसलेली माहिती अंदाजाने दाखवलेली नाही.</p>}</>}</section>}
  {view==="calendar"&&<section className="page"><button className="back" onClick={()=>setView("home")}>← मुख्यपृष्ठ</button><em>पंचांग</em><h2>आजचा दिवस</h2><div className="date"><small>सोमवार</small><b>१३</b><span>जुलै २०२६</span><hr/><p>आषाढ कृष्ण त्रयोदशी</p></div></section>}
  {view==="about"&&<section className="page about-page"><button className="back" onClick={()=>setView("home")}>← मुख्यपृष्ठ</button><em>दिंडोरी प्रणीत सेवा मार्ग</em><h2>श्री गुरुपीठ विषयी</h2><div className="about-hero"><Image unoptimized src="/app-assets/card_dindoripranit.png" alt="दिंडोरी प्रणीत सेवा मार्ग" width={1100} height={410}/></div><p className="about-intro">दिंडोरी प्रणीत श्री स्वामी समर्थ सेवा मार्गाचे हे अधिकृत डिजिटल व्यासपीठ आहे. सेवेकरी आणि भाविकांना नित्यसेवा, आध्यात्मिक मार्गदर्शन आणि विविध सेवा कार्यांशी जोडणे हा याचा उद्देश आहे.</p><section className="gurumauli-section"><div className="gurumauli-image"><Image unoptimized src="/app-assets/gurumauli.JPG" alt="परमपूज्य गुरुमाऊली" width={320} height={400}/></div><div><em>आध्यात्मिक मार्गदर्शन</em><h3>परमपूज्य गुरुमाऊली</h3><p>सेवा, संस्कार, अध्यात्म आणि समाजकल्याणाचा संदेश सेवेकऱ्यांपर्यंत पोहोचवणारे प्रेरणास्थान. सेवा मार्गाच्या विविध आध्यात्मिक व सामाजिक उपक्रमांना गुरुमाऊलींचे मार्गदर्शन लाभते.</p></div></section><div className="about-heading"><em>आपली सेवा केंद्रे</em><h3>आध्यात्मिक आणि सामाजिक कार्य</h3></div><div className="about-grid">{aboutSections.map(x=><article key={x.title}><div className="about-card-image"><Image unoptimized src={'/app-assets/'+x.img} alt={x.title} fill style={{objectFit:"contain"}} sizes="(max-width:760px) 100vw, 33vw"/></div><div className="about-card-copy"><h4>{x.title}</h4><p>{x.text}</p></div></article>)}</div><section className="social-section"><div><em>सेवेतून समाजकल्याण</em><h3>सेवा मार्गाचे सामाजिक उपक्रम</h3><p>आरोग्यसेवा, अन्नदान, गोसेवा, शिक्षण, ग्रामविकास आणि आपत्तीच्या काळातील मदतकार्य अशा विविध माध्यमांतून समाजापर्यंत सेवा पोहोचवली जाते.</p></div><div className="social-images">{["im_one.png","im_two.png","im_three.png","im_four.png"].map((img,i)=><Image unoptimized key={img} src={'/app-assets/'+img} alt={'सामाजिक सेवाकार्य '+toMarathiNumber(i+1)} width={260} height={180}/>)}</div></section></section>}
  {menuOpen&&<><button className="drawer-scrim" aria-label="मेनू बंद करा" onClick={()=>setMenuOpen(false)}/><aside className="drawer" aria-label="मुख्य मेनू"><div className="drawer-header"><Image className="brand-guru-image" unoptimized src="/app-assets/guru-app-icon.png" alt="श्री स्वामी समर्थ" width={58} height={58}/><div><b>श्री गुरुपीठ</b><small>दिंडोरी प्रणीत सेवा मार्ग</small></div><button aria-label="मेनू बंद करा" onClick={()=>setMenuOpen(false)}>×</button></div><div className="drawer-list">{drawerItems.map((item,i)=><button key={item.id} onClick={()=>openService(item.id)} className={view===item.id?"active":""}><span>{item.icon}</span><b>{item.label}</b>{i===3||i===11?<i/>:null}</button>)}</div><div className="drawer-footer">॥ श्री स्वामी समर्थ ॥</div></aside></>}
  <nav><button className={view==="home"?"active":""} onClick={()=>setView("home")}><span>⌂</span>मुख्यपृष्ठ</button><button className={view==="nitya"?"active":""} onClick={()=>setView("nitya")}><span>ॐ</span>नित्यसेवा</button><button onClick={()=>setOpen(true)}><span className="jap">जप</span>मंत्रजप</button><button className={view==="calendar"?"active":""} onClick={()=>setView("calendar")}><span>▣</span>दिनदर्शिका</button><button className={view==="about"?"active":""} onClick={()=>setView("about")}><span>ⓘ</span>माहिती</button></nav>
  {open&&<div className="overlay" role="dialog" aria-modal="true"><div className="counterbox"><button className="close" onClick={()=>setOpen(false)}>×</button><em>श्री स्वामी समर्थ</em><h2>मंत्रजप</h2><button className="counter" onClick={()=>setCount(count+1)}><b>{toMarathiNumber(count)}</b><small>मोजण्यासाठी स्पर्श करा</small></button><footer><button onClick={()=>setCount(0)}>पुन्हा सुरू करा</button><b>{toMarathiNumber(Math.floor(count/108))} माळा</b></footer></div></div>}
 </main>
}
