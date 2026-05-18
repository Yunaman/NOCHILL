"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChromeLogo } from "@/components/three/ChromeLogo";
import { ProductCard } from "@/components/ui/ProductCard";
import { NextDrop } from "@/components/ui/NextDrop";
import { useProducts } from "@/hooks/useProducts";
import { useSettings } from "@/hooks/useSettings";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();
  const { settings } = useSettings();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

  const featuredProducts = products.filter(p => p.featured && !p.archived);

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 2 }}
            className="mb-6 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Drop 001 // Archive</span>
            <span className="text-[8px] uppercase tracking-[1em] text-white/20">{settings.introText}</span>
          </motion.div>

          <div className="h-64 w-full md:h-96">
            <ChromeLogo />
          </div>

          <div className="mt-8 overflow-hidden">
             <h1 className="text-huge reveal-text">{settings.heroText}</h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7, duration: 1 }}
            className="mt-12 text-sm font-bold tracking-[0.6em] md:text-xl text-white/60"
          >
            EST. ADDIS // WORLDWIDE
          </motion.p>
        </div>

        <div className="absolute bottom-12 left-12 hidden md:block">
           <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">BUILT DIFFERENT</span>
        </div>

        <div className="absolute bottom-12 right-12 hidden md:block text-right">
           <span className="text-[10px] uppercase tracking-widest text-white/20">NOCHILL NEVER SLEEPS.</span>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
           <div className="flex flex-col items-center gap-4">
             <div className="h-16 w-[1px] bg-gradient-to-b from-white to-transparent opacity-20" />
           </div>
        </div>
      </section>

      {/* Featured Showcase Section */}
      <section className="px-6 py-32 md:px-12 bg-[#050505]">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Selected Works</span>
            <h2 className="editorial-heading mt-6 uppercase reveal-text text-white">
              THE <br /> FEATURED <br /> ARCHIVE.
            </h2>
          </div>
          <div className="md:text-right">
             <p className="max-w-xs text-[10px] uppercase tracking-[0.2em] text-white/40 leading-relaxed">
               Hand-picked artifacts from the void. Every piece tells a story of the outsiders.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.33, 1, 0.68, 1] }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

          {/* Decorative Card */}
          <motion.div
             initial={{ y: 50, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3, duration: 1 }}
             viewport={{ once: true }}
             className="relative flex flex-col justify-center border border-white/5 p-12 aspect-[3/4]"
          >
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/20">Coordinate</span>
            <h3 className="mt-6 text-4xl font-bold tracking-tighter text-white/60">0.00°N <br /> 38.74°E</h3>
            <p className="mt-12 text-[10px] uppercase tracking-[0.4em] text-white/10 leading-loose">
              Born in Addis Ababa. <br />
              Forged in the shadows. <br />
              Global emergence imminent.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <div className="h-px w-12 bg-white/10" />
              <span className="text-[8px] uppercase tracking-[0.5em] text-white/20">No signal</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Drop System */}
      <NextDrop />

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="relative min-h-screen px-6 py-32 md:px-24 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-16">
            <h2 className="editorial-heading reveal-text uppercase text-white">
              WE AREN&apos;T <br /> FOR EVERYONE.
            </h2>
            <div className="space-y-8 max-w-md">
               <p className="text-white/40 leading-relaxed uppercase text-[10px] tracking-[0.4em]">
                 The underground is not a place, it is a state of mind. We create artifacts for those who live in the shadows.
               </p>
               <p className="text-white/60 leading-relaxed text-sm md:text-base">
                 NOCHILL is a luxury streetwear collective exploring the boundaries of cinema and fashion.
                 Every piece is a chapter. Every drop is a signal.
               </p>
            </div>
            <Link
              href="/shop"
              className="inline-block group"
            >
              <span className="text-xs font-bold tracking-[0.5em] uppercase transition-colors group-hover:text-white/40 text-white">
                Explore Shop
              </span>
              <div className="mt-2 h-px w-full bg-white transition-transform duration-500 scale-x-100 group-hover:scale-x-50 origin-left" />
            </Link>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden grayscale glass p-4 cinematic-shadow">
            <div className="relative h-full w-full overflow-hidden">
               <Image
                src="https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=1000"
                alt="Model"
                fill
                className="object-cover parallax-image scale-110"
              />
            </div>
            <div className="absolute top-8 right-8 mix-blend-difference">
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">001 / VOID</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-100 text-black">
        <h2 className="text-huge text-center reveal-text">ENTER THE VOID</h2>
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
