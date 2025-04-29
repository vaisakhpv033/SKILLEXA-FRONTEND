import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import InterviewCard from './InterviewCard'
import { getUserProfile } from '@/lib/server/getUserProfile'
import { getFeaturedInterviewByAdmin, getInterviewByUserId } from '@/lib/actions/interview_action'

const AiMockInterview = async () => {
    const user = await getUserProfile();

    // parallel data fetching
    const [userInterviews, featuredInterviews] = await Promise.all([
        await getInterviewByUserId(user?.data.id),
        await getFeaturedInterviewByAdmin()
    ]);

    const hasPastInterviews = userInterviews?.length > 0;

    const hasFeaturedInterviews = featuredInterviews?.length > 0;

  return (
    <div className='flex mx-auto max-w-7xl flex-col gap-12 my-12 px-16 max-sm:px-4 max-sm:my-8'>
        <section className='flex flex-row bg-gradient-to-b bg-white dark:blue-gradient-dark mt-2 rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4'>
            <div className='flex flex-col gap-6 max-w-lg'>
                <h2>Get Interview Ready with AI-Powered Practice & Feedback</h2>
                <p className='text-lg'>Practice on real interview questions & get instant feedback</p>

                <Button asChild>
                    <Link href="/student/interviews/interview">Start an Interview</Link>
                </Button>
            </div>
            <Image src='/images/robot.png' alt='robo-dude' width={400} height={400} className='max-sm:hidden' />
        </section>

        <section className='flex flex-col gap-6 mt-8'>
            <h2>Your Interviews</h2>
            <div className='interviews-section'>
                {hasPastInterviews ? (
                    userInterviews?.map((interview) => (
                        <InterviewCard key={interview.id}  {...interview}/>
                    ))
                    ) : (

                        <p>You haven&apos;t taken any interview yet</p>
                    )
                }
            </div>
        </section>

        <section className='flex flex-col gap-6 mt-8'>
            <h2>Take an Interview</h2>

            <div className='interviews-section'>
                {hasFeaturedInterviews ? (
                    featuredInterviews?.map((interview) => (
                        <InterviewCard key={interview.id}  {...interview}/>
                    ))
                    ) : (

                        <p>There are no interviews available</p>
                    )
                }
            </div>
        </section>
    </div>
  )
}

export default AiMockInterview