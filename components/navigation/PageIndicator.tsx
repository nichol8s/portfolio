"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = ["home", "about", "skills", "education", "projects", "contact"];

export default function PageIndicator() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section;
        return (
          <a
            key={section}
            href={`#${section}`}
            aria-label={`Scroll to ${section}`}
            className="relative group p-2 interactive"
          >
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-cyan-400 scale-150 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  : "bg-white/20 group-hover:bg-white/50"
              }`}
            />
            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#0a0a0c]/80 backdrop-blur-sm border border-white/10 rounded text-[10px] font-mono tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase">
              {section}
            </span>
          </a>
        );
      })}
    </div>
  );
}
