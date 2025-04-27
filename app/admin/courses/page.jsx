import React from 'react'
import CoursesList from './coursesList'

const Courses = () => {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className='flex flex-col'>
                <h1 className="text-2xl font-bold">Course Management</h1>
                <p className="text-muted-foreground mt-1">View and Manage Courses</p>
            </div>
            <CoursesList />
        </div>
    )
}

export default Courses