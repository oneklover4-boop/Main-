"use client";

import { smoothScrollTo } from "@/lib/smooth-scroll";
import { BlurReveal } from "@/components/ui/blur-reveal";

const NAVY = "#043580";
const BLUE = "#1262c1";
const TEAL = "#34ac86";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

const checks = ["Structured assessment", "Stakeholder interviews", "Risk heat map", "Executive recommendations"];

// A small on-brand illustration (clipboard + checklist + a pulse of
// momentum) standing in for a photo — built from the site's own
// palette so it sits naturally next to the glass cards rather than
// looking like a dropped-in stock image.
function HealthCheckIllustration() {
  return (
    <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect x="64" y="18" width="150" height="184" rx="14" fill="#ffffff" stroke={NAVY} strokeOpacity="0.15" strokeWidth="2" />
      <rect x="112" y="8" width="54" height="18" rx="6" fill={BLUE} />
      <rect x="122" y="13" width="34" height="8" rx="3" fill="#ffffff" fillOpacity="0.85" />

      <circle cx="90" cy="58" r="9" fill={TEAL} fillOpacity="0.15" />
      <path d="M86 58l3 3 6-6" stroke={TEAL} strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="110" y="53" width="86" height="8" rx="4" fill={NAVY} fillOpacity="0.08" />

      <circle cx="90" cy="90" r="9" fill={TEAL} fillOpacity="0.15" />
      <path d="M86 90l3 3 6-6" stroke={TEAL} strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="110" y="85" width="70" height="8" rx="4" fill={NAVY} fillOpacity="0.08" />

      <circle cx="90" cy="122" r="9" fill={TEAL} fillOpacity="0.15" />
      <path d="M86 122l3 3 6-6" stroke={TEAL} strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="110" y="117" width="78" height="8" rx="4" fill={NAVY} fillOpacity="0.08" />

      <path
        d="M78 165h20l8-24 10 46 10-34 8 12h48"
        stroke={BLUE}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="238" cy="168" r="30" fill={TEAL} fillOpacity="0.12" />
      <circle cx="238" cy="168" r="30" stroke={TEAL} strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M226 168l9 9 17-19" stroke={TEAL} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LaunchHealthCheck() {
  return (
    <section id="health-check" style={{ padding: "4rem clamp(1.25rem, 5vw, 1.5rem)", fontFamily: FONT_FAMILY }}>
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: "3rem",
          alignItems: "center",
        }}
        className="lhc-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .lhc-grid { grid-template-columns: 1fr !important; }
          }
          [data-lhc-check]{background:rgba(0,0,0,.05);transition:background-color .2s ease,box-shadow .2s ease,transform .2s ease;}
          [data-lhc-check]:hover{background:rgba(0,0,0,.1);box-shadow:0 20px 25px -5px rgba(0,0,0,.05),0 8px 10px -6px rgba(0,0,0,.05);transform:translateY(-4px);}
          [data-lhc-visual]{background:rgba(0,0,0,.05);transition:background-color .2s ease,box-shadow .2s ease,transform .2s ease;}
          [data-lhc-visual]:hover{background:rgba(0,0,0,.1);box-shadow:0 20px 25px -5px rgba(0,0,0,.05),0 8px 10px -6px rgba(0,0,0,.05);transform:translateY(-4px);}
          [data-lhc-cta]{transition:background-color .2s ease,box-shadow .2s ease,transform .2s ease;}
          [data-lhc-cta]:hover{background:rgba(0,0,0,.1) !important;box-shadow:0 20px 25px -5px rgba(0,0,0,.05),0 8px 10px -6px rgba(0,0,0,.05);transform:translateY(-4px);}
          [data-lhc-cta]:hover [data-lhc-cta-arrow]{transform:translateX(2px);}
          [data-lhc-cta-arrow]{width:13px;height:13px;flex-shrink:0;background-color:currentColor;-webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>') center/contain no-repeat;mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>') center/contain no-repeat;transition:transform .15s ease;}
        `}</style>

        <div>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: BLUE }}>
            <BlurReveal duration={0.5}>The Entry Point</BlurReveal>
          </p>
          <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: INK }}>
            <BlurReveal duration={0.5} delay={0.08}>Start with a Launch Health Check</BlurReveal>
          </h2>
          <p style={{ margin: "0 0 1.75rem", maxWidth: "56ch", fontSize: "1.0625rem", lineHeight: 1.6, color: MUTED }}>
            <BlurReveal duration={0.5} delay={0.16}>
              The fastest way to see where your launch really stands. In a
              matter of weeks, we run a structured assessment — stakeholder
              interviews, a risk heat map, and a set of clear, prioritised
              recommendations for your leadership team. It&apos;s the easiest way
              to work with us, and often the natural first step into a larger
              engagement.
            </BlurReveal>
          </p>
          <a
            href="#contact"
            data-lhc-cta
            onClick={(e) => { e.preventDefault(); smoothScrollTo("contact"); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              minHeight: 44,
              padding: "0.7rem 1.5rem",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,.08)",
              background: "rgba(0,0,0,.05)",
              color: NAVY,
              fontWeight: 700,
              fontSize: "0.9375rem",
              letterSpacing: "0.01em",
              fontFamily: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <BlurReveal duration={0.5} delay={0.24}>Book a Launch Health Check</BlurReveal>
            <span data-lhc-cta-arrow aria-hidden="true" />
          </a>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          <div
            data-lhc-visual
            style={{
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: 14,
              padding: "1.5rem 1.5rem 0.75rem",
            }}
          >
            <HealthCheckIllustration />
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {checks.map((item, i) => (
              <li
                key={item}
                data-lhc-check
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: 10,
                  padding: "0.75rem 0.875rem",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: INK,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="8" fill={TEAL} fillOpacity="0.15" />
                  <path d="M5 8.2l1.8 1.8L11 6" stroke={TEAL} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <BlurReveal duration={0.5} delay={i * 0.06}>{item}</BlurReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
