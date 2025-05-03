import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';
import { Badge } from '@/components/ui/badge';
import { getFeedbackByInterviewId } from '@/lib/actions/interview_action';

const InterviewCard = async ({interviewId, userId, role, type, techstack, createdAt, coverImage}) => {
    console.log(userId, interviewId)
    const feedback = userId && interviewId ? await getFeedbackByInterviewId({interviewId, userId}) : null;
    console.log("feedback",feedback);
    const formatedDate = dayjs(createdAt || Date.now()).format('MMM D, YYYY');
  return (
    <div className='card-border  w-full min-h-96 rounded-xl shadow-sm hover:shadow-md'>
        <div className='card-interview'>
            <div>
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                    <Badge variant='secondary' className='capitalize'>{type}</Badge>
                </div>

                <Image src={coverImage || getRandomInterviewCover()} alt="cover-image" width={50} height={50} className='rounded-full object-fit size-[90px]' />

                <h3 className='mt-5 capitalize'>
                    {role} Interview
                </h3>
                <div className='flex flex-row gap-5 mt-3'>
                    <div className='flex flex-row gap-2 '>
                        <Image src='/images/calendar.svg' alt="calendar" width={22} height={22} />
                        <p>{formatedDate}</p>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>
                        <Image src="/images/star.svg" alt="star" width={22} height={22} />
                        <p>{feedback?.totalScore || '---'}/100</p>
                    </div>

                </div>

                <p className='line-clamp-2 mt-5'>
                    {feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills"}
                </p>
            </div>

            <div className='flex flex-row justify-between'>
                <DisplayTechIcons techstack={techstack} />
                <Button className='btn-primary w-fit'>
                    <Link href={feedback ? `/student/interviews/interview/${interviewId}/feedback` : `/student/interviews/interview/${interviewId}`}>
                        {feedback ? 'Check Feedback' : 'Start Interview'}
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default InterviewCard