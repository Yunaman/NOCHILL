"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { PageTransition } from "@/components/ui/PageTransition";
import { Cart } from "@/components/ui/Cart";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Particles } from "@/components/ui/Particles";
import { useLenis } from "@/hooks/useLenis";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Apply smooth scroll globally
  useLenis();

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener("open-cart", handleOpenCart);
    return () => window.removeEventListener("open-cart", handleOpenCart);
  }, []);

  return (
    <>
      <CustomCursor />
      <Particles />
      <LoadingScreen />
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
    </>
  );
}
