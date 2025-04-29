import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({id, userId, role, type, techstack, createdAt, coverImage}) => {
    const feedback = null;
    const formatedDate = dayjs(createdAt || Date.now()).format('MMM D, YYYY');
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
        <div className='card-interview'>
            <div>
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                    <p className='badge-text'>{type}</p>
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
                <Button className='btn-primary'>
                    <Link href={feedback ? `/student/interviews/interview/${id}/feedback` : `/student/interviews/interview/${id}`}>
                        {feedback ? 'Check Feedback' : 'View Interview'}
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default InterviewCard