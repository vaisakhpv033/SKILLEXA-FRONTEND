'use client';
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react';


const MobileNav = ({navbarLinks, role}) => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt="hamburger icon"
                        className="cursor-pointer lg:hidden"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-dark-1">
                    <SheetHeader>
                    <SheetTitle>
                    
                    <Link href='/' className='flex items-center gap-1'>
                        <Image
                            src='/icons/icon.png'
                            alt='Voom logo'
                            width={26}
                            height={26}
                            className='max-sm:size-0'
                        />
                        <p className='text-white text-[26px] font-extrabold'>SKILLEXA</p>
                    </Link>
                    </SheetTitle>
                    </SheetHeader>
                    <SheetDescription></SheetDescription>
                        <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                            <SheetClose asChild>
                                <section className='flex h-full flex-col gap-6 pt-16 text-white'>

                                    {navbarLinks.map((link) => {
                                        const isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== '/');
                                        return (
                                            <SheetClose key={link.title} asChild>
                                            <Link href={link.route}  className={
                                                cn(
                                                    'flex gap-4 items-center p-4 rounded-lg w-full max-w-60', 
                                                    {'text-[#00FFF0]': isActive,}
                                                )
                                            }>
                                                <p className='font-semibold'>
                                                    {link.title}
                                                </p>

                                            </Link>
                                            </SheetClose>
                                        )
                                    })}
                                    {role && (
                                    <SheetClose asChild>
                                    <button className="flex gap-4 items-center p-4 rounded-lg font-semibold w-full max-w-60" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button> 
                                    </SheetClose>
                                    )}

                                </section>
                            </SheetClose>
                        </div>
                    
                    
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav