"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type PopInViewProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.div>,
  "ref" | "style" | "children"
> & {
  children: React.ReactNode;
  /** Max slide distance in px at either edge of the viewport; 0 for no movement at all. */
  y?: number;
  style?: React.CSSProperties;
};

// Two separate scroll-linked motions, both bound directly and continuously
// to live scroll position (not one-shot, not latched) — they replay every
// time, for as long as the page stays open, exactly matching the scroll
// gesture in both directions:
//
// - Opacity ramps across a short band right as the element reaches the
//   bottom of the viewport — a fast ~0.25s snap, measured frame-by-frame
//   off the reference recording — then stays fully visible.
// - Position drifts continuously across the element's ENTIRE time anywhere
//   in the viewport (from first entering at the bottom to fully exiting at
//   the top), not just while entering. This is what gives the subtle,
//   always-on "it's moving with your scroll a little" parallax feel: every
//   element on screen keeps gliding slightly relative to the page the whole
//   time, not just whichever one happens to be mid-entrance.
export function PopInView({ children, y = 60, style, ...rest }: PopInViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: enterProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.15"] });
  const opacity = useTransform(enterProgress, [0, 0.18, 0.5, 1], [0, 0, 1, 1]);

  const { scrollYProgress: travelProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const translateY = useTransform(travelProgress, [0, 1], [y, -y]);

  return (
    <motion.div ref={ref} style={{ ...style, opacity, y: translateY }} {...rest}>
      {children}
    </motion.div>
  );
}
