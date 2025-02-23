'use client';
import { navbarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ModeToggle from './ModeToggle';
import MobileNav from './MobileNav';

const Navbar = () => {
    const pathname = usePathname();
  return (
    <nav className='flex-between fixed z-50 w-full px-6 py-2 lg:px-10 bg-dark-3 dark:bg-transparent shadow-lg  backdrop-blur-[8px]'>
        <Link href={'/'} className='flex items-center'>
            <p className='text-white text-[26px] font-extrabold'>SKILLEXA</p>
        </Link>
        <div className='flex-between gap-10 max-lg:hidden'>
            {navbarLinks.map((link) => {
                const isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== '/');
                return (
                    <Link href={link.route} key={link.title} className={
                        cn(
                            'flex gap-4 items-center p-4 rounded-lg justify-start text-white', 
                            {'text-[#00FFF0]': isActive,}
                        )
                    }>
                        <p className='text-lg font-semibold'>
                            {link.title}
                        </p>

                    </Link>
                )
            })}
            <ModeToggle />
        </div>

        <div className='flex-between gap-10  lg:hidden '>
            <ModeToggle />
            <MobileNav />
           
        </div>

    </nav>
  )
}

export default Navbar
