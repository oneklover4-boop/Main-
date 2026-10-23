import { BlurReveal } from "@/components/ui/blur-reveal";
import { SectionTabHeader } from "@/components/ui/section-tab-header";

const BLUE = "#1262c1";
const MUTED = "#4a4a4a";
const FONT_FAMILY = '"Montserrat", Arial, sans-serif';

interface TeamMember {
  photo: string;
  name: string;
  title: string;
  bio: string[];
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
    photo: "images/darcy-ryan-v3.jpg",
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
        .team-photo-row{display:flex;gap:1.75rem;align-items:flex-start;margin-top:1.5rem;}
        .team-photo-row img{width:200px;height:180px;object-fit:cover;border-radius:10px;flex-shrink:0;margin-left:-2.5rem;box-shadow:0 16px 28px -12px rgba(0,0,0,.22);}
        @media (max-width: 700px) {
          .team-photo-row { flex-direction: column; }
          .team-photo-row img { width: 100%; height: 220px; margin-left: 0; }
        }
      `}</style>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <SectionTabHeader
          label="Our Team"
          accent={BLUE}
          tint="rgba(18, 98, 193, 0.1)"
          description="The consultants leading your launch, with decades of hands-on BioPharma launch experience between them."
          descriptionColor={MUTED}
          className="mb-6"
        />

        <div
          style={{
            background: "rgba(18, 98, 201, 0.1)",
            borderRadius: 10,
            padding: "3rem clamp(1.5rem, 4vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {team.map((member) => (
            <div
              key={member.name}
              data-glass-card
              style={{
                borderTop: `4px solid ${BLUE}`,
                borderRadius: 10,
                padding: "2.25rem",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 600, color: BLUE }}>
                <BlurReveal duration={0.5}>{member.name}</BlurReveal>
              </h3>
              <p style={{ margin: "0.2rem 0 0", fontSize: "1.0625rem", color: BLUE }}>
                <BlurReveal duration={0.5} delay={0.04}>{member.title}</BlurReveal>
              </p>

              <div className="team-photo-row">
                {/* Relative path (no leading slash) so it resolves correctly
                    whether the export is served from the site root (custom
                    domain) or under a GitHub Pages project subpath. */}
                <img src={member.photo} alt={member.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  {member.bio.map((paragraph, i) => (
                    <p
                      key={i}
                      style={{
                        margin: i === 0 ? 0 : "0.9rem 0 0",
                        color: MUTED,
                        fontSize: "1rem",
                        lineHeight: 1.65,
                      }}
                    >
                      <BlurReveal duration={0.5} delay={0.1 + i * 0.05}>{paragraph}</BlurReveal>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
