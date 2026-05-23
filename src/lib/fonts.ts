// ─────────────────────────────────────────────────────────────────────────────
// NOCHILL — src/lib/fonts.ts
// Font configuration using next/font
//
// FONT PAIRING RATIONALE
// ──────────────────────
// NOCHILL's identity is built on the tension between two energies:
//
//   DISPLAY  →  Neue Haas Grotesk Display (or Bebas Neue as free alternative)
//               Wide, compressed, zero-decoration grotesque.
//               The language of 90s streetwear editorial and underground zines.
//               Used for: hero text, section titles, product names, drop labels.
//               Characteristics: tight leading (0.88–0.96), negative tracking.
//
//   MONO     →  DM Mono (free, Google Fonts)
//               Mechanical, precise, zero-warmth.
//               Used for: coordinates, status labels, drop numbers, timestamps,
//               product codes, price tags, nav items.
//               Characteristics: wide tracking (0.14–0.22em), uppercase only.
//
//   BODY     →  Suisse Int'l (or Inter as fallback — see NOTE below)
//               The neutral workhorse. Slightly condensed, legible at small sizes.
//               Used for: product descriptions, editorial copy, checkout flow.
//               NOTE: If Suisse is not licensed, use 'Helvetica Neue' system
//               font as the first fallback. The combination with display and mono
//               fonts means body text never dominates anyway.
//
// FREE ALTERNATIVE STACK (no licensing required):
//   Display:  Bebas Neue (Google Fonts) — MORE compressed, even more editorial
//   Mono:     DM Mono (Google Fonts)    — same as primary
//   Body:     Outfit (Google Fonts)     — geometric, slightly mechanical
//
// PREMIUM LICENSED ALTERNATIVES:
//   Display:  Söhne (Klim Type Foundry) — warmer, contemporary Swiss grotesque
//   Display:  Aktiv Grotesk (Dalton Maag) — clean, editorial
//   Display:  GT America Condensed        — extremely film-poster-like
//   Body:     Suisse Int'l (Swiss Typefaces) — the reference for this aesthetic
// ─────────────────────────────────────────────────────────────────────────────

import { DM_Mono, Bebas_Neue, Outfit } from "next/font/google";
// If you have licensed fonts, use next/font/local instead — see bottom of file.

// ── OPTION A: Google Fonts (free, zero licensing) ────────────────────────────
// Swap these out for licensed variants when budget allows.

export const fontDisplay = Bebas_Neue({
  weight: ["400"],                // Bebas is single-weight — tracking does the work
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nc-display",
  preload: true,
  // Override the letterSpacing in CSS — Bebas defaults are loose
  // Use: letter-spacing: -0.02em for headline, 0em for all-caps labels
});

export const fontMono = DM_Mono({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nc-mono",
  preload: true,
});

export const fontBody = Outfit({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nc-body",
  preload: false,             // body font can load lazily
});

// ── OPTION B: Licensed local fonts ───────────────────────────────────────────
// Uncomment and replace file paths when you have licensed font files.
// Place font files in: public/fonts/
//
// import localFont from "next/font/local";
//
// export const fontDisplay = localFont({
//   src: [
//     {
//       path: "../../public/fonts/NeueHaasGroteskDisplay-55Roman.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/NeueHaasGroteskDisplay-65Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//   ],
//   variable: "--font-nc-display",
//   display: "swap",
//   preload: true,
// });
//
// export const fontMono = DM_Mono({  // DM Mono stays on Google Fonts
//   weight: ["400", "500"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-nc-mono",
// });
//
// export const fontBody = localFont({
//   src: [
//     {
//       path: "../../public/fonts/SuisseIntl-Light.woff2",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/SuisseIntl-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/SuisseIntl-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//   ],
//   variable: "--font-nc-body",
//   display: "swap",
//   preload: false,
// });

// ── USAGE IN layout.tsx ───────────────────────────────────────────────────────
//
// import { fontDisplay, fontMono, fontBody } from "@/lib/fonts";
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html
//       lang="en"
//       className={`${fontDisplay.variable} ${fontMono.variable} ${fontBody.variable}`}
//     >
//       <body>{children}</body>
//     </html>
//   );
// }
//
// Then in tailwind.config.ts, the fontFamily already maps:
//   "nc-display" → var(--font-nc-display)   → Bebas Neue / Neue Haas
//   "nc-mono"    → var(--font-nc-mono)       → DM Mono
//   "nc-body"    → var(--font-nc-body)       → Outfit / Suisse Int'l
//
// In components:
//   className="font-nc-display type-hero"         → hero headline
//   className="font-nc-mono type-label"           → coordinate / status label
//   className="font-nc-body type-body"            → product description
// ─────────────────────────────────────────────────────────────────────────────
