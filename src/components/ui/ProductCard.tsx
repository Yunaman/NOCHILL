"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { imageHover } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group relative block">
      <div className="aspect-[3/4] w-full bg-zinc-900 overflow-hidden relative glass">
        <motion.div
          initial="initial"
          whileHover="hover"
          className="h-full w-full relative"
        >
          <motion.div variants={imageHover} className="h-full w-full relative">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Soft Glow Hover */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Subtle Distort Overlay (Simulated with Grain) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </motion.div>
      </div>

      <div className="mt-6 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="text-[10px] font-bold tracking-widest">${product.price}</p>
        </div>
        <p className="text-[8px] text-white/20 uppercase tracking-[0.4em]">{product.category}</p>
      </div>

      <div className="absolute top-6 right-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="glass px-4 py-2">
           <span className="text-[8px] font-bold uppercase tracking-[0.5em]">View Artifact</span>
        </div>
      </div>
    </Link>
  );
}
