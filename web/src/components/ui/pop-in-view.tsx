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

// Pops an element into place as it scrolls through the lower part of the
// viewport — bound directly to scroll position (not a fixed-length
// animation), so the position genuinely moves with the scroll gesture the
// whole time it's entering, the way it does on the reference site. Opacity
// is bound to the same underlying scroll progress but only ramps across the
// first third or so of that same range: frame-by-frame measurement against
// the reference recording put its fade at ~6 frames (0.25s), a quick snap,
// while the position keeps gliding smoothly for the rest of the band —
// so the fade feels snappy while the motion still reads as continuous.
// Progress is latched at its highest point reached, so once the element has
// settled, scrolling back up and down again later in the same visit leaves
// it settled rather than re-animating.
export function PopInView({ children, y = 90, style, ...rest }: PopInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.15"] });
  const maxProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress.get()) maxProgress.set(latest);
  });
  const opacity = useTransform(maxProgress, [0, 0.18, 0.5, 1], [0, 0, 1, 1]);
  const translateY = useTransform(maxProgress, [0, 1], [y, 0]);

  return (
    <motion.div ref={ref} style={{ ...style, opacity, y: translateY }} {...rest}>
      {children}
    </motion.div>
  );
}
