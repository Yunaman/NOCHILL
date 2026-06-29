"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Settings, Clock, Image as ImageIcon, Plus, Edit, Trash2, ExternalLink, LogOut, Search, Filter, Users, FileText, BarChart3, X, Check, AlertCircle } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useSettings } from "@/hooks/useSettings";
import { fadeIn } from "@/lib/animations";
import { useRouter } from "next/navigation";
import { isSanityConfigured, getSanityErrorMessage } from "@/lib/sanity";

type AdminTab = "overview" | "products" | "content" | "users" | "analytics" | "settings" | "media";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const { products } = useProducts();
  const { settings } = useSettings();
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">Management Terminal</span>
            <h1 className="text-2xl font-bold tracking-tighter uppercase text-white">ADMIN</h1>
          </div>
          <div className="flex items-center gap-4">
            {isSanityConfigured() ? (
              <a
                href="https://nochill.sanity.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                Sanity Studio
              </a>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                <AlertCircle size={12} className="text-yellow-500" />
                <span className="text-[8px] uppercase tracking-[0.3em] text-yellow-500">Sanity not configured</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-red-400 transition-colors"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-6">
          {[
            { id: "overview" as AdminTab, label: "Overview", icon: BarChart3 },
            { id: "products" as AdminTab, label: "Products", icon: Package },
            { id: "content" as AdminTab, label: "Content", icon: FileText },
            { id: "users" as AdminTab, label: "Users", icon: Users },
            { id: "analytics" as AdminTab, label: "Analytics", icon: BarChart3 },
            { id: "settings" as AdminTab, label: "Settings", icon: Settings },
            { id: "media" as AdminTab, label: "Media", icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all rounded-full ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "text-white/30 hover:text-white hover:bg-white/5"
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
          {activeTab === "overview" && <OverviewDashboard products={products} />}
          {activeTab === "products" && <ProductsManagement products={products} showNotification={showNotification} />}
          {activeTab === "content" && <ContentManagement showNotification={showNotification} />}
          {activeTab === "users" && <UsersManagement showNotification={showNotification} />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "settings" && <SettingsManagement settings={settings} showNotification={showNotification} />}
          {activeTab === "media" && <MediaManagement showNotification={showNotification} />}
        </motion.div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg ${
              notification.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"
            } text-[10px] font-bold uppercase tracking-[0.3em] z-[1000]`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OverviewDashboard({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="border border-white/10 p-6 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <Package size={20} className="text-white/40" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Total</span>
        </div>
        <p className="text-4xl font-bold tracking-tighter text-white">{products.length}</p>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">Products</p>
      </div>

      <div className="border border-white/10 p-6 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <Users size={20} className="text-white/40" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Active</span>
        </div>
        <p className="text-4xl font-bold tracking-tighter text-white">1.2K</p>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">Users</p>
      </div>

      <div className="border border-white/10 p-6 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <BarChart3 size={20} className="text-white/40" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Revenue</span>
        </div>
        <p className="text-4xl font-bold tracking-tighter text-white">$24K</p>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">This Month</p>
      </div>

      <div className="border border-white/10 p-6 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <Clock size={20} className="text-white/40" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Pending</span>
        </div>
        <p className="text-4xl font-bold tracking-tighter text-white">8</p>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">Orders</p>
      </div>
    </div>
  );
}

function ProductsManagement({ products, showNotification }: { products: any[]; showNotification: (type: "success" | "error", message: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "live" | "archived">("all");

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "live" && !p.archived) || (filter === "archived" && p.archived);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Product Archive</h2>
        <button 
          onClick={() => showNotification("success", "Product creation modal opened")}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border border-white/10 pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
          />
        </div>
        <div className="flex gap-2">
          {["all", "live", "archived"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${
                filter === f ? "bg-white text-black" : "bg-white/5 text-white/40 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
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
            {filteredProducts.map((product) => (
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
                  <span className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest border ${
                    product.archived 
                      ? "bg-red-500/10 text-red-500 border-red-500/20" 
                      : "bg-green-500/10 text-green-500 border-green-500/20"
                  }`}>
                    {product.archived ? "archived" : "live"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => showNotification("success", "Edit mode activated")}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                      <Edit size={14} className="text-white/40" />
                    </button>
                    <button 
                      onClick={() => showNotification("error", "Delete confirmation required")}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
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

function ContentManagement({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) {
  const [posts] = useState([
    { id: 1, title: "Summer Collection Launch", status: "published", date: "2024-06-15" },
    { id: 2, title: "Behind the Scenes: Addis Studio", status: "draft", date: "2024-06-10" },
    { id: 3, title: "New Drop Announcement", status: "scheduled", date: "2024-06-20" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Content Management</h2>
        <button 
          onClick={() => showNotification("success", "New post editor opened")}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors"
        >
          <Plus size={14} />
          New Post
        </button>
      </div>

      <div className="border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/[0.02]">
            <tr>
              {["Title", "Status", "Date", "Actions"].map((header) => (
                <th key={header} className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest border ${
                    post.status === "published" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    post.status === "draft" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                    "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[10px] text-white/60">{post.date}</td>
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

function UsersManagement({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) {
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "customer", joined: "2024-05-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin", joined: "2024-04-20" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">User Management</h2>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors">
          <Plus size={14} />
          Add User
        </button>
      </div>

      <div className="border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/[0.02]">
            <tr>
              {["Name", "Email", "Role", "Joined", "Actions"].map((header) => (
                <th key={header} className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white">{user.name}</td>
                <td className="px-6 py-4 text-[10px] text-white/60">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest border ${
                    user.role === "admin" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" : "bg-white/10 text-white/60 border-white/20"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-[10px] text-white/60">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                      <Edit size={14} className="text-white/40" />
                    </button>
                    <button 
                      onClick={() => showNotification("error", "User deletion requires confirmation")}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
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

function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Analytics Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border border-white/10 p-6 bg-white/[0.02]">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-4">Page Views</h3>
          <p className="text-3xl font-bold tracking-tighter text-white">45.2K</p>
          <p className="text-[8px] uppercase tracking-[0.4em] text-green-400 mt-2">+12% from last week</p>
        </div>
        
        <div className="border border-white/10 p-6 bg-white/[0.02]">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-4">Unique Visitors</h3>
          <p className="text-3xl font-bold tracking-tighter text-white">12.8K</p>
          <p className="text-[8px] uppercase tracking-[0.4em] text-green-400 mt-2">+8% from last week</p>
        </div>
        
        <div className="border border-white/10 p-6 bg-white/[0.02]">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-4">Conversion Rate</h3>
          <p className="text-3xl font-bold tracking-tighter text-white">3.2%</p>
          <p className="text-[8px] uppercase tracking-[0.4em] text-red-400 mt-2">-1% from last week</p>
        </div>
      </div>

      <div className="border border-white/10 p-8 bg-white/[0.02]">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-6">Traffic Sources</h3>
        <div className="space-y-4">
          {[
            { source: "Direct", value: 45, color: "bg-white" },
            { source: "Social Media", value: 30, color: "bg-white/60" },
            { source: "Organic Search", value: 15, color: "bg-white/40" },
            { source: "Referral", value: 10, color: "bg-white/20" },
          ].map((item) => (
            <div key={item.source} className="flex items-center gap-4">
              <span className="w-32 text-[10px] uppercase tracking-[0.3em] text-white/60">{item.source}</span>
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
              </div>
              <span className="text-[10px] font-bold text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsManagement({ settings, showNotification }: { settings: any; showNotification: (type: "success" | "error", message: string) => void }) {
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
                onClick={() => showNotification("success", "Maintenance mode toggled")}
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

function MediaManagement({ showNotification }: { showNotification: (type: "success" | "error", message: string) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tighter uppercase text-white">Media Library</h2>
        <button 
          onClick={() => showNotification("success", "Upload dialog opened")}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-colors"
        >
          <Plus size={14} />
          Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="aspect-square border border-white/5 bg-white/[0.02] flex items-center justify-center group hover:border-white/20 transition-colors cursor-pointer">
            <div className="text-center">
              <ImageIcon size={24} className="text-white/10 mx-auto mb-2" />
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Image {i}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}