import StudentNavbar from './studentNavbar'
import { studentNavbarLinks } from '@/constants'
import React from 'react'
import { InitializeCart } from '@/components/student/InitializeCart';
import { getInitialCartItems } from '@/lib/server/cart';



export default async function StudentLayout({ children }) {
  const initialCartdata = await getInitialCartItems(); 

  return (
    <main className='relative'>
      <InitializeCart initialCart={initialCartdata} /> 
      <StudentNavbar navbarLinks={studentNavbarLinks} />
      <div className='flex'>
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb-8 sm:px-14'>
          <div className='w-full'>{children}</div>
        </section>
      </div>
    </main>
  );
}