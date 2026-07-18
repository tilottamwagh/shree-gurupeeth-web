"use client";

import {FormEvent, useEffect, useState} from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import {auth} from "./firebase";
import type {Language} from "./translations";

type Mode="login"|"signup"|"forgot"|"profile";
const copy={
  mr:{account:"खाते",login:"लॉग इन",signup:"नवीन खाते तयार करा",forgot:"पासवर्ड विसरलात?",name:"पूर्ण नाव",email:"ईमेल",password:"पासवर्ड",confirm:"पासवर्ड पुन्हा लिहा",google:"Google सह सुरू ठेवा",or:"किंवा",reset:"रीसेट लिंक पाठवा",back:"लॉग इनवर परत जा",logout:"लॉग आउट",close:"बंद करा",welcome:"स्वागत आहे",verified:"ईमेल सत्यापित",unverified:"ईमेल सत्यापन बाकी",verifySent:"खाते तयार झाले. सत्यापन लिंक ईमेलवर पाठवली आहे.",resetSent:"पासवर्ड रीसेट लिंक ईमेलवर पाठवली आहे.",needAccount:"खाते नाही?",haveAccount:"आधीच खाते आहे?",working:"कृपया थांबा…",passwordMismatch:"दोन्ही पासवर्ड समान असणे आवश्यक आहे.",passwordHelp:"किमान ६ अक्षरे",loginHint:"तुमची सेवा आणि वाचन सुरू ठेवा.",profileHint:"तुम्ही सुरक्षितपणे लॉग इन आहात."},
  en:{account:"Account",login:"Log in",signup:"Create account",forgot:"Forgot password?",name:"Full name",email:"Email",password:"Password",confirm:"Confirm password",google:"Continue with Google",or:"or",reset:"Send reset link",back:"Back to login",logout:"Log out",close:"Close",welcome:"Welcome",verified:"Email verified",unverified:"Email verification pending",verifySent:"Account created. A verification link was sent to your email.",resetSent:"A password reset link was sent to your email.",needAccount:"New here?",haveAccount:"Already have an account?",working:"Please wait…",passwordMismatch:"Both passwords must match.",passwordHelp:"At least 6 characters",loginHint:"Continue your seva and reading journey.",profileHint:"You are securely signed in."},
};

function friendlyError(error:unknown,lang:Language){
  const code=typeof error==="object"&&error&&"code" in error?String((error as {code:string}).code):"";
  const mr:Record<string,string>={"auth/invalid-credential":"ईमेल किंवा पासवर्ड चुकीचा आहे.","auth/email-already-in-use":"या ईमेलवर खाते आधीच अस्तित्वात आहे.","auth/invalid-email":"कृपया योग्य ईमेल लिहा.","auth/weak-password":"पासवर्ड किमान ६ अक्षरांचा असावा.","auth/popup-closed-by-user":"Google लॉग इन पूर्ण झाले नाही.","auth/too-many-requests":"खूप प्रयत्न झाले. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा."};
  const en:Record<string,string>={"auth/invalid-credential":"Incorrect email or password.","auth/email-already-in-use":"An account already exists for this email.","auth/invalid-email":"Enter a valid email address.","auth/weak-password":"Password must be at least 6 characters.","auth/popup-closed-by-user":"Google sign-in was not completed.","auth/too-many-requests":"Too many attempts. Please try again later."};
  return (lang==="mr"?mr:en)[code]||(lang==="mr"?"काहीतरी चूक झाली. पुन्हा प्रयत्न करा.":"Something went wrong. Please try again.");
}

export default function AuthButton({language}:{language:Language}){
  const c=copy[language];
  const [user,setUser]=useState<User|null>(null),[ready,setReady]=useState(false),[open,setOpen]=useState(false),[mode,setMode]=useState<Mode>("login"),[name,setName]=useState(""),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[confirm,setConfirm]=useState(""),[busy,setBusy]=useState(false),[message,setMessage]=useState(""),[error,setError]=useState("");
  useEffect(()=>{setPersistence(auth,browserLocalPersistence).catch(()=>{});return onAuthStateChanged(auth,next=>{setUser(next);setReady(true)})},[]);
  useEffect(()=>{if(!open)return;const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};document.addEventListener("keydown",onKey);return()=>document.removeEventListener("keydown",onKey)},[open]);
  function show(next:Mode){setMode(next);setError("");setMessage("");setPassword("");setConfirm("")}
  function launch(){show(user?"profile":"login");setOpen(true)}
  async function submit(e:FormEvent){e.preventDefault();setError("");setMessage("");if(mode==="signup"&&password!==confirm){setError(c.passwordMismatch);return}setBusy(true);try{
    if(mode==="login"){await signInWithEmailAndPassword(auth,email.trim(),password);setOpen(false)}
    else if(mode==="signup"){const credential=await createUserWithEmailAndPassword(auth,email.trim(),password);if(name.trim())await updateProfile(credential.user,{displayName:name.trim()});await sendEmailVerification(credential.user,{url:window.location.origin});setMessage(c.verifySent);setMode("profile")}
    else{await sendPasswordResetEmail(auth,email.trim(),{url:window.location.origin});setMessage(c.resetSent)}
  }catch(err){setError(friendlyError(err,language))}finally{setBusy(false)}}
  async function google(){setBusy(true);setError("");try{await signInWithPopup(auth,new GoogleAuthProvider());setOpen(false)}catch(err){setError(friendlyError(err,language))}finally{setBusy(false)}}
  async function logout(){setBusy(true);try{await signOut(auth);setOpen(false)}finally{setBusy(false)}}
  const initial=(user?.displayName||user?.email||"U").trim().charAt(0).toUpperCase();
  return <>
    <button className="auth-trigger" onClick={launch} aria-label={c.account}>{ready&&user?<span className="auth-avatar">{user.photoURL?<img src={user.photoURL} alt="" referrerPolicy="no-referrer"/>:initial}</span>:<span aria-hidden="true">♙</span>}<span className="auth-trigger-label">{ready&&user?(user.displayName?.split(" ")[0]||c.account):c.login}</span></button>
    {open&&<div className="auth-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button className="auth-close" onClick={()=>setOpen(false)} aria-label={c.close}>×</button>
      <div className="auth-mark"><img src="/app-assets/guru-app-icon.png" alt=""/></div>
      {mode==="profile"&&user?<div className="auth-profile"><div className="auth-profile-avatar">{user.photoURL?<img src={user.photoURL} alt="" referrerPolicy="no-referrer"/>:initial}</div><h2 id="auth-title">{c.welcome}{user.displayName?`, ${user.displayName}`:""}</h2><p>{c.profileHint}</p><div className="auth-email">{user.email}</div><div className={`auth-verification ${user.emailVerified?"is-verified":""}`}>{user.emailVerified?"✓ ":"○ "}{user.emailVerified?c.verified:c.unverified}</div>{message&&<p className="auth-success" role="status">{message}</p>}<a className="auth-admin-link" href="/admin/reports">Admin reports</a><button className="auth-primary" onClick={logout} disabled={busy}>{busy?c.working:c.logout}</button></div>:<>
        <h2 id="auth-title">{mode==="signup"?c.signup:mode==="forgot"?c.forgot:c.login}</h2><p className="auth-intro">{c.loginHint}</p>
        {mode!=="forgot"&&<><button className="auth-google" type="button" onClick={google} disabled={busy}><b>G</b>{c.google}</button><div className="auth-divider"><span>{c.or}</span></div></>}
        <form onSubmit={submit}>{mode==="signup"&&<label>{c.name}<input value={name} onChange={e=>setName(e.target.value)} autoComplete="name" required/></label>}<label>{c.email}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" required/></label>{mode!=="forgot"&&<><label>{c.password}<input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} autoComplete={mode==="signup"?"new-password":"current-password"} required/><small>{mode==="signup"?c.passwordHelp:""}</small></label>{mode==="signup"&&<label>{c.confirm}<input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} minLength={6} autoComplete="new-password" required/></label>}</>}{error&&<p className="auth-error" role="alert">{error}</p>}{message&&<p className="auth-success" role="status">{message}</p>}<button className="auth-primary" disabled={busy}>{busy?c.working:mode==="signup"?c.signup:mode==="forgot"?c.reset:c.login}</button></form>
        <div className="auth-links">{mode==="login"&&<><button onClick={()=>show("forgot")}>{c.forgot}</button><span>{c.needAccount} <button onClick={()=>show("signup")}>{c.signup}</button></span></>}{mode==="signup"&&<span>{c.haveAccount} <button onClick={()=>show("login")}>{c.login}</button></span>}{mode==="forgot"&&<button onClick={()=>show("login")}>← {c.back}</button>}</div>
      </>}
    </section></div>}
  </>;
}
