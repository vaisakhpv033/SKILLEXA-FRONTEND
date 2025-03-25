import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import FeaturedCourses from './FeaturedCourses';

const StudentHome = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container px-4 py-16 sm:px-8 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Learn from experts.<br />
              <span className="text-primary">Advance your career.</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Access over 100,000 online courses from top instructors around the world. Learn at your own pace and earn certificates.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input placeholder="What do you want to learn?" className="max-w-sm" />
              <Button size="lg">Explore Courses</Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/home-image.avif"
              alt="Students learning"
              width={500}
              height={300}
              size="100vw"
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section>
        <section className="w-full max-w-[1450px] shadow-sm  lg:p-4 mx-auto max-lg:p-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold max-sm:text-2xl">
                Featured Courses
              </h1>
              <p className="text-muted-foreground mt-2">Explore our top courses</p>
            </div>
          </div>
        
          <FeaturedCourses  />
          

        </section>
      </section>

    </div>
  )
}

export default StudentHome