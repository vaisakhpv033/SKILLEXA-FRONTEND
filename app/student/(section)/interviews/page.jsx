import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import InterviewCard from './InterviewCard';
import { getUserProfile } from '@/lib/server/getUserProfile';
import { getFeaturedInterviewByAdmin, getInterviewByUserId } from '@/lib/actions/interview_action';
import { Card } from '@/components/ui/card';

const AiMockInterview = async () => {
  const user = await getUserProfile();

  // parallel data fetching
  const [userInterviews, featuredInterviews] = await Promise.all([
    getInterviewByUserId(user?.data.id),
    getFeaturedInterviewByAdmin(),
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasFeaturedInterviews = featuredInterviews?.length > 0;

  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-12 px-4 sm:px-6 lg:px-8 py-12">
      <Card className="p-8 flex flex-col md:flex-row justify-between items-center bg-background shadow-sm rounded-xl bg-gradient-to-b bg-white dark:blue-gradient-dark dark:border dark:border-border">
        <div className="flex flex-col gap-4 max-w-xl">
          <h2 className="text-3xl font-bold">Get Interview Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-muted-foreground text-lg">
            Practice on real interview questions & get instant feedback
          </p>
          <Button asChild className="w-fit">
            <Link href="/student/interviews/interview">Create an Interview</Link>
          </Button>
        </div>
        <Image
          src="/images/robot.png"
          alt="robot"
          width={350}
          height={350}
          className="hidden md:block"
        />
      </Card>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Your Interviews</h2>
        <div className="grid lg:grid-cols-2  xl:grid-cols-3 gap-6">
          {hasPastInterviews ? (
            userInterviews.map((interview) => (
                <InterviewCard
                key={interview.id}
                userId={user?.data.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                coverImage={interview.coverImage}
              />
            ))
          ) : (
            <p className="text-muted-foreground">You haven't taken any interviews yet.</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Featured Interviews</h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {hasFeaturedInterviews ? (
            featuredInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              userId={user?.data.id}
              interviewId={interview.id}
              role={interview.role}
              type={interview.type}
              techstack={interview.techstack}
              createdAt={interview.createdAt}
              coverImage={interview.coverImage}
            />
            ))
          ) : (
            <p className="text-muted-foreground">There are no interviews available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AiMockInterview;
