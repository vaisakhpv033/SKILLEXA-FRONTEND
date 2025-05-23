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
import { NotepadText, BookCheck, FileText, BarChart, Star } from 'lucide-react';
import { useCourse } from '@/app/instructor/course/useCourse';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';
import BasicInformation from './BasicInformation';

import { useCartStore } from '@/store/useCartStore';
import { courseFallbackImgUrl } from '@/constants';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, GraduationCap, Users, ListChecks, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PublicCurriculum from './PublicCurriculum';
import { useWishlistStore } from '@/store/useWishlistStore';


const LANGUAGES = {
    EN: "English",
    ES: "Spanish",
    FR: "French",
    HI: "Hindi",
    OT: "Other",
};

const LEVELS = {
    "1": "Beginner",
    "2": "Intermediate",
    "3": "Advanced",
    "4": "All Levels",
};

const page = () => {
    const [activeTab, setActiveTab] = React.useState("basic");
    const params = useParams();
    const {course, isLoading, isError,  mutate} = useCourse(`/api/instructor/course/create?id=${params.slug[0]}`);
    const decodedTitle = decodeURIComponent(params.slug[1]);

    const { addItem: addToCart, removeItem: removeFromCart, items: cartItems } = useCartStore();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, items } = useWishlistStore();



    const isInCart = React.useMemo(() => {
        return cartItems.some((item) => item.course === Number(params.slug[0]));
      }, [cartItems, params]);

    const handleAddItem = async (id) => {
    if (isInCart) {
        toast.info("Already in cart");
        return;
    }
    
    const response = await addToCart(id);
    if (response.status === true) {
        toast.success("Added to cart successfully");
    } else {
        toast.error(response?.message || "Something went wrong");
    }
    };
      
      

    const isInWishlist = React.useMemo(() => {
        return items.some((item) => item.course === Number(params.slug[0]));
    }, [items, params]);
    
    const handleToggleWishlist = async (id) => {
        const numericId = Number(id);
        const existingItem = items.find((item) => item.course === numericId);
      
        if (existingItem) {
          await removeFromWishlist(existingItem.id); 
          toast.success("Removed from wishlist");
        } else {
          const response = await addToWishlist(numericId);
          if (response.status === true) {
            toast.success("Added to wishlist");
          } else {
            toast.error(response?.message || "Something went wrong");
          }
        }
      };


    if (isLoading) return <Loading />
    if (isError) return <ErrorComponent error="Something went wrong" />

    return (
        <section className="w-full max-w-7xl lg:p-4 mx-auto max-lg:p-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/student">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{course?.title || decodedTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <hr className="mt-4" />
            <div className="flex flex-col md:flex-row gap-6 py-4">
                {/* Thumbnail Image */}
                <div className="w-full md:w-2/5">
                    <div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
                        <Image 
                            src={course.thumbnail || courseFallbackImgUrl}
                            alt={course.title || 'Course Thumbnail'}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Course Info */}
                <div className="flex-1 space-y-4">
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                    <p className="text-gray-600">{course.subtitle}</p>

                    
                    {/* Course Tags */}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-gray-100 text-gray-700">
                            <Globe className="w-4 h-4 inline-block mr-1" />
                            {LANGUAGES[course.language] || "Unknown Language"}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100 text-gray-700">
                            <GraduationCap className="w-4 h-4 inline-block mr-1" />
                            {LEVELS[course.level] || "Unknown Level"}
                        </Badge>
                        <Badge variant="outline" className="bg-violet-100 text-violet-700">
                            <CheckCircle className="w-4 h-4 inline-block mr-1" />
                            {course.topic_name}
                        </Badge>
                    </div>

                    <p className="font-bold">{course.instructor_name}</p>
                    <div className='flex max-sm:flex-col gap-4 items-center justify-start'>
                        <p className="font-semibold">₹{course.price}</p>
                        <Button
                            onClick={() => handleAddItem(course.id)}
                            variant={isInCart ? 'outline' : 'default'}
                            disabled={isInCart}
                            >
                                <ShoppingCart className="mr-2" />
                                {isInCart ? "In Cart" : "Add to Cart"}
                        </Button>

                        <Button onClick={() => handleToggleWishlist(course.id)} variant='ghost' className='rounded-lg'>
                            <Heart className={isInWishlist ? "text-red-500 fill-red-500" : ""} />
                        </Button>

                    </div>
                </div>
            </div>

            
            <div className="pt-2">
                <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 gap-2 bg-none">
                        <TabsTrigger value="basic" className="text-[12px] md:text-sm ">
                            <NotepadText className="hidden md:block md:w-4 md:h-4 mr-2"/>Basic Information
                        </TabsTrigger>

                        <TabsTrigger value="curriculum" className="text-[12px] md:text-sm ">
                            <FileText className="hidden md:block md:w-4 md:h-4 mr-2"/>Curriculum
                        </TabsTrigger>

                        <TabsTrigger value="publish" className="text-[12px] md:text-sm ">
                            <Star className="hidden md:block md:w-4 md:h-4 mr-2"/>Ratings
                        </TabsTrigger>

                        <TabsTrigger value="settings" className="text-[12px] md:text-sm ">
                            <BarChart className="hidden md:block md:w-4 md:h-4 mr-2"/>Instructor
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className='mt-4'>
                {activeTab === "basic" && (
                    <BasicInformation course={course}  mutate={mutate} />
                )}
                {activeTab === 'curriculum' && (
                    <PublicCurriculum course={course} />
                )}
            </div>

        </section>
    )
}

export default page