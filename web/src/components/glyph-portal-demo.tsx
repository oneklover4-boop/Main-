"use client";

import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { AuroraBeam } from "@/components/ui/aurora-background";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const settings = { word: "LAUNCH DOCTORS", scrollLength: 2.4, interactive: true, annotations: false };

// Launch Doctors palette (see globals for the shared token set).
const NAVY = "#043580";
const INK = "#000000";
const MUTED = "#4a4a4a";
const BLUE = "#1262c1";

const navLinks = [
  { href: "#how-we-help", label: "How We Help" },
  { href: "#health-check", label: "Launch Health Check" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

// Inter is loaded via the plain Google Fonts <link> in app/layout.tsx
// (same font already used across the rest of the site) rather than a
// third-party CDN mirror — as a literal family name, not a next/font CSS
// variable, since GlyphPortal checks every resolved font-family entry
// independently via document.fonts.check(). Reserved for the giant
// interactive word only — its zoom/clip-path is calibrated to Inter's
// specific glyph shapes and measurements, so it doesn't follow the
// site's heading/body font change below.
const FONT_FAMILY = "Inter, Arial, sans-serif";
// Everything else in the hero (header, hint, the revealed paragraph
// and CTAs) uses the site's body font instead. The revealed h2 gets
// the heading font automatically too, via the global h1-h6 rule in
// globals.css.
const BODY_FONT_FAMILY = '"PT Sans", Arial, sans-serif';

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
        fontFamily: BODY_FONT_FAMILY,
        background: "#ffffff",
      }}
    >
      <style>{`
        [data-ld-portal-demo] [data-gp-letter]{font-family:${FONT_FAMILY} !important;}
        [data-ld-portal-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-ld-portal-demo] [data-gp-hint]{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:${MUTED};}
        [data-ld-portal-demo] [data-gp-hint]::after{content:"";width:12px;height:12px;flex-shrink:0;background-color:currentColor;-webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>') center/contain no-repeat;mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>') center/contain no-repeat;animation:gp-hint-bounce 2.2s ease-in-out infinite;}
        @keyframes gp-hint-bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(4px);}}
        @media (prefers-reduced-motion: reduce){[data-ld-portal-demo] [data-gp-hint]::after{animation:none;}}
        [data-ld-portal-demo] [data-gp-enter]{display:none !important;}
        [data-ld-portal-demo] [data-gp-touch-picker]{display:none !important;}
        [data-ld-portal-demo] [data-gp-letter]:focus-visible{outline-color:${NAVY} !important;}
        [data-ld-header]{position:absolute;inset:clamp(24px,4.5cqw,48px) clamp(24px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        [data-ld-logo]{display:inline-flex;align-items:center;}
        [data-ld-logo] img{height:32px;width:auto;display:block;}
        [data-ld-category]{font-size:12px;line-height:1.5;color:${INK};font-weight:500;}
        @container(max-width:450px){[data-ld-category]{max-width:12ch;text-align:right;}[data-ld-portal-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}}
        @container(max-height:479px){[data-ld-header]{top:18px;}[data-ld-portal-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}}
        [data-ld-portal-demo] [data-gp-content]{padding:5.5rem clamp(1.25rem,5cqw,5rem) 6.5rem;font-family:inherit;}
        [data-ld-portal-demo] section,[data-ld-portal-demo] [data-gp-caption]{font-family:inherit;}
        [data-ld-content-nav]{position:absolute;top:clamp(24px,4.5cqw,48px);right:clamp(1.25rem,5cqw,5rem);display:flex;flex-wrap:wrap;justify-content:flex-end;gap:1.25rem;filter:blur(calc((1 - var(--gp-reveal, 0)) * 10px));}
        [data-ld-content-nav] a{font-size:0.875rem;font-weight:500;text-decoration:none;color:${INK};transition:color .15s ease;}
        [data-ld-content-nav] a:hover{color:${BLUE};}
        [data-ld-content-logo]{position:absolute;top:clamp(24px,4.5cqw,48px);left:clamp(1.25rem,5cqw,5rem);display:inline-flex;align-items:center;filter:blur(calc((1 - var(--gp-reveal, 0)) * 10px));}
        [data-ld-content-logo] img{height:28px;width:auto;display:block;}
        [data-ld-content-topbar-line]{position:absolute;top:calc(clamp(24px,4.5cqw,48px) + 44px);left:clamp(1.25rem,5cqw,5rem);right:clamp(1.25rem,5cqw,5rem);height:1px;background:rgba(0,0,0,.12);filter:blur(calc((1 - var(--gp-reveal, 0)) * 10px));}
        [data-ld-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:center;text-align:center;gap:clamp(1.5rem,4svh,2.5rem);filter:blur(calc((1 - var(--gp-reveal, 0)) * 10px));}
        [data-ld-copy] h2{max-width:48rem;margin:0;color:${NAVY};font-size:clamp(2.5rem,1.6rem + 3.6cqw,4rem);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance;}
        [data-ld-copy] p{margin:0;color:${MUTED};font-size:1.0625rem;line-height:1.6;max-width:38rem;}
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
          fontFamily: BODY_FONT_FAMILY,
          // Transparent so the wrapper's own flat white background
          // (deliberately plain — the aurora beam only applies to the
          // content sections below, not the hero) shows through
          // everywhere this component would otherwise paint its own
          // background — including [data-gp-content]'s
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
          // The letters are a literal clip-path cutout of this layer.
          // Two sub-layers, stacked: the aurora beam (same pattern used
          // by every content section below) fades IN as the content
          // reveals via --gp-reveal — invisible on the pre-zoom title
          // screen, which stays flat white, but present once you've
          // scrolled into "Structure, Clarity, Momentum" so that first
          // revealed screen matches every section after it. On top of
          // it, the existing top-to-bottom navy fade gives the pre-zoom
          // letters contrast, and fades itself out as the clip-path
          // comes off so nothing's left over it by the time you reach
          // the revealed content.
          <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                opacity: "calc(var(--gp-reveal, 0))",
              }}
            >
              <AuroraBeam />
            </div>
            <div
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
          </div>
        }
        front={
          <>
            <div data-ld-header>
              <span data-ld-logo>
                <img src="images/logo-full.png" alt="Launch Doctors" />
              </span>
              <span data-ld-category>Strategic BioPharma Launch Consultancy</span>
            </div>
          </>
        }
      >
        <a
          href="#home"
          data-ld-content-logo
          onClick={(e) => { e.preventDefault(); smoothScrollTo("home"); }}
        >
          <img src="images/logo-full.png" alt="Launch Doctors" />
        </a>
        <nav data-ld-content-nav aria-label="Page sections">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href.slice(1)); }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div data-ld-content-topbar-line aria-hidden="true" />
        <div data-ld-copy>
          <h2>Structure, Clarity, Momentum</h2>
          <p>
            We help emerging and mid-sized biopharma companies diagnose
            launch risks and build integrated plans for a successful
            commercial launch.
          </p>
        </div>
      </GlyphPortal>
      )}
    </div>
  );
}
