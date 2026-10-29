"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";

type FadeInViewProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.div>,
  "ref" | "style" | "children"
> & {
  children: React.ReactNode;
  /** Slide-up distance in px on entry; 0 for a fade with no movement. */
  y?: number;
  style?: React.CSSProperties;
};

// Fades (and optionally slides up) an element as it scrolls through the
// lower half of the viewport — bound directly to scroll position, so it
// moves exactly with the scroll gesture rather than playing a fixed-length
// animation. Progress is latched at its highest point reached, so once the
// element has fully revealed itself, scrolling back up and down again later
// in the same visit leaves it settled rather than fading it back out.
export function FadeInView({ children, y = 36, style, ...rest }: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.15"] });
  const maxProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress.get()) maxProgress.set(latest);
  });
  const opacity = useTransform(maxProgress, [0, 1], [0, 1]);
  const translateY = useTransform(maxProgress, [0, 1], [y, 0]);

  return (
    <motion.div ref={ref} style={{ ...style, opacity, y: translateY }} {...rest}>
      {children}
    </motion.div>
  );
}
