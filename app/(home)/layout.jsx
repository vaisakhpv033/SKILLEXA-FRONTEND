
import Navbar from '@/components/Navbar'
import React from 'react'

const HomeLayout = ({children}) => {
  return (
    <main className='relative'>
        <Navbar />
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