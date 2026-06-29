"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { ArrowLeft, Lock, CreditCard, Truck } from "lucide-react";
import Link from "next/link";
import { fadeIn } from "@/lib/animations";

export default function CheckoutPage() {
  const { items, getTotal, toggleCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("ORDER PLACED SUCCESSFULLY");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter uppercase text-white mb-4">Your bag is empty</h2>
          <Link
            href="/shop"
            className="inline-block border border-white/20 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.5em] text-white hover:bg-white hover:text-black transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12">
      <Link
        href="/shop"
        className="mb-12 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} /> Continue Shopping
      </Link>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Secure Checkout</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white mt-4">CHECKOUT</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <motion.div
            className="lg:col-span-8"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Contact */}
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em] md:col-span-2"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                  />
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    maxLength={19}
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                  />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM / YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                      maxLength={5}
                      className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      maxLength={4}
                      className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-white py-6 text-[10px] font-bold uppercase tracking-[0.5em] text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Complete Order — ${getTotal().toFixed(2)}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 text-[8px] uppercase tracking-[0.4em] text-white/20">
                <div className="flex items-center gap-2">
                  <Lock size={10} />
                  <span>Secure SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={10} />
                  <span>Express Shipping</span>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-4"
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <div className="sticky top-32 space-y-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Order Summary</h2>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="relative aspect-[3/4] w-20 overflow-hidden bg-zinc-900 border border-white/5">
                      <div className="absolute inset-0 flex items-center justify-center text-white/10 text-[8px] uppercase tracking-widest">
                        IMG
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">{item.name}</h3>
                      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/40">
                        Size: {item.selectedSize} × {item.quantity}
                      </p>
                      <p className="mt-2 text-sm font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Subtotal</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Shipping</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white">Total</span>
                  <span className="text-2xl font-bold text-white">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="p-6 border border-white/5 bg-white/[0.02]">
                <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 leading-relaxed">
                  By completing this purchase, you agree to our terms of service. All orders are processed securely and shipped worldwide.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
