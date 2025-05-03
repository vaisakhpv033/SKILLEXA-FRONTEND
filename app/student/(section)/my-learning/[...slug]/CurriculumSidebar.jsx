'use client';
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PlayCircle, FileText, XCircle } from 'lucide-react';

const getLessonIcon = (lesson) => {
  if (lesson.video_url) return <PlayCircle className="w-4 h-4 text-violet-500" />;
  if (lesson.content) return <FileText className="w-4 h-4 text-green-500" />;
  return <XCircle className="w-4 h-4 text-gray-400" />;
};

const CurriculumSidebar = ({ sections, activeLessonId, setActiveLesson }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white">Course Content</h2>
      <Accordion type="multiple" className="space-y-2">
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <AccordionItem key={section.id} value={`section-${section.id}`} className="border rounded-lg overflow-hidden shadow-sm">
              <AccordionTrigger className="px-4 py-2  font-semibold text-sm dark:text-white">
                {index + 1}. {section.title}
              </AccordionTrigger>
              <AccordionContent className=" px-4 py-2">
                {section.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const hasContent = lesson.video_url || lesson.content;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => hasContent && setActiveLesson({ ...lesson, sectionTitle: section.title })}
                        className={`flex items-center gap-2 text-sm px-2 py-2 rounded-md cursor-pointer transition ${
                          isActive ? 'bg-violet-200 dark:text-white dark:bg-violet-950 font-semibold' : 'hover:bg-violet-200 dark:hover:bg-violet-900/80'
                        }`}
                      >
                        {getLessonIcon(lesson)}
                        <span>{lesson.title}</span>
                      </div>
                    );
                  })}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default CurriculumSidebar;
