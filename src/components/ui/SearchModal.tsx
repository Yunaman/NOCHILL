"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    if (q.trim().length === 0) {
      setResults([]);
      return;
    }
    const filtered = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase())
    );
    setResults(filtered);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200000] flex items-start justify-center bg-black/90 pt-[15vh] backdrop-blur-xl px-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <div className="relative flex items-center border-b border-white/20 pb-4">
                <Search size={24} className="text-white/40" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="SEARCH ARCHIVE..."
                  className="w-full bg-transparent px-6 text-2xl font-bold tracking-tighter text-white outline-none placeholder:text-white/10 md:text-4xl"
                />
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="mt-12 max-h-[50vh] overflow-y-auto pr-4 scrollbar-hide">
                {results.length > 0 ? (
                  <div className="space-y-8">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-6"
                      >
                        <div className="relative h-20 w-16 overflow-hidden bg-zinc-900">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover grayscale transition-all group-hover:grayscale-0"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-white/60">
                            {product.name}
                          </h4>
                          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
                            {product.category} — ${product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : query ? (
                  <p className="text-center font-mono text-[10px] uppercase tracking-[0.5em] text-white/20">
                    No signals found for &quot;{query}&quot;
                  </p>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <span className="text-[10px] uppercase tracking-[0.8em] text-white/20">Suggestions</span>
                    <div className="flex flex-wrap justify-center gap-4">
                      {["HOODIE", "CARGO", "ARCHIVE", "DROP 001"].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSearch(s)}
                          className="rounded-full border border-white/5 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white/40 transition-colors hover:border-white/20 hover:text-white"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 border-t border-white/5 pt-8 text-center">
                 <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                   Esc to close • Enter to search
                 </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
