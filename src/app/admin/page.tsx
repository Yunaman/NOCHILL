"use client";

import { useState } from "react";
import { PRODUCTS, NEXT_DROP } from "@/lib/data";
import { Product } from "@/types";
import { Trash2, Edit2, Plus, ArrowLeft, Save, X, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

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
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">ADMIN</h1>
          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-white/20">Archive Management System // Local Instance</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-4 bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.5em] text-black hover:bg-zinc-200 transition-colors"
        >
          <Plus size={16} /> Add Artifact
        </button>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {products.map((product) => (
          <div key={product.id} className="glass flex flex-col md:flex-row gap-8 p-8 relative overflow-hidden">
             {editingId === product.id ? (
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Name</label>
                      <input
                        className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-white/40"
                        value={editForm.name}
                        onChange={e => setEditForm({...editForm, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Price ($)</label>
                        <input
                          type="number"
                          className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none"
                          value={editForm.price}
                          onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Category</label>
                        <input
                          className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none"
                          value={editForm.category}
                          onChange={e => setEditForm({...editForm, category: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Description</label>
                      <textarea
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none"
                        value={editForm.description}
                        onChange={e => setEditForm({...editForm, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 py-4">
                       <input
                         type="checkbox"
                         id={`featured-${product.id}`}
                         checked={editForm.featured}
                         onChange={e => setEditForm({...editForm, featured: e.target.checked})}
                         className="h-4 w-4 accent-white"
                       />
                       <label htmlFor={`featured-${product.id}`} className="text-[10px] uppercase tracking-widest text-white/60">Featured on Homepage</label>
                    </div>
                    <div className="flex justify-end gap-4 pt-8">
                       <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white">
                         <X size={14} /> Cancel
                       </button>
                       <button onClick={handleSave} className="flex items-center gap-2 bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-black">
                         <Save size={14} /> Save Changes
                       </button>
                    </div>
                  </div>
               </div>
             ) : (
               <>
                 <div className="relative h-48 w-36 overflow-hidden bg-zinc-900 shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover grayscale" />
                 </div>
                 <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-2">
                       <span className="text-[10px] uppercase tracking-widest text-white/20">{product.category}</span>
                       {product.featured && <span className="bg-white/10 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">Featured</span>}
                    </div>
                    <h3 className="text-4xl font-bold tracking-tighter uppercase">{product.name}</h3>
                    <p className="text-xl font-medium mt-2">${product.price}</p>
                 </div>
                 <div className="flex items-center gap-4 md:flex-col md:justify-center">
                    <button onClick={() => handleEdit(product)} className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                       <Edit2 size={20} />
                    </button>
                    <button onClick={() => handleRemove(product.id)} className="p-4 rounded-full bg-white/5 hover:bg-red-900/20 transition-colors text-white/60 hover:text-red-500">
                       <Trash2 size={20} />
                    </button>
                    <Link href={`/product/${product.id}`} className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                       <ExternalLink size={20} />
                    </Link>
                 </div>
               </>
             )}
          </div>
        ))}
      </div>

      <section className="mt-40 pt-20 border-t border-white/10">
         <h2 className="text-4xl font-bold tracking-tighter uppercase mb-12">HYPE SYSTEM</h2>
         <div className="glass p-12 max-w-2xl">
            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-8 block">Next Drop Countdown</span>
            <div className="space-y-6">
               <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Release Title</label>
                  <input
                    className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none"
                    value={NEXT_DROP.title}
                    readOnly
                  />
               </div>
               <div className="bg-white/5 p-6 border border-dashed border-white/10 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/20">Hype configuration is managed in lib/data.ts currently.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
