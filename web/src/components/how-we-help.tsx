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
        .offer-row{ position:relative; display:flex; align-items:center; }
        .offer-photo{
          flex:0 0 55%; min-width:0; border-radius:14px; overflow:hidden;
          aspect-ratio: 4 / 3; box-shadow:0 1px 3px rgba(16,24,40,.08);
        }
        .offer-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        .offer-card{
          flex:1 1 auto; min-width:0; position:relative; z-index:1;
          margin-left:-3rem; background:#ffffff; border-radius:10px;
          border-top:4px solid ${TEAL};
          box-shadow:0 20px 40px -20px rgba(4,53,128,.25);
          padding:1.75rem 2rem;
        }
        @media (max-width: 760px) {
          .offer-row{ flex-direction:column; align-items:stretch; }
          .offer-photo{ flex:none; width:100%; }
          .offer-card{ margin-left:0; margin-top:-2rem; width:calc(100% - 2rem); margin-inline:auto; }
        }
      `}</style>

      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ background: "rgba(52, 172, 134, 0.10)", borderRadius: 20 }}>
          <SectionTabHeader
            label="Four Focused Offers"
            accent={TEAL}
            tint="transparent"
            description="Each one solves a specific problem on the journey to launch. Start with a Launch Health Check, or go straight to the support you need."
            descriptionColor={MUTED}
          />

          <div
            style={{
              padding: "0 clamp(1.5rem, 4vw, 3rem) clamp(2rem, 5vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            {offers.map((offer, i) => (
              <div className="offer-row" key={offer.title}>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
