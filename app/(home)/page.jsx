import Hero from "@/app/(home)/sections/Hero";
import Stats from "./sections/Stats";
import Footer from "./sections/Footer";
import BecameInstructor from "./sections/BecameInstructor";
import FAQ from "./sections/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full">
      {/* Hero Section */}
        <Hero />

      {/* Stats Section */}
        <Stats />

      {/* Course Section */}


      {/* Become an Instructor Section */}
      <BecameInstructor />

      {/* FAQ section */}
      <FAQ />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

