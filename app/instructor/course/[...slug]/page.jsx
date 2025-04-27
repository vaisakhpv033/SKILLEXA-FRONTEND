'use client';
import React from 'react';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NotepadText, BookCheck, FileText, BarChart } from 'lucide-react';
import { useCourse } from '../useCourse';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';
import BasicInformation from './BasicInformation';
import Publish from './Publish';
import Curriculum from './Curriculum';

const page = () => {
    const [activeTab, setActiveTab] = React.useState("basic");
    const params = useParams();
    const {course, isLoading, isError,  mutate} = useCourse(`/api/instructor/course/create?id=${params.slug[0]}`);
    const decodedTitle = decodeURIComponent(params.slug[1]);



    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent error="Something went wrong" />

    return (
        <section className="w-full max-w-7xl lg:p-4 mx-auto max-lg:p-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/instructor/course">My-Courses</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{course?.title || decodedTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <hr className="mt-4" />
            <div className="pt-2">
                <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 gap-2">
                        <TabsTrigger value="basic" className="text-[12px] md:text-sm ">
                            <NotepadText className="hidden md:block md:w-4 md:h-4 mr-2"/>Basic Information
                        </TabsTrigger>

                        <TabsTrigger value="curriculum" className="text-[12px] md:text-sm ">
                            <FileText className="hidden md:block md:w-4 md:h-4 mr-2"/>Curriculum
                        </TabsTrigger>

                        <TabsTrigger value="publish" className="text-[12px] md:text-sm ">
                            <BookCheck className="hidden md:block md:w-4 md:h-4 mr-2"/>Publish
                        </TabsTrigger>

                        <TabsTrigger value="settings" className="text-[12px] md:text-sm ">
                            <BarChart className="hidden md:block md:w-4 md:h-4 mr-2"/>Analytics
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className='mt-4'>
                {activeTab === "basic" && (
                    <BasicInformation course={course}  mutate={mutate} />
                )}
                {activeTab === "publish" && (
                    <Publish course={course} mutate={mutate} />
                )}
                {activeTab === "curriculum" && (
                    <Curriculum course={course} />
                )}
            </div>

        </section>
    )
}

export default page