import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// ─────────────────────────────────────────────────────────────────────────────
// NOCHILL Design System — tailwind.config.ts
// Cinematic luxury streetwear. Dark monochrome. Editorial. Underground.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    // ── SCREENS ───────────────────────────────────────────────────────────────
    // Mobile-first. Named for intent, not device.
    screens: {
      sm:  "390px",   // iPhone Pro
      md:  "768px",   // tablet portrait
      lg:  "1024px",  // tablet landscape / small laptop
      xl:  "1280px",  // desktop
      "2xl": "1536px", // large desktop
      "3xl": "1920px", // cinematic wide
    },

    extend: {
      // ── COLOUR TOKENS ───────────────────────────────────────────────────────
      // Single source of truth. No hardcoded hex in components.
      //
      // Palette logic:
      //   nc-black / nc-white  → structural base
      //   nc-zinc-*            → surface hierarchy (8 stops)
      //   nc-white-*           → alpha white for overlays / glass
      //   nc-accent-*          → the one accent — electric off-white / signal
      //   nc-signal            → status / interactive highlight (rare, intentional)
      colors: {
        // ── Base ──
        "nc-black":  "#000000",
        "nc-white":  "#FFFFFF",

        // ── Zinc surface hierarchy ──
        // Used for layering: page → section → card → elevated card
        "nc-zinc": {
          950: "#080808",   // page background
          900: "#0F0F0F",   // section background
          800: "#161616",   // card / panel background
          700: "#1F1F1F",   // elevated card
          600: "#2A2A2A",   // input / field background
          500: "#3A3A3A",   // subtle border (resting)
          400: "#555555",   // border (hover)
          300: "#888888",   // muted label text
          200: "#AAAAAA",   // secondary text
          100: "#D4D4D4",   // primary text (body)
        },

        // ── Alpha whites — glass & overlay ──
        // Transparent whites for glassmorphism, overlays, gradients
        

        // ── Signal — the one accent ──
        // Use VERY sparingly: CTAs, active state, drop labels.
        // Reads as electric in a monochrome field.
        "nc-signal": {
          DEFAULT: "#F5F5F0",   // near-white with warmth
          warm:    "#E8E4DC",   // slightly warm — aged paper
          hot:     "#FFFFFF",   // pure white flash
          dim:     "rgba(245,245,240,0.12)", // ghost of signal on dark bg
        },

        // ── Status (use only for system feedback) ──
        "nc-status": {
          live:    "#4ADE80", // in-stock / live
          low:     "#F59E0B", // low stock
          sold:    "#EF4444", // sold out
        },
      },

      // ── TYPOGRAPHY SCALE ────────────────────────────────────────────────────
      // Two-font system:
      //   nc-display → Neue Haas Grotesk Display (or local fallback stack)
      //   nc-mono    → DM Mono — for labels, coordinates, status
      //   nc-body    → Suisse Int'l / Aktiv Grotesk — for product copy
      //
      // See fonts.ts for next/font/local setup.
      fontFamily: {
        "nc-display": [
          "\"Neue Haas Grotesk Display\"",
          "\"Haas Grot Display\"",
          "\"Helvetica Neue\"",
          "\"Arial\"",
          "sans-serif",
        ],
        "nc-mono": [
          "\"DM Mono\"",
          "\"Roboto Mono\"",
          "\"Courier New\"",
          "monospace",
        ],
        "nc-body": [
          "\"Suisse Int'l\"",
          "\"Aktiv Grotesk\"",
          "\"Helvetica Neue\"",
          "sans-serif",
        ],
      },

      // ── TYPE SCALE ──────────────────────────────────────────────────────────
      // Convention: [font-size, { lineHeight, letterSpacing, fontWeight }]
      // All display sizes use clamp() for fluid scaling between breakpoints.
      // No media query needed — the size adapts automatically.
      fontSize: {
        // Editorial / Hero display
        "nc-hero":    ["clamp(72px,13vw,200px)",  { lineHeight: "0.88", letterSpacing: "-0.045em", fontWeight: "500" }],
        "nc-display": ["clamp(48px,8.5vw,130px)", { lineHeight: "0.92", letterSpacing: "-0.035em", fontWeight: "500" }],
        "nc-title":   ["clamp(32px,5vw,80px)",    { lineHeight: "0.96", letterSpacing: "-0.025em", fontWeight: "500" }],
        "nc-heading":  ["clamp(22px,3vw,48px)",   { lineHeight: "1.05", letterSpacing: "-0.015em", fontWeight: "500" }],
        "nc-subhead":  ["clamp(16px,2vw,28px)",   { lineHeight: "1.20", letterSpacing: "-0.01em",  fontWeight: "400" }],

        // Body / Prose
        "nc-body-lg":  ["18px", { lineHeight: "1.65", letterSpacing: "-0.005em", fontWeight: "400" }],
        "nc-body":     ["15px", { lineHeight: "1.60", letterSpacing: "0em",      fontWeight: "400" }],
        "nc-body-sm":  ["13px", { lineHeight: "1.55", letterSpacing: "0.005em",  fontWeight: "400" }],

        // UI / Mono labels
        "nc-label":    ["11px", { lineHeight: "1.40", letterSpacing: "0.14em",   fontWeight: "500" }],
        "nc-caption":  ["10px", { lineHeight: "1.40", letterSpacing: "0.18em",   fontWeight: "400" }],
        "nc-micro":    ["9px",  { lineHeight: "1.30", letterSpacing: "0.22em",   fontWeight: "400" }],
      },

      // ── FONT WEIGHT ─────────────────────────────────────────────────────────
      fontWeight: {
        light:   "300",
        regular: "400",
        medium:  "500",
        // Avoid bold (700) — in a luxury context, weight comes from scale and
        // tracking, not from bold. Exception: numeric data tables only.
      },

      // ── LETTER SPACING ──────────────────────────────────────────────────────
      letterSpacing: {
        "nc-tight":   "-0.04em",
        "nc-snug":    "-0.02em",
        "nc-normal":  "0em",
        "nc-wide":    "0.10em",
        "nc-wider":   "0.16em",
        "nc-widest":  "0.24em",  // mono labels, coordinates
      },

      // ── LINE HEIGHT ─────────────────────────────────────────────────────────
      lineHeight: {
        "nc-flush":   "0.88",  // massive display, letters nearly touching
        "nc-tight":   "1.0",
        "nc-snug":    "1.15",
        "nc-normal":  "1.5",
        "nc-relaxed": "1.65",
        "nc-loose":   "1.80",
      },

      // ── SPACING SYSTEM ──────────────────────────────────────────────────────
      // Extends Tailwind's default 4px base grid.
      // NOCHILL uses a deliberate editorial cadence:
      // small gaps are very tight, large gaps are very generous.
      // This creates visual rhythm — compressed and airy in alternation.
      spacing: {
        // Micro
        "px":    "1px",
        "0.5":   "2px",
        "1":     "4px",
        "1.5":   "6px",
        "2":     "8px",
        "2.5":   "10px",
        "3":     "12px",
        "3.5":   "14px",
        "4":     "16px",
        "5":     "20px",
        "6":     "24px",
        "7":     "28px",
        "8":     "32px",
        "9":     "36px",
        "10":    "40px",
        // Component
        "11":    "44px",
        "12":    "48px",
        "14":    "56px",
        "16":    "64px",
        "18":    "72px",
        "20":    "80px",
        "22":    "88px",
        "24":    "96px",
        // Section
        "28":    "112px",
        "32":    "128px",
        "36":    "144px",
        "40":    "160px",
        "44":    "176px",
        "48":    "192px",
        // Editorial breathing room
        "56":    "224px",
        "64":    "256px",
        "72":    "288px",
        "80":    "320px",
        "96":    "384px",
        // Cinematic
        "screen-quarter": "25dvh",
        "screen-third":   "33dvh",
        "screen-half":    "50dvh",
      },

      // ── SIZE / WIDTH / HEIGHT UTILITIES ─────────────────────────────────────
      width: {
        "nc-prose":  "65ch",   // max comfortable reading width
        "nc-narrow": "40ch",
        "nc-wide":   "90ch",
      },

      maxWidth: {
        "nc-prose":   "65ch",
        "nc-layout":  "1440px",
        "nc-full":    "1920px",
        "nc-tight":   "480px",
        "nc-content": "840px",
      },

      // ── BORDER RADIUS ───────────────────────────────────────────────────────
      // NOCHILL uses sharp edges as the default aesthetic.
      // Rounded radii are reserved for pill tags and avatars only.
      borderRadius: {
        "nc-none":  "0px",      // default: sharp, architectural
        "nc-sm":    "2px",      // very subtle softening
        "nc-md":    "4px",      // cards, inputs
        "nc-lg":    "8px",      // modals, sheets
        "nc-pill":  "9999px",   // status badges, tags
        "nc-full":  "50%",      // avatars
      },

      // ── BORDER WIDTH ────────────────────────────────────────────────────────
      borderWidth: {
        DEFAULT: "1px",
        "0":     "0px",
        "0.5":   "0.5px",  // ultra-fine — glass borders
        "1":     "1px",
        "2":     "2px",
      },

      // ── GLASSMORPHISM TOKENS ────────────────────────────────────────────────
      // Applied with: backdrop-blur-nc, bg-nc-glass-*, border-nc-glass-*
      // Paired with: bg-nc-white-4 or bg-nc-white-6 for the tinted surface
      backdropBlur: {
        "nc-xs":  "4px",
        "nc-sm":  "8px",
        "nc":     "12px",    // standard glass panel
        "nc-md":  "20px",    // nav / drawer
        "nc-lg":  "32px",    // heavy frosted glass
        "nc-xl":  "48px",    // full-screen overlay
      },
      backdropSaturate: {
        "nc":     "1.4",     // slightly boosts the image behind glass
      },
      backdropBrightness: {
        "nc-dim": "0.7",     // darkens what's behind the overlay glass
      },

      // Convenience: named glass surface presets (use as bg utilities)
      // These map to rgba values used in className combos like:
      //   className="bg-nc-glass border border-nc-glass-border backdrop-blur-nc"
      backgroundColor: {
        "nc-glass":          "rgba(255,255,255,0.04)",
        "nc-glass-elevated": "rgba(255,255,255,0.08)",
        "nc-glass-heavy":    "rgba(255,255,255,0.14)",
        "nc-overlay":        "rgba(0,0,0,0.64)",
        "nc-overlay-heavy":  "rgba(0,0,0,0.84)",
        "nc-scrim":          "rgba(0,0,0,0.40)",
      },

      // ── MOTION / EASING TOKENS ──────────────────────────────────────────────
      // Named eases — every animation in the codebase uses one of these.
      // No raw cubic-bezier values in components.
      transitionTimingFunction: {
        // Signature NOCHILL ease — exponential out, feels premium and weighty
        "nc":          "cubic-bezier(0.16, 1, 0.3, 1)",
        // For elements entering fast and settling slowly (hero reveals)
        "nc-out":      "cubic-bezier(0.0, 0.0, 0.2, 1)",
        // Sharp in/out — for quick UI state changes (toggles, tabs)
        "nc-sharp":    "cubic-bezier(0.76, 0, 0.24, 1)",
        // Gentle spring overshoot — product image hover scale
        "nc-spring":   "cubic-bezier(0.34, 1.36, 0.64, 1)",
        // Linear (marquee, looping animations only)
        "nc-linear":   "linear",
        // Cinematic — slow acceleration out, used for page transitions
        "nc-cinematic": "cubic-bezier(0.22, 0, 0.36, 1)",
      },

      // ── DURATION TOKENS ─────────────────────────────────────────────────────
      transitionDuration: {
        // Micro-interactions
        "nc-fast":  "150ms",
        "nc-quick": "250ms",
        // UI state changes
        "nc-base":  "400ms",
        "nc-slow":  "600ms",
        // Reveals / entrances
        "nc-enter": "800ms",
        "nc-lazy":  "1000ms",
        // Cinematic / page-level
        "nc-film":  "1400ms",
        "nc-epic":  "2000ms",
      },

      // ── DELAY TOKENS ────────────────────────────────────────────────────────
      transitionDelay: {
        "nc-0":   "0ms",
        "nc-1":   "60ms",
        "nc-2":   "120ms",
        "nc-3":   "180ms",
        "nc-4":   "240ms",
        "nc-5":   "320ms",
        "nc-6":   "400ms",
        "nc-8":   "560ms",
        "nc-10":  "700ms",
      },

      // ── KEYFRAMES ───────────────────────────────────────────────────────────
      keyframes: {
        // Staggered word / letter reveal from below
        "nc-reveal-up": {
          "0%":   { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0%)" },
        },
        // Clip-path wipe reveal (cinematic curtain)
        "nc-wipe-in": {
          "0%":   { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        // Fade in with subtle upward drift
        "nc-fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Marquee scroll (horizontal ticker)
        "nc-marquee": {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Signal pulse — for live indicators
        "nc-pulse-signal": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.3" },
        },
        // Grain texture shift (applied to ::after pseudo-element)
        "nc-grain": {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%":      { transform: "translate(-2%,-3%)" },
          "20%":      { transform: "translate(3%,1%)" },
          "30%":      { transform: "translate(-1%,4%)" },
          "40%":      { transform: "translate(4%,-2%)" },
          "50%":      { transform: "translate(-3%,3%)" },
          "60%":      { transform: "translate(2%,-4%)" },
          "70%":      { transform: "translate(-4%,1%)" },
          "80%":      { transform: "translate(1%,2%)" },
          "90%":      { transform: "translate(3%,-1%)" },
        },
        // Loading shimmer
        "nc-shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      animation: {
        "nc-reveal-up":     "nc-reveal-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "nc-wipe-in":       "nc-wipe-in 1.1s cubic-bezier(0.16,1,0.3,1) both",
        "nc-fade-up":       "nc-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "nc-marquee-slow":  "nc-marquee 40s linear infinite",
        "nc-marquee":       "nc-marquee 24s linear infinite",
        "nc-marquee-fast":  "nc-marquee 12s linear infinite",
        "nc-pulse-signal":  "nc-pulse-signal 2s ease-in-out infinite",
        "nc-grain":         "nc-grain 0.5s steps(1) infinite",
        "nc-shimmer":       "nc-shimmer 2s linear infinite",
      },

      // ── Z-INDEX SCALE ───────────────────────────────────────────────────────
      // Named layers — prevents z-index conflicts across components
      zIndex: {
        "nc-base":     "0",
        "nc-raised":   "10",
        "nc-dropdown": "100",
        "nc-sticky":   "200",
        "nc-overlay":  "300",
        "nc-drawer":   "400",
        "nc-modal":    "500",
        "nc-toast":    "600",
        "nc-cursor":   "9999",
      },

      // ── SHADOWS ─────────────────────────────────────────────────────────────
      // NOCHILL shadows are subtle — barely-there, reinforcing depth not drama.
      // The primary depth tool is background colour layering, not box-shadow.
      boxShadow: {
        "nc-xs":     "0 1px 2px rgba(0,0,0,0.5)",
        "nc-sm":     "0 2px 8px rgba(0,0,0,0.6)",
        "nc-md":     "0 4px 24px rgba(0,0,0,0.7)",
        "nc-lg":     "0 8px 48px rgba(0,0,0,0.8)",
        "nc-inset":  "inset 0 1px 0 rgba(255,255,255,0.06)",  // glass top edge
        "nc-glow":   "0 0 40px rgba(255,255,255,0.04)",        // barely visible halo
      },

      // ── ASPECT RATIOS ───────────────────────────────────────────────────────
      aspectRatio: {
        "nc-product":   "3/4",    // standard product card
        "nc-wide":      "16/9",   // editorial wide image
        "nc-cinema":    "21/9",   // ultra-wide hero
        "nc-square":    "1/1",
        "nc-portrait":  "2/3",
        "nc-editorial": "4/5",    // Instagram-style editorial
      },

      // ── GRID ────────────────────────────────────────────────────────────────
      gridTemplateColumns: {
        // Product grid — fluid, collapses from 4 → 2 → 1
        "nc-products": "repeat(auto-fill, minmax(260px, 1fr))",
        // Editorial asymmetric layout
        "nc-editorial": "1fr 1fr",
        "nc-editorial-lg": "7fr 5fr",
        // Full bleed with side gutters
        "nc-layout": "var(--nc-gutter) 1fr var(--nc-gutter)",
      },

      // ── OPACITY SCALE ───────────────────────────────────────────────────────
      // NOCHILL uses opacity extensively for hierarchy.
      opacity: {
        "0":   "0",
        "5":   "0.05",
        "10":  "0.10",
        "16":  "0.16",
        "24":  "0.24",
        "32":  "0.32",
        "48":  "0.48",
        "64":  "0.64",
        "80":  "0.80",
        "90":  "0.90",
        "100": "1",
      },
    },
  },

  plugins: [
    // ── NOCHILL PLUGIN ───────────────────────────────────────────────────────
    // Custom utilities that can't be expressed as Tailwind tokens alone.
    plugin(function ({ addUtilities, addComponents, theme }) {
      addUtilities({
        // Text rendering — all display text should use this
        ".nc-text-render": {
          "-webkit-font-smoothing":  "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          "text-rendering":          "optimizeLegibility",
        },

        // Full viewport height accounting for mobile browser chrome
        ".nc-h-screen": {
          "height": "100dvh",
        },
        ".nc-min-h-screen": {
          "min-height": "100dvh",
        },

        // Hide scrollbar but preserve scroll (used on marquee containers)
        ".nc-no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width":    "none",
          "&::-webkit-scrollbar": {
            "display": "none",
          },
        },

        // Touch-safe hover (only applies on devices with a fine pointer)
        // Usage: .nc-hover-opacity { @apply nc-pointer-hover:hover:opacity-60 }
        // (This generates the media query utility prefix)
        "@media (hover: hover) and (pointer: fine)": {
          ".nc-pointer-hover\\:opacity-60:hover": {
            "opacity": "0.6",
          },
          ".nc-pointer-hover\\:opacity-80:hover": {
            "opacity": "0.8",
          },
        },

        // Prevent content from bleeding under iOS safe areas
        ".nc-safe-bottom": {
          "padding-bottom": "env(safe-area-inset-bottom)",
        },
        ".nc-safe-top": {
          "padding-top": "env(safe-area-inset-top)",
        },

        // GPU acceleration for animated elements
        ".nc-gpu": {
          "will-change": "transform",
          "transform":   "translateZ(0)",
        },

        // Grain overlay (apply to ::after pseudo-element with absolute inset-0)
        ".nc-grain-overlay": {
          "position":         "relative",
          "overflow":         "hidden",
          "&::after": {
            "content":    "\"\"",
            "position":   "absolute",
            "inset":      "-200%",
            "width":      "400%",
            "height":     "400%",
            "opacity":    "0.035",
            "background-image": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            "pointer-events": "none",
            "z-index":     "1",
            "animation":   "nc-grain 0.5s steps(1) infinite",
          },
        },
      });

      // ── COMPONENT PRESETS ──────────────────────────────────────────────────
      // Reusable multi-property combos. Used with @apply in CSS modules.
      addComponents({
        // Glass card surface
        ".nc-glass": {
          "background":        "rgba(255,255,255,0.04)",
          "border":            "0.5px solid rgba(255,255,255,0.10)",
          "backdrop-filter":   "blur(12px) saturate(1.4)",
          "-webkit-backdrop-filter": "blur(12px) saturate(1.4)",
        },
        ".nc-glass-elevated": {
          "background":        "rgba(255,255,255,0.08)",
          "border":            "0.5px solid rgba(255,255,255,0.16)",
          "backdrop-filter":   "blur(20px) saturate(1.5)",
          "-webkit-backdrop-filter": "blur(20px) saturate(1.5)",
        },

        // Mono label — coordinates, status, drop number
        ".nc-label": {
          "font-family":    "var(--font-nc-mono)",
          "font-size":      "10px",
          "letter-spacing": "0.18em",
          "text-transform": "uppercase",
          "font-weight":    "400",
          "-webkit-font-smoothing": "antialiased",
        },

        // Editorial section header
        ".nc-section-header": {
          "font-family":    "var(--font-nc-display)",
          "font-size":      "clamp(48px,8.5vw,130px)",
          "line-height":    "0.92",
          "letter-spacing": "-0.035em",
          "font-weight":    "500",
          "-webkit-font-smoothing": "antialiased",
          "text-rendering": "optimizeLegibility",
        },

        // Minimal button — used on all interactive elements
        ".nc-btn": {
          "display":          "inline-flex",
          "align-items":      "center",
          "justify-content":  "center",
          "font-family":      "var(--font-nc-mono)",
          "font-size":        "10px",
          "letter-spacing":   "0.18em",
          "text-transform":   "uppercase",
          "padding":          "14px 24px",
          "border":           "0.5px solid rgba(255,255,255,0.16)",
          "background":       "transparent",
          "color":            "rgba(255,255,255,0.80)",
          "transition":       "all 400ms cubic-bezier(0.16,1,0.3,1)",
          "cursor":           "pointer",
          "-webkit-font-smoothing": "antialiased",
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              "background": "rgba(255,255,255,0.06)",
              "border-color": "rgba(255,255,255,0.32)",
              "color":      "#FFFFFF",
            },
          },
          "&:active": {
            "transform": "scale(0.97)",
          },
        },

        // Primary CTA — filled
        ".nc-btn-primary": {
          "background":  "#FFFFFF",
          "color":       "#000000",
          "border":      "0.5px solid #FFFFFF",
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              "background":  "rgba(255,255,255,0.88)",
              "border-color": "rgba(255,255,255,0.88)",
            },
          },
        },

        // Product image wrapper
        ".nc-product-img": {
          "position":       "relative",
          "overflow":       "hidden",
          "aspect-ratio":   "3/4",
          "background":     "#0F0F0F",
          "& img": {
            "width":      "100%",
            "height":     "100%",
            "object-fit": "cover",
            "transition": "transform 800ms cubic-bezier(0.16,1,0.3,1)",
          },
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover img": {
              "transform": "scale(1.04)",
            },
          },
        },

        // Gutter-aware container
        ".nc-container": {
          "width":           "100%",
          "max-width":       "1440px",
          "margin-inline":   "auto",
          "padding-inline":  "clamp(20px, 4vw, 80px)",
        },
      });
    }),
  ],
};

export default config;