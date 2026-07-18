import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8LMAtLs2q1UjGoeVHeFL8MazbO1_BM7Y",
  authDomain: "shree-gurupeeth-2c782.firebaseapp.com",
  projectId: "shree-gurupeeth-2c782",
  storageBucket: "shree-gurupeeth-2c782.firebasestorage.app",
  messagingSenderId: "669914351059",
  appId: "1:669914351059:web:29817858324e40aab3db26",
  measurementId: "G-VGFNLG7DGV",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
