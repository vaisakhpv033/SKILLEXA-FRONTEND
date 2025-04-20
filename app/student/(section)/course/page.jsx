'use client';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCourse } from '@/app/instructor/course/useCourse';
import { CourseCard } from '@/components/student/CourseCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LEVELS, CourseLevels } from '@/constants'; // Assuming you store them here
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedCourses = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const level = searchParams.get('level');

  // Build URL based on level
  const endpoint = level
    ? `/api/user/course/filter/?level=${level}`
    : `/api/user/course/filter/`;

  const { course, isLoading, isError, mutate } = useCourse(endpoint);
  const courses = Array.isArray(course) ? course : course?.results || [];

  const handleRedirect = (id, title) => {
    router.push(`/student/course/${id}/${title}`);
  };

  const handleLevelChange = (value) => {
    const newParams = new URLSearchParams(window.location.search);
    if (value === 'Remove') {
      newParams.delete('level');
    } else {
      newParams.set('level', value);
    }
    router.push(`/student/course/?${newParams.toString()}`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-2 md:px-4 lg:px-6 py-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Explore Courses</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by level:</span>
          <Select onValueChange={handleLevelChange} defaultValue={level || "ALL"}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CourseLevels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
                <SelectItem key={"Remove"} value={"Remove"}>Show All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 font-medium py-4">Failed to load courses.</div>
      ) : courses.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">No courses found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} handleRedirect={handleRedirect} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCourses;
