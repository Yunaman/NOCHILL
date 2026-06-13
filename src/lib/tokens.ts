// ─────────────────────────────────────────────────────────────────────────────
// NOCHILL — src/lib/tokens.ts
// Design tokens as typed TypeScript constants.
//
// Use these in:
//   - GSAP animations       gsap.to(el, { duration: tokens.duration.enter })
//   - Framer Motion vars    transition={{ ease: tokens.ease.nc, duration: 0.8 }}
//   - Conditional styles   style={{ color: tokens.color.zinc[300] }}
//   - Animation constants  const variants = { hidden: { y: tokens.motion.revealY } }
//
// The CSS custom properties in globals.css are the authoritative source.
// These TypeScript constants mirror them for use where CSS vars aren't accessible.
// ─────────────────────────────────────────────────────────────────────────────

// ── COLOUR TOKENS ────────────────────────────────────────────────────────────
export const color = {
  black: "#000000",
  white: "#FFFFFF",

  zinc: {
    950: "#080808",
    900: "#0F0F0F",
    800: "#161616",
    700: "#1F1F1F",
    600: "#2A2A2A",
    500: "#3A3A3A",
    400: "#555555",
    300: "#888888",
    200: "#AAAAAA",
    100: "#D4D4D4",
  },

  // Alpha whites — for inline styles and GSAP color tweens
  alpha: {
    2:  "rgba(255,255,255,0.02)",
    4:  "rgba(255,255,255,0.04)",
    6:  "rgba(255,255,255,0.06)",
    8:  "rgba(255,255,255,0.08)",
    10: "rgba(255,255,255,0.10)",
    16: "rgba(255,255,255,0.16)",
    24: "rgba(255,255,255,0.24)",
    32: "rgba(255,255,255,0.32)",
    48: "rgba(255,255,255,0.48)",
    64: "rgba(255,255,255,0.64)",
    80: "rgba(255,255,255,0.80)",
  },

  signal: {
    DEFAULT: "#F5F5F0",
    warm:    "#E8E4DC",
    hot:     "#FFFFFF",
    dim:     "rgba(245,245,240,0.12)",
  },

  status: {
    live: "#4ADE80",
    low:  "#F59E0B",
    sold: "#EF4444",
  },

  // Glassmorphism
  glass: {
    bg:          "rgba(255,255,255,0.04)",
    bgElevated:  "rgba(255,255,255,0.08)",
    bgHeavy:     "rgba(255,255,255,0.14)",
    border:      "rgba(255,255,255,0.10)",
    borderHover: "rgba(255,255,255,0.20)",
  },

  overlay: {
    DEFAULT: "rgba(0,0,0,0.64)",
    heavy:   "rgba(0,0,0,0.84)",
    scrim:   "rgba(0,0,0,0.40)",
  },
} as const;

// ── EASING CURVES ────────────────────────────────────────────────────────────
// Framer Motion format: [x1, y1, x2, y2]
// GSAP format: string "power3.out" or custom cubic-bezier
export const ease = {
  // Framer Motion compatible arrays
  nc:        [0.16, 1, 0.3, 1]      as [number, number, number, number],
  out:       [0.0, 0.0, 0.2, 1]     as [number, number, number, number],
  sharp:     [0.76, 0, 0.24, 1]     as [number, number, number, number],
  spring:    [0.34, 1.36, 0.64, 1]  as [number, number, number, number],
  cinematic: [0.22, 0, 0.36, 1]     as [number, number, number, number],

  // CSS string format (for GSAP and CSS transitions)
  css: {
    nc:        "cubic-bezier(0.16, 1, 0.3, 1)",
    out:       "cubic-bezier(0.0, 0.0, 0.2, 1)",
    sharp:     "cubic-bezier(0.76, 0, 0.24, 1)",
    spring:    "cubic-bezier(0.34, 1.36, 0.64, 1)",
    cinematic: "cubic-bezier(0.22, 0, 0.36, 1)",
  },

  // GSAP named eases (use in gsap.to() ease property)
  gsap: {
    nc:     "power3.out",
    sharp:  "power2.inOut",
    slow:   "power4.out",
    spring: "back.out(1.4)",
  },
} as const;

// ── DURATION TOKENS (seconds — for Framer / GSAP) ────────────────────────────
export const duration = {
  fast:     0.15,
  quick:    0.25,
  base:     0.40,
  slow:     0.60,
  enter:    0.80,
  lazy:     1.00,
  film:     1.40,
  epic:     2.00,
} as const;

// ── STAGGER TOKENS ───────────────────────────────────────────────────────────
export const stagger = {
  tight:  0.04,   // dense lists, product grids
  base:   0.08,   // standard component stagger
  loose:  0.12,   // editorial sections
  slow:   0.18,   // cinematic reveals
} as const;

// ── MOTION DEFAULTS ──────────────────────────────────────────────────────────
// Pre-built Framer Motion variants for consistent use across components.
export const motion = {
  // Amount of Y offset for reveal animations (in px)
  revealY: 40,
  revealYLarge: 80,

  // Fade up from below
  fadeUp: {
    hidden:  { opacity: 0, y: 40 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration.enter,
        ease: ease.nc,
        delay: i * stagger.base,
      },
    }),
  },

  // Clip-path wipe (text line reveal)
  clipReveal: {
    hidden:  { clipPath: "inset(0 0 100% 0)" },
    visible: (i: number = 0) => ({
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: duration.lazy,
        ease: ease.nc,
        delay: i * stagger.tight,
      },
    }),
  },

  // Scale in (product image hover)
  scaleIn: {
    rest:  { scale: 1 },
    hover: {
      scale: 1.04,
      transition: { duration: duration.enter, ease: ease.spring },
    },
  },

  // Container stagger (parent variant)
  staggerContainer: {
    hidden:  {},
    visible: {
      transition: {
        staggerChildren: stagger.base,
        delayChildren: 0.1,
      },
    },
  },

  // Child item (use with staggerContainer)
  staggerItem: {
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.enter, ease: ease.nc },
    },
  },

  // Page transition (route change)
  pageEnter: {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.slow, ease: ease.out },
    },
    exit: {
      opacity: 0,
      transition: { duration: duration.quick, ease: ease.sharp },
    },
  },

  // Bottom sheet (mobile)
  bottomSheet: {
    hidden:  { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: duration.slow, ease: ease.nc },
    },
    exit: {
      y: "100%",
      transition: { duration: duration.base, ease: ease.sharp },
    },
  },
} as const;

// ── INTRO / LOADING SEQUENCE ─────────────────────────────────────────────────
// Single source of truth for the cinematic intro length. Drives the loading
// screen progress bar AND the moment the homepage/navbar are revealed, so the
// two never disagree (previously the wrapper cut the loader off mid-animation).
export const INTRO_DURATION_MS = 4000;

// ── BREAKPOINTS (mirrors tailwind.config.ts screens) ─────────────────────────
// For use in JS logic (window.matchMedia, GSAP ScrollTrigger, etc.)
export const breakpoint = {
  sm:    390,
  md:    768,
  lg:    1024,
  xl:    1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

// ── Z-INDEX LAYERS ───────────────────────────────────────────────────────────
export const zIndex = {
  base:     0,
  raised:   10,
  dropdown: 100,
  sticky:   200,
  overlay:  300,
  drawer:   400,
  modal:    500,
  toast:    600,
  cursor:   9999,
} as const;

// ── LAYOUT TOKENS ────────────────────────────────────────────────────────────
export const layout = {
  navHeight:    60,          // px
  maxWidth:     1440,        // px
  gutterMobile: 20,          // px
  gutterDesktop: 80,         // px
} as const;

// ── TYPE GUARD UTILITIES ─────────────────────────────────────────────────────
export type NcColor = typeof color;
export type NcEase = typeof ease;
export type NcDuration = typeof duration;
export type NcMotion = typeof motion;