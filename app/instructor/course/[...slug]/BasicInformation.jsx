'use client';
import React, { useRef, useState, useReducer } from 'react'
import { courseFallbackImgUrl } from '@/constants'
import Image from 'next/image'
import { ImagePlus, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { toast } from 'sonner';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
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
import { deleteCourse } from '@/lib/client/deleteDraftCourse';
import { useRouter } from 'next/navigation';


const LANGUAGES = [
    { label: "English", value: "EN" },
    { label: "Spanish", value: "ES" },
    { label: "French", value: "FR" },
    { label: "Hindi", value: "HI" },
    { label: "Other", value: "OT" },
];

const LEVELS = [
    { label: "Beginner", value: "1" },
    { label: "Intermediate", value: "2" },
    { label: "Advanced", value: "3" },
    { label: "All Levels", value: "4" },
];


// Validation Schema
const basicInfoSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    subtitle: z.string().min(5, 'Subtitle must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    level: z.coerce.number().int().min(1).max(4, 'Please select a valid course level'),
});

// Reducer Function
const courseReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COURSE':
            return { ...state, ...action.payload };
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET':
            return action.payload;
        default:
            return state;
    }
};



const BasicInformation = ({ course: initialCourse, mutate }) => {
    const [state, dispatch] = useReducer(courseReducer, initialCourse);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (field, value) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });
        setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined })); 
    };

    const handleSave = async () => {
        const result = basicInfoSchema.safeParse(state);
        console.log("result", result)
        if (!result.success) {
            const formattedErrors = Object.fromEntries(
                Object.entries(result.error.format()).map(([key, value]) => [key, value._errors?.[0] || "invalid input"])
            );
            toast.error('Please fix the errors before saving');
            setErrors(formattedErrors);
            return
        }
        try {
            const response = await fetch(`/api/instructor/course/create?courseId=${state.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.error || 'Failed to save course');
            toast.success('Course updated successfully!');
            mutate();
        } catch (err) {
            toast.error(err.message || 'Update failed');
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Allowed file formats
        const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];

        // Check file type
        if (!allowedFormats.includes(file.type)) {
            toast.error("Invalid file format. Please upload a JPEG, PNG, GIF, or WEBP image.");
            return;
        }

        // check file size
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB.");
            return;
        }

        const localImageUrl = URL.createObjectURL(file);
        dispatch({ type: 'UPDATE_FIELD', field:"thumbnail", value: localImageUrl });

        setUploading(true);
        try {

            // step 1 get a signed url with user id
            const courseId = initialCourse.id;
            if (!courseId) throw new Error("Course ID not found");
            const signedUrlRes = await fetch(`/api/instructor/course/thumbnail?courseId=${courseId}`);
            const signedUrlData = await signedUrlRes.json();

            if (!signedUrlRes.ok) throw new Error(signedUrlData.error || "Failed to get signed URL");

            // step 2 upload image to cloudinary 
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signedUrlData.apiKey);
            formData.append("timestamp", signedUrlData.timestamp);
            formData.append("signature", signedUrlData.signature);
            formData.append("folder", signedUrlData.folder);

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${signedUrlData.cloudName}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const uploadData = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadData.error?.message || "upload failed")

            const imageUrl = uploadData.secure_url;


            // step 3 update profile picture url in the database
            const response = await fetch(`/api/instructor/course/create?courseId=${courseId}`, {
                method: "PATCH",
                body: JSON.stringify({ thumbnail: imageUrl }),
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            // update user profile
            //setUser((prevUser) => ({...prevUser, profile_picture: data.url}));

            toast.success("Profile picture updated successfully!");
        } catch (err) {
            toast.error(err.message || "Image upload failed")
        } finally {
            setUploading(false);
        }

        return true
    }
    console.log("details ", state)
    return (
        <div className="w-full">
            <div className='flex justify-start items-center gap-2'>
                <h3 className="text-2xl font-bold my-2">Basic Information</h3>
                {initialCourse.status === 0 && <DeleteCourse course={initialCourse} mutate={mutate}/>}
            </div>
            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='w-full lg:w-1/3'>
                    <div className='relative aspect-video overflow-hidden rounded-lg'>
                        <Image src={state.thumbnail || courseFallbackImgUrl} alt={state.title || 'thumbnail'} layout='fill' objectFit='cover' className='rounded-lg' />
                        <button onClick={() => fileInputRef.current.click()} disabled={uploading} className="absolute bottom-3 right-3 text-black py-2 px-2 bg-gray-300 rounded-full shadow-sm cursor-pointer transition-colors">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ImagePlus className='h-4 w-4' />

                                    </TooltipTrigger>
                                    <TooltipContent><span className="bg-slate-300 rounded-lg text-[12px] p-2">Change thumbnail</span></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                </div>

                {/* course title subtitle section */}
                <div className='flex-1 space-y-4'>
                    <div className="space-y-2">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter course title"
                                value={state.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                            {errors.title && <p className="text-red-500">{errors.title}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div>
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                                id="subtitle"
                                placeholder="Enter course title"
                                value={state.subtitle}
                                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                            />
                            {errors.subtitle && <p className="text-red-500">{errors.subtitle}</p>}
                        </div>
                    </div>
                </div>
            </div>


            {/* course description, language and level */}
            <div className="flex flex-col gap-4 mt-4">

                <div>
                    <Label htmlFor="description">Course Description</Label>
                    <Textarea
                        id="description"
                        rows={5}
                        placeholder="Enter course description"
                        value={state.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    {errors.description && <p className="text-red-500">{errors.description}</p>}
                </div>

                <div className="flex flex-col lg:flex-row justify-between gap-4">     
                    <div className="flex-1">
                    <Label htmlFor="description">Course Language</Label>
                        <Select
                            onValueChange={(val) => {
                                handleInputChange('language', val);
                            }}
                            defaultValue={state.language}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {LANGUAGES.map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.language && <p className="text-red-500">{errors.language}</p>}
                    </div>

                    <div className="flex-1">
                    <Label htmlFor="description">Course Level</Label>
                        <Select
                            onValueChange={(val) => {
                                handleInputChange('level', Number(val));
                            }}
                            value={String(state.level)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Course Level" />
                            </SelectTrigger>
                            <SelectContent>
                                {LEVELS.map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.level && <p className="text-red-500">{errors.level}</p>}
                    </div>
                </div>
            </div>
            <Button onClick={handleSave} className="mt-4">Save</Button>
        </div>
    )
}

export default BasicInformation





// Delete Course
export function DeleteCourse({course, mutate}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const onDelete = async () => {
        const response = await deleteCourse(course.id);

        if (response.status == true){
            toast.success( typeof response?.result === 'string' ? response.result : "lesson Deleted Successfully")
        } else {
            toast.error(typeof response?.result === 'string' ? response.result : "Something went wrong")
        }
        router.push('/instructor/course')
        setOpen(false);
        
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="px-3 py-2 h-8 text-xs text-red-500 hover:text-red-700">
                    <Trash2 className="h-3 w-3" /> Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the course <b className='font-extrabold text-md capitalize text-black'>{course.title}</b> and remove the data from our servers.
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
