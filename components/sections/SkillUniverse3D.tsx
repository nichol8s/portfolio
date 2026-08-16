"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useAnimationFrame, Variants } from "framer-motion";

type SkillNode = {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  z: number;
  type?: string;
};

// Deterministic 3D layout in a beautiful, evenly spaced radial network
const SKILL_NODES: SkillNode[] = [
  { id: "core", label: "NIKHIL", category: "AI Core", x: 0, y: 0, z: 0, type: "core" },
  
  // Inner Ring (Radius ~160)
  { id: "ml", label: "Machine Learning", category: "AI", x: 160, y: 0, z: -30 },
  { id: "prog", label: "Programming", category: "Core", x: 80, y: 139, z: 40 },
  { id: "da", label: "Data Analysis", category: "Data", x: -80, y: 139, z: -30 },
  { id: "web", label: "Web", category: "Development", x: -160, y: 0, z: 40 },
  { id: "dev", label: "Development", category: "Tools", x: -80, y: -139, z: -30 },
  { id: "cv", label: "Computer Vision", category: "AI", x: 80, y: -139, z: 40 },

  // Outer Ring - Machine Learning
  { id: "tf", label: "TensorFlow", category: "Deep Learning", x: 301, y: -109, z: 20 },
  { id: "pt", label: "PyTorch", category: "Deep Learning", x: 328, y: -29, z: -20 },
  { id: "skl", label: "Scikit-learn", category: "Machine Learning", x: 325, y: 57, z: 30 },
  { id: "hf", label: "Hugging Face", category: "AI", x: 290, y: 135, z: -10 },

  // Outer Ring - Programming
  { id: "py", label: "Python", category: "Core", x: 226, y: 226, z: 20 },
  { id: "jv", label: "Java", category: "Programming", x: 170, y: 294, z: -20 },
  { id: "c", label: "C", category: "Programming", x: 83, y: 309, z: 30 },

  // Outer Ring - Data Analysis
  { id: "sql", label: "SQL", category: "Database", x: -83, y: 309, z: -10 },
  { id: "np", label: "NumPy", category: "Data", x: -170, y: 294, z: 20 },
  { id: "pd", label: "Pandas", category: "Data", x: -226, y: 226, z: -30 },

  // Outer Ring - Web
  { id: "nxt", label: "Next.js", category: "Fullstack", x: -301, y: 109, z: 20 },
  { id: "rct", label: "React", category: "Frontend", x: -340, y: 0, z: -20 },
  { id: "flsk", label: "Flask", category: "Backend", x: -301, y: -109, z: 30 },

  // Outer Ring - Development
  { id: "gh", label: "GitHub", category: "Tools", x: -226, y: -226, z: -10 },
  { id: "git", label: "Git", category: "Tools", x: -170, y: -294, z: 20 },
  { id: "mdb", label: "MongoDB", category: "Database", x: -83, y: -309, z: -20 },

  // Outer Ring - Computer Vision
  { id: "ocv", label: "OpenCV", category: "Computer Vision", x: 160, y: -277, z: 20 },
];

const RAW_CONNECTIONS = [
  // Inner ring to core
  { source: "core", target: "ml" },
  { source: "core", target: "prog" },
  { source: "core", target: "da" },
  { source: "core", target: "web" },
  { source: "core", target: "dev" },
  { source: "core", target: "cv" },
  
  // Outer ring to inner ring
  { source: "ml", target: "tf" },
  { source: "ml", target: "pt" },
  { source: "ml", target: "skl" },
  { source: "ml", target: "hf" },
  
  { source: "prog", target: "py" },
  { source: "prog", target: "jv" },
  { source: "prog", target: "c" },
  
  { source: "da", target: "sql" },
  { source: "da", target: "np" },
  { source: "da", target: "pd" },
  
  { source: "web", target: "nxt" },
  { source: "web", target: "rct" },
  { source: "web", target: "flsk" },
  
  { source: "dev", target: "gh" },
  { source: "dev", target: "git" },
  { source: "dev", target: "mdb" },
  
  { source: "cv", target: "ocv" },
];

// Precompute connection math to guarantee deterministic rendering
const CONNECTIONS = RAW_CONNECTIONS.map((conn, idx) => {
  const s = SKILL_NODES.find(n => n.id === conn.source)!;
  const t = SKILL_NODES.find(n => n.id === conn.target)!;
  const dx = t.x - s.x;
  const dy = t.y - s.y;
  const dz = t.z - s.z;
  
  const rawDistance = Math.sqrt(dx*dx + dy*dy + dz*dz);
  const distance = parseFloat(rawDistance.toFixed(3));
  
  const rotY = parseFloat((Math.atan2(dz, dx) * -1).toFixed(4)); 
  const rotZ = parseFloat(Math.asin(dy / rawDistance).toFixed(4));
  
  return {
    id: `conn-${idx}`,
    source: conn.source,
    target: conn.target,
    s, t, distance, rotY, rotZ
  };
});

// Deterministic particles
const PARTICLES = CONNECTIONS.map((conn, index) => ({
  id: `part-${index}`,
  conn,
  delay: (index * 0.7) % 5,
  duration: 2 + (index % 3)
}));

export default function SkillUniverse3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Use a ref for continuous mouse tracking to prevent expensive React re-renders on every pixel move
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mousePos.current = { x, y };
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: 0, y: 0 };
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).id === "system-container") {
      setActiveId(null);
    }
  };

  // 3D Engine Frame Loop - highly optimized
  useAnimationFrame(() => {
    if (!systemRef.current) return;
    
    // Smooth interpolation for mouse parallax
    const rotX = mousePos.current.y * -12;
    const rotY = mousePos.current.x * 12;
    
    // Apply 3D rotation and scale to fit nicely
    systemRef.current.style.transform = `scale(0.85) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    
    // Pass counter-rotation down via CSS Custom Properties to avoid expensive DOM queries
    systemRef.current.style.setProperty("--billboard-rot-x", `${-rotX}deg`);
    systemRef.current.style.setProperty("--billboard-rot-y", `${-rotY}deg`);
  });

  // Calculate network relationships to highlight direct paths to core
  const { activeNetwork, pathToCore } = useMemo(() => {
    const active = new Set<string>();
    const path = new Set<string>();
    
    const targetId = hoveredId || activeId;
    if (targetId) {
      active.add(targetId);
      
      // If core is hovered, highlight primary nodes
      if (targetId === "core") {
        CONNECTIONS.forEach(c => {
          if (c.source === "core") active.add(c.target);
        });
      } else {
        // Trace path to core
        path.add(targetId);
        
        const traceToCore = (id: string) => {
          const parentConn = CONNECTIONS.find(c => c.target === id);
          if (parentConn) {
            active.add(parentConn.source);
            path.add(parentConn.source);
            path.add(parentConn.target);
            if (parentConn.source !== "core") {
              traceToCore(parentConn.source);
            }
          }
        };
        traceToCore(targetId);
        
        // Also highlight immediate children
        CONNECTIONS.forEach(conn => {
          if (conn.source === targetId) active.add(conn.target);
        });
      }
    }
    return { activeNetwork: active, pathToCore: path };
  }, [hoveredId, activeId]);

  const getNodeState = (id: string) => {
    if (!hoveredId && !activeId) return "normal";
    if (id === hoveredId || id === activeId) return "primary";
    if (pathToCore.has(id)) return "path";
    if (activeNetwork.has(id)) return "secondary";
    return "dimmed";
  };

  const getConnectionState = (source: string, target: string) => {
    if (!hoveredId && !activeId) return "normal";
    if (pathToCore.has(source) && pathToCore.has(target)) return "active";
    const targetId = hoveredId || activeId;
    if (source === targetId || target === targetId) return "active";
    return "dimmed";
  };

  const activeNodeData = SKILL_NODES.find(n => n.id === activeId);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        staggerChildren: 0.05
      } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.8, ease: "easeIn" }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", scale: 0.8 },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[700px] md:h-[800px] flex items-center justify-center perspective-[1200px] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleBackgroundClick}
    >
      <motion.div
        id="system-container"
        ref={systemRef}
        className="relative w-full h-full transform-style-3d flex items-center justify-center"
        style={{ transform: "scale(0.85)" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
      >
        {/* Neural Connections */}
        {CONNECTIONS.map((conn) => {
          const state = getConnectionState(conn.source, conn.target);
          return (
            <div
              key={conn.id}
              className="absolute left-1/2 top-1/2 transform-style-3d origin-left transition-all duration-700 ease-out"
              style={{
                width: conn.distance,
                transform: `translate3d(${conn.s.x}px, ${conn.s.y}px, ${conn.s.z}px) rotateY(${conn.rotY}rad) rotateZ(${conn.rotZ}rad)`,
                zIndex: state === "active" ? 10 : 0
              }}
            >
              <motion.div variants={itemVariants} className="w-full">
                {/* The Line */}
                <div 
                  className="w-full h-px transition-colors duration-500"
                  style={{
                    backgroundColor: state === "active" ? "rgba(34,211,238,0.8)" : state === "dimmed" ? "rgba(255,255,255,0.05)" : "rgba(34,211,238,0.15)",
                    boxShadow: state === "active" ? "0 0 10px rgba(34,211,238,0.5)" : "none"
                  }}
                />
              </motion.div>
            </div>
          );
        })}

        {/* Neural Particles */}
        {PARTICLES.map((p) => {
          const state = getConnectionState(p.conn.source, p.conn.target);
          if (state === "dimmed") return null;
          
          return (
            <div
              key={p.id}
              className="absolute top-1/2 left-1/2 transform-style-3d origin-left"
              style={{
                width: p.conn.distance,
                transform: `translate3d(${p.conn.s.x}px, ${p.conn.s.y}px, ${p.conn.s.z}px) rotateY(${p.conn.rotY}rad) rotateZ(${p.conn.rotZ}rad)`,
              }}
            >
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)]"
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: p.conn.distance, opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          );
        })}

        {/* Skill Nodes */}
        {SKILL_NODES.map((node) => {
          const state = getNodeState(node.id);
          const isCore = node.type === "core";
          
          return (
            <div
              key={node.id}
              className="absolute left-1/2 top-1/2 flex items-center justify-center transform-style-3d cursor-pointer group z-20"
              style={{ transform: `translate3d(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px), ${node.z}px)` }}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => { e.stopPropagation(); setActiveId(node.id); }}
            >
              {/* Framer motion variant wrapper handles entrance animation */}
              <motion.div variants={itemVariants} className="flex items-center justify-center">
                {/* CSS Variable driven billboard wrapper handles continuous counter-rotation without React re-renders */}
                <div 
                  className="transition-all duration-700 ease-out flex flex-col items-center justify-center relative transform-style-3d"
                  style={{
                    transform: "rotateY(var(--billboard-rot-y, 0deg)) rotateX(var(--billboard-rot-x, 0deg))",
                    opacity: state === "dimmed" ? 0.2 : state === "secondary" || state === "path" ? 0.9 : 1,
                    scale: state === "primary" ? 1.15 : state === "dimmed" ? 0.9 : 1,
                    filter: state === "dimmed" ? "blur(2px)" : "blur(0px)",
                    zIndex: state === "primary" || isCore ? 50 : state === "path" ? 40 : 10
                  }}
                >
                  {isCore ? (
                    <div className="relative flex items-center justify-center transform-style-3d">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-charcoal-950/80 backdrop-blur-xl border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4)] z-10 transition-transform duration-300 hover:scale-110">
                        <span className="font-space font-bold tracking-widest text-white text-base md:text-lg drop-shadow-[0_0_8px_rgba(34,211,238,1)]">NIKHIL</span>
                        <span className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] text-cyan-400 mt-1 uppercase">AI CORE</span>
                      </div>
                      {/* Core Animated Rings */}
                      <div className="absolute inset-[-10px] rounded-full border border-cyan-500/40 animate-[spin_4s_linear_infinite]" />
                      <div className="absolute inset-[-20px] rounded-full border border-dashed border-cyan-400/20 animate-[spin_8s_linear_infinite_reverse]" />
                      <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <div className={`
                        px-3 py-1.5 md:px-4 md:py-2 rounded-full border backdrop-blur-xl whitespace-nowrap transition-colors duration-300
                        ${state === "primary" 
                          ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_30px_rgba(34,211,238,0.3)]" 
                          : state === "path" || state === "secondary"
                          ? "bg-white/10 border-cyan-500/50 text-white"
                          : "bg-charcoal-900/80 border-white/10 text-white/70 hover:text-white"
                        }
                      `}>
                        <span className="font-mono text-[10px] md:text-xs tracking-wider font-bold">{node.label}</span>
                      </div>
                      
                      {/* Hover Tooltip */}
                      <div className={`absolute top-full mt-2 px-3 py-1 rounded bg-charcoal-950/90 border border-white/10 text-[9px] md:text-[10px] text-cyan-400 font-mono tracking-widest uppercase transition-opacity duration-300 ${hoveredId === node.id && !activeId ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {node.category}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Info Panel for Active Click Selection */}
      <div className={`absolute bottom-6 left-6 md:left-10 md:bottom-10 z-[100] transition-all duration-500 max-w-[280px] pointer-events-none ${activeNodeData ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {activeNodeData && (
          <div className="p-6 rounded-2xl bg-charcoal-950/90 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_40px_rgba(34,211,238,0.15)] pointer-events-auto">
            <div className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase mb-2">{activeNodeData.category}</div>
            <h4 className="text-2xl font-bold font-space text-white mb-3">{activeNodeData.label}</h4>
            <div className="h-px w-full bg-white/10 mb-3" />
            <p className="text-white/60 text-sm leading-relaxed">
              Connected to 
              <span className="text-white font-bold ml-1">
                {CONNECTIONS.filter(c => c.source === activeNodeData.id || c.target === activeNodeData.id).length}
              </span> active neural paths in this network.
            </p>
          </div>
        )}
      </div>

      {/* Helper text */}
      <div className="absolute bottom-6 right-6 md:right-10 text-white/30 font-mono text-[10px] tracking-widest uppercase pointer-events-none">
        {activeId ? "Click background to reset" : "Drag / Hover / Click"}
      </div>

    </div>
  );
}

