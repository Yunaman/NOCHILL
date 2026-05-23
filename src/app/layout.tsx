import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppWrapper } from "@/components/layout/AppWrapper";
import { fontDisplay, fontMono, fontBody } from "@/lib/fonts";

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "NOCHILL — Luxury Streetwear Archive",
    template: "%s | NOCHILL",
  },
  description: "Premium underground streetwear collective. London. Drop 001.",
  keywords: ["streetwear", "luxury", "underground", "drop", "nochill"],
  openGraph: {
    type: "website",
    siteName: "NOCHILL",
    title: "NOCHILL — Luxury Streetwear Archive",
    description: "Premium underground streetwear collective. London. Drop 001.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOCHILL",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

// ── Layout ────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontMono.variable} ${fontBody.variable}`}
    >
      <body
        className="antialiased"
        style={{
          backgroundColor: "#080808",
          color: "#D4D4D4",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="nc-skip-link"
        >
          Skip to content
        </a>

        <main id="main-content">
          <AppWrapper>{children}</AppWrapper>
        </main>
      </body>
    </html>
  );
}
