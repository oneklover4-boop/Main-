import { BlurReveal } from "@/components/ui/blur-reveal";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const TEAL = "#34ac86";
const NAVY = "#043580";
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
        .offer-outer{
          max-width: 1040px; margin: 0 auto; background: rgba(52, 172, 134, 0.10);
          border-radius: 22px; padding: clamp(1.5rem, 4vw, 3rem);
          display:flex; align-items:stretch; aspect-ratio: 1 / 1;
        }
        .offer-row{ position:relative; display:flex; align-items:center; width:100%; }
        .offer-photo{
          flex:0 0 50%; min-width:0; height:88%; border-radius:16px; overflow:hidden;
          box-shadow:0 1px 3px rgba(16,24,40,.08);
        }
        .offer-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        .offer-card{
          flex:0 0 40%; min-width:0; position:relative; z-index:1;
          margin-left:-2.75rem; background:#ffffff; border-radius:10px;
          border-top:4px solid ${TEAL};
          box-shadow:0 20px 40px -20px rgba(4,53,128,.25);
          padding:1.75rem 1.75rem;
        }
        @media (max-width: 760px) {
          .offer-outer{ aspect-ratio:auto; padding:1.5rem; }
          .offer-row{ flex-direction:column; align-items:stretch; }
          .offer-photo{ flex:none; width:100%; height:auto; aspect-ratio: 4 / 3; }
          .offer-card{ flex:none; margin-left:0; margin-top:-2rem; width:calc(100% - 2rem); margin-inline:auto; }
        }
      `}</style>

      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <SectionTabHeader
          label="Four Focused Offers"
          accent={TEAL}
          tint="rgba(52, 172, 134, 0.08)"
          description="Each one solves a specific problem on the journey to launch. Start with a Launch Health Check, or go straight to the support you need."
          descriptionColor={MUTED}
        />
      </div>

      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "3rem 0 0", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {offers.map((offer, i) => (
          <div className="offer-outer" key={offer.title}>
            <div className="offer-row">
              <div className="offer-photo">
                <img src={offer.image} alt={offer.title} />
              </div>
              <div className="offer-card">
                <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, color: NAVY }}>
                  <BlurReveal duration={0.5} delay={i * 0.05}>{offer.title}</BlurReveal>
                </h3>
                <p style={{ margin: "0.9rem 0 0", color: MUTED, fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  <BlurReveal duration={0.5} delay={0.1 + i * 0.05}>{offer.body}</BlurReveal>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
