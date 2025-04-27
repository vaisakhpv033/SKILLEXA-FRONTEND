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
    PenLine, Trash2
} from "lucide-react";
import { deleteSection, updateSection } from '@/lib/client/instructorCurriculum';
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
  

// Edit Section Component
export function EditSection({section, mutate}) {
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
        form.reset();
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


// Delete Section Component
export function DeleteSection({section, mutate}) {
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        const response = await deleteSection(section.id);

        if (response.status == true){
            toast.success( typeof response?.result === 'string' ? response.result : "Section Deleted Successfully")
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
                        This action cannot be undone. This will permanently delete the course section <b>{section.title}</b> and remove the data from our servers.
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
