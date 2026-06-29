"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Settings, Clock, Image as ImageIcon, Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useSettings } from "@/hooks/useSettings";
import { fadeIn } from "@/lib/animations";

type AdminTab = "products" | "drops" | "settings" | "media";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const { products } = useProducts();
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Management Terminal</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white mt-4">ADMIN</h1>
          </div>
          <a
            href="https://nochill.sanity.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors"
          >
            <ExternalLink size={14} />
            Open Sanity Studio
          </a>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-8">
          {[
            { id: "products" as AdminTab, label: "Products", icon: Package },
            { id: "drops" as AdminTab, label: "Drops", icon: Clock },
            { id: "settings" as AdminTab, label: "Settings", icon: Settings },
            { id: "media" as AdminTab, label: "Media", icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] transition-all ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-white"
                  : "text-white/30 hover:text-white"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          key={activeTab}
        >
          {activeTab === "products" && <ProductsManagement products={products} />}
          {activeTab === "drops" && <DropsManagement />}
          {activeTab === "settings" && <SettingsManagement settings={settings} />}
          {activeTab === "media" && <MediaManagement />}
        </motion.div>
      </div>
    </div>
  );
}

function ProductsManagement({ products }: { products: any[] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Product Archive</h2>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors">
          <Plus size={14} />
          Add Product
        </button>
      </div>

      <div className="border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/[0.02]">
            <tr>
              {["Product", "Category", "Price", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-zinc-900 border border-white/5 flex items-center justify-center">
                      <span className="text-[8px] text-white/10 uppercase tracking-widest">IMG</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white">{product.name}</p>
                      <p className="text-[8px] text-white/30 mt-1">REF: {product.id.slice(-6)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[10px] text-white/60 uppercase tracking-[0.2em]">{product.category}</td>
                <td className="px-6 py-4 text-[10px] font-bold text-white">${product.price}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-[8px] font-bold uppercase tracking-widest bg-green-500/10 text-green-500 border border-green-500/20">
                    {product.status || "live"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                      <Edit size={14} className="text-white/40" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                      <Trash2 size={14} className="text-white/40" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DropsManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Drop Schedule</h2>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors">
          <Plus size={14} />
          Schedule Drop
        </button>
      </div>

      <div className="border border-white/5 p-8 bg-white/[0.02]">
        <div className="text-center py-12">
          <Clock size={48} className="text-white/10 mx-auto mb-4" />
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">No active drops scheduled</p>
          <p className="text-[8px] uppercase tracking-[0.4em] text-white/10 mt-2">Use Sanity Studio to manage drops</p>
        </div>
      </div>
    </div>
  );
}

function SettingsManagement({ settings }: { settings: any }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Brand Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 block mb-3">
              Hero Text
            </label>
            <input
              type="text"
              defaultValue={settings.heroText}
              className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 block mb-3">
              Intro Text
            </label>
            <input
              type="text"
              defaultValue={settings.introText}
              className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 block mb-3">
              Maintenance Mode
            </label>
            <div className="flex items-center gap-4">
              <button
                className={`px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors ${
                  settings.maintenanceMode
                    ? "bg-red-500 text-black"
                    : "bg-white/10 text-white/40 hover:bg-white/20"
                }`}
              >
                {settings.maintenanceMode ? "Active" : "Inactive"}
              </button>
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">
                Temporarily disable the site
              </span>
            </div>
          </div>

          <div className="p-6 border border-white/5 bg-white/[0.02]">
            <p className="text-[8px] uppercase tracking-[0.4em] text-white/20">
              Additional settings are managed in Sanity Studio. This interface provides quick access to common controls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Media Library</h2>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors">
          <Plus size={14} />
          Upload Image
        </button>
      </div>

      <div className="border border-white/5 p-8 bg-white/[0.02]">
        <div className="text-center py-12">
          <ImageIcon size={48} className="text-white/10 mx-auto mb-4" />
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">Media Library</p>
          <p className="text-[8px] uppercase tracking-[0.4em] text-white/10 mt-2">
            Upload and manage product images locally
          </p>
          <button className="mt-8 border border-white/20 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white hover:border-white transition-all">
            Browse Files
          </button>
        </div>
      </div>
    </div>
  );
}