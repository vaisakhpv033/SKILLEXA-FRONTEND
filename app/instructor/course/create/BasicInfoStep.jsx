"use client";
import { useFormContext } from "react-hook-form";
import { useCourseStore } from "@/store/useCourseStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; 
import Categories from "@/components/instructor/categories";

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

export default function BasicInfoStep() {
    const { register, formState: { errors }, setValue } = useFormContext();
    const { courseData, updateCourseData } = useCourseStore();

    return (
        <div className="pt-4">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                        id="title"
                        placeholder="Enter course title"
                        defaultValue={courseData.title}
                        {...register("title")}
                        onChange={(e) => updateCourseData("title", e.target.value)}
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                    <Label htmlFor="subtitle">Course Subtitle</Label>
                    <Input
                        id="subtitle"
                        placeholder="Enter subtitle"
                        defaultValue={courseData.subtitle}
                        {...register("subtitle")}
                        onChange={(e) => updateCourseData("subtitle", e.target.value)}
                    />
                    {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
                </div>

                <div>
                    <Label htmlFor="description">Course Description</Label>
                    <Textarea
                        id="description"
                        rows={4}
                        placeholder="Enter course description"
                        defaultValue={courseData.description}
                        {...register("description")}
                        onChange={(e) => updateCourseData("description", e.target.value)}
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                        <Select
                            onValueChange={(val) => {
                                setValue("language", val);
                                updateCourseData("language", val);
                            }}
                            defaultValue={courseData.language}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>                            
                            <SelectContent>
                                {LANGUAGES.map(({label, value}) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.language && <p className="text-red-500">{errors.language.message}</p>}
                    </div>

                    <div className="flex-1">
                        <Select
                            onValueChange={(val) => {
                                setValue("level", val);
                                updateCourseData("level", val);
                            }}
                            defaultValue={courseData.level}
                        >                            
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Course Level" />
                            </SelectTrigger>
                            <SelectContent>
                                {LEVELS.map(({label, value}) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.level && <p className="text-red-500">{errors.level.message}</p>}
                    </div>
                </div>
                <div className="flex justify-between gap-4 min-h-14">
                <Categories courseData={courseData} updateCourseData = {updateCourseData}/>
                </div>
            </div>
        </div>
    );
}
