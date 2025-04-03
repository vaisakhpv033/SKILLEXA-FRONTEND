"use client"
import React, {useState} from 'react'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { SessionProvider } from 'next-auth/react'
import GlobalAuthHandler from './admin/GlobalAuthHandler'
import { logoutUser } from '@/lib/client/logout'


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

  const handleSignout = async () => {
    setIsLoggingOut(true);

    try {
      // Wait for the logout API call to complete
      await logoutUser();

      await signOut({ callbackUrl: "/login" });

    } catch (error) {
      console.error("Logout failed:", error.message);
      setIsLoggingOut(false); 
    }
  };

  return (
    <>
    <Button variant="ghost" className="flex gap-4 items-center p-4 rounded-lg  text-lg justify-start max-sm:text-sm hover:text-violet-500" onClick={handleSignout}>Logout</Button>
    {isLoggingOut && <><div className="fixed cursor-wait z-50 top-0 h-screen w-full inset-0 bg-slate-500 dark:bg-transparent backdrop-blur-2xl bg-opacity-70 flex items-center justify-center"><p className='animate-pulse text-lg'>Signing Out...</p></div></>}
    </>
  )
}

export default SignOutButton
