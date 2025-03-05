import React from 'react'
import InstructorNavbar from '@/components/InstructorNavbar'
import Sidebar from '@/components/Sidebar'

const InstructorLayout = ({children}) => {
  return (
    <main className='relative'>
        <InstructorNavbar />
        <div className='flex'>
            <Sidebar/>

            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                <div className='w-full'>
                    {children}
                </div>
            </section>

        </div>
    </main>
  )
}

export default InstructorLayout