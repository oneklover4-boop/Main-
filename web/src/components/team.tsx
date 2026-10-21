import { BlurReveal } from "@/components/ui/blur-reveal";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const NAVY = "#043580";
const BLUE = "#1262c1";
const TEAL = "#34ac86";
const CARD_BORDER = "rgba(0, 0, 0, 0.08)";
const INK = "#000000";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"Montserrat", Arial, sans-serif';

interface TeamMember {
  photo: string;
  name: string;
  title: string;
  location?: string;
  bio: string[];
  quote?: { text: string; attribution: string };
}

const team: TeamMember[] = [
  {
    photo: "images/avi-founder.jpg",
    name: "Avi Leaf",
    title: "Founder",
    bio: [
      "25+ years of global BioPharma and consulting experience across large, medium and small BioPharma companies, with deep expertise launching, commercialising and building growth for product portfolios.",
    ],
  },
  {
    photo: "images/darcy-ryan-v2.jpg",
    name: "D’Arcy Ryan",
    title: "Associate",
    bio: [
      "D’Arcy brings more than 25 years of Pharmaceutical marketing experience across client and agency roles, multiple therapeutic areas and brand ranging from large global products to rare disease launches. She has built deep expertise in launch planning, alignment, governance and execution across functions.",
    ],
  },
];

export default function Team() {
  return (
    <section id="team" style={{ padding: "1rem clamp(1.25rem, 5vw, 1.5rem) 4rem", fontFamily: FONT_FAMILY }}>
      <style>{`
        [data-glass-card]{background:#ffffff;box-shadow:0 1px 2px rgba(0,0,0,.04);transition:box-shadow .2s ease,transform .2s ease;}
        [data-glass-card]:hover{box-shadow:0 16px 28px -8px rgba(0,0,0,.12);transform:translateY(-4px);}
        .team-grid{grid-template-columns:repeat(2,1fr);}
        @media (max-width: 860px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <SectionTabHeader
          label="Our Team"
          accent={TEAL}
          tint="rgba(52, 172, 134, 0.08)"
          description="The consultants leading your launch, with decades of hands-on BioPharma launch experience between them."
          descriptionColor={MUTED}
          className="mb-6"
        />

        <div className="team-grid" style={{ display: "grid", gap: "1.5rem", alignItems: "start" }}>
          {team.map((member) => (
            <div
              key={member.name}
              data-glass-card
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                border: `1px solid ${CARD_BORDER}`,
                borderTop: `4px solid ${TEAL}`,
                borderRadius: 4,
                padding: "2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: NAVY,
                    border: `3px solid ${TEAL}`,
                  }}
                >
                  {/* Relative path (no leading slash) so it resolves correctly
                      whether the export is served from the site root (custom
                      domain) or under a GitHub Pages project subpath. */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700, color: NAVY }}>
                    <BlurReveal duration={0.5}>{member.name}</BlurReveal>
                  </h3>
                  <p style={{ margin: "0.15rem 0 0", fontSize: "0.9375rem", color: BLUE, fontWeight: 600 }}>
                    <BlurReveal duration={0.5} delay={0.04}>{member.title}</BlurReveal>
                  </p>
                  {member.location && (
                    <p
                      style={{
                        margin: "0.15rem 0 0",
                        fontSize: "0.75rem",
                        color: MUTED,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      <BlurReveal duration={0.5} delay={0.08}>{member.location}</BlurReveal>
                    </p>
                  )}
                </div>
              </div>

              {member.bio.map((paragraph, i) => (
                <p key={i} style={{ margin: 0, color: MUTED, fontSize: "1rem", lineHeight: 1.65 }}>
                  <BlurReveal duration={0.5} delay={0.12 + i * 0.05}>{paragraph}</BlurReveal>
                </p>
              ))}

              {member.quote && (
                <blockquote
                  style={{
                    margin: 0,
                    padding: "1.25rem 1.5rem",
                    borderLeft: `4px solid ${BLUE}`,
                    background: "rgba(18, 98, 193, 0.04)",
                    borderRadius: "0 4px 4px 0",
                  }}
                >
                  <p style={{ margin: "0 0 0.5rem", fontSize: "0.9375rem", fontStyle: "italic", color: INK }}>
                    <BlurReveal duration={0.5}>&ldquo;{member.quote.text}&rdquo;</BlurReveal>
                  </p>
                  <cite style={{ fontSize: "0.8125rem", color: MUTED, fontStyle: "normal" }}>
                    <BlurReveal duration={0.5} delay={0.06}>— {member.quote.attribution}</BlurReveal>
                  </cite>
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
