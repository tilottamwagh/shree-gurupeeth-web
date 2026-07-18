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
    return onAuthStateChanged(auth,next=>{
      setUser(next);
      setReady(true);
      if(!next) window.location.replace("/login");
      else updateLastSeen(next).catch(()=>{});
    });
  },[]);
  if(!ready||!user)return <main className="auth-loading"><img src="/app-assets/guru-app-icon.png" alt=""/><span>॥ श्री स्वामी समर्थ ॥</span></main>;
  return <>{children}</>;
}
