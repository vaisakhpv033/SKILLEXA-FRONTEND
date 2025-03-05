import Link from 'next/link'
import React from 'react'
import InstructorMobileNav from './InstructorMobileNav';
import SignOutButton from './SignOutButton';
import ModeToggle from './ModeToggle';


const InstructorNavbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-3 lg:px-10'>
      <Link href='/instructor' className='flex items-center gap-1'>
        <p className='text-white text-[26px] font-extrabold max-sm:hidden'>SKILLEXA</p>
      </Link>
      <div className="flex-between gap-5">
        {/* profile picture */}
        <ModeToggle />
        <SignOutButton />
        <InstructorMobileNav />
        

      </div>
    </nav>
  )
}

export default InstructorNavbar