import React from 'react';
import AnimatedButton from '@/components/AnimatedContent';
import Image from 'next/image';

const BecameInstructor = () => {
    return (
        <section className="bg-gradient-to-br from-primary/10 to-background py-16 px-6 sm:px-12 lg:px-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Right Image */}
                <div className="sm:hidden flex justify-center">
                    <Image
                        src="/images/become-instructor.png"
                        alt="Become an Instructor"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover w-full h-auto"
                        loading="lazy"
                    />
                </div>

                {/* Left Content */}
                <div className="space-y-6">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Become an Instructor <br />
                        <span className="text-primary">Earn Money by Sharing Knowledge</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Join Skillexa's community of expert instructors and start earning by teaching what you love.
                        Create courses, share your expertise, and inspire learners worldwide.
                    </p>
                    <AnimatedButton
                        buttonText="Register as an Instructor"
                        redirectLink="/register/instructor"
                    />
                </div>

                {/* Right Image */}
                <div className="hidden sm:block  justify-center">
                    <Image
                        src="/images/become-instructor.png"
                        alt="Become an Instructor"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover w-full h-auto"
                        loading="lazy"
                    />
                </div>


            </div>
        </section>
    );
};

export default BecameInstructor;