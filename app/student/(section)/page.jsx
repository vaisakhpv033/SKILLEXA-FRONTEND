import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
    
          {/* Stats Section */}
          <section className="border-y bg-muted/50">
            <div className="container grid grid-cols-2 gap-4 px-4 py-12 md:grid-cols-4 sm:px-8">
              <div className="text-center">
                <div className="text-3xl font-bold">15M+</div>
                <div className="text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100K+</div>
                <div className="text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-muted-foreground">Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8/5</div>
                <div className="text-muted-foreground">Rating</div>
              </div>
            </div>
          </section>
    
        </div>
  )
}

export default StudentHome