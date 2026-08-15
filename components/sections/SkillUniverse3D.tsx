"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";

type SkillNode = {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  z: number;
};

// Deterministic 3D layout to prevent hydration errors
const SKILL_NODES: SkillNode[] = [
  // Core
  { id: "py", label: "Python", category: "Core", x: 0, y: -80, z: 240 },
  
  // AI / ML Cluster
  { id: "ml", label: "Machine Learning", category: "AI", x: -280, y: -200, z: 120 },
  { id: "tf", label: "TensorFlow", category: "Deep Learning", x: -440, y: 40, z: 200 },
  { id: "pt", label: "PyTorch", category: "Deep Learning", x: -200, y: 240, z: 320 },
  { id: "skl", label: "Scikit-learn", category: "Machine Learning", x: -520, y: -300, z: 0 },
  { id: "hf", label: "Hugging Face", category: "AI", x: -280, y: -440, z: -160 },
  
  // Data Cluster
  { id: "da", label: "Data Analysis", category: "Data", x: 280, y: -240, z: 80 },
  { id: "pd", label: "Pandas", category: "Data", x: 440, y: -400, z: -40 },
  { id: "np", label: "NumPy", category: "Data", x: 560, y: -160, z: -120 },
  { id: "sql", label: "SQL", category: "Database", x: 360, y: 0, z: 0 },
  
  // Computer Vision Cluster
  { id: "cv", label: "Computer Vision", category: "AI", x: -120, y: 440, z: 40 },
  { id: "ocv", label: "OpenCV", category: "Computer Vision", x: -300, y: 560, z: -60 },
  
  // Web Cluster
  { id: "web", label: "Web", category: "Development", x: 320, y: 320, z: 120 },
  { id: "rct", label: "React", category: "Frontend", x: 480, y: 240, z: 260 },
  { id: "nxt", label: "Next.js", category: "Fullstack", x: 600, y: 440, z: 60 },
  { id: "flsk", label: "Flask", category: "Backend", x: 200, y: 560, z: -80 },
  
  // Development Cluster
  { id: "dev", label: "Development", category: "Tools", x: -120, y: -120, z: -360 },
  { id: "git", label: "Git", category: "Tools", x: -280, y: -200, z: -560 },
  { id: "gh", label: "GitHub", category: "Tools", x: 40, y: -360, z: -480 },
  { id: "mdb", label: "MongoDB", category: "Database", x: -200, y: 120, z: -480 },
  
  // Other
  { id: "jv", label: "Java", category: "Programming", x: 560, y: -120, z: -480 },
  { id: "c", label: "C", category: "Programming", x: 440, y: 160, z: -560 },
];

const RAW_CONNECTIONS = [
  // ML
  { source: "ml", target: "py" },
  { source: "ml", target: "tf" },
  { source: "ml", target: "pt" },
  { source: "ml", target: "skl" },
  
  // Data
  { source: "da", target: "py" },
  { source: "da", target: "pd" },
  { source: "da", target: "np" },
  { source: "da", target: "sql" },
  
  // CV
  { source: "cv", target: "py" },
  { source: "cv", target: "tf" },
  { source: "cv", target: "ocv" },
  
  // Web
  { source: "web", target: "rct" },
  { source: "web", target: "nxt" },
  { source: "web", target: "flsk" },
  
  // Dev
  { source: "dev", target: "git" },
  { source: "dev", target: "gh" },
  { source: "dev", target: "mdb" },
  
  // Cross-connections
  { source: "tf", target: "pt" },
  { source: "pd", target: "np" },
  { source: "rct", target: "nxt" },
  { source: "git", target: "gh" },
  { source: "flsk", target: "py" },
  { source: "jv", target: "c" },
  { source: "hf", target: "ml" },
  { source: "hf", target: "pt" },
];

// Precompute connection math to guarantee deterministic rendering
const CONNECTIONS = RAW_CONNECTIONS.map((conn, idx) => {
  const s = SKILL_NODES.find(n => n.id === conn.source)!;
  const t = SKILL_NODES.find(n => n.id === conn.target)!;
  const dx = t.x - s.x;
  const dy = t.y - s.y;
  const dz = t.z - s.z;
  
  // Use toFixed to guarantee exact string matching between Node SSR and browser client
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
  
  // Interaction states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).id === "system-container") {
      setActiveId(null);
    }
  };

  // 3D Engine Frame Loop
  useAnimationFrame(() => {
    if (!systemRef.current) return;
    
    // Only mouse parallax, NO automatic rotation
    const rotX = mousePos.y * -15;
    const rotY = mousePos.x * 15;
    
    systemRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    
    // Counter-rotate nodes for billboarding (keep them facing camera)
    const nodes = document.querySelectorAll(".skill-node-billboard");
    nodes.forEach((node) => {
      const el = node as HTMLElement;
      el.style.transform = `rotateY(${-rotY}deg) rotateX(${-rotX}deg)`;
    });
  });

  // Calculate network relationships
  const activeNetwork = new Set<string>();
  if (hoveredId || activeId) {
    const targetId = hoveredId || activeId;
    activeNetwork.add(targetId!);
    CONNECTIONS.forEach(conn => {
      if (conn.source === targetId) activeNetwork.add(conn.target);
      if (conn.target === targetId) activeNetwork.add(conn.source);
    });
  }

  const getNodeState = (id: string) => {
    if (!hoveredId && !activeId) return "normal";
    if (id === hoveredId || id === activeId) return "primary";
    if (activeNetwork.has(id)) return "secondary";
    return "dimmed";
  };

  const getConnectionState = (source: string, target: string) => {
    if (!hoveredId && !activeId) return "normal";
    const targetId = hoveredId || activeId;
    if (source === targetId || target === targetId) return "active";
    return "dimmed";
  };

  const activeNodeData = SKILL_NODES.find(n => n.id === activeId);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[700px] md:h-[800px] flex items-center justify-center perspective-[1200px] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleBackgroundClick}
    >
      {/* 3D System Container */}
      <motion.div
        id="system-container"
        ref={systemRef}
        className="relative w-full h-full transform-style-3d flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* NIKHIL AI CORE */}
        <div className="absolute z-50 flex items-center justify-center transform-style-3d">
          <div className="skill-node-billboard relative flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-charcoal-950/80 backdrop-blur-xl border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4)] z-10 cursor-pointer hover:scale-110 transition-transform duration-300">
              <span className="font-space font-bold tracking-widest text-white text-lg drop-shadow-[0_0_8px_rgba(34,211,238,1)]">NIKHIL</span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-cyan-400 mt-1 uppercase">AI Core</span>
            </div>
            
            {/* Core Animated Rings */}
            <div className="absolute inset-[-10px] rounded-full border border-cyan-500/40 animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-[-20px] rounded-full border border-dashed border-cyan-400/20 animate-[spin_8s_linear_infinite_reverse]" />
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Neural Connections */}
        {CONNECTIONS.map((conn) => {
          const state = getConnectionState(conn.source, conn.target);
          return (
            <div
              key={conn.id}
              className="absolute top-1/2 left-1/2 transform-style-3d origin-left transition-all duration-500"
              style={{
                width: conn.distance,
                transform: `translate3d(${conn.s.x}px, ${conn.s.y}px, ${conn.s.z}px) rotateY(${conn.rotY}rad) rotateZ(${conn.rotZ}rad)`,
                zIndex: state === "active" ? 10 : 0
              }}
            >
              {/* The Line */}
              <div 
                className="w-full h-px transition-colors duration-500"
                style={{
                  backgroundColor: state === "active" ? "rgba(34,211,238,0.8)" : state === "dimmed" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)",
                  boxShadow: state === "active" ? "0 0 10px rgba(34,211,238,0.5)" : "none"
                }}
              />
            </div>
          );
        })}

        {/* Neural Particles */}
        {isMounted && PARTICLES.map((p) => {
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
          
          return (
            <div
              key={node.id}
              className="absolute top-1/2 left-1/2 flex items-center justify-center transform-style-3d cursor-pointer group z-20"
              style={{ transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px)` }}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => { e.stopPropagation(); setActiveId(node.id); }}
            >
              <div 
                className="skill-node-billboard transition-all duration-500 ease-out flex flex-col items-center justify-center"
                style={{
                  opacity: state === "dimmed" ? 0.2 : state === "secondary" ? 0.8 : 1,
                  transform: state === "primary" ? "scale(1.2)" : state === "dimmed" ? "scale(0.9)" : "scale(1)",
                  filter: state === "dimmed" ? "blur(2px)" : "blur(0px)",
                  zIndex: state === "primary" ? 50 : 10
                }}
              >
                {/* Node visual */}
                <div className={`
                  px-4 py-2 rounded-full border backdrop-blur-xl whitespace-nowrap transition-colors duration-300
                  ${state === "primary" 
                    ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_30px_rgba(34,211,238,0.3)]" 
                    : state === "secondary"
                    ? "bg-white/10 border-cyan-500/50 text-white"
                    : "bg-charcoal-900/80 border-white/10 text-white/70 hover:text-white"
                  }
                `}>
                  <span className="font-mono text-xs md:text-sm tracking-wider font-bold">{node.label}</span>
                </div>
                
                {/* Hover Tooltip */}
                <div className={`absolute top-full mt-2 px-3 py-1 rounded bg-charcoal-950/90 border border-white/10 text-[10px] text-cyan-400 font-mono tracking-widest uppercase transition-opacity duration-300 ${hoveredId === node.id && !activeId ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {node.category}
                </div>
              </div>
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
