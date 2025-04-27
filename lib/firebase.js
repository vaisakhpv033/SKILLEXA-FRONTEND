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

// Initialize Firebase Cloud Messaging and Firestore
export const messaging = getMessaging(app);
export const db = getFirestore(app);







export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === 'granted') {
    try {
      const token = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY }); // Replace with your actual VAPID key
      console.log("FCM Token:", token);
      
      // You should now send this token to your server to associate it with the user.
      addFCMToken(token);

    } catch (error) {
      console.error("An error occurred while retrieving the FCM token:", error);
    }
  } else if (permission === 'denied') {
    console.log('Notification permission denied.');
  } else {
    console.log('Notification permission dismissed.');
  }
}