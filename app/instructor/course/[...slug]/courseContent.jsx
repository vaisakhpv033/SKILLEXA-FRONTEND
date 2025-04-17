'use client'
import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronRight, Video, FileText, ListChecks } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';


const CourseContent = ({ contents, mutate }) => {
    return (
        <div className="w-full mt-6">
            <Accordion type="multiple" className="w-full space-y-2">
                {contents
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                        <AccordionItem key={section.id} value={`section-${section.id}`} className="border rounded-md">
                            <div className='flex justify-between items-center px-4  bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>

                            <AccordionTrigger className="text-md font-medium flex-grow">
                                {section.title}
                            </AccordionTrigger>
                            <div>
                                <AddLessons />
                            </div>
                            </div>
                            <AccordionContent className="px-4 py-2 bg-white dark:bg-transparent">
                                <div className="space-y-2">
                                    {section.lessons
                                        .sort((a, b) => a.order - b.order)
                                        .map((lesson) => (
                                            <div key={lesson.id} className="flex items-start gap-3 p-2 border rounded-md">
                                                <Video className=" text-violet-600" />
                                                <div className="flex-1">
                                                    <div className='flex justify-between'>
                                                        <div className="font-semibold">{lesson.title}</div>
                                                    </div>
                                                    {lesson.video_duration && (
                                                        <div className="text-sm text-gray-500">
                                                            Duration: {lesson.video_duration} seconds
                                                        </div>
                                                    )}
                                                    {lesson.quizzes && lesson.quizzes.length > 0 && (
                                                        <div className="mt-2 space-y-1">
                                                            {lesson.quizzes
                                                                .sort((a, b) => a.order - b.order)
                                                                .map((quiz) => (
                                                                    <div key={quiz.id} className="flex items-start gap-2 p-2 border rounded-md bg-gray-50 dark:bg-transparent">
                                                                        <ListChecks className="mt-1 text-green-600" />
                                                                        <div className="flex-1">
                                                                            <div className="font-medium">{quiz.title}</div>
                                                                            <div className="text-sm text-gray-500">
                                                                                Min Pass Score: {quiz.min_pass_score}%
                                                                            </div>
                                                                            {quiz.questions && quiz.questions.length > 0 && (
                                                                                <div className="mt-1 text-sm text-gray-600">
                                                                                    {quiz.questions.length} Question{quiz.questions.length > 1 ? 's' : ''}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}
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



function AddLessons() {
    const [open, setOpen] = useState(false);


    // Form schema for Section creation
    const LessonSchema = z.object({
        title: z.string().min(5).max(50).regex(/^[a-zA-Z0-9\s]+$/, {
            message: "Category name must contain only letters, numbers and spaces",
        }),
    });

    const form = useForm({
        resolver: zodResolver(LessonSchema),
        defaultValues: {
            title: "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-3 py-3 h-8 text-[12px]">
                    <Plus className="mr-1 h-1 w-1" />
                    Add Lesson
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Section</DialogTitle>
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
                                        <Input placeholder="Enter section title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Create Lesson
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}