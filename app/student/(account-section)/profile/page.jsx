export const dynamic = 'force-dynamic';
import React from 'react'
import { AccountProfile } from '@/components/student/AccountProfile'
import DashboardClockCard from '@/app/instructor/DashboardClockCard';

const page = () => {
  return (
    <>
      <div className='flex px-10 pt-3 size-full flex-col gap-2 text-white'>
        <DashboardClockCard title="Profile Overview"/>
        <div className="mx-auto w-full py-2 px-4 2xl:px-0">

          <h2 className="mb-4 text-xl font-semibold text-black dark:text-white  sm:text-2xl md:mb-6">
            General overview
          </h2>


          <AccountProfile />

        </div>
      </div>
    </>
  )
}

export default page