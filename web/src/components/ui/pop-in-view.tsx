"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";

type PopInViewProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.div>,
  "ref" | "style" | "children"
> & {
  children: React.ReactNode;
  /** Slide distance in px; 0 for no movement at all. */
  y?: number;
  /**
   * When true, position keeps drifting continuously for as long as the
   * element is anywhere in the viewport (the "moves with your scroll"
   * parallax feel) — scoped to only the offer cards and team photos.
   * When false (default), position only plays once as part of the
   * entrance pop-in, then holds still — it doesn't keep moving with
   * further scrolling.
   */
  parallax?: boolean;
  style?: React.CSSProperties;
};

// Opacity always ramps across a short band right as the element reaches the
// bottom of the viewport — a fast ~0.25s snap, measured frame-by-frame off
// the reference recording — then stays fully visible. Its progress (and,
// for non-parallax elements, position too) is latched at the highest value
// reached, so once an element has popped in it stays settled for good;
// scrolling back up and down again later doesn't replay it.
//
// Only when `parallax` is set does position instead bind to a second,
// unlatched scroll range covering the element's entire time in the
// viewport (entering to exiting), so it keeps gliding every time, in both
// directions, for as long as the page stays open.
export function PopInView({ children, y = 90, parallax = false, style, ...rest }: PopInViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: enterProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.15"] });
  const maxEnterProgress = useMotionValue(0);
  useMotionValueEvent(enterProgress, "change", (latest) => {
    if (latest > maxEnterProgress.get()) maxEnterProgress.set(latest);
  });
  const opacity = useTransform(maxEnterProgress, [0, 0.18, 0.5, 1], [0, 0, 1, 1]);
  const enterY = useTransform(maxEnterProgress, [0, 1], [y, 0]);

  const { scrollYProgress: travelProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travelY = useTransform(travelProgress, [0, 1], [y, -y]);

  return (
    <motion.div ref={ref} style={{ ...style, opacity, y: parallax ? travelY : enterY }} {...rest}>
      {children}
    </motion.div>
  );
}
