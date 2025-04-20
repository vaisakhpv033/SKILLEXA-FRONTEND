// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

const FIREBASE_APIKEY = "AIzaSyC3MBhXjhPupPILqGVBZIzgoTCIs5hPXlc"
const FIREBASE_AUTHDOMAIN = "skillexa-9d34e.firebaseapp.com"
const FIREBASE_PROJECTID = "skillexa-9d34e"
const FIREBASE_STORAGE_BUCKET = "skillexa-9d34e.firebasestorage.app"
const FIREBASE_MESSAGING_SENDER_ID = "962471561862"
const FIREBASE_APPID = "1:962471561862:web:2d4809bf98267773995f07"
const FIREBASE_MEASUREMENT_ID = "G-TPJX6FTCRP"

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENT_ID,
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();



messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notificationTitle;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });