'use client';
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ModeToggle from './ModeToggle';
import MobileNav from './MobileNav';
import { signOut } from 'next-auth/react';


const Navbar = ({navbarLinks}) => {
    const pathname = usePathname();

    const [role, setRole] = useState(null);

    useEffect(() => {
        fetch("/api/user")
        .then((res) => res.json())
        .then((data) => setRole(data.role))
        .catch(() => setRole(null));
        console.log(role);
    }, []);

    let dashboardRoute = "/";
    if (role === 1) dashboardRoute = "/student";
    if (role === 2) dashboardRoute = "/instructor";
    if (role === 3) dashboardRoute = "/admin";

  return (
    <nav className='flex-between fixed z-50 w-full px-6 py-2 lg:px-10 bg-dark-3 dark:bg-transparent shadow-lg  backdrop-blur-[8px]'>
        <Link href={dashboardRoute} className='flex items-center'>
            <p className='text-white text-[26px] font-extrabold'>SKILLEXA</p>
        </Link>
        <div className='flex-between gap-10 max-lg:hidden'>
            {navbarLinks.map((link) => {
                const isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== dashboardRoute);
                return (
                    <Link href={link.route} key={link.title} className={
                        cn(
                            'flex gap-4 items-center p-4 rounded-lg justify-start text-white hover:text-[#00FFF0]', 
                            {'text-[#00FFF0]': isActive,}
                        )
                    }>
                        <p className='text-lg font-semibold'>
                            {link.title}
                        </p>

                    </Link>
                )
            })}
            {role && (
            <button className="flex gap-4 items-center p-4 rounded-lg font-semibold text-lg justify-start text-white hover:text-[#00FFF0]" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
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

export default Navbar
