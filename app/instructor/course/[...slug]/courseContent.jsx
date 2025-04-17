'use client'
import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Video, FileText, SquarePlus
} from "lucide-react";
import { DeleteSection, EditSection } from '@/components/instructor/curriculum/SectionComponents';
import { AddLessons, EditLesson, DeleteLesson } from '@/components/instructor/curriculum/LessonComponent';

const CourseContent = ({ contents, mutate }) => {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showLessonModal, setShowLessonModal] = useState(false);

    const handleViewLesson = (lesson) => {
        setSelectedLesson(lesson);
        setShowLessonModal(true);
    };

    return (
        <div className="w-full mt-6">
            <Accordion type="multiple" className="w-full space-y-1">
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
                                                <div className="flex items-start gap-3" onClick={() => handleViewLesson(lesson)}>
                                                    {lesson.video_url ? (
                                                        <Video className="text-violet-600 hover:text-violet-800 mt-1" />
                                                    ) : (
                                                        lesson.content ? <FileText className="text-violet-600 hover:text-violet-800 mt-1" /> : <SquarePlus className='text-blue-500 hover:text-blue-700' />
                                                    )}
                                                    <div>
                                                        <div className="font-semibold">{lesson.title}</div>
                                                        {lesson.video_duration && (
                                                            <div className="text-sm text-gray-500">
                                                                Duration: {lesson.video_duration} seconds
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
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

            {selectedLesson && (
                <LessonModal
                    open={showLessonModal}
                    onClose={() => setShowLessonModal(false)}
                    lesson={selectedLesson}
                />
            )}
        </div>
    );
};

export default CourseContent;



// Lesson Modal Component
function LessonModal({ open, onClose, lesson }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{lesson.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {lesson.video_url ? (
                        <video controls className="w-full rounded">
                            <source src={lesson.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
                            {lesson.content || "No content available for this lesson."}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
