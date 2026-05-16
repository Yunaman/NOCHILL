"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ARCHIVE_ITEMS = [
  { id: 1, name: "Sample 01", year: "2021", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000" },
  { id: 2, name: "Sample 02", year: "2021", img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=1000" },
  { id: 3, name: "Sample 03", year: "2022", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000" },
  { id: 4, name: "Sample 04", year: "2022", img: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1000" },
  { id: 5, name: "Sample 05", year: "2023", img: "https://images.unsplash.com/photo-1571945153237-4929e783ee4a?q=80&w=1000" },
  { id: 6, name: "Sample 06", year: "2023", img: "https://images.unsplash.com/photo-1529139572765-397392991d1f?q=80&w=1000" },
];

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-6 md:px-12 pb-24">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-24 flex justify-between items-end"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">History</span>
            <h1 className="text-huge mt-4 leading-none">ARCHIVE</h1>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/20 pb-4 hidden md:block">
            Restricted access // Internal only
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {ARCHIVE_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group aspect-[3/4] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="text-[8px] tracking-widest text-white/60 mb-2 uppercase">{item.year}</span>
                <h3 className="text-sm font-bold tracking-tighter uppercase">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
