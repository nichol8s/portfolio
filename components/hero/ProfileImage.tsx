"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProfileImage() {
  const [isMounted, setIsMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the parallax
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  // Map mouse position to rotation and translation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -0.5 to 0.5
      const rect = document.body.getBoundingClientRect();
      const nx = (e.clientX / rect.width) - 0.5;
      const ny = (e.clientY / rect.height) - 0.5;
      
      x.set(nx);
      y.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  if (!isMounted) return <div className="w-full aspect-[4/5] bg-charcoal-800 rounded-3xl" />;

  return (
    <div className="relative w-full aspect-[4/5] max-w-lg mx-auto flex items-center justify-center perspective-[1000px]">
      
      {/* Subtle Background Glow that reacts to mouse */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 blur-3xl rounded-full z-0"
        style={{ x: translateX, y: translateY }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-[2rem] border border-white/10 bg-charcoal-800/80 overflow-hidden z-10 shadow-2xl backdrop-blur-sm group"
      >
        {/* Placeholder gradient mimicking a professional photo setup */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-800 to-charcoal-900 z-0" />
        
        {/* Grid pattern over placeholder */}
        <div 
          className="absolute inset-0 z-10 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* The actual image goes here */}
        {/* <img src="/nikhil-photo.jpg" alt="Nikhil Biju" className="absolute inset-0 w-full h-full object-cover z-20 mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-opacity duration-500" /> */}
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white/20">
          <div className="w-24 h-24 rounded-full border border-white/10 mb-4 flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest">Photo</span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase">Insert Profile Image</span>
        </div>

        {/* Overlay lighting effect */}
        <motion.div 
          className="absolute inset-0 z-30 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, transparent 60%)",
            x: translateX,
            y: translateY
          }}
        />
      </motion.div>
    </div>
  );
}
