"use client";

import {ReactNode, useEffect, useState} from "react";
import {browserLocalPersistence, onAuthStateChanged, setPersistence, type User} from "firebase/auth";
import {auth} from "./firebase";
import {updateLastSeen} from "./activity";

export default function RequireAuth({children}:{children:ReactNode}){
  const [user,setUser]=useState<User|null>(null);
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    setPersistence(auth,browserLocalPersistence).catch(()=>{});
    let heartbeat:ReturnType<typeof setInterval>|undefined;
    const unsubscribe=onAuthStateChanged(auth,next=>{
      setUser(next);
      setReady(true);
      if(heartbeat)clearInterval(heartbeat);
      if(!next) window.location.replace("/login");
      else{updateLastSeen(next).catch(()=>{});heartbeat=setInterval(()=>updateLastSeen(next).catch(()=>{}),120000)}
    });
    return()=>{unsubscribe();if(heartbeat)clearInterval(heartbeat)};
  },[]);
  if(!ready||!user)return <main className="auth-loading"><img src="/app-assets/guru-app-icon.png" alt=""/><span>॥ श्री स्वामी समर्थ ॥</span></main>;
  return <>{children}</>;
}
