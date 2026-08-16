"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import ProjectDetail from "@/components/projects/ProjectDetail";

export type ProjectData = {
  id: string;
  number: string;
  title: string;
  repoName: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  achievement?: string;
};

const PROJECTS: ProjectData[] = [
  {
    id: "ModelFlow-AI-Model-Generation-Platform-Tech-Stack",
    number: "01",
    title: "ModelFlow-AI-Model-Generation-Platform-Tech-Stack",
    repoName: "ModelFlow-AI-Model-Generation-Platform-Tech-Stack",
    category: "AI / MACHINE LEARNING",
    shortDesc: "A no-code/low-code AI platform architecture for generating models.",
    longDesc: "ModelFlow aims to democratize AI by removing the barrier of entry for complex coding. This repository outlines the technical stack and architecture for generating machine-learning models using natural-language concepts.",
    tech: ["Python", "Flask", "TensorFlow", "PyTorch", "Hugging Face", "OpenCV"],
    features: [
      "Natural-language AI model conceptualization",
      "Model training tracking architecture",
      "Image, text and tabular data support",
    ],
    githubUrl: "https://github.com/nichol8s/ModelFlow-AI-Model-Generation-Platform-Tech-Stack",
  },
  {
    id: "E-Learning-Engagement-Detection-System",
    number: "02",
    title: "E-Learning-Engagement-Detection-System",
    repoName: "E-Learning-Engagement-Detection-System",
    category: "AI / COMPUTER VISION",
    achievement: "Best Mini Project Award",
    shortDesc: "A multimodal system for evaluating learner engagement.",
    longDesc: "An AI-based multimodal system designed for evaluating learner engagement in digital environments. It processes multiple behavioral signals to provide an accurate assessment of user focus and interaction.",
    tech: ["Python", "TensorFlow", "Machine Learning", "MongoDB", "Flask"],
    features: [
      "Multimodal signal processing",
      "Behavioral analysis heuristics",
      "Real-time evaluation metrics",
    ],
    githubUrl: "https://github.com/nichol8s/E-Learning-Engagement-Detection-System",
  },
  {
    id: "ECODRIVE",
    number: "03",
    title: "ECODRIVE",
    repoName: "ECODRIVE",
    category: "SUSTAINABILITY / MATLAB",
    achievement: "Runner-Up — Srishti 2025 National Level Technical Project Exhibition & Competition",
    shortDesc: "A sustainable driving application that tracks driving behavior.",
    longDesc: "EcoDrive is designed to minimize environmental impact by optimizing driving habits. It tracks trips and provides data-driven feedback on efficiency, fuel usage, and emissions.",
    tech: ["MATLAB", "GPS Tracking"],
    features: [
      "Tracks trip distance",
      "Estimates fuel consumption & CO₂ emissions",
      "Driving efficiency heuristics",
    ],
    githubUrl: "https://github.com/nichol8s/ECODRIVE",
  },
  {
    id: "Conditioning-System",
    number: "04",
    title: "Conditioning-System",
    repoName: "Conditioning-System",
    category: "SYSTEMS / WEB",
    shortDesc: "A functional interface and backend architecture for environmental conditioning.",
    longDesc: "A technical repository focused on the software architecture for managing and monitoring a conditioning system, implementing robust interfaces and data flows.",
    tech: ["React", "Next.js", "Node.js"],
    features: [
      "System monitoring interface",
      "State management",
      "Responsive web architecture",
    ],
    githubUrl: "https://github.com/nichol8s/Conditioning-System",
  },
  {
    id: "Blood-Bank",
    number: "05",
    title: "Blood-Bank",
    repoName: "Blood-Bank",
    category: "DATABASE / WEB",
    shortDesc: "A web application for managing blood donations and inventory.",
    longDesc: "A comprehensive database and web interface solution for tracking blood donations, managing donor information, and maintaining secure inventory records.",
    tech: ["SQL", "Web Technologies", "Database Management"],
    features: [
      "Donor registration system",
      "Inventory tracking",
      "Secure data management",
    ],
    githubUrl: "https://github.com/nichol8s/Blood-Bank",
  },
  {
    id: "nichol8s",
    number: "06",
    title: "nichol8s",
    repoName: "nichol8s",
    category: "PROFILE / ARCHITECTURE",
    shortDesc: "The personal branding and profile architecture repository.",
    longDesc: "The central repository acting as the GitHub profile README, orchestrating the public-facing developer persona, statistics, and organizational structure.",
    tech: ["Markdown", "GitHub Actions"],
    features: [
      "Profile architecture",
      "Dynamic statistics",
    ],
    githubUrl: "https://github.com/nichol8s/nichol8s",
  },
  {
    id: "Atlas-Financial-Intelligence",
    number: "07",
    title: "Atlas-Financial-Intelligence",
    repoName: "Atlas-Financial-Intelligence",
    category: "AI / FINANCE",
    shortDesc: "AI-powered financial intelligence platform.",
    longDesc: "Atlas is an AI-powered financial intelligence platform for market analysis, personal finance, document RAG, alerts, and conversational assistance.",
    tech: ["Python", "JavaScript", "HTML", "CSS"],
    features: [
      "Market analysis",
      "Document RAG",
      "Conversational assistance",
    ],
    githubUrl: "https://github.com/nichol8s/Atlas-Financial-Intelligence",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="projects" className="py-32 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase block mb-6">
            04 / Repositories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-space text-white leading-[1.1] tracking-tight">
            PROJECTS
          </h2>
        </motion.div>

        {/* Editorial Project List */}
        <div className="flex flex-col border-t border-white/10">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onHoverStart={() => setHoveredProject(project)}
              onHoverEnd={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer border-b border-white/10 py-8 md:py-12 relative flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-white/[0.02]"
            >
              
              <div className="flex items-baseline gap-6 md:gap-12 relative z-10 w-full md:w-auto">
                <span className="text-white/20 font-space text-2xl md:text-4xl font-bold group-hover:text-cyan-400 transition-colors">
                  {project.number}
                </span>
                <div className="flex flex-col">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold font-space text-white group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                  {project.achievement && (
                    <span className="text-cyan-400 font-space text-xs md:text-sm tracking-widest uppercase mt-2 md:mt-3 group-hover:translate-x-4 transition-transform duration-500 ease-out opacity-80">
                      {project.achievement}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-white/40 font-mono text-xs md:text-sm tracking-widest uppercase md:text-right relative z-10 group-hover:text-white transition-colors pl-12 md:pl-0">
                {project.category}
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Image Cursor Preview */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed pointer-events-none z-50 overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-charcoal-900 hidden md:flex items-center justify-center p-6"
            style={{
              left: mouseX,
              top: mouseY,
              width: "320px",
              height: "200px",
              x: "-50%",
              y: "-50%",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-violet-900/40 opacity-50" />
            
            {/* Visual representation of project */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2">
               <span className="font-mono text-cyan-400 text-xs tracking-widest uppercase">{hoveredProject.repoName}</span>
               <div className="w-12 h-1 bg-white/20 rounded-full my-2" />
               <span className="font-space text-white/60 text-sm">GitHub Repository</span>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectDetail 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
