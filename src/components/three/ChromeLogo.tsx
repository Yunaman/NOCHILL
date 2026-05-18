"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function LogoMesh({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={isMobile ? 1 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        fontSize={isMobile ? 0.8 : 1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        NOCHILL
        <MeshDistortMaterial
          color="#ffffff"
          speed={isMobile ? 1 : 2}
          distort={isMobile ? 0.1 : 0.2}
          metalness={1}
          roughness={0.1}
        />
      </Text>
    </Float>
  );
}

export function ChromeLogo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={isMobile ? 1 : [1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <LogoMesh isMobile={isMobile} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
