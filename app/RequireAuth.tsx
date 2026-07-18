"use client";

import {ReactNode, useEffect, useState} from "react";
import {browserLocalPersistence, onAuthStateChanged, setPersistence, type User} from "firebase/auth";
import {auth} from "./firebase";
import {updateLastSeen} from "./activity";
import {endTrackedSession,heartbeatSession,startTrackedSession} from "./analytics";

export default function RequireAuth({children}:{children:ReactNode}){
  const [user,setUser]=useState<User|null>(null);
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    setPersistence(auth,browserLocalPersistence).catch(()=>{});
    let heartbeat:ReturnType<typeof setInterval>|undefined;
    const unsubscribe=onAuthStateChanged(auth,async next=>{
      setUser(next);
      if(heartbeat)clearInterval(heartbeat);
      if(!next){setReady(true);window.location.replace("/login")}
      else{updateLastSeen(next).catch(()=>{});await startTrackedSession().catch(()=>{});setReady(true);heartbeat=setInterval(()=>{updateLastSeen(next).catch(()=>{});heartbeatSession().catch(()=>{})},120000)}
    });
    const finish=()=>endTrackedSession().catch(()=>{});window.addEventListener("pagehide",finish);
    return()=>{unsubscribe();if(heartbeat)clearInterval(heartbeat);window.removeEventListener("pagehide",finish)};
  },[]);
  if(!ready||!user)return <main className="auth-loading"><img src="/app-assets/guru-app-icon.png" alt=""/><span>॥ श्री स्वामी समर्थ ॥</span></main>;
  return <>{children}</>;
}
