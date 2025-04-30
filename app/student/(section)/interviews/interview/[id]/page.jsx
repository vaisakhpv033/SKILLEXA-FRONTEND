import { getInterviewById } from '@/lib/actions/interview_action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'
import DisplayTechIcons from '../../DisplayTechIcons';
import Agent from '@/components/student/interview/Agent';
import { getUserProfile } from '@/lib/server/getUserProfile';

const page = async ({params}) => {
    const user = await getUserProfile();  
    if (!user.success){
    return <ErrorComponent error={user?.message || "Something went wrong"} />
    }
    const { id } = await params;

    const interview = await getInterviewById(id);
    console.log("hello",interview);

    if (!interview) redirect('/student/interviews')
  return (
    <>
        <div className='flex flex-row gap-4 justify-between pt-8 pb-4'>
            <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
                <div className='flex flex-row gap-4 items-center'>
                    <Image src={getRandomInterviewCover()} alt="cover-image" width={40} height={40} className='rounded-full object-cover size-[40px]' />
                    <h3 className='capitalize'>{interview.role}</h3> 
                </div>
                <DisplayTechIcons techstack={interview.techstack}  />
            </div>
            <p className='px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
        </div>
        <div className='flex mx-auto max-w-7xl flex-col gap-12 my-12 px-16 max-sm:px-4 max-sm:my-8'>

            <Agent userName={user.data?.first_name ||  user.data?.username} userId={user.data.id} interviewId={id} type="interview" profileUrl={user.data?.profile_picture} questions={interview.questions}/>
        </div>
    </>
  )
}

export default page