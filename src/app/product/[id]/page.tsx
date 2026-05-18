"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fadeIn } from "@/lib/animations";

export default function ProductPage() {
  const params = useParams();
  const { products } = useProducts();
  const { addItem, toggleCart } = useCart();
  const product = products.find((p) => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black gap-8">
        <h2 className="text-4xl font-bold tracking-tighter uppercase text-white">Signal Lost</h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Artifact not found in archive</p>
        <Link href="/shop" className="border border-white/20 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("PLEASE SELECT A SIZE.");
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      addItem({ ...product, selectedSize, quantity: 1 });
      setIsAdding(false);
      toggleCart();
    }, 800);
  };

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
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[10px] text-white/10 uppercase tracking-[1em]">No Image</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-zinc-900 glass overflow-hidden">
               {product.images[1] ? (
                 <Image
                  src={product.images[1]}
                  alt={product.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="text-[10px] uppercase tracking-widest">Back View</span>
                 </div>
               )}
            </div>
            <div className="relative aspect-[3/4] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center p-8 text-center">
               <span className="text-[8px] text-white/20 uppercase tracking-[0.8em] mb-4">Coordinate</span>
               <span className="text-xl font-bold tracking-tighter text-white/40">51.5074° N <br /> 0.1278° W</span>
               <div className="mt-auto h-px w-8 bg-white/10" />
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
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[1em] text-white/40">{product.category}</span>
                <h1 className="mt-6 text-5xl md:text-8xl font-bold tracking-tighter uppercase text-white">{product.name}</h1>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-white/20">REF: {product.id.slice(-6)}</span>
              </div>
            </div>

            <p className="mt-4 text-3xl font-medium tracking-tight text-white">${product.price}</p>

            <div className="mt-16 space-y-12">
              <p className="text-white/40 leading-relaxed max-w-md uppercase text-[10px] tracking-[0.2em]">
                {product.description}
              </p>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Select Size</span>
                  <span className="text-[8px] uppercase tracking-widest text-white/20 underline cursor-pointer">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {(product.variants || ["S", "M", "L", "XL"]).map((size) => (
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
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full bg-white py-6 text-[10px] font-bold uppercase tracking-[0.5em] text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-4"
                  >
                    {isAdding ? <Loader2 className="animate-spin h-4 w-4" /> : "Add to bag"}
                  </button>
                </MagneticButton>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
                    Worldwide shipping • Duty free for members
                  </p>
                  {product.archived && (
                     <p className="text-[8px] uppercase tracking-[0.4em] text-red-500/60 font-bold">
                       Note: This artifact is currently vaulted.
                     </p>
                  )}
                </div>
              </div>

              <div className="pt-16 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Specifications</span>
                <ul className="mt-8 space-y-4">
                  {product.details && product.details.length > 0 ? (
                    product.details.map((detail, i) => (
                      <li key={i} className="text-[10px] text-white/60 flex items-center gap-4 uppercase tracking-[0.2em]">
                        <div className="h-1 w-1 bg-white/20 rounded-full" />
                        {detail}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="text-[10px] text-white/60 flex items-center gap-4 uppercase tracking-[0.2em]">
                        <div className="h-1 w-1 bg-white/20 rounded-full" />
                        Premium Weight Heavy Cotton
                      </li>
                      <li className="text-[10px] text-white/60 flex items-center gap-4 uppercase tracking-[0.2em]">
                        <div className="h-1 w-1 bg-white/20 rounded-full" />
                        Cinematic Oversized Fit
                      </li>
                      <li className="text-[10px] text-white/60 flex items-center gap-4 uppercase tracking-[0.2em]">
                        <div className="h-1 w-1 bg-white/20 rounded-full" />
                        Signature Chrome Hardware
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
