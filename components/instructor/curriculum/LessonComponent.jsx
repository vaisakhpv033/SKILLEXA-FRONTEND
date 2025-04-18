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


// Lesson Content updating and adding
export function LessonData({ lesson, mutate, course }) {
    const [showContentModal, setShowContentModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
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
                                    setShowContentModal(false);
                                    setShowVideoModal(true);
                                }}
                            >
                                <Video className="w-4 h-4" />
                                Add Video
                            </button>
                            <button
                                className="flex items-center gap-2 text-sm hover:bg-gray-100 p-2 rounded"
                                onClick={() => {
                                    setShowOptionsDialog(false);
                                    setShowVideoModal(false);
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
                            {lesson?.content && <Button variant='outline' onClick={() => setIsEdititng(true)} className='flex item-center justify-center'><PencilIcon className=' mr-1' /> Edit</Button>}
                            {lesson?.video_url && (
                                <Button variant='outline' 
                                    onClick={() => {
                                        setShowLessonModal(false);
                                        setShowVideoModal(true);
                                    }}
                                >
                                    Upload
                                </Button>   
                                )
                            }
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

            {/* Modal for adding Video content */}
            {showVideoModal && (
                <AddVideoContentModal
                    open={showVideoModal}
                    onClose={() => setShowVideoModal(false)}
                    lesson={lesson}
                    mutate={mutate}
                    course={course}
                />
            )}
        </div>
    );
}


export function AddVideoContentModal({ open, onClose, lesson, mutate, course }) {
    const [videoFile, setVideoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!videoFile) return;

        const allowedVideoFormats = ["video/mp4", "video/webm", "video/ogg"];
        const maxSize = 100 * 1024 * 1024; // 100MB
        const maxDuration = 600; // 10 minutes
        const minWidth = 640;   // 480p minimum
        const minHeight = 480;
        const maxWidth = 1920;  // 1080p maximum
        const maxHeight = 1080;

         // Check format
        if (!allowedVideoFormats.includes(videoFile.type)) {
            toast.error("Invalid video format. Please upload MP4, WebM, or Ogg.");
            return;
        }

        // Check size
        if (videoFile.size > maxSize) {
            toast.error("Video size must be less than 100MB.");
            return;
        }

        const videoEl = document.createElement("video");
        videoEl.preload = "metadata";

        videoEl.onloadedmetadata = () => {
            window.URL.revokeObjectURL(videoEl.src);
    
            const { duration, videoWidth, videoHeight } = videoEl;
    
            if (duration > maxDuration) {
                toast.error("Video is too long. Maximum allowed is 10 minutes.");
                return;
            }
    
            if (videoWidth > maxWidth || videoHeight > maxHeight) {
                toast.error("Video resolution too high. Max allowed is 1920x1080.");
                return;
            }
    
            if (videoWidth < minWidth || videoHeight < minHeight) {
                toast.error("Video resolution too low. Minimum allowed is 640x480 (480p).");
                return;
            }
    

        };
    
        videoEl.onerror = () => {
            toast.error("Unable to load video metadata.");
        };
    
        setIsUploading(true);

        try {

            // step 1 get a signed url with user id
            const signedUrlRes = await fetch(`/api/instructor/course/lesson/video?course=${course}&section=${lesson.section}&lesson=${lesson.id}`);

            const signedUrlData = await signedUrlRes.json();
      
            if (!signedUrlRes.ok) throw new Error(signedUrlData.error || "Failed to get signed URL");
      
            // step 2 upload image to cloudinary 
            const formData = new FormData();
            formData.append("file", videoFile);
            formData.append("api_key", signedUrlData.apiKey);
            formData.append("timestamp", signedUrlData.timestamp);
            formData.append("signature", signedUrlData.signature);
            formData.append("folder", signedUrlData.folder);
      
            const uploadRes = await fetch(
              `https://api.cloudinary.com/v1_1/${signedUrlData.cloudName}/video/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            
            const uploadData = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadData.error?.message || "upload failed")
      
            const imageUrl = uploadData.secure_url;
      
      
            // step 3 update profile picture url in the database
            console.log(imageUrl);
            let data = {"video_url": imageUrl}    
            const response = await updateLesson(data, lesson.id);

            if (response.status == true) {
                toast.success("Lesson Content added Successfully");
            } else {
                toast.error(response?.result || "Something went wrong")
            }
            mutate();

            onClose();
      
          } catch (err) {
            toast.error(err.message || "Image upload failed")
          }finally {
            setIsUploading(false);
          }
      
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Upload a Video for {lesson.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm"
                    />

                    {previewUrl && (
                        <video controls className="w-full rounded shadow">
                            <source src={previewUrl} type={videoFile?.type || "video/mp4"} />
                            Your browser does not support the video tag.
                        </video>
                    )}

                    <Button
                        onClick={handleUpload}
                        disabled={!videoFile || isUploading}
                        className="w-full"
                    >
                        {isUploading ? "Uploading..." : "Upload Video"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
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