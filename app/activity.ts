import {addDoc,collection,doc,getFirestore,serverTimestamp,setDoc} from "firebase/firestore";
import type {User} from "firebase/auth";
import {app} from "./firebase";
const db=getFirestore(app);
export async function recordLogin(user:User){
 const provider=user.providerData[0]?.providerId||"password";
 await Promise.all([setDoc(doc(db,"users",user.uid),{uid:user.uid,email:user.email||"",displayName:user.displayName||"",photoURL:user.photoURL||"",provider,lastLoginAt:serverTimestamp(),lastSeenAt:serverTimestamp()},{merge:true}),addDoc(collection(db,"loginEvents"),{uid:user.uid,email:user.email||"",displayName:user.displayName||"",provider,loggedInAt:serverTimestamp()})]);
}
export function updateLastSeen(user:User){return setDoc(doc(db,"users",user.uid),{lastSeenAt:serverTimestamp()},{merge:true})}
