"use client";

import { motion } from "framer-motion";
import { COLLECTIONS } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-6 md:px-12 pb-24">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Editorial</span>
          <h1 className="text-huge mt-4">COLLECTIONS</h1>
        </motion.div>

        <div className="space-y-48">
          {COLLECTIONS.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="w-full md:w-2/3 aspect-[16/9] relative overflow-hidden glass">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover grayscale hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="w-full md:w-1/3 space-y-8">
                <span className="text-[10px] font-bold tracking-widest text-white/40">
                  Vol. 00{index + 1}
                </span>
                <h2 className="text-5xl font-bold tracking-tighter">{collection.name}</h2>
                <p className="text-white/60 leading-relaxed max-w-sm uppercase text-xs tracking-widest">
                  {collection.description}
                </p>
                <Link
                  href={`/shop?collection=${collection.slug}`}
                  className="inline-block group"
                >
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase transition-colors group-hover:text-white/40">
                    Explore Volume
                  </span>
                  <div className="mt-2 h-px w-full bg-white transition-transform duration-500 scale-x-100 group-hover:scale-x-50 origin-left" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
