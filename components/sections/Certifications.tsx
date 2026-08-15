"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Python Development Internship Certificate",
    issuer: "Ociuz Infotech",
    date: "August 2023",
  },
  {
    title: "Project Achievement: ModelFlow",
    issuer: "Viswajyothi College of Engineering & Technology",
    date: "2025",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6 md:px-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-space font-bold text-white mb-4">
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
          <div className="w-24 h-1 bg-violet-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-violet-500/50 transition-all group interactive cursor-default"
            >
              <div className="w-12 h-12 bg-space-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors border border-white/10 group-hover:border-violet-500">
                <Award className="text-violet-400 group-hover:text-cyan-400 transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-bold font-space text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {cert.title}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                Issued by <span className="text-white/90 font-medium">{cert.issuer}</span>
              </p>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                {cert.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
