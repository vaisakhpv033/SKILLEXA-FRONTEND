import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";
import AnimatedButton from "./AnimatedButton";

const Hero = () => {
  return (
    <section className="container px-4 py-16 sm:px-8 lg:px-10 xl:px-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-4xl xl:text-6xl leading-tight">
            Upskill with <span className="text-primary">Expert-Led Courses</span> <br />
            & AI-Powered Mock Interviews.
          </h1>
          <p className="text-lg text-muted-foreground">
            Master web development, cybersecurity, data science, cloud computing, and more. 
            Practice with AI-driven mock interviews and get instant feedback to advance your career.
          </p>
            <AnimatedButton redirectLink="/login" buttonText="Start Learning" />
        </div>

        {/* Right Image */}
        <div className="hidden lg:block">
          <Image
            src="/images/home-image.avif"
            alt="Upskilling with Skillexa"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero; 