'use client';
import React from 'react';
import { useCourse } from '@/app/instructor/course/useCourse';
import { CourseCard } from '@/components/student/CourseCard';
import { useRouter } from 'next/navigation';

const FeaturedCourses = () => {
    const {course, isLoading, isError,  mutate} = useCourse("/api/user/course");
    const courses = course?.results || [];
    const router = useRouter();
    const handleRedirect = (id, title) => {
      router.push(`/student/course/${id}/${title}`);
  }

  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4'>
        {courses.map((course) => (
            <CourseCard key={course.id} course={course} handleRedirect={handleRedirect}/>
        ))}
    </div>
  )
}

export default FeaturedCourses