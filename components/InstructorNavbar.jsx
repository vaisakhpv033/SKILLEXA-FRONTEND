import Link from 'next/link'
import React from 'react'
import InstructorMobileNav from './InstructorMobileNav';
import { SignOutButtonProvider } from './SignOutButton';
import ModeToggle from './ModeToggle';


const InstructorNavbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-transparent border-2 backdrop-blur-lg px-1 py-1 lg:px-5'>
      <Link href='/instructor' className='flex items-center gap-1'>
        <p className=' text-[26px] font-extrabold max-sm:text-[16px]'>SKILLEXA</p>
      </Link>
      <div className="flex-between gap-5 max-sm:gap-2">
        {/* profile picture */}
        <ModeToggle />
        <SignOutButtonProvider />
        <InstructorMobileNav />
        

      </div>
    </nav>
  )
}

export default InstructorNavbar