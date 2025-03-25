'use client';

import React from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link  from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image';

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <section className='sticky left-0 top-0 h-screen w-fit flex-col justify-between bg-transparent border-2  p-4 pt-14 max-sm:hidden lg:w-[232px]'>
        <div className='flex flex-1 flex-col gap-6'>
            {sidebarLinks.map((link) => {
                const  isActive = pathname === link.route || (pathname.startsWith(link.route) && link.route !== '/instructor' && link.route !== '/instructor/course');
                return (
                    <Link href={link.route} key={link.label} className={
                        cn(
                            'flex gap-2 items-center p-3 rounded-lg justify-start', 
                            {'bg-violet-500': isActive, 'text-white': isActive}
                        )
                    }>
                    <Image src ={link.imgUrl} alt={link.label} width={16} height={16}/>
                        <p className='text-md font-semibold max-lg:hidden'>
                            {link.label}
                        </p>

                    </Link>
                )
            })}
        </div>

    </section>
  )
}

export default Sidebar