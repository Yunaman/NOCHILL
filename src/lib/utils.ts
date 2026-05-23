// ─────────────────────────────────────────────────────────────────────────────
// NOCHILL — src/lib/utils.ts
// Shared utility functions. Imported across the entire codebase.
// ─────────────────────────────────────────────────────────────────────────────

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ── cn() ─────────────────────────────────────────────────────────────────────
// Merges Tailwind classes safely.
// - clsx: handles conditional, array, and object class expressions
// - twMerge: resolves Tailwind conflicts (e.g. p-4 + p-8 → p-8)
//
// Usage:
//   cn("px-4 py-2", isActive && "bg-nc-white-8", className)
//   cn(["text-nc-label", { "opacity-50": disabled }])
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── formatPrice() ────────────────────────────────────────────────────────────
// Formats a number as a price string.
// NOCHILL format: £ 340.00 GBP (with narrow space, always 2 decimal places)
//
// Usage:
//   formatPrice(340)      → "£ 340.00"
//   formatPrice(340, true) → "£ 340.00 GBP"
export function formatPrice(
  amount: number,
  withCurrency = false,
  currency = "GBP",
  locale = "en-GB"
): string {
  const formatted = new Intl.NumberFormat(locale, {
    style:                 "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Convert "£340.00" → "£ 340.00" (NOCHILL house style: space after symbol)
  const spaced = formatted.replace(/^(£|€|\$)/, "$1\u202F");

  return withCurrency ? `${spaced} ${currency}` : spaced;
}

// ── formatDropNumber() ───────────────────────────────────────────────────────
// Formats a drop / edition number as a zero-padded string.
//
// Usage:
//   formatDropNumber(1)       → "001"
//   formatDropNumber(1, 100)  → "001 / 100"
export function formatDropNumber(n: number, total?: number): string {
  const padded = String(n).padStart(3, "0");
  return total ? `${padded} / ${String(total).padStart(3, "0")}` : padded;
}

// ── slugify() ────────────────────────────────────────────────────────────────
// Converts a product name to a URL slug.
//
// Usage:
//   slugify("Drop 001 — Heavy Oversized Tee")  → "drop-001-heavy-oversized-tee"
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ── clampNumber() ────────────────────────────────────────────────────────────
// Clamps a value between min and max.
export function clampNumber(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

// ── isTouchDevice() ─────────────────────────────────────────────────────────
// Returns true on touch-primary devices.
// Used to conditionally skip hover-only logic.
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// ── getCoordinates() ────────────────────────────────────────────────────────
// Returns formatted geo-coordinate string (NOCHILL aesthetic: editorial label)
//
// Usage:
//   getCoordinates("London")  → "51.5074° N, 0.1278° W"
export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

// London (default NOCHILL origin)
export const NOCHILL_COORDINATES = formatCoordinates(51.5074, -0.1278);
