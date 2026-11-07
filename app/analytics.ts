import {addDoc,collection,doc,getDoc,getFirestore,serverTimestamp,setDoc,updateDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import {auth,app} from "./firebase";
const db=getFirestore(app);
const sessionKey="gurupeeth-session-id";
const progressCacheKey=(uid:string)=>`gurupeeth-progress-cache-${uid}`;
const pendingProgressKey=(uid:string)=>`gurupeeth-progress-pending-${uid}`;
let progressSync:Promise<void>|null=null;
function currentUser(){return auth.currentUser}
function readStoredProgress(key:string):Record<string,unknown>|null{
 try{const value=localStorage.getItem(key);return value?JSON.parse(value) as Record<string,unknown>:null}catch{return null}
}
function storeProgressLocally(uid:string,data:Record<string,unknown>){
 const previous=readStoredProgress(progressCacheKey(uid))||{};
 localStorage.setItem(progressCacheKey(uid),JSON.stringify({...previous,...data}));
}
function queueProgress(uid:string,data:Record<string,unknown>){
 const previous=readStoredProgress(pendingProgressKey(uid))||{};
 const previousData=previous.data&&typeof previous.data==="object"?previous.data as Record<string,unknown>:{};
 localStorage.setItem(pendingProgressKey(uid),JSON.stringify({data:{...previousData,...data},queuedAt:Date.now()}));
}
export async function startTrackedSession(){
 const user=currentUser();if(!user)return;
 const ref=doc(collection(db,"sessions"));sessionStorage.setItem(sessionKey,ref.id);
 await setDoc(ref,{uid:user.uid,email:user.email||"",displayName:user.displayName||"",startedAt:serverTimestamp(),lastSeenAt:serverTimestamp(),userAgent:navigator.userAgent.slice(0,300)});
}
export async function heartbeatSession(){
 const user=currentUser();if(!user)return;
 const id=sessionStorage.getItem(sessionKey);if(id)await updateDoc(doc(db,"sessions",id),{lastSeenAt:serverTimestamp()}).catch(()=>{});
}
export async function endTrackedSession(){
 const id=sessionStorage.getItem(sessionKey);if(id)await updateDoc(doc(db,"sessions",id),{lastSeenAt:serverTimestamp(),endedAt:serverTimestamp()}).catch(()=>{});
}
export async function trackActivity(type:string,data:Record<string,unknown>={}){
 const user=currentUser();if(!user)return;
 await addDoc(collection(db,"activityEvents"),{uid:user.uid,email:user.email||"",displayName:user.displayName||"",type,...data,occurredAt:serverTimestamp()});
}
export async function syncPendingProgress(){
 const user=currentUser();if(!user||typeof window==="undefined"||!navigator.onLine)return;
 if(progressSync)return progressSync;
 progressSync=(async()=>{
  const key=pendingProgressKey(user.uid);
  while(navigator.onLine){
   const raw=localStorage.getItem(key);if(!raw)return;
   let pending:Record<string,unknown>;
   try{pending=JSON.parse(raw) as Record<string,unknown>}catch{localStorage.removeItem(key);return}
   const data=pending.data&&typeof pending.data==="object"?pending.data as Record<string,unknown>:{};
   if(!Object.keys(data).length){localStorage.removeItem(key);return}
   await setDoc(doc(db,"userProgress",user.uid),{uid:user.uid,email:user.email||"",displayName:user.displayName||"",...data,updatedAt:serverTimestamp()},{merge:true});
   if(localStorage.getItem(key)===raw){localStorage.removeItem(key);return}
  }
 })();
 try{await progressSync}finally{progressSync=null}
}
export function installProgressSync(){
 if(typeof window==="undefined")return()=>{};
 const sync=()=>{void syncPendingProgress().catch(()=>{})};
 window.addEventListener("online",sync);
 const unsubscribe=onAuthStateChanged(auth,(user)=>{if(user&&navigator.onLine)sync()});
 sync();
 return()=>{window.removeEventListener("online",sync);unsubscribe()};
}
export async function saveProgress(data:Record<string,unknown>){
 const user=currentUser();if(!user)return;
 if(typeof window!=="undefined"){
  storeProgressLocally(user.uid,data);
  queueProgress(user.uid,data);
 }
 await syncPendingProgress();
}
export async function loadProgress(){
 const user=currentUser();if(!user)return null;
 const cached=typeof window!=="undefined"?readStoredProgress(progressCacheKey(user.uid)):null;
 const pendingRecord=typeof window!=="undefined"?readStoredProgress(pendingProgressKey(user.uid)):null;
 const pending=pendingRecord?.data&&typeof pendingRecord.data==="object"?pendingRecord.data as Record<string,unknown>:null;
 if(typeof navigator!=="undefined"&&!navigator.onLine)return cached||pending?{...cached,...pending}:null;
 try{
  const snapshot=await getDoc(doc(db,"userProgress",user.uid));
  const data={...cached,...(snapshot.exists()?snapshot.data():{}),...pending};
  if(Object.keys(data).length&&typeof window!=="undefined")localStorage.setItem(progressCacheKey(user.uid),JSON.stringify(data));
  return Object.keys(data).length?data:null;
 }catch(error){
  if(cached||pending)return{...cached,...pending};
  throw error;
 }
}
