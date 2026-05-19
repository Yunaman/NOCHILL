"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArtifactDisplay } from "@/components/ui/ArtifactDisplay";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "NEW",
  "HOODIES",
  "TEES",
  "JACKETS",
  "BOTTOMS",
  "HEADWEAR",
  "ACCESSORIES",
  "ARCHIVE"
];

interface ProductShowcaseProps {
  products: Product[];
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("NEW");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "NEW") return products.filter(p => p.featured);
    if (activeCategory === "ARCHIVE") return products.filter(p => p.archived);

    // Mapping display categories to data categories
    const categoryMap: Record<string, string> = {
      "HOODIES": "Hoodies",
      "TEES": "Tees",
      "JACKETS": "Jackets",
      "BOTTOMS": "Pants",
      "HEADWEAR": "Headwear",
      "ACCESSORIES": "Accessories"
    };

    const targetCategory = categoryMap[activeCategory];
    return products.filter(p => p.category === targetCategory);
  }, [products, activeCategory]);

  return (
    <section className="relative min-h-screen bg-[#050505] px-6 py-32 md:px-12">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* LEFT SIDE: Sticky Category Navigation */}
        <div className="lg:w-64">
          <div className="lg:sticky lg:top-32 flex flex-row lg:flex-col flex-wrap gap-4 lg:gap-8">
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/20 mb-4 hidden lg:block">
              INDEX_ARTIFACTS
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-left text-[10px] font-bold tracking-[0.4em] uppercase transition-all duration-500 relative",
                  activeCategory === cat
                    ? "text-white scale-110 translate-x-2"
                    : "text-white/20 hover:text-white/60"
                )}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Immersive Product Display */}
        <div className="flex-1">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.8em] text-white/40 block mb-4">
                Section // {activeCategory}
              </span>
              <h2 className="editorial-heading uppercase text-white leading-none">
                {activeCategory}. <br /> <span className="text-white/20 tracking-tighter">ARCHIVE_SIGNAL</span>
              </h2>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, i) => (
                  <ArtifactDisplay
                    key={product.id}
                    product={product}
                    index={i}
                  />
                ))
              ) : (
                <div className="col-span-full py-48 text-center border border-white/5 bg-white/[0.02]">
                  <span className="text-[10px] uppercase tracking-[1em] text-white/10 italic">
                    Signal lost in this category...
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 p-12 pointer-events-none opacity-5">
         <span className="text-[8px] font-mono text-white vertical-rl uppercase tracking-widest">
           System.Status: Archive_Mode_Active
         </span>
      </div>
    </section>
  );
}
