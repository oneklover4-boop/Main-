"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";

type PopInViewProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.div>,
  "ref" | "style" | "children"
> & {
  children: React.ReactNode;
  /** Slide-up distance in px on entry; 0 for no movement at all. */
  y?: number;
  style?: React.CSSProperties;
};

// Slides an element up into place as it scrolls through the lower half of
// the viewport — bound directly to scroll position, so it moves exactly
// with the scroll gesture rather than playing a fixed-length animation.
// Stays fully opaque throughout (no fade) — it pops into place, not fades.
// Progress is latched at its highest point reached, so once the element has
// settled, scrolling back up and down again later in the same visit leaves
// it settled rather than re-animating.
export function PopInView({ children, y = 36, style, ...rest }: PopInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.15"] });
  const maxProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress.get()) maxProgress.set(latest);
  });
  const translateY = useTransform(maxProgress, [0, 1], [y, 0]);

  return (
    <motion.div ref={ref} style={{ ...style, y: translateY }} {...rest}>
      {children}
    </motion.div>
  );
}
