"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12">
      <header className="mb-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">The Collection</span>
          <h1 className="text-6xl md:text-[10rem] font-bold tracking-tighter uppercase mt-4">SHOP</h1>
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-8 border-b border-white/10 pb-8">
          {["All", "Apparel", "Accessories", "Archive"].map((cat) => (
            <button key={cat} className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </header>

      <motion.div
        className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            variants={fadeIn}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
