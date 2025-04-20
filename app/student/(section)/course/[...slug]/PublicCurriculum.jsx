'use client';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useCurriculum } from '@/lib/client/publicCurriculum';
import { BookLock } from 'lucide-react';

const PublicCurriculum = ({ course }) => {
  const { result, isLoading, isError } = useCurriculum(`/api/user/curriculum/?id=${course.id}`);

  if (isLoading) return <div>Loading course curriculum...</div>;
  if (isError) return <div>Failed to load curriculum. Please try again later.</div>;
  if (!result || result.length === 0) return <div>No curriculum available yet.</div>;

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">Course Content</h2>
      <Accordion type="multiple" className="w-full space-y-2">
        {result
          .sort((a, b) => a.order - b.order)
          .map((section, idx) => (
            <AccordionItem key={section.id} value={`section-${section.id}`} className="border rounded-lg">
              <AccordionTrigger className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-t-lg text-left text-lg font-semibold">
                Section {idx + 1}: {section.title}
              </AccordionTrigger>
              <AccordionContent className="bg-white dark:bg-gray-900 px-6 py-4 space-y-3">
                {section.lessons.length > 0 ? (
                  section.lessons
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between text-base p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <span className="font-medium flex items-center gap-2">
                          <BookLock className='w-4 h-4 text-yellow-800' /> {lesson.title}
                        </span>
                        <span className="text-sm text-muted-foreground">Locked</span>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">No lessons added yet.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default PublicCurriculum;
