"use client";

import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const settings = { word: "LAUNCH DOCTORS", scrollLength: 2.4, interactive: true, annotations: false };

// Launch Doctors palette (see globals for the shared token set).
const NAVY = "#043580";
const BLUE = "#1262c1";
const INK = "#000000";
const MUTED = "#4a4a4a";

// Inter is loaded via the plain Google Fonts <link> in app/layout.tsx
// (same font already used across the rest of the site) rather than a
// third-party CDN mirror — as a literal family name, not a next/font CSS
// variable, since GlyphPortal checks every resolved font-family entry
// independently via document.fonts.check().
const FONT_FAMILY = "Inter, Arial, sans-serif";

export default function GlyphPortalDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  // GlyphPortal checks font availability synchronously on mount and, if the
  // requested face isn't loaded yet, permanently falls back to a static
  // (non-interactive) display for that mount — by design, so the camera
  // never zooms into ink measured from the wrong fallback font. So mounting
  // has to wait for Inter to actually finish loading, same as the original
  // demo's own font-loading gate, just pointed at a reliable Google Fonts
  // load instead of a third-party CDN mirror.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let settled = false;
    const finish = () => {
      if (!settled) {
        settled = true;
        setReady(true);
      }
    };
    const timeout = window.setTimeout(finish, 1600);
    document.fonts.load("900 100px Inter").then(finish, finish);
    return () => {
      settled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      id="home"
      data-demo-scroll
      data-ld-portal-demo
      tabIndex={0}
      role="region"
      aria-label="Launch Doctors. Scroll to step inside."
      style={{
        width: "100%",
        height: "min(720px, 100svh)",
        overflowY: "auto",
        containerType: "inline-size",
        fontFamily: FONT_FAMILY,
      }}
    >
      <style>{`
        [data-ld-portal-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-ld-portal-demo] [data-gp-hint]{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:${MUTED};}
        [data-ld-portal-demo] [data-gp-hint]::after{content:"";width:12px;height:12px;flex-shrink:0;background-color:currentColor;-webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>') center/contain no-repeat;mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>') center/contain no-repeat;}
        [data-ld-portal-demo] [data-gp-enter]{display:none !important;}
        [data-ld-portal-demo] [data-gp-touch-picker]{display:none !important;}
        [data-ld-portal-demo] [data-gp-letter]:focus-visible{outline-color:${NAVY} !important;}
        [data-ld-header]{position:absolute;inset:clamp(24px,4.5cqw,48px) clamp(24px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        [data-ld-logo]{display:inline-flex;align-items:center;gap:10px;font-size:17px;font-weight:700;letter-spacing:-.02em;color:${INK};}
        [data-ld-logo-mark]{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:6px;background:${NAVY};color:#fff;font-size:11px;font-weight:700;}
        [data-ld-category]{font-size:12px;line-height:1.5;color:${INK};font-weight:500;}
        @container(max-width:450px){[data-ld-category]{max-width:12ch;text-align:right;}[data-ld-portal-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}}
        @container(max-height:479px){[data-ld-header]{top:18px;}[data-ld-portal-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}}
        [data-ld-portal-demo] [data-gp-content]{padding:5.5rem clamp(1.25rem,5cqw,5rem) 6.5rem;font-family:inherit;}
        [data-ld-portal-demo] section,[data-ld-portal-demo] [data-gp-caption]{font-family:inherit;}
        [data-ld-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:flex-start;gap:clamp(1.5rem,4svh,2.5rem);}
        [data-ld-copy] h2{max-width:48rem;margin:0;color:inherit;font-size:clamp(1.75rem,1.1rem + 2.1cqw,2.25rem);font-weight:700;line-height:1.2;letter-spacing:-.01em;text-wrap:balance;}
        [data-ld-copy] p{margin:0;color:${MUTED};font-size:1.0625rem;line-height:1.6;max-width:38rem;}
        [data-ld-cta]{display:flex;flex-wrap:wrap;gap:1rem;}
        [data-ld-cta] a{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:44px;padding:.75rem 1.375rem;border-radius:10px;font-weight:600;font-size:.9375rem;font-family:inherit;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:transform .18s ease,box-shadow .18s ease,background-color .18s ease,border-color .18s ease;}
        a[data-ld-cta-primary]{background:${NAVY};color:#fff;}
        a[data-ld-cta-primary]:hover{background:${BLUE};transform:translateY(-2px);box-shadow:0 10px 24px rgba(18,98,193,.28);}
        a[data-ld-cta-ghost]{background:transparent;color:${NAVY};border-color:${NAVY};}
        a[data-ld-cta-ghost]:hover{background:rgba(4,53,128,.06);transform:translateY(-2px);}
        [data-ld-copy-disclaimer]{margin:0;font-size:.8125rem;font-style:italic;color:${MUTED};}
      `}</style>
      {!ready ? (
        <div role="status" style={{ height: "100%", display: "grid", placeItems: "center", color: "#555", fontSize: 12 }}>
          Loading type…
        </div>
      ) : (
      <GlyphPortal
        word={s.word}
        fontFamily={FONT_FAMILY}
        fontWeight={900}
        style={{
          fontFamily: FONT_FAMILY,
          // Transparent so the shared AuroraBackground (app/page.tsx)
          // shows through everywhere this component would otherwise
          // paint its own background — including [data-gp-content]'s
          // fallback fill, which uses --gp-field directly and isn't
          // always overridden to transparent by the motion-on state,
          // so a solid color here reliably turns into a solid block
          // covering the whole revealed content. The couple of vendored
          // rules that actually need a visible color (a focus outline)
          // are overridden separately below.
          "--gp-paper": "transparent",
          "--gp-ink": INK,
          "--gp-field": "transparent",
          "--gp-foreground": INK,
        }}
        scrollLength={s.scrollLength}
        interactive={s.interactive}
        annotations={s.annotations}
        enterLabel="Step inside"
        background={
          // The letters are a literal clip-path cutout of this layer, so
          // it needs *some* local contrast against the page's fixed wash
          // showing through everywhere else — a single top-to-bottom
          // fade (not the blob shapes used before) so it's uniform
          // across the full width of a wide word like "LAUNCH DOCTORS"
          // instead of leaving gaps between blobs. It fades to fully
          // transparent well before the bottom of the box, so there's
          // nothing of this layer left to mismatch against the fixed
          // wash by the time you reach the box's edge — both are simply
          // the same fixed background there, with nothing layered on it.
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              // Measured: the word sits roughly 40-52% down the box, so
              // the strong navy band is centered there (not at the very
              // top, which would sit above the letters and do nothing
              // for their legibility).
              background: "linear-gradient(180deg, rgba(30,140,165,.25) 0%, rgba(18,98,193,.4) 24%, rgba(4,53,128,.85) 38%, rgba(4,53,128,.82) 50%, rgba(18,98,193,.35) 63%, transparent 78%)",
              // This layer is only for contrast behind the pre-zoom
              // letters. The vendored component drops the clip-path
              // (exposing this whole layer, not just the letter shapes)
              // at p=0.78, then only starts fading --gp-reveal in after
              // that (0.78→0.9) — fading this out on --gp-reveal alone
              // left a window right at p=0.78 where the clip-path had
              // already dropped but this hadn't started fading yet,
              // flashing the full, still-opaque overlay across the whole
              // box for a moment before it caught up. --gp-field-scale
              // ramps continuously from 1→1.16 across roughly the same
              // 0→0.82 span the clip-path drop sits inside, so deriving
              // the fade from that instead reaches ~0 right as the
              // clip-path comes off, with nothing left to flash.
              opacity: "calc(1 - (var(--gp-field-scale, 1) - 1) / 0.16)",
            }}
          />
        }
        front={
          <>
            <div data-ld-header>
              <span data-ld-logo>
                <span data-ld-logo-mark aria-hidden="true">LD</span>
                Launch Doctors
              </span>
              <span data-ld-category>Strategic BioPharma Launch Consultancy</span>
            </div>
          </>
        }
      >
        <div data-ld-copy>
          <h2>Structure, Clarity, Momentum</h2>
          <p>
            At Launch Doctors, we help emerging and mid-sized biopharma
            companies diagnose launch risks, build integrated launch plans,
            and prepare their organisations for successful commercialisation.
          </p>
          <div data-ld-cta>
            {/* No destination page yet — wire these up once it exists. */}
            <a href="#contact" data-ld-cta-primary onClick={(e) => { e.preventDefault(); smoothScrollTo("contact"); }}>
              Book a Launch Health Check
            </a>
            <a href="#how-we-help" data-ld-cta-ghost onClick={(e) => { e.preventDefault(); smoothScrollTo("how-we-help"); }}>
              See how we help
            </a>
          </div>
          <p data-ld-copy-disclaimer>Strategic consultancy — not a provider of medical advice or clinical services.</p>
        </div>
      </GlyphPortal>
      )}
    </div>
  );
}
