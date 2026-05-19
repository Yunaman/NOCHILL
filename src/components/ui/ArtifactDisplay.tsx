"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ArtifactDisplayProps {
  product: Product;
  index: number;
}

export function ArtifactDisplay({ product, index }: ArtifactDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 3D Perspective Hover Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn(
        "group relative block w-full",
        index % 2 === 0 ? "mt-0" : "mt-24 md:mt-48"
      )}
    >
      <div
        className="relative perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
          className="relative aspect-[3/4] w-full overflow-hidden bg-black/60 backdrop-blur-md border border-white/5"
        >
          {/* Artifact Image */}
          <motion.div
            className="absolute inset-0 z-0 h-full w-full"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-1000 ease-out",
                isHovered ? "grayscale-0 opacity-100" : "grayscale opacity-40"
              )}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Soft Shadow Depth / Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,1)]" />
          </motion.div>

          {/* Cinematic Glow */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            transition={{ duration: 1.2 }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 80%)",
            }}
          />

          {/* Info Overlay (Visible on Hover) */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
             <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="flex items-center justify-between border-t border-white/10 pt-4"
                >
                  <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-white/60">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-bold text-white/40 tracking-widest">
                    ARCHIVE_VOL_{product.id.slice(-2)}
                  </span>
                </motion.div>
             </div>
          </div>
        </motion.div>

        {/* Floating Tag */}
        <motion.div
          animate={{
            y: isHovered ? -15 : 0,
            opacity: isHovered ? 1 : 0.3,
          }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mt-8 flex flex-col gap-2 px-2"
        >
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.5em] text-white">
              {product.name}
            </h3>
            <span className="text-[10px] font-mono text-white/40">${product.price}</span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/10">
            ArtifactRef_{product.id.slice(-4)} {"//"} NOCHILL_OS
          </span>
        </motion.div>
      </div>
    </Link>
  );
}
