"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Environment, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function MetallicLogo() {
  const meshRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setScale(isMobile ? 0.6 : 1);
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
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Sparkles count={100} scale={10} size={1} speed={0.4} opacity={0.2} />
      <MetallicLogo />
      <Environment preset="night" />
    </>
  );
}

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100001] bg-black"
        >
          <div className="relative h-full w-full">
            <Canvas shadows>
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
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
