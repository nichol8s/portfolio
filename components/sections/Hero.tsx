"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import MagneticButton from "@/components/interactions/MagneticButton";
import dynamic from "next/dynamic";

// Lazy load the heavy 3D WebGL scene to ensure instant initial page load
const NeuralNetwork3D = dynamic(() => import("@/components/hero/NeuralNetwork3D"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full min-h-[500px]" /> 
});

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Only trigger state update when crossing the 50px threshold, preventing continuous re-renders
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 50;
    if (isScrolled !== scrolled) setScrolled(isScrolled);
  });

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 pt-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Typography & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="space-y-8"
        >
          {/* Status Line */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-white/60 font-mono text-[10px] tracking-widest uppercase">
              Open to Opportunities
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-space text-white leading-[0.9] tracking-tight">
              NIKHIL<br/>BIJU
            </h1>
            
            <h2 className="text-xl md:text-2xl font-mono text-cyan-400 tracking-widest uppercase mt-4">
              AI & Data Science Engineer
            </h2>
          </div>
          
          <p className="text-white/60 max-w-md text-lg leading-relaxed text-balance">
            I build intelligent systems, AI-powered products and experimental software.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <MagneticButton>
              <a 
                href="#projects" 
                className="group relative px-8 py-4 bg-white text-charcoal-900 font-bold font-mono tracking-widest text-xs uppercase rounded-full overflow-hidden flex items-center justify-center gap-3 w-full sm:w-auto hover:scale-105 transition-transform"
              >
                <span className="relative z-10">Explore Work</span>
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            
            <MagneticButton>
              <a 
                href="#contact" 
                className="group px-8 py-4 bg-transparent border border-white/20 text-white font-mono tracking-widest text-xs uppercase rounded-full flex items-center justify-center gap-3 hover:bg-white/5 transition-all w-full sm:w-auto"
              >
                <span>Contact Me</span>
              </a>
            </MagneticButton>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/10 w-max">
            <MagneticButton>
              <a href="https://github.com/nichol8s" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors block">
                <GithubIcon size={20} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://www.linkedin.com/in/nikhilbiju08" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors block">
                <LinkedinIcon size={20} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a 
                href="mailto:nikhil080305@gmail.com" 
                onClick={(e) => {
                  e.preventDefault();
                  window.open("https://mail.google.com/mail/?view=cm&fs=1&to=nikhil080305@gmail.com", "_blank", "noopener,noreferrer");
                }}
                className="text-white/40 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Column: AI / Data Network Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="w-full"
        >
          {/* We pass the MotionValue directly to NeuralNetwork3D to avoid React renders */}
          <NeuralNetwork3D scrollProgress={scrollYProgress} />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ delay: scrolled ? 0 : 2, duration: 1 }}
        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
      >
        <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase mb-4">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
