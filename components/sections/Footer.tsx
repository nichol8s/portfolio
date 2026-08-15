"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 py-12 px-6 relative z-10 bg-charcoal-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-space font-bold tracking-widest text-white mb-1 uppercase">
            Nikhil Biju
          </span>
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-1">
            AI & Data Science Engineer
          </span>
          <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">
            AI / DATA / SOFTWARE
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/nichol8s" target="_blank" rel="noopener noreferrer" className="group text-white/40 hover:text-white transition-colors">
            <GithubIcon size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.linkedin.com/in/nikhilbiju08" target="_blank" rel="noopener noreferrer" className="group text-white/40 hover:text-white transition-colors">
            <LinkedinIcon size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="mailto:nikhil080305@gmail.com" 
            onClick={(e) => {
              e.preventDefault();
              window.open("https://mail.google.com/mail/?view=cm&fs=1&to=nikhil080305@gmail.com", "_blank", "noopener,noreferrer");
            }}
            className="group text-white/40 hover:text-white transition-colors"
          >
            <Mail size={20} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>

        <div className="text-white/30 text-xs font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Nikhil Biju
        </div>
      </div>
    </footer>
  );
}
