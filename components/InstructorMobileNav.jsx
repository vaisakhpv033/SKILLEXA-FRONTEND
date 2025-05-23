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
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react';


const InstructorMobileNav = () => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Menu
                        width={36}
                        height={36}
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-dark-1">
                    <SheetHeader>
                    <SheetTitle>
                    
                    <Link href='/' className='flex items-center gap-1'>
                        <p className='text-white text-[26px] font-extrabold'>SKILLEXA</p>
                    </Link>
                    </SheetTitle>
                    </SheetHeader>
                    <SheetDescription></SheetDescription>
                        <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                            <SheetClose asChild>
                                <section className='flex h-full flex-col gap-6 pt-16 text-white'>

                                    {sidebarLinks.map((link) => {
                                        const  isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== '/instructor' && link.route !=='/instructor/course');
                                        return (
                                            <SheetClose key={link.label} asChild>
                                            <Link href={link.route}  className={
                                                cn(
                                                    'flex gap-4 items-center p-4 rounded-lg w-full max-w-60', 
                                                    {'bg-blue-1': isActive,}
                                                )
                                            }>
                                            <Image src ={link.imgUrl} alt={link.label} width={20} height={20}/>
                                                <p className='font-semibold'>
                                                    {link.label}
                                                </p>

                                            </Link>
                                            </SheetClose>
                                        )
                                    })}

                                </section>
                            </SheetClose>
                        </div>
                    
                    
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default InstructorMobileNav