"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-32 px-6 md:px-12 pb-24 flex items-center">
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Transmission</span>
          <h1 className="text-huge mt-4 mb-12">CONTACT</h1>

          <div className="space-y-12">
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase mb-4">Direct Signal</h3>
              <p className="text-2xl font-bold tracking-tight">void@nochill.com</p>
            </div>

            <div>
              <h3 className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase mb-4">Coordinates</h3>
              <p className="text-sm tracking-widest text-white/80">
                51.5074° N, 0.1278° W<br />
                LONDON, UK
              </p>
            </div>

            <div className="flex gap-8">
               <span className="text-[10px] font-bold uppercase tracking-widest hover:text-white/40 cursor-pointer transition-colors">Instagram</span>
               <span className="text-[10px] font-bold uppercase tracking-widest hover:text-white/40 cursor-pointer transition-colors">Discord</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 md:p-12"
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40">Identification</label>
              <input
                type="text"
                placeholder="NAME"
                className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40">Freqency</label>
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40">Transmission</label>
              <textarea
                rows={4}
                placeholder="MESSAGE"
                className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            <button className="w-full py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.8em] hover:bg-zinc-200 transition-colors">
              Send Signal
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
