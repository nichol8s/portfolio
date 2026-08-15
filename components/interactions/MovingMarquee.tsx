"use client";

import { motion } from "framer-motion";

const MARQUEE_TEXT = "AI   /   DATA   /   MACHINE LEARNING   /   GENERATIVE AI   /   SOFTWARE   /   ";

export default function MovingMarquee() {
  return (
    <div className="w-full overflow-hidden bg-charcoal-900 border-y border-white/5 py-6 flex whitespace-nowrap">
      <motion.div
        className="text-white/20 font-mono text-sm tracking-widest uppercase flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        <span>{MARQUEE_TEXT.repeat(10)}</span>
      </motion.div>
    </div>
  );
}
