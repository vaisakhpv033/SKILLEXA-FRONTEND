import Link from 'next/link'
import React from 'react'
import InstructorMobileNav from './InstructorMobileNav';
import { SignOutButtonProvider } from './SignOutButton';
import ModeToggle from './ModeToggle';
import { getNotifications } from '@/lib/server/Notification';
import { NotificationSheet } from './student/NotificationSheet';


const InstructorNavbar = async () => {
    const {success, data, message} = await getNotifications();
    let notifications = []
    if (success){
      notifications = data.results;
    }  
  return (
    <nav className='flex-between fixed z-50 w-full bg-transparent border-2 backdrop-blur-lg px-1 py-1 lg:px-5'>
      <Link href='/instructor' className='flex items-center gap-1'>
        <p className=' text-[26px] font-extrabold max-sm:text-[16px]'>SKILLEXA</p>
      </Link>
      <div className="flex-between gap-5 max-sm:gap-2">
        {/* profile picture */}
        <ModeToggle />
        <SignOutButtonProvider />
        <NotificationSheet notifications={notifications} />
        <InstructorMobileNav />
        

      </div>
    </nav>
  )
}

export default InstructorNavbar