"use client";

import { CalendlyCarousel, type CarouselItem } from "@/components/ui/connected-carousel";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

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
        <SectionTabHeader
          label="Five Focused Offers"
          accent={TEAL}
          tint="rgba(52, 172, 134, 0.08)"
          description="Each one solves a specific problem on the journey to launch. Start with a Launch Health Check, or go straight to the support you need."
          descriptionColor={MUTED}
        />
      </div>

      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "2rem 0" }}>
        <CalendlyCarousel items={offerCards} autoPlayInterval={4500} />
      </div>
    </section>
  );
}
