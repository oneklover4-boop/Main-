"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type PopInViewProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.div>,
  "ref" | "style" | "children"
> & {
  children: React.ReactNode;
  /** Slide-up distance in px on entry; 0 for no movement at all. */
  y?: number;
  style?: React.CSSProperties;
};

// Bound directly, continuously to scroll position (not a one-shot reveal) —
// it genuinely moves with the scroll gesture every time the element passes
// through this band, in both directions, for as long as the page is open.
// Opacity ramps across the first third or so of the band (a fast ~0.25s
// snap, measured frame-by-frame off the reference recording) while the
// position keeps gliding smoothly across the whole band, so the fade feels
// quick while the motion stays continuous.
export function PopInView({ children, y = 90, style, ...rest }: PopInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.15"] });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.5, 1], [0, 0, 1, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [y, 0]);

  return (
    <motion.div ref={ref} style={{ ...style, opacity, y: translateY }} {...rest}>
      {children}
    </motion.div>
  );
}
