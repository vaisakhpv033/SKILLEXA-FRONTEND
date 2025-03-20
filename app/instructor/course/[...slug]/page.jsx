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
} from "@/components/ui/breadcrumb"
import { useParams } from 'next/navigation';
import { TabsDemo } from './courseTabs';


const page = () => {
    const params = useParams();
    const decodedTitle = decodeURIComponent(params.slug[1]);
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
                        <BreadcrumbPage>{decodedTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <hr className="mt-4" />
            <div className="flex items-center justify-between">
                <div>
                </div>
            </div>

        </section>
    )
}

export default page