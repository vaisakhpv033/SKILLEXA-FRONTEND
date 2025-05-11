import React from "react";
import { Users, BookOpen, UserCheck, Star } from "lucide-react";

const Stats = () => {
    return (
        <section className="hidden md:block border-y bg-muted/50 dark:bg-gray-900 ">
            <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 md:grid-cols-4 sm:px-6">
                {/* Students */}
                <div className="flex flex-col items-center text-center space-y-3 group">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full transition-transform duration-300 group-hover:scale-110">
                        <Users className="w-6 h-6" />
                    </div>
                    <div className="text-4xl font-extrabold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        15M+
                    </div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        Students
                    </div>
                </div>

                {/* Courses */}
                <div className="flex flex-col items-center text-center space-y-3 group">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full transition-transform duration-300 group-hover:scale-110">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="text-4xl font-extrabold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        100K+
                    </div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        Courses
                    </div>
                </div>

                {/* Instructors */}
                <div className="flex flex-col items-center text-center space-y-3 group">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full transition-transform duration-300 group-hover:scale-110">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <div className="text-4xl font-extrabold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        50K+
                    </div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        Instructors
                    </div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-center text-center space-y-3 group">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full transition-transform duration-300 group-hover:scale-110">
                        <Star className="w-6 h-6" />
                    </div>
                    <div className="text-4xl font-extrabold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        4.8/5
                    </div>
                    <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        Rating
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;