"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { PRODUCTS } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { fadeIn } from "@/lib/animations";

export default function ProductPage() {
  useLenis();
  const params = useParams();
  const product = PRODUCTS.find((p) => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p className="text-xl font-bold tracking-tighter uppercase">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12">
      <Link
        href="/shop"
        className="mb-12 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} /> Back to shop
      </Link>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Gallery */}
        <motion.div
          className="lg:col-span-7 space-y-4"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="relative aspect-[4/5] w-full bg-zinc-900 overflow-hidden glass">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover grayscale"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square bg-zinc-900 glass opacity-50">
               <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="relative aspect-square bg-zinc-900 glass flex items-center justify-center">
               <span className="text-[10px] text-white/10 uppercase tracking-[1em]">No Signal</span>
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <div className="lg:col-span-5">
          <motion.div
            className="sticky top-32"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <span className="text-[10px] uppercase tracking-[1em] text-white/40">{product.category}</span>
            <h1 className="mt-6 text-5xl md:text-8xl font-bold tracking-tighter uppercase">{product.name}</h1>
            <p className="mt-4 text-3xl font-medium tracking-tight">${product.price}</p>

            <div className="mt-16 space-y-12">
              <p className="text-white/40 leading-relaxed max-w-md uppercase text-[10px] tracking-[0.2em]">
                {product.description}
              </p>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Select Size</span>
                <div className="mt-6 flex flex-wrap gap-4">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-14 w-14 border text-[10px] font-bold transition-all duration-500 ${
                        selectedSize === size
                        ? "bg-white text-black border-white"
                        : "border-white/10 text-white hover:border-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-12">
                <MagneticButton className="w-full">
                  <button className="w-full bg-white py-6 text-[10px] font-bold uppercase tracking-[0.5em] text-black hover:bg-zinc-200 transition-colors">
                    Add to bag
                  </button>
                </MagneticButton>
                <p className="text-center text-[10px] uppercase tracking-[0.4em] text-white/20">
                  Worldwide shipping • Duty free for members
                </p>
              </div>

              <div className="pt-16 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Specifications</span>
                <ul className="mt-8 space-y-4">
                  {product.details.map((detail, i) => (
                    <li key={i} className="text-[10px] text-white/60 flex items-center gap-4 uppercase tracking-[0.2em]">
                      <div className="h-1 w-1 bg-white/20 rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
