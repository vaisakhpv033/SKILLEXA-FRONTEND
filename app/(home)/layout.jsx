import Navbar from '@/components/Navbar'
import { navbarLinks } from '@/constants'
import React from 'react'


const HomeLayout = ({children}) => {
  return (
    <main className='relative'>
        <Navbar navbarLinks={navbarLinks}/>
        <div className='flex'>
            <section className='flex min-h-screen flex-1 flex-col'>
                <div className='w-full'>
                    {children}
                </div>
            </section>

        </div>
    </main>
  )
}

export default HomeLayout