"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import IntroLoader from "@/components/intro/IntroLoader";
import GridNetwork from "@/components/background/GridNetwork";
import Hero from "@/components/sections/Hero";
import ScrollProgress from "@/components/interactions/ScrollProgress";
import About from "@/components/sections/About";
import MovingMarquee from "@/components/interactions/MovingMarquee";
import Capabilities from "@/components/sections/Capabilities";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative w-full min-h-screen selection:bg-cyan-500/30">
      <GridNetwork />
      <ScrollProgress />
      
      {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}

      <div
        className={`relative z-10 w-full transition-opacity duration-1000 ${
          introDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar show={introDone} />
        <Hero />
        <About />
        <MovingMarquee />
        <Capabilities />
        <MovingMarquee />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
