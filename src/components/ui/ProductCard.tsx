"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative block w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
        {/* Images Container */}
        <motion.div
          className="h-full w-full"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Front Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-1000",
              isHovered ? "opacity-0 grayscale-0" : "opacity-100 grayscale"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Back Image Reveal */}
          {product.images[1] && (
             <Image
              src={product.images[1]}
              alt={`${product.name} back`}
              fill
              className={cn(
                "object-cover transition-all duration-1000",
                isHovered ? "opacity-100 grayscale-0" : "opacity-0 grayscale"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}
        </motion.div>

        {/* Brand Detail Overlay */}
        <div className="absolute top-4 left-4 z-10 overflow-hidden">
           <motion.span
             animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
             className="text-[8px] font-bold tracking-[0.4em] uppercase text-white/60 block"
           >
             Nochill // Archive
           </motion.span>
        </div>

        {/* Hover Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <div className="overflow-hidden">
            <motion.div
              animate={{ y: isHovered ? 0 : 40 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
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
      </div>

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
