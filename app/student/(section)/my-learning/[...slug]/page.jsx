'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSection } from '@/lib/client/instructorCurriculum';
import LessonPlayer from './LessonPlayer';
import CurriculumSidebar from './CurriculumSidebar';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Star, BarChart, PanelLeftClose, PanelLeftOpen, MessageSquare } from 'lucide-react';
import DiscussionSection from './DiscussionSection';

const EnrolledCourseView = () => {
  const [activeTab, setActiveTab] = useState("discussion");
  const [sidebarVisible, setSidebarVisible] = useState(true);
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
    <div className="flex min-h-screen">
      {/* Sidebar (toggleable) */}
      {sidebarVisible && (
        <aside className="hidden lg:block w-1/4  border-r sticky top-0 h-screen overflow-y-auto z-10 p-2">
          <CurriculumSidebar
            sections={sections}
            activeLessonId={activeLesson?.id}
            setActiveLesson={setActiveLesson}
          />
        </aside>
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col lg:p-8 transition-all duration-300 ${sidebarVisible ? 'lg:w-3/4' : 'lg:w-full'}`}>
        {/* Toggle Button (visible only on large screens) */}
        <div className="hidden lg:flex justify-start z-50 top-20 left-0 fixed ">
          <button
            className="flex items-center text-sm px-3 py-1 rounded-md transition"
            onClick={() => setSidebarVisible((prev) => !prev)}
          >
            {sidebarVisible ? <PanelLeftClose className="w-4 h-4 mr-1" /> : <PanelLeftOpen className="w-4 h-4 mr-1" />}
          </button>
        </div>

        {/* Lesson Player */}
        <div className=' max-w-5xl'>

        <LessonPlayer lesson={activeLesson} />
        </div>



        {/* Tabs */}
        <div className="mt-6">
          <Tabs defaultValue="discussion" onValueChange={setActiveTab}>
            <TabsList className="flex justify-start gap-3 flex-wrap">
              {!sidebarVisible && <TabsTrigger value="curriculum" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md">
                <FileText className="w-4 h-4" /> Curriculum
              </TabsTrigger>}
              <TabsTrigger value="discussion" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md ">
                <MessageSquare className="w-4 h-4" /> Discussions
              </TabsTrigger>
              <TabsTrigger value="instructor" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md ">
                <BarChart className="w-4 h-4" /> Instructor
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Dynamic Tab Content */}
          <div className="mt-6">
            {activeTab === 'curriculum' && !sidebarVisible && (
              <div className="text-gray-600">
                <CurriculumSidebar
                  sections={sections}
                  activeLessonId={activeLesson?.id}
                  setActiveLesson={setActiveLesson}
                />

              </div>
            )}
            {activeTab === 'discussion' && (
              <DiscussionSection />
            )}
            {activeTab === 'instructor' && <div className=" p-6 rounded-lg shadow">Instructor info will be displayed here.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseView;
