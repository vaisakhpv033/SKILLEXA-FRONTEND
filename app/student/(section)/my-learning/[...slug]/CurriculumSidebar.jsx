'use client';
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PlayCircle, FileText, XCircle } from 'lucide-react';

const getLessonIcon = (lesson) => {
  if (lesson.video_url) return <PlayCircle className="w-4 h-4 text-blue-500" />;
  if (lesson.content) return <FileText className="w-4 h-4 text-green-500" />;
  return <XCircle className="w-4 h-4 text-gray-400" />;
};

const CurriculumSidebar = ({ sections, activeLessonId, setActiveLesson }) => {
  return (
    <Accordion type="multiple" className="space-y-2">
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section, index) => (
          <AccordionItem key={section.id} value={`section-${section.id}`} className="border rounded">
            <AccordionTrigger className="bg-gray-100 px-4 py-2 hover:bg-gray-200 font-semibold">
              {index + 1}. {section.title}
            </AccordionTrigger>
            <AccordionContent className="bg-white dark:bg-gray-800 px-3 py-2">
              {section.lessons
                .sort((a, b) => a.order - b.order)
                .map((lesson) => {
                  const hasContent = lesson.video_url || lesson.content;
                  const isActive = lesson.id === activeLessonId;
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => hasContent && setActiveLesson({ ...lesson, sectionTitle: section.title })}
                      className={`cursor-pointer flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-gray-100 ${
                        isActive ? 'bg-gray-200 font-semibold' : ''
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
  );
};

export default CurriculumSidebar;
