"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";

export function Cart() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="fixed top-0 right-0 z-[160] h-full w-full bg-[#050505] md:w-[500px] border-l border-white/5"
          >
            <div className="flex h-full flex-col p-6 md:p-12">
              <div className="flex items-center justify-between border-b border-white/10 pb-8">
                <div className="flex items-center gap-4">
                   <ShoppingBag size={20} className="text-white/40" />
                   <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Your Bag</h2>
                </div>
                <button onClick={toggleCart} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                  <X size={24} className="text-white/40 group-hover:text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 custom-scrollbar">
                {items.length > 0 ? (
                  <div className="space-y-8">
                    <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.selectedSize}`}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="flex gap-6 border-b border-white/5 pb-8"
                      >
                        <div className="relative aspect-[3/4] w-24 overflow-hidden bg-zinc-900 border border-white/5">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover grayscale"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">{item.name}</h3>
                              <span className="text-sm font-bold text-white">${item.price}</span>
                            </div>
                            <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/40">
                              Size: {item.selectedSize} — Ref: {item.id.slice(-4)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-white/10">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 text-white/40 hover:text-white"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-[10px] font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 text-white/40 hover:text-white"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-white/20 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-8 h-12 w-12 border border-white/5 rounded-full flex items-center justify-center">
                       <div className="h-2 w-2 bg-white/10 rounded-full" />
                    </div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.5em]">The bag is empty</p>
                    <button
                      onClick={toggleCart}
                      className="mt-8 border border-white/10 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white hover:border-white transition-all"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-white/10 pt-10">
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Shipping</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Calculated at checkout</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Subtotal</span>
                      <span className="text-2xl font-bold text-white">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={toggleCart}
                    className="block w-full bg-white py-6 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-black hover:bg-zinc-200 transition-colors"
                  >
                    Proceed to checkout
                  </Link>
                  <p className="mt-6 text-center text-[8px] uppercase tracking-[0.4em] text-white/10">
                    Worldwide express delivery
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
