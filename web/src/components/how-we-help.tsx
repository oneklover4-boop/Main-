"use client";

import { CalendlyCarousel, type CarouselItem } from "@/components/ui/connected-carousel";
import { BlurReveal } from "@/components/ui/blur-reveal";

const NAVY = "#043580";
const TEAL = "#34ac86";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"PT Sans", Arial, sans-serif';

const offers = [
  {
    title: "Launch Health Check",
    body: "A structured assessment of your launch readiness: stakeholder interviews, a risk heat map, and clear recommendations for your leadership team.",
    image: "images/offers/offer-1.jpg",
  },
  {
    title: "Launch Strategy Blueprint",
    body: "The strategic imperatives, critical success factors, positioning and stakeholder priorities that shape your launch roadmap.",
    image: "images/offers/offer-2.jpg",
  },
  {
    title: "Integrated Launch Plan",
    body: "One cross-functional plan — activities, milestones, dependencies, owners, budget and governance — in a single place.",
    image: "images/offers/offer-3.jpg",
  },
  {
    title: "Launch Readiness Programme",
    body: "A readiness framework with scorecards, workshops and structured gap closure, with regular reporting to leadership.",
    image: "images/offers/offer-4.jpg",
  },
  {
    title: "Launch Office Support",
    body: "Fractional launch leadership and PMO support: decision management and day-to-day cross-functional coordination.",
    image: "images/offers/offer-5.jpg",
  },
];

// Placeholder images only (plain brand-colour gradients) until real
// photos are supplied for each offer — same field, just swap the
// `image` path above once they're ready.
const offerCards: CarouselItem[] = offers.map((offer, i) => ({
  id: String(i),
  stat: offer.title,
  quote: offer.body,
  author: "Launch Doctors",
  role: "Strategic BioPharma Launch Consultancy",
  defaultImage: offer.image,
  selectedImage: offer.image,
  alt: offer.title,
}));

export default function HowWeHelp() {
  return (
    <section id="how-we-help" style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 4rem", fontFamily: FONT_FAMILY }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
            background: "rgba(52, 172, 134, 0.08)",
            padding: "4rem clamp(1.5rem, 4vw, 3rem) 2.5rem",
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
          <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: NAVY }}>
            <BlurReveal duration={0.5} delay={0.08}>Five focused offers</BlurReveal>
          </h2>
          <p style={{ margin: 0, maxWidth: "56ch", fontSize: "1.0625rem", lineHeight: 1.6, color: MUTED }}>
            <BlurReveal duration={0.5} delay={0.16}>
              Each one solves a specific problem on the journey to launch. Start
              with a Launch Health Check, or go straight to the support you need.
            </BlurReveal>
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 0" }}>
        <CalendlyCarousel items={offerCards} autoPlayInterval={4500} />
      </div>
    </section>
  );
}
