"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform, MotionValue } from "framer-motion";

const LETTERS = "NOCHILL".split("");

/**
 * CustomCursor - Cinematic "N O C H I L L" letter trail.
 *
 * Features:
 * - Letters follow cursor with staggered spring delays.
 * - Each letter follows the one before it to create a true trail.
 * - Spacing between letters stretches based on mouse velocity.
 * - Desktop only (hidden on mobile).
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Base mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Track mouse velocity for dynamic spacing
  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const velocity = useMotionValue(0);

  // Individual springs for each letter.
  // Each letter follows the previous one to create a chain/trail effect.
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };

  // Hook definitions (must be top-level)
  const s0x = useSpring(mouseX, springConfig);
  const s0y = useSpring(mouseY, springConfig);

  const s1x = useSpring(s0x, springConfig);
  const s1y = useSpring(s0y, springConfig);

  const s2x = useSpring(s1x, springConfig);
  const s2y = useSpring(s1y, springConfig);

  const s3x = useSpring(s2x, springConfig);
  const s3y = useSpring(s2y, springConfig);

  const s4x = useSpring(s3x, springConfig);
  const s4y = useSpring(s3y, springConfig);

  const s5x = useSpring(s4x, springConfig);
  const s5y = useSpring(s4y, springConfig);

  const s6x = useSpring(s5x, springConfig);
  const s6y = useSpring(s5y, springConfig);

  const springs = [
    { x: s0x, y: s0y },
    { x: s1x, y: s1y },
    { x: s2x, y: s2y },
    { x: s3x, y: s3y },
    { x: s4x, y: s4y },
    { x: s5x, y: s5y },
    { x: s6x, y: s6y },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveMouse = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const { clientX, clientY } = e;
      const now = Date.now();
      const dt = now - lastPos.current.time;

      if (dt > 0) {
        const dx = clientX - lastPos.current.x;
        const dy = clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        velocity.set(Math.min((dist / dt) * 5, 40));
        lastPos.current = { x: clientX, y: clientY, time: now };
      }

      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, velocity]);

  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100000] overflow-hidden mix-blend-difference"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      {LETTERS.map((letter, i) => (
        <Letter
          key={`${letter}-${i}`}
          letter={letter}
          index={i}
          x={springs[i].x}
          y={springs[i].y}
          velocity={velocity}
        />
      ))}
    </div>
  );
}

/**
 * Individual Letter component to handle reactive transforms
 */
function Letter({ letter, index, x, y, velocity }: {
  letter: string,
  index: number,
  x: MotionValue<number>,
  y: MotionValue<number>,
  velocity: MotionValue<number>
}) {
  // UseTransform allows the spacing to update reactively with velocity
  const spacing = useTransform(velocity, (v: number) => index * v);

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed left-0 top-0 flex items-center justify-center"
    >
      <motion.span
        className="text-[10px] font-bold tracking-tighter text-white"
        style={{ x: spacing }}
      >
        {letter}
      </motion.span>
    </motion.div>
  );
}
