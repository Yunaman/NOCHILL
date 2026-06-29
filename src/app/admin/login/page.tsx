"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fadeIn } from "@/lib/animations";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="w-full max-w-md"
      >
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to site
        </Link>

        <div className="border border-white/10 p-8 md:p-12 bg-white/[0.02]">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Lock size={24} className="text-white/40" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase text-white mb-2">
              Admin Access
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 block mb-3">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em]"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 block mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border border-white/10 px-6 py-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors text-[10px] uppercase tracking-[0.2em] pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] uppercase tracking-[0.2em]"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white py-4 text-[10px] font-bold uppercase tracking-[0.5em] text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[8px] uppercase tracking-[0.4em] text-white/10">
              Secure authentication • Session protected
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
