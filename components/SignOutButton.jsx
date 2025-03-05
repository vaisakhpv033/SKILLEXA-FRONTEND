"use client"
import React from 'react'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button className="flex gap-4 items-center p-4 rounded-lg font-semibold text-lg justify-start text-white hover:text-[#00FFF0]" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
  )
}

export default SignOutButton