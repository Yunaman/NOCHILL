import type { Metadata } from "next";
import "./globals.css";
import { fontDisplay, fontMono, fontBody } from "@/lib/fonts";
import { AppWrapper } from "@/components/layout/AppWrapper";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "NOCHILL | BUILT FOR THE OUTSIDERS",
  description: "Cinematic underground luxury streetwear aesthetic. Premium fashion archive from Addis Ababa.",
  keywords: ["luxury streetwear", "fashion", "underground", "NOCHILL", "Addis Ababa", "premium clothing"],
  authors: [{ name: "NOCHILL" }],
  openGraph: {
    title: "NOCHILL | BUILT FOR THE OUTSIDERS",
    description: "Cinematic underground luxury streetwear aesthetic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontMono.variable} ${fontBody.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main-content"
          className="nc-skip-link"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <AppWrapper>
          <main id="main-content">
            {children}
          </main>
        </AppWrapper>
      </body>
    </html>
  );
}
