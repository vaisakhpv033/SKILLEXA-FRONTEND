'use client'
import React, {useEffect} from 'react'
import { onMessage } from 'firebase/messaging'
import { generateToken, messaging } from '@/lib/firebase'
import { toast } from 'sonner'

const InitializeNotification = () => {
    useEffect(() => {
      const initializeNotifications = async () => {
        try {
          // Initialize FCM Token generation
          await generateToken();
  
          // onMessage callback function is triggered when the website tab is in the foreground
          onMessage(messaging, (payload) => {
            console.log("payload", payload);
            toast.info(payload.notification.title, { description: payload.notification.body });
          });
        } catch (error) {
          // If there's an error during the initialization, show an error message to the user
          toast.error("Failed to initialize notifications. Please try again later.");
          console.error("Notification initialization failed:", error);
        }
      };
  
      // Call the function to initialize notifications
      initializeNotifications();
    }, []);
  
    return null;
  };
  

export default InitializeNotification