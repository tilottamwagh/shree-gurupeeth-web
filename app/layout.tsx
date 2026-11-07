import type { Metadata,Viewport } from "next";
import "./globals.css";
import "./auth.css";
import "./responsive.css";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";
export const metadata:Metadata={title:"श्री गुरुपीठ | दिंडोरी प्रणीत सेवा मार्ग",description:"नित्यसेवा, आरती, मंत्रजप आणि श्री गुरुपीठ सेवा कार्याचे अधिकृत डिजिटल व्यासपीठ.",manifest:"/manifest.webmanifest",icons:{icon:"/app-assets/guru-app-icon.png?v=2",shortcut:"/app-assets/guru-app-icon.png?v=2",apple:"/app-assets/guru-app-icon.png?v=2"}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#fff9ef"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="mr"><body>{children}<footer className="global-legal-links" aria-label="Legal and support"><a href="/privacy-policy">Privacy policy</a><a href="/terms">Terms of use</a><a href="/account-deletion">Account deletion</a><a href="/support">Support</a></footer><ServiceWorkerRegistration/></body></html>}
