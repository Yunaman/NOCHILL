"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/tokens";

const CATEGORIES = ["All", "Hoodies", "Tees", "Jackets", "Pants", "Headwear", "Accessories"];

export default function ShopPage() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
  }, [products, activeCategory]);

  if (!isMounted) return <div className="min-h-screen bg-black" />;

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

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-b border-white/10 pb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative py-2",
                activeCategory === cat ? "text-white" : "text-white/30 hover:text-white"
              )}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-cat"
                  className="absolute bottom-0 left-0 right-0 h-px bg-white"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1,
                ease: ease.nc,
                // Stagger within a row (cap so off-screen rows don't lag).
                delay: (i % 4) * 0.08,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center">
           <p className="text-[10px] uppercase tracking-[0.6em] text-white/20">No signals found in this category.</p>
        </div>
      )}
    </div>
  );
}
