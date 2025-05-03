import Agent from '@/components/student/interview/Agent'
import React from 'react'
import { getUserProfile } from '@/lib/server/getUserProfile'
import ErrorComponent from '@/components/ErrorComponent';



const Interview = async () => {
  const user = await getUserProfile();  
  if (!user.success){
    return <ErrorComponent error={user?.message || "Something went wrong"} />
  }
  console.log(user);
  return (
    <div className='flex mx-auto max-w-7xl flex-col gap-12 my-12 px-16 max-sm:px-4 max-sm:my-8'>
   
        <h3 className='text-3xl font-bold'>Interview Generation</h3>
        <Agent userName={user.data?.first_name ||  user.data?.username} userId={user.data.id} type="generate" profileUrl={user.data?.profile_picture} />
        


    </div>
  )
}

export default Interview