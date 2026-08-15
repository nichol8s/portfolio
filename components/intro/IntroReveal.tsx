"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function IntroReveal({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} 
        className="flex flex-col items-center text-center font-space leading-[0.9] md:leading-[0.95]"
      >
        <span className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight text-white">
          LET'S BUILD
        </span>
        <span className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          SOMETHING.
        </span>
      </motion.h1>
    </div>
  );
}
