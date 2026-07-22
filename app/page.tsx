import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#08090A] text-[#ECEDEE] overflow-x-hidden">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section (outside TracingBeam as specified) */}
      <Hero />

      {/* Main Content Sections wrapped in TracingBeam */}
      <TracingBeam className="px-4 sm:px-6">
        <div className="space-y-12 md:space-y-16 pt-8">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Certifications />
        </div>
      </TracingBeam>

      {/* Footer */}
      <Footer />
    </div>
  );
}
