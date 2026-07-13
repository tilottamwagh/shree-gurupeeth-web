"use client";
import {useEffect,useMemo,useState} from "react";
import {getPanchangam,Observer,tithiNames,nakshatraNames,yogaNames} from "@ishubhamx/panchangam-js";
import {translate,type Language} from "./translations";

const observer=new Observer(20.203,73.827,550);
const names:Record<string,string>={
 Monday:"सोमवार",Tuesday:"मंगळवार",Wednesday:"बुधवार",Thursday:"गुरुवार",Friday:"शुक्रवार",Saturday:"शनिवार",Sunday:"रविवार",
 Pratipada:"प्रतिपदा",Dwitiya:"द्वितीया",Tritiya:"तृतीया",Chaturthi:"चतुर्थी",Panchami:"पंचमी",Shashthi:"षष्ठी",Saptami:"सप्तमी",Ashtami:"अष्टमी",Navami:"नवमी",Dashami:"दशमी",Ekadashi:"एकादशी",Dwadashi:"द्वादशी",Trayodashi:"त्रयोदशी",Chaturdashi:"चतुर्दशी",Purnima:"पौर्णिमा",Amavasya:"अमावस्या",
 Ashwini:"अश्विनी",Bharani:"भरणी",Krittika:"कृत्तिका",Rohini:"रोहिणी",Mrigashira:"मृगशीर्ष",Ardra:"आर्द्रा",Punarvasu:"पुनर्वसू",Pushya:"पुष्य",Ashlesha:"आश्लेषा",Magha:"मघा",PurvaPhalguni:"पूर्वा फाल्गुनी",UttaraPhalguni:"उत्तरा फाल्गुनी",Hasta:"हस्त",Chitra:"चित्रा",Swati:"स्वाती",Vishakha:"विशाखा",Anuradha:"अनुराधा",Jyeshtha:"ज्येष्ठा",Mula:"मूळ",PurvaAshadha:"पूर्वाषाढा",UttaraAshadha:"उत्तराषाढा",Shravana:"श्रवण",Dhanishtha:"धनिष्ठा",Shatabhisha:"शततारका",PurvaBhadrapada:"पूर्वाभाद्रपदा",UttaraBhadrapada:"उत्तराभाद्रपदा",Revati:"रेवती",
 Vishkambha:"विष्कंभ",Priti:"प्रीती",Ayushman:"आयुष्मान",Saubhagya:"सौभाग्य",Shobhana:"शोभन",Atiganda:"अतिगंड",Sukarma:"सुकर्मा",Dhriti:"धृती",Shula:"शूल",Ganda:"गंड",Vriddhi:"वृद्धी",Dhruva:"ध्रुव",Vyaghata:"व्याघात",Harshana:"हर्षण",Vajra:"वज्र",Siddhi:"सिद्धी",Vyatipata:"व्यतीपात",Variyana:"वरीयान",Parigha:"परिघ",Shiva:"शिव",Siddha:"सिद्ध",Sadhya:"साध्य",Shubha:"शुभ",Shukla:"शुक्ल",Brahma:"ब्रह्म",Indra:"इंद्र",Vaidhriti:"वैधृती",
 Bava:"बव",Balava:"बालव",Kaulava:"कौलव",Taitila:"तैतिल",Gara:"गर",Vanija:"वणिज",Vishti:"विष्टि",Shakuni:"शकुनी",Chatushpada:"चतुष्पाद",Naga:"नाग",Kimstughna:"किंस्तुघ्न",
 Aries:"मेष",Taurus:"वृषभ",Gemini:"मिथुन",Cancer:"कर्क",Leo:"सिंह",Virgo:"कन्या",Libra:"तुळ",Scorpio:"वृश्चिक",Sagittarius:"धनु",Capricorn:"मकर",Aquarius:"कुंभ",Pisces:"मीन",
 Chaitra:"चैत्र",Vaishakha:"वैशाख",Jyeshtha:"ज्येष्ठ",Ashadha:"आषाढ",ShravanaMasa:"श्रावण",Bhadrapada:"भाद्रपद",Ashwin:"आश्विन",Kartika:"कार्तिक",Margashirsha:"मार्गशीर्ष",Pausha:"पौष",MaghaMasa:"माघ",Phalguna:"फाल्गुन",
 Krishna:"कृष्णपक्ष",ShuklaPaksha:"शुक्लपक्ष",Varsha:"वर्षा",Grishma:"ग्रीष्म",Sharad:"शरद",Hemanta:"हेमंत",Shishira:"शिशिर",Vasanta:"वसंत",Dakshinayana:"दक्षिणायन",Uttarayana:"उत्तरायण",Parabhava:"पराभव"
};
const mr=(v:unknown)=>String(v??"").replace(/[0-9]/g,d=>String.fromCodePoint(0x0966+Number(d)));
const tr=(v:unknown)=>{const s=String(v??"");if(s==="Shravana")return "श्रावण";if(s==="Magha")return "माघ";if(s==="Shukla")return "शुक्लपक्ष";return names[s]||s};
const rashiNamesMr=["मेष","वृषभ","मिथुन","कर्क","सिंह","कन्या","तुळ","वृश्चिक","धनु","मकर","कुंभ","मीन"];
const rashi=(v:any)=>typeof v==="number"?rashiNamesMr[v]:(tr(v?.name??v));
const time=(d:Date|null|undefined)=>d?mr(new Intl.DateTimeFormat("mr-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",hour12:false}).format(d)):"—";
const end=(name:string,d:Date|null|undefined)=>d?tr(name)+" "+time(d)+" पर्यंत":tr(name);

export default function DailyPanchang({language="mr"}:{language?:Language}){
 const [now,setNow]=useState(()=>new Date());
 const t=(v:string)=>translate(v,language);
 const value=(v:unknown)=>language==="en"?String(v??""):tr(v);
 const fmtTime=(d:Date|null|undefined)=>d?(language==="en"?new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",hour12:false}).format(d):time(d)):"—";
 const endValue=(name:string,d:Date|null|undefined)=>d?value(name)+" "+fmtTime(d)+(language==="en"?" until":" पर्यंत"):value(name);
 useEffect(()=>{const id=setInterval(()=>setNow(new Date()),60000);return()=>clearInterval(id)},[]);
 const p:any=useMemo(()=>getPanchangam(now,observer,{timezoneOffset:330,calendarType:"amanta"}),[now.toLocaleDateString("en-CA",{timeZone:"Asia/Kolkata"})]);
 const date=language==="en"?new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",day:"numeric",month:"long",year:"numeric"}).format(now):mr(new Intl.DateTimeFormat("mr-IN",{timeZone:"Asia/Kolkata",day:"numeric",month:"long",year:"numeric"}).format(now));
 const day=value(new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",weekday:"long"}).format(now));
 const masa=value(p.masa?.name)+(p.masa?.isAdhika?(language==="en"?" (Adhika)":" (अधिक)"):"");
 const tithiName=tithiNames[p.tithi]||p.tithis?.[0]?.name;
 const nakName=nakshatraNames[p.nakshatra]||p.nakshatras?.[0]?.name;
 const yogaName=yogaNames[p.yoga]||p.yogas?.[0]?.name;
 const karanas=(p.karanas||[]).slice(0,2).map((x:any)=>endValue(x.name,x.endTime)).join(", ")||tr(p.karana);
 const rows=[
  ["शक",mr(p.samvat?.shaka)+", "+value(p.samvat?.samvatsara)+" संवत्सर"],
  ["अयन - ऋतू",value(p.ayana)+" - "+value(p.ritu)],
  ["मास पक्ष",masa+" "+value(p.paksha)],
  ["तिथी",endValue(tithiName,p.tithiEndTime)],
  ["नक्षत्र",endValue(nakName,p.nakshatraEndTime)],
  ["योग",endValue(yogaName,p.yogaEndTime)],
  ["करण",karanas],
  ["चंद्रराशी",value(p.moonRashi?.name)],
  ["रविराशी - नक्षत्र",value(p.sunRashi?.name)+" - "+value(p.sunNakshatra?.name)],
  ["गुरुराशी",rashi(p.planetaryPositions?.jupiter?.rashi)],
  ["शुक्रराशी",rashi(p.planetaryPositions?.venus?.rashi)],
  ["राहुकाळ",fmtTime(p.rahuKalamStart)+" - "+fmtTime(p.rahuKalamEnd)],
  ["सूर्य उदय - अस्त",fmtTime(p.sunrise)+" - "+fmtTime(p.sunset)],
  ["चंद्र उदय - अस्त",fmtTime(p.moonrise)+" - "+fmtTime(p.moonset)]
 ];
 return <div className="daily-panchang"><div className="panchang-title"><div><small>श्री स्वामी समर्थ</small><h2>{t("आजचे पंचांग")}</h2></div><div className="panchang-date"><b>{date}</b><span>{day}</span></div></div><div className="panchang-location">{t("श्री क्षेत्र दिंडोरी, नाशिक • भारतीय प्रमाणवेळ")}</div><dl>{rows.map(([label,value])=><div key={label}><dt>{t(label)}</dt><dd>{value||"—"}</dd></div>)}</dl><p className="panchang-note">{t("पंचांगातील वेळा दिंडोरी, नाशिक या स्थानासाठी सूर्योदयाधारित खगोलशास्त्रीय गणनेनुसार दररोज आपोआप अद्ययावत होतात.")}</p></div>
}
