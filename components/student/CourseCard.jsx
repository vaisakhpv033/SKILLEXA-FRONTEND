import { CourseStatusLabel, CourseLevels, courseFallbackImgUrl } from "@/constants";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { BookOpen, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";


export function CourseCard({ course, handleRedirect }) {
    const { addItem  } = useCartStore();

    return (

        <Card className="overflow-hidden transition-all duration-75 hover:shadow-lg hover:cursor-pointer" onClick={() => handleRedirect(course.id, course.title)}>
            <motion.div
                whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.7 }}
            >
                <div className="relative aspect-video">
                    <Image src={course.thumbnail || courseFallbackImgUrl} alt={course.title} className="object-cover w-full h-full" width={320} height={180} />
                    <Badge variant="secondary" className="absolute top-4 left-4">
                        {course.topic_name}
                    </Badge>
                </div>
                <CardHeader className="pt-2">
                    <div className="space-y-1">
                        <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{course.subtitle}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{CourseLevels[course.level]}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-between w-full">
                        <p className="font-semibold">₹{parseFloat(course.price).toFixed(2)}</p>
                    </div>
                </CardFooter>
            </motion.div>
        </Card >

    )
}