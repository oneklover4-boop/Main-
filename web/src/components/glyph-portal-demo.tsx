"use client";

import LogoPortal from "@/components/ui/logo-portal";
import { AuroraBeam } from "@/components/ui/aurora-background";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const settings = { scrollLength: 2.4 };

// Launch Doctors palette (see globals for the shared token set).
const NAVY = "#043580";
const INK = "#000000";
const MUTED = "#4a4a4a";

const BODY_FONT_FAMILY = '"PT Sans", Arial, sans-serif';

// The little gradient circle above the "A" mark, as a percentage point
// within the cropped logo file — the camera zooms toward this point.
const LOGO_ZOOM_ORIGIN = { x: 31.5, y: 14.75 };

export default function GlyphPortalDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };

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
        [data-ld-portal-demo] [data-lp-hint]{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:${MUTED};}
        [data-ld-portal-demo] [data-lp-hint]::after{content:"";width:12px;height:12px;flex-shrink:0;background-color:currentColor;-webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>') center/contain no-repeat;mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>') center/contain no-repeat;animation:gp-hint-bounce 2.2s ease-in-out infinite;}
        @keyframes gp-hint-bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(4px);}}
        @media (prefers-reduced-motion: reduce){[data-ld-portal-demo] [data-lp-hint]::after{animation:none;}}
        [data-ld-header]{position:absolute;inset:clamp(24px,4.5cqw,48px) clamp(24px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        [data-ld-logo]{display:inline-flex;align-items:center;gap:10px;font-size:17px;font-weight:700;letter-spacing:-.02em;color:${INK};}
        [data-ld-logo-mark]{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:6px;background:${NAVY};color:#fff;font-size:11px;font-weight:700;}
        [data-ld-category]{font-size:12px;line-height:1.5;color:${INK};font-weight:500;}
        @container(max-width:450px){[data-ld-category]{max-width:12ch;text-align:right;}}
        [data-ld-portal-demo] [data-lp-content]{padding:5.5rem clamp(1.25rem,5cqw,5rem) 6.5rem;font-family:inherit;}
        [data-ld-portal-demo] section,[data-ld-portal-demo] [data-lp-caption]{font-family:inherit;}
        [data-ld-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:flex-start;gap:clamp(1.5rem,4svh,2.5rem);filter:blur(calc((1 - var(--lp-reveal, 0)) * 10px));}
        [data-ld-copy] h2{max-width:48rem;margin:0;color:inherit;font-size:clamp(1.75rem,1.1rem + 2.1cqw,2.25rem);font-weight:700;line-height:1.2;letter-spacing:-.01em;text-wrap:balance;}
        [data-ld-copy] p{margin:0;color:${MUTED};font-size:1.0625rem;line-height:1.6;max-width:38rem;}
        [data-ld-cta]{display:flex;flex-wrap:wrap;gap:1rem;}
        [data-ld-cta] a{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;min-height:44px;padding:.7rem 1.5rem;border-radius:14px;font-weight:600;font-size:.9375rem;letter-spacing:.01em;font-family:inherit;text-decoration:none;cursor:pointer;color:${NAVY};background:rgba(0,0,0,.05);border:1px solid rgba(0,0,0,.08);transition:transform .2s ease,box-shadow .2s ease,background-color .2s ease;}
        [data-ld-cta] a:hover{background:rgba(0,0,0,.1);box-shadow:0 20px 25px -5px rgba(0,0,0,.05),0 8px 10px -6px rgba(0,0,0,.05);transform:translateY(-4px);}
        [data-ld-cta] a:hover [data-ld-cta-arrow]{transform:translateX(2px);}
        a[data-ld-cta-primary]{font-weight:700;}
        [data-ld-cta-arrow]{width:13px;height:13px;flex-shrink:0;background-color:currentColor;-webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>') center/contain no-repeat;mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>') center/contain no-repeat;transition:transform .2s ease;}
        [data-ld-copy-disclaimer]{margin:0;font-size:.8125rem;font-style:italic;color:${MUTED};}
      `}</style>
      <LogoPortal
        src="images/logo-launch-doctors.png"
        alt="Launch Doctors. Structure, Clarity, Momentum."
        zoomOrigin={LOGO_ZOOM_ORIGIN}
        style={{
          fontFamily: BODY_FONT_FAMILY,
          "--lp-paper": "transparent",
          "--lp-field": "transparent",
        }}
        scrollLength={s.scrollLength}
        hint="Scroll to enter."
        background={
          // Same pattern used by every content section below: the aurora
          // beam fades IN as the content reveals, invisible on the pre-zoom
          // logo screen (which stays flat white).
          <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                opacity: "calc(var(--lp-reveal, 0))",
              }}
            >
              <AuroraBeam />
            </div>
          </div>
        }
        front={
          <div data-ld-header>
            <span data-ld-logo>
              <span data-ld-logo-mark aria-hidden="true">LD</span>
              Launch Doctors
            </span>
            <span data-ld-category>Strategic BioPharma Launch Consultancy</span>
          </div>
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
              <span data-ld-cta-arrow aria-hidden="true" />
            </a>
            <a href="#how-we-help" data-ld-cta-ghost onClick={(e) => { e.preventDefault(); smoothScrollTo("how-we-help"); }}>
              See how we help
            </a>
          </div>
          <p data-ld-copy-disclaimer>Strategic consultancy — not a provider of medical advice or clinical services.</p>
        </div>
      </LogoPortal>
    </div>
  );
}
