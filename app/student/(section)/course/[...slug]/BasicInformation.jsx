'use client';

import React from 'react';
import { courseFallbackImgUrl } from '@/constants';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, GraduationCap, Users, ListChecks, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

const BasicInformation = ({ course }) => {


    const getCourseDetails = (type) => course.details.filter(detail => detail.detail_type === type);

    return (
        <div className="max-w-7xl mx-auto p-6 shadow-sm rounded-lg">
            {/* Course Header */}
  

            {/* Course Description */}
            <div className="mt-2">
                <h2 className="text-2xl font-semibold mb-2">Course Description</h2>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            {/* Additional Course Details */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-2  rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg">Language</h3>
                    <p className="text-gray-600">{LANGUAGES[course.language] || "Not specified"}</p>
                </div>
                <div className="p-2 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg">Level</h3>
                    <p className="text-gray-600">{LEVELS[course.level] || "Not specified"}</p>
                </div>
            </div>

            {/* Course Outcomes, Requirements, Target Audience */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Outcomes */}
                <div className="p-4 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-violet-400" /> Course Outcomes
                    </h3>
                    <ul className="list-disc list-inside mt-2 text-gray-400">
                        {getCourseDetails("outcome").map(outcome => (
                            <li key={outcome.id}>{outcome.description}</li>
                        ))}
                    </ul>
                </div>
                
                {/* Course Requirements */}
                <div className="p-4  border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-violet-400" /> Course Requirements
                    </h3>
                    <ul className="list-disc list-inside text-gray-400 mt-2">
                        {getCourseDetails("requirement").map(requirement => (
                            <li key={requirement.id}>{requirement.description}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Target Audience */}
            <div className="mt-6 p-4  border rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-violet-600" /> Target Audience
                </h3>
                <ul className="list-disc list-inside text-gray-400 mt-2">
                    {getCourseDetails("target_audience").map(audience => (
                        <li key={audience.id}>{audience.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BasicInformation;
