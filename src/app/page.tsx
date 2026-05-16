"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { ChromeLogo } from "@/components/three/ChromeLogo";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titles = document.querySelectorAll(".reveal-text");
    titles.forEach((title) => {
      gsap.fromTo(
        title,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
          },
        }
      );
    });

    const parallaxImages = document.querySelectorAll(".parallax-image");
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black">
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="mb-6"
          >
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Drop 001 / Archive</span>
          </motion.div>

          <div className="h-64 w-full md:h-96">
            <ChromeLogo />
          </div>

          <div className="mt-8 overflow-hidden">
             <h1 className="text-huge reveal-text">NOCHILL</h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-12 text-sm font-bold tracking-[0.4em] md:text-xl text-white/60"
          >
            BUILT FOR THE OUTSIDERS.
          </motion.p>
        </div>

        <div className="absolute bottom-12 left-12 hidden md:block">
           <span className="text-[10px] uppercase tracking-widest text-white/20">Coordinates: 51.5074° N, 0.1278° W</span>
        </div>

        <div className="absolute bottom-12 right-12 hidden md:block text-right">
           <span className="text-[10px] uppercase tracking-widest text-white/20">Status: No Signal Found</span>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
           <div className="flex flex-col items-center gap-4">
             <div className="h-16 w-[1px] bg-gradient-to-b from-white to-transparent opacity-20" />
           </div>
        </div>
      </section>

      <section ref={philosophyRef} className="relative min-h-screen px-6 py-32 md:px-24 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-16">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] reveal-text">
              WE AREN&apos;T <br /> FOR EVERYONE.
            </h2>
            <div className="space-y-8 max-w-md">
               <p className="text-white/40 leading-relaxed uppercase text-[10px] tracking-[0.2em]">
                 The underground is not a place, it is a state of mind. We create artifacts for those who live in the shadows.
               </p>
               <p className="text-white/60 leading-relaxed">
                 NOCHILL is a luxury streetwear collective exploring the boundaries of cinema and fashion.
                 Every piece is a chapter. Every drop is a signal.
               </p>
            </div>
            <Link
              href="/shop"
              className="inline-block group"
            >
              <span className="text-xs font-bold tracking-[0.5em] uppercase transition-colors group-hover:text-white/40">
                Enter the archive
              </span>
              <div className="mt-2 h-px w-full bg-white transition-transform duration-500 scale-x-100 group-hover:scale-x-50 origin-left" />
            </Link>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden grayscale glass p-4">
            <div className="relative h-full w-full overflow-hidden">
               <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000"
                alt="Model"
                fill
                className="object-cover parallax-image scale-110"
              />
            </div>
            <div className="absolute top-8 right-8 mix-blend-difference">
               <span className="text-[10px] font-bold uppercase tracking-widest">001 / VOID</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-32 md:px-12">
        <div className="mb-24 text-center">
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Current Signal</span>
          <h2 className="text-huge reveal-text">DROP 001</h2>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black">
        <h2 className="text-huge text-center mix-blend-difference reveal-text">ENTER THE VOID</h2>
        <Link
          href="/shop"
          className="mt-16 group relative overflow-hidden bg-black text-white px-16 py-6"
        >
          <span className="relative z-10 text-xs font-bold tracking-[0.5em] uppercase">Join Us</span>
          <motion.div
             className="absolute inset-0 bg-zinc-800"
             initial={{ x: "-100%" }}
             whileHover={{ x: 0 }}
             transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
        </Link>

        <div className="absolute bottom-12 flex flex-col md:flex-row gap-8 md:gap-32 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Worldwide membership</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.5em]">No signal found</span>
        </div>
      </section>
    </div>
  );
}
