"use client";
import Image from "next/image";
import type {Language} from "./translations";

type AboutPageProps={language:Language;onBack:()=>void};
type TimelineItem={period:string;image:string;titleMr:string;titleEn:string;pointsMr:string[];pointsEn:string[]};

const timeline:TimelineItem[]=[
 {period:"",image:"/app-assets/about-gurupranali.jpg",titleMr:"गुरुप्रणाली आणि सेवा मार्ग",titleEn:"Gurupranali & Seva Marg",pointsMr:["श्री स्वामी समर्थ महाराज हे भगवान दत्तात्रेयांचे पूर्ण दिव्य अवतार आहेत.","त्यांनी साधना, श्रद्धा, आत्मजागरूकता, करुणा आणि सर्व जीवांविषयी सद्भाव यांवर भर दिला.","अहंकाराचा त्याग, गुरुभक्ती, नामस्मरण आणि निष्काम कर्मयोगातून प्रापंचिक व आध्यात्मिक सुखाचा सोपा मार्ग दाखविला.","भारतीय संस्कृतीचे पुनरुज्जीवन हे त्यांच्या कार्याचे वैशिष्ट्य होते."],pointsEn:["Shri Swami Samarth Maharaj is the complete divine incarnation of Lord Dattatreya.","He emphasized spiritual practice, faith, self-awareness, compassion, and goodwill towards all beings.","He showed the simple path to worldly and spiritual happiness through ego renunciation, Guru devotion, remembrance of the Divine Name, and selfless Karma Yoga.","Reviving Indian culture was the hallmark of His mission."]},
 {period:"1856 – 1878",image:"/app-assets/about-swami.png",titleMr:"श्री स्वामी समर्थ महाराज",titleEn:"Shree Swami Samarth Maharaj",pointsMr:["अक्कलकोट येथे २२ वर्षे वास्तव्य करून समाजाला आध्यात्मिक आणि सामाजिक मार्गदर्शन केले.","निष्काम सेवा, संपूर्ण समर्पण आणि ईश्वरभक्ती ही त्यांच्या शिकवणीची प्रमुख तत्त्वे होती.","अहंकाराचा त्याग करून भक्ती, नामस्मरण आणि मानवसेवा केल्यास जीवनाला शांती मिळते, असा संदेश दिला.","सन १८७८ मध्ये त्यांनी समाधी घेतली; त्यांचे दिव्य कार्य आजही जगभर सुरू आहे."],pointsEn:["Lived in Akkalkot for 22 years, guiding people spiritually and socially.","Teachings focused on selfless service, surrender, and devotion to God.","Life attains peace when ego is renounced and devotion, name remembrance, and service to humanity are practiced.","In 1878, He took Samadhi; His mission continues worldwide."]},
 {period:"1878 – 1974",image:"/app-assets/about-pithale.jpg",titleMr:"ब्रह्मीभूत तेजोनिधी पिठले महाराज",titleEn:"Brahmibhut Tejonidhi Pithale Maharaj",pointsMr:["स्वामी समर्थ महाराजांची शिकवण श्रद्धा आणि शिस्तीने पुढे नेली.","गंभीर आध्यात्मिक ज्ञानातून साधकांना मार्गदर्शन केले.","दिव्य कार्य अखंड सुरू राहण्यासाठी भक्कम पाया घातला."],pointsEn:["Carried forward Swami Samarth Maharaj's teachings with devotion and discipline.","Guided seekers with deep spiritual wisdom.","Laid the foundation for continuation of the divine mission."]},
 {period:"1922 – 1988",image:"/app-assets/about-moredada.png",titleMr:"सद्गुरू परमपूज्य मोरेदादा",titleEn:"Sadguru Param Pujya Moredada",pointsMr:["‘दिंडोरी प्रणीत सेवा मार्ग’ची स्थापना केली.","करुणा, साधना आणि निष्काम सेवेतून समाजात परिवर्तन घडविले.","स्वामी महाराजांची दिव्य योजना पुढे नेणारा तेजस्वी सेवा मार्ग निर्माण केला."],pointsEn:["Established the ‘Dindori Pranit Seva Marg’.","Brought transformation through compassion, spiritual practice, and selfless service.","Created a radiant path continuing Swami Maharaj's divine plan."]},
 {period:"1955 – Present",image:"/app-assets/about-gurumauli.png",titleMr:"परमपूज्य गुरुमाऊली अण्णासाहेब मोरे",titleEn:"Param Pujya Gurumauli Annasaheb More",pointsMr:["ग्रामसेवक अभियानाचे नेतृत्व करतात.","चार दशकांहून अधिक काळ सामाजिक आणि आध्यात्मिक सुधारणांसाठी कार्यरत आहेत.","व्यसनमुक्ती, महिला सक्षमीकरण आणि युवक रोजगार यांसारखे उपक्रम राबविले जातात.","जगभरातील ७,००० पेक्षा अधिक सेवा केंद्रांद्वारे लाखो सेवेकऱ्यांना सेवा आणि लोककल्याणाची दिशा मिळते."],pointsEn:["Leads the Gramsevak Abhiyan (Village Volunteer Movement).","Over four decades, spearheaded social and spiritual reforms.","Initiatives like de-addiction, women empowerment, and youth employment are carried out.","With 7,000+ Seva Kendras worldwide, millions are guided towards service and welfare."]}
];

export default function AboutPage({language,onBack}:AboutPageProps){
 const mr=language==="mr";
 return <section className="page official-about-page">
  <button className="back" onClick={onBack}>← {mr?"मुख्यपृष्ठ":"Home"}</button>
  <div className="about-title-block"><em>{mr?"दिंडोरी प्रणीत सेवा मार्ग":"Dindori Pranit Seva Marg"}</em><h2>{mr?"आमच्याविषयी":"About"}</h2><p>{mr?"श्री स्वामी समर्थ महाराजांच्या दिव्य कार्यापासून आजच्या सेवामार्गापर्यंतची अखंड गुरुपरंपरा.":"The unbroken spiritual lineage from Shree Swami Samarth Maharaj's divine mission to today's Seva Marg."}</p></div>
  <div className="lineage-timeline">
   {timeline.map((item,index)=><article className="lineage-item" key={item.titleEn}>
    <div className="lineage-marker"><span>{String(index+1).padStart(2,"0")}</span></div>
    <div className={`lineage-image lineage-image-${index+1}`}><Image unoptimized src={item.image} alt={mr?item.titleMr:item.titleEn} width={1200} height={1200}/></div>
    <div className="lineage-copy">
     {item.period&&<span className="lineage-period">{item.period}</span>}
     <em>{index===0?(mr?"दिव्य परंपरा":"Divine tradition"):(mr?"गुरुपरंपरा":"Spiritual lineage")}</em>
     <h3>{mr?item.titleMr:item.titleEn}</h3>
     <ul>{(mr?item.pointsMr:item.pointsEn).map(point=><li key={point}>{point}</li>)}</ul>
    </div>
   </article>)}
  </div>
  <div className="about-closing"><span>॥</span><p>{mr?"सेवा, साधना आणि संस्कारांच्या माध्यमातून मानवकल्याणाचा अखंड प्रवास.":"An enduring journey of human welfare through service, spiritual practice, and values."}</p><b>{mr?"॥ श्री स्वामी समर्थ ॥":"॥ Shree Swami Samarth ॥"}</b></div>
 </section>
}
