import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Footer from "@/components/sections/footer";
import Education from "@/components/sections/education";
import Navbar from "@/components/navbar";
import Contact from "@/components/sections/contact";
import { Suspense } from "react";
import ProjectsSkeleton from "@/components/sections/projects-skeleton";

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
