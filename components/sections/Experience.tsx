"use client";

import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center space-y-4"
        >
          <span className="text-white/30 font-mono text-sm tracking-[0.4em] uppercase block">
            04 / Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white">
            Currently <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Building.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
