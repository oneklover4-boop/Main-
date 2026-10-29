"use client";

import { motion } from "motion/react";

type FadeInViewProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.div>,
  "initial" | "whileInView" | "viewport" | "transition" | "children"
> & {
  children: React.ReactNode;
  /** Slide-up distance in px on entry; 0 for a fade with no movement. */
  y?: number;
  /** Fraction of the element that must be visible before it triggers. */
  amount?: number;
};

// Fades an element in (and optionally slides it up slightly) the first time
// it scrolls into view on a fresh page load, then leaves it settled —
// scrolling it out and back in later in the same visit doesn't replay it.
export function FadeInView({ children, y = 36, amount = 0.3, ...rest }: FadeInViewProps) {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
