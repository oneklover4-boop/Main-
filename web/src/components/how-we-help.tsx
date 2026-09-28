"use client";

import { BlurReveal } from "@/components/ui/blur-reveal";
import { motion } from "motion/react";

const NAVY = "#043580";
const TEAL = "#34ac86";
const BLUE = "#1262c1";
const MUTED = "#4a4a4a";
const INK = "#000000";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

const smoothEase = [0.22, 1, 0.36, 1] as const;

// One simple line-icon per offer, all drawn in the same style, so each
// panel reads as distinct without needing real photography.
function ChecklistIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="72" height="72">
      <rect x="10" y="6" width="28" height="36" rx="3" stroke="#fff" strokeWidth="2" />
      <rect x="17" y="4" width="14" height="6" rx="2" fill="#fff" />
      <path d="M16 20l4 4 8-8" stroke="#fff" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 31l4 4 8-8" stroke="#fff" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="72" height="72">
      <circle cx="24" cy="24" r="16" stroke="#fff" strokeWidth="2" />
      <circle cx="24" cy="24" r="8" stroke="#fff" strokeWidth="2" />
      <circle cx="24" cy="24" r="2" fill="#fff" />
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="72" height="72">
      <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2" />
      <circle cx="36" cy="12" r="5" stroke="#fff" strokeWidth="2" />
      <circle cx="24" cy="38" r="5" stroke="#fff" strokeWidth="2" />
      <path d="M12 17v6a5 5 0 005 5h2M36 17v6a5 5 0 01-5 5h-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="72" height="72">
      <path d="M8 34a16 16 0 0132 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 34l9-12" stroke="#fff" strokeWidth="2.25" strokeLinecap="round" />
      <circle cx="24" cy="34" r="3" fill="#fff" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="72" height="72">
      <circle cx="16" cy="15" r="6" stroke="#fff" strokeWidth="2" />
      <circle cx="32" cy="15" r="6" stroke="#fff" strokeWidth="2" />
      <path d="M4 40c0-7.5 5-13 12-13s12 5.5 12 13M20 40c0-7.5 5-13 12-13s12 5.5 12 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const offers = [
  {
    title: "Launch Health Check",
    body: "A structured assessment of your launch readiness: stakeholder interviews, a risk heat map, and clear recommendations for your leadership team.",
    Icon: ChecklistIcon,
    gradient: `linear-gradient(135deg, ${TEAL} 0%, ${BLUE} 100%)`,
  },
  {
    title: "Launch Strategy Blueprint",
    body: "The strategic imperatives, critical success factors, positioning and stakeholder priorities that shape your launch roadmap.",
    Icon: CompassIcon,
    gradient: `linear-gradient(135deg, ${BLUE} 0%, ${NAVY} 100%)`,
  },
  {
    title: "Integrated Launch Plan",
    body: "One cross-functional plan — activities, milestones, dependencies, owners, budget and governance — in a single place.",
    Icon: PlanIcon,
    gradient: `linear-gradient(135deg, ${TEAL} 0%, ${NAVY} 100%)`,
  },
  {
    title: "Launch Readiness Programme",
    body: "A readiness framework with scorecards, workshops and structured gap closure, with regular reporting to leadership.",
    Icon: GaugeIcon,
    gradient: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 100%)`,
  },
  {
    title: "Launch Office Support",
    body: "Fractional launch leadership and PMO support: decision management and day-to-day cross-functional coordination.",
    Icon: SupportIcon,
    gradient: `linear-gradient(135deg, ${BLUE} 0%, ${TEAL} 100%)`,
  },
];

export default function HowWeHelp() {
  return (
    <section id="how-we-help" style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 4rem", fontFamily: FONT_FAMILY }}>
      <style>{`
        .offer-row{display:flex;align-items:center;gap:0;}
        .offer-row__image{flex:0 0 58%;}
        .offer-row__card{flex:0 0 46%;margin-left:-8%;}
        @media (max-width: 760px) {
          .offer-row{flex-direction:column;align-items:stretch;gap:1.25rem;}
          .offer-row__image, .offer-row__card{flex:none;margin-left:0;width:100%;}
        }
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
            background: "rgba(52, 172, 134, 0.08)",
            padding: "4.5rem clamp(1.5rem, 4vw, 3rem) 4rem",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 56px 56px 0",
              borderColor: `transparent ${TEAL} transparent transparent`,
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              background: TEAL,
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.8125rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.65rem 1.5rem",
            }}
          >
            <BlurReveal duration={0.5}>How We Help</BlurReveal>
          </span>
          <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: NAVY }}>
            <BlurReveal duration={0.5} delay={0.08}>Five focused offers</BlurReveal>
          </h2>
          <p style={{ margin: "0 0 3.5rem", maxWidth: "56ch", fontSize: "1.1875rem", lineHeight: 1.6, color: MUTED }}>
            <BlurReveal duration={0.5} delay={0.16}>
              Each one solves a specific problem on the journey to launch. Start
              with a Launch Health Check, or go straight to the support you need.
            </BlurReveal>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "4.5rem" }}>
            {offers.map((offer) => (
              <motion.div
                className="offer-row"
                key={offer.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.05, ease: smoothEase }}
              >
                <div
                  className="offer-row__image"
                  style={{
                    aspectRatio: "5 / 4",
                    borderRadius: 20,
                    background: offer.gradient,
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 12px 28px -10px rgba(4,53,128,.35)",
                  }}
                >
                  <offer.Icon />
                </div>
                <div
                  className="offer-row__card"
                  style={{
                    position: "relative",
                    background: "#ffffff",
                    borderTop: `4px solid ${TEAL}`,
                    borderRadius: 12,
                    padding: "2rem",
                    boxShadow: "0 20px 40px -16px rgba(0,0,0,.18)",
                  }}
                >
                  <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.375rem", fontWeight: 700, color: TEAL, fontFamily: "var(--ld-font-heading)" }}>
                    {offer.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.6, color: INK }}>
                    {offer.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
