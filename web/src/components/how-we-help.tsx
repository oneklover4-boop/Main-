"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NAVY = "#043580";
const BLUE = "#1262c1";
const TEAL = "#34ac86";
const CARD = "#e6e6e6";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = "Inter, Arial, sans-serif";

const offers = [
  {
    title: "Launch Health Check",
    body: "A structured assessment of your launch readiness: stakeholder interviews, a risk heat map, and clear recommendations for your leadership team.",
    featured: true,
  },
  {
    title: "Launch Strategy Blueprint",
    body: "The strategic imperatives, critical success factors, positioning and stakeholder priorities that shape your launch roadmap.",
  },
  {
    title: "Integrated Launch Plan",
    body: "One cross-functional plan — activities, milestones, dependencies, owners, budget and governance — in a single place.",
  },
  {
    title: "Launch Readiness Programme",
    body: "A readiness framework with scorecards, workshops and structured gap closure, with regular reporting to leadership.",
  },
  {
    title: "Launch Office Support",
    body: "Fractional launch leadership and PMO support: decision management and day-to-day cross-functional coordination.",
  },
];

export default function HowWeHelp() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-hwh-card]");
    const amount = (card?.offsetWidth ?? 320) + 20;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section style={{ background: "#f2f2f2", padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 4rem", fontFamily: FONT_FAMILY }}>
      <style>{`
        [data-hwh-track]{scrollbar-width:none;}
        [data-hwh-track]::-webkit-scrollbar{display:none;}
        [data-hwh-arrow]{transition:background-color .18s ease,color .18s ease;}
        [data-hwh-arrow]:hover{background:${NAVY};color:#fff;}
        [data-hwh-card]{transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease;}
        [data-hwh-card]:hover,[data-hwh-card]:focus-within{border-color:${TEAL} !important;box-shadow:0 8px 20px rgba(52,172,134,.18);transform:translateY(-2px);}
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: BLUE }}>
          How We Help
        </p>
        <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: INK }}>
          Five focused offers
        </h2>
        <p style={{ margin: "0 0 2rem", maxWidth: "56ch", fontSize: "1.0625rem", lineHeight: 1.6, color: MUTED }}>
          Each one solves a specific problem on the journey to launch. Start
          with a Launch Health Check, or go straight to the support you need.
        </p>

        <div
          ref={trackRef}
          data-hwh-track
          style={{
            display: "flex",
            gap: "1.25rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: "0.5rem",
          }}
        >
          {offers.map((offer) => (
            <article
              key={offer.title}
              data-hwh-card
              style={{
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                width: "min(80vw, 320px)",
                background: CARD,
                border: offer.featured ? `1.5px solid ${TEAL}` : `1px solid ${CARD_BORDER}`,
                borderLeft: offer.featured ? `4px solid ${TEAL}` : undefined,
                borderRadius: 14,
                padding: "1.75rem 1.5rem",
              }}
            >
              {offer.featured && (
                <span
                  style={{
                    display: "inline-block",
                    marginBottom: "0.875rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: 999,
                    border: `1px solid ${TEAL}`,
                    color: TEAL,
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Start here
                </span>
              )}
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.1875rem", fontWeight: 700, color: INK }}>{offer.title}</h3>
              <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: MUTED }}>{offer.body}</p>
            </article>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
          <button
            type="button"
            data-hwh-arrow
            onClick={() => scrollByCard(-1)}
            aria-label="Previous offer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `1.5px solid ${NAVY}`,
              background: "transparent",
              color: NAVY,
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            data-hwh-arrow
            onClick={() => scrollByCard(1)}
            aria-label="Next offer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `1.5px solid ${NAVY}`,
              background: "transparent",
              color: NAVY,
              cursor: "pointer",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
