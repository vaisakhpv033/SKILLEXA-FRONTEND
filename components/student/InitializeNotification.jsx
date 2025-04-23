'use client'
import React, {useEffect} from 'react'
import { onMessage } from 'firebase/messaging'
import { generateToken, messaging } from '@/lib/firebase'
import { toast } from 'sonner'

const InitializeNotification = () => {

    useEffect(() => {
        generateToken();
        // onMessage callback function is triggered when the website tab is in the foreground
        onMessage(messaging, (payload) => {
            console.log("payload", payload);
            toast.info(payload.notification.title, {description: payload.notification.body})
        })
    }, [])
  return null
}

export default InitializeNotification