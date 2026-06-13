"use client";

import { Particles } from "@/components/ui/Particles";
import { useShouldAnimate } from "@/hooks/useDeviceCapabilities";

/**
 * Atmosphere — the ambient "street-luxury" environment layer.
 *
 * Three intentional, low-cost effects that sit behind/over the content:
 * - Ambient light: two slow-drifting radial blooms (subtle light movement).
 * - Particles: faint floating dust (desktop + motion-enabled only).
 * - Film grain: a fixed, animated noise overlay for editorial texture.
 *
 * All effects are purely decorative (`pointer-events-none`) and respect
 * `prefers-reduced-motion` (animations paused via CSS; particles not mounted).
 */
export function Atmosphere() {
  const shouldAnimate = useShouldAnimate();

  return (
    <>
      {/* Ambient light blooms — behind content, revealed through transparent sections */}
      <div aria-hidden className="nc-ambient" />

      {/* Floating dust — only on capable, motion-friendly devices */}
      {shouldAnimate && <Particles />}

      {/* Film grain — over content, under nav/cart/cursor */}
      <div aria-hidden className="nc-grain-fixed" />
    </>
  );
}
