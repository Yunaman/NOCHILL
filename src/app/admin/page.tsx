"use client";

import { useState } from "react";
import { PRODUCTS, NEXT_DROP } from "@/lib/data";
import { Product } from "@/types";
import {
  Trash2, Edit2, Plus, ArrowLeft, ExternalLink,
  Package, Calendar, User, Layout,
  Image as ImageIcon, CheckCircle, Archive
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = "STORE" | "DROP" | "BRAND" | "CEO";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("STORE");
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  // CEO / Brand Settings
  const [brandSettings, setBrandSettings] = useState({
    owner: "YUNA",
    heroText: "NOCHILL",
    introText: "A Vision by Yuna // No Signal Found",
    coordinates: "51.5074° N, 0.1278° W",
    maintenance: false,
    storeStatus: "ACTIVE"
  });

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = () => {
    if (!editForm.id) return;
    setProducts(products.map(p => p.id === editForm.id ? (editForm as Product) : p));
    setEditingId(null);
  };

  const handleRemove = (id: string) => {
    if (confirm("REMOVING ARTIFACT. ARE YOU SURE?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = String(Date.now());
    const newProduct: Product = {
      id: newId,
      name: "NEW ARTIFACT",
      price: 0,
      description: "NEW DESCRIPTION",
      category: "Apparel",
      images: ["https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000"],
      details: [],
      featured: false,
      variants: ["S", "M", "L", "XL"]
    };
    setProducts([newProduct, ...products]);
    handleEdit(newProduct);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-40 px-6 md:px-12">
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
        <div>
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors">
             <ArrowLeft size={14} /> Back to void
          </Link>
          <div className="flex items-center gap-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">ADMIN</h1>
            <div className="hidden md:flex gap-2">
               <span className="bg-white/10 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.4em]">v2.1.0</span>
               <span className="bg-white/10 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.4em] text-green-500">Live</span>
            </div>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Management System // Powered by Yuna</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-16 border-b border-white/5 pb-4">
        {[
          { id: "STORE", icon: Package, label: "Store" },
          { id: "DROP", icon: Calendar, label: "Drops" },
          { id: "BRAND", icon: Layout, label: "Brand" },
          { id: "CEO", icon: User, label: "CEO" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              "flex items-center gap-3 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] transition-all",
              activeTab === tab.id
                ? "bg-white text-black"
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "STORE" && (
          <motion.div
            key="store-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-bold tracking-tighter uppercase">Artifact Collection</h2>
               <button
                  onClick={handleAdd}
                  className="flex items-center gap-4 border border-white/20 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.5em] text-white hover:bg-white hover:text-black transition-all"
                >
                  <Plus size={16} /> New Artifact
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {products.map((product) => (
                <div key={product.id} className="glass flex flex-col md:flex-row gap-8 p-8 relative overflow-hidden group">
                  {editingId === product.id ? (
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Artifact Identity</label>
                          <input
                            className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none focus:border-white/40 text-lg font-bold"
                            value={editForm.name}
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                            placeholder="PRODUCT NAME"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Price (USD)</label>
                            <input
                              type="number"
                              className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none"
                              value={editForm.price}
                              onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Category</label>
                            <select
                              className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none appearance-none"
                              value={editForm.category}
                              onChange={e => setEditForm({...editForm, category: e.target.value})}
                            >
                               <option value="Apparel">APPAREL</option>
                               <option value="Accessories">ACCESSORIES</option>
                               <option value="Footwear">FOOTWEAR</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Product Story</label>
                          <textarea
                            rows={6}
                            className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none resize-none leading-relaxed"
                            value={editForm.description}
                            onChange={e => setEditForm({...editForm, description: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div>
                           <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Visual Assets</label>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="aspect-[3/4] bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 group cursor-pointer overflow-hidden relative">
                                 {editForm.images?.[0] ? (
                                    <Image src={editForm.images[0]} alt="Front" fill className="object-cover opacity-60" />
                                 ) : <ImageIcon size={24} className="text-white/20" />}
                                 <span className="text-[8px] uppercase tracking-widest text-white/40 relative z-10">Front View</span>
                              </div>
                              <div className="aspect-[3/4] bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 group cursor-pointer overflow-hidden relative">
                                 {editForm.images?.[1] ? (
                                    <Image src={editForm.images[1]} alt="Back" fill className="object-cover opacity-60" />
                                 ) : <ImageIcon size={24} className="text-white/20" />}
                                 <span className="text-[8px] uppercase tracking-widest text-white/40 relative z-10">Back View (Hover)</span>
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <label className={cn(
                            "flex items-center justify-center gap-3 p-4 border transition-all cursor-pointer",
                            editForm.featured ? "bg-white text-black border-white" : "border-white/10 text-white/40 hover:border-white/40"
                          )}>
                             <input type="checkbox" className="hidden" checked={editForm.featured} onChange={e => setEditForm({...editForm, featured: e.target.checked})} />
                             <CheckCircle size={14} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">Featured</span>
                          </label>
                          <label className="flex items-center justify-center gap-3 p-4 border border-white/10 text-white/40 hover:border-white/40 transition-all cursor-pointer">
                             <Archive size={14} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">Archive</span>
                          </label>
                        </div>

                        <div className="flex justify-end gap-4 pt-8">
                          <button onClick={() => setEditingId(null)} className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white">
                            Cancel
                          </button>
                          <button onClick={handleSave} className="bg-white px-12 py-4 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-zinc-200 transition-all">
                            Save Artifact
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative h-64 w-48 overflow-hidden bg-zinc-950 shrink-0">
                         <Image src={product.images[0]} alt={product.name} fill className="object-cover grayscale transition-all group-hover:grayscale-0" />
                         {product.featured && <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-[8px] font-bold uppercase tracking-widest">Featured</div>}
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                         <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-3">{product.category}</span>
                         <h3 className="text-5xl font-bold tracking-tighter uppercase leading-none">{product.name}</h3>
                         <div className="mt-6 flex items-center gap-6">
                            <span className="text-2xl font-bold text-white/80">${product.price}</span>
                            <div className="h-4 w-[1px] bg-white/10" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Sizes: {product.variants?.join(", ")}</span>
                         </div>
                         <p className="mt-8 text-xs text-white/40 leading-relaxed max-w-lg uppercase tracking-wider">{product.description}</p>
                      </div>
                      <div className="flex items-center gap-3 md:flex-col md:justify-center">
                         <button onClick={() => handleEdit(product)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-white/60 hover:text-white">
                            <Edit2 size={20} />
                         </button>
                         <button onClick={() => handleRemove(product.id)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-red-950/20 transition-all flex items-center justify-center text-white/40 hover:text-red-500">
                            <Trash2 size={20} />
                         </button>
                         <Link href={`/product/${product.id}`} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-white/40 hover:text-white">
                            <ExternalLink size={20} />
                         </Link>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "DROP" && (
           <motion.div
             key="drop-tab"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="max-w-4xl space-y-12"
           >
              <h2 className="text-2xl font-bold tracking-tighter uppercase">Drop Management</h2>
              <div className="glass p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Drop Identity</label>
                      <input
                        className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none focus:border-white/40 text-lg font-bold"
                        defaultValue={NEXT_DROP.title}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Target Date</label>
                      <input
                        type="datetime-local"
                        className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none"
                        defaultValue={NEXT_DROP.date.split('.')[0]}
                      />
                    </div>
                    <div className="flex items-center gap-6">
                       <button className="flex-1 bg-white text-black py-4 text-[10px] font-bold uppercase tracking-[0.5em]">Activate Signal</button>
                       <button className="flex-1 border border-white/10 text-white/40 py-4 text-[10px] font-bold uppercase tracking-[0.5em] hover:text-white hover:border-white/40 transition-all">Deactivate</button>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div>
                       <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Teaser Visual</label>
                       <div className="aspect-video relative overflow-hidden bg-zinc-950 border border-white/10 group cursor-pointer">
                          <Image src={NEXT_DROP.image} alt="Teaser" fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <ImageIcon size={32} />
                          </div>
                       </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Short Signal (Description)</label>
                      <textarea
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none resize-none leading-relaxed"
                        defaultValue={NEXT_DROP.description}
                      />
                    </div>
                 </div>
              </div>
           </motion.div>
        )}

        {activeTab === "BRAND" && (
           <motion.div
             key="brand-tab"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="max-w-4xl space-y-12"
           >
              <h2 className="text-2xl font-bold tracking-tighter uppercase">Brand Identity</h2>
              <div className="glass p-12 space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Hero Headliner</label>
                      <input className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none font-bold" value={brandSettings.heroText} onChange={e => setBrandSettings({...brandSettings, heroText: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Intro Cinematic Text</label>
                      <input className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none" value={brandSettings.introText} onChange={e => setBrandSettings({...brandSettings, introText: e.target.value})} />
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 mb-6 block uppercase">Global Signatures</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <span className="text-[9px] uppercase tracking-widest text-white/20 mb-3 block">Signature A</span>
                          <p className="text-xs font-bold">EST. ADDIS // WORLDWIDE</p>
                       </div>
                       <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <span className="text-[9px] uppercase tracking-widest text-white/20 mb-3 block">Signature B</span>
                          <p className="text-xs font-bold">BUILT DIFFERENT</p>
                       </div>
                       <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                          <span className="text-[9px] uppercase tracking-widest text-white/20 mb-3 block">Signature C</span>
                          <p className="text-xs font-bold">NOCHILL NEVER SLEEPS.</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 flex justify-end">
                    <button className="bg-white text-black px-12 py-4 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-zinc-200 transition-all">Update Identity</button>
                 </div>
              </div>
           </motion.div>
        )}

        {activeTab === "CEO" && (
           <motion.div
             key="ceo-tab"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="max-w-4xl space-y-12"
           >
              <h2 className="text-2xl font-bold tracking-tighter uppercase">CEO Settings</h2>
              <div className="glass p-12">
                 <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                    <div className="w-32 h-32 rounded-full border border-white/20 overflow-hidden relative group cursor-pointer bg-zinc-900 flex items-center justify-center">
                       <User size={40} className="text-white/20" />
                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <ImageIcon size={20} />
                       </div>
                    </div>
                    <div className="flex-1 space-y-8 w-full">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Admin Operator</label>
                            <input className="w-full bg-white/5 border border-white/10 p-5 text-white outline-none font-bold" value={brandSettings.owner} />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Store Instance Status</label>
                            <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10">
                               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                               <span className="text-[10px] font-bold uppercase tracking-widest">{brandSettings.storeStatus}</span>
                            </div>
                          </div>
                       </div>

                       <div className="space-y-6 pt-4">
                          <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10">
                             <div className="space-y-1">
                                <p className="text-xs font-bold uppercase tracking-widest">Maintenance Mode</p>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest">Lock access to store for updates</p>
                             </div>
                             <button className="w-16 h-8 bg-zinc-800 rounded-full relative p-1 transition-all">
                                <div className="w-6 h-6 bg-white/20 rounded-full" />
                             </button>
                          </div>
                          <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10">
                             <div className="space-y-1">
                                <p className="text-xs font-bold uppercase tracking-widest">Theme Accent</p>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest">Current: MONOCHROME</p>
                             </div>
                             <div className="flex gap-2">
                                <div className="w-8 h-8 bg-white border border-white/20 rounded-sm" />
                                <div className="w-8 h-8 bg-zinc-900 border border-white/20 rounded-sm" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
