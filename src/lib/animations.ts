import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const imageHover: Variants = {
  initial: { scale: 1, filter: "grayscale(100%)" },
  hover: {
    scale: 1.05,
    filter: "grayscale(0%)",
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  }
};

export const slideInRight: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  }
};
