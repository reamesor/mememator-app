"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMouse } from "./MouseContext";

// Register THREE.Line so <threeLine> works (R3F omits "line" to avoid SVG conflict)
import { extend } from "@react-three/fiber";
extend({ ThreeLine: THREE.Line });

const WORLD_ORBS = [
  { name: "Trends", color: "#22d3ee", emissive: "#0e7490", position: [1.8, 0.6, 0] as [number, number, number] },
  { name: "Create", color: "#a78bfa", emissive: "#6d28d9", position: [-1.2, 1, 0] as [number, number, number] },
  { name: "Launch", color: "#fbbf24", emissive: "#b45309", position: [-0.6, -1.4, 0] as [number, number, number] },
];

function Starfield() {
  const count = 2400;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const r = 25;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e2e8f0"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function WorldOrb({
  color,
  emissive,
  position,
  onClick,
}: {
  name: string;
  color: string;
  emissive: string;
  position: [number, number, number];
  onClick?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhongMaterial>(null);
  const hoverRef = useRef(false);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
    if (materialRef.current) {
      const target = hoverRef.current ? 0.5 : 0.22;
      materialRef.current.emissiveIntensity += (target - materialRef.current.emissiveIntensity) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerOver={() => {
          hoverRef.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hoverRef.current = false;
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshPhongMaterial
          ref={materialRef}
          color={color}
          emissive={emissive}
          emissiveIntensity={0.22}
          transparent
          opacity={0.95}
          side={THREE.FrontSide}
          shininess={40}
        />
      </mesh>
    </group>
  );
}

function CursorReaction({
  mx,
  my,
  onGlobeClick,
}: {
  mx: number;
  my: number;
  onGlobeClick?: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;
    const tilt = 0.12;
    smoothRef.current.x += (my * tilt - smoothRef.current.x) * 0.08;
    smoothRef.current.y += (mx * tilt - smoothRef.current.y) * 0.08;
    groupRef.current.rotation.order = "YXZ";
    groupRef.current.rotation.x = smoothRef.current.x;
    groupRef.current.rotation.y = smoothRef.current.y;
  });

  return (
    <group ref={groupRef}>
      <Starfield />
      {WORLD_ORBS.map((orb) => (
        <WorldOrb
          key={orb.name}
          name={orb.name}
          color={orb.color}
          emissive={orb.emissive}
          position={orb.position}
          onClick={onGlobeClick}
        />
      ))}
    </group>
  );
}

function Scene({
  onGlobeClick,
  mouse,
}: {
  onGlobeClick?: () => void;
  mouse: { mx: number; my: number };
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[-2, 1, 1]} intensity={0.4} color="#a78bfa" />
      <pointLight position={[0, -2, 1]} intensity={0.3} color="#fbbf24" />

      <CursorReaction mx={mouse.mx} my={mouse.my} onGlobeClick={onGlobeClick} />

      <OrbitControls
        enableZoom
        minDistance={3}
        maxDistance={8}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        autoRotate
        autoRotateSpeed={0.25}
        enablePan={false}
      />
    </>
  );
}

export default function GlobeScene({ onGlobeClick }: { onGlobeClick?: () => void } = {}) {
  const mouse = useMouse();
  return (
    <div className="absolute inset-0 bg-[#030304]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene onGlobeClick={onGlobeClick} mouse={mouse} />
      </Canvas>
    </div>
  );
}
