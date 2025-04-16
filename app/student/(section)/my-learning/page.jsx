export const dynamic = 'force-dynamic';
import React from 'react'
import { getEnrolledCourses } from '@/lib/server/enrolledCourses'
import { EnrolledCourseCard } from '@/components/student/EnrolledCourseCard';

export default async function MyLearning() {
  const enrolledCourses = await getEnrolledCourses();
  console.log(enrolledCourses);
  if (!enrolledCourses || enrolledCourses.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-2 md:py-6 lg:py-8 sm:px-2 lg:px-4 gap-4">
        <h1 className='text-3xl lg:text-4xl font-bold max-sm:text-2xl'>
          No Enrolled Courses
        </h1>
      </div>
    )
  }
  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:py-6 lg:py-8 sm:px-2 lg:px-4 gap-4">
      <h1 className='text-3xl lg:text-4xl font-bold max-sm:text-2xl'>
        My Learning
      </h1>
        <p className='text-muted-foreground mt-2'>Your enrolled courses</p>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4'>
        {enrolledCourses.map((course) => (
          <EnrolledCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
