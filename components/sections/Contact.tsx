"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/interactions/MagneticButton";

// Small background particle component
const ParticleNet = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full blur-[2px]" 
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          x: [0, -15, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[60%] left-[20%] w-3 h-3 bg-cyan-400 rounded-full blur-[3px]" 
      />
      <motion.div 
        animate={{ 
          y: [0, -40, 0],
          x: [0, 25, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] right-[15%] w-1 h-1 bg-white rounded-full blur-[1px]" 
      />
      <motion.div 
        animate={{ 
          y: [0, 25, 0],
          x: [0, -20, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[20%] right-[25%] w-2 h-2 bg-white/50 rounded-full blur-[2px]" 
      />
      
      {/* Subtle connection lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M 10% 20% L 20% 60%" 
          stroke="rgba(34, 211, 238, 0.2)" 
          strokeWidth="1" 
          fill="none" 
          animate={{ strokeDasharray: ["0, 100", "100, 0"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 85% 30% L 75% 80%" 
          stroke="rgba(255, 255, 255, 0.1)" 
          strokeWidth="1" 
          fill="none"
          animate={{ strokeDasharray: ["0, 100", "100, 0"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 relative z-10 flex flex-col justify-center min-h-[80vh] border-t border-white/10 mt-32 bg-charcoal-900 overflow-hidden">
      
      <ParticleNet />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-24 w-full"
        >
          {/* Left: Text */}
          <div className="space-y-8 min-w-0">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase block"
            >
              05 / Contact
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-space font-bold text-white leading-[0.9] tracking-tight w-full"
              style={{ 
                fontSize: "clamp(4rem, 7vw, 8rem)",
                overflowWrap: "break-word",
                wordBreak: "normal"
              }}
            >
              LET'S<br />
              BUILD<br />
              THE<br />
              FUTURE.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 max-w-md leading-relaxed pt-4"
            >
              Have an idea, opportunity or project?<br />
              Let's talk.
            </motion.p>
          </div>

          {/* Right: Links */}
          <div className="flex flex-col justify-center space-y-8 lg:pt-16 min-w-0">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MagneticButton className="w-full">
                <a 
                  href="mailto:nikhil080305@gmail.com" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=nikhil080305@gmail.com", "_blank", "noopener,noreferrer");
                  }}
                  className="group flex items-center justify-between border-b border-white/20 pb-8 hover:border-cyan-400 transition-colors w-full"
                >
                  <div className="space-y-2 text-left min-w-0">
                    <span className="text-white/40 font-mono text-xs tracking-widest uppercase block">Email</span>
                    <span className="text-xl md:text-3xl font-space font-bold text-white group-hover:text-cyan-400 transition-colors truncate block">nikhil080305@gmail.com</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-charcoal-900 transition-all shrink-0 ml-4">
                    <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MagneticButton className="w-full">
                <a 
                  href="tel:+918891941923" 
                  className="group flex items-center justify-between border-b border-white/20 pb-8 hover:border-cyan-400 transition-colors w-full"
                >
                  <div className="space-y-2 text-left min-w-0">
                    <span className="text-white/40 font-mono text-xs tracking-widest uppercase block">Phone</span>
                    <span className="text-xl md:text-3xl font-space font-bold text-white group-hover:text-cyan-400 transition-colors truncate block">+91 8891941923</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-charcoal-900 transition-all shrink-0 ml-4">
                    <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <MagneticButton className="w-full">
                <a 
                  href="https://github.com/nichol8s" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/20 pb-8 hover:border-cyan-400 transition-colors w-full"
                >
                  <div className="space-y-2 text-left min-w-0">
                    <span className="text-white/40 font-mono text-xs tracking-widest uppercase block">Code</span>
                    <span className="text-xl md:text-3xl font-space font-bold text-white group-hover:text-cyan-400 transition-colors truncate block">GitHub</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-charcoal-900 transition-all shrink-0 ml-4">
                    <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <MagneticButton className="w-full">
                <a 
                  href="https://www.linkedin.com/in/nikhilbiju08" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/20 pb-8 hover:border-cyan-400 transition-colors w-full"
                >
                  <div className="space-y-2 text-left min-w-0">
                    <span className="text-white/40 font-mono text-xs tracking-widest uppercase block">Social</span>
                    <span className="text-xl md:text-3xl font-space font-bold text-white group-hover:text-cyan-400 transition-colors truncate block">LinkedIn</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-charcoal-900 transition-all shrink-0 ml-4">
                    <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <MagneticButton className="w-full">
                <a 
                  href="/resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/20 pb-8 hover:border-cyan-400 transition-colors w-full"
                >
                  <div className="space-y-2 text-left min-w-0">
                    <span className="text-white/40 font-mono text-xs tracking-widest uppercase block">Document</span>
                    <span className="text-xl md:text-3xl font-space font-bold text-white group-hover:text-cyan-400 transition-colors truncate block">Resume</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-charcoal-900 transition-all shrink-0 ml-4">
                    <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </a>
              </MagneticButton>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
