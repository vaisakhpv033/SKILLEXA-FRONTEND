"use client"
import React, {useState} from 'react'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { SessionProvider } from 'next-auth/react'
import GlobalAuthHandler from './admin/GlobalAuthHandler'


export const SignOutButtonProvider = () => {
    return (
    <SessionProvider>
        <GlobalAuthHandler>
            <SignOutButton />
        </GlobalAuthHandler>
    </SessionProvider>
    )
}



const SignOutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleSignout = () => {
    signOut({ callbackUrl: "/login" })
    setIsLoggingOut(true);
    
  }
  return (
    <>
    <Button variant="ghost" className="flex gap-4 items-center p-4 rounded-lg  text-lg justify-start max-sm:text-sm hover:text-violet-500" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
    {isLoggingOut && <div className="fixed top-0 min-w-full min-h-screen">Logging out....</div>}
    </>
  )
}

export default SignOutButton