"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChromeLogo } from "@/components/three/ChromeLogo";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          <div className="absolute inset-0 opacity-20">
             <ChromeLogo />
          </div>

          <div className="z-10 flex flex-col items-center">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className="text-4xl font-bold tracking-[0.3em] md:text-7xl"
              >
                NOCHILL
              </motion.h1>
            </div>

            <div className="mt-12 h-[1px] w-64 bg-white/10">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="mt-8 h-20 overflow-hidden text-center">
              <AnimatePresence mode="wait">
                {!isReady ? (
                  <motion.p
                    key="loading"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="font-mono text-[10px] uppercase tracking-widest text-white/40"
                  >
                    Calibrating void... {progress}%
                  </motion.p>
                ) : (
                  <motion.button
                    key="start"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onClick={handleStart}
                    className="group flex flex-col items-center"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">
                      ENTER THE VOID
                    </span>
                    <div className="mt-2 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 text-[10px] uppercase tracking-[0.5em] text-white/20"
          >
            Built for the outsiders
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
