"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Environment, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { INTRO_DURATION_MS } from "@/lib/tokens";

function MetallicLogo() {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // More granular scaling for mobile/tablet/desktop
      if (width < 480) setScale(0.45);
      else if (width < 768) setScale(0.65);
      else setScale(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    meshRef.current.position.z = Math.sin(t * 0.5) * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} scale={scale}>
        <Text
          fontSize={1.2}
          letterSpacing={0.4}
          color="white"
          maxWidth={viewport.width * 2} // Prevent overflow
          textAlign="center"
        >
          NOCHILL
          <meshStandardMaterial
            metalness={1}
            roughness={0.1}
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </Text>
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          letterSpacing={0.8}
          color="white"
        >
          {"// YUNA"}
          <meshStandardMaterial
            metalness={1}
            roughness={0.1}
            color="#ffffff"
            transparent
            opacity={0.3}
          />
        </Text>
      </group>
    </Float>
  );
}

function Scene() {
  const [camPos, setCamPos] = useState<[number, number, number]>([0, 0, 5]);

  useEffect(() => {
    const handleResize = () => {
      // Adjust camera distance for smaller screens to ensure framing
      setCamPos(window.innerWidth < 768 ? [0, 0, 7] : [0, 0, 5]);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={camPos} fov={50} />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Sparkles count={80} scale={10} size={1} speed={0.4} opacity={0.2} />
      <MetallicLogo />
      <Environment preset="night" />
    </>
  );
}

export function LoadingScreen() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(contentTimer);
  }, []);

  // Exit is driven by AppWrapper's <AnimatePresence> when the intro elapses.
  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100001] bg-black"
    >
      <div className="relative h-full w-full">
        <Canvas
          shadows
          dpr={[1, 2]} // Performance optimization
          gl={{ antialias: true, alpha: false }}
        >
          <Scene />
        </Canvas>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          className="absolute bottom-24 left-1/2 w-full -translate-x-1/2 text-center px-6"
        >
          <span className="text-[9px] font-bold uppercase tracking-[1em] text-white/20 block">
            A Vision by Yuna // No Signal Found
          </span>
        </motion.div>

        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/5">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: INTRO_DURATION_MS / 1000, ease: "linear" }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.div>
  );
}
