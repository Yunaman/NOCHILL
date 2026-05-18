"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const { products } = useProducts();

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery(""); // Reset query on close
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    if (query.length < 2) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/90 backdrop-blur-2xl pt-[10vh] md:pt-[15vh] px-6"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-full max-w-2xl"
          >
            {/* Search Input Area */}
            <div className="relative flex items-center border-b border-white/20 pb-4">
              <Search className="h-6 w-6 text-white/40" />
              <input
                autoFocus
                type="text"
                placeholder="SEARCH ARCHIVE..."
                className="w-full bg-transparent px-6 text-2xl font-bold uppercase tracking-widest text-white placeholder:text-white/10 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={onClose}
                className="group ml-4"
              >
                <X className="h-6 w-6 text-white/40 transition-colors group-hover:text-white" />
              </button>
            </div>

            {/* Results Area */}
            <div className="mt-12 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              {query.length >= 2 ? (
                <div className="space-y-8 pb-12">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">
                    Results ({filteredResults.length})
                  </span>

                  {filteredResults.length > 0 ? (
                    <div className="grid gap-6">
                      {filteredResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="group flex items-center gap-6 border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="relative aspect-square w-20 overflow-hidden bg-zinc-900">
                            {product.images[0] && (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                              {product.category} — ${product.price}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 -translate-x-4 text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-xs uppercase tracking-[0.5em] text-white/20">
                        No artifacts found.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Suggestions */}
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">
                      Suggestions
                    </span>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {["HOODIE", "TEE", "ARCHIVE", "VOID", "ACCESSORIES"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest text-white/60 transition-colors hover:border-white hover:text-white"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Featured Categories */}
                  <div className="grid grid-cols-2 gap-4">
                    {["Collections", "New Arrivals"].map((cat) => (
                      <div key={cat} className="group relative aspect-[16/6] overflow-hidden border border-white/10">
                         <div className="absolute inset-0 flex items-center justify-center bg-black/60 transition-colors group-hover:bg-black/40">
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">
                              {cat}
                            </span>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
