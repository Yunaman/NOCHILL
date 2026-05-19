"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useUI } from "@/hooks/useUI";

const NAV_LINKS = [
  { name: "SHOP", href: "/shop" },
  { name: "DROPS", href: "/collections" },
  { name: "ARCHIVE", href: "/archive" },
  { name: "ABOUT", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, items } = useCart();
  const { toggleSearch } = useUI();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="fixed bottom-8 left-1/2 z-[100] w-full -translate-x-1/2 px-6 md:w-auto">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 5.5, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="glass relative flex items-center justify-between gap-2 rounded-full px-4 py-2 backdrop-blur-2xl md:gap-8 md:px-8 md:py-3 border border-white/5"
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

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex md:gap-2">
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

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 md:hidden"
          >
            <Menu size={14} className="text-white/60" />
          </button>

          <div className="mx-2 h-4 w-[1px] bg-white/10 md:mx-4" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSearch}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
            >
              <Search size={14} className="text-white/60" />
            </button>

            <button
              onClick={toggleCart}
              className="group relative flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 transition-all hover:bg-white/10 md:px-6"
            >
              <ShoppingBag size={14} className="text-white/60 group-hover:text-white" />
              <span className="hidden text-[10px] font-bold tracking-widest text-white/60 group-hover:text-white lg:block">
                BAG
              </span>
              {cartCount > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black p-12 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-12 right-12 p-4"
            >
              <X size={24} className="text-white/40" />
            </button>

            <div className="flex flex-col items-center gap-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold tracking-tighter uppercase text-white"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-12 bg-white/10 my-8" />
              <Link
                 href="/admin"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase"
              >
                Access Terminal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
