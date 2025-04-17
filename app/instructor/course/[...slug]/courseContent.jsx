'use client'
import React, { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Plus, PenLine, Trash2, Video, FileText, ListChecks, Eye
} from "lucide-react";
import { updateSection } from '@/lib/client/instructorCurriculum';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
                    .map((section) => (
                        <AccordionItem key={section.id} value={`section-${section.id}`} className="border rounded-md">
                            <div className="flex justify-between items-center px-4  bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                                <AccordionTrigger className="text-md font-medium flex-grow">{section.title}</AccordionTrigger>
                                <div className="flex gap-2 ml-4">
                                    <EditSection section={section} mutate={mutate} />
                                    <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                    <AddLessons />
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
                                                        <Video className="text-violet-600 mt-1" />
                                                    ) : (
                                                        <FileText className="text-blue-600 mt-1" />
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
                                                    <Button size="icon" variant="ghost" className="h-8 px-3 py-2"><PenLine className="h-3 w-3" /></Button>
                                                    <Button size="icon" variant="destructive" className="h-8 px-3 py-2"><Trash2 className="h-3 w-3" /></Button>
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




// Edit Section Component
function EditSection({section, mutate}) {
    const [open, setOpen] = useState(false);

    const SectionSchema = z.object({
        title: z.string().min(5).max(50).regex(/^[a-zA-Z0-9\s]+$/, {
            message: "Section name must contain only letters, numbers and spaces",
        }),
    });

    const form = useForm({
        resolver: zodResolver(SectionSchema),
        defaultValues: { title: section.title },
    });

    const onSubmit = async (data) => {
        console.log("data", data);
        const response = await updateSection(data, section.id);
        if (response.status == true) {
            toast.success("Section Updated Successfully");
        } else {
            toast.error(response?.result || "Something went wrong")
        }
        mutate();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 h-8 text-xs">
                    <PenLine className="h-3 w-3" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Section {section.title}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Section Title</FormLabel>
                                    <FormControl>
                                        <Input value={section.title} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Update Section</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}




// Add Lesson Component
function AddLessons() {
    const [open, setOpen] = useState(false);

    const LessonSchema = z.object({
        title: z.string().min(5).max(50).regex(/^[a-zA-Z0-9\s]+$/, {
            message: "Category name must contain only letters, numbers and spaces",
        }),
    });

    const form = useForm({
        resolver: zodResolver(LessonSchema),
        defaultValues: { title: "" },
    });

    const onSubmit = async (data) => {
        console.log(data);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-3 py-2 h-8 text-xs">
                    <Plus className="mr-1 h-3 w-3" />
                    Lesson
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Lesson</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lesson Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter lesson title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Create Lesson</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

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
