'use client'
import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { DeleteSection, EditSection } from '@/components/instructor/curriculum/SectionComponents';
import { AddLessons, EditLesson, DeleteLesson, LessonData } from '@/components/instructor/curriculum/LessonComponent';

const CourseContent = ({ contents, mutate }) => {

    return (
        <div className="w-full mt-6">
            
            <Accordion type="multiple" className="w-full space-y-1 overflow-y-visible">
                {contents
                    .sort((a, b) => a.order - b.order)
                    .map((section, idx) => (
                        <AccordionItem key={section.id} value={`section-${section.id}`} className="border rounded-md">
                            <div className="flex justify-between items-center px-4  bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                                <AccordionTrigger className="text-md font-medium flex-grow">Section {idx+1}: {section.title}</AccordionTrigger>
                                <div className="flex gap-2 ml-4">
                                    <EditSection section={section} mutate={mutate} />
                                    <DeleteSection section={section} mutate={mutate} />
                                    <AddLessons section={section} mutate={mutate} />
                                </div>
                            </div>
                            <AccordionContent className="px-4 py-2 bg-white dark:bg-transparent">
                                <div className="space-y-2">
                                    {section.lessons
                                        .sort((a, b) => a.order - b.order)
                                        .map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className="flex items-start justify-between p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition cursor-pointer"
                                            >
                                                <LessonData course={section.course} lesson={lesson} mutate={mutate} />
                                                <div className="flex gap-2">
                                                    <EditLesson lesson={lesson} mutate={mutate} />
                                                    <DeleteLesson lesson={lesson} mutate={mutate} />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
            </Accordion>


        </div>
    );
};

export default CourseContent;



