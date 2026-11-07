"use client";

import {useEffect,useState} from "react";
import type {Language} from "./translations";

type Weekday="Sunday"|"Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday";
const schedule:{day:Weekday;mr:string;periodMr:string;timeMr:string;periodEn:string;timeEn:string}[]=[
  {day:"Sunday",mr:"रविवार",periodMr:"संध्याकाळ",timeMr:"४:३० ते ६:००",periodEn:"Evening",timeEn:"4:30 PM – 6:00 PM"},
  {day:"Monday",mr:"सोमवार",periodMr:"सकाळ",timeMr:"७:३० ते ९:००",periodEn:"Morning",timeEn:"7:30 AM – 9:00 AM"},
  {day:"Tuesday",mr:"मंगळवार",periodMr:"दुपार",timeMr:"३:०० ते ४:३०",periodEn:"Afternoon",timeEn:"3:00 PM – 4:30 PM"},
  {day:"Wednesday",mr:"बुधवार",periodMr:"दुपार",timeMr:"१२:०० ते १:३०",periodEn:"Afternoon",timeEn:"12:00 PM – 1:30 PM"},
  {day:"Thursday",mr:"गुरुवार",periodMr:"दुपार",timeMr:"१:३० ते ३:००",periodEn:"Afternoon",timeEn:"1:30 PM – 3:00 PM"},
  {day:"Friday",mr:"शुक्रवार",periodMr:"सकाळ",timeMr:"१०:३० ते १२:००",periodEn:"Morning",timeEn:"10:30 AM – 12:00 PM"},
  {day:"Saturday",mr:"शनिवार",periodMr:"सकाळ",timeMr:"९:०० ते १०:३०",periodEn:"Morning",timeEn:"9:00 AM – 10:30 AM"},
];
const weekdayInIndia=()=>new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long"}).format(new Date()) as Weekday;

export default function RahuKaalPage({language,onOpenPanchang}:{language:Language;onOpenPanchang:()=>void}){
  const [today,setToday]=useState<Weekday>(weekdayInIndia);
  useEffect(()=>{const timer=window.setInterval(()=>setToday(weekdayInIndia()),60_000);return()=>window.clearInterval(timer)},[]);
  const current=schedule.find(row=>row.day===today)!;
  const isMarathi=language==="mr";
  return <section className="page rahu-page">
    <div className="rahu-heading"><div><em>{isMarathi?"दैनिक मार्गदर्शन":"DAILY GUIDANCE"}</em><h2>{isMarathi?"राहू काळ":"Rahu Kaal"}</h2><p>{isMarathi?"परंपरेनुसार राहू काळात नवीन शुभकार्य सुरू करणे टाळले जाते.":"Traditionally, people avoid beginning new auspicious activities during Rahu Kaal."}</p></div><div className="rahu-today"><small>{isMarathi?"आजचे वेळापत्रक":"TODAY’S SCHEDULE"}</small><b>{isMarathi?current.mr:current.day}</b><strong>{isMarathi?current.timeMr:current.timeEn}</strong></div></div>
    <div className="rahu-table-card"><div className="rahu-table-heading"><div><b>{isMarathi?"वारानुसार वेळा":"Weekly schedule"}</b><small>{isMarathi?"संदर्भचित्रातील वेळापत्रक":"Schedule from your reference image"}</small></div><span aria-hidden="true">◷</span></div><div className="rahu-table-scroll"><table><thead><tr><th>{isMarathi?"वार":"Day"}</th><th>{isMarathi?"वेळ":"Period"}</th><th>{isMarathi?"राहू काळ":"Rahu Kaal"}</th></tr></thead><tbody>{schedule.map(row=><tr key={row.day} className={today===row.day?"is-today":""}><th scope="row">{isMarathi?row.mr:row.day}{today===row.day&&<span className="rahu-today-tag">{isMarathi?"आज":"Today"}</span>}</th><td>{isMarathi?row.periodMr:row.periodEn}</td><td>{isMarathi?row.timeMr:row.timeEn}</td></tr>)}</tbody></table></div></div>
    <p className="rahu-note">{isMarathi?"ही वेळापत्रकातील संदर्भ वेळ आहे. प्रत्यक्ष राहू काळ स्थानिक सूर्योदय आणि सूर्यास्तानुसार बदलू शकतो; दिंडोरीसाठी आजची गणना पाहण्यासाठी दैनिक पंचांग उघडा.":"These are reference schedule times. The actual Rahu Kaal can vary with local sunrise and sunset. Open the daily Panchang for the calculated time for Dindori."}</p>
    <button className="rahu-panchang-link" onClick={onOpenPanchang}>{isMarathi?"आजचे दैनिक पंचांग पहा →":"View today’s Panchang →"}</button>
  </section>;
}
