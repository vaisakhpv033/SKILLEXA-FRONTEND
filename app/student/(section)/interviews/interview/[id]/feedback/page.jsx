import { getAllFeedbackByInterviewId, getInterviewById } from '@/lib/actions/interview_action';
import { getUserProfile } from '@/lib/server/getUserProfile';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/student/interview/StarRating';

const page = async ({ params }) => {
  const { id } = await params;
  const user = await getUserProfile();
  const interview = await getInterviewById(id);
  if (!interview) redirect('/student/interviews');

  const feedbackList = await getAllFeedbackByInterviewId({
    interviewId: id,
    userId: user.data.id,
  });

  const hasFeedback = feedbackList?.length > 0;

  return (
    <section className="flex flex-col gap-8 max-w-5xl mx-auto px-4 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold">
          Feedback History: <span className="capitalize">{interview.role}</span> Interview
        </h1>
        <p className="text-muted-foreground text-lg">
          Review your progress across all interview attempts.
        </p>
      </div>

      {hasFeedback ? (
        <div className="grid sm:grid-cols-1 gap-6">
          {feedbackList.map((feedback) => (
            <Card
              key={feedback.id}
              className="hover:shadow-lg transition-all duration-300 border border-border bg-background rounded-xl"
            >
              <CardHeader className="space-y-2 pb-0">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
                    Total Score: {feedback.totalScore}/100
                  </Badge>
                  <StarRating score={feedback.totalScore} />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Image src="/images/calendar.svg" alt="calendar" width={18} height={18} />
                    <span>{dayjs(feedback.createdAt).format('MMM D, YYYY h:mm A')}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-4">
                <Separator />
                <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed">
                  {feedback.finalAssessment}
                </p>

                <div className="flex justify-end">
                  <Button asChild variant='outline' className="mt-2">
                    <Link href={`/student/interviews/interview/${id}/feedback/${feedback.id}`}>
                      View Full Feedback
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg mt-8">
          No feedback entries found for this interview.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <Button variant="secondary" className="flex-1">
          <Link href="/student/interviews" className="w-full text-center">
            Back to Interviews
          </Link>
        </Button>
        <Button variant="default" className="flex-1">
          <Link href={`/student/interviews/interview/${id}`} className="w-full text-center">
            Retake Interview
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default page;
