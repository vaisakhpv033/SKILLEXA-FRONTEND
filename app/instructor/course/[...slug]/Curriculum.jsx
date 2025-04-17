'use client'
import React from 'react'
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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, PenLine } from "lucide-react";
import { toast } from "sonner";
import { set } from 'lodash';
import { useSection } from '@/lib/client/instructorCurriculum';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';
import CourseContent from './courseContent';

const Curriculum = ({ course }) => {
    const {result, isLoading, isError,  mutate} = useSection(`/api/instructor/course/section/?id=${course.id}`);
    console.log("section",result);
    const [open, setOpen] = useState(false);

    // Form schema for Section creation
    const sectionSchema = z.object({
        title: z.string().min(5).max(50).regex(/^[a-zA-Z0-9\s]+$/, {
            message: "Category name must contain only letters, numbers and spaces",
        }),
    });

    const form = useForm({
        resolver: zodResolver(sectionSchema),
        defaultValues: {
            title: "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        setOpen(false);
    }

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent error="Something went wrong" />

    return (
        <>
        <div className='flex justify-end'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Section
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
                                Create Section
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
            <CourseContent contents={result} mutate={mutate} />

        </>
    )
}

export default Curriculum