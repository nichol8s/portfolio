"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroReveal from "./IntroReveal";

const GREETINGS = [
  { text: "HELLO", lang: "English" },
  { text: "HOLA", lang: "Spanish" },
  { text: "BONJOUR", lang: "French" },
  { text: "HALLO", lang: "German" },
  { text: "CIAO", lang: "Italian" },
  { text: "NAMASTE", lang: "Hindi" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "你好", lang: "Chinese" },
  { text: "مرحبا", lang: "Arabic" },
];

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [introState, setIntroState] = useState<"loading" | "reveal" | "done">("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    };
  }, []);

  // Loading Logic
  useEffect(() => {
    if (introState !== "loading") return;

    const duration = 2500; // 2.5 seconds total
    
    // Greetings cycle
    const greetingInterval = duration / GREETINGS.length;
    const greetingTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev < GREETINGS.length - 1 ? prev + 1 : prev));
    }, greetingInterval);

    // Progress bar
    const progressInterval = 20;
    const steps = duration / progressInterval;
    let currentStep = 0;
    const progressTimer = setInterval(() => {
      currentStep++;
      const progressValue = Math.min(
        100,
        Math.floor(100 * (1 - Math.pow(1 - currentStep / steps, 3)))
      );
      setProgress(progressValue);

      if (currentStep >= steps) {
        clearInterval(progressTimer);
        clearInterval(greetingTimer);
        setTimeout(() => setIntroState("reveal"), 300); // Small pause at 100%
      }
    }, progressInterval);

    return () => {
      clearInterval(greetingTimer);
      clearInterval(progressTimer);
    };
  }, [introState]);

  const handleRevealComplete = () => {
    setIntroState("done");
    setTimeout(() => {
      onComplete();
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }, 500);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {introState !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {introState === "loading" && (
              <motion.div
                key="loading"
                className="w-full max-w-lg px-6 flex flex-col items-center justify-center space-y-12"
                exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {/* Greeting */}
                <div className="flex flex-col items-center justify-center space-y-4 h-32">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={`text-${currentIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="text-3xl md:text-5xl font-light tracking-[0.4em] text-white font-space ml-[0.4em]"
                    >
                      {GREETINGS[currentIndex].text}
                    </motion.h1>
                  </AnimatePresence>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`lang-${currentIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-white/40 text-[10px] md:text-xs tracking-[0.3em] uppercase font-mono"
                    >
                      [ {GREETINGS[currentIndex].lang} ]
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="w-full flex flex-col items-center space-y-6">
                  <div className="text-white/50 text-[10px] md:text-xs tracking-[0.4em] uppercase font-mono ml-[0.4em]">
                    Loading Experience
                  </div>
                  
                  <div className="flex items-center w-full space-x-6">
                    <div className="h-[2px] flex-1 bg-white/10 relative overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                      />
                    </div>
                    <div className="text-white/90 font-mono text-sm w-12 text-right">
                      {progress}%
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {introState === "reveal" && (
              <motion.div
                key="reveal"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 1.2 }}
              >
                <IntroReveal onComplete={handleRevealComplete} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
