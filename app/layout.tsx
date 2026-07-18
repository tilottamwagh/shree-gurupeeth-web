import type { Metadata } from "next";
import "./globals.css";
import "./auth.css";
export const metadata:Metadata={title:"श्री गुरुपीठ | दिंडोरी प्रणीत सेवा मार्ग",description:"नित्यसेवा, आरती, मंत्रजप आणि श्री गुरुपीठ सेवा कार्याचे अधिकृत डिजिटल व्यासपीठ.",icons:{icon:"/app-assets/guru-app-icon.png?v=2",shortcut:"/app-assets/guru-app-icon.png?v=2",apple:"/app-assets/guru-app-icon.png?v=2"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="mr"><body>{children}</body></html>}
