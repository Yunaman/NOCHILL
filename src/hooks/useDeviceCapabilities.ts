"use client";

import { useEffect, useState } from "react";

interface DeviceCapabilities {
  /** True for devices with a fine pointer + hover (i.e. mouse-driven desktops). */
  hasFinePointer: boolean;
  /** True when the user asked the OS to minimise motion. */
  prefersReducedMotion: boolean;
}

/**
 * Single source of truth for deciding whether to run premium motion effects.
 *
 * Heavy/atmospheric effects (custom cursor trail, ambient particles, 3D tilt)
 * should only run when `hasFinePointer` is true and `prefersReducedMotion` is
 * false. Using `(hover: hover) and (pointer: fine)` is more robust than a width
 * check — it correctly excludes touchscreens and stylus-only devices.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>({
    hasFinePointer: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setCaps({
        hasFinePointer: pointerQuery.matches,
        prefersReducedMotion: motionQuery.matches,
      });
    };

    update();
    pointerQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      pointerQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return caps;
}

/** Convenience flag: should premium motion effects run at all? */
export function useShouldAnimate(): boolean {
  const { hasFinePointer, prefersReducedMotion } = useDeviceCapabilities();
  return hasFinePointer && !prefersReducedMotion;
}
