"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "00 / HOME" },
  { id: "about", label: "01 / ABOUT" },
  { id: "capabilities", label: "02 / CAPABILITIES" },
  { id: "experience", label: "03 / EXPERIENCE" },
  { id: "education", label: "04 / EDUCATION" },
  { id: "projects", label: "05 / PROJECTS" },
  { id: "contact", label: "06 / CONTACT" }
];

export default function ScrollProgress() {
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
      { 
        // Trigger when a section takes up at least 30% of the viewport 
        // or crosses the middle of the screen
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0 
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-4">
      {SECTIONS.map((section) => (
        <a 
          key={section.id} 
          href={`#${section.id}`}
          className="group relative flex items-center justify-end w-12 h-6"
          aria-label={section.label}
        >
          {/* Label tooltip */}
          <span className="absolute right-8 text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity text-white/50 whitespace-nowrap pr-2">
            {section.label}
          </span>
          
          {/* Dot */}
          <div className={`rounded-full transition-all duration-300 ${
            activeSection === section.id 
              ? "w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
              : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50 group-hover:scale-150"
          }`} />
        </a>
      ))}
    </div>
  );
}
