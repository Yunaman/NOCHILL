"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

export default function ArchivePage() {
  const { products } = useProducts();

  // Products that are either explicitly archived or just part of the general archive view
  // In this aesthetic, sometimes the whole shop is "The Archive"
  const archivedItems = products.filter(p => p.archived);

  // If no items are explicitly archived, show all as a fallback for the "Archive" aesthetic
  const displayItems = archivedItems.length > 0 ? archivedItems : products;

  return (
    <div className="min-h-screen bg-black pt-32 px-6 md:px-12 pb-24">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">History</span>
            <h1 className="text-6xl md:text-huge mt-4 leading-none font-bold tracking-tighter">ARCHIVE</h1>
          </div>
          <div className="text-left md:text-right">
            <span className="text-[10px] uppercase tracking-widest text-white/20 pb-4 block">
              Restricted access // Internal only
            </span>
            <p className="max-w-xs text-[10px] uppercase tracking-[0.2em] text-white/40 leading-relaxed">
              Past artifacts and experimental signals. Some pieces may never return.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {displayItems.map((item, index) => (
            <Link href={`/product/${item.id}`} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group aspect-[3/4] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/5"
              >
                <Image
                  src={item.images[0] || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[8px] tracking-widest text-white/60 mb-2 uppercase block">EST. 2024</span>
                      <h3 className="text-sm font-bold tracking-tighter uppercase text-white">{item.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">#{item.id.slice(-4)}</span>
                  </div>
                </div>

                {item.archived && (
                  <div className="absolute top-4 right-4 border border-white/20 px-2 py-1 backdrop-blur-md">
                     <span className="text-[8px] font-bold uppercase tracking-widest text-white/60">Vaulted</span>
                  </div>
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {displayItems.length === 0 && (
          <div className="py-40 text-center border border-white/5 bg-white/[0.02]">
             <span className="text-[10px] uppercase tracking-[1em] text-white/20">The vault is empty.</span>
          </div>
        )}
      </div>
    </div>
  );
}
