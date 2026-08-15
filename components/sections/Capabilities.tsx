"use client";

import { motion } from "framer-motion";
import SkillUniverse3D from "./SkillUniverse3D";

export default function Capabilities() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Left Side: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[40%] space-y-6 text-center lg:text-left z-20"
        >
          <span className="text-cyan-400/80 font-mono text-sm tracking-[0.4em] uppercase block">
            02 / SKILLS
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-space text-white leading-[1.1] tracking-tight">
            MY<br />
            SKILL<br />
            UNIVERSE
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed pt-4">
            A constantly evolving toolkit across AI, data, software and intelligent systems.
          </p>
        </motion.div>

        {/* Right Side: 3D Universe */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-[60%] relative"
        >
          {/* Glass Environment Container */}
          <div className="relative w-full rounded-[40px] border border-white/5 bg-charcoal-900/30 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Soft edge glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-charcoal-900/0 to-charcoal-900/50 pointer-events-none" />

            {/* Render Custom 3D Orbital Component */}
            <SkillUniverse3D />

          </div>
        </motion.div>

      </div>
    </section>
  );
}
