"use client";
// src/components/product/ProductCard.tsx

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
  type Variants,
} from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
export type ProductStatus = "live" | "low" | "sold";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  imageUrlHover?: string; // optional second image shown on hover
  imageAlt?: string;
  dropNumber: number;
  dropTotal: number;
  status: ProductStatus;
  collection?: string;
  priority?: boolean;
  className?: string;
  onQuickAdd?: (id: string) => void; // fires when quick-add is tapped
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(amount);
  return formatted.replace(/^£/, "£\u202F");
}

function formatDropNumber(n: number, total: number): string {
  return `${String(n).padStart(3, "0")} / ${String(total).padStart(3, "0")}`;
}

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS: Record<
  ProductStatus,
  { label: string; color: string; dotColor: string }
> = {
  live: { label: "Live",       color: "#4ADE80", dotColor: "#4ADE80" },
  low:  { label: "Low Stock",  color: "#F59E0B", dotColor: "#F59E0B" },
  sold: { label: "Sold Out",   color: "#EF4444", dotColor: "#EF4444" },
};

// ── Animation variants ────────────────────────────────────────────────────────
const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridVariants: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.2,  ease: [0.76, 0, 0.24, 1] } },
};

const quickAddVariants: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: { duration: 0.18, ease: [0.76, 0, 0.24, 1] },
  },
};

const hoverImageVariants: Variants = {
  hidden:  { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
  },
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col" aria-hidden="true">
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "3/4", backgroundColor: "#0F0F0F" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #0F0F0F 0%, #1F1F1F 50%, #0F0F0F 100%)",
            backgroundSize: "200% 100%",
            animation: "nc-shimmer 1.8s linear infinite",
          }}
        />
      </div>
      <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 9,  width: "40%", backgroundColor: "#161616", borderRadius: 1 }} />
        <div style={{ height: 16, width: "75%", backgroundColor: "#161616", borderRadius: 1 }} />
      </div>
      <style>{`
        @keyframes nc-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  );
}

// ── ProductCard ───────────────────────────────────────────────────────────────
export function ProductCard({
  id,
  slug,
  name,
  price,
  imageUrl,
  imageUrlHover,
  imageAlt,
  dropNumber,
  dropTotal,
  status,
  collection,
  priority = false,
  className = "",
  onQuickAdd,
}: ProductCardProps) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLButtonElement>(null);
  const cfg        = STATUS[status];
  const isSold     = status === "sold";
  const hasHover   = !!imageUrlHover;

  // UI state
  const [isHovered,  setIsHovered]  = useState(false);
  const [addedState, setAddedState] = useState<"idle" | "added">("idle");
  const [imgLoaded,  setImgLoaded]  = useState(false);

  // ── 3D tilt ──────────────────────────────────────────────────────────────
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2,  2]), { stiffness: 200, damping: 30 });

  // ── Magnetic quick-add button ────────────────────────────────────────────
  const btnX = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });
  const btnY = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width  - 0.5;
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);

    // Magnetic pull toward quick-add button
    if (btnRef.current) {
      const br   = btnRef.current.getBoundingClientRect();
      const bcx  = br.left + br.width  / 2;
      const bcy  = br.top  + br.height / 2;
      const dist = Math.hypot(e.clientX - bcx, e.clientY - bcy);
      if (dist < 80) {
        btnX.set((e.clientX - bcx) * 0.35);
        btnY.set((e.clientY - bcy) * 0.35);
      } else {
        btnX.set(0);
        btnY.set(0);
      }
    }
  }, [mouseX, mouseY, btnX, btnY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    btnX.set(0);
    btnY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY, btnX, btnY]);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isSold || addedState === "added") return;
    onQuickAdd?.(id);
    setAddedState("added");
    setTimeout(() => setAddedState("idle"), 2000);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col cursor-pointer ${className}`}
    >
      <Link
        href={`/shop/${slug}`}
        aria-label={`${name} — ${formatPrice(price)} — ${cfg.label}`}
        className="flex flex-col flex-1 outline-none"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {/* ── Image block ──────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "3/4", backgroundColor: "#0F0F0F" }}
        >
          {/* Skeleton shimmer — shown until image loads */}
          <AnimatePresence>
            {!imgLoaded && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, #0F0F0F 0%, #1A1A1A 50%, #0F0F0F 100%)",
                  backgroundSize: "200% 100%",
                  animation: "nc-shimmer 1.8s linear infinite",
                  zIndex: 20,
                }}
              />
            )}
          </AnimatePresence>

          {/* Drop number — upper left */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: 12, left: 12, zIndex: 10,
              fontFamily: "var(--font-nc-mono), 'DM Mono', monospace",
              fontSize: 10, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#888888",
            }}
          >
            {formatDropNumber(dropNumber, dropTotal)}
          </div>

          {/* Status badge — upper right */}
          <div
            style={{
              position: "absolute", top: 12, right: 12, zIndex: 10,
              display: "flex", alignItems: "center", gap: 5,
              fontFamily: "var(--font-nc-mono), 'DM Mono', monospace",
              fontSize: 9, letterSpacing: "0.22em",
              textTransform: "uppercase", color: cfg.color,
            }}
          >
            <span
              style={{
                width: 5, height: 5, borderRadius: "50%",
                backgroundColor: cfg.dotColor, display: "block", flexShrink: 0,
                animation: status === "live" ? "nc-pulse 2s ease-in-out infinite" : "none",
              }}
            />
            {cfg.label}
          </div>

          {/* Primary image */}
          <Image
            src={imageUrl}
            alt={imageAlt ?? name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            onLoad={() => setImgLoaded(true)}
            className="object-cover object-center transition-transform duration-700"
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              filter:  isSold ? "grayscale(1)" : "none",
              opacity: isSold ? 0.5 : 1,
              // Scale on hover via CSS — keeps GPU on transform layer
              transform: isHovered && !hasHover ? "scale(1.04)" : "scale(1)",
            }}
          />

          {/* Hover image — crossfade to second image if provided */}
          {hasHover && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  key="hover-img"
                  variants={hoverImageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image
                    src={imageUrlHover!}
                    alt={`${imageAlt ?? name} — alternate view`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Hover overlay + quick-add */}
          <AnimatePresence>
            {isHovered && !isSold && (
              <motion.div
                key="overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: "absolute", inset: 0, zIndex: 15,
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: 14,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                {/* Product name in overlay */}
                <p
                  style={{
                    fontFamily: "var(--font-nc-display), 'Bebas Neue', sans-serif",
                    fontSize: "clamp(20px, 2.5vw, 32px)",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    marginBottom: 4,
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-nc-mono), 'DM Mono', monospace",
                    fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#888888",
                    marginBottom: 12,
                  }}
                >
                  {formatPrice(price)} GBP
                </p>

                {/* Quick-add button */}
                <motion.div variants={quickAddVariants} style={{ pointerEvents: "all" }}>
                  <motion.button
                    ref={btnRef}
                    onClick={handleQuickAdd}
                    style={{
                      x: btnX,
                      y: btnY,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      padding: "11px 20px",
                      background:
                        addedState === "added"
                          ? "rgba(74,222,128,0.12)"
                          : "rgba(255,255,255,0.08)",
                      border: `0.5px solid ${addedState === "added" ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.20)"}`,
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      borderRadius: 2,
                      fontFamily: "var(--font-nc-mono), 'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: addedState === "added" ? "#4ADE80" : "#FFFFFF",
                      cursor: "pointer",
                      transition:
                        "background 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s cubic-bezier(0.16,1,0.3,1), color 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    aria-label={`Add ${name} to cart`}
                  >
                    {addedState === "added" ? "Added to Cart" : "Quick Add"}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sold out overlay */}
          {isSold && (
            <div
              style={{
                position: "absolute", inset: 0, zIndex: 15,
                display: "flex", alignItems: "flex-end",
                padding: 14, pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              <span
                style={{
                  fontFamily: "var(--font-nc-mono), 'DM Mono', monospace",
                  fontSize: 9, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "#555555",
                  background: "rgba(0,0,0,0.7)",
                  padding: "4px 8px",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* ── Info row — always visible ─────────────────────────────────── */}
        <div
          className="flex items-start justify-between gap-3"
          style={{ paddingTop: 12 }}
        >
          <div className="flex flex-col min-w-0" style={{ gap: 2 }}>
            {collection && (
              <p
                className="truncate"
                style={{
                  fontFamily: "var(--font-nc-mono), 'DM Mono', monospace",
                  fontSize: 9, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "#555555",
                }}
              >
                {collection}
              </p>
            )}
            <p
              className="truncate"
              style={{
                fontFamily: "var(--font-nc-display), 'Bebas Neue', sans-serif",
                fontSize: "clamp(16px, 2vw, 22px)",
                lineHeight: 1.1, letterSpacing: "0em",
                textTransform: "uppercase",
                color: isSold ? "#555555" : "#D4D4D4",
                transition: "color 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {name}
            </p>
          </div>

          <p
            className="flex-shrink-0"
            style={{
              fontFamily: "var(--font-nc-mono), 'DM Mono', monospace",
              fontSize: 11, letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: isSold ? "#3A3A3A" : "#AAAAAA",
              textDecoration: isSold ? "line-through" : "none",
              marginTop: 2,
            }}
          >
            {formatPrice(price)}
          </p>
        </div>

        {/* Notify me — sold out only */}
        {isSold && (
          <p
            style={{
              fontFamily: "var(--font-nc-mono), 'DM Mono', monospace",
              fontSize: 9, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#3A3A3A", marginTop: 6,
            }}
          >
            Notify me
          </p>
        )}
      </Link>

      <style>{`
        @keyframes nc-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes nc-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

// ── ProductGrid ───────────────────────────────────────────────────────────────
export function ProductGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      style={{ gap: "clamp(12px, 2vw, 24px)", rowGap: "clamp(40px, 5vw, 56px)" }}
    >
      {children}
    </motion.div>
  );
}
