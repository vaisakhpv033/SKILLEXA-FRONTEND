"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

const SignOutButton = () => {
  return (
    <Button variant="ghost" className="flex gap-4 items-center p-4 rounded-lg  text-lg justify-start max-sm:text-sm hover:text-violet-500" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
  )
}

export default SignOutButton