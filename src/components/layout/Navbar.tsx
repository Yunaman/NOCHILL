"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "SHOP", href: "/shop" },
  { name: "DROPS", href: "/collections" },
  { name: "ARCHIVE", href: "/archive" },
  { name: "ABOUT", href: "/contact" },
];

interface NavbarProps {
  onOpenCart?: () => void;
}

export function Navbar({ onOpenCart }: NavbarProps) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-8 left-1/2 z-[100] w-full -translate-x-1/2 px-6 md:w-auto">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 5.5, duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="glass relative flex items-center justify-between gap-2 rounded-full px-4 py-2 backdrop-blur-2xl md:gap-8 md:px-8 md:py-3"
      >
        {/* Home / Signature */}
        <Link
          href="/"
          className="flex items-center gap-4 group"
          onMouseEnter={() => setHovered("HOME")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-white/10">
            <Home size={14} className="text-white/60 group-hover:text-white" />
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-[8px] font-bold tracking-[0.4em] text-white/30 uppercase">
              NOCHILL // YUNA
            </span>
          </div>
        </Link>

        <div className="mx-2 hidden h-4 w-[1px] bg-white/10 md:block" />

        {/* Links */}
        <div className="flex items-center gap-1 md:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHovered(link.name)}
                onMouseLeave={() => setHovered(null)}
                className="group relative px-3 py-2 md:px-4"
              >
                <span
                  className={cn(
                    "relative z-10 text-[9px] font-bold tracking-[0.3em] transition-colors duration-300 md:text-[10px]",
                    isActive ? "text-white" : "text-white/40 group-hover:text-white"
                  )}
                >
                  {link.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 z-0 rounded-full bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <AnimatePresence>
                  {hovered === link.name && !isActive && (
                    <motion.div
                      layoutId="nav-hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-0 rounded-full bg-white/[0.03]"
                    />
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

        <div className="mx-2 h-4 w-[1px] bg-white/10 md:mx-4" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
          >
            <Search size={14} className="text-white/60" />
          </button>

          <button
            onClick={onOpenCart}
            className="group relative flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 transition-all hover:bg-white/10 md:px-6"
          >
            <ShoppingCart size={14} className="text-white/60 group-hover:text-white" />
            <span className="hidden text-[10px] font-bold tracking-widest text-white/60 group-hover:text-white lg:block">
              CART
            </span>
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
