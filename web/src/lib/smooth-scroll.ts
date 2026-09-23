function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Deliberately slower/more gradual than the browser's native smooth
// scroll (which has no duration control and can feel abrupt) — used by
// the CTA links that jump to another section of the page.
export function smoothScrollTo(targetId: string, duration = 1600) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + window.scrollY;
  const distance = targetY - startY;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || distance === 0) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    return;
  }

  const startTime = performance.now();
  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo({ top: startY + distance * easeInOutCubic(progress), behavior: "auto" });
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
