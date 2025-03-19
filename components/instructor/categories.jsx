'use client';
import React, { useState, useMemo, useEffect } from 'react'
import useSWR from 'swr';
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '../ui/select';
import { useFormContext } from "react-hook-form";
import { useCourseStore } from "@/store/useCourseStore";

const fetcher = async (url) => {
    const res = await fetch(url);


    if (!res.ok) {
        let errorMessage = `HTTP error! status: ${res.status}`
        try {
            const errorData = await res.json();
            if (errorData?.error) {
                errorMessage = errorData.error;
            }
        } catch (err) {
            console.error("error parsing response JSON", err);
        }
        throw new Error(errorMessage);
    }
    return res.json();
};

const Categories = () => {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/categories",
        fetcher
    );
    const { register, formState: { errors }, setValue } = useFormContext();
    const { courseData, updateCourseData } = useCourseStore();
    const [selectedCategory, setSelectedCategory] = useState(courseData.category || "");

    useEffect(() => {
        console.log("hello", courseData.topic);
        if (courseData.category) {
            setSelectedCategory(courseData.category);
        }
    }, [courseData.category]);

    const subcategories = useMemo(() => {
        if (!data) return [];
        return data.results.find((cat) => cat.id === Number(selectedCategory))?.subcategories || [];
    }, [selectedCategory, data]);


    if (isLoading) {
        return (
            <div className="animate-pulse text-muted-foreground">
                Loading ...
            </div>
        );
    }

    if (error) {
        return (
            <span className="text-red-500 bg-red-50 rounded-lg">
                Error: {error.message}
            </span>
        );
    }

    return (
        <>
            <div className='flex-1'>
                <Select
                    onValueChange={(val) => {
                        setSelectedCategory(val);
                        setValue("categories", val);
                        updateCourseData("categories", val);
                        setValue("topic", "");
                        updateCourseData("topic", "");
                    }}
                    defaultValue={courseData.categories}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {data?.results.map((category) => (
                            <SelectItem key={category?.id} value={category?.id}>{category?.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}
            </div>
            <div className='flex-1'>
                <Select
                    onValueChange={(val) => {
                        setValue("topic", val);
                        updateCourseData("topic", val);
                    }}
                    defaultValue={courseData.topic}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Sub Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {subcategories?.map((sub) => (
                            <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.topic && <p className="text-red-500">{errors.topic.message}</p>}
            </div>
        </>
    )
}

export default Categories