"use client";
import Image from "next/image";
import { useState } from "react";

const services = [
 ["नित्यसेवा","स्तोत्र व मंत्र","new_nitya_seva.png"], ["आरती संग्रह","दैनिक आरती","new_arti_sangrah.png"],
 ["स्वामी चरित्र","सार-अमृत","new_swamicharitra.png"], ["मंत्रजप","जप मोजणी","new_mantra_jap.png"],
 ["अभ्यजा चंडी","सेवा व माहिती","new_abjya_chandi.png"], ["मार्गदर्शिका","पंचांग व मुहूर्त","new_margadarshika.png"],
 ["सण-वार","उत्सव दिनदर्शिका","new_san_var.png"], ["माझी सेवा","सेवा नोंद","new_majhi_seva.png"]
];
const centers=[["श्री गुरुपीठ","cardgurupeeth.png"],["श्री प्रसादालय","cardprasadalay.png"],["आयुर्वेदिक हॉस्पिटल","cardayuhospital.png"]];
export default function Home(){
 const [view,setView]=useState("home"),[open,setOpen]=useState(false),[count,setCount]=useState(0);
 return <main className="shell">
  <header><button aria-label="Menu">☰</button><div className="brand"><Image src="/app-assets/ic_launcher.png" alt="" width={42} height={42}/><div><b>श्री गुरुपीठ</b><small>दिंडोरी प्रणीत सेवा मार्ग</small></div></div><button className="lang">मराठी⌄</button></header>
  {view==="home"&&<><section className="hero"><div><em>॥ श्री स्वामी समर्थ ॥</em><h1>सेवा, साधना आणि<br/>संस्कारांचा मार्ग</h1><p>नित्यसेवा, आरती, मंत्रजप आणि सेवा मार्गाची माहिती आता एका ठिकाणी.</p><button className="primary" onClick={()=>setView("seva")}>आजची नित्यसेवा →</button></div><div className="portrait"><i/><Image src="/app-assets/swami_samarth.png" alt="श्री स्वामी समर्थ" width={340} height={340} priority/></div></section>
  <section className="content"><div className="heading"><div><em>आपली दैनिक सेवा</em><h2>सेवा सुविधा</h2></div><button>सर्व पहा</button></div><div className="grid">{services.map(([t,s,img])=><button className="card" key={t} onClick={()=>t==="मंत्रजप"?setOpen(true):setView("seva")}><span><Image src={`/app-assets/${img}`} alt="" width={52} height={52}/></span><b>{t}</b><small>{s}</small></button>)}</div></section>
  <section className="quote">“<p>भिऊ नकोस, मी तुझ्या पाठीशी आहे.</p><small>— श्री स्वामी समर्थ</small></section>
  <section className="content"><div className="heading"><div><em>सेवा कार्य</em><h2>आपली केंद्रे</h2></div></div><div className="centers">{centers.map(([t,img])=><article key={t}><Image src={`/app-assets/${img}`} alt={t} fill/><div><b>{t}</b><small>माहिती पहा →</small></div></article>)}</div></section></>}
  {view==="seva"&&<section className="page"><button className="back" onClick={()=>setView("home")}>← मुख्यपृष्ठ</button><em>दैनिक उपासना</em><h2>नित्यसेवा</h2><p>प्रवासात किंवा घरी असताना नित्य स्तोत्र, मंत्र आणि आरती वाचा.</p><div className="list">{["श्री गणपती अथर्वशीर्ष","श्री स्वामी समर्थ तारक मंत्र","श्री दुर्गा सप्तशती","आरती संग्रह"].map((x,i)=><button key={x}><span>0{i+1}</span><b>{x}</b><strong>›</strong></button>)}</div></section>}
  {view==="calendar"&&<section className="page"><em>पंचांग</em><h2>आजचा दिवस</h2><div className="date"><small>सोमवार</small><b>१३</b><span>जुलै २०२६</span><hr/><p>आषाढ कृष्ण त्रयोदशी</p></div></section>}
  {view==="about"&&<section className="page"><em>सेवा मार्ग</em><h2>श्री गुरुपीठ विषयी</h2><Image className="about" src="/app-assets/card_dindoripranit.png" alt="सेवा मार्ग" width={700} height={250}/><p>दिंडोरी प्रणीत श्री स्वामी समर्थ सेवा मार्गाचे हे अधिकृत डिजिटल व्यासपीठ आहे. सेवेकरी आणि भाविकांना नित्यसेवा व सेवा कार्याशी जोडणे हा याचा उद्देश आहे.</p></section>}
  <nav><button className={view==="home"?"active":""} onClick={()=>setView("home")}><span>⌂</span>मुख्यपृष्ठ</button><button className={view==="seva"?"active":""} onClick={()=>setView("seva")}><span>ॐ</span>नित्यसेवा</button><button onClick={()=>setOpen(true)}><span className="jap">जप</span>मंत्रजप</button><button className={view==="calendar"?"active":""} onClick={()=>setView("calendar")}><span>▣</span>दिनदर्शिका</button><button className={view==="about"?"active":""} onClick={()=>setView("about")}><span>ⓘ</span>माहिती</button></nav>
  {open&&<div className="overlay"><div className="counterbox"><button className="close" onClick={()=>setOpen(false)}>×</button><em>श्री स्वामी समर्थ</em><h2>मंत्रजप</h2><button className="counter" onClick={()=>setCount(count+1)}><b>{count}</b><small>मोजण्यासाठी स्पर्श करा</small></button><footer><button onClick={()=>setCount(0)}>पुन्हा सुरू करा</button><b>{Math.floor(count/108)} माळा</b></footer></div></div>}
 </main>
}
