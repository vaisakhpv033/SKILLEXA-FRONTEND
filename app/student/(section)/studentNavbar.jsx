'use client';
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ModeToggle from '@/components/ModeToggle';
import MobileNav from '@/components/MobileNav';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';
import GlobalAuthHandler from '@/components/admin/GlobalAuthHandler';

const StudentNavbar = ({navbarLinks}) => {
    return (
    <SessionProvider>
        <GlobalAuthHandler>
            <StudentNavbarContent navbarLinks={navbarLinks} />
        </GlobalAuthHandler>
    </SessionProvider>
    )
}

const StudentNavbarContent = ({navbarLinks}) => {
    const pathname = usePathname();

    const role = 1;


  return (
    <nav className='flex-between fixed z-50 w-full px-6 pb-2 lg:px-10 bg-transparent dark:bg-transparent shadow-md  backdrop-blur-[8px]'>
        <Link href="/student" className='flex items-center'>
            <p className='text-primary text-[26px] font-extrabold'>SKILLEXA</p>
        </Link>
        <div className='flex-between gap-6 max-lg:hidden'>
            {navbarLinks.map((link) => {
                const isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== "/student");
                return (
                    <Link href={link.route} key={link.title} className={
                        cn(
                            'flex items-center p-4 rounded-lg justify-start', 
                            {'text-primary': isActive,}
                        )
                    }>
                        <Button variant="ghost" className="hover:bg-secondary text-dark dark:text-white">{link.imgUrl} {link.title}</Button>

                    </Link>
                )
            })}
            <Link href="/student/my-learning/wishlist" className="hover:bg-secondary p-1 rounded-full"><Heart className="h-5"/></Link>
            <Link href="/student/cart" className='hover:bg-secondary p-1 rounded-full'><ShoppingCart className="h-5" /></Link>
            {role && (
            <Link href="/student/profile/">
            <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>v</AvatarFallback>
            </Avatar>
            </Link>
          
            )}
            <ModeToggle />
        </div>

        <div className='flex-between gap-10  lg:hidden '>
            <ModeToggle />
            <MobileNav navbarLinks={navbarLinks} role={role} />
           
        </div>

    </nav>
  )
}

export default StudentNavbar
