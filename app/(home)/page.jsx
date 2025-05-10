import Hero from "@/components/Hero";


export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full">
      {/* Hero Section */}
        <Hero />

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
  );
}

