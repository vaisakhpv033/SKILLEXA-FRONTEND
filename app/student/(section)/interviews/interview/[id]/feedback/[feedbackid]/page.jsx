import { getFeedBackById, getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/interview_action';
import { getUserProfile } from '@/lib/server/getUserProfile';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/student/interview/StarRating';

const page = async ({ params }) => {
  const { id, feedbackid } = await params;

  const [interview, feedback] = await Promise.all([
    getInterviewById(id),
    getFeedBackById(feedbackid)
  ])
 
  if (!interview || !feedback) redirect('/student/interviews');


  return (
    <section className="flex flex-col gap-8 max-w-5xl mx-auto px-4 py-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold">
          Feedback on the <span className="capitalize">{interview.role}</span> Interview
        </h1>
        <p className="text-muted-foreground text-lg">
          Review your performance and improve for your next round.
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex max-sm:flex-col-reverse items-center gap-3 pb-3">
            <div className='flex flex-row items-center'>
                <Image className='max-sm:hidden' src="/images/star.svg" width={24} height={24} alt="star" />
                <p className="text-lg font-medium">
                Overall Score:{' '}
                <span className="text-primary font-semibold">{feedback?.totalScore}</span>/100
                </p>
            </div>
            <StarRating score={feedback.totalScore} />
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Image src="/images/calendar.svg" width={20} height={20} alt="calendar" />
            <span>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format('MMM D, YYYY h:mm A')
                : 'N/A'}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Final Assessment</h2>
            <p className="text-muted-foreground mt-1">{feedback?.finalAssessment}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Interview Score Breakdown</h3>
            <div className="grid gap-4">
              {feedback?.categoryScores?.map((category, index) => (
                <div key={index} className="rounded-md border p-4 hover:shadow-sm transition-all">
                  <h4 className="font-semibold">
                    {index + 1}. {category.name}{' '}
                    <span className="text-primary">({category.score}/100)</span>
                  </h4>
                  <p className="text-muted-foreground mt-1">{category.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Strengths</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {feedback.strengths.length > 0 ? (
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {feedback.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground italic">No strengths noted.</p>
                    )
                }
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Areas for Improvement</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {feedback?.areasForImprovement?.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Button variant="secondary" className="flex-1">
          <Link href={`/student/interviews/interview/${id}/feedback`} className="w-full text-center">
            Back to Feedbacks
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
