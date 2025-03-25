'use client';
import React from 'react';
import { useCourse } from '@/app/instructor/course/useCourse';
import { CourseCard } from '@/components/student/CourseCard';

const FeaturedCourses = () => {
    const {course, isLoading, isError,  mutate} = useCourse("/api/user/course");
    const courses = course?.results || [];
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4'>
        {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
        ))}
    </div>
  )
}

export default FeaturedCourses