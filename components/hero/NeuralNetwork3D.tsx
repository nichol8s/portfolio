"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Sphere, Segments, Segment, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

// --- DATA DEFINITIONS ---

const TECH_LIST = [
  "Python", "TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", 
  "OpenCV", "Machine Learning", "SQL", "Pandas", "NumPy", 
  "Data Analysis", "MongoDB", "React", "Next.js", "Flask", 
  "Git", "GitHub", "C", "Java", "MATLAB"
];

const PROJECTS_MAP: Record<string, {id: string, name: string}[]> = {
  "Python": [{ id: "ModelFlow-AI-Model-Generation-Platform-Tech-Stack", name: "MODELFlow" }, { id: "E-Learning-Engagement-Detection-System", name: "E-Learning Engagement" }],
  "TensorFlow": [{ id: "ModelFlow-AI-Model-Generation-Platform-Tech-Stack", name: "MODELFlow" }, { id: "E-Learning-Engagement-Detection-System", name: "E-Learning Engagement" }],
  "PyTorch": [{ id: "ModelFlow-AI-Model-Generation-Platform-Tech-Stack", name: "MODELFlow" }],
  "React": [{ id: "Conditioning-System", name: "Conditioning System" }],
  "Next.js": [{ id: "Conditioning-System", name: "Conditioning System" }],
  // add others as needed...
};

interface NetworkNode {
  id: string;
  isTech: boolean;
  label?: string;
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  connections: number[];
  projects?: {id: string, name: string}[];
}

interface ConnectionEdge {
  a: number;
  b: number;
}

// --- GRAPH GENERATION ---

function generateNetwork() {
  const NUM_BG = 50;
  const nodes: NetworkNode[] = [];
  const radius = 18;

  let seed = 12345;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  // Generate all nodes
  const totalNodes = TECH_LIST.length + NUM_BG;
  
  for (let i = 0; i < totalNodes; i++) {
    const isTech = i < TECH_LIST.length;
    
    // Random spherical coordinates
    const u = random();
    const v = random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    // Tech nodes tend to be closer to middle/front, bg nodes everywhere
    let r = Math.cbrt(random()) * radius;
    if (isTech) r = (random() * 0.6 + 0.3) * radius; // 30% to 90% of radius
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    let z = r * Math.cos(phi);

    // Push tech nodes slightly forward for visibility
    if (isTech) z = Math.abs(z) * 0.5 + 2; 

    const pos = new THREE.Vector3(x, y, z);
    
    // Ensure center is relatively empty for the Core
    if (pos.length() < 3) pos.setLength(3 + random() * 2);

    nodes.push({
      id: isTech ? TECH_LIST[i] : `bg-${i}`,
      isTech,
      label: isTech ? TECH_LIST[i] : undefined,
      position: pos.clone(),
      basePosition: pos.clone(),
      connections: [],
      projects: isTech ? PROJECTS_MAP[TECH_LIST[i]] || [] : []
    });
  }

  // Generate intelligent connections (k-nearest neighbors)
  const edges: ConnectionEdge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const distances = nodes.map((n, idx) => ({ idx, dist: n.position.distanceTo(nodes[i].position) }));
    distances.sort((a, b) => a.dist - b.dist);
    
    // Connect to 2-4 nearest neighbors
    const numConnections = Math.floor(random() * 3) + 2;
    for (let j = 1; j <= numConnections; j++) { // start at 1 to skip self
      const targetIdx = distances[j].idx;
      if (!nodes[i].connections.includes(targetIdx)) {
        nodes[i].connections.push(targetIdx);
        nodes[targetIdx].connections.push(i);
        edges.push({ a: i, b: targetIdx });
      }
    }
    
    // Occasional long-range connection to central area
    if (random() > 0.8) {
      const centerNodes = distances.filter(d => nodes[d.idx].position.length() < 8);
      if (centerNodes.length > 0) {
        const targetIdx = centerNodes[0].idx;
        if (!nodes[i].connections.includes(targetIdx)) {
          nodes[i].connections.push(targetIdx);
          nodes[targetIdx].connections.push(i);
          edges.push({ a: i, b: targetIdx });
        }
      }
    }
  }

  return { nodes, edges };
}

// --- 3D COMPONENTS ---

function BackgroundNodes({ nodes }: { nodes: NetworkNode[] }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const bgNodes = nodes.filter(n => !n.isTech);

  useFrame((state) => {
    if (!mesh.current) return;
    bgNodes.forEach((n, i) => {
      // Subtle floating
      const t = state.clock.elapsedTime * 0.2 + i;
      const xOffset = Math.sin(t) * 0.5;
      const yOffset = Math.cos(t) * 0.5;
      
      dummy.position.copy(n.basePosition);
      dummy.position.x += xOffset;
      dummy.position.y += yOffset;
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, bgNodes.length]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color={[0.1, 0.4, 0.6]} transparent opacity={0.3} toneMapped={false} />
    </instancedMesh>
  );
}

function TechNodeMesh({ node, index, activeId, hoveredId, setActiveId, setHoveredId }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const isActive = activeId === node.id;
  const isHovered = hoveredId === node.id;
  const isRelated = false; // We can compute graph distance if needed

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Subtle float
    const t = state.clock.elapsedTime * 0.5 + index;
    meshRef.current.position.copy(node.basePosition);
    meshRef.current.position.y += Math.sin(t) * 0.2;
    
    // Hover/Active animation (move towards camera, scale up)
    const targetScale = isActive ? 1.5 : (isHovered ? 1.3 : 1);
    const targetZ = isActive || isHovered ? node.basePosition.z + 2 : node.basePosition.z;
    
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
  });

  let glowColor = [0.1, 0.5, 0.8];
  if (isActive) glowColor = [0.2, 2.0, 3.0]; // Bright Cyan Bloom
  else if (isHovered) glowColor = [0.2, 1.5, 2.0];

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredId(node.id); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHoveredId(null); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); setActiveId(isActive ? null : node.id); }}
    >
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshBasicMaterial color={glowColor as any} transparent opacity={0.8} toneMapped={false} />
      
      <Html 
        center 
        distanceFactor={25}
        zIndexRange={[100, 0]}
        className="pointer-events-none transition-opacity duration-300"
      >
        <div className={`mt-5 flex items-center px-2 py-1 rounded-sm backdrop-blur-sm transition-all duration-300 ${
          isActive ? 'bg-[#0a0a0c]/90 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' :
          isHovered ? 'bg-[#0a0a0c]/80 border border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]' :
          'bg-transparent border border-transparent'
        }`}>
          <span className={`font-space font-medium whitespace-nowrap transition-colors ${
            isActive || isHovered ? 'text-cyan-400 text-sm drop-shadow-md' : 'text-white/70 text-[11px]'
          }`}>
            {node.label}
          </span>
        </div>
      </Html>
    </mesh>
  );
}

function NetworkConnections({ nodes, edges, hoveredId, activeId }: any) {
  // Using Segments component from drei for performant lines
  const ref = useRef<THREE.LineSegments>(null);

  // We update colors dynamically based on hover/active state
  useFrame(() => {
    if (!ref.current) return;
    // We could dynamically update connection colors here based on active nodes
    // For performance, we keep lines mostly static cyan/blue, and rely on bloom
  });

  const lines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const colors: THREE.Color[] = [];
    
    const baseColor = new THREE.Color(0.05, 0.1, 0.15); // very dark
    const highlightColor = new THREE.Color(0.1, 0.5, 0.8);
    
    edges.forEach((edge: any) => {
      points.push(nodes[edge.a].basePosition);
      points.push(nodes[edge.b].basePosition);
      
      // Determine color
      let c = baseColor;
      if (hoveredId) {
        const hoverIdx = nodes.findIndex((n: any) => n.id === hoveredId);
        if (edge.a === hoverIdx || edge.b === hoverIdx) c = highlightColor;
      }
      colors.push(c, c);
    });
    
    return { points, colors };
  }, [nodes, edges, hoveredId]);

  return (
    <Segments limit={edges.length} lineWidth={0.5}>
      {edges.map((edge: any, i: number) => {
        const isConnectedToHover = hoveredId && (nodes[edge.a].id === hoveredId || nodes[edge.b].id === hoveredId);
        const isConnectedToActive = activeId && (nodes[edge.a].id === activeId || nodes[edge.b].id === activeId);
        
        let color = [0.05, 0.1, 0.15];
        if (isConnectedToActive) color = [0.2, 1.5, 2.0];
        else if (isConnectedToHover) color = [0.1, 0.8, 1.2];

        return (
          <Segment 
            key={i} 
            start={nodes[edge.a].basePosition} 
            end={nodes[edge.b].basePosition} 
            color={color as any} 
          />
        );
      })}
    </Segments>
  );
}

function DataParticles({ nodes, edges, activePulseIdx }: any) {
  const count = 80;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useRef(Array.from({ length: count }, () => {
    const edge = edges[Math.floor(Math.random() * edges.length)];
    return {
      edge,
      progress: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
      forward: Math.random() > 0.5
    };
  }));

  useFrame(() => {
    if (!mesh.current) return;
    
    particles.current.forEach((p, i) => {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        // Pick new edge connected to the end node
        const currentNodeIdx = p.forward ? p.edge.b : p.edge.a;
        const possibleEdges = edges.filter((e: any) => e.a === currentNodeIdx || e.b === currentNodeIdx);
        if (possibleEdges.length > 0) {
          p.edge = possibleEdges[Math.floor(Math.random() * possibleEdges.length)];
          p.forward = p.edge.a === currentNodeIdx;
        }
      }
      
      const start = nodes[p.edge.a].basePosition;
      const end = nodes[p.edge.b].basePosition;
      const t = p.forward ? p.progress : 1 - p.progress;
      
      dummy.position.lerpVectors(start, end, t);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color={[0.2, 1.5, 2.5]} transparent opacity={0.8} toneMapped={false} />
    </instancedMesh>
  );
}

function AICore() {
  const coreRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
    if (haloRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      haloRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={coreRef}>
      {/* Dark Glass Center */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhysicalMaterial 
          color="#02030A" 
          metalness={0.9} 
          roughness={0.1} 
          transmission={0.5} 
          thickness={2}
        />
      </mesh>
      
      {/* Cyan Edge / Pulse */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial 
          color={[0.1, 0.8, 1.5] as any} 
          transparent 
          opacity={0.15} 
          side={THREE.BackSide} 
          toneMapped={false}
        />
      </mesh>
      
      <Html center distanceFactor={20} className="pointer-events-none">
        <div className="flex flex-col items-center justify-center">
          <span className="font-space font-bold text-white tracking-[0.25em] text-xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            NIKHIL
          </span>
          <span className="font-mono text-cyan-400/80 text-[9px] uppercase tracking-[0.4em] mt-1.5 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            AI Core
          </span>
        </div>
      </Html>
    </group>
  );
}

// --- SCENE & CAMERA ---

function NeuralScene({ hoveredId, activeId, setHoveredId, setActiveId, scrollProgress }: any) {
  const { nodes, edges } = useMemo(() => generateNetwork(), []);
  const groupRef = useRef<THREE.Group>(null);

  // Parallax and Scroll Camera movement
  useFrame((state) => {
    // Scroll depth effect (move through network)
    // scrollProgress is a MotionValue (0 at top, 1 at bottom of hero)
    const sp = scrollProgress && scrollProgress.get ? scrollProgress.get() : 0;
    const scrollZ = sp * -15; 
    
    // Mouse Parallax (subtle 5 degrees)
    const targetRotY = (state.pointer.x * Math.PI) * 0.03;
    const targetRotX = -(state.pointer.y * Math.PI) * 0.03;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, scrollZ, 0.05);
      
      // Idle continuous rotation
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    }

    // Camera Focus on active node
    if (activeId) {
      const node = nodes.find(n => n.id === activeId);
      if (node) {
        // Zoom slightly towards node
        const targetPos = node.basePosition.clone().add(new THREE.Vector3(0, 0, 10));
        state.camera.position.lerp(targetPos, 0.05);
        state.camera.lookAt(node.basePosition);
      }
    } else {
      state.camera.position.lerp(new THREE.Vector3(0, 0, 30), 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <AICore />
      <BackgroundNodes nodes={nodes} />
      <NetworkConnections nodes={nodes} edges={edges} hoveredId={hoveredId} activeId={activeId} />
      <DataParticles nodes={nodes} edges={edges} />
      
      {nodes.filter(n => n.isTech).map((node, i) => (
        <TechNodeMesh 
          key={node.id} 
          node={node} 
          index={i}
          activeId={activeId}
          hoveredId={hoveredId}
          setActiveId={setActiveId}
          setHoveredId={setHoveredId}
        />
      ))}
    </group>
  );
}

export default function NeuralNetwork3D({ scrollProgress }: { scrollProgress?: any }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const activeNode = useMemo(() => {
    return hoveredId ? undefined : TECH_LIST.includes(activeId || "") ? activeId : null;
  }, [activeId, hoveredId]);

  const activeData = activeNode ? { id: activeNode, projects: PROJECTS_MAP[activeNode] || [] } : null;

  return (
    <div className="relative w-full h-screen lg:h-[900px] overflow-hidden bg-transparent">
      {/* 3D Canvas Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 30], fov: 45 }} dpr={[1, 1.5]}>
          <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          </EffectComposer>
          
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#22d3ee" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
          
          <NeuralScene 
            hoveredId={hoveredId}
            activeId={activeId}
            setHoveredId={setHoveredId}
            setActiveId={setActiveId}
            scrollProgress={scrollProgress}
          />
        </Canvas>
      </div>

      {/* Floating HUD for Hover */}
      <AnimatePresence>
        {hoveredId && !activeId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg px-6 py-4 flex flex-col gap-2 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-space text-sm font-bold text-white uppercase tracking-widest">
                  {hoveredId}
                </span>
              </div>
              <span className="text-white/60 text-xs font-mono">
                System Node Connected
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Node Dashboard */}
      <AnimatePresence>
        {activeData && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-12 right-12 z-50 min-w-[320px] max-w-[400px] pointer-events-auto hidden lg:flex flex-col"
          >
            <div className="bg-[#02030A]/90 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-1 block">
                    Focus Node
                  </span>
                  <h3 className="text-white font-space font-bold text-2xl">{activeData.id}</h3>
                </div>
                <button 
                  onClick={() => setActiveId(null)}
                  className="text-white/40 hover:text-white bg-white/5 hover:bg-white/15 rounded-full p-2 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Technology used extensively across AI, data processing, and scalable architecture engineering.
              </p>

              <div className="space-y-3">
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest block">
                  Related Modules
                </span>
                {activeData.projects.length > 0 ? (
                  activeData.projects.map((p: any) => (
                    <a
                      href="#projects"
                      key={p.id}
                      className="group w-full flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-pointer"
                    >
                      <span className="text-sm font-space text-white/90 font-medium group-hover:text-cyan-400 transition-colors">{p.name}</span>
                      <ArrowRight size={16} className="text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))
                ) : (
                  <div className="text-sm text-white/40 italic py-2">
                    Core foundational competency.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
