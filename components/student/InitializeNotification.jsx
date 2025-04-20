'use client'
import React, {useEffect} from 'react'
import { onMessage } from 'firebase/messaging'
import { generateToken, messaging } from '@/lib/firebase'


const InitializeNotification = () => {

    useEffect(() => {
        generateToken();
        onMessage(messaging, (payload) => {
            console.log(payload);
        })
    }, [])
  return null
}

export default InitializeNotification