"use client";

import { motion, Variants } from "framer-motion";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="relative z-10 min-h-[60vh] flex flex-col justify-center items-center text-center px-6 md:px-12 pt-32 pb-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants}>
          <span className="text-white/30 font-mono text-sm tracking-[0.4em] uppercase">
            01 / About
          </span>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-space text-white leading-[1.2] tracking-tight text-balance">
            AI & DATA SCIENCE<br/>ENGINEER
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-6">
          <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto text-balance">
            I engineer intelligent systems, machine learning architectures, and scalable data pipelines. My focus is on turning complex technical concepts into robust, interactive, and functional products.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
