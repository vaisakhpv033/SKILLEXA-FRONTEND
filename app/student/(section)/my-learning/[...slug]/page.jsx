'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSection } from '@/lib/client/instructorCurriculum';
import LessonPlayer from './LessonPlayer';
import CurriculumSidebar from './CurriculumSidebar';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';

const EnrolledCourseView = () => {
  const params = useParams();
  const { result: sections, isLoading, isError } = useSection(`/api/student/course/curriculum/?id=${params.slug[0]}`);

  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    if (sections) {
      for (const section of sections) {
        const lesson = section.lessons.find((l) => l.video_url || l.content);
        if (lesson) {
          setActiveLesson({ ...lesson, sectionTitle: section.title });
          break;
        }
      }
    }
  }, [sections]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent error="Failed to load course content" />;
  if (!sections?.length) return <ErrorComponent error="No sections found" />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] min-h-screen">
      <div className="border-r bg-gray-50 dark:bg-gray-900 px-4 py-6 overflow-y-auto">
        <CurriculumSidebar
          sections={sections}
          activeLessonId={activeLesson?.id}
          setActiveLesson={setActiveLesson}
        />
      </div>
      <div className="p-6">
        <LessonPlayer lesson={activeLesson} />
      </div>
    </div>
  );
};

export default EnrolledCourseView;
