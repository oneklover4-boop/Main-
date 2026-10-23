import { BlurReveal } from "@/components/ui/blur-reveal";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const TEAL = "#00bfb2";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"Montserrat", Arial, sans-serif';

const offers = [
  {
    title: "Launch Health Check",
    body: "A structured assessment of your launch readiness: stakeholder interviews and clear recommendations for your team.",
    image: "images/offers/offer-1.jpg",
  },
  {
    title: "Launch Strategy Support",
    body: "Support to get the right strategic imperatives, critical success factors, positioning and stakeholder priorities that shape your launch roadmap.",
    image: "images/offers/offer-2.jpg",
  },
  // Integrated Launch Plan — hidden for now, keep for re-adding later.
  // {
  //   title: "Integrated Launch Plan",
  //   body: "One cross-functional plan — activities, milestones, dependencies, owners, budget and governance — in a single place.",
  //   image: "images/offers/offer-3.jpg",
  // },
  {
    title: "Launch Readiness Programme",
    body: "A readiness framework with scorecards, workshops and structured gap closure.",
    image: "images/offers/offer-4.jpg",
  },
  {
    title: "Launch Office Support",
    body: "Fractional launch leadership support: decision management and day-to-day cross-functional launch planning coordination.",
    image: "images/offers/offer-5.jpg",
  },
];

export default function HowWeHelp() {
  return (
    <section id="how-we-help" style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 4rem", fontFamily: FONT_FAMILY }}>
      <style>{`
        .offer-row{position:relative;display:flex;align-items:center;}
        .offer-row img{width:56%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;flex-shrink:0;}
        .offer-card{
          background:#ffffff;border-top:4px solid ${TEAL};border-radius:12px;
          padding:1.75rem 2rem;margin-left:-2.75rem;position:relative;z-index:1;
          width:38%;flex-shrink:0;
          box-shadow:0 20px 36px -16px rgba(0,0,0,.2);
        }
        @media (max-width: 760px) {
          .offer-row{flex-direction:column;}
          .offer-row img{width:100%;aspect-ratio:4/3;}
          .offer-card{margin-left:0;margin-top:-2.5rem;width:78%;align-self:flex-end;}
        }
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <SectionTabHeader
          label="Four Focused Offers"
          accent={TEAL}
          tint="rgba(0, 191, 178, 0.14)"
          description="Each one solves a specific problem on the journey to launch. Start with a Launch Health Check, or go straight to the support you need."
          descriptionColor={MUTED}
          className="mb-6"
        />

        <div
          style={{
            background: "rgba(0, 191, 178, 0.14)",
            borderRadius: 10,
            padding: "3rem clamp(1.5rem, 4vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            gap: "3.5rem",
          }}
        >
          {offers.map((offer, i) => (
            <div key={offer.title} className="offer-row">
              <img src={offer.image} alt={offer.title} />
              <div className="offer-card">
                <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.375rem", fontWeight: 700, color: TEAL }}>
                  <BlurReveal duration={0.5} delay={0.04}>{offer.title}</BlurReveal>
                </h3>
                <p style={{ margin: 0, color: MUTED, fontSize: "1rem", lineHeight: 1.65 }}>
                  <BlurReveal duration={0.5} delay={0.1 + i * 0.02}>{offer.body}</BlurReveal>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
