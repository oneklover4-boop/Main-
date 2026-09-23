"use client";

import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";

const settings = { word: "LAUNCH DOCTORS", scrollLength: 2.4, interactive: true, annotations: false };

// Launch Doctors palette (see globals for the shared token set).
const NAVY = "#043580";
const BLUE = "#1262c1";
const PAPER = "#f2f2f2";
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
        [data-ld-portal-demo] [data-gp-hint]{display:none;}
        [data-ld-portal-demo] [data-gp-enter]{min-height:46px;padding:0 20px;gap:16px;background:${NAVY};border:1px solid ${NAVY};border-radius:10px;color:#fff;font-size:13px;font-weight:600;box-shadow:0 1px 2px rgba(4,53,128,.15);transition:background .18s,box-shadow .18s,transform .18s;}
        [data-ld-portal-demo] [data-gp-enter]:hover{background:${BLUE};box-shadow:0 6px 16px rgba(18,98,193,.28);transform:translateY(-1px);}
        [data-ld-portal-demo] [data-gp-enter]:focus-visible{outline:2px solid ${BLUE};outline-offset:4px;background:${NAVY} !important;color:#fff !important;}
        [data-ld-portal-demo] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;}
        [data-ld-portal-demo] [data-gp-select]{border-color:rgba(0,0,0,.2);border-radius:8px;font-size:12px;color:${INK};}
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
        [data-ld-cta] button{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:44px;padding:.75rem 1.375rem;border-radius:10px;font-weight:600;font-size:.9375rem;font-family:inherit;cursor:pointer;border:1.5px solid transparent;transition:transform .18s ease,box-shadow .18s ease,background-color .18s ease,border-color .18s ease;}
        button[data-ld-cta-primary]{background:${NAVY};color:#fff;}
        button[data-ld-cta-primary]:hover{background:${BLUE};transform:translateY(-2px);box-shadow:0 10px 24px rgba(18,98,193,.28);}
        button[data-ld-cta-ghost]{background:transparent;color:${NAVY};border-color:${NAVY};}
        button[data-ld-cta-ghost]:hover{background:rgba(4,53,128,.06);transform:translateY(-2px);}
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
          "--gp-paper": PAPER,
          "--gp-ink": INK,
          "--gp-field": PAPER,
          "--gp-foreground": INK,
        }}
        scrollLength={s.scrollLength}
        interactive={s.interactive}
        annotations={s.annotations}
        enterLabel="Step inside"
        background={
          // The letters are a literal clip-path cutout of this layer, so
          // it can't be fully transparent (there'd be nothing for the
          // letter shapes to reveal) — but it fades to flat paper well
          // before the bottom of the box, so the box's own edge lands on
          // plain paper and blends into the page wash below it instead of
          // cutting off a still-colorful gradient at a hard boundary.
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              transform: "scale(var(--gp-field-scale,1))",
              background: `radial-gradient(circle 300px at 15% 12%, rgba(52,172,134,.5), transparent), radial-gradient(circle 300px at 85% 16%, rgba(18,98,193,.4), transparent), ${PAPER}`,
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
            <button type="button" data-ld-cta-primary>Book a Launch Health Check</button>
            <button type="button" data-ld-cta-ghost>See how we help</button>
          </div>
          <p data-ld-copy-disclaimer>Strategic consultancy — not a provider of medical advice or clinical services.</p>
        </div>
      </GlyphPortal>
      )}
    </div>
  );
}
