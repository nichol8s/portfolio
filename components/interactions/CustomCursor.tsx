"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const immediateX = useMotionValue(0);
  const immediateY = useMotionValue(0);
  
  const cursorX = useSpring(0, { damping: 25, stiffness: 300, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      immediateX.set(e.clientX);
      immediateY.set(e.clientY);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we're hovering a clickable element
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                         target.tagName.toLowerCase() === 'a' ||
                         target.tagName.toLowerCase() === 'button' ||
                         target.closest('a') ||
                         target.closest('button');

      setIsHovering(!!isClickable);

      // Specific check for project cards
      if (target.closest('.group.cursor-pointer')) {
        setHoverText("VIEW");
      } else {
        setHoverText("");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY, immediateX, immediateY]);

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Small dot that follows cursor instantly */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ 
          x: immediateX,
          y: immediateY,
          opacity: isHovering ? 0 : 1
        }}
      />
      
      {/* Larger circle that trails */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-cyan-400/50 bg-charcoal-900/20 backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.span 
          className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoverText ? 1 : 0 }}
        >
          {hoverText}
        </motion.span>
      </motion.div>
    </>
  );
}
