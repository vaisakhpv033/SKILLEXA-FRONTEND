'use client';
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import ModeToggle from './ModeToggle';
import MobileNav from './MobileNav';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { SessionProvider } from 'next-auth/react';


const Navbar = ({navbarLinks}) => {
    return (
        <SessionProvider>
            <NavbarContent navbarLinks={navbarLinks}/>
        </SessionProvider>
    )
}


const NavbarContent = ({navbarLinks}) => {
    const pathname = usePathname();
    const {data:session, status} = useSession();
    const router = useRouter()
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (status === "authenticated" && ["/login", "/courses", "/register/instructor", "/register/student"].includes(pathname)) {
            window.location.href="/";
          } else if (status === "unauthenticated") {
            console.log("❌ User is not logged in");
          }
    }, [status]);

    let dashboardRoute = "/";
    if (role === 1) dashboardRoute = "/student";
    if (role === 2) dashboardRoute = "/instructor";
    if (role === 3) dashboardRoute = "/admin";

  return (
    <nav className='flex-between fixed z-50 w-full px-6  lg:px-10 dark:bg-transparent shadow-lg  backdrop-blur-[8px]'>
        <Link href={dashboardRoute} className='flex items-center'>
            <p className='text-violet-800 text-[26px] font-extrabold'>SKILLEXA</p>
        </Link>
        <div className='flex-between gap-10 max-lg:hidden'>
            {navbarLinks.map((link) => {
                const isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== dashboardRoute);
                return (
                    <Link href={link.route} key={link.title} className={
                        cn(
                            'flex gap-2 items-center p-3 rounded-lg text-black/75 dark:text-white/75 justify-start dark:hover:text-violet-500 hover:text-violet-500', 
                            {'text-violet-500': isActive,}
                        )
                    }>
                        {link.imgUrl}
                        <p className='text-md font-semibold'>
                            {link.title}
                        </p>

                    </Link>
                )
            })}
            {role && (
            <Link href="/student/profile/">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
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

export default Navbar
