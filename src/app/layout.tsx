import type { Metadata } from "next";
import "./globals.css";
import { AppWrapper } from "@/components/layout/AppWrapper";
import { fontDisplay, fontMono, fontBody } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "NOCHILL | BUILT FOR THE OUTSIDERS",
  description: "Cinematic underground luxury streetwear aesthetic.",
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
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
