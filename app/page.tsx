"use client";
import Image from "next/image";
import {useEffect,useState} from "react";
type Entry={title:string;text:string};
const services=[
 {id:"nitya",title:"नित्यसेवा",sub:"१४ स्तोत्र व मंत्र",img:"new_nitya_seva.png"},{id:"aarti",title:"आरती संग्रह",sub:"दैनिक आरती",img:"new_arti_sangrah.png"},
 {id:"charitra",title:"स्वामी चरित्र",sub:"२१ अध्याय",img:"new_swamicharitra.png"},{id:"jap",title:"मंत्रजप",sub:"जप मोजणी",img:"new_mantra_jap.png"},
 {id:"chandi",title:"अभ्यजा चंडी",sub:"सेवा व माहिती",img:"new_abjya_chandi.png"},{id:"guide",title:"मार्गदर्शिका",sub:"पंचांग व मुहूर्त",img:"new_margadarshika.png"},
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
const remoteInfo:Record<string,{title:string;intro:string;items:string[]}>= {
 aarti:{title:"आरती संग्रह",intro:"श्री स्वामी समर्थ सेवा मार्गातील दैनिक आरती संग्रह.",items:["श्री गणपती आरती","श्री स्वामी समर्थ आरती","श्री दत्त आरती","श्री दुर्गा देवी आरती"]},
 chandi:{title:"अभ्यजा चंडी सेवा",intro:"अभ्यजा चंडी सेवेची माहिती, नियम व सेवा क्रम.",items:["सेवा परिचय","सेवा संकल्प","पाठ क्रम","सेवा समर्पण"]},
 guide:{title:"श्री स्वामी समर्थ मार्गदर्शिका",intro:"पंचांग, राहू काळ, शुभाशुभ कोष्टक, मुहूर्त आणि सुविचार.",items:["आजचे पंचांग","राहू काळ","शुभाशुभ कोष्टक","मुहूर्त","सुविचार"]},
 festivals:{title:"सण-वार व उत्सव",intro:"दिंडोरी प्रणीत उत्सव आणि भारतीय सणांची दिनदर्शिका.",items:["मासिक उत्सव","गुरुपीठ उत्सव","सण व विशेष दिवस"]},
 myseva:{title:"माझी सेवा",intro:"आपली दैनिक व मासिक सेवा नोंद येथे व्यवस्थापित करा.",items:["दैनिक सेवा","साप्ताहिक सेवा","मासिक सेवा"]}
};
function toMarathiNumber(value:number){return String(value).replace(/[0-9]/g,d=>String.fromCodePoint(0x0966+Number(d)))}
function cleanHtml(value:string){return value.replace(/<br\s*\/?\s*>/gi,"\n").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").trim()}
export default function Home(){
 const [view,setView]=useState("home"),[entries,setEntries]=useState<Entry[]>([]),[selected,setSelected]=useState<Entry|null>(null),[loading,setLoading]=useState(false),[open,setOpen]=useState(false),[count,setCount]=useState(0);
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
 function openService(id:string){if(id==="jap")setOpen(true);else setView(id)}
 const info=remoteInfo[view];
 return <main className="shell">
  <header><button aria-label={"\u092e\u0947\u0928\u0942"}>☰</button><div className="brand"><Image unoptimized src="/app-assets/ic_launcher.png" alt="" width={42} height={42}/><div><b>श्री गुरुपीठ</b><small>दिंडोरी प्रणीत सेवा मार्ग</small></div></div><button className="lang">मराठी</button></header>
  {view==="home"&&<><section className="hero"><div><em>॥ श्री स्वामी समर्थ ॥</em><h1>सेवा, साधना आणि<br/>संस्कारांचा मार्ग</h1><p>नित्यसेवा, आरती, मंत्रजप आणि सेवा मार्गाची माहिती आता एका ठिकाणी.</p><button className="primary" onClick={()=>setView("nitya")}>आजची नित्यसेवा →</button></div><div className="portrait"><i/><Image unoptimized src="/app-assets/swami_samarth.png" alt="श्री स्वामी समर्थ" width={300} height={533} priority/></div></section><section className="content"><div className="heading"><div><em>आपली दैनिक सेवा</em><h2>सेवा सुविधा</h2></div></div><div className="grid">{services.map(x=><button className="card" key={x.id} onClick={()=>openService(x.id)}><span><Image unoptimized src={`/app-assets/${x.img}`} alt="" width={52} height={52}/></span><b>{x.title}</b><small>{x.sub}</small></button>)}</div></section><section className="quote">“<p>भिऊ नकोस, मी तुझ्या पाठीशी आहे.</p><small>— श्री स्वामी समर्थ</small></section><section className="content"><div className="heading"><div><em>सेवा कार्य</em><h2>आपली केंद्रे</h2></div></div><div className="centers">{centers.map(([t,img])=><article key={t}><Image unoptimized src={`/app-assets/${img}`} alt={t} fill/><div><b>{t}</b><small>माहिती पहा →</small></div></article>)}</div></section></>}
  {(view==="nitya"||view==="charitra")&&<section className="page reader-page"><button className="back" onClick={()=>selected?setSelected(null):setView("home")}>← {selected?"सूची":"मुख्यपृष्ठ"}</button><em>{view==="nitya"?"दैनिक उपासना":"श्री स्वामी चरित्र सारामृत"}</em><h2>{selected?.title||(view==="nitya"?"नित्यसेवा स्तोत्र व मंत्र":"स्वामी चरित्र")}</h2>{selected?<article className="devotional-text">{selected.text}</article>:loading?<div className="loading">अधिकृत मजकूर उघडत आहे…</div>:<div className="list">{entries.map((x,i)=><button key={x.title} onClick={()=>setSelected(x)}><span>{toMarathiNumber(i+1).padStart(2,"\u0966")}</span><b>{x.title}</b><strong>›</strong></button>)}</div>}</section>}
  {info&&<section className="page"><button className="back" onClick={()=>setView("home")}>← मुख्यपृष्ठ</button><em>श्री गुरुपीठ</em><h2>{info.title}</h2><p>{info.intro}</p><div className="list">{info.items.map((x,i)=><button key={x}><span>{toMarathiNumber(i+1).padStart(2,"\u0966")}</span><b>{x}</b><strong>›</strong></button>)}</div><p className="source-note">या विभागाचा सविस्तर मजकूर मूळ अनुप्रयोगामध्ये संकेतस्थळावरून येतो. अनुप्रयोगात उपलब्ध नसलेली माहिती अंदाजाने दाखवलेली नाही.</p></section>}
  {view==="calendar"&&<section className="page"><button className="back" onClick={()=>setView("home")}>← मुख्यपृष्ठ</button><em>पंचांग</em><h2>आजचा दिवस</h2><div className="date"><small>सोमवार</small><b>१३</b><span>जुलै २०२६</span><hr/><p>आषाढ कृष्ण त्रयोदशी</p></div></section>}
  {view==="about"&&<section className="page about-page"><button className="back" onClick={()=>setView("home")}>← मुख्यपृष्ठ</button><em>दिंडोरी प्रणीत सेवा मार्ग</em><h2>श्री गुरुपीठ विषयी</h2><div className="about-hero"><Image unoptimized src="/app-assets/card_dindoripranit.png" alt="दिंडोरी प्रणीत सेवा मार्ग" width={1100} height={410}/></div><p className="about-intro">दिंडोरी प्रणीत श्री स्वामी समर्थ सेवा मार्गाचे हे अधिकृत डिजिटल व्यासपीठ आहे. सेवेकरी आणि भाविकांना नित्यसेवा, आध्यात्मिक मार्गदर्शन आणि विविध सेवा कार्यांशी जोडणे हा याचा उद्देश आहे.</p><section className="gurumauli-section"><div className="gurumauli-image"><Image unoptimized src="/app-assets/gurumauli.JPG" alt="परमपूज्य गुरुमाऊली" width={320} height={400}/></div><div><em>आध्यात्मिक मार्गदर्शन</em><h3>परमपूज्य गुरुमाऊली</h3><p>सेवा, संस्कार, अध्यात्म आणि समाजकल्याणाचा संदेश सेवेकऱ्यांपर्यंत पोहोचवणारे प्रेरणास्थान. सेवा मार्गाच्या विविध आध्यात्मिक व सामाजिक उपक्रमांना गुरुमाऊलींचे मार्गदर्शन लाभते.</p></div></section><div className="about-heading"><em>आपली सेवा केंद्रे</em><h3>आध्यात्मिक आणि सामाजिक कार्य</h3></div><div className="about-grid">{aboutSections.map(x=><article key={x.title}><div className="about-card-image"><Image unoptimized src={'/app-assets/'+x.img} alt={x.title} fill style={{objectFit:"contain"}} sizes="(max-width:760px) 100vw, 33vw"/></div><div className="about-card-copy"><h4>{x.title}</h4><p>{x.text}</p></div></article>)}</div><section className="social-section"><div><em>सेवेतून समाजकल्याण</em><h3>सेवा मार्गाचे सामाजिक उपक्रम</h3><p>आरोग्यसेवा, अन्नदान, गोसेवा, शिक्षण, ग्रामविकास आणि आपत्तीच्या काळातील मदतकार्य अशा विविध माध्यमांतून समाजापर्यंत सेवा पोहोचवली जाते.</p></div><div className="social-images">{["im_one.png","im_two.png","im_three.png","im_four.png"].map((img,i)=><Image unoptimized key={img} src={'/app-assets/'+img} alt={'सामाजिक सेवाकार्य '+toMarathiNumber(i+1)} width={260} height={180}/>)}</div></section></section>}
  <nav><button className={view==="home"?"active":""} onClick={()=>setView("home")}><span>⌂</span>मुख्यपृष्ठ</button><button className={view==="nitya"?"active":""} onClick={()=>setView("nitya")}><span>ॐ</span>नित्यसेवा</button><button onClick={()=>setOpen(true)}><span className="jap">जप</span>मंत्रजप</button><button className={view==="calendar"?"active":""} onClick={()=>setView("calendar")}><span>▣</span>दिनदर्शिका</button><button className={view==="about"?"active":""} onClick={()=>setView("about")}><span>ⓘ</span>माहिती</button></nav>
  {open&&<div className="overlay" role="dialog" aria-modal="true"><div className="counterbox"><button className="close" onClick={()=>setOpen(false)}>×</button><em>श्री स्वामी समर्थ</em><h2>मंत्रजप</h2><button className="counter" onClick={()=>setCount(count+1)}><b>{toMarathiNumber(count)}</b><small>मोजण्यासाठी स्पर्श करा</small></button><footer><button onClick={()=>setCount(0)}>पुन्हा सुरू करा</button><b>{toMarathiNumber(Math.floor(count/108))} माळा</b></footer></div></div>}
 </main>
}
