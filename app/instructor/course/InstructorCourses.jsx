'use client'
import { CourseCard } from "@/components/instructor/CourseCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CourseStatus } from "@/constants";
import { useState } from "react";
import { useCourse } from "./useCourse";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/ErrorComponent";


const courses = [
    {
      "id": 71,
      "title": "DataStructures And Algorithms",
      "subtitle": "Master Dsa with python.",
      "description": "This course is for mastering datastructure concepts using python",
      "thumbnail": null,
      "trailer": null,
      "language": "EN",
      "level": 2,
      "price": "499.00",
      "status": CourseStatus.DRAFT,
      "topic": 34,
      "topic_name": "Python",
      "created_at": "2025-03-19T04:26:03.874353Z",
      "updated_at": "2025-03-19T04:26:03.875075Z",
      "details": []
    },
    {
      "id": 34,
      "title": "Django for Beginners new",
      "subtitle": "Learn Django step by step",
      "description": "A complete Django course for beginners.",
      "thumbnail": null,
      "trailer": null,
      "language": "EN",
      "level": 1,
      "price": "999.00",
      "status": CourseStatus.PENDING,
      "topic": 1,
      "topic_name": "Programming",
      "created_at": "2025-03-17T15:06:49.503763Z",
      "updated_at": "2025-03-17T15:06:49.503775Z",
      "details": []
    }
  ];


export default function InstructorCourses() {
    const [activeTab, setActiveTab] = useState("all");
    const {course, isLoading, isError,  mutate} = useCourse("/api/instructor/course/create");
    const router = useRouter();
    const courses = course?.results || [];

    const filteredCourses =  activeTab === "all" 
        ? courses
        : courses.filter(course => {
            switch (activeTab){
                case "draft":
                    return course.status === CourseStatus.DRAFT;
                case "pending":
                    return course.status === CourseStatus.PENDING;
                case "published":
                    return course.status === CourseStatus.PUBLISHED;
                case "archived":
                    return course.status === CourseStatus.ARCHIVED;
                default:
                    return true;
            }
        });
    
    const handleRedirect = (id, title) => {
        router.push(`/instructor/course/${id}/${title}`);
    }

    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent error="Something went wrong" />

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-6">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 gap-2">
                        <TabsTrigger value="all" className="text-[12px] md:text-sm ">ALL ({courses.length})</TabsTrigger>

                        <TabsTrigger value="published" className="text-[12px] md:text-sm ">
                            PUBLISHED ({courses.filter(course => course.status === CourseStatus.PUBLISHED).length})
                        </TabsTrigger>

                        <TabsTrigger value="draft" className="text-[12px] md:text-sm ">
                            DRAFT ({courses.filter(course => course.status === CourseStatus.DRAFT).length})
                        </TabsTrigger>

                        <TabsTrigger value="pending" className="text-[12px] md:text-sm ">
                            PENDING ({courses.filter(course => course.status === CourseStatus.PENDING).length})
                        </TabsTrigger>
                    </TabsList>

                    {["all", "published", "draft", "pending"].map((tab) => (
                        <TabsContent key={tab} value={tab}>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                                {filteredCourses.map(course => (
                                    <CourseCard key={course.id} course={course} handleRedirect={handleRedirect}/>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

        </div>
    )
}
  


