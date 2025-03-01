import Navbar from '@/components/Navbar'
import { navbarLinks } from '@/constants'
import React from 'react'


const HomeLayout = ({children}) => {
  return (
    <main className='relative'>
        <Navbar navbarLinks={navbarLinks}/>
        <div className='flex'>
            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb-8 sm:px-14'>
                <div className='w-full'>
                    {children}
                </div>
            </section>

        </div>
    </main>
  )
}

export default HomeLayout