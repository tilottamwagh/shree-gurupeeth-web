import {applicationDefault,cert,getApps,initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
const email=process.argv[2];
if(!email){console.error("Usage: npm run admin:grant -- admin@example.com");process.exit(1)}
const credential=process.env.FIREBASE_SERVICE_ACCOUNT_JSON?cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)):applicationDefault();
if(!getApps().length)initializeApp({credential});
const user=await getAuth().getUserByEmail(email);
await getAuth().setCustomUserClaims(user.uid,{...(user.customClaims||{}),admin:true});
console.log(`Admin access granted to ${email}. Sign out and sign in again.`);
