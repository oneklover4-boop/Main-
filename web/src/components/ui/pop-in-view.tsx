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

// Pops an element into place as it scrolls through a short band near the
// bottom of the viewport — bound directly to scroll position, so it moves
// exactly with the scroll gesture rather than playing a fixed-length
// animation. Frame-by-frame measurement against the reference recording
// put its own transition at ~6 frames (0.25s): a quick snap, not a slow
// lingering fade, so the scroll band here is kept short (28% of viewport
// height) to match that speed rather than stretching across most of the
// scroll like a gradual reveal. Progress is latched at its highest point
// reached, so once the element has settled, scrolling back up and down
// again later in the same visit leaves it settled rather than re-animating.
export function PopInView({ children, y = 36, style, ...rest }: PopInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.57"] });
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
