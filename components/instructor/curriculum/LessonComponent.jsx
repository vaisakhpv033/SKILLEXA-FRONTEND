'use client'
import React, { useState } from 'react';
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
    Plus, PenLine, Trash2
} from "lucide-react";
import { createLesson, updateLesson, deleteLesson } from '@/lib/client/instructorCurriculum';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"






// Add Lesson Component
export function AddLessons({section, mutate}) {
    const [open, setOpen] = useState(false);

    const LessonSchema = z.object({
        title: z.string().min(5).max(50).regex(/^[a-zA-Z0-9\s]+$/, {
            message: "Lesson name must contain only letters, numbers and spaces",
        }),
    });

    const form = useForm({
        resolver: zodResolver(LessonSchema),
        defaultValues: { title: "" },
    });

    const onSubmit = async (data) => {
        // Determine next order number dynamically
        const nextOrder = section.lessons && section.lessons.length > 0
        ? Math.max(...section.lessons.map((lesson) => lesson.order)) + 1
        : 1;

        console.log(data);
        let lessonData = {...data, order: nextOrder, section: section.id}
        console.log("data", lessonData);
        const response = await createLesson(lessonData);
        if (response.status == true) {
            toast.success("Created Lesson Successfully");
        } else {
            toast.error(response?.result || "Something went wrong")
        }
        mutate();
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) form.reset();
        }}>
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


// Edit Lesson Component
export function EditLesson({lesson, mutate}) {
    const [open, setOpen] = useState(false);

    const LessonSchema = z.object({
        title: z.string().min(5).max(50).regex(/^[a-zA-Z0-9\s]+$/, {
            message: "Lesson name must contain only letters, numbers and spaces",
        }),
    });

    const form = useForm({
        resolver: zodResolver(LessonSchema),
        defaultValues: { title: lesson.title },
    });

    const onSubmit = async (data) => {
        console.log("data", data);
        const response = await updateLesson(data, lesson.id);
        if (response.status == true) {
            toast.success("Lesson Updated Successfully");
        } else {
            toast.error(response?.result || "Something went wrong")
        }
        mutate();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) form.reset();
        }}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 h-8 text-xs">
                    <PenLine className="h-3 w-3" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Lesson {lesson.title}</DialogTitle>
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
                                        <Input value={lesson.title} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Update Lesson</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}




// Delete Lesson Component
export function DeleteLesson({lesson, mutate}) {
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        const response = await deleteLesson(lesson.id);

        if (response.status == true){
            toast.success( typeof response?.result === 'string' ? response.result : "lesson Deleted Successfully")
        } else {
            toast.error(typeof response?.result === 'string' ? response.result : "Something went wrong")
        }
        mutate();
        setOpen(false);
        
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="px-3 py-2 h-8 text-xs">
                    <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the lesson <b>{lesson.title}</b> and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild><Button onClick={onDelete} variant="destructive">Delete</Button></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )

}

