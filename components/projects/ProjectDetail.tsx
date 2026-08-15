"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { useEffect } from "react";
import { ProjectData } from "@/components/sections/Projects";

type ProjectDetailProps = {
  project: ProjectData | null;
  onClose: () => void;
};

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          className="fixed inset-0 z-[200] bg-charcoal-900 overflow-y-auto"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between p-6 md:p-12 mix-blend-difference pointer-events-none">
            <button
              onClick={onClose}
              className="group pointer-events-auto flex items-center gap-4 text-white hover:text-cyan-400 transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="font-mono text-sm tracking-widest uppercase hidden md:block">Back to Projects</span>
            </button>
          </div>

          {/* Hero Section */}
          <div className={`w-full min-h-[50vh] flex flex-col justify-end p-6 md:p-12 lg:p-24 relative -mt-[100px] bg-charcoal-900`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-charcoal-900 to-charcoal-900" />
            
            <div className="relative z-10 max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="text-white/60 font-mono text-xs tracking-widest uppercase">
                  PROJECT {project.number} — {project.category}
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-space text-white tracking-tight leading-[0.9]">
                  {project.title}
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-7xl mx-auto w-full p-6 md:p-12 lg:p-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-20">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-16">
              <div>
                <p className="text-2xl md:text-3xl text-white/90 leading-relaxed text-balance">
                  {project.shortDesc}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-6">DESCRIPTION</h3>
                <p className="text-lg text-white/60 leading-relaxed">
                  {project.longDesc}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-6">FEATURES</h3>
                <ul className="space-y-4">
                  {project.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start text-white/70 text-lg">
                      <span className="text-cyan-400 mr-4 mt-1">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Meta & Links */}
            <div className="lg:col-span-4 space-y-16">
              
              <div className="p-8 rounded-3xl border border-white/10 bg-charcoal-800/30 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-4">TECHNOLOGY</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 text-xs font-mono border border-white/10 text-white/80 rounded-full bg-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/10">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between w-full p-4 rounded-full border border-white/20 hover:border-cyan-400 transition-colors hover:bg-white/5">
                    <span className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-white">
                      <GithubIcon size={16} /> VIEW ON GITHUB
                    </span>
                    <ArrowUpRight size={16} className="text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
