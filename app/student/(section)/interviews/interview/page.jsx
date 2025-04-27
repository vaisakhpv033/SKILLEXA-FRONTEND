import Agent from '@/components/student/interview/Agent'
import React from 'react'

const Interview = () => {
  return (
    <div className='flex mx-auto max-w-7xl flex-col gap-12 my-12 px-16 max-sm:px-4 max-sm:my-8'>
   
        <h3>Interview Generation</h3>
        <Agent userName="you" userId="23" type="Generate" />
        


    </div>
  )
}

export default Interview