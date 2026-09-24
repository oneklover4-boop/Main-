"use client";

import { smoothScrollTo } from "@/lib/smooth-scroll";
import { BlurReveal } from "@/components/ui/blur-reveal";

const NAVY = "#043580";
const BLUE = "#1262c1";
const TEAL = "#34ac86";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = "Inter, Arial, sans-serif";

const checks = ["Structured assessment", "Stakeholder interviews", "Risk heat map", "Executive recommendations"];

export default function LaunchHealthCheck() {
  return (
    <section id="health-check" style={{ padding: "4rem clamp(1.25rem, 5vw, 1.5rem)", fontFamily: FONT_FAMILY }}>
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
          gap: "3rem",
          alignItems: "start",
        }}
        className="lhc-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .lhc-grid { grid-template-columns: 1fr !important; }
          }
          [data-lhc-check]{background:rgba(0,0,0,.05);transition:background-color .2s ease,box-shadow .2s ease,transform .2s ease;}
          [data-lhc-check]:hover{background:rgba(0,0,0,.1);box-shadow:0 20px 25px -5px rgba(0,0,0,.05),0 8px 10px -6px rgba(0,0,0,.05);transform:translateY(-4px);}
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
            onClick={(e) => { e.preventDefault(); smoothScrollTo("contact"); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              padding: "0.75rem 1.375rem",
              borderRadius: 10,
              border: "1.5px solid transparent",
              background: NAVY,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9375rem",
              fontFamily: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Book a Launch Health Check
          </a>
        </div>

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "1rem" }}>
          {checks.map((item) => (
            <li
              key={item}
              data-lhc-check
              style={{
                borderTop: `1px solid ${CARD_BORDER}`,
                borderRight: `1px solid ${CARD_BORDER}`,
                borderBottom: `1px solid ${CARD_BORDER}`,
                borderLeft: `3px solid ${TEAL}`,
                borderRadius: 10,
                padding: "1rem 1.25rem",
                fontWeight: 500,
                color: INK,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
