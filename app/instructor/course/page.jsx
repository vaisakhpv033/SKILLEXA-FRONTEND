import React from 'react'
import InstructorCourses from './InstructorCourses'

const MyCourses = () => {
  return (
    <section className="w-full max-w-7xl lg:p-4 mx-auto max-lg:p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold max-sm:text-2xl">
            My Courses
          </h1>
          <p className="text-muted-foreground mt-2">Manage and track your course portfolio</p>
        </div>
      </div>
      <hr className="my-4" />
      <InstructorCourses />

    </section>
  )
}

export default MyCourses