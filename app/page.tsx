import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Footer from "@/components/sections/footer";
import Education from "@/components/sections/education";
import Navbar from "@/components/navbar";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white">
      <Navbar />
      <main className="relative z-10">
        <Hero/>
        <Projects/>
        <About/>
        <Education/>
        <Contact/>
      </main>
       <Footer />
    </div>
  );
}
