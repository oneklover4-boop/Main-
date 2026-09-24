"use client";

/**
 * A scroll-driven camera that zooms into a logo image, then fades it out
 * to reveal the section's content underneath. Sibling to GlyphPortal (same
 * pin/reveal mechanics), but the "ink" being zoomed into is a raster image
 * instead of a live type glyph, so there's no canvas letter-hole detection.
 */
import { useId, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type LogoPortalStyle = CSSProperties & {
  "--lp-paper"?: string;
  "--lp-field"?: string;
};

export type LogoPortalProps = {
  src: string;
  alt: string;
  /** Percentage point within the image to zoom toward (its focal "aperture"). */
  zoomOrigin?: { x: number; y: number };
  /** How large the image grows by the end of the zoom, relative to its start size. */
  endScale?: number;
  /** Decorative, inert, mounted once. Fills the pinned section behind the logo. */
  background?: ReactNode;
  /** Optional foreground composition for the opening frame (e.g. a header bar). */
  front?: ReactNode;
  children?: ReactNode;
  /** Scroll travel in visible container heights, clamped to 1-8. */
  scrollLength?: number;
  hint?: string;
  className?: string;
  style?: LogoPortalStyle;
  onProgress?: (progress: number) => void;
};

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const smooth = (a: number, b: number, n: number) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function scrollParent(element: HTMLElement): HTMLElement | null {
  for (let p = element.parentElement; p; p = p.parentElement) {
    if (/(auto|scroll|hidden)/.test(getComputedStyle(p).overflowY) && p !== document.body && p !== document.documentElement) return p;
  }
  return null;
}

export default function LogoPortal({
  src, alt, zoomOrigin = { x: 50, y: 50 }, endScale = 30, background, front, children,
  scrollLength = 2.4, hint = "Scroll to enter.", className, style, onProgress,
}: LogoPortalProps) {
  const uid = `lp-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(onProgress);
  useLayoutEffect(() => { progressRef.current = onProgress; }, [onProgress]);
  const length = Number.isFinite(scrollLength) ? clamp(scrollLength, 1, 8) : 2.4;
  const q = `:where(#${uid})`;

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const image = section.querySelector<HTMLImageElement>("[data-lp-image]")!;
    const root = scrollParent(section);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false, raf = 0, dirty = true, active = true;
    const mountedAt = performance.now();
    let browserFrameSeen = false, stalled = false;
    let H = 1, travel = 1;
    let lastProgress = -1;

    image.style.transformOrigin = `${zoomOrigin.x}% ${zoomOrigin.y}%`;

    const position = () => {
      const origin = root ? root.getBoundingClientRect().top + root.clientTop : 0;
      return clamp((origin - section.getBoundingClientRect().top) / travel);
    };

    const paint = (progress: number) => {
      const isStatic = motion.matches || !browserFrameSeen || stalled;
      const p = isStatic ? 0 : progress;
      const t = clamp(p / 0.78);
      const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      const scale = 1 + (endScale - 1) * eased;
      image.style.transform = `scale(${scale})`;
      image.style.opacity = String(1 - smooth(0.6, 0.85, p));
      section.style.setProperty("--lp-caption", String(1 - smooth(0.01, 0.16, p)));
      section.style.setProperty("--lp-reveal", String(isStatic ? 1 : smooth(0.78, 0.9, p)));
      section.style.setProperty("--lp-field-scale", String(1 + .16 * smooth(0, .82, p)));
      section.style.setProperty("--lp-caption-hit", p < 0.08 ? "auto" : "none");
      section.dataset.lpEntered = String(p >= 0.9);
      section.dataset.lpProgress = p.toFixed(5);
      if (p !== lastProgress) { lastProgress = p; progressRef.current?.(p); }
    };

    const layout = () => {
      if (!section.clientWidth) return;
      const smallViewport = section.querySelector<HTMLElement>("[data-lp-viewport]")!.offsetHeight;
      const viewportHeight = Math.max(1, Math.min(root?.clientHeight ?? smallViewport, smallViewport));
      H = motion.matches ? Math.min(viewportHeight * 0.75, 480) : viewportHeight;
      section.style.setProperty("--lp-height", `${H}px`);
      travel = H * length;
      section.dataset.lpReady = "true";
      section.dataset.lpMotion = !motion.matches && browserFrameSeen && !stalled ? "on" : "off";
    };

    const frame = (time?: number) => {
      raf = 0;
      if (disposed) return;
      if (time !== undefined && !browserFrameSeen) {
        browserFrameSeen = true; stalled ||= performance.now() - mountedAt > 2500; dirty = true;
      }
      if (dirty) { dirty = false; layout(); }
      paint(position());
    };
    const schedule = () => { if (!raf && active) raf = requestAnimationFrame(frame); };
    const resize = () => { cancelAnimationFrame(raf); dirty = true; frame(); };
    const scroll = () => schedule();
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    if (root) observer.observe(root);
    const visibility = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) { dirty = true; schedule(); }
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { root, rootMargin: "100% 0px" });
    visibility.observe(section);
    (root ?? window).addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);
    motion.addEventListener("change", resize);
    frame();
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
      (root ?? window).removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      motion.removeEventListener("change", resize);
    };
  }, [src, length, endScale, zoomOrigin.x, zoomOrigin.y]);

  return (
    <section ref={sectionRef} id={uid} className={className}
      style={{ "--lp-length": length, ...style } as CSSProperties}>
      <style>{`
        ${q}{--lp-paper:#fff;--lp-field:#0b3b2a;position:relative;isolation:isolate;background:var(--lp-paper);font-family:Arial,sans-serif;}
        ${q}>[data-lp-viewport]{position:absolute;inset:0 auto auto 0;height:100vh;height:100svh;width:0;pointer-events:none;visibility:hidden;}
        ${q} [data-lp-pin]{position:relative;height:var(--lp-height,100svh);overflow:clip;isolation:isolate;container-type:size;}
        ${q} [data-lp-field]{position:absolute;inset:0;background:var(--lp-field);opacity:0;pointer-events:none;}
        ${q}[data-lp-ready] [data-lp-field]{opacity:1;}
        ${q} [data-lp-stage]{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(20px,4svh,36px);pointer-events:none;}
        ${q} [data-lp-imagewrap]{display:grid;place-items:center;overflow:visible;}
        ${q} [data-lp-image]{width:min(58vmin,460px);aspect-ratio:2.0927;object-fit:contain;will-change:transform,opacity;}
        ${q} [data-lp-front]{position:absolute;inset:0;opacity:var(--lp-caption,1);pointer-events:none;}
        ${q} [data-lp-front] a,${q} [data-lp-front] button{pointer-events:var(--lp-caption-hit,auto);}
        ${q} [data-lp-caption]{display:flex;align-items:center;justify-content:center;font:12px/1.4 Arial,sans-serif;opacity:var(--lp-caption,1);pointer-events:var(--lp-caption-hit,auto);}
        ${q} [data-lp-content]{box-sizing:border-box;position:relative;min-height:var(--lp-height,100svh);padding:clamp(32px,7%,100px);display:grid;align-content:center;background:var(--lp-field);overflow-wrap:anywhere;}
        ${q}[data-lp-motion=on] [data-lp-pin]{position:sticky;top:0;}
        ${q}[data-lp-motion=off] [data-lp-hint]{display:none;}
        ${q}[data-lp-motion=on] [data-lp-content]{margin-top:calc((var(--lp-length) - 1) * var(--lp-height));background:transparent;opacity:var(--lp-reveal,0);pointer-events:none;}
        ${q}[data-lp-motion=on][data-lp-entered=true] [data-lp-content]{pointer-events:auto;}
        ${q}[data-lp-motion=on] [data-lp-content]:focus-within{opacity:1;pointer-events:auto;}
        ${q}:has([data-lp-content]:focus-within) [data-lp-caption]{opacity:0;}
        @media(prefers-reduced-motion:reduce){${q} [data-lp-pin]{position:relative!important;} ${q} [data-lp-content]{margin-top:0!important;opacity:1!important;background:var(--lp-field)!important;min-height:0;padding-block:64px;} ${q} [data-lp-caption]{opacity:1!important;}}
      `}</style>
      <div data-lp-viewport aria-hidden="true" />
      <div data-lp-pin>
        <div data-lp-field aria-hidden="true">{background}</div>
        <div data-lp-stage>
          <div data-lp-imagewrap>
            <img data-lp-image src={src} alt="" aria-hidden="true" />
          </div>
          <div data-lp-caption>
            <span data-lp-hint aria-hidden="true">{hint}</span>
          </div>
        </div>
        {front && <div data-lp-front>{front}</div>}
      </div>
      <div data-lp-content id={`${uid}-content`} tabIndex={-1}>
        {children}
      </div>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>{alt}</span>
    </section>
  );
}
