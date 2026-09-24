"use client";

import CoverflowCarousel, { type CoverflowCarouselItem } from "@/components/ui/coverflow-carousel";
import { BlurReveal } from "@/components/ui/blur-reveal";

const NAVY = "#043580";
const TEAL = "#34ac86";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

const offers = [
  {
    title: "Launch Health Check",
    body: "A structured assessment of your launch readiness: stakeholder interviews, a risk heat map, and clear recommendations for your leadership team.",
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

const offerCards: CoverflowCarouselItem[] = offers.map((offer, i) => ({
  id: String(i),
  content: (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", textAlign: "left", width: "100%", fontFamily: FONT_FAMILY }}>
      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: NAVY }}>{offer.title}</h3>
      <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.5, color: MUTED }}>{offer.body}</p>
    </div>
  ),
}));

export default function HowWeHelp() {
  return (
    <section id="how-we-help" style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 4rem", fontFamily: FONT_FAMILY }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: TEAL }}>
          <BlurReveal duration={0.5}>How We Help</BlurReveal>
        </p>
        <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: NAVY }}>
          <BlurReveal duration={0.5} delay={0.08}>Five focused offers</BlurReveal>
        </h2>
        <p style={{ margin: "0 0 0.5rem", maxWidth: "56ch", fontSize: "1.0625rem", lineHeight: 1.6, color: MUTED }}>
          <BlurReveal duration={0.5} delay={0.16}>
            Each one solves a specific problem on the journey to launch. Start
            with a Launch Health Check, or go straight to the support you need.
          </BlurReveal>
        </p>
      </div>

      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 0" }}>
        <CoverflowCarousel items={offerCards} loop autoplay autoplayDelay={4000} />
      </div>
    </section>
  );
}
