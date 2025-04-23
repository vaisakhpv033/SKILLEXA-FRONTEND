// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { addFCMToken } from "./client/FCMToken";
const FIREBASE_VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
const FIREBASE_APIKEY = process.env.NEXT_PUBLIC_FIREBASE_APIKEY
const FIREBASE_AUTHDOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN
const FIREBASE_PROJECTID = process.env.NEXT_PUBLIC_FIREBASE_PROJECTID
const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const FIREBASE_APPID = process.env.NEXT_PUBLIC_FIREBASE_APPID
const FIREBASE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
// Add the public key generated 
//  the console here.

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