"use client";

import { TestimonialMarquee, type Testimonial } from "@/components/ui/testimonial-marquee";
import { BlurReveal } from "@/components/ui/blur-reveal";

const BLUE = "#1262c1";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = "Inter, Arial, sans-serif";

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

const offerCards: Testimonial[] = offers.map((offer) => ({
  name: offer.title,
  text: offer.body,
}));

export default function HowWeHelp() {
  return (
    <section id="how-we-help" style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 4rem", fontFamily: FONT_FAMILY }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <p style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: BLUE }}>
          <BlurReveal duration={0.5}>How We Help</BlurReveal>
        </p>
        <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.75rem, 1.3rem + 1.8vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.01em", color: INK }}>
          <BlurReveal duration={0.5} delay={0.08}>Five focused offers</BlurReveal>
        </h2>
        <p style={{ margin: "0 0 0.5rem", maxWidth: "56ch", fontSize: "1.0625rem", lineHeight: 1.6, color: MUTED }}>
          <BlurReveal duration={0.5} delay={0.16}>
            Each one solves a specific problem on the journey to launch. Start
            with a Launch Health Check, or go straight to the support you need.
          </BlurReveal>
        </p>
      </div>

      <TestimonialMarquee items={offerCards} variant="default" />
    </section>
  );
}
