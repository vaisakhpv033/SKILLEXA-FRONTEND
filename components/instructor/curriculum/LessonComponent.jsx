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
    Plus, PenLine, Trash2, SquarePlus,
    FileText, Video,
    PencilIcon,
    Loader2
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

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
  




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
            <DialogContent >
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

export function LessonData({ lesson, mutate }) {
    const [showContentModal, setShowContentModal] = useState(false);
    const [showOptionsDialog, setShowOptionsDialog] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [isEditing, setIsEdititng] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const schema = z.object({
        content: z.string().min(10).max(2000),
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { content: lesson.content },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const response = await updateLesson(data, lesson.id);
        if (response.status == true) {
            toast.success("Lesson Content updated Successfully");
        } else {
            toast.error(response?.result || "Something went wrong")
        }
        mutate();
        setIsEdititng(false);
        setIsSubmitting(false);
    };

    const handleLessonClick = () => {
        if (lesson.video_url || lesson.content) {
            setShowLessonModal(true);
        }
    };

    return (
        <div className="relative flex items-start gap-3">
            {(lesson.video_url || lesson.content) ? (
                <div onClick={handleLessonClick} className="cursor-pointer">
                    {lesson.video_url ? (
                        <Video className="text-violet-600 hover:text-violet-800 mt-1" />
                    ) : (
                        <FileText className="text-violet-600 hover:text-violet-800 mt-1" />
                    )}
                </div>
            ) : (
                <Dialog open={showOptionsDialog} onOpenChange={setShowOptionsDialog}>
                    <DialogTrigger asChild>
                        <button className="text-blue-500 hover:text-blue-700" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className='animate-spin' /> : <SquarePlus />}
                        </button>
                    </DialogTrigger>
                    <DialogContent className="p-4">
                        <DialogTitle>Choose the Content Type</DialogTitle>
                        <div className="flex flex-col gap-2">
                            <button
                                className="flex items-center gap-2 text-sm hover:bg-gray-100 p-2 rounded"
                                onClick={() => {
                                    setShowOptionsDialog(false);
                                    console.log('Open add video modal logic here');
                                }}
                            >
                                <Video className="w-4 h-4" />
                                Add Video
                            </button>
                            <button
                                className="flex items-center gap-2 text-sm hover:bg-gray-100 p-2 rounded"
                                onClick={() => {
                                    setShowOptionsDialog(false);
                                    setShowContentModal(true);
                                }}
                            >
                                <FileText className="w-4 h-4" />
                                Add Text
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <div>
                <div className="font-semibold">{lesson.title}</div>
            </div>

            {/* Preview Modal for Existing Content */}
            <Dialog open={showLessonModal} onOpenChange={setShowLessonModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='flex items-center justify-start gap-4'>
                            <div>{lesson.title}</div>
                            <Button variant='outline' onClick={() => setIsEdititng(true)} className='flex item-center justify-center'><PencilIcon className=' mr-1' /> Edit</Button>
                        </DialogTitle>
                        
                    </DialogHeader>
                    {isEditing ? (
                        <div className='mt-4'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Text Content</FormLabel>
                                                <FormControl>
                                                    <Textarea rows={10} {...field} placeholder="Enter content..." />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">Update</Button>
                                </form>
                            </Form>
                        </div>
                    ):(

                        <div className="mt-4">
                            {lesson.video_url ? (
                                <video controls className="w-full rounded">
                                    <source src={lesson.video_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className=" text-md whitespace-pre-line  ">
                                    <ScrollArea className="h-[300px]">{lesson.content || "No content available for this lesson."}</ScrollArea>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Modal for Adding Text Content */}
            {showContentModal && (
                <AddTextContentModal
                    open={showContentModal}
                    onClose={() => setShowContentModal(false)}
                    lesson={lesson}
                    mutate={mutate}
                />
            )}
        </div>
    );
}






export function AddTextContentModal({ open, onClose, lesson, mutate }) {

    const schema = z.object({
        content: z.string().min(10).max(2000),
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { content: "" },
    });

    const onSubmit = async (data) => {

        const response = await updateLesson(data, lesson.id);
        if (response.status == true) {
            toast.success("Lesson Content added Successfully");
        } else {
            toast.error(response?.result || "Something went wrong")
        }
        mutate();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Text to {lesson.title}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Text Content</FormLabel>
                                    <FormControl>
                                        <Textarea rows={10} {...field} placeholder="Enter content..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Update</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}