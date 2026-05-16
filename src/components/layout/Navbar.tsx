"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "SHOP", href: "/shop" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "ARCHIVE", href: "/archive" },
  { name: "CONTACT", href: "/contact" },
];

interface NavbarProps {
  onOpenCart?: () => void;
}

export function Navbar({ onOpenCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-6 transition-all duration-500 md:px-12",
          scrolled ? "bg-black/80 py-4 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <Link href="/" className="text-xl font-bold tracking-tighter">
          NOCHILL
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold tracking-widest text-white/60 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenCart} className="p-2 transition-transform hover:scale-110">
              <ShoppingCart size={20} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="text-[10px] font-bold tracking-widest hover:opacity-60 transition-opacity"
            >
              MENU
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-black p-6 md:p-12"
          >
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                Navigation
              </span>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-500">
                <X size={32} />
              </button>
            </div>

            <div className="mt-24 flex flex-col gap-6">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-6xl font-bold tracking-tighter hover:text-white/40 transition-colors md:text-8xl"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex justify-between border-t border-white/10 pt-8">
              <div className="flex gap-8">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Instagram</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Twitter</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/40">© 2024 NOCHILL</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
