"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Cart } from "@/components/ui/Cart";
import { SearchModal } from "@/components/ui/SearchModal";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Particles } from "@/components/ui/Particles";
import { useSettings } from "@/hooks/useSettings";
import { useUI } from "@/hooks/useUI";
import { motion, AnimatePresence } from "framer-motion";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { settings } = useSettings();
  const { isSearchOpen, closeSearch, toggleSearch } = useUI();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Force a slightly longer loading for the cinematic feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSearch]);

  if (!isMounted) return <div className="bg-black min-h-screen" />;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {settings.maintenanceMode ? (
            <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-8">
                 <div className="w-2 h-2 bg-red-500 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">Under Maintenance</h1>
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 max-w-xs">
                The void is currently recalibrating. Check back later for the next signal.
              </p>
              <div className="mt-12 text-[8px] font-mono text-white/10">
                REF: SIGNAL_INTERRUPTED_404
              </div>
            </div>
          ) : (
            <>
              <Particles />
              <CustomCursor />
              <Navbar />
              <Cart />
              <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
              <main>{children}</main>
            </>
          )}
        </motion.div>
      )}
    </ReactLenis>
  );
}
