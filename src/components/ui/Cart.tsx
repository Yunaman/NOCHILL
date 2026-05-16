"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="fixed top-0 right-0 z-[80] h-full w-full bg-black md:w-[450px]"
          >
            <div className="flex h-full flex-col p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <h2 className="text-xl font-bold tracking-tighter uppercase">Your Bag</h2>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm text-white/40 uppercase tracking-widest">Bag is empty</p>
                  <button
                    onClick={onClose}
                    className="mt-6 border border-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Subtotal</span>
                  <span className="text-lg font-medium">$0.00</span>
                </div>
                <button className="mt-6 w-full bg-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black hover:bg-zinc-200 transition-colors">
                  Checkout Now
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
