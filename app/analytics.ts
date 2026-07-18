import {addDoc,collection,doc,getFirestore,serverTimestamp,setDoc,updateDoc} from "firebase/firestore";
import {auth,app} from "./firebase";
const db=getFirestore(app);
const sessionKey="gurupeeth-session-id";
function currentUser(){return auth.currentUser}
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
export async function saveProgress(data:Record<string,unknown>){
 const user=currentUser();if(!user)return;
 await setDoc(doc(db,"userProgress",user.uid),{uid:user.uid,email:user.email||"",displayName:user.displayName||"",...data,updatedAt:serverTimestamp()},{merge:true});
}
