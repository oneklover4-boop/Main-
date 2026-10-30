"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";

type PopInViewProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.div>,
  "ref" | "style" | "children"
> & {
  children: React.ReactNode;
  /** Max slide distance in px at either edge of the viewport; 0 for no movement at all. */
  y?: number;
  style?: React.CSSProperties;
};

// Two separate scroll-linked motions on the same element, with different
// replay rules:
//
// - Opacity ramps across a short band right as the element reaches the
//   bottom of the viewport — a fast ~0.25s snap, measured frame-by-frame
//   off the reference recording — then stays fully visible. Its progress is
//   latched at the highest value reached, so once an element has revealed
//   itself it stays visible for good; scrolling back up and down again
//   later doesn't fade it back out and in.
// - Position drifts continuously across the element's ENTIRE time anywhere
//   in the viewport (from first entering at the bottom to fully exiting at
//   the top), bound directly and continuously to live scroll position (not
//   latched) — it keeps gliding every time, in both directions, for as long
//   as the page stays open. This is the subtle, always-on parallax feel.
export function PopInView({ children, y = 60, style, ...rest }: PopInViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: enterProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.15"] });
  const maxEnterProgress = useMotionValue(0);
  useMotionValueEvent(enterProgress, "change", (latest) => {
    if (latest > maxEnterProgress.get()) maxEnterProgress.set(latest);
  });
  const opacity = useTransform(maxEnterProgress, [0, 0.18, 0.5, 1], [0, 0, 1, 1]);

  const { scrollYProgress: travelProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const translateY = useTransform(travelProgress, [0, 1], [y, -y]);

  return (
    <motion.div ref={ref} style={{ ...style, opacity, y: translateY }} {...rest}>
      {children}
    </motion.div>
  );
}
