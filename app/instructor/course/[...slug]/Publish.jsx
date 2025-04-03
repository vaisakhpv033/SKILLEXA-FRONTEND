import React from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const Publish = ({course, mutate}) => {
    const handleCourseReview = async (course) => {
       
        try {
            const courseId = course.id;
            if (!courseId) throw new Error("Course ID not found");

            const response = await fetch(`/api/instructor/course/create?courseId=${courseId}`, {
                method: "PATCH",
                body: JSON.stringify({ status: 1 }),
            })

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);


            await mutate();
            toast.success("Course Submitted successfully!");
        } catch (err) {
            toast.error(err.message || "Course Submitting failed")
        }

    }
    return (
        <div className="p-6 rounded-lg mx-auto">
            {course.status == 0 && (
                <>
                    <h2 className="text-2xl font-semibold text-gray-900">Course Submission</h2>
                    <p className="text-gray-600 mt-2">
                        Please ensure all fields are correctly filled before submitting your course for review. Once submitted, your course will be reviewed and published upon approval.
                    </p>
                    <Button onClick={() => handleCourseReview(course)} className="mt-4 w-full">
                        Submit for Review
                    </Button>
                </>
            )}
            {course.status == 1 && (
                <h2 className="text-2xl font-semibold text-gray-900">Course Submitted for verification</h2>
            )}
            {course.status == 2 && (
                <h2 className="text-2xl font-semibold text-gray-900">Course Published Successfully</h2>
            )}
        </div>
    )
}

export default Publish