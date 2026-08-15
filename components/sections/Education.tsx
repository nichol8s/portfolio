"use client";

import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="education" className="relative z-10 py-32 px-6 md:px-12 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-5xl mx-auto space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center space-y-4"
        >
          <span className="text-white/30 font-mono text-sm tracking-[0.4em] uppercase block">
            03 / Education
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-space text-white">
            ACADEMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">JOURNEY</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pt-10 pb-20">
          {/* Main Vertical Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          
          {/* Glowing Animated Line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent origin-top"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Particle travelling down the line */}
          <motion.div
            className="absolute left-[24px] md:left-1/2 w-1.5 h-6 bg-cyan-300 rounded-full blur-[2px] -translate-x-1/2 z-10"
            animate={{ 
              top: ["0%", "100%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="space-y-20 md:space-y-32">
            
            {/* 01 - SCHOOL */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative flex flex-col md:flex-row items-start md:items-center w-full group"
            >
              {/* Desktop Empty Spacer Left */}
              <div className="hidden md:block md:w-1/2 pr-12 text-right">
                {/* Empty for school */}
              </div>

              {/* Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 mt-6 md:mt-0">
                <div className="w-3 h-3 rounded-full bg-charcoal-900 border-2 border-white/30 group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
              </div>

              {/* Card Right */}
              <div className="w-full pl-16 md:pl-12 md:w-1/2 mt-2 md:mt-0">
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-cyan-500/30 transition-all duration-500 group-hover:-translate-y-1">
                  <h3 className="text-lg md:text-xl font-bold font-space text-white/80 group-hover:text-white transition-colors mb-1">
                    School Education
                  </h3>
                  <p className="text-white/40 font-mono text-xs tracking-widest uppercase mb-4">
                    Kendriya Vidyalaya Puranattukara
                  </p>
                  <ul className="space-y-2">
                    {["Physics", "Chemistry", "Mathematics", "Biology"].map((subject, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                        <div className="w-1 h-1 rounded-full bg-cyan-500" />
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>


            {/* 02 - BACHELOR'S DEGREE */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative flex flex-col md:flex-row items-start md:items-center w-full group"
            >
              {/* Mobile Date (Hidden on Desktop) */}
              <div className="md:hidden pl-16 mb-2">
                <span className="font-mono text-cyan-400 text-xs tracking-widest uppercase block">2022 — 2026</span>
              </div>

              {/* Desktop Card Left */}
              <div className="w-full pl-16 md:pl-0 md:pr-12 md:w-1/2 text-left md:text-right mt-2 md:mt-0 order-3 md:order-1">
                <div className="p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 transition-all duration-500 group-hover:-translate-y-1">
                  <h3 className="text-xl md:text-2xl font-bold font-space text-white mb-2">
                    Bachelor of Technology
                  </h3>
                  <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">
                    AI & Data Science Engineering
                  </p>
                  <div className="h-px w-full bg-white/5 mb-4 group-hover:bg-cyan-500/20 transition-colors" />
                  <p className="text-white/50 text-sm font-mono uppercase tracking-wide">
                    Viswajyothi College of Engineering and Technology
                  </p>
                </div>
              </div>

              {/* Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 top-0 md:top-auto md:mt-0 order-1 md:order-2">
                <div className="w-4 h-4 rounded-full bg-charcoal-900 border-2 border-white/50 group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] z-10" />
                <div className="absolute w-8 h-8 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/20 transition-colors duration-500 blur-sm" />
              </div>

              {/* Desktop Date Right */}
              <div className="hidden md:block md:w-1/2 pl-12 text-left order-2 md:order-3">
                <span className="font-mono text-cyan-400/80 text-sm tracking-widest uppercase group-hover:text-cyan-400 transition-colors block">
                  2022 — 2026
                </span>
              </div>
            </motion.div>


            {/* 03 - CURRENT */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-col md:flex-row items-start md:items-center w-full group"
            >
              {/* Desktop Date Left */}
              <div className="hidden md:block md:w-1/2 pr-12 text-right">
                <div className="inline-flex items-center gap-3">
                  <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase block drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                    Present
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
                </div>
              </div>

              {/* Mobile Date (Hidden on Desktop) */}
              <div className="md:hidden pl-16 mb-2 flex items-center gap-3">
                <span className="font-mono text-cyan-400 text-xs tracking-widest uppercase block drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">Present</span>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]" />
              </div>

              {/* Node (Active) */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 mt-6 md:mt-0">
                <div className="w-5 h-5 rounded-full bg-charcoal-900 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 group-hover:scale-125 transition-transform duration-300" />
                <div className="absolute w-12 h-12 rounded-full bg-cyan-400/20 animate-ping group-hover:bg-cyan-400/30 transition-colors" />
              </div>

              {/* Card Right */}
              <div className="w-full pl-16 md:pl-12 md:w-1/2 mt-2 md:mt-0">
                <div className="relative p-6 md:p-8 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 hover:bg-cyan-900/20 hover:border-cyan-400 transition-all duration-500 group-hover:-translate-y-1 shadow-[0_0_30px_rgba(34,211,238,0.05)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden">
                  
                  {/* Subtle animated gradient background for the current active card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold font-space text-white mb-1">
                      Data Analytics Professional
                    </h3>
                    <p className="text-cyan-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-6">
                      with Generative AI Integration
                    </p>
                    
                    <div className="space-y-3">
                      <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
                        Currently developing skills in:
                      </p>
                      <ul className="space-y-2">
                        {["Data Analytics", "Generative AI", "AI-assisted data workflows"].map((skill, i) => (
                          <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                            <div className="w-1 h-1 rounded-full bg-cyan-500" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
