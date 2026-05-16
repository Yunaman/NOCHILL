"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChromeLogo } from "@/components/three/ChromeLogo";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 5 second total duration
    const totalDuration = 5000;
    const intervalTime = 30;
    const increment = (100 / (totalDuration / intervalTime));

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Auto-transition after progress reaches 100%
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100001] flex flex-col items-center justify-center bg-black px-6 text-center"
        >
          {/* Subtle 3D background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <ChromeLogo />
          </div>

          <div className="z-10 flex flex-col items-center max-w-md w-full">
            <div className="overflow-hidden mb-12">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className="text-4xl font-bold tracking-[0.5em] md:text-7xl uppercase"
              >
                NOCHILL
              </motion.h1>
            </div>

            {/* Progress Bar Container */}
            <div className="relative h-[2px] w-full max-w-[280px] bg-white/5 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[9px] uppercase tracking-[0.6em] text-white/30"
              >
                Initialising Archive
              </motion.span>
              <span className="font-mono text-[10px] text-white/60 tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Bottom Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
          >
            <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
            <span className="text-[9px] uppercase tracking-[0.8em] text-white/20 font-bold">
              Worldwide Signal Found
            </span>
          </motion.div>

          {/* Noise overlay specific to loader for cinematic feel */}
          <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
