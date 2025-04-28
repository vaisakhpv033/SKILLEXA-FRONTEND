// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { addFCMToken } from "./client/FCMToken";
import { getFirestore } from "firebase/firestore";


const FIREBASE_VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
const FIREBASE_APIKEY = process.env.NEXT_PUBLIC_FIREBASE_APIKEY
const FIREBASE_AUTHDOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN
const FIREBASE_PROJECTID = process.env.NEXT_PUBLIC_FIREBASE_PROJECTID
const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const FIREBASE_APPID = process.env.NEXT_PUBLIC_FIREBASE_APPID
const FIREBASE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENT_ID

};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


// Initialize Messaging safely
let messaging = null;
if (typeof window !== "undefined") {
  const { getMessaging } = require("firebase/messaging"); // dynamic import (optional safer)
  messaging = getMessaging(app);
}
export { messaging };

// Initialize Firestore
export const db = getFirestore(app);







export const generateToken = async () => {
  try {
    // Request notification permission from the user
    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission === 'granted') {
      let token = localStorage.getItem('fcmToken');

      if (!token) {
        // If no token in localStorage, generate a new one
        token = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY });
        console.log("FCM Token:", token);

        // Store the token in localStorage
        //localStorage.setItem('fcmToken', token);

        // Send the token to your backend
        addFCMToken(token);
      }
    } else if (permission === 'denied') {
      throw new Error('Notification permission denied by the user.');
    } else {
      throw new Error('Notification permission was dismissed by the user.');
    }
  } catch (error) {
    // Log error to the console (or use a logging service like Sentry)
    console.error("An error occurred while generating the FCM token:", error);

  }
};
