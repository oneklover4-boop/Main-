// A custom rAF-driven scroll instead of the browser's native smooth scroll:
// native smooth scroll has no way to control duration, and came out feeling
// rushed for nav-link jumps — this eases toward the target over time so it
// reads as a slow, deliberate glide instead.
//
// The target's position is re-measured every frame rather than computed
// once up front — sections below the fold can still be settling their
// layout shortly after load (carousel sizing, reveal animations), so a
// position snapshotted at the start of a long glide can go stale by the
// time it finishes and land short. Re-reading it each frame makes the
// glide self-correct for that automatically.
const EASE_FACTOR = 0.055;
const SNAP_THRESHOLD_PX = 1;

let activeScrollToken: object | null = null;

export function smoothScrollTo(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    activeScrollToken = null;
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top, behavior: "instant" });
    return;
  }

  const token = {};
  activeScrollToken = token;

  // Explicit behavior:"instant" on every step — the page sets CSS
  // scroll-behavior:smooth globally, and window.scrollTo(x, y) (the
  // two-argument form) defers to that by spec. Without overriding it
  // here, each of this loop's many small per-frame calls would also
  // kick off the browser's own ~300ms smooth-scroll, continuously
  // interrupting itself and crawling far slower than intended.
  const step = () => {
    if (activeScrollToken !== token) return;
    const remaining = target.getBoundingClientRect().top;
    if (Math.abs(remaining) < SNAP_THRESHOLD_PX) {
      window.scrollTo({ top: window.scrollY + remaining, behavior: "instant" });
      return;
    }
    const before = window.scrollY;
    window.scrollTo({ top: before + remaining * EASE_FACTOR, behavior: "instant" });
    // A target near the bottom of the page (e.g. the last section) can be
    // unreachable if there's no more room below it to scroll into — the
    // browser silently clamps to its max scroll position, which would
    // otherwise leave this loop computing a non-shrinking "remaining"
    // forever. Stop once a step produces no actual movement.
    if (window.scrollY === before) return;
    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
