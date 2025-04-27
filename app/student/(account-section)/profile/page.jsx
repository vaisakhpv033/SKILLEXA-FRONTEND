export const dynamic = 'force-dynamic';
import React from 'react'
import { AccountProfile } from '@/components/student/AccountProfile'

const page = () => {
  return (
    <section className="py-8 antialiased md:py-8">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">

        <h2 className="mb-4 text-xl font-semibold  sm:text-2xl md:mb-6">
          General overview
        </h2>


        <AccountProfile />

      </div>
    </section>
  )
}

export default page