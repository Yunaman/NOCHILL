"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group relative block w-full overflow-hidden">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
        {/* Cinematic Zoom & Grayscale-to-Color Transition */}
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </motion.div>

        {/* Brand Detail Overlay */}
        <div className="absolute top-4 left-4 z-10 overflow-hidden">
           <motion.span
             initial={{ y: "100%" }}
             whileHover={{ y: 0 }}
             className="text-[8px] font-bold tracking-[0.4em] uppercase text-white/40"
           >
             Nochill // Archive
           </motion.span>
        </div>

        {/* Hover Text Reveal */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
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

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      <div className="mt-6 space-y-2 px-2">
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
