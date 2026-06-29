"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

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

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Desktop Navigation - Bottom Floating */}
      <div className="fixed bottom-8 left-1/2 z-[100] w-full -translate-x-1/2 px-6 md:w-auto hidden md:block">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.76, 0, 0.24, 1] }}
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
            <div className="flex flex-col">
              <span className="text-[8px] font-bold tracking-[0.4em] text-white/30 uppercase">
                NOCHILL // YUNA
              </span>
            </div>
          </Link>

          <div className="mx-2 h-4 w-[1px] bg-white/10" />

          {/* Desktop Links */}
          <div className="flex items-center gap-2">
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
                      "relative z-10 text-[10px] font-bold tracking-[0.3em] transition-colors duration-300",
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

          <div className="mx-2 h-4 w-[1px] bg-white/10" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              aria-label="Search"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
            >
              <Search size={14} className="text-white/60" />
            </button>

            <button
              onClick={toggleCart}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="group relative flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 transition-all hover:bg-white/10 md:px-6"
            >
              <ShoppingBag size={14} className="text-white/60 group-hover:text-white" />
              <span className="text-[10px] font-bold tracking-widest text-white/60 group-hover:text-white">
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

      {/* Mobile Navigation - Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:hidden">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center justify-between"
        >
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-white/10 border border-white/5">
              <Home size={16} className="text-white/60 group-hover:text-white" />
            </div>
            <span className="text-[8px] font-bold tracking-[0.4em] text-white/30 uppercase">
              NOCHILL
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 border border-white/5"
            >
              <ShoppingBag size={16} className="text-white/60" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10 border border-white/5"
            >
              {isMobileMenuOpen ? (
                <X size={16} className="text-white/60" />
              ) : (
                <Menu size={16} className="text-white/60" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-5xl font-bold tracking-tighter uppercase transition-colors",
                      pathname === link.href ? "text-white" : "text-white/40 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex flex-col items-center gap-6"
            >
              <div className="h-px w-16 bg-white/10" />
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase hover:text-white/40 transition-colors"
              >
                Access Terminal
              </Link>
              <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">
                EST. ADDIS // WORLDWIDE
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
