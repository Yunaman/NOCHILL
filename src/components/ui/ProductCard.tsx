"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [frontError, setFrontError] = useState(false);
  const [backError, setBackError] = useState(false);
  const [frontLoaded, setFrontLoaded] = useState(false);

  const { hasFinePointer, prefersReducedMotion } = useDeviceCapabilities();
  const tiltEnabled = hasFinePointer && !prefersReducedMotion;

  // Pointer-driven 3D tilt. Normalised -0.5..0.5 across the card, springed for
  // cinematic smoothing. Disabled on touch / reduced-motion.
  const cardRef = useRef<HTMLAnchorElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.3 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tiltEnabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    px.set(0);
    py.set(0);
  };

  return (
    <Link
      ref={cardRef}
      href={`/product/${product.id}`}
      className="group relative block w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950"
        style={
          tiltEnabled
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
      >
        {/* Images Container */}
        <motion.div
          className="h-full w-full"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Front Image */}
          {!frontError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              onError={() => setFrontError(true)}
              onLoad={() => setFrontLoaded(true)}
              className={cn(
                "object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                isHovered ? "opacity-0 scale-105 grayscale-0" : "opacity-100 grayscale"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
               <span className="text-[8px] uppercase tracking-widest text-white/10">No Signal Found</span>
             </div>
          )}

          {/* Back Image Reveal */}
          {product.images[1] && !backError ? (
             <Image
              src={product.images[1]}
              alt={`${product.name} back`}
              fill
              onError={() => setBackError(true)}
              className={cn(
                "object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                isHovered ? "opacity-100 grayscale-0" : "opacity-0 grayscale"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : product.images[1] && (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center bg-zinc-800 transition-opacity duration-1000",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <span className="text-[8px] uppercase tracking-widest text-white/10">No Signal Found</span>
            </div>
          )}

          {/* Loading shimmer — premium blur-up state before the front image paints */}
          <div
            className={cn(
              "absolute inset-0 bg-zinc-900 transition-opacity duration-700",
              frontLoaded || frontError ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="absolute inset-0 animate-nc-shimmer bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.04)_50%,transparent_70%)] bg-[length:200%_100%]" />
          </div>
        </motion.div>

        {/* Brand Detail Overlay */}
        <div className="absolute top-4 left-4 z-10 overflow-hidden" style={{ transform: "translateZ(40px)" }}>
           <motion.span
             animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
             className="text-[8px] font-bold tracking-[0.4em] uppercase text-white/60 block"
           >
             Nochill // Archive
           </motion.span>
        </div>

        {/* Hover Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6" style={{ transform: "translateZ(50px)" }}>
          <div className="overflow-hidden">
            <motion.div
              animate={{ y: isHovered ? 0 : 40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between"
            >
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white">
                View Details
              </span>
              <span className="text-[10px] font-bold text-white/60">
                ${product.price}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Cinematic Gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-700",
          isHovered ? "opacity-100" : "opacity-0"
        )} />
      </motion.div>

      {/* Info Always Visible */}
      <div className="mt-6 space-y-2 px-2 transition-transform duration-500 group-hover:translate-x-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/80 transition-colors group-hover:text-white">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
            {product.category}
          </span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
      </div>
    </Link>
  );
}
