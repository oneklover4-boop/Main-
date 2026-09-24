// Uses the browser's native smooth scroll (compositor-driven) rather than a
// custom rAF/time-based loop — a time-based loop can stutter and then jump
// when the main thread is busy (e.g. with the page's other animations).
export function smoothScrollTo(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}
