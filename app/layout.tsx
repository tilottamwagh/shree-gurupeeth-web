import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"श्री गुरुपीठ | दिंडोरी प्रणीत सेवा मार्ग",description:"नित्यसेवा, आरती, मंत्रजप आणि श्री गुरुपीठ सेवा कार्याचे अधिकृत डिजिटल व्यासपीठ.",icons:{icon:"/app-assets/ic_launcher.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="mr"><body>{children}</body></html>}
