"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";
import Image from "next/image";

export function NextDrop() {
  const { settings } = useSettings();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(settings.dropDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.dropDate]);

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-black py-32 px-6 flex flex-col items-center justify-center">
      {/* Background Teaser */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src={settings.dropImage}
          alt="Next Drop Teaser"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40">
            Signal Detected
          </span>
          <h2 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase text-white">
            NEXT DROP
          </h2>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-7xl font-bold tracking-tighter tabular-nums text-white">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.4em] text-white/20">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 space-y-8"
        >
          <div className="flex flex-col items-center gap-4">
             <span className="text-[10px] uppercase tracking-[0.6em] text-white/60 font-bold">
               {settings.dropTitle}
             </span>
             <p className="max-w-xs text-[10px] uppercase tracking-[0.2em] text-white/40 leading-relaxed">
               {settings.dropDescription}
             </p>
          </div>

          <button className="group relative overflow-hidden rounded-full border border-white/10 px-12 py-4 transition-all hover:border-white/40">
             <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.5em] text-white">
               Notify Me
             </span>
             <motion.div
               className="absolute inset-0 bg-white/5"
               initial={{ x: "-100%" }}
               whileHover={{ x: 0 }}
               transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
             />
          </button>
        </motion.div>
      </div>

      {/* Decorative details */}
      <div className="absolute bottom-12 left-12 hidden md:block">
         <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">
           Ref: DROP_INCOMING_002
         </span>
      </div>
    </section>
  );
}
